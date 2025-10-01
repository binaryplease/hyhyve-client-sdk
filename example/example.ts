import { HyHyveComponent, corporateConfig } from '../src/index';

const hyhyve = new HyHyveComponent();

// Determine base URL based on environment
const getBaseUrl = () => {
  // Check if we're running on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:1234';
  }
  // Use production URL when hosted
  return window.location.origin;
};

const attach = () => {
  hyhyve.attach("#hyhyve", {
    spaceId: '0lU1wUuGT5e4aLdHee8De',
    embedded: true,
    baseUrl: getBaseUrl(),
    whitelabelSettings: corporateConfig,
    auth: {
      tag: "complete",
      profile: {
        name: 'Integration Tester 123',
        avatar: 'avatar2',
        color: corporateConfig.customBrand?.themes?.dark?.primary || "#60a5fa",
        picture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
        socials: ['http://www.example.com/', 'https://linkedin.com/in/example'],
        headline: 'Integration Specialist',
        distance: 10.0,
        emoji: '🚀',
        status: 'Ready to connect!'
      }
    }
  });
}

attach()

// Example of destroying the component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('Component destroyed!');
});


// Example of destroying the component
document.getElementById('attachBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attach()
  console.log('Component Attached!');
});