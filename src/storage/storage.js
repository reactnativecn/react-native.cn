/**
 * Created by sunny on 1/26/16.
 */
import Storage from './lib';
import sync from './sync';

const storage = new Storage({
  size: 1000,
  sync,
  defaultExpires: 1000 * 3600 * 2,
  enableCache: true,
});

export default storage;
