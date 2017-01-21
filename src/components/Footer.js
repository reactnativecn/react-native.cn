/**
 * Created by Yun on 2015-10-21.
 */
import React from 'react';

import imageGhs from './images/ghs.png';

export default function Footer() {
  return (
    <footer className="wrap">
      <div className="container">
        <div className="right">
          <p>React Native中文网.</p>
          <p>© 2017 杭州欧石南网络科技有限公司</p>
          <p className="gray">浙ICP备15023664号-3</p>
          <p className="gray">
            <img src={imageGhs} alt="浙公网安备 33010602005511号" />
            浙公网安备 33010602005511号
          </p>
        </div>
      </div>
    </footer>
  );
}
