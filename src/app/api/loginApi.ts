import {Observable as ObservableType} from "rxjs/Observable"
import {COLLECTION_FORMATS} from './Base'
import {createFetchWithStream} from 'util/createFetchWithStream'
import {IBanner} from "dto/Banner";

export interface ILogin {
    username?: number;
    password?: string;
}

export interface Iregister {
    biz_id: number
    username?: number;
    password?: string;
    nickname?: number;
    email?: string;
    mobile?: number;
}

export interface Ilogin {
    biz_id: number
    username?: number;
    password?: string;
}

export interface Ipay {
    biz_id: number
    item_id?: number;
    remark?: string;
}

export class LoginApi {
    private base = `${COLLECTION_FORMATS.api}/user`;
    private base1 = `${COLLECTION_FORMATS.api}/item`;
    private base2 = `${COLLECTION_FORMATS.api}/pay`;

    public list = (params: { model }, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base1}/list`,
                    method: 'get',
                    params: params.model
                },
                ...option
            }
        );
    };

    public detail = (params: { model }, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base1}/detail`,
                    method: 'get',
                    params: params.model
                },
                ...option
            }
        );
    };

    public userInfo = (params: { model }, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base}/user_info`,
                    method: 'get',
                    params: params.model
                },
                ...option
            }
        );
    };

    public register = (params: { data: Iregister }, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base}/register`,
                    method: 'post',
                    data: params.data
                },
                ...option
            }
        );
    };

    public submit_buy = (params: { data: Ipay }, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base2}/submit_buy`,
                    method: 'post',
                    data: params.data
                },
                ...option
            }
        );
    };

    public login = (params: { data: Ilogin }, option = {}): ObservableType<any> => {
        return createFetchWithStream<{
            rows: IBanner[],
            total: number,
            page: number
        }>(
            {
                ...{
                    url: `${this.base}/login`,
                    method: 'post',
                    data: params.data
                },
                ...option
            }
        );
    };

    public account = (params: { model }, option = {}): ObservableType<any> => {
        return createFetchWithStream<{
            rows: IBanner[],
            total: number,
            page: number
        }>(
            {
                ...{
                    url: `${this.base}/account`,
                    method: 'get',
                    params: params.model
                },
                ...option
            }
        );
    };

}
