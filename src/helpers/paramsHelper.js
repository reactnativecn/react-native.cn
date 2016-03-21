/**
 * Created by sunny on 3/21/16.
 */

export function objectToQueryString(data) {
  let params = [], value;
  Object.keys(data).forEach(keyName => {
    value = data[keyName];
    if(typeof value === 'string' || typeof value === 'number' || Array.isArray(value)){
      //params.push(encodeURIComponent(keyName) + '=' + encodeURIComponent(value.toString()));
      params.push(`${keyName}=${value}`);
    }
  });
  return `?${params.join('&')}`;
}

export function queryStringToObject(str, split = '&') {
  if(str && str.length){
    let paras = {};
    let paraNames = str.split(split);
    let arr = [], i = 0;
    for (;i < paraNames.length;i++) {
      //get rid of #anchors
      arr = paraNames[i].trim().split('=');
      paras[arr[0]] = arr[1];
    }
    return paras;
  }
  else{
    return {};
  }
}