const readline = require("readline");
const R = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

function gcd(a) {
	a.sort(function(a,b) { return b - a; });
	if ( a[1] == 0 )
		return a[0];
	return gcd([a[1], a[0] % a[1]]);
}

function multipleGcd(a) {
	var g = gcd([a[0], a[1]]);
	for ( var i = 2; i < a.length; i++ ) {
		g = gcd([g, a[i]]);
	}
	return g;
}

function checkIsNumber(a) {
	for ( var i = 0; i < a.length; i++ )
		if ( isNaN(a[i]) )
			return false;
	return true;
}

R.prompt();
R.on('line', (data)=>{
	var arr = (data).split(' ');
	if ( checkIsNumber(arr) ) {
		if ( arr.length < 2 ) {
			console.log("숫자를 2개 이상 입력해주세요.");
		} else {
			console.log("GCD : " + multipleGcd(arr));
			process.exit();
		}
	} else {
		console.log("숫자만 입력하세요.");
	}
});