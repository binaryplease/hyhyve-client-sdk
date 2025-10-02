import { HyHyveComponent, corporateConfig } from '../src/index';

const hyhyve = new HyHyveComponent();

// Random name generation
const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn',
  'Sam', 'Blake', 'Cameron', 'Drew', 'Emery', 'Finley', 'Harper', 'Hayden',
  'Jamie', 'Kai', 'Lane', 'Logan', 'Max', 'Nova', 'Parker', 'Reese',
  'River', 'Rowan', 'Sage', 'Skyler', 'Tatum', 'Wren'
];

const lastNames = [
  'Anderson', 'Brown', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris',
  'Johnson', 'Kim', 'Lee', 'Martinez', 'Miller', 'Nelson', 'O\'Connor', 'Patel',
  'Rodriguez', 'Smith', 'Taylor', 'Thompson', 'Walker', 'White', 'Wilson', 'Young',
  'Zhang', 'Adams', 'Baker', 'Clark', 'Green', 'Hall'
];

const adjectives = [
  'Creative', 'Innovative', 'Dynamic', 'Strategic', 'Collaborative', 'Analytical',
  'Passionate', 'Dedicated', 'Experienced', 'Versatile', 'Proactive', 'Results-driven',
  'Tech-savvy', 'Forward-thinking', 'Solution-oriented', 'Detail-oriented'
];

const roles = [
  'Developer', 'Designer', 'Manager', 'Consultant', 'Specialist', 'Analyst',
  'Engineer', 'Coordinator', 'Strategist', 'Lead', 'Expert', 'Architect'
];

const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const generateRandomHeadline = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  return `${adjective} ${role}`;
};

// Determine base URL based on environment
const getBaseUrl = () => {
  // Check if we're running on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:1234';
  }
  // Use production URL when hosted
  return window.location.origin;
};

const getSpaceId = (): string => {
  const input = document.getElementById('spaceIdInput') as HTMLInputElement;
  return input?.value?.trim() || 'HyHyvePub';
};

const attach = () => {
  const spaceId = getSpaceId();
  const randomName = generateRandomName();
  const randomHeadline = generateRandomHeadline();

  console.log(`Attaching to space: ${spaceId} as ${randomName} (${randomHeadline})`);

  hyhyve.attach("#hyhyve", {
    spaceId: spaceId,
    embedded: true,
    baseUrl: getBaseUrl(),
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
    }
  });
}

attach()

// Example of destroying the component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  console.log('Component destroyed!');
});

// Example of attaching with new random identity
document.getElementById('attachBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attach()
  console.log('Component Attached!');
});

// Example of generating new random identity and reconnecting
document.getElementById('randomizeBtn')?.addEventListener('click', () => {
  hyhyve.destroy();
  attach()
  console.log('New random identity generated and attached!');
});