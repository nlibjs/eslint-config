import * as path from 'path';
import ava from 'ava';
import * as availableRules from './availableRules';
import {ESLint, Linter} from 'eslint';

const eslint = new ESLint({
    overrideConfigFile: path.join(__dirname, '../index.js'),
});
const jsConfigPromise: Promise<Linter.Config> = eslint.calculateConfigForFile(path.join(__dirname, '../index.js'));
const tsConfigPromise: Promise<Linter.Config> = eslint.calculateConfigForFile(path.join(__dirname, '../index.ts'));
const tsPrefix = '@typescript-eslint/';

for (const [ruleName, rule] of availableRules.js) {
    const url = `https://eslint.org/docs/rules/${ruleName}`;
    if (rule.meta && rule.meta.deprecated) {
        ava(`should not cover "${ruleName} (deprecated)"`, async (t) => {
            const {rules = {}} = await jsConfigPromise;
            const {replacedBy = ['none']} = ((rule.meta || {}) as unknown as {replacedBy?: Array<string>});
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
        t.true(availableRules.js.has(ruleName), `${ruleName} is not supported`);
    }
});

for (const [name, rule] of availableRules.ts) {
    const url = `https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/${name}.md`;
    const ruleName = `${tsPrefix}${name}`;
    if (rule.meta && rule.meta.deprecated) {
        ava(`should not cover "${ruleName} (deprecated)"`, async (t) => {
            const {rules = {}} = await tsConfigPromise;
            const {replacedBy = ['none']} = ((rule.meta || {}) as unknown as {replacedBy?: Array<string>});
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
                availableRules.js.has(ruleName),
                `${ruleName} is not supported.`,
            );
        }
    }
});
