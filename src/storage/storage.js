/**
 * Created by sunny on 1/26/16.
 */
import Storage from './lib';
import sync from './sync';

const storage = new Storage({
  size: 1000,
  sync,
  defaultExpires: __SERVER__ ? 1000 * 60 : 1000 * 60 * 10,
  enableCache: true,
});

export default storage;
