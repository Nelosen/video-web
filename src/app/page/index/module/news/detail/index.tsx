import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
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


@observer
export class Left extends Component<any, any> {


    public render() {
        return (
            <div style={{width: '60%', margin: '150px auto'}}>
                <div className={style.pricingBoxItem}>
                    <div className={style.pricingHeading}>
                        <img src={store.detailList.img}/>
                    </div>
                    <div className={style.pricingContainer}>
                        <h1>{store.detailList.title}</h1>
                        <p style={{fontSize: 16}} className={style.context}>{store.detailList.content}</p>
                        <br/>
                    </div>
                </div>
            </div>


        )
    }
}

