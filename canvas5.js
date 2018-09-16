const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, mX, mY, color;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

color = '#215A6E';

function Ball() {

    this.radius = 1;
    this.color = color;

    this.x;
    this.y;

    this.padX = 2;
    this.padY = 1;

    this.dX = 1;
    this.dY = 1;

    this.init = () => {
        this.radius = 8;
        this.padX = Math.random() * 2 + 1;
        this.padY = Math.random() * 2 + 1;
        this.x = Math.random() * (vw - this.radius) + this.radius;
        this.y = Math.random() * (vh - this.radius) + this.radius;
        this.dX = Math.random() * 30 > 15 ? 1 : -1;
        this.dY = Math.random() * 30 > 15 ? 1 : -1;
    }

    this.move = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle=this.color;
        context.fill();
        context.closePath();
        if (this.x + this.radius > vw || this.x - this.radius < 0) {
            this.dX *= -1;
        }
        if (this.y + this.radius > vh || this.y - this.radius < 0) {
            this.dY *= -1;
        }
        this.x += this.padX * this.dX;
        this.y += this.padY * this.dY;
    }

}

function Connect(ar) {
    this.ar = ar;

    this.update = () => {
        for (let i = 0; i < ar.length; i++) {
            for (let j = i + 1; j < ar.length; j++) {
                this.connect(this.ar[i], this.ar[j]);
            }
        }
    }

    this.connect = (a, b) => {
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = '#008ABA';
        context.stroke();
        context.closePath();
    }
}

let ar = [];
for (let i = 0; i < 10; i++) {
    let b = new Ball();
    b.init();
    ar.push(b);
}

let c = new Connect(ar);

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    c.update();
    ar.forEach(ball => {
        ball.move();
    });
}

animate();
