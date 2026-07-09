// stylelint.config.js
module.exports = {
  customSyntax: 'postcss-less',
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    // 禁止使用未知单位，允许小程序 rpx 单位
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: '/rpx/',
      },
    ],
    // 禁止使用未知选择器类型，允许小程序 page 选择器
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/page/'],
      },
    ],

    // 缩进格式检查
    '@stylistic/indentation': null,
    // 要求字符串使用单引号
    '@stylistic/string-quotes': 'single',
    // 要求声明块最后一个声明必须包含分号
    '@stylistic/declaration-block-trailing-semicolon': 'always',
    // 要求闭合大括号前换行
    '@stylistic/block-closing-brace-newline-before': 'always',
    // 要求在大括号前必须保留一个空格
    '@stylistic/block-opening-brace-space-before': 'always',
    // 禁用单位大小写检查
    '@stylistic/unit-case': null,
    // 禁用十六进制颜色大小写检查
    '@stylistic/color-hex-case': null,
    // 禁用连续空行数量检查
    '@stylistic/max-empty-lines': null,
    // 禁用数字是否需要前导零检查
    '@stylistic/number-leading-zero': null,
    // 禁用函数括号内部空格检查
    '@stylistic/function-parentheses-space-inside': null,
    // 禁用声明冒号后的空格检查
    '@stylistic/declaration-colon-space-after': null,
    // 禁用声明冒号前的空格检查
    '@stylistic/declaration-colon-space-before': null,

    // 禁用未知 at-rule 检查（兼容 Less 变量、Mixin 等语法）
    'at-rule-no-unknown': null,
    // 禁用注释前空行检查
    'comment-empty-line-before': null,
    // 禁用选择器特异性递减检查
    'no-descending-specificity': null,
    // 禁用重复选择器检查
    'no-duplicate-selectors': null,
    // 禁用空样式文件检查
    'no-empty-source': null,
    // 禁用声明块重复属性检查
    'declaration-block-no-duplicate-properties': null,
    // 禁用 font-family 缺少通用字体族检查
    'font-family-no-missing-generic-family-keyword': null,
    // 禁用声明前空行检查
    'declaration-empty-line-before': null,
    // 禁用未知 CSS 属性检查（兼容 Less 自定义语法）
    'property-no-unknown': null,
    // 禁用重复 CSS 自定义属性检查
    'declaration-block-no-duplicate-custom-properties': null,
    // 禁用函数名称大小写检查
    'function-name-case': null,
    // 禁用 keyframes 动画名称格式校验
    'keyframes-name-pattern': null,
    // 禁用 class 选择器命名格式校验
    'selector-class-pattern': null,
    // 禁用数值精度检查（限制小数位数）
    'number-max-precision': null,
    // 禁用废弃 CSS 属性值关键字检查（如 word-break: break-word）
    'declaration-property-value-keyword-no-deprecated': null,
    // 要求推荐场景下字体名称使用引号（如 iconfont 字体）
    'font-family-name-quotes': null,

    // 禁用 import 强制使用 url() 格式（保留 Less import）
    'import-notation': null,
    // 禁用属性值未知检查（兼容 Less 变量，如 border: 1px solid @color）
    'declaration-property-value-no-unknown': null,
  },
  ignoreFiles: [
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
  ],
}
