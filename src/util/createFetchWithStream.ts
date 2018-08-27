import * as Rx from 'rxjs/Rx'
import _ from 'lodash'
import {AxiosRequestConfig} from 'axios'
import {Arg} from './Arg'

export function createFetchWithStream<T>(option: AxiosRequestConfig = {}): Rx.Observable<T> {

    return Rx.Observable.ajax(axiosOptionFormat(option)).map(mapData)

}

export function axiosOptionFormat(option: AxiosRequestConfig): Rx.AjaxRequest {
    const res: Rx.AjaxRequest = {};
    res.url = Arg.url(option.url, option.params || {});
    res.method = option.method || 'get';
    if (option.headers) {
        res.headers = {
            ...option.headers,
            ...{'Content-Type': 'application/json'}
        }
    } else {
        res.headers = {'Content-Type': 'application/json'};
    }

    if (sessionStorage.getItem('Token')) {
        Object.assign(res.headers, {token: sessionStorage.getItem('Token')})
    }

    if (res.method === 'POST' || res.method === 'post' || res.method === 'PUT' || res.method === 'put') {
        res.body = option.data || {};
    }
    return res;

}

function mapData(res: any) {

    // const redirectUrl = process.env.REDIRECT_URL;

    if (res.status === '401') {
        // window.location.href = redirectUrl + '/login.html#/';
        // sessionStorage.clear();
        return null
    }

    if (_.isArray(res) || (res.hasOwnProperty('originalEvent') === false)) {
        return res as any;
    }

    const item = res.response;

    let data;

    if (item && item.success) {

        data = item;

        if (item.body && !_.isString(item.body)) {
            data = item.body;
        }
    } else {
        if (item.message) {

        }
        data = item as any;
    }
    return data;
}


