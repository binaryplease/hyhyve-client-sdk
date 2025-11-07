import { HyHyveComponent, blankWhitelabelPreset } from '@hyhyve/client-sdk';
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
      baseUrl: 'http://localhost:1234', // Uncomment for local dev
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
 * ```javascript
 * const jwt = require('jsonwebtoken');
 * const express = require('express');
 * const app = express();
 * 
 * app.get('/api/hyhyve-token', async (req, res) => {
 *   // 1. Verify user session (your auth logic)
 *   const user = req.user; // from your session/auth middleware
 *   
 *   // 2. Create JWT payload
 *   const payload = {
 *     sub: user.id,
 *     name: user.name,
 *     email: user.email,
 *     picture: user.avatarUrl,
 *     iat: Math.floor(Date.now() / 1000)
 *   };
 *   
 *   // 3. Sign with your HyHyve API key (keep this secret!)
 *   const token = jwt.sign(payload, process.env.HYHYVE_API_KEY, {
 *     algorithm: 'HS256',
 *     expiresIn: '1h'
 *   });
 *   
 *   // 4. Return token and clientId
 *   res.json({
 *     token: token,
 *     clientId: process.env.HYHYVE_CLIENT_ID
 *   });
 * });
 * ```
 */

/**
 * Event handlers for demo buttons
 */

// Initial connection with JWT
attachHyHyveWithJWT();

// Destroy component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('Component destroyed!');

  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = '⏸️ Disconnected';
    statusEl.style.color = '#9ca3af';
  }
});

// Reconnect with JWT
document.getElementById('reconnectBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attachHyHyveWithJWT();
  console.log('Reconnecting with new JWT...');
});
