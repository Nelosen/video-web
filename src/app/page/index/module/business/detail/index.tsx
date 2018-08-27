import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {Button} from 'antd';
import {store} from './store'


@observer
export default class About extends Component<any, any> {

    public componentWillMount() {

        if (this.props.match.params.id !== 0) {
            store.changeFlag(true)
        }
        store.changeId(this.props.match.params.id);
        store.getDetail(this.props.match.params.id).subscribe(data => {
            store.detailList = data.data

        })
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

// @observer
// export class CommonBanner extends Component<any, any> {
//
//     public render() {
//         return (
//             <div style={{width: "100%"}}>
//                 <img src={require('./images/banner.jpg')} style={{width: "100%", height: '200px'}}/>
//             </div>
//         )
//     }
//
// }

@observer
export class Left extends Component<any, any> {

    public buy = (id) => {
        return () => {
            const redirectUrl = process.env.REDIRECT_URL;
            store.isUserInfo().subscribe(data => {
                if (data.success) {
                    window.location.href = redirectUrl + "pay.html#/?id=" + id;
                } else {
                    this.props.history.push(`/user`);
                }
            });
        }
    }

    public render() {
        return (
            <div style={{width: '60%', margin: '150px auto'}}>
                <div className={style.pricingBoxItem}>
                    <div className={style.pricingHeading}>
                        <img src={store.detailList.img}/>
                    </div>
                    <div className={style.pricingContainer}>
                        <h1>{store.detailList.title}</h1>
                        <p style={{fontSize: 16}} className={style.context}>课程介绍:{store.detailList.biz_custom_desc}</p>
                        <br/>
                        <p><span
                            style={{width: 200, fontSize: 20, color: '#656565', display: 'inline-block'}}>讲师:骑牛摆渡</span><span
                            style={{fontSize: 20, color: '#656565'}}>频次:5</span></p>
                        <br/>
                        <p><span style={{
                            width: 200,
                            fontSize: 20,
                            color: '#656565',
                            display: 'inline-block'
                        }}>周期:1</span><span style={{fontSize: 20, color: '#656565'}}>课时:5</span></p>
                        <br/>
                        <p style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'red'
                        }}>{store.detailList.price / 100}元/季度</p>
                        <br/>
                        <Button type={'primary'} onClick={this.buy(store.id)}>立即购买</Button>
                    </div>
                </div>
            </div>


        )
    }
}

