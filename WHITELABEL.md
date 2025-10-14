# WhiteLabel Configuration Guide

This guide provides comprehensive documentation for the WhiteLabel configuration system in the HyHyve Client SDK. The WhiteLabel system allows for extensive customization of the HyHyve application's appearance and behavior, enabling seamless integration into third-party applications and custom branding scenarios.

## Table of Contents

- [Overview](#overview)
- [WhiteLabel Settings](#whitelabel-settings)
- [Preset Configurations](#preset-configurations)
- [Usage Examples](#usage-examples)
- [Integration Guide](#integration-guide)
- [Best Practices](#best-practices)

## Overview

The WhiteLabel system controls various aspects of the HyHyve application's appearance and behavior for whitelabel/embedded implementations. It provides granular control over UI elements, branding, themes, and features.

All WhiteLabel types are available as TypeScript exports:

```typescript
import type { 
  WhitelabelSettings, 
  Brand, 
  Colors, 
  Logo, 
  Font,
  Language, 
  Theme 
} from '@hyhyve/client-sdk';
```

## WhiteLabel Settings

The complete `WhitelabelSettings` interface provides the following configuration options:

```typescript
export interface WhitelabelSettings {
  // UI/Branding Control
  hideLogo?: boolean;                    // Hide the HyHyve logo from the interface
  hideHelpButton?: boolean;              // Remove the help button from the UI
  
  // Settings Control
  hideUpdatesButton?: boolean;           // Hide the updates/changelog button
  hideLanguageSelector?: boolean;        // Remove language selection dropdown
  hideThemeSelector?: boolean;           // Remove theme selection toggle
  hidePrivacyLinks?: boolean;            // Hide legal links (Impressum, Datenschutz, Terms of Service)
  hideVersionNumber?: boolean;           // Hide application version display
  
  // Profile Control
  hideEditProfile?: boolean;             // Remove edit profile functionality
  hideDeleteAccount?: boolean;           // Hide account deletion option
  
  // Feature Control
  simplifyChatStickers?: boolean;        // Simplify chat sticker interface
  customBrand?: Brand | null;            // Apply custom brand configuration
  forceTheme?: Theme | null;             // Lock the application to a specific theme ("light" | "dark")
  forceLang?: Language | null;           // Lock the application to a specific language ("en" | "de")
  embedMode?: boolean;                   // Enable optimizations for SDK/embedded integration
}
```

### Supporting Types

#### Brand Configuration

```typescript
export interface Brand {
  themes?: {
    light?: Colors;                      // Color scheme for light theme
    dark?: Colors;                       // Color scheme for dark theme
  };
  logo?: Logo;                          // Logo configuration
  font?: Font;                          // Font color settings
  brand?: string;                       // Brand name string
  landingPageGradient?: Color[];        // Array of colors for landing page gradient
}
```

#### Logo Configuration

```typescript
export interface Logo {
  plain?: string;                       // Simple logo URL (theme-independent)
  full?: {
    light?: string;                     // Logo for light theme
    dark?: string;                      // Logo for dark theme
  };
  poweredByHyhyve?: boolean;           // Whether to show "Powered by HyHyve" attribution
}
```

#### Color Palette

```typescript
export interface Colors {
  red?: Color;                         // Status color for errors/warnings
  yellow?: Color;                      // Status color for warnings
  green?: Color;                       // Status color for success
  shade1?: Color;                      // Lightest shade for backgrounds
  shade2?: Color;                      // Light shade for subtle backgrounds
  shade3?: Color;                      // Medium shade for borders/dividers
  shade4?: Color;                      // Active state (opposite of shade1)
  primary?: Color;                     // Main brand color used throughout interface
  shadow?: Color;                      // Color used for drop shadows and depth effects
}
```

#### Font Colors

```typescript
export interface Font {
  light?: Color;                       // Font color for light theme
  dark?: Color;                        // Font color for dark theme
}
```

#### Basic Types

```typescript
export type Language = "en" | "de";    // Supported languages: English | German
export type Theme = "light" | "dark";  // Available UI themes
export type Color = string;            // Color values as hex strings (e.g., "#FF5733")
```

## Preset Configurations

The SDK includes several pre-configured presets for common use cases:

```typescript
import { 
  blankWhitelabelPreset,
  basicConfig,
  embeddedConfig,
  corporateConfig 
} from '@hyhyve/client-sdk';
```

### Blank WhiteLabel Preset

Complete HyHyve branding removal with maximum customization potential:

```typescript
export const blankWhitelabelPreset: WhitelabelSettings = {
  hideLogo: true,                       // Remove HyHyve branding
  hideHelpButton: true,                 // Simplify interface
  hideUpdatesButton: true,              // Remove update notifications
  hideLanguageSelector: true,           // German only
  hideThemeSelector: true,              // Force dark theme
  hidePrivacyLinks: true,               // Remove legal links (Impressum, Datenschutz, TOS)
  hideVersionNumber: true,              // Clean interface
  hideEditProfile: true,                // Hide profile management
  hideDeleteAccount: true,              // Hide account deletion
  simplifyChatStickers: true,           // Simplify chat interface
  customBrand: null,                    // Ready for custom branding
  forceTheme: "dark",                   // Always dark theme
  forceLang: "de",                      // German only
  embedMode: true,                      // Enable embed optimizations
};
```

**Features:**
- Complete HyHyve branding removal
- Simplified interface with minimal UI elements
- German-only interface with dark theme
- Embed-optimized for SDK integration
- Ready for custom branding

### Basic Configuration

Demonstrates basic customization with custom branding:

```typescript
export const basicConfig: WhitelabelSettings = {
  hideLogo: true,
  hidePrivacyLinks: true,
  customBrand: {
    brand: "My Company",
    logo: {
      full: {
        light: "/whitelabel-example-logo.367bd496.png",
        dark: "/whitelabel-example-logo.367bd496.png"
      },
    },
    themes: {
      light: {
        primary: "#007bff",
        shade1: "#f8fafc"
      },
      dark: {
        primary: "#0d6efd",
        shade1: "#0f172a"
      }
    }
  }
};
```

### Embedded Configuration

Optimized for embedded/SDK integration:

```typescript
export const embeddedConfig: WhitelabelSettings = {
  embedMode: true,
  hideLogo: true,
  hideHelpButton: true,
  hidePrivacyLinks: true,
  forceTheme: "light",
  customBrand: {
    brand: "Embedded Chat",
    themes: {
      light: {
        primary: "#28a745"
      }
    }
  }
};
```

### Corporate Configuration

Comprehensive corporate branding with full theme customization:

```typescript
export const corporateConfig: WhitelabelSettings = {
  customBrand: {
    brand: "Corporate Solutions",
    logo: {
      full: {
        light: "/whitelabel-example-logo.367bd496.png",
        dark: "/whitelabel-example-logo.367bd496.png"
      },
      poweredByHyhyve: false
    },
    themes: {
      light: {
        primary: "#1d4ed8", // blue-700
        shade1: "#f8fafc", // slate-50
        shade2: "#f1f5f9", // slate-100
        shade3: "#e2e8f0", // slate-200
        shade4: "#475569", // slate-600 (active state)
        green: "#22c55e", // green-500
        yellow: "#eab308", // yellow-500
        red: "#ef4444" // red-500
      },
      dark: {
        primary: "#60a5fa", // blue-400
        shade1: "#0f172a", // slate-900
        shade2: "#1e293b", // slate-800
        shade3: "#334155", // slate-700
        shade4: "#cbd5e1", // slate-300 (active state)
        green: "#4ade80", // green-400
        yellow: "#facc15", // yellow-400
        red: "#f87171" // red-400
      }
    },
    font: {
      light: "#f0f2ff",
      dark: "#1e2137"
    },
    landingPageGradient: ["#667eea", "#764ba2"]
  },
  hidePrivacyLinks: true,
  hideVersionNumber: true,
  hideDeleteAccount: true,
  hideEditProfile: true,
  embedMode: true,
  forceTheme: "light",
  forceLang: "de",
};
```

## Usage Examples

### SDK Integration

```typescript
import { HyHyveComponent, blankWhitelabelPreset } from '@hyhyve/client-sdk';

const hyhyve = new HyHyveComponent();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  embedded: true,
  whitelabelSettings: blankWhitelabelPreset
});
```

### Custom Configuration

```typescript
import { HyHyveComponent } from '@hyhyve/client-sdk';
import type { WhitelabelSettings } from '@hyhyve/client-sdk';

const customWhitelabel: WhitelabelSettings = {
  hideLogo: true,
  hidePrivacyLinks: true,
  embedMode: true,
  forceTheme: 'dark',
  customBrand: {
    brand: 'My Company',
    logo: {
      full: {
        light: '/my-logo-light.png',
        dark: '/my-logo-dark.png'
      }
    },
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
};

const hyhyve = new HyHyveComponent();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: customWhitelabel
});
```

### Runtime Configuration Updates

```typescript
// Create component with initial settings
const hyhyve = new HyHyveComponent();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: basicConfig
});

// Update settings dynamically
const newSettings: WhitelabelSettings = {
  ...basicConfig,
  forceTheme: 'light',
  customBrand: {
    ...basicConfig.customBrand,
    brand: 'Updated Brand Name'
  }
};

// Re-attach with new settings
hyhyve.destroy();
hyhyve.attach('#container', {
  spaceId: 'your-space-id',
  whitelabelSettings: newSettings
});
```

## Integration Guide

### Theme Customization Best Practices

1. **Consistent Color Palette**: Use the shade system (`shade1`-`shade4`) to create visual hierarchy:
   - `shade1`: Page/container backgrounds
   - `shade2`: Card/component backgrounds  
   - `shade3`: Borders, dividers
   - `shade4`: Text, icons, active states (opposite of shade1)

2. **Accessibility**: Ensure sufficient contrast between text and background colors:
   - Test with accessibility tools
   - Follow WCAG 2.1 guidelines
   - Provide both light and dark theme variants

3. **Brand Alignment**: 
   - Use your brand's primary color consistently
   - Complement with appropriate secondary colors
   - Maintain brand guidelines across themes

4. **Cross-theme Support**: Always provide both light and dark theme configurations for the best user experience.

### Logo Guidelines

```typescript
// Recommended logo configuration
logo: {
  full: {
    light: '/logo-dark-text.png',    // Dark logo for light backgrounds
    dark: '/logo-light-text.png'     // Light logo for dark backgrounds
  },
  poweredByHyhyve: false            // Hide attribution for full whitelabel
}
```

### Color System

The HyHyve color system uses a semantic approach:

```typescript
themes: {
  light: {
    primary: "#1d4ed8",      // Your brand color
    shade1: "#f8fafc",       // Page background
    shade2: "#f1f5f9",       // Card background
    shade3: "#e2e8f0",       // Border color
    shade4: "#475569",       // ⚠️ Background color for active state
    green: "#22c55e",        // Success states
    yellow: "#eab308",       // Warning states
    red: "#ef4444",          // Error states
    shadow: "#0000001a"      // Drop shadows
  }
}
```

### Embed Mode Optimizations

When `embedMode: true` is set, the following optimizations are applied:

- Reduced padding and margins for compact display
- Simplified navigation elements
- Optimized event handling for iframe contexts
- Enhanced performance for embedded scenarios
- Better mobile responsiveness in constrained spaces

## Best Practices

### 1. Progressive Enhancement

Start with a preset and customize as needed:

```typescript
import { blankWhitelabelPreset } from '@hyhyve/client-sdk';

const myConfig: WhitelabelSettings = {
  ...blankWhitelabelPreset,
  customBrand: {
    brand: "My Company",
    themes: {
      dark: {
        primary: "#ff6b35"
      }
    }
  }
};
```

### 2. Environment-Specific Configuration

```typescript
const isDevelopment = process.env.NODE_ENV === 'development';

const whitelabelConfig: WhitelabelSettings = {
  hideLogo: !isDevelopment,           // Show logo in development
  hideVersionNumber: !isDevelopment,  // Show version in development
  embedMode: true,
  customBrand: {
    brand: isDevelopment ? "Dev Mode" : "Production App"
  }
};
```

### 3. TypeScript Integration

Leverage TypeScript for better developer experience:

```typescript
import type { WhitelabelSettings, Colors } from '@hyhyve/client-sdk';

// Create reusable color palettes
const brandColors: Colors = {
  primary: "#1d4ed8",
  shade1: "#f8fafc", // slate-50
  shade2: "#f1f5f9", // slate-100
  shade3: "#e2e8f0", // slate-200
  shade4: "#475569"  // slate-600 (active state)
};

// Type-safe configuration
const config: WhitelabelSettings = {
  customBrand: {
    themes: {
      light: brandColors,
      dark: {
        ...brandColors,
        primary: "#60a5fa",
        shade1: "#0f172a"
      }
    }
  }
};
```

### 4. Performance Considerations

- Prefer presets over complex custom configurations
- Use CDN URLs for logos and assets
- Optimize images (WebP, appropriate sizing)
- Test performance in embedded contexts

### 5. Testing

Always test your whitelabel configuration across:

- Different screen sizes and devices
- Both light and dark themes (if supported)
- Various browsers
- Embedded and standalone contexts
- Different user interaction patterns

## Validation

The SDK includes validation for whitelabel settings:

```typescript
export interface WhitelabelValidationResult {
  success: boolean;
  error: string | null;
}
```

This ensures that your configuration is valid and will work as expected in the HyHyve application.

---

For more examples and integration patterns, see the [main README](./README.md) and the included examples in the `example/` directory.