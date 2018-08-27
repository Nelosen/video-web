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
                                            path='/user'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/user')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/business'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/business')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/business/detail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/business/detail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/about'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/about')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/about/detail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/about/detail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/productDetail/:id'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/productDetail')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/contact'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/contact')}/>}
                                        />
                                        <Route
                                            exact={true}
                                            path='/'
                                            render={props => <LazyLoad {...props}
                                                                       component={System.import('./module/home')}/>}
                                        />
                                    </Content>
                                    <Footer style={{textAlign: 'center',background:'#060a1b',color:'#777',fontSize:12}}>
                                        Copyright © 2017-2018 广锦商务，苏ICP备18027413号-2 All Rights Reserved
                                    </Footer>
                                </Layout>
                            </Switch>
                    </Router>
                }

            </div>
        );
    }
}

