class URL {
    constructor(url) {
        this.absoluteString = url.replace(/\/$/, "");
        this.getScheme();
        this.pathComponents = this.getPathComponents();
    }
    getScheme() {
        return this.absoluteString.match(/^http[s]?/g) ? this.absoluteString.match(/^https?/g)[0] : (() => { this.absoluteString = `https://${this.absoluteString}`; return "https" })();
    }
    getUser() {
        return this.absoluteString.match(/(?<=http[s]?:\/\/).*(?=:.*@)/g) ? this.absoluteString.match(/(?<=http[s]?:\/\/).*(?=:.*@)/g)[0] : null;
    }
    getPassword() {
        return this.absoluteString.match(/(?<=:)[^\/]*(?=@)/g) ? this.absoluteString.match(/(?<=:)[^\/]*(?=@)/g)[0] : null;
    }
    getPathComponents() {
        try {
            let components = this.absoluteString.match(/(?<=\/)\w+/g);
            components[0] = '/';
            return components;
        } catch {
            return ['/'];
        }
    }
    getLastCompenent() {
        const com = this.getPathComponents();
        return com[com.length-1];
    }
    getHost() {
        if ( this.absoluteString.match(/@/g) )
            return this.absoluteString.match(/(?<=@)[^:\/]*/g)[0];
        else
            return this.absoluteString.match(/(?<=http[s]?:\/\/)[^:\/]*/g)[0];
    }
    getPort() {
        return this.absoluteString.match(/(?<=:)\d+(?=\/?)/g) ? this.absoluteString.match(/(?<=:)\d+(?=\/?)/g)[0] : (this.scheme == "https" ? 443 : 80);
    }
    getQuery() {
        return this.absoluteString.match(/(?<=\?).*/g) ? this.absoluteString.match(/(?<=\?).*/g)[0] : null;
    }
    appendPathComponent(path) {
        this.pathComponents.push(path);
        this.update();
    }
    deleteLastPathComponent() {
        if ( this.pathComponents.length > 1 )
            this.pathComponents.pop();
        this.update();
    }
    PathString() {
        let str = "";
        for ( let i = 1; i < this.pathComponents.length; i++ )
            str += `/${this.pathComponents[i]}`;
        return str;
    }
    update() {
        this.absoluteString = `${this.getScheme()}://${this.getUser() ? this.getUser()+":"+this.getPassword()+"@" : ""}${this.getHost()}${this.getPort() ? ":"+this.getPort() : ""}${this.PathString()}${this.getQuery() ? "?"+this.getQuery() : ""}`;
    }
    isEqual(URL) {
        if ( this.getScheme() == URL.getScheme() && this.getHost() == URL.getHost() && this.getPort() == URL.getPort() ) {
            if ( this.getPassword() == URL.getPassword() ) {
                if ( this.getUser() == URL.getUser() && this.PathString() == URL.PathString() ) {
                    if ( this.getQuery() == URL.getQuery() )
                        return 4;
                    return 3;
                }
                return 2;
            }
            return 1;
        }
        return 5;
    }
}

// var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");

// var naverurl = new URL("http://m.naver.com");
// console.log(zumurl.isEqual(naverurl));

// var url1 = new URL("http://admin@zum.com/#!/home?query=zum");
// console.log(zumurl.isEqual(url1));

// var url2 = new URL("http://admin@zum.com/#!/home");
// console.log(zumurl.isEqual(url2));

// var url3 = new URL("http://admin@zum.com/?param=zum");
// console.log(zumurl.isEqual(url3));

// var url4 = new URL("http://zum.com/#!/home");
// console.log(zumurl.isEqual(url4));

// const url = new URL("localhost");
// const url = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12");
// url.appendPathComponent("basecamp");
// console.log(url.absoluteString);
// url.appendPathComponent("camp");
// console.log(url.absoluteString);
// url.deleteLastPathComponent();
// console.log(url.absoluteString);

module.exports = URL;