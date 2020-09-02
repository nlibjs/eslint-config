import {ESLint, Linter} from 'eslint';

export const listMessages = function* (
    result: Array<ESLint.LintResult>,
): Generator<Linter.LintMessage> {
    for (const {messages} of result) {
        for (const message of messages) {
            yield message;
        }
    }
};

export const listRuleIds = function* (
    result: Array<ESLint.LintResult>,
) {
    for (const message of listMessages(result)) {
        yield message.ruleId;
    }
};
