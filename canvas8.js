const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const PLAYER = 'PLAYER', BOT = 'BOT', COLOR_BOT = '#47434C',
    COLOR_PLAYER = '#FF5400', GAME_SIZE = 5, BALL_SIZE = 50;

let vw, vh, mX, mY;
vw = window.innerWidth;
vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

function Ball(player, color) {
    this.x = 100;
    this.y = 100;
    this.radius = BALL_SIZE;
    this.last = false;
    this.padX = 2;
    this.padY = 2;
    this.speed = 3;
    this.dX = 1;
    this.dY = 1;
    this.color = color;
    this.player = player;

    this.init = () => {
        this.x = Math.random() * (vw - this.radius * 2) + this.radius;
        this.y = Math.random() * (vh - this.radius * 2) + this.radius;
        this.padX = Math.random() * 3 + 1;
        this.padY = Math.random() * 3 + 1;
        this.speed = Math.random() * 4 + 2;
        // this.radius = Math.round(Math.random() * 30) + 20;
        //this.color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    }

    this.check = (x, y, radius) => {
        let tmp = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius + radius;
        if (tmp && !this.last) {
            let radian = Math.atan(Math.abs(y - this.y) / Math.abs(x - this.x));
            this.padX = this.speed * Math.cos(radian);
            this.padY = this.speed * Math.sin(radian);
            this.dX = x > this.x ? -1 : 1;
            this.dY = y > this.y ? -1 : 1;
            return true;
        }
        this.last = tmp;
        return false;
    }

    this.pause = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    this.move = (ar) => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        for (let i = 0; i < ar.length; i++) {
            if (ar[i] !== this && this.check(ar[i].x, ar[i].y, ar[i].radius)) {
                if (ar[i].player !== this.player) {
                    ar.splice(i, 1);
                    if (this.player === PLAYER) {
                        if (ar.length === 1) {
                            setPause(true);
                            console.log('%cYou Win!', 'color: #008000');
                            gameEnd = true;
                        } else {
                            console.log((GAME_SIZE - ar.length + 1) * 100 + ' score!');
                        }
                    } else {
                        setPause(true);
                        console.log('%cGame Over!', 'color: #ff0000');
                        gameEnd = true;
                    }
                } else {
                    ar[i].dX = -1 * this.dX;
                    ar[i].dY = -1 * this.dY;
                }
                break;
            }
        }
        if (PLAYER === this.player) {
            this.check(mX, mY, 1);
        }
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

    this.setColor = color => {
        this.color = color;
    }
}

let ar, pause, player, gameEnd;

function newGame() {
    console.clear();
    console.log('New Game!');
    gameEnd = false;
    ar = [];
    player = new Ball(PLAYER, COLOR_PLAYER);
    player.init();
    ar.push(player);
    for (let i = 0; i < GAME_SIZE; i++) {
        let b = new Ball(BOT, COLOR_BOT);
        b.init();
        ar.push(b);
    }
    setPause(true);
}

function setPause(bool) {
    pause = bool;
    console.log(`Game ${pause ? 'pausing...' : 'starting...'}`);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, vw, vh);
    ar.forEach(ball => {
        if (pause) {
            ball.pause();
        } else {
            ball.move(ar);
        }
    });
}

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
});

document.addEventListener('click', () => {
    setPause(!pause);
    if (gameEnd) {
        newGame();
    }
});

newGame();
animate();