/**
 * Created by tdzl2003 on 8/10/16.
 */

import path from 'path';
import Express from 'express';

exports.install = function install(app) {
  app.use('/static/', Express.static(path.join(__dirname, '../../docs')), (req, res)=>{
    res.status(404);
    res.end();
  });
};
