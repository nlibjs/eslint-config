//@ts-check
import * as console from 'console';
import * as assert from 'assert';
import { ESLint } from 'eslint';
import { listRuleIds } from './util.mjs';

const eslint = new ESLint({ overrideConfigFile: '.eslintrc.json' });

{
  console.info('function* ()');
  const code = ['const named = function* () {', '    yield 1;', '};', ''].join(
    '\n',
  );
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'no-unused-vars'],
  );
}

{
  console.info('function * ()');
  const code = ['const named = function * () {', '    yield 1;', '};', ''].join(
    '\n',
  );
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'no-unused-vars'],
  );
}

{
  console.info('function *()');
  const code = ['const named = function * () {', '    yield 1;', '};', ''].join(
    '\n',
  );
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'no-unused-vars'],
  );
}

{
  console.info('function* named()');
  const code = ['function* named() {', '    yield 1;', '}', ''].join('\n');
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'func-style', 'no-unused-vars'],
  );
}

{
  console.info('function * named()');
  const code = ['function * named() {', '    yield 1;', '}', ''].join('\n');
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'func-style', 'no-unused-vars'],
  );
}

{
  console.info('function *named()');
  const code = ['function *named() {', '    yield 1;', '}', ''].join('\n');
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    ['import/unambiguous', 'func-style', 'no-unused-vars'],
  );
}

{
  console.info('*method ()');
  const code = ['class Foo {', '    *method() {}', '}', ''].join('\n');
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    [
      'import/unambiguous',
      'no-unused-vars',
      'class-methods-use-this',
      'no-empty-function',
    ],
  );
}

{
  console.info('* method ()');
  const code = ['class Foo {', '    * method() {}', '}', ''].join('\n');
  const result = await eslint.lintText(code);
  assert.deepEqual(
    [...listRuleIds(result)],
    [
      'import/unambiguous',
      'no-unused-vars',
      'class-methods-use-this',
      'no-empty-function',
    ],
  );
}

console.info('passed');
