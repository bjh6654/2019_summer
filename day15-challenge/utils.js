const fs = require('fs');

function CONVERT(ARR, ARR2) {
    let json = {};
    Array.from(ARR).reduce( (pre, cur) => pre.add(cur.owner), new Set() ).forEach( e => {
        json[e] = { "print" : false, "idle" : [], "ready" : [], "complete" : [] };
    });
    Array.from(ARR2).reduce( (pre, cur) => pre.add(cur.owner), new Set() ).forEach( e => {
        json[e] = { "print" : false, "idle" : [], "ready" : [], "complete" : [] };
    });
    Array.from(ARR).forEach( e => {
        json[e.owner][e.state].push(e.name);
    } )
    Array.from(ARR2).forEach( e => {
        json[e.owner][e.state].push(e.name);
    } )
    return json;
}

function TO_STRING(data) {
    let str = "";
    for ( const key in data ) {
        str += `<div id="${key}">`
        str += `--- 고객명 : ${key} ---</br>`;
        str += "[ 대기중 ] : ";
        str += data[key]["idle"].reduce( (pre, cur) => `${pre} ${cur},`, "" ).slice(0, -1);
        str += "</br>[ 제작중 ] : ";
        str += data[key]["ready"].reduce( (pre, cur) => `${pre} ${cur},`, "" ).slice(0, -1);
        str += "</br>[  완료  ] : "
        str += data[key]["complete"].reduce( (pre, cur) => `${pre} ${cur},`, "" ).slice(0, -1);
        str += "</br></div>";
    }
    return str;
}

function TO_HTML(msg, msg2) { 
return `<!DOCTYPE html>
    <html lang="en"><head>
    <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DASH BOARD</title>
            </head>
            <body>
                <h1>주문 현황</h1>
                <div class="log">
                    ${TO_STRING(CONVERT(msg, msg2))}
                </div>
            </body>
    </html>`
}

module.exports = { 
    PRINT_TIME :  () => console.log(`[ ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ]`),
    
    WRITE_FILE : (filename, content, content2) => {
        fs.writeFile( filename, TO_HTML(content, content2), function(err) {
            if (err)
                throw err;
        });
    },

    GO_HOME : () => {
        console.log('--------------');
        console.log('｜           ｜');
        console.log('｜  Go Home  ｜');
        console.log('｜           ｜');
        console.log('--------------');
    }
}