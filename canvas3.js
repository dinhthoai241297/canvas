const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh;
vw = window.innerWidth;
vh = window.innerHeight;
console.log(vw, vh);

canvas.width = vw;
canvas.height = vh;

function Ball(radius, back, x, speed) {
    this.x = x;
    this.y = 100;
    this.last = 100;
    this.direct = 1;
    this.radius = radius;
    this.back = back;
    this.speed = speed;
    this.color;

    this.init = () => {
        this.color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    }

    this.move = () => {
        if (this.last < vh - this.radius) {
            this.pad = this.y / 200 + this.speed;
            context.beginPath();
            if (this.y + this.radius + 2 > vh || this.y < this.last) {
                this.direct *= -1;
                if (this.y + this.radius + 2 > vh) {
                    this.last += (vh - this.last) * this.back;
                }
            }
            context.arc(this.x, this.y += this.pad * this.direct, this.radius, 0, Math.PI * 2, false);
            context.fillStyle=this.color;
            context.fill();
            context.closePath();
        } else {
            context.beginPath();
            context.arc(this.x, vh - this.radius, this.radius, 0, Math.PI * 2, false);
            context.fillStyle=this.color;
            context.fill();
            context.closePath();
        }
    }
}

let ar = [];
for (let i = 0; i < 5; i++) {
    let radius = Math.round(Math.random() * 30 + 20);
    let b = new Ball(radius, (Math.random() * 4) / 10 + 0.25, Math.random() * (vw - radius * 2) + radius, Math.random() * 3 + 2);
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
