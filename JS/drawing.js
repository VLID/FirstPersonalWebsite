var canvas = document.getElementById('canvas'),
    clearCanvas = document.getElementById('clearCanvas'),
    ctx = canvas.getContext('2d');

function getCorrectCoors(mouse){
    var x = mouse.offsetX;
        y = mouse.offsetY;

    return {
        x: x, 
        y: y
    };
}

var radius,
    opacity,
    dragging = false;

canvas.width = (window.innerWidth) - 230;
canvas.height = (window.innerHeight);

ctx.lineWidth = 2 * radius;

function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}

function dragT(mouse) {
    mouseStartLocation = getCorrectCoors(mouse);
    dragging = true;
    var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if(shape == "circle"){
        takeSnapshot();
    }
    if(shape == "rectangle"){
        takeSnapshot();
    }  
}

function dragF() {
    dragging = false;
    ctx.beginPath();
    ctx_push();
}

canvas.addEventListener('mousedown', dragT);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', dragF);
clearCanvas.addEventListener('click', eraseCanvas);

function drawFreeLine(position) {
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
}

function drawEllipse(position){
    var r = Math.sqrt(Math.pow((mouseStartLocation.x - position.x), 2) + Math.pow((mouseStartLocation.y - position.y), 2));
    ctx.beginPath();
    ctx.arc(mouseStartLocation.x, mouseStartLocation.y, r, 0, Math.PI*2);
    if (fillBox.checked) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawRect(position) {
    ctx.beginPath();
    ctx.rect(mouseStartLocation.x, mouseStartLocation.y, (position.x - mouseStartLocation.x), (position.y - mouseStartLocation.y));
    if (fillBox.checked) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function draw(mouse) {
    var position,
        fillBox = document.getElementById("fillbox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if(dragging){
        position = getCorrectCoors(mouse);
        if(shape == "line"){
            drawFreeLine(position);
        }

        if(shape == "circle"){
            restoreSnapshot();
            drawEllipse(position);
        }

        if(shape == "rectangle"){
            restoreSnapshot();
            drawRect(position);
        }
    }
}

function eraseCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setRadius(newRadius){
    if(newRadius < minRad){
        newRadius = minRad;
    }else if (newRadius > maxRad) {
        newRadius = maxRad;
    }
    radius = newRadius;
    ctx.lineWidth = 2 * radius;

    radSpan.innerHTML = radius;
}

var minRad = 1,
    maxRad = 50,
    defaultRad = 5,
    radChangeBy = 1;
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

decRad.addEventListener('click', function(){
    setRadius(radius - radChangeBy);
})

incRad.addEventListener('click', function(){
    setRadius(radius + radChangeBy);
})

setRadius(defaultRad);

var colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', '#90ED00', '#F74976', '#3CF7E5', '#E02FAB','#47C1F7'];

for (var i = 0, n = colors.length; i < n; i++) {
    var colorBoard = document.createElement('div');
    colorBoard.className = 'colorBoard';
    colorBoard.style.backgroundColor = colors[i];
    colorBoard.addEventListener('click', setColorBoard);
    document.getElementById('colors').appendChild(colorBoard);
}

function setColor(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    var current = document.getElementsByClassName('current')[0];
    if(current){
        current.className = 'colorBoard';
    }
}

function setColorBoard(mouse) {
    var colorBoard = mouse.target;
    setColor(colorBoard.style.backgroundColor);
    colorBoard.className += ' current';
}

setColorBoard({
    target: document.getElementsByClassName('colorBoard')[0]
});

function setOpacity(newOpacity){
    if(newOpacity < minOpa){
        newOpacity = minOpa;
    }else if (newOpacity > maxOpa) {
        newOpacity = maxOpa;
    }
    opacity = newOpacity;
    ctx.globalAlpha = opacity/100;

    opaSpan.innerHTML = opacity + "%";
}

var minOpa = 5,
    maxOpa = 100,
    defaultOpa = 100,
    opaChangeBy = 5;
    opaSpan = document.getElementById('opaval'),
    decOpa = document.getElementById('decopa'),
    incOpa = document.getElementById('incopa');

decOpa.addEventListener('click', function(){
    setOpacity(opacity - opaChangeBy);
})

incOpa.addEventListener('click', function(){
    setOpacity(opacity + opaChangeBy);
})

setOpacity(defaultOpa);

























