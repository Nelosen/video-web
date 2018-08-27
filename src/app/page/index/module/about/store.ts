import {observable, action} from 'mobx'
import {LoginApi} from "api/loginApi";

const api = new LoginApi();

class Store {
    @ observable public id: any = 0;
    @ observable public flag: boolean = false;
    @ observable public detailList: any = {};


    @action
    public changeFlag(v) {
        this.flag = v
    }

    @action
    public changeId(v) {
        this.id = v
    }

    // 获取商品详情
    @action
    public getDetail = (id) => {
        return api.detail({model: {biz_id: 1, item_id: id}})
    }


}

export const store = new Store();
