module.exports = {
  bail: 1,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testURL: 'https://jest.test',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
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
