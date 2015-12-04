/**
 * Created by Yun on 2015-11-28.
 */
require('babel-register')({
  'plugins': [
    'transform-es2015-modules-commonjs',
    'transform-es2015-destructuring',
    'transform-react-jsx',
    'transform-object-rest-spread',
    'transform-strict-mode',
    'transform-class-properties',
    'transform-es2015-parameters',
    'syntax-decorators',
  ],
});

require('../cli');
