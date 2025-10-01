/**
 * HyHyve Client SDK
 * 
 * A TypeScript SDK for embedding HyHyve spaces in web applications using Web Components.
 * 
 * @example
 * ```typescript
 * import { HyHyveComponent } from '@hyhyve/client-sdk';
 * 
 * const hyhyve = new HyHyveComponent();
 * hyhyve.attach('#my-container', {
 *   spaceId: 'your-space-id',
 *   embedded: true,
 *   whitelabelSettings: {
 *     hideLogo: true,
 *     embedMode: true
 *   }
 * });
 * ```
 */

// Export main component
export { HyHyveComponent, default } from './hyhyve';

// Export types
export type {
  HyHyveOptions,
} from './hyhyve';

export type {
  WhitelabelSettings,
  Language,
  Theme,
  Color,
  Font,
  Colors,
  Logo,
  Brand,
  WhitelabelValidationResult
} from './types';

// Export presets and utilities
export {
  blankWhitelabelPreset,
  basicConfig,
  embeddedConfig,
  corporateConfig
} from './presets';