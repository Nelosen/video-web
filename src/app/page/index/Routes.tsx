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
            path: '/login',
            description: '',
            haveLeaf: true,
            id: 'contact',
            name: '个人中心',
            pid: '0',
            sort: 0,
            state: '',
            type: 0,
            component: null,
        }, {
            path: '/news',
            description: '',
            haveLeaf: false,
            id: 'about',
            name: '实时动态',
            pid: '0',
            sort: 0,
            state: '',
        leaf:
            [{
                path: '/news/detail/:id',
                description: '新增',
                haveLeaf: false,
                icon: 'mobile',
                id: 'attrMgr-add',
                leaf: [],
                name: '新增',
                pid: 'about',
                sort: 0,
                state: '',
                type: 0,
                component: null
            }],
            type: 0,
            component: null,
        }, {
            path: '/back',
            description: '',
            haveLeaf: true,
            id: 'user',
            name: '战绩回顾',
            pid: '0',
            sort: 0,
            state: '',
            type: 0,
            component: null,
        },
        {
            path: '/class',
            description: '',
            haveLeaf: false,
            id: 'business',
            name: '精品课程',
            pid: '0',
            sort: 0,
            state: '',
            leaf:
                [{
                    path: '/class/detail/:id',
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
    ]
;

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



