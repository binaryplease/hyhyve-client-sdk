import jwt from 'jsonwebtoken';

// Bun automatically loads .env files, no need for dotenv package
const PORT = process.env.PORT || 3000;

// Validate environment variables
const HYHYVE_API_KEY = process.env.HYHYVE_API_KEY;
const HYHYVE_CLIENT_ID = process.env.HYHYVE_CLIENT_ID;

if (!HYHYVE_API_KEY || !HYHYVE_CLIENT_ID) {
  console.error('❌ Missing required environment variables!');
  console.error('Please set HYHYVE_API_KEY and HYHYVE_CLIENT_ID in your .env file');
  process.exit(1);
}

/**
 * Mock user database
 * In production, replace this with your actual user database
 */
const mockUsers = new Map([
  ['user1', {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    headline: 'Product Manager',
    emoji: '🚀',
    status: 'Available for meetings',
    color: '#3b82f6',
  }],
  ['user2', {
    id: 'user2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    headline: 'Software Engineer',
    emoji: '💻',
    status: 'Deep work mode',
    color: '#8b5cf6',
  }],
  ['user3', {
    id: 'user3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    headline: 'UX Designer',
    emoji: '🎨',
    status: 'Creating magic',
    color: '#ec4899',
  }]
]);

/**
 * Helper to get user from request
 * In production, replace this with your actual auth logic
 */
function getUserFromRequest(request, url) {
  // In production, verify session token, JWT, or other auth mechanism
  const userId = request.headers.get('x-user-id') || url.searchParams.get('userId');

  if (!userId) {
    return {
      error: 'Unauthorized',
      message: 'User ID not provided. Include x-user-id header or userId query parameter.',
      status: 401
    };
  }

  const user = mockUsers.get(userId);
  if (!user) {
    return {
      error: 'User not found',
      message: `No user found with ID: ${userId}`,
      status: 404
    };
  }

  return { user };
}

/**
 * Generate HyHyve JWT Token
 * 
 * This function creates a JWT token that authenticates a user with HyHyve.
 * The token contains the user's profile information and is signed with your API key.
 */
function generateHyHyveToken(user) {
  const payload = {
    // Required: Unique identifier for the user in your system
    clientReferenceId: user.id,

    // Required: User profile
    profile: {
      // Required: User's display name (max 80 characters)
      name: user.name,

      // Optional: User's profile picture URL
      picture: user.picture,

      // Optional: Hex color for user (e.g., '#3b82f6')
      color: user.color,

      // Optional: Social media links
      socials: user.socials,

      // Optional: User's headline/title
      headline: user.headline,

      // Optional: Emoji representation
      emoji: user.emoji,

      // Optional: Current status message
      status: user.status
    },

    // Token issued at timestamp
    iat: Math.floor(Date.now() / 1000)
  };

  // Sign the token with HS256 algorithm
  const token = jwt.sign(payload, HYHYVE_API_KEY, {
    algorithm: 'HS256',
    expiresIn: '5m' // Token expires in 5min
  });

  return token;
}

/**
 * Helper to create JSON response with CORS headers
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-user-id',
    },
  });
}

/**
 * Bun HTTP server
 */
const server = Bun.serve({
  port: PORT,

  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-user-id',
        },
      });
    }

    /**
     * API Endpoint: Get HyHyve authentication token
     * 
     * GET /api/hyhyve-token
     * 
     * Headers:
     *   x-user-id: User identifier
     * 
     * Response:
     *   {
     *     token: string,      // JWT token for HyHyve
     *     clientId: string,   // Your HyHyve client ID
     *     expiresIn: number   // Token expiration in seconds
     *   }
     */
    if (pathname === '/api/hyhyve-token' && request.method === 'GET') {
      const userResult = getUserFromRequest(request, url);

      if (userResult.error) {
        return jsonResponse({
          error: userResult.error,
          message: userResult.message
        }, userResult.status);
      }

      try {
        const user = userResult.user;

        console.log(`🔐 Generating HyHyve token for user: ${user.name} (${user.id})`);

        // Generate the JWT token
        const token = generateHyHyveToken(user);

        console.log(`✅ Token generated successfully for ${user.name}`);

        return jsonResponse({
          token,
          clientId: HYHYVE_CLIENT_ID,
          expiresIn: 3600 // 1 hour in seconds
        });
      } catch (error) {
        console.error('❌ Error generating token:', error);
        return jsonResponse({
          error: 'Internal server error',
          message: 'Failed to generate authentication token'
        }, 500);
      }
    }

    /**
     * Health check endpoint
     */
    if (pathname === '/health' && request.method === 'GET') {
      return jsonResponse({
        status: 'ok',
        service: 'HyHyve Token Server',
        timestamp: new Date().toISOString()
      });
    }

    // 404 for unknown routes
    return jsonResponse({
      error: 'Not found',
      message: `Route ${pathname} not found`
    }, 404);
  },
});

console.log('');
console.log('🚀 HyHyve Token Server Started');
console.log('================================');
console.log(`📍 Server running on: http://localhost:${server.port}`);
console.log('');
console.log('📚 Available Endpoints:');
console.log(`   GET  /api/hyhyve-token        - Generate HyHyve token`);
console.log(`   GET  /health                  - Health status of the token server api`);
console.log('');
console.log('🧪 Test the token endpoint:');
console.log(`   curl -H "x-user-id: user1" http://localhost:${server.port}/api/hyhyve-token`);
console.log('');
console.log('👥 Available test users: user1, user2, user3');
console.log('');
