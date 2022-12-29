module.exports = {
  preset: '@testing-library/react-native',
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  snapshotSerializers: ['@relmify/jest-serializer-strip-ansi/always'],
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)', '!src/**/*.test-d.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/helpers/', '/dist/', '__mocks__'],
};
