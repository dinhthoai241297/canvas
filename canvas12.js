const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const MOVE_RANDOM = 'MOVE_RANDOM';
const GO_PDT = 'GO_PDT';
const PDT = 'PDT';

let vw, vh, mX, mY, radius, x, y, pixel, colorMain;
vw = window.innerWidth;
vh = window.innerHeight;
colorMain = '#FF530D';

canvas.width = vw;
canvas.height = vh;

pixel = 50;
radius = pixel / 10;
x = vw / 2 - pixel * 3;
y = vh / 2 - pixel * 2;

function Ball2(x, y, start, center, color = colorMain) {
    this.state = PDT;
    this.x = x;
    this.y = y;
    this.radians = start;
    this.center = center;
    this.invert = false;
    this.color = color;

    this.rX;
    this.rY;
    this.rPX;
    this.rPY;
    this.rDX;
    this.rDY;

    this.lX;
    this.lY;

    this.speed;

    this.initRan = () => {
        if (this.invert) {
            this.rX = this.lX = this.x + this.center * Math.sin(this.radians);
            this.rY = this.lY = this.y + this.center * Math.cos(this.radians);
        } else {
            this.rX = this.lX = this.x + this.center * Math.cos(this.radians);
            this.rY = this.lY = this.y + this.center * Math.sin(this.radians);
        }
        this.rPX = Math.random() * 3 + 1;
        this.rPY = Math.random() * 3 + 1;
        this.rDX = Math.random() * 30 > 15 ? 1 : -1;
        this.rDY = Math.random() * 30 > 15 ? 1 : -1;
    }

    this.move = () => {
        if (this.state === PDT) {
            this.movePDT();
        } else if (this.state === MOVE_RANDOM) {
            this.moveRan();
        } else {
            this.goHome();
        }
    }

    this.movePDT = () => {
        context.beginPath();
        if (this.invert) {
            context.arc(this.x + this.center * Math.sin(this.radians), this.y + this.center * Math.cos(this.radians), radius, 0, Math.PI * 2, false);
        } else {
            context.arc(this.x + this.center * Math.cos(this.radians), this.y + this.center * Math.sin(this.radians), radius, 0, Math.PI * 2, false);
        }
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        this.radians += 0.05;
    }

    this.moveRan = () => {
        let tmp = Math.sqrt(Math.pow(mX - this.rX, 2) + Math.pow(mY - this.rY, 2));
        context.beginPath();
        context.arc(this.rX, this.rY, tmp < 100 ? 50 - (tmp / 2) + radius : radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        if (this.rX + radius > vw || this.rX - radius < 0) {
            this.rDX *= -1;
        }
        if (this.rY + radius > vh || this.rY - radius < 0) {
            this.rDY *= -1;
        }
        this.rX += this.rPX * this.rDX;
        this.rY += this.rPY * this.rDY;
    }

    this.initGoHome = () => {
        let tmp = Math.sqrt(Math.pow(this.lX - this.rX, 2) + Math.pow(this.lY - this.rY, 2));
        let rad = Math.asin(Math.abs(this.lY - this.rY) / tmp);
        this.rDX = this.lX > this.rX ? 1 : -1;
        this.rDY = this.lY > this.rY ? 1 : -1;
        this.speed = tmp / 100;
        this.rPX = (tmp / 100) * Math.cos(rad);
        this.rPY = (tmp / 100) * Math.sin(rad);
    }

    this.goHome = () => {
        context.beginPath();
        context.arc(this.rX, this.rY, radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        this.rX += this.rPX * this.rDX;
        this.rY += this.rPY * this.rDY;
        if (Math.abs(this.rX - this.lX) < this.speed && Math.abs(this.rY - this.lY) < this.speed) {
            this.state = PDT;
        }
    }
}


function Ball(x, y, next, color = colorMain) {

    this.color;

    this.state = PDT;

    this.x = x;
    this.y = y;
    this.next = next;

    this.cX = this.x;
    this.cY = this.y;

    this.lX;
    this.lY;

    this.padX;
    this.padY;

    this.rX;
    this.rY;
    this.rPX;
    this.rPY;
    this.rDX;
    this.rDY;

    this.speed;

    this.init = () => {
        this.color = color;
        this.padX = (this.next.x - this.x) / pixel;
        this.padY = (this.next.y - this.y) / pixel;
        this.lX = this.x;
        this.lY = this.y;
    }

    this.initRan = () => {
        this.rX = this.x;
        this.rY = this.y;
        this.rPX = Math.random() * 3 + 1;
        this.rPY = Math.random() * 3 + 1;
        this.rDX = Math.random() * 30 > 15 ? 1 : -1;
        this.rDY = Math.random() * 30 > 15 ? 1 : -1;
    }

    this.initGoHome = () => {

    }

    this.move = () => {
        if (this.state === PDT) {
            this.movePDT();
        } else if (this.state === MOVE_RANDOM) {
            this.moveRan();
        } else {
            this.goHome();
        }
    }

    this.movePDT = () => {
        context.beginPath();
        context.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        this.connect()
    }

    this.connect = () => {
        context.beginPath();
        context.strokeStyle = this.color;
        // context.moveTo(this.lX, this.lY);
        context.moveTo(this.cX, this.cY);
        this.cX += this.padX;
        this.cY += this.padY
        // if (Math.abs(this.cX - this.next.x) < this.padX || Math.abs(this.cY - this.next.y) < this.padY) {
        //     this.cX = this.x;
        //     this.cY = this.y;
        // }
        context.lineTo(this.cX, this.cY);
        // context.lineTo(this.cX + this.padX, this.cY + this.padY);
        context.lineWidth = radius * 2;
        context.stroke();
        context.closePath();
        this.cX = this.cX === this.next.x ? this.x : this.cX;
        this.cY = this.cY === this.next.y ? this.y : this.cY;
        this.lX = this.cX;
        this.lY = this.cY
    }

    this.moveRan = () => {
        let tmp = Math.sqrt(Math.pow(mX - this.rX, 2) + Math.pow(mY - this.rY, 2));
        context.beginPath();
        context.arc(this.rX, this.rY,  tmp < 90 ? 30 - (tmp / 3) + radius : radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        if (this.rX + radius > vw || this.rX - radius < 0) {
            this.rDX *= -1;
        }
        if (this.rY + radius > vh || this.rY - radius < 0) {
            this.rDY *= -1;
        }
        this.rX += this.rPX * this.rDX;
        this.rY += this.rPY * this.rDY;
    }

    this.initGoHome = () => {
        let tmp = Math.sqrt(Math.pow(this.x - this.rX, 2) + Math.pow(this.y - this.rY, 2));
        let rad = Math.asin(Math.abs(this.y - this.rY) / tmp);
        this.rDX = this.x > this.rX ? 1 : -1;
        this.rDY = this.y > this.rY ? 1 : -1;
        this.speed = tmp / 100;
        this.rPX = (tmp / 100) * Math.cos(rad);
        this.rPY = (tmp / 100) * Math.sin(rad);
    }

    this.goHome = () => {
        context.beginPath();
        context.arc(this.rX, this.rY, radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        this.rX += this.rPX * this.rDX;
        this.rY += this.rPY * this.rDY;
        if (Math.abs(this.rX - this.x) < this.speed && Math.abs(this.y - this.y) < this.speed) {
            this.state = PDT;
        }
    }
}

// l1
let b4 = new Ball(x, y + pixel * 7);
let b3 = new Ball(x + pixel, y + pixel * 7, b4);
let b2 = new Ball(x + pixel, y, b3);
let b1 = new Ball(x, y, b2);
b4.next = b1;
b1.init();
b2.init();
b3.init();
b4.init();

// l2
let b8 = new Ball(x + pixel * 4, y + pixel * 5);
let b7 = new Ball(x + pixel * 5, y + pixel * 5, b8);
let b6 = new Ball(x + pixel * 5, y - pixel * 2, b7);
let b5 = new Ball(x + pixel * 4, y - pixel * 2, b6);
b8.next = b5;
b6.init();
b7.init();
b8.init();
b5.init();

// -1
let b12 = new Ball(x + pixel * 4, y - pixel * 2.5);
let b11 = new Ball(x + pixel * 5, y - pixel * 2.5, b12);
let b10 = new Ball(x + pixel * 5, y - pixel * 3, b11);
let b9 = new Ball(x + pixel * 4, y - pixel * 3, b10);
b12.next = b9;
b11.init();
b10.init();
b9.init();
b12.init();

// -2
let b16 = new Ball(x + pixel * 5, y - pixel * 2);
let b15 = new Ball(x + pixel * 6, y - pixel * 2, b16);
let b14 = new Ball(x + pixel * 6, y - pixel * 2.5, b15);
let b13 = new Ball(x + pixel * 5, y - pixel * 2.5, b14);
b16.next = b13;
b15.init();
b14.init();
b13.init();
b16.init();

let ar = [];
// center;
for (let i = 0; i < 3; i++) {
    for (let j = 1; j < 5; j++) {
        let b = new Ball2(x + pixel * 2.5, y + pixel * 2.5, (Math.PI / 2) * j, (pixel / 2) + pixel * i);
        b.initRan();
        if (i === 1) {
            b.invert = true;
        }
        ar.push(b);
    }
}

ar.push(b1);
ar.push(b2);
ar.push(b3);
ar.push(b4);
ar.push(b5);
ar.push(b6);
ar.push(b7);
ar.push(b8);
ar.push(b9);
ar.push(b10);
ar.push(b11);
ar.push(b12);
ar.push(b13);
ar.push(b14);
ar.push(b15);
ar.push(b16);

let moveRan = -1;

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255, 255, 255, 0.04)';
    context.fillRect(0, 0, vw, vh);
    ar.forEach(ball => {
        ball.move();
    });
}

document.addEventListener('click', () => {
    moveRan++;
    moveRan %= 2;
    setState();
});

function setState() {
    if (moveRan === 0) {
        ar.forEach(ball => {
            ball.initRan();
            ball.state = MOVE_RANDOM;
        });
    } else if (moveRan === 1) {
        ar.forEach(ball => {
            ball.initGoHome();
            ball.state = GO_PDT;
        });
    }
}

animate();

setInterval(() => {
    if (Math.random() * 30 > 15) {
        moveRan++;
        moveRan %= 2;
        setState();
    }
    console.log(moveRan);
}, 4500);

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});
