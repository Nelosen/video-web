import _ from 'lodash';

export interface RouteList {
    path?: string;
    description?: string;
    haveLeaf?: boolean;
    icon?: string;
    id: string;
    leaf?: RouteList[];
    name: string;
    pid?: string;
    sort?: number;
    state?: string;
    type?: number;
    component?: any;
}

export const routes: RouteList[] = [
    {
        path: '/user',
        description: '',
        haveLeaf: true,
        id: 'user',
        name: '个人中心',
        pid: '0',
        sort: 0,
        state: '',
        type: 0,
        component: null,
    }, {
        path: '/contact',
        description: '',
        haveLeaf: true,
        id: 'contact',
        name: '联系我们',
        pid: '0',
        sort: 0,
        state: '',
        type: 0,
        component: null,
    }, {
        path: '/about/:id',
        description: '',
        haveLeaf: true,
        id: 'about',
        name: '关于我们',
        pid: '0',
        sort: 0,
        state: '',
        type: 0,
        component: null,
    },
    {
        path: '/business',
        description: '',
        haveLeaf: false,
        id: 'business',
        name: '精品课程',
        pid: '0',
        sort: 0,
        state: '',
        leaf:[ {
            path: '/business/detail/:id',
            description: '新增',
            haveLeaf: false,
            icon: 'mobile',
            id: 'attrMgr-add',
            leaf: [],
            name: '新增',
            pid: 'business',
            sort: 0,
            state: '',
            type: 0,
            component: null
        }],
        type: 0,
        component: null,
    }, {
        path: '/',
        description: '',
        haveLeaf: true,
        id: 'home',
        name: '主页',
        pid: '0',
        sort: 0,
        state: '',
        type: 0,
        component: null,
    }
];

export const goto = (() => {
    const placeholder = new RegExp('(/:[^)]+)', 'g');
    const brackets = /\(\)/g;
    return (target: string, option = {}, passParam?) => {
        let _target = target;

        if (_.isEmpty(option) && _.includes(_target, '(/:')) {
            _target = _.replace(_target, placeholder, ``).replace(brackets, '');
        } else {
            _.forIn(option, (value, key) => {
                _target = _.replace(_target, `(/:${key})`, `/${value}`);
            });
        }
    };
})();



