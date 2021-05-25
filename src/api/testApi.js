import {fetch} from '../utils/fetch';
/***
 * 登录
 *
 * @returns {*}
 */
export function loginByPassword(uid,name) {
	return fetch({
		url: '/users/login?uid='+uid+'&name='+name,
		method: 'get'
	});
}