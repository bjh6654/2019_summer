const _ = require("lodash")
exports.Checker = class {
    constructor(msg) {
        this.msg = msg;
    }
    bindMembers(target) {
        const msg = this.msg;
        const includeMembers = this.includeMembers;
        function ourStudents(source) {
            return new Promise( (resolve, reject) => {
                //반드시 10밀리세컨드 지연실행되어야만 함
                setTimeout( function _() {
                    const bMember = includeMembers(source, target);
                    if (bMember) {
                        resolve(msg.ok.msg);
                    } else {
                        reject(new Error(`'${msg.fail.msg}' == '${msg.ok.msg}'`));
                    }
                }, 10);
            })
        }
        return ourStudents;
    }

    //lodash의 every 메서드를 활용해서 구현
    includeMembers(source, target) {
        return _.every(target, e => source.includes(e));
    }
}

exports.runner = function (generator, names, ourStudents) {
    let gen = generator(names, ourStudents);
    const v = gen.next().value;
    gen.next(v);
}
