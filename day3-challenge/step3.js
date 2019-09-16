const jsondata = [{
	"id": 1,
	"name": "Yong",
	"phone": "010-0000-0000",
	"type": "sk",
	"childnode": [{
		"id": 11,
		"name": "echo",
		"phone": "010-0000-1111",
		"type": "kt",
		"childnode": [{
				"id": 115,
				"name": "hary",
				"phone": "211-1111-0000",
				"type": "sk",
				"childnode": [{
					"id": 1159,
					"name": "pobi",
					"phone": "010-444-000",
					"type": "kt",
					"childnode": [{
							"id": 11592,
							"name": "cherry",
							"phone": "111-222-0000",
							"type": "lg",
							"childnode": []
						},
						{
							"id": 11595,
							"name": "solvin",
							"phone": "010-000-3333",
							"type": "sk",
							"childnode": []
						}
					]
				}]
			},
			{
				"id": 116,
				"name": "kim",
				"phone": "444-111-0200",
				"type": "kt",
				"childnode": [{
					"id": 1168,
					"name": "hani",
					"phone": "010-222-0000",
					"type": "sk",
					"childnode": [{
						"id": 11689,
						"name": "ho",
						"phone": "010-000-0000",
						"type": "kt",
						"childnode": [{
								"id": 116890,
								"name": "wonsuk",
								"phone": "010-000-0000",
								"type": "kt",
								"childnode": []
							},
							{
								"id": 1168901,
								"name": "chulsu",
								"phone": "010-0000-0000",
								"type": "sk",
								"childnode": []
							}
						]
					}]
				}]
			},
			{
				"id": 117,
				"name": "hong",
				"phone": "010-0000-0000",
				"type": "lg",
				"childnode": []
			}
		]
	}]
}];

/*
    customReduce : Array.prototype 을 이용하여 Array 객체에 customReduce 메서드를 생성한다.
    customReduce 는 (function, init, count) 를 인자로 받는데
    init 값을 입력하면 count = 0 부터 내장함수 f 을 수행하고,
    입력하지 않으면 count = 1, init = this[0] 으로 f 를 수행한다.
    f 함수에서는 리턴값을 init 으로 하여 다시 f 함수를 호출하고
    count 값이 limit 와 같아지면 init 을 리턴하고 종료한다. 
*/
Array.prototype.customReduce = function( func, init, count = 0 ) {
    if ( init == undefined ) {
        init = this[0];
        count = 1;
    }
    const limit = this.length, arr = this;
    const f = function( func, init, count ) {
        if ( count == limit )
            return init;
        return f( func, func(init, arr[count], count, arr), count+1 );
    }
    return f( func, init, count );
}

Array.prototype.customFilter =  function( func, list = [], count = 0 ) {
    if ( count == this.length )
        return list;
    if ( func(this[count]) )
        list.push(this[count]);
    return this.customFilter( func, list, count+1 );
}

Array.prototype.customForEach = function ( func, count = 0 ) {
    if ( count == this.length )
        return;
    func(this[count]);
    this.customForEach( func, count+1 );
}

Array.prototype.customMap = function ( func, list = [], count = 0 ) {
    if ( count == this.length )
        return list;
    list.push( func(this[count]) );
    return this.customMap( func, list, count+1 );
}

const getMatchedType = (json, T) => {
    let result = [];
    let name = "";
    const getName = (json, T) => json.customReduce((object, currentValue) => {
        if ( currentValue.type === T ) {
            name += `, ${currentValue.name}`;
            object.push(currentValue);
        }
        getName(currentValue.childnode, T);
        return object;
    }, result);

    getName(json, T);
    let str = `${T} 타입 데이터는 0개 입니다.`;
    if ( result.length != 0 )
        str = `${T} 타입 데이터는 총 ${result.length}개 이며${name} 이다`;
    console.log(str);
}

getMatchedType(jsondata, "sk");
getMatchedType(jsondata, "kt");

const list = [1, 2, 3, 4, 5];
const list2 = list.customFilter( value => value > 3);
console.log('------- Filter --------');
console.log(list2);

console.log('------- ForEach -------');
list.customForEach( value => process.stdout.write(`${value*2} `));
process.stdout.write('\n');

console.log('--------- Map ---------');
const list3 = list.customMap( value => value/2 );
console.log(list3);

// console.log('------- Reduce --------');
// list.customReduce( (a, b, c, d) => {
//     console.log(`${a} ${b} ${c} [${d}]`);
// } );
