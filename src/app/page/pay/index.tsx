import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {observer} from 'mobx-react';
import {Form, Icon, Input, Button} from 'antd';
import * as styles from './Login.pcss';
import {store} from "./LoginStore";

const FormItem = Form.Item;

interface LoginState {
    loading: boolean
}

@observer
class Login1 extends React.Component<any, LoginState> {

    public componentWillMount() {
        const id = window.location.href.split("?")[1];
        const getId = id.split("=")[1];
        store.id = getId;
        store.getDetail(getId).subscribe(data => {
            store.changeAccount(data.data.title);
            store.changePassword(data.data.price / 100);
        })
    }

    public onChangeAccount = (e) => {
        store.changeAccount(e.target.value);
    }

    public onChangePassword = (e) => {
        store.changePassword(e.target.value);
    }

    public render() {
        const {data} = store;
        return (
            <div className={styles.container} style={{padding: '280px 0 144px 0', fontSize: '30px'}}>
                <div className={styles.topLog} style={{padding: 20}}>{}
                </div>

                <form id={'form'} action={'http://testapi.youfudata.cn/gate/gw/pay'} method="post">
                    <div style={{width: 800, margin: '0 auto', textAlign: 'center'}}>
                        <p style={{fontSize: 38, color: '#333'}}>咨询服务在线购买</p>
                        <p style={{fontSize: 18, color: '#333'}}>感谢您选择我们，我们承诺为客户带来高效，便捷的咨询服务。为客户解决实际烦恼</p>
                        <Form>
                            <FormItem>
                                <Input
                                    style={{width: 368, height: 40}}
                                    value={data.username}
                                    onChange={this.onChangeAccount}
                                    prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                    placeholder="战略咨询"
                                />
                            </FormItem>
                            <FormItem>
                                <Input
                                    style={{width: 368, height: 40}}
                                    value={data.password}
                                    onChange={this.onChangePassword}
                                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                    placeholder="1500"/>
                            </FormItem>
                            <FormItem>
                                <Input
                                    style={{width: 368, height: 40}}
                                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                    placeholder="地址"/>
                            </FormItem>
                            <FormItem>
                                <Button
                                    style={{width: 368, height: 40}}
                                    onClick={store.onSubmit}
                                    type="primary"
                                    className="login-form-button">
                                    立即购买
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
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

                    <input type="submit"  onClick={store.onSubmit} value="Submit"/>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Login1/>, document.getElementById('app'));
