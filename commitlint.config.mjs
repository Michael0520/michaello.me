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
        'blog',
        'lab-home',
        'lab-calculator',
        'lab-todo',
        'slidevs',
        'shared-ui',
        'site-config',
        'workspace',
        '*',
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
  },
};
