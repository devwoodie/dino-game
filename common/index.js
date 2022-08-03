var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//공룡 그리기
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

//장애물 그리기
class Obstacle{
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

var timer = 0;
var obstacleAll = [];

//프레임마다 실행 할 함수
function startFrame(){
    requestAnimationFrame(startFrame);
    timer++;
    //canvas del
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //장애물 그리기
    if(timer % 120 === 0){
        var obstacle = new Obstacle();

        obstacleAll.push(obstacle);
    }
    obstacleAll.forEach((obtDraw) => {
        obtDraw.x--;
        obtDraw.draw();
    });
    dino.draw();
};
//실행
startFrame();