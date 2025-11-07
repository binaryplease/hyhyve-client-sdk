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

// Track the current user
let currentUserId = 'user1'; // Default to Alice Johnson

// User display names for UI updates
const userDisplayNames: Record<string, string> = {
  'user1': 'Alice Johnson',
  'user2': 'Bob Smith',
  'user3': 'Carol Williams'
};

/**
 * Fetch JWT token from the backend server
 * The server authenticates the user and generates a signed JWT token
 */
async function fetchJWTFromBackend(userId: string): Promise<{ token: string, clientId: string }> {
  console.log(`🔐 Fetching JWT token for user: ${userId}`);

  try {
    const response = await fetch('http://localhost:3000/api/hyhyve-token', {
      method: 'GET',
      headers: {
        'x-user-id': userId,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch token');
    }

    const data = await response.json();
    console.log(`✅ Token received from server`);

    return {
      token: data.token,
      clientId: data.clientId
    };
  } catch (error) {
    console.error('❌ Error fetching token from backend:', error);
    throw error;
  }
}

/**
 * Update the UI to reflect the current user
 */
function updateUserUI(userId: string) {
  const currentUserEl = document.getElementById('currentUser');
  if (currentUserEl) {
    currentUserEl.textContent = `${userId} (${userDisplayNames[userId]})`;
  }

  // Update button states
  document.querySelectorAll('[data-user-id]').forEach((btn) => {
    const button = btn as HTMLButtonElement;
    const buttonUserId = button.getAttribute('data-user-id');
    if (buttonUserId === userId) {
      button.classList.add('active');
      button.disabled = true;
    } else {
      button.classList.remove('active');
      button.disabled = false;
    }
  });
}

/**
 * Attach HyHyve component with JWT authentication
 */
const attachHyHyveWithJWT = async (userId: string = currentUserId) => {
  const spaceId = getSpaceId();
  currentUserId = userId;

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
      baseUrl: import.meta.env.VITE_HYHYVE_BASE_URL, // Defaults to production when unset
    });

    if (statusEl) {
      statusEl.textContent = `✅ Connected as ${userDisplayNames[userId]}`;
      statusEl.style.color = '#4ade80';
    }

    // Update UI to show active user
    updateUserUI(userId);

    console.log(`🚀 HyHyve attached to space: ${spaceId} with JWT auth for ${userDisplayNames[userId]}`);
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

// User selection buttons
document.querySelectorAll('[data-user-id]').forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    const button = e.currentTarget as HTMLButtonElement;
    const userId = button.getAttribute('data-user-id');

    if (userId && userId !== currentUserId) {
      console.log(`🔄 Switching to user: ${userDisplayNames[userId]}`);

      // Destroy the current instance
      hyhyve.destroy();

      // Connect with the new user
      await attachHyHyveWithJWT(userId);
    }
  });
});

// Initial connection with JWT
attachHyHyveWithJWT(currentUserId);

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
  attachHyHyveWithJWT(currentUserId);
  console.log(`Reconnecting with new JWT for ${userDisplayNames[currentUserId]}...`);
});
