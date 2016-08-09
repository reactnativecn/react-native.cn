/**
 * Created by tdzl2003 on 8/10/16.
 */

import path from 'path';
import Express from 'express';

exports.install = function install(app) {
  app.use('/assets/', Express.static(path.join(__dirname, '../../docs')));
};
