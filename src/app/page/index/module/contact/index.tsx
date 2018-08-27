import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {Row, Col} from 'antd';

@observer
export default class About extends Component<any, any> {

    public render() {
        return (
            <div>
                <CommonBanner/>
                <Left/>
                <Footer/>
            </div>
        )
    }
}

@observer
export class CommonBanner extends Component<any, any> {

    public render() {
        return (
            <div style={{width: "100%"}}>
                <img src={require('./images/banner.jpg')} style={{width: "100%",height:'200px'}}/>
            </div>
        )
    }

}

@observer
export class Left extends Component<any, any> {
    public render() {
        return (
            <div style={{width: '60%', margin: '0 auto'}}>
                <Row gutter={24}>
                    <Col className="gutter-row" xs={{span: 24}} sm={{span: 24}} xl={{span: 16}}>
                        <div className={style.page}>
                            <header className={style.pageHeader}>
                                <h1 className={style.pageTitle}>Contact us</h1>
                            </header>
                            <img src={require('./images/bannercntact.jpg')} className={style.IMg}/>
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={{span: 24}} sm={{span: 24}} xl={{span: 8}}>
                        <div className={style.panelContact}>
                            <h4>Address</h4>
                            <ul>
                                <li>15579753601</li>
                                <li><a href="#">gjswr123@sohu.com</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

