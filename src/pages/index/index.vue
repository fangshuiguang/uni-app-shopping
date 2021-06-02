<!--
<template>
	<view class="box">
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="success"></uni-badge>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"></uni-popup-dialog>
    </uni-popup>
    &lt;!&ndash; 顶部搜索 &ndash;&gt;
		<view class="search-box ">
			<view class=" com-box "><image src="../../static/xie/评论%20(1).png" class="bgimg"></image></view>
			<view class=" inp-box" @click="tosearch">
				<view><image src="../../static/xie/搜索%20(1).png" class="serchimg"></image></view>
				<view class="tet">{{search}}</view>
			</view>
			<view class=" scan-box "><image src="../../static/xie/扫一扫%20(1).png" class="bgimg"></image></view>
		</view>
		&lt;!&ndash; 分类数据 &ndash;&gt;
		<view class="classify ">
			<view  :class="[claind>=4?'margin1':'margin2']">
			<scroll-view scroll-x="true" show-scrollbar="true" style="width: 100%;">
				<block v-for="(item,index) in classname" :key="index" >
				<text :class="[claind==index?'bor-buttom':'']" @click="tabClick(index)">
					{{item.name}}
				</text>
				</block>
			</scroll-view>
			</view>
		</view>			
		&lt;!&ndash; 数据层 &ndash;&gt;
		<view class="list">
			<swiper  :current="claind" @change="tabChange" class="list">
				<swiper-item v-for="(ite,index) in classname" class="list">
					<scroll-view scroll-y="true" style="height: 900upx;">
						<view>
							&lt;!&ndash; 轮播部分 &ndash;&gt;
							<view class="list-1 " >
								<swiper class="list-1" indicator-dots="true" autoplay="true" :interval="interval"
								:duration="duration" circular="true" >
									<swiper-item v-for="(item,index) in lunbo" :key="index">
										<image :src="item.src" style="width: 100%;"/>
									</swiper-item>
								</swiper>
							</view>
							&lt;!&ndash; 图标 &ndash;&gt;
							<view class="list-2 ">
								<view class="icon-box" v-for="(item,index) in claicon" >
									<view class="icon-img"><image :src="item.src" mode=""></image></view>
									<view class="icon-tet">{{item.text}}</view>
								</view>
							</view>
							&lt;!&ndash; 每日精选 &ndash;&gt;
							<view class="leading">每日精选</view>
							<view class="handpick " >
								<block v-for="(item,index) in leading" class="paren">
								<view class="lea-box"><image :src="item.src" mode=""></image></view>
								</block>
							</view>
							&lt;!&ndash; 产品 &ndash;&gt;
							<view class="leading">超值特卖</view>
							<view class="commodity">
								<block v-for="(item,index) in commodity" >
									<view class="comm-box"  @click="details(item.id)">
										<view class="comm-img"><image :src="item.cover" mode=""></image></view>
										<view class="comm-nam">{{item.title}}</view>
										<view class="comm-desc">{{item.desc}}</view>
										<view class="comm-price">
											<text>${{item.pprice}}</text>
											<text>${{item.oprice}}</text>
										</view>
									</view>
								</block>
							</view>
							
						</view>											
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue' //也可使用此方式引入组件
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue' //也可使用此方式引入组件
import uniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup-message/uni-popup-message.vue' //也可使用此方式引入组件
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue' //也可使用此方式引入组件
export default {
		data() {
			return {
				search:"智能积木 越野四驱车",
				claind:0,
				interval:5000,
				duration:500,
				classname:[],		//分类名
				lunbo:[],			// 轮播
				claicon:[],			// 分类图标
				handpick:Array,		//精选
				leading:[],			//主打产品
				commodity:[]		//产品
			}
		},
    components:{
      uniBadge,uniPopup,uniPopupMessage,uniPopupDialog
    },
		onLoad() {
			console.log(this.claind)
			// 导航栏
			uni.request({
				url:"http://ceshi3.dishait.cn/api/index_category/data",
				success:(res)=> {
					console.log(res)
					this.classname=res.data.data.category
				}
			});
			uni.request({
				url:'http://ceshi3.dishait.cn/api/index_category/1/data/1',
				success:(res)=>{
					console.log(res)
					this.lunbo=res.data.data[0].data,		// 轮播图
					this.claicon=res.data.data[1].data,		// 图标
					this.leading=res.data.data[2].data,		//主打产品
					this.handpick=res.data.data[3].data,	//每日精选
					this.commodity=res.data.data[4].data	//产品
					console.log(this.commodity,111)
				}
			});
			
		},
    mounted() {
      this.$refs.popup.open('top')
    },
    methods: {
			tosearch(){
				uni.navigateTo({
					url: '../search/search'
					
				});
			},
			//顶部tab点击
			tabClick(index) {
				this.claind = index;//改变下标
			},
			tabChange(e){
				console.log(e)
			   this.claind = e.detail.current //改变数据层
			},
			details(e) {
				let id = e;
				console.log(e,)
				uni.navigateTo({
					url: '../details/details?id' + id,
					success(res){
							 let page = getCurrentPages().pop(); 
					             if (!page) return;  
					             page.onLoad(id); 
						  }
				});
			}
			
		},
		 
	}
</script>

<style scoped>
	.box{color: #3B3B3B;width: 98%;margin: auto;}
	.bor{border: #000000 1upx solid;}
	.search-box{width: 95%;height: 80upx;margin:20upx auto;display: flex;justify-content: space-between;}
	.com-box{width:10%;height:100%;}
	.inp-box{width: 80%;height: 80%;line-height: 60upx;display: flex;background:#F0F0F0;margin-top: 10upx;}
	.scan-box{width:10%;height: 100%;line-height: 80upx;display: flex;}
	.bgimg{width: 60upx;height: 60upx;margin-top: 10upx;}
	.serchimg{width:40upx;height: 40upx;margin:10upx 10upx 20upx 20upx;}
	.tet{font-size: 28upx;color: #7A7E83;}
	/* 分类数据 */
	.classify{width: 100%;height: 65upx;margin: 30upx 0;white-space: nowrap;line-height: 60upx;}
	.classify text{margin: 0 22upx;}
	.bor-buttom{border-bottom:5upx #DD524D solid ;}
	.list{width: 100%;height: 950upx;}
	.list-1{width: 100%;height: 400upx;}
	.list-2{width: 100%;display: flex;justify-content: space-around;flex-wrap: wrap;margin:20upx 0 ;}
	/* 图标 */
	.icon-box{width: 16%;height: 130upx;margin: 10upx;}
	.icon-img{width: 100%;height: 90upx;text-align: center;}
	.icon-img>image{width: 95%;height: 95%;}
	.icon-tet{width: 100%;height: 40upx;font-size: 25upx;text-align: center;color: #C0C0C0;line-height: 40upx;}
	/* 精选 */
	.leading{margin: 30upx 0 0 10upx;font-size: 40upx;font-weight: bold;}
	.handpick{width: 99%;height: 400upx;margin: auto;}
	.lea-box{width: 49%;float: left;margin: 0.5%;height: 49%;}
	.lea-box:first-child{height: 99%;}
	/* .handpick>block>view:not(1){height: 50%;} */
	.lea-box image{width:100%;height: 100%;}
	/* 产品 */
	.commodity{width: 100%;display: flex;justify-content: space-around;flex-wrap: wrap;}
	.comm-box{width: 45%;height: 530upx;line-height: 50upx;margin-top: 20upx;}
	.comm-img{height:380upx;}
	.comm-img>image{width: 100%;height: 100%;}
	.comm-nam{height: 50upx;font-weight: 600;font-size: 35upx;}
	.comm-desc{height: 50upx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 25upx;color: #C0C0C0;}
	.comm-price{height: 50upx;}
	.comm-price>text:first-child{color: #FF3333;}
	.comm-price>text:last-child{font-size: 28upx;color: #C0C0C0;margin-left: 20upx;}
	.margin1{margin-left: -190upx;transition: 1s;}
	.margin2{margin-left:0upx;transition: 1s;}
</style>
-->
<template>
  <view class="box">
<!--    <uni-file-picker
        v-model="imageValue"
        fileMediatype="all"
        @select="select"
        @progress="progress"
        @success="success"
        @fail="fail"
    >
      <button type="primary" size="mini">选择文件</button>
    </uni-file-picker>-->


    <view style="padding: 0 24px;margin-top: 24px">
<!--      <uni-forms ref="form" :value="formData">
        <uni-forms-item label="姓名" name="pname">
          <uni-easyinput type="text" v-model="formData.pname" placeholder="请输入姓名"/>
        </uni-forms-item>
        <uni-forms-item label="密码" name="email">
          <uni-easyinput type="text" v-model="formData.email" placeholder="请输入密码"/>
        </uni-forms-item>
&lt;!&ndash;        <uni-forms-item label="城市" name="city">
          <view class="uni-list-cell">
            <picker mode="selector" v-model="formData.city" :range-key="'label'" :range="array"
                    @change="bindPickerChange">
              <view class="uni-input">{{ array[index].label }}</view>
            </picker>
          </view>
        </uni-forms-item>&ndash;&gt;

        <button @click="submitForm" type="primary">登录</button>
      </uni-forms>-->


      <button @click="showUserInfo" v-if="!isAuth">获取头像</button>
      <view v-else>
        欢迎您{{globalData.userInfo.uid}}
      </view>
    </view>
  </view>
</template>
<script>
import {register,isRegister,loginByPassword} from '../../api/testApi';
export default {
  data() {
    return {
      formData: {
        pname: '',
        email: ''/*,
        city: ''*/
      },
      array: [
        {
          label: '所属城市',
          code: ''
        },
        {
          label: '江西',
          code: '101'
        }, {
          label: '浙江',
          code: '102'
        }
      ],
      rules: {
        // 对name字段进行必填验证
        pname: {
          rules: [
            {
              required: true,
              errorMessage: '请输入姓名',
            }, {
              validateFunction: (rule, value, data, callback) => {
                // 异步需要返回 Promise 对象
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (value.length > 4) {
                      // 通过返回 resolve
                      resolve()
                    } else {
                      // 不通过返回 reject(new Error('错误信息'))
                      reject(new Error('长度不能少于4位'))
                    }
                  }, 200)
                })
              }
            }
          ]
        },
        email: {
          rules: [
            {
              required: true,
              errorMessage: '请输入密码',
            }
          ]
        }/*,
        city: {
          rules: [{
            required: true,
            errorMessage: '请选择城市'
          }]
        }*/
      },
      index: 0,
      imageValue: [],
      globalData:{
        openid:'',
        session_key:'',
        userInfo:{
          uid: "",
          userName: ""
        }
      },
      xcx:{
        appid:'wx919189ebcb958151',
        secret:'2d72363e9875694d28b81f63b54c48a0'
      },
      isAuth: false
    }
  },
  created() {
    //this.$refs.form.setRules(this.rules);
  },
  mounted() {
    // #ifdef MP-WEIXIN
    this.getOpenId();
    // #endif
  },
  methods: {
    /***
     * 判断是否授权(是否注册过)
     *
     * @param cb
     */
    isRegisterOrNot(){
      let _this = this;
      isRegister(this.globalData.openid).then(res=>{
        _this.isAuth = res.result.result?true:false;
        _this.globalData.userInfo = res.result.user;
      })
    },
    /***
     * 获取微信用户信息
     * 完成注册
     * @param
     */
    showUserInfo(){
      let _this = this;
      wx.getUserProfile({
        desc: '用于完善资料',
        success: (res) => {
          _this.globalData.userInfo = res.userInfo;
          register(_this.globalData.userInfo.nickName,_this.globalData.openid).then(
              res=>{
                _this.isRegisterOrNot();
              }
          ).catch(e=>{

          });
        },
        fail:(err) => {
        }
      })
    },
    /***
     * 获取登录凭证
     * @param cb
     */
    getOpenId: function (cb) {
      let that = this;
      if (this.globalData.openid) {
        typeof cb == "function" && cb(this.globalData.openid)
      } else {
        wx.login({
          success: function (res) {
            if (res.code) {
              let l='https://api.weixin.qq.com/sns/jscode2session?appid='+that.xcx.appid+'&secret='+that.xcx.secret+'&js_code='+res.code+'&grant_type=authorization_code';
              wx.request({
                url: l,
                data: {},
                method: 'GET',
                success: function(response){
                  that.globalData = response.data;
                  that.isRegisterOrNot();
                }
              })
            } else {
              console.log('获取用户登录态失败!' + res.errMsg)
            }
          }
        });
      }
    },
    bindPickerChange: function (e) {
      let _this = this;
      this.index = e.target.value;
      this.formData.city = this.array[this.index].code;
      setTimeout(() => {
        _this.submitForm()
      }, 30);
    },
    submitForm() {
      this.$refs.form.submit().then(res => {
        loginByPassword(this.formData.pname, this.formData.email).then(res=>{
          if(res.isLogin){
            uni.showToast({
              title:'恭喜登录成功，接口调试完成！',
              icon:'success'
            });
          }else{
            uni.showToast({
              title:'用户名或密码错误！',
              icon:'none'
            });
          }
        });
      }).catch(err => {
        console.log('表单错误信息：', err);
      })
    },
    // 获取上传状态
    select(e) {
      console.log('选择文件：', e)
    },
    // 获取上传进度
    progress(e) {
      console.log('上传进度：', e)
    },

    // 上传成功
    success(e) {
      console.log('上传成功')
    },

    // 上传失败
    fail(e) {
      console.log('上传失败：', e)
    }
  }
}
</script>

<style type="text/css" lang="scss">
.uni-list-cell {
  border: 1px solid #e1e0e2;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  padding-left: 10px;
}
</style>