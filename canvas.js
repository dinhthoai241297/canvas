let canvas, vw, vh, mX, mY;
canvas = document.querySelector('canvas');
vw = window.innerWidth;
vh = window.innerHeight;
canvas.width = vw;
canvas.height = vh;
mX = 0;
mY = 0;

let context = canvas.getContext('2d');

function Ball(radius, radians, color) {

    // bán kính trục quay
    this.radius = radius;
    this.radians = radians;
    this.speed = 0.04;

    this.size = 5;
    this.x;
    this.y;

    this.color = color;

    this.lastMouse = {
        x: 0,
        y: 0
    }

    this.move = () => {
        let last = { x: this.x, y: this.y };
        this.radians += this.speed;
        this.lastMouse.x += (mX - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mY - this.lastMouse.y) * 0.05;
        this.x = this.lastMouse.x + this.radius * Math.cos(this.radians);
        this.y = this.lastMouse.y + this.radius * Math.sin(this.radians);
        // context.beginPath();
        // context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // context.fillStyle = this.color;
        // context.fill();
        // context.closePath();
        this.draw(last);
    }

    this.draw = last => {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.size;
        context.moveTo(last.x, last.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}

function ranColor() {
    let ar = ['#324D5C', '#14B278', '#F0CA4D', '#E37B40', '#ED3752'];
    return ar[Math.round(Math.random() * 4)];
}

let balls = [];
for (let i = 0; i < 40; i++) {
    let b = new Ball(50 + Math.round(Math.random() * 80), Math.random() * 6, ranColor());
    balls.push(b);
}

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255, 255, 255, 0.03)';
    context.fillRect(0, 0, vw, vh);

    balls.forEach(ball => {
        ball.move();
    });
}

animate();

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});

