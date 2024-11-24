module.exports = {
  // testEnvironment: "node",
  // testMatch: ["**/*.test.ts"],
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // preset: 'jest-playwright-preset',
  // testEnvironment: 'jest-playwright-preset',
  verbose: true,
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Transform .js, .jsx, .ts, .tsx files using babel-jest
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testEnvironment: "jsdom", // Ensure the environment supports DOM (required for render)
  // testEnvironment: "jsdom",
  // testURL: "http://localhost:5175",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // Optional setup file
};
