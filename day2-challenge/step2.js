let que = [];

function printExecutionSequence() {
    process.stdout.write("\n실행 순서 : ");
    while ( que.length ) {
        process.stdout.write(que.shift());
        process.stdout.write(" > ");
    }
    process.stdout.write("종료");
}

const checkParam = (...param) => {
    for ( let i = 0; i < param.length; i++ )
        if ( isNaN(param[i]) || param[i] < 0 )
            return false;
    return true;
}

const getArea = (name, ...param) => {
    que.push(name);
    if ( !checkParam(...param) )            { return -1; }

    if ( name === 'circle' )                { return Circle(...param); }
    else if ( name === 'parallelogram' )    { return Paral(...param); }
    else if ( name === 'trapezoid' )        { return Trapezoid(...param); }
    else                                    { return -2; }

    function Circle(radius, pi = 3.14)      { return Math.pow(radius, 2) * pi; }
    function Paral(width, height)           { return width*height; }
    function Trapezoid(top, bot, heigth)    { return (top + bot)/2.0 * heigth; }
}

const getAreaAvg = (name, ...param) => {
    if ( param[0] > param[1] )
        [param[0], param[1]] = [param[1], param[0]];

    let sum = 0;
    for ( let i = param[0]; i <= param[1]; i++ ) {
        if ( getArea(name, i) >= 0 ) {
            sum += getArea(name, i);
        } else {
            Exception(getArea(name, i));
            return;
        }
    }
    console.log(sum / (param[1] - param[0] + 1));
}

const Exception = value => {
    if ( isNaN(value) )
        console.error("인자의 개수가 적거나 너무 많습니다.");
    else if ( value == -1 )
        console.error("타입 에러 : 길이 값이 올바르지 않습니다. 음이 아닌 정수를 입력해주세요.");
    else if ( value == -2 )
        console.error("'" + que[que.length-1] + "' 은 다각형 리스트에 없습니다.");
    else
        console.log(value);
}

Exception(getArea('circle', 10, 3.14));
Exception(getArea('parallelogram', 10, 15));
Exception(getArea('trapezoid', 10, 15, 12));
Exception(getArea('trapezoid', 10));
Exception(getArea('circle', 10, '문자'));
getAreaAvg('circle', 5, 11);
Exception(getArea('NonPolygon', 10, 3.14));
printExecutionSequence();