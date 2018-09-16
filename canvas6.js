const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, mX, mY;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

function Ball() {
    this.x;
    this.y;
    this.radius = 10;
    this.last = false;
    this.padX = 2;
    this.padY = 2;
    this.speed = 7;
    this.dX = 1;
    this.dY = 1;

    this.init = () => {
        this.x = Math.random() * (vw - this.radius * 2) + this.radius;
        this.y = Math.random() * (vh - this.radius * 2) + this.radius;
        this.padX = Math.random() * 3 + 1;
        this.padY = Math.random() * 3 + 1;
        this.speed = Math.random() * 6 + 4;
    }

    this.check = () => {
        let tmp = Math.sqrt(Math.pow(mX - this.x, 2) + Math.pow(mY - this.y, 2)) < this.radius + 120;
        if (tmp && !this.last) {
            let radian = Math.atan(Math.abs(mY - this.y) / Math.abs(mX - this.x));
            this.padX = this.speed * Math.cos(radian);
            this.padY = this.speed * Math.sin(radian);
            this.dX = mX > this.x ? -1 : 1;
            this.dY = mY > this.y ? -1 : 1;
        }
        this.last = tmp;
    }

    this.move = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        this.check();
        if (this.x + this.radius > vw || this.x - this.radius < 0) {
            this.dX *= -1;
        }
        if (this.y + this.radius > vh || this.y - this.radius < 0) {
            this.dY *= -1;
        }
        this.x += this.padX * this.dX;
        this.y += this.padY * this.dY;
    }

    this.draw = (x, y) => {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
    }
}


document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});

let ar = [];
for (let i = 0; i < 120; i++) {
    let b = new Ball();
    b.init();
    ar.push(b);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    ar.forEach(ball => {
        ball.move();
    });
}

animate();