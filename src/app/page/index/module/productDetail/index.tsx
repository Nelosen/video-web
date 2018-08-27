import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from "./style.pcss";
import {Footer} from 'component/footer'
import {Row, Col} from 'antd';

@observer
export default class About extends Component<any, any> {

    public componentWillMount(){
    }

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
                        <div>
                            <header className={style.pageHeader}>
                                <h1 className={style.pageTitle}>About us</h1>
                            </header>
                            <h3>公司简介</h3>
                            <p>
                                <img src={require('./images/about.jpg')} alt="" className={style.pullRight}
                                     width="300"/>
                                广锦商务人员全部为行业精英人员,是著名的社会事务调查服务机构，手续完备，实力雄厚，从业经验丰富，由各界精英组成强大专业的市场调查团队。
                                公司经过多年的运作和社会各界大力支持协作以及公司全体员工的不懈努力，业务覆盖全国大部分主要城市知名调查中心，公司最大的优势是：</p>
                            <p>强大的专业市场调查团队，由各界精英组成，他们具备严格的职业操守和道德规范使我们具备了高效、精准、高挑战性的专业市场调查技能和客观、正义的职业操守，应对各种突发事件的超常能力最大限度满足客户的要求，维护客户的合法权益。 </p>
                            <h3>公司理念</h3>
                            <p>公司诚实守信，服务全国。公司为委托调查设立了硬性标准和工作要求。遵循原则是：事实说明一切，证据决定输赢，法律维护权益。职业操守是：受人之托，忠人之事。执行到位，遵纪守法。</p>
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={{span: 24}} sm={{span: 24}} xl={{span: 8}}>
                        <div className={style.panel}>
                            <h4>业务与服务</h4>
                            <ul className={style.listUnstyled}>
                                <li><a href="">营销咨询服务</a><br/>
                                    <span>市场调查与营销体系诊断、内外部营销环境分析、营销战略规划、营销策略体系设计、渠道规划与管理、产品组合与定价策略制定等</span>
                                </li>
                                <li><a href="">品牌咨询服务</a><br/>
                                    <span>行业分析和市场研究、品牌诊断和综合测评、品牌战略规划和制定（品牌定位 、品牌核心价值、品牌表现）、品牌形象设计等</span>
                                </li>
                                <li><a href="">精益生产管理咨询</a><br/>
                                    <span>企业生产/服务水平综合调研诊断、5S/6S/7S现场改善咨询、TPM(全员生产保全）咨询、VSM(价值流图）咨询、SMED(快速换模..</span>
                                </li>
                                <li><a href="">战略咨询</a><br/>
                                    <span>为客户提供战略分析、战略选择、盈利模式设计、战略规划、战略保障体系设计、战略执行、战略评估、战略管理培训、细分的战略专题研究、战略突破行动、年度行动计划等服务，并致力于把战略管理的理念、知识、方法和工具传递给客户，促使客户内生相应的知识和能力。</span>
                                </li>

                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

