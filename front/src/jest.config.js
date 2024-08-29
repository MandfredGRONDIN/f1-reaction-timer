module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
}
