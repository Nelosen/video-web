import {observable, action} from 'mobx';
import {LoginApi} from "api/loginApi";
import {message} from 'antd';

const loginApi = new LoginApi();

export class LoginStore {

    @observable public data = {username: '', password: ''};
    @observable public loading = false;
    @observable public id:any = 0;

    @action
    public changeAccount = (username) => {
        this.data.username = username;
    };

    @action
    public changePassword = (password) => {
        this.data.password = password;
    };

    @action
    public toggleLoading = () => {
        this.loading = !this.loading;
    };


    @action
    public onSubmit = () => {

        const loginData: any = {
            biz_id: 1,
            item_id: this.id,
            remark: '1111'
        };
        return loginApi.submit_buy({data: loginData}).subscribe(data => {
            if (data.success) {
                window.location.href = window.location.hostname + "/#/user";
            } else {
                message.success(data.message);
            }
        })

    }
}

export const store = new LoginStore();
