"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const utils_1 = require("ts-jest/utils");
const tsconfig_json_1 = require("./tsconfig.json");
exports.default = {
    bail: true,
    clearMocks: true,
    coverageProvider: 'v8',
    preset: 'ts-jest',
    testMatch: ['**/*.spec.ts'],
    moduleNameMapper: (0, utils_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
};
