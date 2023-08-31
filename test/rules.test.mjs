/* eslint-env node */
/* eslint-disable @nlib/no-globals */
//@ts-check
import console from 'node:console';
import { ESLint } from 'eslint';
import { available, ignorables } from './util.mjs';

const indent = '    ';
/** @type {Array<string>} */
const errors = [];
/** @param {...string} lines  */
const throwError = (...lines) => {
  const message = lines.join('\n');
  errors.push(message);
};
const eslint = new ESLint({ overrideConfigFile: '.eslintrc.json' });
/** @param {string} fullRuleName  */
const isSupported = (fullRuleName) => {
  let prefix = `${fullRuleName.split('/')[0]}/`;
  let ruleName = fullRuleName.slice(prefix.length);
  if (!ruleName) {
    ruleName = fullRuleName;
    prefix = '';
  }
  const matched = Object.values(available).find(
    (type) => type.prefix === prefix,
  );
  return Boolean(matched && matched.rules.has(ruleName));
};

const types = new Set();
for (const [type, { prefix, documentUrl, rules, fileName }] of Object.entries(
  available,
)) {
  /** @type {{rules: Record<string, [number, ...Array<unknown>]>}} */
  const { rules: configuredRules = {} } =
    await eslint.calculateConfigForFile(fileName);
  for (const [name, value] of Object.entries(configuredRules)) {
    if (!Array.isArray(value) || typeof value[0] !== 'number') {
      throwError(`${type}: ${name} should be [number, ...] but got ${value}`);
    }
  }
  for (const [name, rule] of rules) {
    const url = documentUrl(name);
    const fullName = `${prefix}${name}`;
    let ignoredReason = '';
    if (rule.meta) {
      if (rule.meta.deprecated) {
        ignoredReason = 'deprecated';
      } else if (rule.meta.type === 'layout') {
        ignoredReason = 'formatting';
      }
      types.add(rule.meta.type);
    }
    if (ignoredReason) {
      console.info(
        `${type}: should not cover "${fullName} (${ignoredReason})"`,
      );
      const configured = configuredRules[fullName];
      if (configured) {
        /** @type {{replacedBy?: Array<string>}} */
        const { replacedBy = ['none'] } = rule.meta || {};
        throwError(
          `${type}: ${fullName} (${ignoredReason}) should not be covered.`,
          `${indent}candidates: ${replacedBy.join(', ')}`,
          `${indent}${url}`,
        );
      }
    } else {
      console.info(`${type}: should cover "${fullName}"`);
      const configured = configuredRules[fullName];
      if (!configured && !ignorables.has(fullName)) {
        throwError(`${type}: ${fullName} is not covered.\n${indent}${url}`);
      }
    }
  }
  console.info(`${type}: should not have unsupported rules (js)`);
  for (const fullName of Object.keys(configuredRules)) {
    if (!isSupported(fullName)) {
      throwError(`${type}: ${fullName} is not supported`);
    }
  }
}

if (0 < errors.length) {
  console.info(`failed: ${errors.length}`);
  errors.forEach((error, index) => console.error(`#${index + 1} ${error}`));
  process.exit(1);
} else {
  console.info('passed');
  process.exit(0);
}
