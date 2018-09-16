let canvas, vw, vh, mX, mY, ratio, length, cX, cY, deg;
canvas = document.querySelector('canvas');
vw = window.innerWidth;
vh = window.innerHeight;
canvas.width = vw;
canvas.height = vh;
mX = mY = cX = cY = 0;
length = 80;

let context = canvas.getContext('2d');

function Game() {

    this.update = () => {
        context.beginPath();
        context.arc(0, vh, 40, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
        context.beginPath();
        context.moveTo(0, vh);
        context.lineTo(cX, cY);
        context.lineWidth = 20;
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
    }
}

function Game2() {
    this.update = () => {
        context.beginPath();
        context.arc(vw, vh, 40, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
        context.beginPath();
        context.moveTo(vw, vh);
        context.lineTo(cX2, cY2);
        context.lineWidth = 20;
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
    }
}

function Bullet() {
    this.last = { x: cX, y: cY };
    this.width;
    this.x = cX;
    this.y = cY;
    this.padX = 3;
    this.padY = 3;
    this.color;
    this.init = () => {
        this.padX = mX / 100;
        this.padY = this.padX * ((vh - mY) / mX);
        this.color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    }
    this.move = () => {
        this.x += this.padX;
        this.y -= this.padY;
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 10;
        context.moveTo(this.last.x, this.last.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
        this.last.x = this.x;
        this.last.y = this.y;
    }
}

function Bullet2() {
    this.last = { x: cX2, y: cY2 };
    this.width;
    this.x = cX2;
    this.y = cY2;
    this.padX = 3;
    this.padY = 3;
    this.color;
    this.init = () => {
        this.padX = (vw - mX) / 100;
        this.padY = this.padX * ((vh - mY) / ((vw - mX)));
        this.color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    }
    this.move = () => {
        this.x -= this.padX;
        this.y -= this.padY;
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 10;
        context.moveTo(this.last.x, this.last.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
        this.last.x = this.x;
        this.last.y = this.y;
    }
}

let game1 = new Game(), game2 = new Game2();
let bullets = [];

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255, 255, 255, 0.05)';
    context.fillRect(0, 0, vw, vh);
    game2.update();
    game1.update();
    bullets.forEach(bullet => {
        bullet.move();
    });
}
let ratio2, cX2, cY2;
document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    ratio = Math.sqrt(Math.pow(vh - mY, 2) + Math.pow(mX, 2));
    ratio2 = Math.sqrt(Math.pow(vh - mY, 2) + Math.pow(vw - mX, 2));
    cX = (mX * length) / ratio;
    cY = vh - ((vh - mY) * length) / ratio;
    cX2 = vw - ((vw - mX) * length) / ratio2;
    cY2 = vh - (length * (vh - mY)) / ratio2;
    deg = Math.atan((vh - mY) / mX);
});

document.addEventListener('click', () => {
    let b = new Bullet();
    b.init();
    bullets.push(b);
    let b2 = new Bullet2();
    b2.init();
    bullets.push(b2);
});

let interval;

document.addEventListener('mousedown', () => {
    interval = setInterval(() => {
        let b = new Bullet();
        b.init();
        bullets.push(b);
        let b2 = new Bullet2();
        b2.init();
        bullets.push(b2);
    }, 50);
});

document.addEventListener('mouseup', () => {
    clearInterval(interval);
});

animate();