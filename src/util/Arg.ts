export class Arg {

    public static urlUseHash = false;
    public static hashQuerySeperator = "#?";
    public static querySeperator = "?";
    public static hashSeperator = "#";
    public static coerceMode = true;

    /**
     * Generates a URL with the given parameters.
     * (object) = A URL to the current page with the specified parameters.
     * (path, object) = A URL to the specified path, with the object of parameters.
     * (path, object, object) = A URL to the specified path with the first object as query parameters,
     * and the second object as hash parameters.
     */
    public static url = function (a?, b?, c?) {

        const sep = (Arg.urlUseHash ? Arg.hashQuerySeperator : Arg.querySeperator);
        const segs = [location.pathname, sep];
        let args = {};

        switch (arguments.length) {
            case 1: // Arg.url(params)
                segs.push(Arg.stringify(arguments[0]));
                break;
            case 2: // Arg.url(path, params)
                segs[0] = Arg._cleanPath(arguments[0]);
                args = Arg.parse(arguments[0]);
                args = Arg.merge(args, arguments[1]);
                segs.push(Arg.stringify(args));
                break;
            case 3: // Arg.url(path, query, hash)
                segs[0] = Arg._cleanPath(arguments[0]);
                segs[1] = Arg.querySeperator;
                segs.push(Arg.stringify(arguments[1]));
                (typeof(arguments[2]) === "string") ? segs.push(Arg.hashSeperator) : segs.push(Arg.hashQuerySeperator);
                segs.push(Arg.stringify(arguments[2]));
        }

        let s = segs.join("");

        // trim off sep if it's the last thing
        if (s.indexOf(sep) === s.length - sep.length) {
            s = s.substr(0, s.length - sep.length);
        }

        return s;
    }

    public static stringify = function (obj, keyPrefix?) {

        switch (typeof(obj)) {
            case "object":
                const segs: string[] = [];
                let thisKey;
                for (const key in obj) {

                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    const val = obj[key];

                    if (typeof(key) === "undefined" || key.length === 0 || typeof(val) === "undefined" || val === null || val.length === 0) {
                        continue;
                    }

                    thisKey = keyPrefix ? keyPrefix + "." + key : key;

                    if (typeof obj.length !== "undefined") {
                        thisKey = keyPrefix ? keyPrefix + "[" + key + "]" : key;
                    }

                    if (typeof val === "object") {
                        segs.push(Arg.stringify(val, thisKey));
                    } else {
                        segs.push(encodeURIComponent(thisKey) + "=" + encodeURIComponent(val));
                    }

                }
                return segs.join("&");
        }

        return encodeURIComponent(obj);

    };

    public static _cleanPath = function (p) {

        if (p.indexOf(Arg.querySeperator) > -1) {
            p = p.substr(0, p.indexOf(Arg.querySeperator));
        }

        if (p.indexOf(Arg.hashSeperator) > -1) {
            p = p.substr(0, p.indexOf(Arg.hashSeperator));
        }

        return p;
    };

    public static parse = function (s) {
        if (!s) {
            return {};
        }
        if (s.indexOf("=") === -1 && s.indexOf("&") === -1) {
            return {};
        }
        s = Arg._cleanParamStr(s);
        const obj = {};
        const pairs = s.split("&");
        for (const pi in pairs) {
            if (pairs.hasOwnProperty(pi)) {
                const kvsegs = pairs[pi].split("=");
                const key = decodeURIComponent(kvsegs[0]);
                const val = Arg.__decode(kvsegs[1]);
                Arg._access(obj, key, val);
            }
        }
        return obj;
    };

    public static _cleanParamStr = function (s) {

        if (s.indexOf(Arg.querySeperator) > -1) {
            s = s.split(Arg.querySeperator)[1];
        }

        if (s.indexOf(Arg.hashSeperator) > -1) {
            s = s.split(Arg.hashSeperator)[1];
        }

        if (s.indexOf("=") === -1 && s.indexOf("&") === -1) {
            return "";
        }

        while (s.indexOf(Arg.hashSeperator) === 0 || s.indexOf(Arg.querySeperator) === 0) {
            s = s.substr(1);
        }

        return s;
    };

    public static _access = function (obj, selector, value) {
        const shouldSet = typeof value !== "undefined";
        let selectorBreak = -1;
        const coerce_types = {
            'true': true,
            'false': false,
            'null': null
        };

        // selector could be a number if we're at a numerical index leaf in which case selector.search is not valid
        if (typeof selector === 'string' || Object.prototype.toString.call(selector) === '[object String]') {
            selectorBreak = selector.search(/[\.\[]/);
        }

        // No dot or array notation so we're at a leaf, set value
        if (selectorBreak === -1) {
            if (Arg.coerceMode) {
                value = value && !isNaN(value) ? +value              // number
                    : value === 'undefined' ? undefined           // undefined
                        : coerce_types[value] !== undefined ? coerce_types[value] // true, false, null
                            : value;                                    // string
            }
            return shouldSet ? (obj[selector] = value) : obj[selector];
        }

        // Example:
        // selector     = 'foo[0].bar.baz[2]'
        // currentRoot  = 'foo'
        // nextSelector = '0].bar.baz[2]' -> will be converted to '0.bar.baz[2]' in below switch statement
        const currentRoot = selector.substr(0, selectorBreak);
        let nextSelector = selector.substr(selectorBreak + 1);

        switch (selector.charAt(selectorBreak)) {
            case '[':
                // Intialize node as an array if we haven't visted it before
                obj[currentRoot] = obj[currentRoot] || [];
                nextSelector = nextSelector.replace(']', '');

                if (nextSelector.search(/[\.\[]/) === -1 && nextSelector.search(/^[0-9]+$/) > -1) {
                    nextSelector = parseInt(nextSelector, 10);
                }

                return Arg._access(obj[currentRoot], nextSelector, value);
            case '.':
                // Intialize node as an object if we haven't visted it before
                obj[currentRoot] = obj[currentRoot] || {};
                return Arg._access(obj[currentRoot], nextSelector, value);
        }

        return obj;
    };

    public static merge(a?, b?) {
        const all = {};
        for (const ai in arguments) {
            if (arguments.hasOwnProperty(ai)) {
                for (const k in arguments[ai]) {
                    if (arguments[ai].hasOwnProperty(k)) {
                        all[k] = arguments[ai][k];
                    }
                }
            }
        }
        return all;
    };

    public static __decode = function (s) {
        while (s && s.indexOf("+") > -1) {
            s = s.replace("+", " ");
        }
        s = decodeURIComponent(s);
        return s;
    };

}
