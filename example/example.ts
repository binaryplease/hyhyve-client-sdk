import { HyHyveComponent, corporateConfig } from '../src/index';

const hyhyve = new HyHyveComponent();

hyhyve.attach("#hyhyve", {
  spaceId: '0lU1wUuGT5e4aLdHee8De',
  embedded: true,
  baseUrl: 'http://localhost:1234', // For development
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

// Example of updating options
document.getElementById('updateBtn')?.addEventListener('click', () => {
  hyhyve.updateOptions({
    spaceId: 'updated-space-id',
    whitelabelSettings: {
      ...corporateConfig,
      forceTheme: 'dark'
    }
  });
  console.log('Options updated!');
});

// Example of destroying the component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('Component destroyed!');
});