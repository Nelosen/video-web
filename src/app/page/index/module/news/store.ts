import {observable, action} from 'mobx'
import {LoginApi} from "api/loginApi";

const api = new LoginApi();

class Store {
    @ observable public flag: boolean = false;
    @ observable public postList: any = [];


    @action
    public changePostList(v) {
        this.postList = v
    }


    // 获取实时动态列表
    @action
    public getList = () => {
        return api.postList({model: {biz_id: 2, post_id: 1}}).subscribe(data => {
            this.changePostList(data.data)
        })
    }


}

export const store = new Store();
