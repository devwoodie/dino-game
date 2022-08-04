window.addEventListener('load',() => {
    //실행
    startFrame();
})

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//공룡 그리기
var dino = {
    x : 250,
    y : 715,
    width : 70,
    height : 130,
    draw(){
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImg, this.x, this.y, 100, 130);
    }
};

//장애물 그리기
class Obstacle{
    constructor() {
        this.x = 900;
        this.y = 715;
        this.width = 50;
        this.height = 130;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(obtImg, this.x, this.y, 60, 130);
    }
};

//구름 그리기
class Cloud{
    constructor() {
        this.x = 1300;
        this.y = 100;
        this.width = 130;
        this.height = 80;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cldImg, this.x, this.y, 130, 130);
    }
};

var dinoImg = new Image();
dinoImg.src = 'common/img/dino_img.png';
var obtImg = new Image();
obtImg.src = 'common/img/obt_img.png';
var cldImg = new Image();
cldImg.src = 'common/img/cloud_img.png';

var timer = 0;
var obstacleAll = [];
var cloudAll = [];
var randomAll = [];
var jumpTimer = 0;
var animation;
var score = 0;
var abScore = 0;
const elAbScore = document.querySelector('.abscore i');

//프레임마다 실행 할 함수
function startFrame(){
    animation = requestAnimationFrame(startFrame);

    timer++;
    //canvas del
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //구름 그리기
    if(timer % 230 === 0){
        var cloud = new Cloud();
        var randomNum = Math.random() * 200;
        var randomNumFloor = Math.floor(randomNum);
        randomAll.push(randomNumFloor);
        var last = randomAll[randomAll.length - 1];
        cloud.y = last;
        cloudAll.push(cloud);
    }
    cloudAll.forEach((cloudDraw, i, o) => {
        //x좌표가 0 미만이면 제거
        if(cloudDraw.x < 0){
            o.splice(i, 1);
        };
        //구름 실행
        cloudDraw.x -= 3;
        cloudDraw.draw();
    });
    //장애물 그리기
    if(timer % 150 === 0){
        var obstacle = new Obstacle();
        obstacleAll.push(obstacle);
    }
    obstacleAll.forEach((obtDraw, i, o) => {
        //x좌표가 0 미만이면 제거
        if(obtDraw.x < 225){
            o.splice(i, 1);
        };
        //장애물 실행
        obtDraw.x -= 7;
        crash(dino, obtDraw);
        obtDraw.draw();
    });
    if(jumping == true){
        dino.y -= 15 ;
        jumpTimer++;
    };
    if(jumping == false){
        if(dino.y < 715){
            dino.y += 15 ;
        }
    };
    if(jumpTimer > 20){
        jumping = false;
        jumpTimer = 0;
    };
    dino.draw();

    score = timer/90;
    abScore = Math.floor(score);
    elAbScore.innerHTML = abScore;
};


//충돌 확인
function crash(dino, obt){
    var xDiff = obt.x - (dino.x + dino.width);
    var yDiff = obt.y - (dino.y + dino.height);
    if(xDiff < 0 && yDiff < -10){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        document.querySelector('.popup-wrap').classList.add('active');
        document.querySelector('.score i').innerHTML = abScore;
    };
};

var jumping = false;
document.addEventListener('keydown',(e) => {
    if(e.code === 'Space'){
        jumping = true;
    };
});

// ready/go
setTimeout(() => {
    document.querySelector('.ready').style= 'display: none';
    document.querySelector('.go').style= 'display: block';
},2000);
setTimeout(() => {
    document.querySelector('.go').style= 'display: none';
},4000);

