import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


// 环境变量，测试用
/*Vue.prototype.baseUrl = null;
if(process.env.NODE_ENV=='development'){
	Vue.prototype.baseUrl = '/api';
}else if(process.env.NODE_ENV=='test'){

}else if(process.env.NODE_ENV=='production'){

}*/


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
