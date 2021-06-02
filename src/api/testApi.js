import {fetch} from '../utils/fetch';/***
 * 判断是否注册过
 *
 * @returns {*}
 */
export function isRegister(name) {
	return fetch({
		url: '/users/isReg?name='+name,
		method: 'get'
	});
}
/***
 * 注册
 *
 * @returns {*}
 */
export function register(uid,name) {
	return fetch({
		url: '/users/reg?uid='+uid+'&name='+name,
		method: 'get'
	});
}
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

/***
 * 购物车页面
 * 1
 *
 * @returns {*}
 */
export function apiLogin(data) {
	return fetch({
		url: '/api/login',
		method: 'POST',
		baseURL:'http://ceshi3.dishait.cn',
		data
	});
}

/***
 * 购物车页面
 * 1
 *
 * @returns {*}
 */
export function apiCart(data) {
	return fetch({
		url: '/api/cart',
		baseURL:'http://ceshi3.dishait.cn',
		method: 'get',
		headers: data
	});
}