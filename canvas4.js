const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let vw, vh, lmX, lmY, mX, mY;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

function Ball() {

    this.radius = 20;
    this.x = 200;
    this.y = vh - 200;
    this.padX = 5;
    this.padY = 5;
    this.dX = 1;
    this.dY = 1;
    this.lastCheck = false;
    this.width = 10;

    this.init = () => {
        this.padX = Math.random() * 5 + 2;
        this.padY = Math.random() * 5 + 2;
    }

    this.move = () => {
        context.beginPath();
        context.arc(this.x += this.padX * this.dX, this.y += this.padY * this.dY, this.radius, 0, Math.PI * 2, false);
        context.lineWidth = this.width;
        context.stroke();
        context.closePath();
        if (this.x + this.radius + this.width / 2 > vw || this.x - this.radius - this.width / 2 < 0) {
            this.dX *= -1;
        }
        if (this.y + this.radius + this.width / 2 > vh || this.y - this.radius - this.width / 2 < 0) {
            this.dY *= -1;
        }
        let tmp = this.check();
        if (tmp && !this.lastCheck) {
            this.padX = Math.random() * 4 + 2;
            this.padY = this.padX * (Math.abs(mY - this.y) / (Math.abs(mX - this.x)));
            this.dX *= mX - this.x > 0 ? -1 : 1;
            this.dY *= mY - this.y > 0 ? -1 : 1;
        }
        this.lastCheck = tmp;
    }

    this.check = () => Math.sqrt(Math.pow(mX - this.x, 2) + Math.pow(mY - this.y, 2)) < this.radius + this.width / 2;

}

let b = new Ball();
b.init();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    b.move();
}

animate();

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});