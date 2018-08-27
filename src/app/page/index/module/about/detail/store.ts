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


    // 获取动态详情
    @action
    public getDetail = (id) => {
        return api.postDetail({model: {biz_id: 2, post_id: id}})
    }


}

export const store = new Store();
