import { HyHyveComponent, corporateConfig } from '../src/index';
import { generateRandomName, generateRandomHeadline, getBaseUrl, getSpaceId } from './utils/helpers';

/**
 * HyHyve Client SDK Example
 * 
 * This example demonstrates how to use the HyHyve component with:
 * - Random user profile generation
 * - Environment-based configuration
 * - Interactive demo controls
 * 
 * The code has been split into focused modules:
 * - data/random-data.ts: Sample data for generating profiles
 * - utils/helpers.ts: Utility functions for configuration
 */

// Initialize the HyHyve component
const hyhyve = new HyHyveComponent();

/**
 * Attach HyHyve component with random user profile
 */
const attachHyHyve = () => {
  const spaceId = getSpaceId();
  const randomName = generateRandomName();
  const randomHeadline = generateRandomHeadline();

  console.log(`Attaching to space: ${spaceId} as ${randomName} (${randomHeadline})`);

  hyhyve.attach("#hyhyve", {
    spaceId: spaceId,
    embedded: true,
    whitelabelSettings: corporateConfig,
    auth: {
      tag: "complete",
      profile: {
        name: randomName,
        avatar: 'avatar2',
        color: corporateConfig.customBrand?.themes?.dark?.primary || "#60a5fa",
        picture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
        socials: ['http://www.example.com/', 'https://linkedin.com/in/example'],
        headline: randomHeadline,
        distance: 10.0,
        emoji: '🚀',
        status: 'Ready to connect!'
      }
    },

    // NOTE: For production embedding, do NOT set baseUrl - it will default to https://app.hyhyve.com/
    // This baseUrl setting is only for local development/testing purposes
    baseUrl: getBaseUrl(), // ! Did you read the comment above?
  });
};

// Initial attachment
attachHyHyve();

/**
 * Event handlers for demo buttons
 */

// Destroy component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('Component destroyed!');
});

// Attach with new random identity
document.getElementById('attachBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attachHyHyve();
  console.log('Component attached!');
});

// Generate new random identity and reconnect
document.getElementById('randomizeBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attachHyHyve();
  console.log('New random identity generated and attached!');
});