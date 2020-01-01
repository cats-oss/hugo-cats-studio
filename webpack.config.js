const fs = require('fs');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const MANIFEST_PATH = path.resolve(__dirname, 'data', 'manifest.json');

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : 'cheap-module-eval-source-map',

  entry: {
    app: path.join(__dirname, 'src', 'js', 'app.js'),
  },

  output: {
    filename: path.join('assets', '[name].[contenthash].js'),
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
  },

  plugins: [
    new ManifestPlugin({
      fileName: MANIFEST_PATH,
      generate: (seed, files) => {
        let current = {};

        try {
          current = JSON.parse(
            fs.readFileSync(MANIFEST_PATH, { encoding: 'utf8' }),
          );

          current = Object.keys(current)
            .filter(key => !key.startsWith('precache-manifest.'))
            .reduce(
              (acc, cur) => ({
                ...acc,
                [cur]: `/${current[cur].replace(/^\//, '')}`,
              }),
              {},
            );
        } catch (e) {
          console.error(e);
        }

        return files.reduce(
          (acc, { name, path: p }) => ({ ...acc, [name]: p }),
          { ...seed, ...current },
        );
      },
    }),
  ],
};
