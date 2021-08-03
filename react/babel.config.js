module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: [
          'last 1 safari version',
          'last 1 chrome version',
        ],
        useBuiltIns: 'usage',
        corejs: '3.16',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver', {
        root: './src',
      },
    ],
  ],
};
