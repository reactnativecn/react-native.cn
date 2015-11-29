/**
 * Created by Yun on 2015-11-29.
 */
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

compiler.run((err, stats)=>{
  compiler.purgeInputFileSystem();
  if (err) {
    lastHash = null;
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    if (!options.watch) {
      process.on('exit', function() {
        process.exit(1);
      });
    }
    return;
  }
  process.stdout.write(stats.toString({
    colors: true,
  }) + '\n');
});
