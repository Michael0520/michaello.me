export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'test',
        'docs',
        'chore',
        'perf',
        'style',
        'build',
        'ci',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'side-projects',
        'slidevs',
        'docs',
        'shared-ui',
        'workspace',
        '*',
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
  },
};
