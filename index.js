const OFF = 0;
// const WARN = 1;
const ERROR = 2;

const off = (...rules) => rules.reduce((result, ruleName) => {
    result[ruleName] = OFF;
    return result;
}, {});

const prefix = (ruleNamePrefix, map) => Object.keys(map).reduce((result, name) => {
    result[`${ruleNamePrefix}${name}`] = map[name];
    return result;
}, {});

module.exports = {
    plugins: ['@nlib'],
    parserOptions: {
        ecmaVersion: new Date().getFullYear() - 1,
        sourceType: 'module',
    },
    env: {
        es6: true,
    },
    rules: {
        'accessor-pairs': OFF,
        'array-bracket-newline': [ERROR, 'consistent'],
        'array-bracket-spacing': [ERROR, 'never'],
        'array-callback-return': ERROR,
        'array-element-newline': OFF,
        'arrow-body-style': OFF,
        'arrow-parens': [ERROR, 'always'],
        'arrow-spacing': [ERROR, {before: true, after: true}],
        'block-scoped-var': OFF,
        'block-spacing': [ERROR, 'never'],
        'brace-style': [ERROR, '1tbs'],
        'camelcase': OFF,
        'capitalized-comments': OFF,
        'class-methods-use-this': ERROR,
        'comma-dangle': [ERROR, 'always-multiline'],
        'comma-spacing': [ERROR, {before: false, after: true}],
        'comma-style': [ERROR, 'last'],
        'complexity': [ERROR, 20],
        'computed-property-spacing': [ERROR, 'never'],
        'consistent-return': ERROR,
        'consistent-this': ERROR,
        'constructor-super': ERROR,
        'curly': ERROR,
        'default-case': ERROR,
        'default-case-last': ERROR,
        'default-param-last': ERROR,
        'dot-location': [ERROR, 'property'],
        'dot-notation': ERROR,
        'eol-last': [ERROR, 'always'],
        'eqeqeq': ERROR,
        'for-direction': OFF,
        'func-call-spacing': [ERROR, 'never'],
        'func-name-matching': OFF,
        'func-names': OFF,
        'func-style': ERROR,
        'function-call-argument-newline': [ERROR, 'consistent'],
        'function-paren-newline': OFF,
        'generator-star-spacing': [ERROR, {
            named: 'after',
            anonymous: 'after',
            method: 'before',
        }],
        'getter-return': ERROR,
        'grouped-accessor-pairs': ERROR,
        'guard-for-in': ERROR,
        'id-denylist': OFF,
        'id-length': OFF,
        'id-match': OFF,
        'implicit-arrow-linebreak': ERROR,
        'indent': [ERROR, 4, {
            MemberExpression: 0,
            ignoredNodes: ['ConditionalExpression'],
        }],
        'init-declarations': OFF,
        'jsx-quotes': [ERROR, 'prefer-double'],
        'key-spacing': ERROR,
        'keyword-spacing': ERROR,
        'line-comment-position': [ERROR, {position: 'above'}],
        'linebreak-style': [ERROR, 'unix'],
        'lines-around-comment': OFF,
        'lines-between-class-members': [ERROR, 'always'],
        'max-classes-per-file': OFF,
        'max-depth': OFF,
        'max-len': OFF,
        'max-lines': OFF,
        'max-lines-per-function': [ERROR, {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
        }],
        'max-nested-callbacks': OFF,
        'max-params': OFF,
        'max-statements-per-line': [ERROR, {max: 1}],
        'max-statements': OFF,
        'multiline-comment-style': OFF,
        'multiline-ternary': [ERROR, 'never'],
        'new-cap': ERROR,
        'new-parens': ERROR,
        'newline-per-chained-call': OFF,
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
        'no-constant-condition': [ERROR, {checkLoops: false}],
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
        'no-duplicate-imports': ERROR,
        'no-else-return': OFF,
        'no-empty-character-class': ERROR,
        'no-empty-function': OFF,
        'no-empty-pattern': ERROR,
        'no-empty': ERROR,
        'no-eq-null': ERROR,
        'no-eval': ERROR,
        'no-ex-assign': ERROR,
        'no-extend-native': ERROR,
        'no-extra-bind': ERROR,
        'no-extra-boolean-cast': ERROR,
        'no-extra-label': ERROR,
        'no-extra-parens': OFF,
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
        'no-mixed-spaces-and-tabs': ERROR,
        'no-multi-assign': OFF,
        'no-multi-spaces': ERROR,
        'no-multi-str': ERROR,
        'no-multiple-empty-lines': ERROR,
        'no-negated-condition': ERROR,
        'no-nested-ternary': ERROR,
        'no-new-func': ERROR,
        'no-new-object': ERROR,
        'no-new-symbol': ERROR,
        'no-new-wrappers': ERROR,
        'no-new': ERROR,
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
        'no-return-await': OFF,
        'no-script-url': ERROR,
        'no-self-assign': ERROR,
        'no-self-compare': ERROR,
        'no-sequences': ERROR,
        'no-setter-return': ERROR,
        'no-shadow-restricted-names': ERROR,
        'no-shadow': OFF,
        'no-sparse-arrays': ERROR,
        'no-tabs': OFF,
        'no-template-curly-in-string': ERROR,
        'no-ternary': OFF,
        'no-this-before-super': ERROR,
        'no-throw-literal': ERROR,
        'no-trailing-spaces': ERROR,
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
        'no-unused-vars': ERROR,
        'no-use-before-define': [ERROR, {variables: false}],
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
        'no-whitespace-before-property': ERROR,
        'no-with': ERROR,
        'nonblock-statement-body-position': [ERROR, 'below'],
        'object-curly-newline': [ERROR, {consistent: true}],
        'object-curly-spacing': [ERROR, 'never'],
        'object-property-newline': OFF,
        'object-shorthand': [ERROR, 'always'],
        'one-var-declaration-per-line': OFF,
        'one-var': [ERROR, 'never'],
        'operator-assignment': OFF,
        'operator-linebreak': OFF,
        'padded-blocks': OFF,
        'padding-line-between-statements': OFF,
        'prefer-arrow-callback': ERROR,
        'prefer-const': ERROR,
        'prefer-destructuring': [ERROR, {
            VariableDeclarator: {array: false, object: true},
            AssignmentExpression: {array: false, object: false},
        }],
        'prefer-exponentiation-operator': ERROR,
        'prefer-named-capture-group': OFF,
        'prefer-numeric-literals': ERROR,
        'prefer-object-spread': OFF,
        'prefer-promise-reject-errors': ERROR,
        'prefer-regex-literals': ERROR,
        'prefer-rest-params': ERROR,
        'prefer-spread': ERROR,
        'prefer-template': ERROR,
        'quote-props': [ERROR, 'consistent-as-needed'],
        'quotes': [ERROR, 'single'],
        'radix': ERROR,
        'require-atomic-updates': ERROR,
        'require-await': ERROR,
        'require-unicode-regexp': OFF,
        'require-yield': ERROR,
        'rest-spread-spacing': [ERROR, 'never'],
        'semi-spacing': [ERROR, {before: false, after: true}],
        'semi-style': [ERROR, 'last'],
        'semi': ERROR,
        'sort-imports': OFF,
        'sort-keys': OFF,
        'sort-vars': OFF,
        'space-before-blocks': [ERROR, 'always'],
        'space-before-function-paren': [ERROR, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],
        'space-in-parens': [ERROR, 'never'],
        'space-infix-ops': OFF,
        'space-unary-ops': [ERROR, {words: true, nonwords: false}],
        'spaced-comment': OFF,
        'strict': [ERROR, 'never'],
        'switch-colon-spacing': [ERROR, {before: false, after: true}],
        'symbol-description': ERROR,
        'template-curly-spacing': [ERROR, 'never'],
        'template-tag-spacing': [ERROR, 'never'],
        'unicode-bom': OFF,
        'use-isnan': ERROR,
        'valid-typeof': ERROR,
        'vars-on-top': OFF,
        'wrap-iife': [ERROR, 'outside'],
        'wrap-regex': ERROR,
        'yield-star-spacing': [ERROR, {before: false, after: true}],
        'yoda': OFF,
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {project: './tsconfig.json'},
            plugins: ['@typescript-eslint'],
            rules: Object.assign(
                {
                    'no-restricted-syntax': [
                        ERROR,
                        {selector: 'TSEnumDeclaration', message: 'Don\'t use enum.'},
                    ],
                },
                off(
                    'brace-style',
                    'comma-spacing',
                    'consistent-this',
                    'default-param-last',
                    'dot-notation',
                    'func-call-spacing',
                    'indent',
                    'init-declarations',
                    'keyword-spacing',
                    'lines-between-class-members',
                    'no-array-constructor',
                    'no-dupe-args',
                    'no-dupe-class-members',
                    'no-empty-function',
                    'no-extra-parens',
                    'no-extra-semi',
                    'no-implied-eval',
                    'no-invalid-this',
                    'no-loss-of-precision',
                    'no-magic-numbers',
                    'no-redeclare',
                    'no-shadow',
                    'no-throw-literal',
                    'no-undef',
                    'no-unused-expressions',
                    'no-unused-vars',
                    'no-useless-constructor',
                    'no-use-before-define',
                    'quotes',
                    'require-await',
                    'semi',
                    'space-before-function-paren',
                ),
                prefix('@typescript-eslint/', {
                    'adjacent-overload-signatures': ERROR,
                    'array-type': [ERROR, {default: 'generic'}],
                    'await-thenable': ERROR,
                    'ban-ts-comment': ERROR,
                    'ban-tslint-comment': ERROR,
                    'ban-types': [ERROR, {
                        types: {
                            Object: 'Use {} instead',
                            String: {message: 'Use string instead', fixWith: 'string'},
                        },
                    }],
                    'brace-style': [ERROR, '1tbs'],
                    'class-literal-property-style': ERROR,
                    'comma-spacing': [ERROR, {before: false, after: true}],
                    'consistent-type-assertions': [ERROR, {
                        assertionStyle: 'as',
                        objectLiteralTypeAssertions: 'never',
                    }],
                    'consistent-type-definitions': ERROR,
                    'consistent-type-imports': [ERROR, {prefer: 'no-type-imports'}],
                    'default-param-last': ERROR,
                    'dot-notation': ERROR,
                    'explicit-function-return-type': OFF,
                    'explicit-member-accessibility': ERROR,
                    'explicit-module-boundary-types': OFF,
                    'func-call-spacing': [ERROR, 'never'],
                    'indent': [ERROR, 4, {
                        SwitchCase: 0,
                        MemberExpression: 0,
                        ignoredNodes: ['ConditionalExpression'],
                    }],
                    'init-declarations': OFF,
                    'keyword-spacing': ERROR,
                    'lines-between-class-members': [ERROR, 'always'],
                    'member-delimiter-style': [ERROR, {
                        multiline: {delimiter: 'comma', requireLast: true},
                        singleline: {delimiter: 'comma', requireLast: false},
                    }],
                    'member-ordering': ERROR,
                    'method-signature-style': ERROR,
                    'naming-convention': OFF,
                    'no-array-constructor': ERROR,
                    'no-base-to-string': ERROR,
                    'no-confusing-non-null-assertion': ERROR,
                    'no-dupe-class-members': ERROR,
                    'no-dynamic-delete': ERROR,
                    'no-empty-function': ERROR,
                    'no-empty-interface': OFF,
                    'no-explicit-any': ERROR,
                    'no-extra-non-null-assertion': ERROR,
                    'no-extra-parens': OFF,
                    'no-extra-semi': ERROR,
                    'no-extraneous-class': ERROR,
                    'no-floating-promises': ERROR,
                    'no-for-in-array': ERROR,
                    'no-inferrable-types': ERROR,
                    'no-implicit-any-catch': ERROR,
                    'no-implied-eval': ERROR,
                    'no-invalid-this': OFF,
                    'no-invalid-void-type': ERROR,
                    'no-loss-of-precision': ERROR,
                    'no-magic-numbers': OFF,
                    'no-misused-new': ERROR,
                    'no-misused-promises': ERROR,
                    'no-namespace': [ERROR, {allowDefinitionFiles: true}],
                    'no-non-null-assertion': ERROR,
                    'no-non-null-asserted-optional-chain': ERROR,
                    'no-parameter-properties': ERROR,
                    'no-redeclare': ERROR,
                    'no-require-imports': ERROR,
                    'no-shadow': ERROR,
                    'no-this-alias': [ERROR, {
                        allowDestructuring: true,
                        allowedNames: ['self'],
                    }],
                    'no-throw-literal': ERROR,
                    'no-type-alias': OFF,
                    'no-unnecessary-boolean-literal-compare': ERROR,
                    'no-unnecessary-condition': [ERROR, {allowConstantLoopConditions: true}],
                    'no-unnecessary-qualifier': ERROR,
                    'no-unnecessary-type-arguments': ERROR,
                    'no-unnecessary-type-assertion': ERROR,
                    'no-unsafe-assignment': ERROR,
                    'no-unsafe-call': ERROR,
                    'no-unsafe-member-access': ERROR,
                    'no-unsafe-return': ERROR,
                    'no-unused-expressions': ERROR,
                    'no-unused-vars': OFF,
                    'no-use-before-define': [ERROR, {variables: false}],
                    'no-useless-constructor': ERROR,
                    'no-var-requires': ERROR,
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
                    'prefer-string-starts-ends-with': ERROR,
                    'prefer-ts-expect-error': ERROR,
                    'promise-function-async': ERROR,
                    'quotes': [ERROR, 'single'],
                    'require-array-sort-compare': ERROR,
                    'require-await': ERROR,
                    'restrict-plus-operands': ERROR,
                    'restrict-template-expressions': OFF,
                    'return-await': [ERROR, 'always'],
                    'semi': ERROR,
                    'space-before-function-paren': [ERROR, {
                        anonymous: 'always',
                        named: 'never',
                        asyncArrow: 'always',
                    }],
                    'strict-boolean-expressions': OFF,
                    'switch-exhaustiveness-check': ERROR,
                    'triple-slash-reference': [ERROR, {
                        path: 'never',
                        types: 'never',
                        lib: 'never',
                    }],
                    'type-annotation-spacing': [ERROR, {
                        before: false,
                        after: true,
                        overrides: {
                            arrow: {before: true, after: true},
                        },
                    }],
                    'typedef': OFF,
                    'unbound-method': ERROR,
                    'unified-signatures': ERROR,
                }),
            ),
        },
    ],
};
