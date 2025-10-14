import { HyHyveComponent, blankWhitelabelPreset } from '../src/index';
import { getSpaceId } from './utils/helpers';

/**
 * HyHyve Client SDK - JWT Authentication Example
 * 
 * This example demonstrates how to use JWT authentication with the HyHyve SDK.
 * In a real-world scenario, you would fetch the JWT token from your backend server.
 * 
 * IMPORTANT: This is a CLIENT-SIDE example only. In production:
 * 1. Your backend server creates and signs the JWT with your API key
 * 2. Your frontend fetches the token from your backend
 * 3. The token is passed to the HyHyve SDK
 * 
 * NEVER expose your API key on the client side!
 */

// Initialize the HyHyve component
const hyhyve = new HyHyveComponent();

/**
 * Mock function to simulate fetching JWT token from backend
 * In production, this would be an actual API call to your server
 */
async function fetchJWTFromBackend(userId: string): Promise<{ token: string, clientId: string }> {
  // MOCK IMPLEMENTATION - Replace with actual API call
  // Example: const response = await fetch('/api/hyhyve-token');
  // return await response.json();

  console.log(`🔐 Fetching JWT token for user: ${userId}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, your backend would:
  // 1. Verify the user's session
  // 2. Create a JWT payload with user profile
  // 3. Sign it with your HyHyve API key (HS256)
  // 4. Return the token and clientId

  return {
    token: 'MOCK_JWT_TOKEN_REPLACE_WITH_REAL_TOKEN',
    clientId: 'MOCK_CLIENT_ID_REPLACE_WITH_REAL_ID'
  };
}

/**
 * Attach HyHyve component with JWT authentication
 */
const attachHyHyveWithJWT = async () => {
  const spaceId = getSpaceId();
  const userId = 'user-' + Math.random().toString(36).substring(7);

  try {
    // Show loading state
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = '🔄 Fetching authentication token...';
      statusEl.style.color = '#fbbf24';
    }

    // Fetch JWT token from your backend
    const { token, clientId } = await fetchJWTFromBackend(userId);

    console.log(`✅ JWT token received for user: ${userId}`);

    // Attach HyHyve with JWT auth
    hyhyve.attach("#hyhyve", {
      spaceId: spaceId,
      embedded: true,
      whitelabelSettings: blankWhitelabelPreset,
      auth: {
        tag: "jwt",
        token: token,
        clientId: clientId
      },
      // For local development only - remove in production
      // baseUrl: 'http://localhost:1234', // Uncomment for local dev
    });

    if (statusEl) {
      statusEl.textContent = '✅ Connected with JWT authentication';
      statusEl.style.color = '#4ade80';
    }

    console.log(`🚀 HyHyve attached to space: ${spaceId} with JWT auth`);
  } catch (error) {
    console.error('❌ Failed to authenticate:', error);
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = '❌ Authentication failed: ' + (error as Error).message;
      statusEl.style.color = '#ef4444';
    }
  }
};

/**
 * Backend Integration Example
 * 
 * Here's what your backend endpoint should look like (Node.js/Express example):
 * 
 * ```typescript
 * import express from 'express';
 * import jwt from 'jsonwebtoken';
 * 
 * const app = express();
 * 
 * // Middleware to authenticate user session
 * function authenticateUser(req, res, next) {
 *   // Your session/auth logic here
 *   if (!req.session?.userId) {
 *     return res.status(401).json({ error: 'Unauthorized' });
 *   }
 *   next();
 * }
 * 
 * // Endpoint to generate HyHyve JWT token
 * app.get('/api/hyhyve-token', authenticateUser, async (req, res) => {
 *   const user = await getUserById(req.session.userId);
 *   
 *   const payload = {
 *     clientReferenceId: user.id,
 *     profile: {
 *       name: user.name,
 *       avatar: 'avatar1',
 *       color: '#007bff',
 *       picture: user.avatarUrl || '',
 *       socials: user.socialLinks || [],
 *       headline: user.title || '',
 *       distance: 0,
 *       emoji: '👋',
 *       tag: 'HyHyve',
 *       status: 'Available'
 *     }
 *   };
 *   
 *   // Sign with your HyHyve API key (NEVER expose this to clients!)
 *   const token = jwt.sign(payload, process.env.HYHYVE_API_KEY!, {
 *     algorithm: 'HS256',
 *     expiresIn: '5m' // Short expiry recommended
 *   });
 *   
 *   res.json({
 *     token,
 *     clientId: process.env.HYHYVE_CLIENT_ID
 *   });
 * });
 * ```
 */

// Initial attachment
attachHyHyveWithJWT();

/**
 * Event handlers for demo buttons
 */

// Destroy component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('🗑️ Component destroyed!');
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = '⚪ Component destroyed';
    statusEl.style.color = '#94a3b8';
  }
});

// Reconnect with new JWT token
document.getElementById('reconnectBtn')?.addEventListener('click', () => {
  console.log('🔄 Reconnecting with new JWT token...');
  hyhyve.destroy();
  attachHyHyveWithJWT();
});

// Show backend code example
document.getElementById('showBackendBtn')?.addEventListener('click', () => {
  const modal = document.getElementById('backendModal');
  if (modal) {
    modal.style.display = 'flex';
  }
});

// Close modal
document.getElementById('closeModalBtn')?.addEventListener('click', () => {
  const modal = document.getElementById('backendModal');
  if (modal) {
    modal.style.display = 'none';
  }
});

// Copy backend code
document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
  const code = document.getElementById('backendCode')?.textContent || '';
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('copyCodeBtn');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  });
});
