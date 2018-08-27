import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon} from 'antd'
import * as style from './style.pcss'
import {observer} from "mobx-react"
import { RouteList,routes } from '../../../Routes';
import {uiStore} from '../../../UiStore'


@observer
export class SiderBar extends Component<any, any> {

    public MenuClick = e => {
        uiStore.setSelectedKeys(e.key);
    };

    public openMenu = v => {
        uiStore.setOpenKeys(v[v.length - 1]);
    };
    public state = {
        collapsed: false,
    };

    public toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    public render() {

        return (
            <div className={style.side}>
                {/*<img style={{position:'absolute'}} src ={require('')}/>*/}
                <h1 style={{color:'#FFF',position:'absolute'}}>广锦商务</h1>
                {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
                    {/*<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
                {/*</Button>*/}
                <Menu
                    onClick={this.MenuClick}
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[uiStore.selectedKeys]}
                    onOpenChange={this.openMenu}
                    openKeys={[uiStore.openKeys]}
                    inlineCollapsed={this.state.collapsed}
                >


                    {
                        routes.map((route: RouteList, key) => {
                            return (
                                <Menu.Item key={route.path}>
                                    <Link to={route.path}>
                                        {route.icon ? <Icon type={route.icon}/> : null}
                                        <span className="nav-text">{route.name}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }

                </Menu>
            </div>
        )
    }
}
