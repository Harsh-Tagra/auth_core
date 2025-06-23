import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/unit/**/*.test.ts"],

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

export default config;
