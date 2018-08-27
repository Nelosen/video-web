import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as styles from "./style.pcss";
import {Footer} from 'component/footer'
import {store} from "./store";
import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

@observer
export default class About extends Component<any, any> {

    public render() {
        return (
            <div>
                <Left/>
                <Footer/>
            </div>
        )
    }
}

@observer
export class Left extends Component<any, any> {
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

    public goto = () => {
        const redirectUrl = process.env.REDIRECT_URL;
        window.open(redirectUrl + "checkInf.html#")
    }

    public base = () => {
        store.changeFlag(1);
    }

    public my = () => {
        store.changeFlag(2)
    }

    public render() {
        const {data} = store;
        return (
            <div style={{width: '60%', margin: '0 auto'}}>
                {
                    // 是否已经是登录状态
                    store.isLogIn ?
                        <div className={styles.defaultInf}>
                            <div className={styles.left}>
                                <h1> <Icon type={'user'} />账户设置</h1>
                                <p className={store.flag === 1 ? styles.active : styles.default1}
                                   onClick={this.base}>基本信息</p>
                                <p className={store.flag === 2 ? styles.active : styles.default1}
                                   onClick={this.my}>我的账户</p>
                            </div>

                            {
                                store.flag === 1 ?
                                    <div className={styles.defaultInfDiv}>
                                        <div className={styles.defaultInfDivSpan}>
                                            <span className={styles.defaultInfDivSpan1}>个人信息表:</span>
                                            <div className={styles.defaultInfTh}>
                                                <div>
                                                    <span>用户名</span><span>{store.defaultUserInf.username}</span>
                                                </div>
                                                <div>
                                                    <span>邮箱</span> <span>{store.defaultUserInf.email}</span>
                                                </div>
                                                <div>
                                                    <span>注册时间</span>
                                                    <span>
                                            {
                                                store.defaultUserInf.gmt_create !== undefined ?
                                                    moment(parseInt(store.defaultUserInf.gmt_create) * 1000).format('YYYY-MM-DD') :
                                                    null
                                            }
                                        </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div className={styles.defaultInfDivSpan}>*/}
                                        {/*<span className={styles.defaultInfDivSpan1}>已购买:</span>*/}
                                        {/*<div className={styles.defaultInfTh1}>*/}
                                        {/*<span>商品名</span>*/}
                                        {/*<span>商品价格</span>*/}
                                        {/*<span>收货地址</span>*/}
                                        {/*<span>购买日期</span>*/}
                                        {/*</div>*/}
                                        {/*<div className={styles.defaultInfTd1}>*/}
                                        {/*{*/}
                                        {/*store.purchased_list.map(item => (*/}
                                        {/*<div>*/}
                                        {/*<span>{item.title}</span>*/}
                                        {/*<span>{item.price}</span>*/}
                                        {/*<span>{item.address}</span>*/}
                                        {/*<span>*/}
                                        {/*{*/}
                                        {/*store.defaultUserInf.gmt_create !== undefined ?*/}
                                        {/*moment(parseInt(store.defaultUserInf.gmt_create) * 1000).format('YYYY-MM-DD') :*/}
                                        {/*null*/}
                                        {/*}*/}
                                        {/*</span>*/}
                                        {/*</div>*/}
                                        {/*))*/}
                                        {/*}*/}
                                        {/*</div>*/}
                                        {/*</div>*/}
                                    </div> :
                                    <div className={styles.defaultInfDiv}>
                                        <div style={{margin:30}}>
                                            <p className={styles.defaultInfDivSpan11}>我的账户余额：0.0 金豆</p>
                                            <span className={styles.defaultInfDivSpan11}>充值金额：<input/>元</span>

                                            <form id={'form'} action={'http://testapi.youfudata.cn/gate/gw/pay'} method="post">
                                                <input name={"sp_id"} type={"text"} value={"1008"} style={{display: 'none'}}/>
                                                <input name={"mch_id"} type={"text"} value={"100870000000004"} style={{display: 'none'}}/>
                                                <input name={"out_trade_no"} type={"text"} value={"orderNum"} style={{display: 'none'}}/>
                                                <input name={"bank_code"} type={"text"} value={"orderNum"} style={{display: 'none'}}/>
                                                <input name={"goods_name"} type={"text"} value={"商城商品组合"} style={{display: 'none'}}/>
                                                <input name={"notify_url"} type={"text"} value={"http://168.168.168.168/test1/"}
                                                       style={{display: 'none'}}/>
                                                <input name={"call_back_url"} type={"text"}
                                                       value={"'http://47.100.169.140:9911/order/paysuccess?price=' + c + checkPrice*100 "}
                                                       style={{display: 'none'}}/>
                                                <input name={"total_fee"} type={"text"} value={"checkPrice*100"} style={{display: 'none'}}/>
                                                <input name={"card_type"} type={"text"} value={"DEBIT"} style={{display: 'none'}}/>

                                                <input name={"user_type"} type={"text"} value={"1"} style={{display: 'none'}}/>
                                                <input name={"channel"} type={"text"} value={"1"} style={{display: 'none'}}/>
                                                <input name={"nonce_str"} type={"text"} value={"6161532897"} style={{display: 'none'}}/>
                                                <input name={"sign"} type={"text"} value={"sign"} style={{display: 'none'}}/>

                                                <input className={styles.submit} type="submit"  value="马上充值"/>
                                            </form>


                                            {/*<Button style={{background: '#F04E2D',color:'#fff'}}>马上充值</Button>*/}
                                        </div>
                                    </div>
                            }
                        </div>
                        :
                        <div className={styles.container} style={{padding: '280px 0 144px 0', fontSize: '30px'}}>
                            <div className={styles.topLog} style={{padding: 20}}>
                                {/*<img alt="logo" style={{width: '60px', height: '60px'}} src={logo}/> website*/}
                            </div>
                            <div style={{width: 368, margin: '0 auto'}}>
                                {
                                    store.isLog ?
                                        <div>
                                            <h1 style={{textAlign: 'center'}}>登陆</h1>
                                            <Form>
                                                <FormItem>
                                                    <Input
                                                        style={{width: 368, height: 40}}
                                                        value={data.username}
                                                        onChange={this.onChangeAccount}
                                                        prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                        placeholder="请输入帐号"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Input
                                                        style={{width: 368, height: 40}}
                                                        value={data.password}
                                                        onChange={this.onChangePassword}
                                                        prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                        type="password"
                                                        placeholder="请输入密码"/>
                                                </FormItem>
                                                <FormItem>
                                                    <Button
                                                        style={{width: 368, height: 40}}
                                                        onClick={store.onLogin}
                                                        type="primary"
                                                        className="login-form-button">
                                                        登陆
                                                    </Button>
                                                    <p style={{textAlign: 'center'}}><span>还没有账号 ? </span><a
                                                        onClick={this.loginIn}>立即注册</a></p>
                                                </FormItem>
                                            </Form>
                                        </div> :
                                        <div>
                                            <h1 style={{textAlign: 'center'}}>加入我们</h1>
                                            <Form>
                                                <FormItem>
                                                    <Input
                                                        style={{width: 368, height: 40}}
                                                        value={data.username}
                                                        onChange={this.onChangeAccount}
                                                        prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                        placeholder="用户名"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Input
                                                        style={{width: 368, height: 40}}
                                                        value={data.email}
                                                        onChange={this.onChangeEmail}
                                                        prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                        placeholder="邮箱"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Input
                                                        style={{width: 368, height: 40}}
                                                        value={data.password}
                                                        onChange={this.onChangePassword}
                                                        prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                        type="password"
                                                        placeholder="请输入密码"/>
                                                </FormItem>
                                                <FormItem>
                                                    <Button
                                                        style={{width: 368, height: 40}}
                                                        onClick={store.onSubmit}
                                                        type="primary"
                                                        className="login-form-button">
                                                        注册
                                                    </Button>
                                                    <Checkbox
                                                    >
                                                        <span>我已阅读并同意<a onClick={this.goto}>《广锦商务注册协议》</a></span>
                                                    </Checkbox>
                                                    <p style={{textAlign: 'center'}}><span>已有账号</span><a
                                                        onClick={this.loginOut}>登陆</a></p>
                                                </FormItem>
                                            </Form>
                                        </div>
                                }

                            </div>
                        </div>
                }
            </div>


        )
    }
}

