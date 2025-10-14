# HyHyve Client SDK

A TypeScript SDK for embedding HyHyve spaces in web applications using Web Components.

## Installation

```bash
npm install @hyhyve/client-sdk
```

## Quick Start

### Basic Usage

```typescript
import { HyHyveComponent } from '@hyhyve/client-sdk';

const hyhyve = new HyHyveComponent();
hyhyve.attach('#my-container', {
  spaceId: 'your-space-id',
  embedded: true
});
```

### HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { HyHyveComponent } from 'https://unpkg.com/@hyhyve/client-sdk/dist/index.es.js';
    
    const hyhyve = new HyHyveComponent();
    hyhyve.attach('#hyhyve', {
      spaceId: 'your-space-id',
      embedded: true
    });
  </script>
</head>
<body>
  <div id="hyhyve" style="width: 100%; height: 500px;"></div>
</body>
</html>
```

## Configuration Options

### HyHyveOptions

```typescript
interface HyHyveOptions {
  spaceId?: string;           // The HyHyve space ID to load
  eventId?: string;           // Optional event ID
  embedded?: boolean;         // Enable embedded mode
  baseUrl?: string;           // Custom base URL (default: https://app.hyhyve.com)
  whitelabelSettings?: WhitelabelSettings;  // Customization options
  auth?: AuthOptions;         // Pre-authentication options
}
```

### Authentication

#### JWT Authentication (Recommended)

Authenticate users with a JWT token signed by your backend server:

```typescript
const hyhyve = new HyHyveComponent();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  auth: {
    tag: "jwt",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // JWT signed with your API key
    clientId: 'your-client-id'
  }
});
```

The JWT should be signed by your backend using your HyHyve API key (HS256 algorithm) with the following payload:

```json
{
  "clientReferenceId": "your-user-id",
  "profile": {
    "name": "John Doe",
    "avatar": "avatar1",
    "color": "#007bff",
    "picture": "https://example.com/avatar.jpg",
    "socials": ["https://linkedin.com/in/johndoe"],
    "headline": "Software Engineer",
    "distance": 0,
    "emoji": "👋",
    "tag": "HyHyve",
    "status": "Available"
  }
}
```

**Backend Example (Node.js):**

```typescript
import jwt from 'jsonwebtoken';

// Generate JWT token for a user (on your backend)
function generateHyHyveToken(userId: string, userProfile: any) {
  const payload = {
    clientReferenceId: userId,
    profile: {
      name: userProfile.name,
      avatar: 'avatar1',
      color: '#007bff',
      picture: userProfile.avatarUrl,
      socials: userProfile.socialLinks || [],
      headline: userProfile.title || '',
      distance: 0,
      emoji: '👋',
      tag: 'HyHyve',
      status: 'Available'
    }
  };

  // Sign with your HyHyve API key
  return jwt.sign(payload, process.env.HYHYVE_API_KEY!, {
    algorithm: 'HS256',
    expiresIn: '5m' // Short expiry recommended
  });
}

// API endpoint to get token
app.get('/api/hyhyve-token', authenticateUser, (req, res) => {
  const token = generateHyHyveToken(req.user.id, req.user.profile);
  res.json({ token, clientId: process.env.HYHYVE_CLIENT_ID });
});
```

**Frontend Usage:**

```typescript
// Fetch token from your backend
const response = await fetch('/api/hyhyve-token');
const { token, clientId } = await response.json();

// Use token to authenticate with HyHyve
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  auth: { tag: "jwt", token, clientId }
});
```

#### Direct Profile Authentication

Alternatively, pass the user profile directly (client-side only):

```typescript
const hyhyve = new HyHyveComponent();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  auth: {
    tag: "complete",
    profile: {
      name: 'John Doe',
      avatar: 'avatar1',
      color: '#007bff',
      picture: 'https://example.com/avatar.jpg',
      socials: ['https://linkedin.com/in/johndoe'],
      headline: 'Software Engineer',
      distance: 5.0,
      emoji: '👋',
      status: 'Available'
    }
  }
});
```

## Whitelabel Configuration Examples

The SDK includes several preset configurations for common use cases:

### Available Presets

```typescript
import { 
  blankWhitelabelPreset,
  basicConfig,
  embeddedConfig,
  corporateConfig 
} from '@hyhyve/client-sdk';
```

#### Blank Preset
Removes all HyHyve branding for maximum customization:

```typescript
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: blankWhitelabelPreset
});
```

#### Corporate Config
Full corporate branding with custom themes:

```typescript
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: corporateConfig
});
```

#### Custom Configuration

```typescript
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: {
    hideLogo: true,
    hidePrivacyLinks: true,
    embedMode: true,
    forceTheme: 'dark',
    customBrand: {
      brand: 'My Company',
      themes: {
        dark: {
          primary: '#ff6b35',
          shade1: '#0f172a', // slate-900
          shade2: '#1e293b', // slate-800
          shade3: '#334155', // slate-700
          shade4: '#cbd5e1'  // slate-300 (active state)
        }
      }
    }
  }
});
```

## API Methods

### attach(targetElement, options)

Attaches the HyHyve component to a DOM element.

```typescript
// Using selector string
hyhyve.attach('#my-container', options);

// Using HTMLElement
const element = document.getElementById('my-container');
hyhyve.attach(element, options);

// Auto-attach to #hyhyve
hyhyve.attach(undefined, options);
```

### destroy()

Destroys the component and cleans up resources.

```typescript
hyhyve.destroy();
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions. All types are exported for use in your applications:

```typescript
import type { 
  HyHyveOptions, 
  WhitelabelSettings, 
  Language, 
  Theme 
} from '@hyhyve/client-sdk';
```

## Live Examples

The SDK includes several working examples that demonstrate different features:

### Basic Example
- **File**: `example/example.html`
- **Features**: Random user profiles, corporate whitelabel config, interactive controls
- **Run**: `npm run example`

### JWT Authentication Example
- **File**: `example/jwt-auth-example.html`
- **Features**: Secure JWT-based authentication, backend integration guide, modal with backend code
- **Description**: Demonstrates how to implement server-side JWT authentication for secure user login
- **Key Points**:
  - Shows client-side integration
  - Includes backend implementation example
  - Explains security best practices
  - Mock token fetching (replace with real API call)

To run the examples locally:
```bash
cd client-sdk
npm install
npm run example
```

Then open your browser to the local development server (usually `http://localhost:5173`).

## License

MIT
