module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: ["node_modules/(?!(your-library-name)/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Esto mapea `@` a la carpeta `src`
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
