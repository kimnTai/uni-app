const path = require("path");
const webpack = require("webpack");

const config = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-import")({
      resolve(id, _basedir, _importOptions) {
        if (id.startsWith("~@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(3));
        }
        if (id.startsWith("@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(2));
        }
        if (id.startsWith("/") && !id.startsWith("//")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(1));
        }
        return id;
      },
    }),
    require("autoprefixer")({
      remove: process.env.UNI_PLATFORM !== "h5",
    }),
    require("@dcloudio/vue-cli-plugin-uni/packages/postcss"),
  ],
};

if (webpack.version[0] > 4) {
  delete config.parser;
}

module.exports = config;
