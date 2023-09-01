import fs from 'fs';

const OFF = 0;
const WARN = 1;
const ERROR = 2;
const INHERIT = Symbol('Inherit');
const eslintRules = {
  'accessor-pairs': OFF,
  'array-callback-return': ERROR,
  'arrow-body-style': OFF,
  'block-scoped-var': OFF,
  'camelcase': OFF,
  'capitalized-comments': OFF,
  'class-methods-use-this': ERROR,
  'complexity': [ERROR, 20],
  'consistent-return': ERROR,
  'consistent-this': ERROR,
  'constructor-super': ERROR,
  'curly': ERROR,
  'default-case': ERROR,
  'default-case-last': ERROR,
  'default-param-last': ERROR,
  'dot-notation': ERROR,
  'eqeqeq': ERROR,
  'for-direction': OFF,
  'func-name-matching': OFF,
  'func-names': OFF,
  'func-style': ERROR,
  'getter-return': ERROR,
  'grouped-accessor-pairs': ERROR,
  'guard-for-in': ERROR,
  'id-denylist': OFF,
  'id-length': OFF,
  'id-match': OFF,
  'init-declarations': OFF,
  'logical-assignment-operators': [ERROR, 'never'],
  'max-classes-per-file': OFF,
  'max-depth': OFF,
  'max-lines': OFF,
  'max-lines-per-function': [
    ERROR,
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],
  'max-nested-callbacks': OFF,
  'max-params': OFF,
  'max-statements': OFF,
  'multiline-comment-style': OFF,
  'new-cap': ERROR,
  'no-alert': ERROR,
  'no-array-constructor': ERROR,
  'no-async-promise-executor': ERROR,
  'no-await-in-loop': OFF,
  'no-bitwise': ERROR,
  'no-caller': ERROR,
  'no-case-declarations': ERROR,
  'no-class-assign': ERROR,
  'no-compare-neg-zero': ERROR,
  'no-cond-assign': ERROR,
  'no-confusing-arrow': OFF,
  'no-console': ERROR,
  'no-const-assign': ERROR,
  'no-constant-binary-expression': ERROR,
  'no-constant-condition': [ERROR, { checkLoops: false }],
  'no-constructor-return': ERROR,
  'no-continue': ERROR,
  'no-control-regex': ERROR,
  'no-debugger': ERROR,
  'no-delete-var': ERROR,
  'no-div-regex': ERROR,
  'no-dupe-args': ERROR,
  'no-dupe-class-members': ERROR,
  'no-dupe-else-if': ERROR,
  'no-dupe-keys': ERROR,
  'no-duplicate-case': ERROR,
  'no-duplicate-imports': OFF,
  'no-else-return': OFF,
  'no-empty-character-class': ERROR,
  'no-empty-function': ERROR,
  'no-empty-pattern': ERROR,
  'no-empty-static-block': ERROR,
  'no-empty': ERROR,
  'no-eq-null': ERROR,
  'no-eval': ERROR,
  'no-ex-assign': ERROR,
  'no-extend-native': ERROR,
  'no-extra-bind': ERROR,
  'no-extra-boolean-cast': ERROR,
  'no-extra-label': ERROR,
  'no-extra-semi': ERROR,
  'no-fallthrough': ERROR,
  'no-floating-decimal': ERROR,
  'no-func-assign': ERROR,
  'no-global-assign': ERROR,
  'no-implicit-coercion': ERROR,
  'no-implicit-globals': ERROR,
  'no-implied-eval': ERROR,
  'no-import-assign': ERROR,
  'no-inline-comments': ERROR,
  'no-inner-declarations': ERROR,
  'no-invalid-regexp': ERROR,
  'no-invalid-this': ERROR,
  'no-irregular-whitespace': ERROR,
  'no-iterator': ERROR,
  'no-label-var': ERROR,
  'no-labels': ERROR,
  'no-lone-blocks': ERROR,
  'no-lonely-if': ERROR,
  'no-loop-func': ERROR,
  'no-loss-of-precision': ERROR,
  'no-magic-numbers': OFF,
  'no-misleading-character-class': ERROR,
  'no-mixed-operators': [
    ERROR,
    {
      groups: [
        ['*', '%', '**'],
        ['/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      allowSamePrecedence: false,
    },
  ],
  'no-multi-assign': OFF,
  'no-multi-str': ERROR,
  'no-negated-condition': ERROR,
  'no-nested-ternary': ERROR,
  'no-new-func': ERROR,
  'no-new-native-nonconstructor': ERROR,
  'no-new-object': ERROR,
  'no-new-symbol': ERROR,
  'no-new-wrappers': ERROR,
  'no-new': ERROR,
  'no-nonoctal-decimal-escape': ERROR,
  'no-obj-calls': ERROR,
  'no-octal-escape': ERROR,
  'no-octal': ERROR,
  'no-param-reassign': OFF,
  'no-plusplus': OFF,
  'no-promise-executor-return': ERROR,
  'no-proto': ERROR,
  'no-prototype-builtins': ERROR,
  'no-redeclare': ERROR,
  'no-regex-spaces': ERROR,
  'no-restricted-globals': OFF,
  'no-restricted-exports': OFF,
  'no-restricted-imports': OFF,
  'no-restricted-properties': OFF,
  'no-restricted-syntax': OFF,
  'no-return-assign': ERROR,
  'no-script-url': ERROR,
  'no-self-assign': ERROR,
  'no-self-compare': ERROR,
  'no-sequences': ERROR,
  'no-setter-return': ERROR,
  'no-shadow-restricted-names': ERROR,
  'no-shadow': ERROR,
  'no-sparse-arrays': ERROR,
  'no-template-curly-in-string': ERROR,
  'no-ternary': OFF,
  'no-this-before-super': ERROR,
  'no-throw-literal': ERROR,
  'no-undef-init': ERROR,
  'no-undef': ERROR,
  'no-undefined': OFF,
  'no-underscore-dangle': OFF,
  'no-unexpected-multiline': ERROR,
  'no-unmodified-loop-condition': ERROR,
  'no-unneeded-ternary': ERROR,
  'no-unreachable': ERROR,
  'no-unreachable-loop': ERROR,
  'no-unsafe-finally': ERROR,
  'no-unsafe-negation': ERROR,
  'no-unused-expressions': ERROR,
  'no-unused-labels': ERROR,
  'no-unused-private-class-members': ERROR,
  'no-unused-vars': [ERROR, { argsIgnorePattern: '^_' }],
  'no-unsafe-optional-chaining': [ERROR, { disallowArithmeticOperators: true }],
  'no-use-before-define': [ERROR, { variables: false }],
  'no-useless-backreference': ERROR,
  'no-useless-call': ERROR,
  'no-useless-catch': ERROR,
  'no-useless-computed-key': ERROR,
  'no-useless-concat': ERROR,
  'no-useless-constructor': ERROR,
  'no-useless-escape': ERROR,
  'no-useless-rename': ERROR,
  'no-useless-return': ERROR,
  'no-var': ERROR,
  'no-void': ERROR,
  'no-warning-comments': ERROR,
  'no-with': ERROR,
  'object-shorthand': [ERROR, 'always'],
  'one-var-declaration-per-line': OFF,
  'one-var': [ERROR, 'never'],
  'operator-assignment': OFF,
  'prefer-arrow-callback': ERROR,
  'prefer-const': ERROR,
  'prefer-destructuring': [
    ERROR,
    {
      VariableDeclarator: { array: false, object: true },
      AssignmentExpression: { array: false, object: false },
    },
  ],
  'prefer-exponentiation-operator': ERROR,
  'prefer-named-capture-group': OFF,
  'prefer-numeric-literals': ERROR,
  'prefer-object-has-own': ERROR,
  'prefer-object-spread': OFF,
  'prefer-promise-reject-errors': ERROR,
  'prefer-regex-literals': ERROR,
  'prefer-rest-params': ERROR,
  'prefer-spread': ERROR,
  'prefer-template': ERROR,
  'quote-props': [ERROR, 'consistent-as-needed'],
  'radix': ERROR,
  'require-atomic-updates': ERROR,
  'require-await': ERROR,
  'require-unicode-regexp': OFF,
  'require-yield': ERROR,
  'sort-imports': OFF,
  'sort-keys': OFF,
  'sort-vars': OFF,
  'spaced-comment': OFF,
  'strict': [ERROR, 'never'],
  'symbol-description': ERROR,
  'use-isnan': ERROR,
  'valid-typeof': ERROR,
  'vars-on-top': OFF,
  'yoda': OFF,
};

/**
 * @param {string} ruleNamePrefix
 * @param {Record<string, unknown>} rules
 */
const prefix = (ruleNamePrefix, rules) => {
  const result = {};
  for (const [ruleName, ruleConfiguration] of Object.entries(rules)) {
    result[`${ruleNamePrefix}${ruleName}`] = ruleConfiguration;
  }
  return result;
};

/**
 * @param {Record<string, unknown>} baseRules
 * @param {string} ruleNamePrefix
 * @param {Record<string, unknown>} extendedRules
 */
const extendBaseRules = (baseRules, ruleNamePrefix, extendedRules) => {
  const result = {};
  for (const [ruleName, ruleConfig] of Object.entries(extendedRules)) {
    const extendedConfig =
      ruleConfig === INHERIT ? baseRules[ruleName] : ruleConfig;
    if (typeof extendedConfig === 'undefined') {
      throw new Error(`NoRule: "${ruleName}"`);
    }
    result[ruleName] = OFF;
    result[`${ruleNamePrefix}${ruleName}`] = extendedConfig;
  }
  return result;
};

/**
 * @param  {...Array<Record<string, unknown>>} rules
 */
const merge = (...rulesList) => {
  const result = {};
  for (const rules of rulesList) {
    for (const [ruleName, ruleConfig] of Object.entries(rules)) {
      if (typeof result[ruleName] === 'undefined') {
        result[ruleName] = ruleConfig;
      } else {
        throw new Error(`UnexpectedOverwriting: "${ruleName}"`);
      }
    }
  }
  return result;
};

/**
 * @param  {...string} baseExtensions
 */
const importExtensions = function* (...baseExtensions) {
  for (const extension of baseExtensions) {
    yield `.m${extension}`;
    yield `.m${extension}x`;
    yield `.${extension}`;
    yield `.${extension}x`;
    yield `.c${extension}`;
    yield `.c${extension}x`;
  }
};

const baseRules = merge(
  eslintRules,
  prefix('import/', {
    'consistent-type-specifier-style': ERROR,
    'default': ERROR,
    'dynamic-import-chunkname': ERROR,
    'export': ERROR,
    'exports-last': OFF,
    'extensions': OFF,
    'first': ERROR,
    'group-exports': OFF,
    'max-dependencies': OFF,
    'named': ERROR,
    'namespace': ERROR,
    'no-absolute-path': ERROR,
    'no-amd': ERROR,
    'no-anonymous-default-export': ERROR,
    'no-commonjs': ERROR,
    'no-cycle': ERROR,
    'no-default-export': ERROR,
    'no-deprecated': ERROR,
    'no-duplicates': ERROR,
    'no-dynamic-require': ERROR,
    'no-empty-named-blocks': ERROR,
    'no-extraneous-dependencies': ERROR,
    'no-import-module-exports': ERROR,
    'no-internal-modules': OFF,
    'no-mutable-exports': ERROR,
    'no-named-as-default': ERROR,
    'no-named-as-default-member': ERROR,
    'no-named-default': ERROR,
    'no-named-export': OFF,
    'no-namespace': OFF,
    'no-nodejs-modules': OFF,
    'no-restricted-paths': ERROR,
    'no-relative-packages': ERROR,
    'no-relative-parent-imports': ERROR,
    'no-self-import': ERROR,
    'no-unresolved': ERROR,
    'no-unused-modules': ERROR,
    'no-webpack-loader-syntax': ERROR,
    'no-unassigned-import': ERROR,
    'no-useless-path-segments': ERROR,
    'order': ERROR,
    'prefer-default-export': OFF,
    'unambiguous': ERROR,
  }),
  prefix('@nlib/', {
    'no-globals': OFF,
    'print-filename': WARN,
  }),
);

const config = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@nlib/eslint-plugin', 'eslint-plugin-import'],
  env: { [`es${new Date().getFullYear() - 1}`]: true },
  rules: baseRules,
  settings: {
    'import/extensions': [...importExtensions('js')],
    'import/parsers': {
      '@typescript-eslint/parser': [...importExtensions('ts')],
    },
    'import/resolver': { typescript: {} },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.mtsx', '*.cts', '*.ctsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      plugins: ['@typescript-eslint'],
      settings: {
        'import/extensions': [
          ...importExtensions('ts'),
          ...importExtensions('js'),
        ],
      },
      rules: merge(
        {
          'no-restricted-syntax': [
            ERROR,
            { selector: 'TSEnumDeclaration', message: "Don't use enum." },
          ],
        },
        extendBaseRules(baseRules, '@typescript-eslint/', {
          'class-methods-use-this': INHERIT,
          'default-param-last': INHERIT,
          'dot-notation': INHERIT,
          'init-declarations': INHERIT,
          'no-array-constructor': INHERIT,
          'no-dupe-class-members': INHERIT,
          'no-empty-function': INHERIT,
          'no-extra-semi': INHERIT,
          'no-implied-eval': INHERIT,
          'no-invalid-this': INHERIT,
          'no-loop-func': INHERIT,
          'no-loss-of-precision': INHERIT,
          'no-magic-numbers': INHERIT,
          'no-redeclare': INHERIT,
          'no-restricted-imports': INHERIT,
          'no-shadow': INHERIT,
          'no-throw-literal': INHERIT,
          'no-unused-expressions': INHERIT,
          'no-unused-vars': INHERIT,
          'no-useless-constructor': INHERIT,
          'no-use-before-define': INHERIT,
          'require-await': INHERIT,
        }),
        prefix('@typescript-eslint/', {
          'adjacent-overload-signatures': ERROR,
          'array-type': [ERROR, { default: 'generic' }],
          'await-thenable': ERROR,
          'ban-ts-comment': ERROR,
          'ban-tslint-comment': ERROR,
          'ban-types': [
            ERROR,
            {
              types: {
                Object: 'Use {} instead',
                String: { message: 'Use string instead', fixWith: 'string' },
              },
            },
          ],
          'class-literal-property-style': ERROR,
          'consistent-indexed-object-style': ERROR,
          'consistent-generic-constructors': ERROR,
          'consistent-type-assertions': [
            ERROR,
            {
              assertionStyle: 'as',
              objectLiteralTypeAssertions: 'never',
            },
          ],
          'consistent-type-definitions': ERROR,
          'consistent-type-exports': OFF,
          'consistent-type-imports': [ERROR, { prefer: 'type-imports' }],
          'explicit-function-return-type': OFF,
          'explicit-member-accessibility': ERROR,
          'explicit-module-boundary-types': OFF,
          'member-ordering': OFF,
          'method-signature-style': ERROR,
          'naming-convention': OFF,
          'no-base-to-string': [
            ERROR,
            {
              ignoredTypeNames: ['RegExp', 'URL'],
            },
          ],
          'no-confusing-non-null-assertion': ERROR,
          'no-confusing-void-expression': [
            ERROR,
            {
              ignoreArrowShorthand: true,
              ignoreVoidOperator: false,
            },
          ],
          'no-duplicate-enum-values': ERROR,
          'no-duplicate-type-constituents': ERROR,
          'no-dynamic-delete': ERROR,
          'no-empty-interface': OFF,
          'no-explicit-any': ERROR,
          'no-extra-non-null-assertion': ERROR,
          'no-extraneous-class': ERROR,
          'no-floating-promises': [ERROR, { ignoreVoid: true }],
          'no-for-in-array': ERROR,
          'no-import-type-side-effects': ERROR,
          'no-inferrable-types': ERROR,
          'no-invalid-void-type': ERROR,
          'no-meaningless-void-operator': ERROR,
          'no-misused-new': ERROR,
          'no-misused-promises': ERROR,
          'no-mixed-enums': ERROR,
          'no-namespace': [ERROR, { allowDefinitionFiles: true }],
          'no-non-null-assertion': ERROR,
          'no-non-null-asserted-nullish-coalescing': ERROR,
          'no-non-null-asserted-optional-chain': ERROR,
          'no-require-imports': ERROR,
          'no-this-alias': [
            ERROR,
            {
              allowDestructuring: true,
              allowedNames: ['self'],
            },
          ],
          'no-unnecessary-boolean-literal-compare': ERROR,
          'no-unnecessary-condition': [
            ERROR,
            { allowConstantLoopConditions: true },
          ],
          'no-unnecessary-type-constraint': ERROR,
          'no-unnecessary-qualifier': ERROR,
          'no-unnecessary-type-arguments': ERROR,
          'no-unnecessary-type-assertion': ERROR,
          'no-unsafe-argument': ERROR,
          'no-unsafe-assignment': ERROR,
          'no-unsafe-call': ERROR,
          'no-unsafe-enum-comparison': ERROR,
          'no-unsafe-declaration-merging': ERROR,
          'no-unsafe-member-access': ERROR,
          'no-unsafe-return': ERROR,
          'no-useless-empty-export': ERROR,
          'no-redundant-type-constituents': ERROR,
          'no-var-requires': ERROR,
          'non-nullable-type-assertion-style': OFF,
          'parameter-properties': ERROR,
          'prefer-as-const': ERROR,
          'prefer-enum-initializers': ERROR,
          'prefer-for-of': ERROR,
          'prefer-function-type': OFF,
          'prefer-includes': ERROR,
          'prefer-literal-enum-member': ERROR,
          'prefer-namespace-keyword': OFF,
          'prefer-nullish-coalescing': OFF,
          'prefer-optional-chain': OFF,
          'prefer-readonly-parameter-types': OFF,
          'prefer-reduce-type-parameter': ERROR,
          'prefer-regexp-exec': ERROR,
          'prefer-readonly': ERROR,
          'prefer-return-this-type': OFF,
          'prefer-string-starts-ends-with': ERROR,
          'prefer-ts-expect-error': ERROR,
          'promise-function-async': ERROR,
          'require-array-sort-compare': ERROR,
          'restrict-plus-operands': ERROR,
          'restrict-template-expressions': OFF,
          'return-await': [ERROR, 'always'],
          'sort-type-constituents': ERROR,
          'strict-boolean-expressions': OFF,
          'switch-exhaustiveness-check': ERROR,
          'triple-slash-reference': [
            ERROR,
            {
              path: 'never',
              types: 'never',
              lib: 'never',
            },
          ],
          'typedef': OFF,
          'unbound-method': ERROR,
          'unified-signatures': ERROR,
        }),
      ),
    },
  ],
};

fs.writeFileSync('.eslintrc.json', JSON.stringify(config, null, 4));
