/**
 * Created by fsg on 2021/5/25.
 * 配置
 * 环境变量
 */

let baseUrl = null;
/****** 微信小程序 ******/
// #ifdef MP-WEIXIN
if(process.env.NODE_ENV=='development'){
	baseUrl = 'http://192.168.20.51:3000';
}else if(process.env.NODE_ENV=='test'){

}else if(process.env.NODE_ENV=='production'){

}
// #endif



/****** h5 ******/
// #ifdef H5
if(process.env.NODE_ENV=='development'){
	baseUrl = '/api';
}else if(process.env.NODE_ENV=='test'){

}else if(process.env.NODE_ENV=='production'){

}
// #endif

export default baseUrl;