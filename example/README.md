# HyHyve SDK Examples

This directory contains interactive examples demonstrating different features of the HyHyve Client SDK.

## Running the Examples

```bash
# From the client-sdk directory
npm install
npm run example
```

This will start a local development server. Open your browser to view the examples (usually `http://localhost:5173`).

## Available Examples

### 1. Basic Example (`index.html`)
**Features:**
- Random user profile generation
- Corporate whitelabel configuration
- Interactive component controls (attach, destroy, randomize)
- Environment-based configuration

**Best for:**
- Getting started with the SDK
- Understanding whitelabel customization
- Testing different configurations

**Files:**
- `example.ts` - Main example logic
- `index.html` - Example page
- `utils/helpers.ts` - Utility functions
- `data/random-data.ts` - Sample data

---

### 2. JWT Authentication Example (`jwt-auth-example.html`)
**Features:**
- Secure JWT-based authentication
- Backend integration guide
- Security best practices
- Token management demonstration
- Interactive modal with backend code example

**Best for:**
- Production integrations requiring user authentication
- Understanding server-side token generation
- Learning JWT security patterns
- Implementing SSO/custom authentication

**Files:**
- `jwt-auth-example.ts` - JWT auth logic
- `jwt-auth-example.html` - JWT example page

**Important Notes:**
- This example uses mock tokens for demonstration
- In production, your backend must generate and sign JWTs
- NEVER expose your API key on the client side
- Use short token expiry times (5-15 minutes recommended)

---

### 3. Examples Hub (`index-examples.html`)
Landing page that links to all available examples with descriptions.

## File Structure

```
example/
├── README.md                    # This file
├── index-examples.html          # Examples hub/landing page
├── index.html                   # Basic example
├── example.ts                   # Basic example logic
├── jwt-auth-example.html        # JWT auth example
├── jwt-auth-example.ts          # JWT auth logic
├── data/
│   └── random-data.ts          # Sample data for examples
└── utils/
    └── helpers.ts              # Shared utility functions
```

## Backend Integration

For the JWT authentication example, you'll need a backend endpoint that:

1. Authenticates the user's session
2. Creates a JWT payload with user profile information
3. Signs the JWT with your HyHyve API key (HS256)
4. Returns the token and client ID

See `jwt-auth-example.ts` for a complete backend implementation example.

## Development Tips

### Testing with Local HyHyve Instance

To test against a local HyHyve server, uncomment the `baseUrl` option:

```typescript
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  baseUrl: 'http://localhost:1234', // Uncomment for local dev
});
```

### Environment Variables

The examples use environment detection to automatically switch between development and production URLs. See `utils/helpers.ts` for details.

### Customizing Examples

Feel free to modify these examples to test your own configurations:
- Change whitelabel settings
- Adjust user profiles
- Test different space IDs
- Experiment with authentication flows

## Resources

- [Full SDK Documentation](https://www.npmjs.com/package/@hyhyve/client-sdk)
- [HyHyve Platform](https://app.hyhyve.com)
- [API Reference](../README.md)
