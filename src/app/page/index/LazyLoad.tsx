import React, {Component} from 'react'
import {Bread} from './module/layout/bread'
import {uiStore} from './UiStore'
import {RouteList} from './Routes'


// const redirectUrl = process.env.REDIRECT_URL;

export default class LazyLoad extends Component<any, any> {

    public component;

    public getPath = () => {
        const path = this.props.match.path;
        const routeItem = uiStore.BreadList.find((item: RouteList) => {
            return item.path === path
        });
        if (routeItem) {
            return routeItem;
        } else {
            return [] as any
        }
    };

    public getBread = (route: RouteList) => {
        uiStore.CurrentBreadList.push({name: route.name || '', path: route.path || ''});
        if (route.pid !== '0') {
            // 找到父route
            const id = route.pid;
            const parentRoute: any = uiStore.BreadList.find((item: RouteList) => {
                return item.id === id
            });
            this.getBread(parentRoute);
        }
    };

    constructor(props) {
        super(props);
        this.state = {loaded: false};
        uiStore.CurrentBreadList = [];
        const path: RouteList = this.getPath();
        this.getBread(path);
    }

    public setMenuOpen = () => {
        const path = this.props.match.path;
        uiStore.setOpenKeys(uiStore.CurrentBreadList.reverse()[0].path);
        uiStore.setSelectedKeys(path);
    }

    public componentDidMount() {
        this.loadComponent(this.props.component);
        this.setMenuOpen();
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.component !== this.props.component) {
            this.setState({loaded: false});
            this.loadComponent(nextProps.component);
        }
    }

    public loadComponent = (componentPromise) => {
        componentPromise.then((module) => {
            this.component = module.default;
            this.setState({loaded: true});
        });
    };

    public render() {
        const {loaded} = this.state;
        if (loaded === true) {
            return (
                <div className="main-page">
                    <Bread {...this.props}/>
                    <div className="main-page-component" style={{backgroundColor: '#ffffff'}}>
                        <this.component {...this.props} />
                    </div>
                </div>
            )
        } else {
            return (<div/>)
        }
    }
}


