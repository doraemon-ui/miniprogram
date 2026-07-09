// eslint.config.js (CommonJS 版本)
const globals = require('globals')
const js = require('@eslint/js')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const importPlugin = require('eslint-plugin-import')
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort')
const stylisticPlugin = require('@stylistic/eslint-plugin')

module.exports = [
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        NodeJS: 'readonly',
        getApp: 'readonly',
        getCurrentPages: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        App: 'readonly',
        wx: 'readonly',
        Behavior: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // 强制使用 2 个空格缩进
      indent: [
        2,
        2,
        {
          SwitchCase: 1,
          ignoredNodes: [
            'Decorator',
            'Decorator ~ *',
            'PropertyDefinition[decorators.length > 0]',
            'MethodDefinition[decorators.length > 0]',
          ],
        },
      ],
      // 强制使用单引号字符串
      quotes: [2, 'single', { avoidEscape: true }],
      // 禁止使用分号
      semi: [2, 'never'],
      // 禁止自动添加 strict 模式
      strict: [2, 'never'],
      // 强制多行结构保留尾随逗号
      'comma-dangle': [2, 'always-multiline'],
      // 控制数组括号换行格式
      'array-bracket-newline': [2, 'consistent'],
      // 强制 JSX 属性使用双引号
      'jsx-quotes': [2, 'prefer-double'],
      // 检查未使用变量
      'no-unused-vars': 'off',
      // 检查未赋值变量
      'no-unassigned-vars': 'off',
      // 禁止不必要的布尔类型转换
      'no-extra-boolean-cast': 'off',
      // 禁止变量重复声明
      'no-redeclare': 'off',
      // 禁止无效的变量重新赋值
      'no-useless-assignment': 'off',
      // 禁止直接调用对象原型方法
      'no-prototype-builtins': 'off',
      // 禁止使用未定义变量
      'no-undef': 'off',

      // 检查 TypeScript 未使用变量
      '@typescript-eslint/no-unused-vars': 'off',
      // 检查 TypeScript 重复声明
      '@typescript-eslint/no-redeclare': 'off',
      // 强制要求类型导入使用一致的风格
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // 自动排序 import 语句
      'simple-import-sort/imports': 'error',
      // 自动排序 export 语句
      'simple-import-sort/exports': 'error',

      // 控制花括号内侧空格
      '@stylistic/object-curly-spacing': ['error', 'always'],
      // 控制逗号前后空格
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      // 控制对象 key/value 之间的空格
      '@stylistic/key-spacing': 'error',
      // 控制关键字前后空格
      '@stylistic/keyword-spacing': 'error',
      // 控制操作符前后空格
      '@stylistic/space-infix-ops': 'error',
    },
  },
  {
    ignores: [
      '.git/**',
      '.github/**',
      '.husky/**',
      'node_modules/**',
      '**/dist/**',
      '**/lib/**',
      '**/types/**',
      '**/miniprogram_dist/**',
      '**/node_modules/**',
      '**/miniprogram_npm/**',
      '**/index.d.ts',
      'packages/**/*.js',
    ],
  },
]
