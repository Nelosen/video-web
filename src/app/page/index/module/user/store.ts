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

        return loginApi.userInfo({model: {biz_id: '1'}}).subscribe(data => {
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
            biz_id: 1,
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
            }
        })

    }

    // 登录
    @action
    public onLogin = () => {

        const md5 = require("md5-node")
        const loginData: any = {
            biz_id: 1,
            username: this.data.username,
            password: md5(this.data.password),
        }

        return loginApi.login({data: loginData}).subscribe(data => {
            if (data.success) {
                message.success(data.data);
                this.load()
                this.onAccount();

            }
        })

    }

    // 获取用户信息
    @action
    public onAccount = () => {

        loginApi.account({model: {biz_id: 1}}).subscribe(data => {
            if (data.success) {
                this.defaultUserInf = data.data.user_info;
                this.purchased_list = data.data.purchased_list
                this.changeIsLoginIn(true)
            }
        })

    }
}

export const store = new Store();
