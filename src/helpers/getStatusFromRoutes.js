/**
 * Created by Yun on 2015-11-29.
 */
/**
 * Return the status code from the last matched route with a status property.
 *
 * @param matchedRoutes
 * @returns {Number|null}
 */
export default (matchedRoutes) => {
  return matchedRoutes.reduce((prev, cur) => cur.status || prev, null);
};