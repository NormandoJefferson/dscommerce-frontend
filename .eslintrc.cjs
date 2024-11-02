module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "no-unused-vars": "off", // Desativa a regra padrão do ESLint
    "@typescript-eslint/no-unused-vars": "off", // Desativa completamente a regra de variáveis não usadas
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off", // Desativa o aviso para uso de `any`
    "react-hooks/exhaustive-deps": "off" //  Desativa o alerta para dependências nos hooks
  },
}
