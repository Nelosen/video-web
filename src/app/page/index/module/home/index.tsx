import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Carousel} from 'antd';
import * as style from "./style.pcss";
import Team from './team'
import {Footer} from 'component/footer'

@observer
export default class Home extends Component<any, any> {
    public render() {
        return (
            <div>
                {/*<Ho/>*/}
                <Banner/>
                <Testimonial/>
                <Team />
                <Footer />
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
                    <div style={{position:"relative"}}>
                        <img src={require('./images/bg_header.jpg')}/>
                        <h1 className={style.bannertitle}>商务信息咨询</h1>
                    </div>
                    <div>
                        <img src={require('./images/bg_header.jpg')}/>
                    </div>
                </Carousel>
            </div>
        )
    }
}

@observer
export class Testimonial extends Component<any, any> {
    public render() {
        return (
            <div className={style.testimonial}>
                <h3>Client Testimonial</h3>
                <Carousel className={style.testimonialCar} autoplay={true}>
                    <div>
                        <img src={require('./images/bg_header.jpg')}/>
                    </div>
                    <div>
                        <img src={require('./images/one.jpg')}/>
                    </div>
                </Carousel>
            </div>
        )
    }
}


