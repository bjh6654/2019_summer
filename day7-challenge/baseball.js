var faultCount = 0;
var currentTry = 10;
var balls = [];
var body = document.body;
var form = document.createElement('form');
var numberInput = document.createElement('input');
numberInput.maxLength = 4;
var submitButton = document.createElement('button');
submitButton.textContent = '카운트';
var questionHeader = document.createElement('h1');
var resultDiv = document.createElement('div');
questionHeader.textContent = String("시도 횟수: " + currentTry);
body.insertAdjacentElement("afterbegin", form);
body.insertAdjacentElement("afterbegin", questionHeader);
form.insertAdjacentElement("afterbegin", submitButton);
form.insertAdjacentElement("afterbegin", numberInput);
form.insertAdjacentElement("afterend", resultDiv);
var GameResult = /** @class */ (function () {
    function GameResult(strike, ball) {
        this.strike = strike;
        this.ball = ball;
    }
    GameResult.prototype.display = function () {
        resultDiv.textContent = this.strike + " \uC2A4\uD2B8\uB77C\uC774\uD06C  " + this.ball + " \uBCFC \uC785\uB2C8\uB2E4.";
    };
    return GameResult;
}());
function matchBallCount(answer) {
    resultDiv.textContent = '볼';
    var resultPattern = answer.split('').map(function (item) {
        return parseInt(item, 10);
    });
    var strike = 0;
    var ball = 0;
    [0, 1, 2].forEach(function (index) {
        if (balls[index] === resultPattern[index]) {
            strike += 1;
        }
        else if (balls.indexOf(resultPattern[index]) > -1) {
            ball += 1;
        }
    });
    var result = new GameResult(strike, ball);
    result.display();
}
var Baseball = /** @class */ (function () {
    function Baseball(answer) {
        this.answer = answer;
    }
    Baseball.prototype.run = function () {
        if (this.answer === balls.join('')) {
            resultDiv.textContent = '홈런입니다!';
            makeNewGame();
        }
        else {
            faultCount++;
            if (faultCount > 10) {
                resultDiv.textContent = "\uAE30\uD68C\uB294 \uCD1D 10\uBC88\uC785\uB2C8\uB2E4. \uB2F5\uC740 " + balls + " \uC785\uB2C8\uB2E4.";
                makeNewGame();
            }
            else {
                matchBallCount(this.answer);
                numberInput.value = '';
                numberInput.focus();
                currentTry--;
                questionHeader.textContent = String("시도 횟수: " + currentTry);
            }
        }
    };
    return Baseball;
}());
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var answer = numberInput.value;
    var game = new Baseball(answer);
    game.run();
});
function makeNewGame() {
    faultCount = 0;
    currentTry = 10;
    var numberCandidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    balls = [1, 2, 3].map(function (index) {
        return numberCandidate.splice(Math.floor(Math.random() * (9 - index)), 1)[0];
    });
    numberInput.value = '';
    numberInput.focus();
}
