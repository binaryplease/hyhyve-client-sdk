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


## License

MIT
