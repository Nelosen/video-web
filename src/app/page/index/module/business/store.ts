import {observable, action} from 'mobx'
import {LoginApi} from "api/loginApi";
import {message} from 'antd';

const api = new LoginApi();

class Store {
    @ observable public list: any = [];
    @ observable public biz_custom_desc: any = [];

    @action
    public changeList(v) {
        this.list = v
    }

    // 判断是否已经登录
    @action
    public isUserInfo = () => {

        return api.userInfo({model: {biz_id: '2'}})
    };

    // 注册
    @action
    public load = () => {
        return api.list({model: {biz_id: 2, page: 1}}).subscribe(data => {
            this.changeList(data.data);
            if (data.success) {
                message.success(data.data);

            }
        })

    }

}

export const store = new Store();
