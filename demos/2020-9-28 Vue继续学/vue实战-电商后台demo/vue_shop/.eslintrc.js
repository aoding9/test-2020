module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', '@vue/standard'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // 函数和函数名之间加空格数
    'space-before-function-paren': 0,
    // 定义但未使用的变量报错改为不提醒
    'no-unused-vars': 0,
    'vue/no-unused-vars': 0,
    //配置camelcase选项
    // 0为不提醒，1为警告，2为报错
    camelcase: [0, { properties: 'always' }]
  },

  extends: ['plugin:vue/essential', '@vue/standard']
}
