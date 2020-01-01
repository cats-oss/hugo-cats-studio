module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-custom-media'),
    require('postcss-nesting'),
    require('postcss-color-mod-function'),
    require('autoprefixer')({
      remove: false,
    }),
    require('css-mqpacker')({
      sort: true,
    }),
    require('cssnano')({
      autoprefixer: false,
    }),
    require('postcss-hash')({
      manifest: 'data/manifest.json',
    }),
  ],
};
