// eslint-env node

module.exports = function (api) {
  return {
    comments: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: api.env('production')
            ? ['>0.2%', 'not dead', 'not op_mini all']
            : ['last 1 safari version', 'last 1 chrome version'],
          useBuiltIns: api.env('production') ? 'entry' : 'usage',
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
};
