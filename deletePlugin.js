const fs = require("fs");
const path = require("path");

class DeletePlugin {
  /**
   *
   * @param  {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap("delete-source-map", (stats) => {
      const outputPath = stats.compilation.outputOptions.path;
      let countMatchMapAssets = 0;
      Object.keys(stats.compilation.assets)
        .filter((name) => /\.(?:js|css)\.map$/.test(name))
        .forEach((name) => {
          const filePath = path.resolve(outputPath, name);
          if (
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isFile()
          ) {
            countMatchMapAssets += 1;
            fs.unlinkSync(filePath);
          }
        });
      console.log(
        `【delete-source-map-plugin】deleted map file: ${countMatchMapAssets} asset(s) processed`
      );
    });
  }
}

module.exports = DeletePlugin;
