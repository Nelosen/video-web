if (process.env.NODE_ENV === 'development') {
    require('ts-node').register({
        compilerOptions: {
            "module": "commonjs"
        }
    });
}
require('reflect-metadata');
// require('./server');


export const COLLECTION_FORMATS = {
    csv: ',',
    tsv: '   ',
    ssv: ' ',
    pipes: '|',
    get api() {
        return '/huala';
    },
};
