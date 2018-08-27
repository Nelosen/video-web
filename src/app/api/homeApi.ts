import {Observable as ObservableType} from "rxjs/Observable"
import {COLLECTION_FORMATS} from './Base'
import {createFetchWithStream} from 'util/createFetchWithStream'
import {IBanner} from 'dto/Banner'

export class HomeApi {

    private base = `${COLLECTION_FORMATS.api}/home`;

    public getBannerList = (params: {model}, option = {}): ObservableType<any> => {
        return createFetchWithStream<{
            rows: IBanner[],
            total: number,
            page: number
        }>(
            {
                ...{
                    url: `${this.base}/list`,
                    method: 'get',
                    params: params.model
                },
                ...option
            }
        );
    };


    public save = (params: {data: IBanner}, option = {}): ObservableType<any> => {
        return createFetchWithStream<any>(
            {
                ...{
                    url: `${this.base}/save`,
                    method: 'post',
                    data: params
                },
                ...option
            }
        );
    };


}
