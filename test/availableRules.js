const eslint = require('eslint');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
exports.js = new eslint.Linter().getRules();
exports.ts = new Map(Object.entries(tsPlugin.rules));
