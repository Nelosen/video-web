import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Carousel, Button} from 'antd';
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {store} from "./store";

@observer
export default class Home extends Component<any, any> {

    public render() {
        return (
            <div>
                <Banner/>
                <Testimonial {...this.props}/>
                <Footer/>
            </div>
        )
    }
}


@observer
export class Banner extends Component<any, any> {
    public render() {
        return (

            <div style={{width: '100%'}}>
                <Carousel className={style.banner} autoplay={false}>
                    <div>
                        <img src={require('./images/two.jpg')}/>
                    </div>
                    <div>
                        <img src={require('./images/one.jpg')}/>
                    </div>
                    <div>
                        <img src={require('./images/three.jpg')}/>
                    </div>
                </Carousel>
            </div>
        )
    }
}

@observer
export class Testimonial extends Component<any, any> {
    constructor() {
        super();
        store.load()
    }

    // 立即购买
    public onClick = (id) => {
        return () => {
            const redirectUrl = process.env.REDIRECT_URL;
            window.location.href = redirectUrl + "pay.html#/?id=" + id;
        }

    };

    public detailClick = (id) => {
        return() =>{
            this.props.history.push(`/class/detail/${id}`);
        }
    };

    public moreClick = () => {
        this.props.history.push(`/class`);
    };

    public render() {
        return (
            <div className={style.commonmid}>
                <div className={style.classTop}>
                    <p className={style.clThetitP}>
                        <span className={style.clThetit}>精品课程</span>
                    </p>
                </div>
                {
                    store.list.map((item) => (
                        <div className={style.homeBoxItem}>
                            <div className={style.homeHeading}>
                                <img src={item.img}/>
                            </div>
                            <h1>{item.title}</h1>
                            <p>骑牛摆渡
                                <a style={{color:'red',marginLeft:10}} onClick={this.detailClick(item.item_id)}>查看详情</a>
                                <Button style={{background:'red',marginLeft:10,color:'#fff'}}  onClick={this.moreClick}>更多课程</Button>
                            </p>
                        </div>
                    ))
                }
            </div>
        )
    }
}


