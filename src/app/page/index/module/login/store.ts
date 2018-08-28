import {observable, action} from 'mobx'
import {LoginApi} from "api/loginApi";
import {message} from 'antd';

const loginApi = new LoginApi();

class Store {
    @observable
    public isLogIn = false;
    @observable public data = {username: '', email: '', password: ''};
    @observable public userInf: any = {};
    @observable public defaultUserInf: any = {};
    @observable public purchased_list: any = [];
    @observable public loading = false;
    @observable public isLog = false;
    @observable public flag = 2;
    @observable public itemId = 0;
    @observable public sum = 1;

    @action
    public changeSum = (v) => {
        this.sum = v;
    };

    @action
    public changeItemId = (v) => {
        this.itemId = v;
    };

    @action
    public changeFlag = (v) => {
        this.flag = v;
    };
    @action
    public changeIsLog = (username) => {
        this.isLog = username;
    };
    @action
    public changeAccount = (username) => {
        this.data.username = username;
    };

    @action
    public changePassword = (password) => {
        this.data.password = password;
    };

    @action
    public changeEmail = (password) => {
        this.data.email = password;
    };

    @action
    public changeUserInf = (V) => {
        this.userInf = V;
    };

    @action
    public toggleLoading = () => {
        this.loading = !this.loading;
    };

    @action
    public changeIsLoginIn(v) {
        this.isLogIn = v;
    }

    constructor() {
        this.load();
        this.onAccount();
    }

    // 判断是否已经登录
    @action
    public load = () => {

        return loginApi.userInfo({model: {biz_id: '2'}}).subscribe(data => {
            if (data.success) {
                this.defaultUserInf = data.data ? data.data.user_info : '';
                this.changeIsLoginIn(true);
            }
        })
    };


    // 注册
    @action
    public onSubmit = () => {

        const md5 = require("md5-node")
        const loginData: any = {
            biz_id: 2,
            username: this.data.username,
            password: md5(this.data.password),
            nickname: 'zl',
            email: this.data.email,
            mobile: '13081937220'
        }

        return loginApi.register({data: loginData}).subscribe(data => {
            if (data.success) {
                message.success(data.data);
                this.changeIsLog(true)
            }else{
                console.log(data)
                message.error(data.message);
            }
        })

    }

    // 登录
    @action
    public onLogin = () => {

        const md5 = require("md5-node")
        const loginData: any = {
            biz_id: 2,
            username: this.data.username,
            password: md5(this.data.password),
        }

        return loginApi.login({data: loginData}).subscribe(data => {
            if (data.success) {
                message.success(data.data);
                this.load();
                this.onAccount();
                window.location.href = window.location.hostname + "/#/back";
            }
        })

    }

    // 获取用户信息
    @action
    public onAccount = () => {

        loginApi.account({model: {biz_id: 2}}).subscribe(data => {
            if (data.success) {
                this.defaultUserInf = data.data.user_info;
                this.purchased_list = data.data.purchased_list
                this.changeIsLoginIn(true)
            }
        })

    }

    // 购买商品
    @action
    public toBuy = (id) => {
        // form.submit();
        //  document.getElementById('#form').onsubmit('');

        const loginData: any = {
            biz_id: 2,
            item_id: id,
            remark: '1111'
        };
        return loginApi.submit_buy({data: loginData}).subscribe(data => {
            if (data.success) {
                window.location.href = window.location.hostname + "/#/back";
            } else {
                message.success(data.message);
            }
        })

    }
}

export const store = new Store();
