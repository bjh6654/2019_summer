const readline = require('readline');
const moment = require('moment');
const R = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class repos {
    constructor(name) {
        this.name = name;
        this.work = [];
        this.staging = [];
        this.git = [];
    }
    new(file) {
        (this.work).push( { 'file' : file, 'touch' : 'Untracked' });
    }
    add(file) {
        (this.staging).push( {'file' : file, 'touch' : `${moment().format("YYYY-MM-DD HH:mm:ss")}`} );
        this.print(this.staging, "---Staging Area/");
    }
    commit() {
        this.staging.forEach( e => {
            this.git.push( {'file' : e.file, 'touch' : `${moment().format("YYYY-MM-DD HH:mm:ss")}`} )
            this.work.forEach( el => {
                if ( el.file == e.file )
                    el.touch = "Unmodified";
            } )
        });
        this.staging = [];
        this.print(this.git,"---Git Repository/");
    }
    getName() {
        return this.name;
    }
    print(directory, msg) {
        console.log(msg);
        directory.forEach(e => {
            console.log(`${e.file}  ${e.touch}`);
        });
    }
    printStatus() {
        this.print(this.work, "---Working Directory/");
        this.print(this.staging, "---Staging Area/");
        this.print(this.git, "---Git Repository/");
    }
}

this.repository = {};
this.currentRep;

R.prompt();
R.on('line', line => {
    const input = line.split(" ");
    const func = input[0];
    this[func](...input.splice(1));
    R.prompt();
});

this.init = (name) => {
    (this.repository)[name] = new repos(name);
    console.log(`create ${name} repository`);
}

this.status = (location = "cur", name = "total") => {
    if ( this.currentRep == undefined ) {
        if ( name == "total" )
            console.log(Object.keys(this.repository));
        else
            this.repository[name].printStatus();
    } else {
        this.repository[this.currentRep].printStatus();
    }
}

this.checkout = (name) => {
    this.currentRep = name;
    R.setPrompt(`/${name}/`);
}

this.new = (file) => {
    (this.repository)[this.currentRep].new(file);
}

this.add = (file) => {
    (this.repository)[this.currentRep].add(file);
} 

this.commit = () => {
    (this.repository)[this.currentRep].commit();
}