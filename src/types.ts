/**
 * TypeScript definitions for WhitelabelSettings
 * 
 * This file contains TypeScript interfaces that correspond to the whitelabel
 * configuration types used in the HyHyve application.
 */

// Language types
export type Language = "en" | "de";

// Theme types
export type Theme = "light" | "dark";

// Color type - represented as hex string in JSON
export type Color = string;

// Font type
export interface Font {
  light?: Color;
  dark?: Color;
}

// Colors type
export interface Colors {
  red?: Color;
  yellow?: Color;
  green?: Color;
  shade1?: Color;
  shade2?: Color;
  shade3?: Color;
  shade4?: Color;
  primary?: Color;
  shadow?: Color;
}

// Logo type
export interface Logo {
  plain?: string;
  full?: {
    light?: string;
    dark?: string;
  };
  poweredByHyhyve?: boolean;
}

// Brand type
export interface Brand {
  themes?: {
    light?: Colors;
    dark?: Colors;
  };
  logo?: Logo;
  font?: Font;
  brand?: string;
  landingPageGradient?: Color[];
}

/**
 * WhitelabelSettings interface
 *
 * Controls various aspects of the HyHyve application's appearance and behavior
 * for whitelabel/embedded implementations.
 */
export interface WhitelabelSettings {
  // UI/Branding Control
  /** Hide the HyHyve logo */
  hideLogo?: boolean;
  /** Hide the help button */
  hideHelpButton?: boolean;

  // Settings Control
  /** Hide the updates button */
  hideUpdatesButton?: boolean;
  /** Hide the language selector */
  hideLanguageSelector?: boolean;
  /** Hide the theme selector */
  hideThemeSelector?: boolean;
  /** Hide privacy links (Impressum, Datenschutz, TOS) */
  hidePrivacyLinks?: boolean;
  /** Hide the version number */
  hideVersionNumber?: boolean;

  // Profile Control
  /** Hide the edit profile option */
  hideEditProfile?: boolean;
  /** Hide the delete account option */
  hideDeleteAccount?: boolean;

  // Simplify features
  /** Simplify chat stickers */
  simplifyChatStickers?: boolean;

  // Custom Branding
  /** Custom brand configuration */
  customBrand?: Brand | null;

  // Feature Control
  /** Force a specific theme */
  forceTheme?: Theme | null;
  /** Force a specific language */
  forceLang?: Language | null;

  // Integration Settings
  /** Enable embed mode for SDK integration */
  embedMode?: boolean;
}

/**
 * Validation result type for whitelabel settings
 */
export interface WhitelabelValidationResult {
  success: boolean;
  error: string | null;
}