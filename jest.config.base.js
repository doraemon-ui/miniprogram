module.exports = {
  bail: 1,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testURL: 'https://jest.test',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!.*(@doraemon-ui|miniprogram-simulate))',
  ],
  transform: {
    '.+\\.jsx?$': [
      'babel-jest',
      {
        'rootMode': 'upward',
      },
    ],
    '.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    // '**/__tests__/**/*.(js|ts)?(x)',
    '**/?(*.)(spec).(js|ts)?(x)',
  ],
  // coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/.coverage-report',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!index.js',
    '!**/node_modules/**',
    '!**/*.d.ts',
  ],
  snapshotSerializers: [
    '<rootDir>/../../node_modules/miniprogram-simulate/jest-snapshot-plugin',
  ],
}
