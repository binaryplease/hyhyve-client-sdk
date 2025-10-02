import { firstNames, lastNames, adjectives, roles } from '../data/random-data';

/**
 * Utility functions for the HyHyve example
 */

/**
 * Generate a random full name
 */
export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

/**
 * Generate a random professional headline
 */
export const generateRandomHeadline = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  return `${adjective} ${role}`;
};

/**
 * Determine base URL based on environment
 */
export const getBaseUrl = (): string => {
  // Check if we're running on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:1234';
  }
  // Use production URL when hosted
  return window.location.origin;
};

/**
 * Get space ID from input field or use default
 */
export const getSpaceId = (): string => {
  const input = document.getElementById('spaceIdInput') as HTMLInputElement;
  return input?.value?.trim() || 'HyHyvePub';
};