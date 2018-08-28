import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {observer} from 'mobx-react';
import LazyLoad from './LazyLoad';
import {RouteList, routes} from './Routes';
import {SiderBar} from "./module/layout/sider";
import {uiStore} from "./UiStore";
import {Layout} from 'antd';

const {Header, Content, Footer} = Layout;

// const redirectUrl = process.env.REDIRECT_URL;


@observer
export default class App extends Component<any, any> {

    constructor() {
        super();
        this.CreateRoute(routes);
    }

    // 遍历生成所有路由和面包屑
    public CreateRoute = (routes: RouteList[]) => {
        for (const route of routes) {
            uiStore.BreadList.push(route);
            if (route.leaf) {
                const leafList = route.leaf;
                this.CreateRoute(leafList);
            }
        }
    };

    public render() {
        return (
            <div>
                {
                    <Router>
                        <Switch>
                                <Layout>
                                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                                        <div style={{ width: '60%',margin: '0 auto'}}>
                                            <SiderBar/>
                                        </div>
                                    </Header>
                                    <Content style={{padding: '0 50px', marginTop: 64}}>
                                        <Route
                                            exact={true}
                                            path='/back'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/back')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/class'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/class')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/class/detail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/class/detail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/news'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/news')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/news/detail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/news/detail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/productDetail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/productDetail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/login/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/login')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/home')}/>}
                                        />
                                    </Content>
                                    <Footer style={{textAlign: 'center',background:'#060a1b',color:'#777',fontSize:12}}>
                                        鄂ICP备14010830号-1 监督邮件:3464055169@qq.com ©right;2014-2018 未经书面授权禁止复制或建立镜像 站长统计
                                    </Footer>
                                </Layout>
                            </Switch>
                    </Router>
                }

            </div>
        );
    }
}

