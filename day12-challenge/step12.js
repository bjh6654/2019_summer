const Canvas = require('canvas')
, canvas = new Canvas.createCanvas(600, 400)
, context = canvas.getContext('2d')
, fs = require('fs')
, out = fs.createWriteStream(__dirname + '/newfile.png')
, stream = canvas.createPNGStream();

// set CanvasColor to 'green'
setCanvas();
// 'white circle'
drawCircle(100, 100, 60, "white");
// 'black pie'
drawCircle(100, 100, 60, "#210B61", Math.PI * (-0.1), Math.PI * (0.2));
// 'black small-cicle'
drawCircle(140, 75, 5, "black");
// 'left leg'
drawLine(80, 280, 60, 350, 5);
// 'right leg'
drawLine(120, 280, 140, 350, 5, "dotted");
// 'grd square'
let grd = context.createLinearGradient(40, 160, 40, 280);
grd.addColorStop(0, "yellow");
grd.addColorStop(1, "red");
drawSquare(40, 160, 120, 120, "white", grd);
// message
drawText(200, 130, "blablaaaa", -330);
// arrow
drawArrow(350, 60, 30, 120, 60);
// load image and save
loadImage('ai.jpg');


function setCanvas() {
    context.save();
    context.fillStyle = "green";
    context.fillRect(0,0,600,400);
    context.restore();
}

function loadImage(file) {
    fs.readFile(file, (err, data) => {
        if ( !err ) {
            new Promise( (resolve) => {
                let img = new Canvas.Image;
                img.src = data;
                resolve(img);
            } ).then( (img) => {
                printImage(350, 160, 120, img);
            } )
        }
    })
}

function printImage(x, y, len, img) {
    drawSquare(x, y, len, len, "white");
    const size = resizeImage(img.width, img.height, len);
    context.drawImage(img, 0, 0, img.width, img.height,
                    x+(len-size.width)/2, y+(len-size.height)/2, size.width, size.height);
    stream.on('data', function(chunk){
        out.write(chunk);
    });
}

function drawText(x, y, text, angle = 0, size = 20, color = "black") {
    const len = context.measureText(text).width;
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI/180 * angle);
    context.fillStyle = color;
    context.font = `${size}px serif`;
    context.fillText(text, -len/2, 0);
    context.restore();
}

function drawSquare(sx, sy, width, height, color = "white", grd) {
    context.save();
    if ( grd )
        context.fillStyle = grd;
    else
        context.fillStyle = color;
    context.fillRect(sx, sy, width, height);
    context.restore();
}

function drawLine(sx, sy, ex, ey, width, type = "normal") {
    context.save();
    if ( type == "dotted" )
        context.setLineDash([8, 5]);
    context.moveTo(sx, sy);
    context.lineTo(ex, ey);
    context.lineWidth = width;
    context.stroke();
    context.restore();
}

function drawCircle(x, y, r, color, start = 0, angle = Math.PI * 2 ) {
    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x, y);
    context.arc(x, y, r, start, angle);
    context.fill();
    context.restore();
}

function resizeImage(width, height, size) {
    const value = size / Math.max(width, height);
    return { 'width' : width*value, 'height' : height*value };
}

function drawArrow(x, y, angle, width = 80, height = 60) {
    context.save();
    context.lineWidth = 1;
    context.translate(x, y);
    context.rotate(Math.PI/180 * angle);
    context.beginPath();
    context.fillStyle = "gray";
    context.moveTo(0, 0);
    context.lineTo(width*2/3, 0);
    context.lineTo(width*2/3, height * 1/3);
    context.lineTo(width, -height * 1/6);
    context.lineTo(width*2/3, -height * 2/3);
    context.lineTo(width*2/3, -height * 1/3);
    context.lineTo(0, -height * 1/3);
    context.lineTo(0, 0);
    context.stroke();
    context.closePath();
    context.fill();
    context.restore();
}