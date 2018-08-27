const path = require('path');
const fs = require('fs');
const root = path.join(__dirname, '../', '/');

const base = path.join(root, 'src/app');
const pagePath = path.join(base, 'page');

function createEntry() {

    let entry = {};
    let template = {};

    fs.readdirSync(pagePath).forEach(create);

    return {
        entry,
        template
    }

    function create(file) {
        if (fs.lstatSync(path.join(pagePath, file)).isDirectory() && fs.existsSync(path.join(pagePath, file, 'index.tsx'))) {
            entry[file] = path.join(base, `page/${file}/index.tsx`);
            template[file] = path.join(base, `page/${file}/index.hbs`);
        }
    }
}

module.exports = createEntry();
