/* eslint-disable @nlib/no-globals */
import * as eslint from 'eslint';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import * as nlibPlugin from '@nlib/eslint-plugin';

export const available = {
    js: {
        prefix: '',
        documentUrl: (ruleName) => `https://eslint.org/docs/latest/rules/${ruleName}`,
        rules: new eslint.Linter().getRules(),
        fileName: 'index.js',
    },
    ts: {
        prefix: '@typescript-eslint/',
        documentUrl: (ruleName) => `https://typescript-eslint.io/rules/${ruleName}/`,
        rules: new Map(Object.entries(tsPlugin.rules)),
        fileName: 'index.ts',
    },
    import: {
        prefix: 'import/',
        documentUrl: (ruleName) => `https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/${ruleName}.md`,
        rules: new Map(Object.entries(importPlugin.rules)),
        fileName: 'index.ts',
    },
    nlib: {
        prefix: '@nlib/',
        documentUrl: (_ruleName) => 'https://github.com/nlibjs/eslint-plugin',
        rules: new Map(Object.entries(nlibPlugin.rules)),
        fileName: 'index.ts',
    },
};

export const ignorables = new Set([
    '@nlib/print-filename',
]);

/**
 * @param {Array<import('eslint').ESLint.LintResult>} result
 * @returns {Generator<import('eslint').Linter.LintMessage>}
 */
export const listMessages = function* (result) {
    for (const {messages} of result) {
        for (const message of messages) {
            yield message;
        }
    }
};

/**
 * @param {Array<import('eslint').ESLint.LintResult>} result
 * @returns {Generator<string>}
 */
export const listRuleIds = function* (result) {
    for (const message of listMessages(result)) {
        yield message.ruleId;
    }
};
