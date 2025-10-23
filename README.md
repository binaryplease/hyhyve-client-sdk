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
    "color": "#007bff",
    "picture": "https://example.com/avatar.jpg",
    "socials": ["https://linkedin.com/in/johndoe"],
    "headline": "Software Engineer",
    "emoji": "👋",
    "status": "Available"
  }
}
```

**Required Fields:**
- `clientReferenceId`: Your unique user identifier
- `profile.name`: User's display name (max 80 chars)

**Optional Profile Fields:**
- `profile.color`: Hex color code (default: "#0eb3bc")
- `profile.picture`: URL to profile picture (max 1024 chars, default: "")
- `profile.socials`: Array of social URLs (max 5, default: [])
- `profile.headline`: User's headline/bio (max 240 chars, default: "")
- `profile.emoji`: User's emoji (max 32 chars, default: "👋")
- `profile.status`: Status message (max 100 chars, default: "Hi there, I'm using HyHyve!"
```

**Backend Example (Node.js):**

```typescript
import jwt from 'jsonwebtoken';

// Generate JWT token for a user (on your backend)
function generateHyHyveToken(userId: string, userProfile: any) {
  const payload = {
    clientReferenceId: userId,
    profile: {
      name: userProfile.name, // Required
      color: '#007bff',
      picture: userProfile.avatarUrl,
      socials: userProfile.socialLinks || [],
      headline: userProfile.title || '',
      emoji: '👋',
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
      name: 'John Doe',  // Required
      color: '#007bff',   // Optional
      picture: 'https://example.com/avatar.jpg',
      socials: ['https://linkedin.com/in/johndoe'],
      headline: 'Software Engineer',
      emoji: '👋',
      status: 'Available'
    }
  }
});
```

## Whitelabel Configuration

The SDK provides comprehensive whitelabel customization options to integrate HyHyve seamlessly into your application with your own branding.

📖 **[Complete WhiteLabel Documentation](./WHITELABEL.md)**

### Quick Examples

#### Using Presets

The SDK includes several preset configurations for common use cases:

```typescript
import { 
  blankWhitelabelPreset,
  basicConfig,
  embeddedConfig,
  corporateConfig 
} from '@hyhyve/client-sdk';

// Complete branding removal
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: blankWhitelabelPreset
});

// Corporate branding with full themes
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

For detailed configuration options, type definitions, and advanced examples, see the **[WhiteLabel Configuration Guide](./WHITELABEL.md)**.

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

## Run Live Example

The SDK includes a working example.


1. Start nix development shell

```sh
nix develop
```

2. Run the example dev server
 
```sh
just dev-example
```

### No nix?

Get it! https://nixos.org/download/

Otherwise use [Bun](https://bun.com/) to run the bunx commands in the [justfile](./justfile) yourself.

[<img src="./docs/images/bun.svg" width="50" height="50" />](https://bun.com/)



## License

MIT
