import {observable, action} from "mobx";
import {RouteList} from "./Routes";

interface BreadItem {
    name: string;
    path: string
}

class UIStore {

    // 面包屑
    public BreadList: RouteList[] = [];
    // 路由
    public RouteList: RouteList[] = [];

    // 当前面包屑
    public CurrentBreadList: BreadItem[] = [];


    @observable
    public collapsed: boolean = false;
    @observable
    public selectedKeys: string = '';
    @observable
    public openKeys: string = '';

    public getMenuList() {
        const menu = sessionStorage.getItem('menu');
        return menu ? JSON.parse(menu) : []
    }

    @action
    public setCollapsed(value) {
        this.collapsed = value;
        this.openKeys = ''
    }

    @action
    public setSelectedKeys(value) {
        this.selectedKeys = value;
    }

    @action
    public setOpenKeys(value) {
        this.openKeys = value;
    }
}

export const uiStore = new UIStore();
