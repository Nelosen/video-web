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
            <div className={styles.container} style={{padding: '280px 0 144px 0', fontSize:'30px'}}>
                <div className={styles.topLog} style={{padding: 20}}>
                </div>
                <div style={{width: 800, margin: '0 auto',textAlign:'center'}}>
                    <p style={{fontSize:38,color:'#333'}}>咨询服务在线购买</p>
                    <p  style={{fontSize:18,color:'#333'}}>感谢您选择我们，我们承诺为客户带来高效，便捷的咨询服务。为客户解决实际烦恼</p>
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
                                prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                placeholder="1500"/>
                        </FormItem>
                        <FormItem>
                            <Input
                                style={{width: 368, height: 40}}
                                value={data.password}
                                onChange={this.onChangePassword}
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
            </div>
        )
    }
}

ReactDOM.render(<Login1/>, document.getElementById('app'));
