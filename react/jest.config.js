module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: './typescript/tsconfig.test.json',
    },
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['./node_modules', './src'],
  testMatch: ['**/*.test.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(ts)x?$': 'ts-jest',
  },
};
