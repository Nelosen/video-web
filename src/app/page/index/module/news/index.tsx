import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {store} from './store'

const moment = require('moment');
@observer
export default class About extends Component<any, any> {

    constructor() {
        super();
        store.getList()
    }

    public render() {
        return (
            <div>
                <Left {...this.props}/>
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
                <img src={require('./images/banner.jpg')} style={{width: "100%", height: '200px'}}/>
            </div>
        )
    }

}

@observer
export class Left extends Component<any, any> {

    // 查看详细
    public clickDetail = (id) => {
        return () => {
            this.props.history.push(`/news/detail/${id}`);
        }
    }

    public render() {
        return (
            <div style={{width: '60%', margin: '120px auto'}}>
                {
                    store.postList.map((item) => (
                        <div onClick={this.clickDetail(item.post_id)} className={style.pricingBoxItem}>
                            <div className={style.pricingHeading}>
                                <img src={item.img}/>
                            </div>
                            <div className={style.pricingContainer}>
                                <h1>{item.title}</h1>
                                <i>{moment(parseInt(item.gmt_create) * 1000).format('YYYY-MM-DD')}</i>
                                <p className={style.context}>{item.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

