/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/public/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      astTransformers: {
        before: [
          'ts-jest/dist/transformers/ast/jest-preset/before',
          'ts-jest/dist/transformers/ast/ts-jest',
          'ts-jest/dist/transformers/ast/esm',
          'ts-jest/dist/transformers/ast/swc'
        ]
      }
    }
  }
};

export default config;