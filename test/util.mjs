/* eslint-disable @nlib/no-globals */
import * as eslint from 'eslint';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
export const availableRules = {
    js: new eslint.Linter().getRules(),
    ts: new Map(Object.entries(tsPlugin.rules)),
};

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
