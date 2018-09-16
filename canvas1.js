let canvas, vw, vh, mX, mY;
canvas = document.querySelector('canvas');
vw = window.innerWidth;
vh = window.innerHeight;
canvas.width = vw;
canvas.height = vh;
mX = 0;
mY = 0;

let context = canvas.getContext('2d');

function Ball() {

    this.x = Math.random() * 300 + 30;
    this.y = Math.random() * 300 + 30;
    this.size = 30;

    this.dX = 1;
    this.dY = 1;

    this.padX = 1;
    this.padY = 1;

    this.init = () => {
        // this.padX = Math.random() * 8 + 3;
        // this.padY = Math.random() * 8 + 3;
    }

    this.move = (ar) => {
        context.beginPath();
        if (this.x + this.size > vw || this.x - this.size < 0) {
            this.dX *= -1;
        }
        if (this.y + this.size > vh || this.y - this.size < 0) {
            this.dY *= -1;
        }
        for (let i = 0; i < ar.length; i++) {
            if (ar[i] !== this) {
                let tmp = Math.sqrt(Math.pow(this.x - ar[i].x, 2) + Math.pow(this.y - ar[i].y, 2));
                console.log(tmp, this.x - ar[i].x, this.y - ar[i].y);
                if (tmp <= (this.size + ar[i].size + 10)) {
                    if (Math.abs(this.x - ar[i].x) > Math.abs(this.y - ar[i].y)) {
                        this.dX *= -1;
                    } else {
                        this.dY *=-1;
                    }
                    break;
                }
            }
        }
        context.arc(this.x += this.padX * this.dX, this.y += this.padY * this.dY, 30, 0, Math.PI * 2, false);
        context.lineWidth = 10;
        context.stroke();
        context.closePath();
    }
}

let ar = [];
for (let i = 0; i < 3; i++) {
    let b = new Ball();
    b.init();
    ar.push(b);
}

let b = new Ball();
b.init();
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
   ar.forEach(ball => {
       ball.move(ar);
   });
}

animate();
context.beginPath();
context.arc(50, 50, 30, 0, Math.PI * 2, false);
context.lineWidth = 10;
context.stroke();
context.closePath();

context.beginPath();
context.arc(50, 120, 30, 0, Math.PI * 2, false);
context.lineWidth = 10;
context.stroke();
context.closePath();

let tmp = Math.sqrt(Math.pow(50 - 50, 2) + Math.pow(50 - 120, 2));
console.log(tmp);
document.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY);
});