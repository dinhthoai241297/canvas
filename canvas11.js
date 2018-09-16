const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, mX, mY, radians = 0, xx, yy, lengthGun, speedBullet, radiusBullet, score;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;
lengthGun = 100;
xx = vw / 2;
yy = vh - lengthGun;
speedBullet = 10;
radiusBullet = 10;
score = 0;

// Súng + ụ súng
function Game() {
    this.radius = 60;
    this.x = vw / 2;
    this.y = vh;
    this.drawGun = () => {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(xx, yy);
        context.lineWidth = 20;
        context.fillStyle = 'black';
        context.stroke();
        context.closePath();

        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
    }

}

// đạn bắn ra
function Bullet() {
    this.x;
    this.y;
    this.padX;
    this.padY;
    this.isOff;
    this.radius;

    this.init = () => {
        this.x = xx;
        this.y = yy;
        this.padX = speedBullet * Math.cos(radians);
        this.padX *= -1;
        this.padY = speedBullet * Math.sin(radians);
        this.isOff = false;
        this.radius = radiusBullet;
    }

    this.move = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
        this.x += this.padX;
        this.y -= this.padY;
        balls.forEach(ball => {
            this.check(ball.x, ball.y, ball.radius);
        });
        for (let i = 0; i < balls.length; i++) {
            if (!balls[i].isOver) {
                this.isOff = this.check(balls[i].x, balls[i].y, balls[i].radius);
                if (this.isOff) {
                    console.log(`%cScore: ${score += 100}`, 'color: #0014ff');
                    balls[i].setOver();
                    break;
                }
            }
        }
        this.isOff = this.x < 0 || this.x > vw || this.y < 0 ? true : this.isOff;
    }

    this.check = (x, y, radius) => Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius + radius;
}

// bóng mồi
function Ball() {

    this.x;
    this.y;
    this.radius;
    this.speed;
    this.isOff;
    this.isOver;
    this.ar = [];

    this.init = () => {
        this.radius = Math.random() * 40 + 20;
        this.x = -this.radius;
        this.y = Math.random() * (vh - lengthGun - this.radius - 100) + this.radius;
        this.speed = Math.random() * 7 + 3;
        this.isDestroy = false;
        this.isOff = false;
        this.isOver = false;
    }

    this.move = () => {
        if (this.isOver) {
            this.ofEffect();
        } else {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = 'black';
            context.fill();
            context.closePath();
            this.x += this.speed;
            if (this.x + this.radius > vw) {
                this.setOver();
            }
        }
    }

    this.setOver = () => {
        for (let i = 0; i < 15; i++) {
            let padX, padY, dX, dY;
            padX = Math.random() * 11 + 2;
            padY = Math.random() * 11 + 2;
            dX = Math.random() * 30 > 15 ? 1 : -1;
            dY = Math.random() * 30 > 15 ? 1 : -1;
            let l = new Ele(this.x, this.y, padX, padY, dX, dY);
            this.ar.push(l);
        }
        this.isOver = true;
        setTimeout(() => {
            this.isOff = true;
        }, 500);
    }

    this.ofEffect = () => {
        this.ar.forEach(ele => {
            ele.move();
        });
    }
}

// mảnh vỡ
function Ele(x, y, padX, padY, dX, dY) {
    this.x = x;
    this.y = y;
    this.padX = padX;
    this.padY = padY;
    this.dX = dX;
    this.dY = dY;
    this.radius = 5;

    this.move = () => {
        context.beginPath();
        context.arc(this.x += padX * this.dX, this.y += this.padY * this.dY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
    }
}

let g = new Game();
let bullets = [];
let balls = [];

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect(0, 0, vw, vh);
    g.drawGun();
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].isOff) {
            bullets.splice(i, 1);
        } else {
            bullets[i].move();
        }
    }
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].isOff) {
            balls.splice(i, 1);
        } else {
            balls[i].move();
        }
    }
}

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    radians = Math.atan((vh - mY) / (vw / 2 - mX));
    if (radians < 0) {
        radians = Math.PI + radians;
    }
    xx = vw / 2 - lengthGun * Math.cos(radians);
    yy = vh - lengthGun * Math.sin(radians);
});

document.addEventListener('click', () => {
    let b = new Bullet();
    b.init();
    bullets.push(b);
});

animate();

let t = 300;

function randomBall() {
    let b = new Ball(), t;
    b.init();
    balls.push(b);
    t = Math.random() * 2000 + 500;
    setTimeout(randomBall, t);
}

randomBall();