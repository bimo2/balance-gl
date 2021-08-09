// eslint-env node

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['last 1 safari version', 'last 1 chrome version'],
        useBuiltIns: 'usage',
        corejs: '3.16',
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
