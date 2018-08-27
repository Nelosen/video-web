import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Carousel, Button} from 'antd';
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {store} from "./store";


@observer
export default class Home extends Component<any, any> {

    public detailClick = () => {
        this.props.history.push(`/business`);
    };

    public moreClick = () => {
        this.props.history.push(`/business`);
    };

    public render() {
        return (
            <div>
                {/*<Ho/>*/}
                <Banner/>
                <Testimonial/>
                <Button onClick={this.detailClick}>查看详情</Button>
                <Button onClick={this.moreClick}>更多</Button>
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
                    <div >
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
            // this.props.history.push(`/business/detail/${id}`);
            const redirectUrl = process.env.REDIRECT_URL;
            window.location.href = redirectUrl + "pay.html#/?id=" + id;
        }

    }
    public render() {
        return (
            <div className={style.commonmid}>
                <div className={style.classTop}>
                    <p className={style.clThetitP} >
                        <span className={style.clThetit}>精品课程</span>
                    </p>
                </div>
                <div className={style.all}>
                    {
                        store.list.map((item) => (
                            <div  className={style.homeBoxItem}>
                                <div className={style.homeHeading}>
                                    <img src={item.img}/>
                                </div>
                                <h1>{item.title}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


