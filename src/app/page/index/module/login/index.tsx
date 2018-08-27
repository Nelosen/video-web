import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as styles from "./style.pcss";
import {Footer} from 'component/footer'
import {store} from "./store";

import {Form, Icon, Input, Button} from 'antd';

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

    public render() {
        const {data} = store;
        return (
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
                                        <p style={{textAlign: 'center'}}><span>已有账号</span><a
                                            onClick={this.loginOut}>登陆</a></p>
                                    </FormItem>
                                </Form>
                            </div>
                    }

                </div>
            </div>
        )
    }
}

