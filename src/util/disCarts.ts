/***
 * szh 2017-11-15
 * 笛卡尔积实现
 */
import _ from 'lodash/fp'


export function  disCarts(data) {

    const toDisCarts = function (a: string[], b: string[]) {
        const ret: string[] = [];
        a.forEach(a => {
            b.forEach(b => {
                ret.push(a.concat(',').concat(b));
            })
        });

        return ret;
    };

    const length = data.length;

    if (length === 0) {
        return [];
    }

    if (length === 1) {
        return data[0]
    }

    if (length > 1) {

        let res = data[0];

        _.forEach(data.slice(1), (item) => {
            res = toDisCarts(res, item);
        });
        return res
    }
}





