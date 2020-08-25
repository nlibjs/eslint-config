import * as path from 'path';
import ava from 'ava';
import {ESLint, Linter} from 'eslint';

const eslint = new ESLint({
    overrideConfigFile: path.join(__dirname, '../index.js'),
});

const listMessages = function* (
    result: Array<ESLint.LintResult>,
): Generator<Linter.LintMessage> {
    for (const {messages} of result) {
        for (const message of messages) {
            yield message;
        }
    }
};

const listRuleIds = function* (
    result: Array<ESLint.LintResult>,
) {
    for (const message of listMessages(result)) {
        yield message.ruleId;
    }
};

ava('function* ()', async (t) => {
    const code = [
        'const named = function* () {',
        '    yield 1;',
        '};',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['no-unused-vars'],
    );
});

ava('function * ()', async (t) => {
    const code = [
        'const named = function * () {',
        '    yield 1;',
        '};',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['no-unused-vars', 'generator-star-spacing'],
    );
});

ava('function *()', async (t) => {
    const code = [
        'const named = function * () {',
        '    yield 1;',
        '};',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['no-unused-vars', 'generator-star-spacing'],
    );
});

ava('function* named()', async (t) => {
    const code = [
        'function* named() {',
        '    yield 1;',
        '}',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['func-style', 'no-unused-vars'],
    );
});

ava('function * named()', async (t) => {
    const code = [
        'function * named() {',
        '    yield 1;',
        '}',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['func-style', 'generator-star-spacing', 'no-unused-vars'],
    );
});

ava('function *named()', async (t) => {
    const code = [
        'function *named() {',
        '    yield 1;',
        '}',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['func-style', 'generator-star-spacing', 'generator-star-spacing', 'no-unused-vars'],
    );
});

ava('*method ()', async (t) => {
    const code = [
        'class Foo {',
        '    *method() {}',
        '}',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['no-unused-vars', 'class-methods-use-this'],
    );
});

ava('* method ()', async (t) => {
    const code = [
        'class Foo {',
        '    * method() {}',
        '}',
        '',
    ].join('\n');
    const result = await eslint.lintText(code);
    t.deepEqual(
        [...listRuleIds(result)],
        ['no-unused-vars', 'generator-star-spacing', 'class-methods-use-this'],
    );
});
