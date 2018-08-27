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


    // 注册
    @action
    public load = () => {
        return api.list({model: {biz_id: 1, page: '1', page_size: 20}}).subscribe(data => {
            this.changeList(data.data);
            if (data.success) {
                message.success(data.data);

            }
        })

    }

}

export const store = new Store();
