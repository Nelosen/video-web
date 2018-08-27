import * as React from 'react';
import {observer} from 'mobx-react';
import * as style from  './style.pcss'

@observer
export class Footer extends React.Component<any, any> {
    public render() {

        return (
            <div className={style.kcommWid}>
                <div className={style.footernUpart}>
                    <div className={style.commWid}>
                        <div className={style.nftblock}>
                            <ul>
                                <li className={style.abpTit}>关于我们</li>
                                <li className={style.awra}>
                                    <li className={style.awra}><a href="">用户注册协议</a></li>
                                </li>
                            </ul>
                        </div>
                        <div className={style.nsplitLine}></div>
                        <div className={style.nftb}>
                            <ul>
                                <li className={style.abpTit}>联系我们</li>
                                <li className={style.awra}>客服热线</li>
                                <li className={style.aline}>18148585548</li>
                                <li className={style.awra}>在线咨询</li>
                                <li className={style.awra}>QQ:2640074370(09:00-17:30)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
