import * as React from 'react'
import {observer} from 'mobx-react';
import * as styles from './Login.pcss';
import {store} from "../store";


const moment = require('moment');


interface LoginState {
    loading: boolean
}


@observer
export class Login extends React.Component<any, LoginState> {

    public onChangeAccount = (e) => {
        store.changeAccount(e.target.value);
    }

    public onChangePassword = (e) => {
        store.changePassword(e.target.value);
    }

    public onChangeEmail = (e) => {
        store.changeEmail(e.target.value);
    }

    public loginIn = () => {
        store.changeIsLog(false)
    }
    public loginOut = () => {
        store.changeIsLog(true)
    }

    public render() {
        return (
            <div>
                <div className={styles.defaultInf}>
                    {/*<h1 style={{color: '#629aa9'}}>Tables</h1>*/}
                    <div className={styles.defaultInfDiv}>
                        {/*<div className={styles.defaultInfDivSpan}>*/}
                            {/*<span className={styles.defaultInfDivSpan1}>个人信息表:</span>*/}
                            {/*<div className={styles.defaultInfTh}>*/}
                                {/*<span>用户名</span>*/}
                                {/*<span>邮箱</span>*/}
                                {/*<span>注册时间</span>*/}
                            {/*</div>*/}
                            {/*<div className={styles.defaultInfTd}>*/}
                                {/*<span>{store.defaultUserInf.username}</span>*/}
                                {/*<span>{store.defaultUserInf.email}</span>*/}
                                {/*<span>*/}
                                            {/*{*/}
                                                {/*store.defaultUserInf.gmt_create !== undefined ?*/}
                                                    {/*moment(parseInt(store.defaultUserInf.gmt_create) * 1000).format('YYYY-MM-DD') :*/}
                                                    {/*null*/}
                                            {/*}*/}
                                        {/*</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        <div className={styles.defaultInfDivSpan}>
                            <span style={{color: '#629aa9'}} className={styles.defaultInfDivSpan1}>已购买:</span>
                            <div className={styles.defaultInfTh1}>
                                <span>商品名</span>
                                <span>商品价格</span>
                                <span>收货地址</span>
                                <span>购买日期</span>
                            </div>
                            <div className={styles.defaultInfTd1}>
                                {
                                    store.purchased_list.map(item => (
                                        <div>
                                            <span>{item.title}</span>
                                            <span>{item.price}</span>
                                            <span>{item.address}</span>
                                            <span>
                                                        {
                                                            store.defaultUserInf.gmt_create !== undefined ?
                                                                moment(parseInt(store.defaultUserInf.gmt_create) * 1000).format('YYYY-MM-DD') :
                                                                null
                                                        }
                                                        </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

