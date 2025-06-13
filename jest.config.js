// Jest configuration for Shlink AI Agent testing
// This configures Jest to work with TypeScript and provides proper test coverage

module.exports = {
  preset: 'ts-jest',                                    // Use TypeScript preset
  testEnvironment: 'node',                              // Node.js environment (not browser)
  roots: ['<rootDir>/tests'],                           // Where to find test files
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Test file patterns
  transform: {
    '^.+\\.ts$': 'ts-jest',                          // Transform TypeScript files
  },
  collectCoverageFrom: [                                // What files to include in coverage
    'tools/**/*.ts',                                    // Our tool functions
    'nodes/**/*.ts',                                    // n8n node implementations
    'credentials/**/*.ts',                              // Credential definitions
    '!**/*.d.ts',                                       // Exclude type definition files
    '!**/node_modules/**',                              // Exclude dependencies
  ],
  coverageDirectory: 'coverage',                        // Where to output coverage reports
  coverageReporters: ['text', 'lcov', 'html'],         // Coverage report formats
  moduleFileExtensions: ['ts', 'js', 'json'],          // File extensions to handle
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],    // Global test setup
  testTimeout: 10000,                                   // 10 second timeout for tests
  verbose: true,                                        // Show individual test results
};