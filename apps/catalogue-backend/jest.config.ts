/* eslint-disable */
export default {
  displayName: 'catalogue-backend',
  preset: '../../jest.preset.js',  // Preset for shared configuration across multiple projects
  testEnvironment: 'node',  // Suitable for testing backend logic
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/catalogue-backend',

  // Additional settings
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',  // Helps with absolute imports if used in your project
  },
  collectCoverageFrom: [
    'src/**/*.ts',  // Collect coverage from all TypeScript files in src directory
    '!src/main.ts', // Exclude main.ts if it only bootstraps the application
  ],
};