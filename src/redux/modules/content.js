/**
 * Created by Yun on 2015-12-04.
 */

import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';

const CONTENT_LOADED = '';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  if (action.type === ROUTER_DID_CHANGE) {
    // Clear content after router change.

  } else {

  }
}