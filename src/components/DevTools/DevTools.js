/**
 * Created by Yun on 2015-11-29.
 */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="H"
    changePositionKey="Q"
  >
    <LogMonitor />
  </DockMonitor>
);
