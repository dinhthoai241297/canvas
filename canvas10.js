const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, mX, mY;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

function Ball() {
    this.x = 200;
    this.y = 200;
    this.radius = 50;
    this.isDestroy = false;
    this.ar = [];

    this.init = () => {
        for (let i = 0; i < 15; i++) {
            let padX, padY, dX, dY;
            padX = Math.random() * 11 + 2;
            padY = Math.random() * 11 + 2;
            dX = Math.random() * 30 > 15 ? 1 : -1;
            dY = Math.random() * 30 > 15 ? 1 : -1;
            let l = new Ele(this.x, this.y, padX, padY, dX, dY);
            this.ar.push(l);
        }
    }

    this.draw = () => {
        if (this.isDestroy) {
            this.destroy();
        } else {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle='black';
            context.fill();
            context.closePath();
        }
    }

    this.destroy = () => {
        this.ar.forEach(ele => {
            ele.move();
        });
    }

    this.des = () => {
        setTimeout(() => {
            ar.splice(0, 1);
            console.log('des');
        }, 500);
    }
}

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
        context.fillStyle='black';
        context.fill();
        context.closePath();
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    ar.forEach(ball => {
        ball.draw();
    });
}

let ar = [];
let b = new Ball();
b.init();

ar.push(b);

document.addEventListener('click', () => {
    b.isDestroy = true;
    b.des();
});

animate();