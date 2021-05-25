import axios from 'axios';
import baseUrl from '../../config'




const config = {
	baseURL: baseUrl, // api的base_url
	timeout: 50000 // 请求超时时间
};


function goLogin(res) {

	return Promise.reject(res);
}

function objectMerge(target, source) {
	if (typeof target !== 'object') {
		target = {};
	}
	if (Array.isArray(source)) {
		return source.slice();
	}
	for (const property in source) {
		if (source.hasOwnProperty(property)) {
			const sourceProperty = source[property];
			if (typeof sourceProperty === 'object') {
				target[property] = objectMerge(target[property], sourceProperty);
				continue;
			}
			target[property] = sourceProperty;
		}
	}
	return target;
}

const interceptors = {
	request: {
		config: config => {
			return config;
		},
		error: error => {
			Promise.reject(error);
		}
	},
	response: {
		response: response => {
			//请求成功
			if(response.status==200){
				return response.data;
			}else{
				// 请求失败 [102：用户未登录]
				if (response.data.code === 102) {
					return goLogin(res);
				} else {

				}
				return Promise.reject(res);
			}
		},
		error: (error) => {
			if (error == 'Error: Network Error') {
				return Promise.reject(error);
			} else {
				return Promise.reject(error);
			}
		}
	}
}

const jsonService = axios.create(
	objectMerge(
		{
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			transformRequest: [function (data) {
				return JSON.stringify(data);
			}]
		},
		config
	)
);



// request拦截器
jsonService.interceptors.request.use(interceptors.request.config, interceptors.request.error);

// respone拦截器
jsonService.interceptors.response.use(interceptors.response.response, interceptors.response.error);

// uni适配器
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：",response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
};

export const fetch = jsonService;

