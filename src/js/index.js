/**
 * Created by Ch on 16/12/18.
 */
import "../sass/index.scss";
import Vue from "Vue";
import VueRouter from "VueRouter";
import  "mobiscroll";
import app_router from './router.js';


//
// document.querySelector('body').addEventListener('touchend', function (ev) {
//     event.preventDefault();
// });


if(!(document.cookie || navigator.cookieEnabled)){
    alert('cookie未打开!');
}


Vue.use( VueRouter );
const router = new VueRouter(),
    App = Vue.extend({
        data () {
            return {
                
            }
        },
        ready(){
        }
    }),
    sendMsg = ()=>{
        let layer = eluUtil.layers(`<div class="account_layers">
                        <b>联系方式</b>
                        <span>留下联系方式，方便司机或乘客联系您哦！</span>
                        <p><input type="tel" id="tel" placeholder="请输入手机号"/><label id="tips"></label></p>
                        <a id="next">下一步</a>
                    </div>`,{close : false});
        layer.$con.find("#next").on("click",()=> {
            let tel = layer.$con.find("#tel").val(),
                tip = layer.$con.find("#tips");
            if (!tel) {
                tip.text("手机号不能为空!");
                return false;
            }
            if (!eluUtil.isMobile(tel)) {
                tip.text("手机号格式错误!");
                return false;
            }
            eluUtil.jsonp({
                url : eluConfig.serverPath + 'user/sendSms',
                data : {
                    telNum : tel,
                    uid : eluConfig.user.uid
                }
            },(data) =>{
                if (data.retCode == '200') {
                    layer.close();
                    pushMsg(tel);

                } else {
                    tip.text(data.retMsg);
                }
            });
        });
    },
    pushMsg = (tel)=>{
        let layer = eluUtil.layers(`<div class="account_layers">
                        <b>身份验证</b>
                        <p><input type="text" id="code" placeholder="请输入手机验证码"/><label id="tips"></label></p>
                        <a id="push">提交验证码</a>
                        </div>`,{close : false});
        layer.$con.find("#push").on("click",()=>{
            let code = layer.$con.find("#code").val(),
                tip = layer.$con.find("#tips");
            if (!code || code.length != 6) {
                tip.text("请输入6位数验证码!");
                return false;
            }
            eluUtil.jsonp({
                url : eluConfig.serverPath + 'user/checkSms',
                data : {
                    verifyCode : code,
                    telNum : tel
                }
            },(data) =>{
                if (data.retCode == '200') {
                    layer.close();
                    router.start(App,'html');
                } else {
                    tip.text(data.retMsg);
                }
            });
        })
    };
router.redirect({
    '*' : '/passenger',
    '/driver':'/driver/driverSearch',
    '/passenger':'/passenger/passengerSearch',
    '/account': '/account/main'
});
router.afterEach(function (transition) {
    if (transition.to.title) {
        document.title = transition.to.title;
    }
});
app_router(router);


if(window.location.search.indexOf("mytest") >=0 ){
    let layer = eluUtil.layers(`<div class="account_layers">
                        <b>用户手机号</b>
                        <p><input type="tel" id="tel" placeholder="请输入手机号"/><label id="tips"></label></p>
                        <a id="next">登录</a>
                    </div>`,{close : false});
    layer.$con.find("#next").on("click",()=> {
        let tel = layer.$con.find("#tel").val(),
            tip = layer.$con.find("#tips");
        if (!tel) {
            tip.text("手机号不能为空!");
            return false;
        }
        if (!eluUtil.isMobile(tel)) {
            tip.text("手机号格式错误!");
            return false;
        }
        eluUtil.jsonp({
            // url : eluConfig.serverPath + 'user/queryUser',
            url : eluConfig.serverPath + 'user/queryPhoneUser',
            data : {
                // uid:'o_UN0wrmN-ld7SiouCx0Knhqw9hE'
                // uid:'test01 '
                phone : tel
            }
        },res => {
            layer.close();
            eluConfig.user = res.user || {};
            eluConfig.car = res.car || {};
            eluConfig.user.verifyDriver = res.status;
            if(!eluConfig.user.phone){
                sendMsg();
            }else{
                router.start(App,'html');
            }
        });

    });
}else{
    eluUtil.jsonp({
        url : eluConfig.serverPath + 'user/queryUserInfo'
    },res => {
        // if(res.retCode == '200'){
        eluConfig.user = res.user || {};
        eluConfig.car = res.car || {};
        eluConfig.user.verifyDriver = res.status;
        eluConfig.loginStatus = res.retCode;
        router.start(App,'html');
        // }else{
            // eluConfig.loginStatus = 1;
            // eluUtil.tipsMod(res.retMsg,60000);
        // }
        // if(!eluConfig.user.phone){
        //     sendMsg();
        // }else{
        //     router.start(App,'html');
        // }
    });
}



