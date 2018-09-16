const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, mX, mY;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

mX = mY = 200;

function Ball() {

    this.x = 0;
    this.y = 0;
    this.radius = 30;
    this.bound = 40;
    this.bDirect = 1;
    this.cBound = this.radius;

    this.move = () => {
        this.x = mX;
        this.y = mY;
        this.updateBound();
        this.drawMaxBound();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
    }

    this.drawMaxBound = () => {
        context.beginPath();
        context.arc(mX, mY, this.radius + this.bound, 0, Math.PI * 2, false);
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
    }

    this.updateBound = () => {
        if (this.cBound > this.radius + this.bound || this.cBound < this.radius) {
            this.bDirect *= -1;
        }
        this.cBound += 2 * this.bDirect;
        context.beginPath();
        context.arc(mX, mY, this.cBound, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fill();
        context.closePath();
    }

}

let b = new Ball();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    b.move();
}

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});

animate();