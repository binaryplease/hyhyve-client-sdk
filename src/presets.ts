import { WhitelabelSettings } from './types';

/**
 * Blank whitelabel preset that removes all HyHyve branding and enables maximum customization.
 * 
 * Based on requirements:
 * - Remove all HyHyve branding (logo, favicon)
 * - Hide legal links (Impressum, Datenschutz, TOS)
 * - Remove help button and updates
 * - Force German language only
 * - Force dark theme
 * - Remove logout button
 * - Hide version number
 * - Simplify chat stickers
 * - Enable embed mode for SDK integration
 */
export const blankWhitelabelPreset: WhitelabelSettings = {
  // UI/Branding Control - hide all HyHyve branding
  hideLogo: true,
  hideHelpButton: true,
  hideUpdatesButton: true,
  hideLanguageSelector: true, // German only
  hideThemeSelector: true, // Force dark theme
  hidePrivacyLinks: true, // Remove Impressum, Datenschutz, TOS
  hideVersionNumber: true,

  // Profile Control - hide profile management
  hideEditProfile: true,
  hideDeleteAccount: true,
  simplifyChatStickers: true,

  // Custom Branding - ready for customization
  customBrand: null, // Can be set by integrator

  // Feature Control - optimized for whitelabel
  forceTheme: "dark", // Always dark theme
  forceLang: "de", // German only as requested

  // Integration Settings - optimized for SDK
  embedMode: true, // Enable embed mode
};

/**
 * Basic WhiteLabel Configuration Example
 *
 * Demonstrates basic customization with custom branding and logo configuration.
 * Hides HyHyve logo and privacy links while applying custom brand colors.
 */
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
        shade1: "#f8fafc", // slate-50
        shade2: "#f1f5f9", // slate-100
        shade3: "#e2e8f0", // slate-200
        shade4: "#475569"  // slate-600 (active state)
      },
      dark: {
        primary: "#0d6efd",
        shade1: "#0f172a", // slate-900
        shade2: "#1e293b", // slate-800
        shade3: "#334155", // slate-700
        shade4: "#cbd5e1"  // slate-300 (active state for dark)
      }
    }
  }
};

/**
 * Minimal Embedded Configuration Example
 *
 * Optimized for embedded/SDK integration with minimal UI elements
 * and custom branding for embedded chat scenarios.
 */
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
        primary: "#28a745",
        shade1: "#f8fafc", // slate-50
        shade2: "#f1f5f9", // slate-100
        shade3: "#e2e8f0", // slate-200
        shade4: "#475569"  // slate-600 (active state)
      }
    }
  }
};

/**
 * Corporate Branding Example
 *
 * Comprehensive corporate branding configuration with full theme customization,
 * custom logo, font colors, and landing page gradient. Includes complete
 * color palette for both light and dark themes.
 */
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