const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = {
  preset: '@testing-library/react-native',
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  snapshotSerializers: ['@relmify/jest-serializer-strip-ansi/always'],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
};
