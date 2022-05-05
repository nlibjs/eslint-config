/* eslint-disable @nlib/no-globals */
import {rules as nlibRules} from '@nlib/eslint-plugin';
import ava from 'ava';
import {ESLint} from 'eslint';
import {availableRules} from './util.mjs';

const eslint = new ESLint({overrideConfigFile: '.eslintrc.json'});
const nlibRuleNames = new Set(Object.keys(nlibRules).map((name) => `@nlib/${name}`));
/** @type {Promise<import('eslint').Linter.Config>} */
const jsConfigPromise = eslint.calculateConfigForFile('index.js');
/** @type {Promise<import('eslint').Linter.Config>} */
const tsConfigPromise = eslint.calculateConfigForFile('index.ts');
const tsPrefix = '@typescript-eslint/';

for (const [ruleName, rule] of availableRules.js) {
    const url = `https://eslint.org/docs/rules/${ruleName}`;
    if (rule.meta && rule.meta.deprecated) {
        ava(`should not cover "${ruleName} (deprecated)"`, async (t) => {
            const {rules = {}} = await jsConfigPromise;
            /** @type {{replacedBy?: Array<string>}} */
            const {replacedBy = ['none']} = rule.meta || {};
            t.is(rules[ruleName], undefined, [
                `${ruleName} is deprecated.`,
                `candidates: ${replacedBy.join(', ')}`,
                url,
            ].join('\n'));
        });
    } else {
        ava(`should cover "${ruleName}"`, async (t) => {
            const {rules = {}} = await jsConfigPromise;
            t.truthy(rules[ruleName], `${ruleName} is not covered.\n${url}`);
        });
    }
}

ava('should not have unsupported rules (js)', async (t) => {
    const {rules = {}} = await jsConfigPromise;
    for (const ruleName of Object.keys(rules)) {
        t.true(
            availableRules.js.has(ruleName) || nlibRuleNames.has(ruleName),
            `${ruleName} is not supported`,
        );
    }
});

for (const [name, rule] of availableRules.ts) {
    const url = `https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/${name}.md`;
    const ruleName = `${tsPrefix}${name}`;
    if (rule.meta && rule.meta.deprecated) {
        ava(`should not cover "${ruleName} (deprecated)"`, async (t) => {
            const {rules = {}} = await tsConfigPromise;
            /** @type {{replacedBy?: Array<string>}} */
            const {replacedBy = ['none']} = rule.meta || {};
            t.is(rules[ruleName], undefined, [
                `${ruleName} is deprecated.`,
                `candidates: ${replacedBy.join(', ')}`,
                url,
            ].join('\n'));
        });
    } else {
        ava(`should cover "${ruleName}"`, async (t) => {
            const {rules = {}} = await tsConfigPromise;
            t.truthy(rules[ruleName], `${ruleName} is not covered.\n${url}`);
        });
    }
}

ava('should not have unsupported rules (ts)', async (t) => {
    const {rules = {}} = await tsConfigPromise;
    for (const ruleName of Object.keys(rules)) {
        if (ruleName.startsWith(tsPrefix)) {
            t.true(
                availableRules.ts.has(ruleName.slice(tsPrefix.length)),
                `${ruleName} is not supported.`,
            );
        } else {
            t.true(
                availableRules.js.has(ruleName) || nlibRuleNames.has(ruleName),
                `${ruleName} is not supported.`,
            );
        }
    }
});
