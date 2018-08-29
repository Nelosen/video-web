import {observable, action} from 'mobx'
// import {message} from "antd";
import {LoginApi} from "api/loginApi";

const api = new LoginApi();
class Store {
    @observable public list: any = []

    @action
    public changeList(v) {
        this.list = v;
    }
    public load = () => {
        return api.list({model: {biz_id: 2, page: 1}}).subscribe(data => {
            this.changeList(data.data);
            if (data.success) {
              //  message.success(data.data);

            }
        })

    }
}

export const store = new Store();
