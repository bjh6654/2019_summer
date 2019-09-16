function pushStack(stack, e) {
    if ( !stack.length )
        stack.push(e);
    else
        if ( stack[stack.length-1] == '[' && e == ']' )
            stack.pop();
        else
            stack.push(e);
}

function pushString(stack, e) {
    if ( !stack.length )
        stack.push(e);
    else
        if ( stack[stack.length-1] == e )
            stack.pop();
        else
            stack.push(e);
}

function tokenizer(str) {
    let bracket = [];
    let strline = [];
    let result = [];
    const scope = [ '"', "'" ];
    let start = 0, len = 0;
    for ( let i = 0; i < str.length; i++ ) {
        if ( str[i] == ' ' && !strline.length ) {
            start++;
            continue;
        }
        if ( scope.includes(str[i]) )
            pushString(strline, str[i]);
        else if ( (str[i] == '[' || str[i] == ']') && !strline.length ) {
            if ( len != 0 )
                result.push(str.slice(start, start+len));
            result.push(str[i]);
            pushStack(bracket, str[i]);
            start = i+1;
            len = -1;
        } else if ( str[i] == ',' && !strline.length ) {
            if ( len != 0 ) 
                result.push(str.slice(start, start+len));
            start = i+1;
            len = -1;
        }
        len++;
    }
    
    let msg = "";
    if ( bracket.length ) {
        msg += "올바른 배열의 형태가 아닙니다.\n";
    }
    if ( strline.length ) {
        msg += "올바른 문자열의 형태가 아닙니다.\n";
    }
    if ( msg.length )
        throw msg;
    return result;
}

function lexer(str) {
    return str.reduce( (pre, cur) => {
        if ( cur == "[" )
            pre.push(`{ type : 'left', value : '[' }`);
        else if ( cur == "]" )
            pre.push(`{ type : 'right', value : ']' }`);
        else if ( cur.match(/^[\'\"'].*[\'\"']$/) )
            pre.push(`{ type : 'string', value : ${cur} }`);
        else if ( cur.match(/^[0-9]+\.?[0-9]*$/) )
            pre.push(`{ type : 'number', value : ${cur} }`);
        else if ( cur == "null" )
            pre.push(`{ type : 'NULL', value : "null" }`);
        return pre;
    }, [] );
}

function ArrayParser(str) {
    let msg;
    try {
        msg = lexer(tokenizer(str)).reduce( (pre, cur) => {
            const type = cur.match(/(?<=type\s?:\s?')\S*(?=',\s?value)/gi)[0];
            const value = cur.match(/(?<=value : ).*(?=\})/gi)[0];
            if ( type == 'left' )
                return pre + `{ "type": "array", "child": [`;
            else if ( type == 'right' )
                return pre.slice(0,-1) + "] },";
            else
                return pre + `{ "type": "${type}", "value": ${value}, "child": [] },`;
        }, "" ).slice(0,-1);
    } catch (e) {
        msg = e;
    } finally {
        return msg;
    }
}

// const str = "[1, [2,[3]],'hello world', null]";
// const errstr = "[[1,[2,[3],'hello world]]]";
// const result = ArrayParser(errstr);
// console.log(result);

module.exports = { tokenizer, lexer, ArrayParser };