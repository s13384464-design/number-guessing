const range_start = document.getElementById('range_start');
const range_end = document.getElementById('range_end');
let chance = document.getElementById('chance');
const userNumber = document.getElementById('userNumber');
const button = document.getElementById('checkNumber');
const msg = document.getElementById('msg');

range_start.innerText = 1;
range_end.innerText = 50;
chance.innerText = 5;

let chanceNumber = 5;

// 🎨 Number wise colors
const bgColors = {
    1: "#000", // Black
    2: "#fff", // White
    3: "#ff0000", // Red
    4: "#008000", // Green
    5: "#0000ff", // Blue
    6: "#ffa500", // Orange
    7: "#ffc0cb", // Pink
    8: "#00ffff", // Aqua
    9: "#800080"  // Purple
};


// 🎯 Random number (1–50)
let randomNumber = Math.floor(Math.random() * 50) + 1;
while(randomNumber % 11 == 0) {
    randomNumber = Math.floor(Math.random() * 50) + 1;
}

// 🎨 Gradient function (ONLY ONCE)
function setBodyGradientByNumber(num) {
    const digits = num.toString().split("");

    let colors = digits.map(d => bgColors[d]);

    if (colors.length === 1) {
        colors.push(colors[0]);
    }

    document.body.style.transition = "background 0.6s ease";
    document.body.style.background =
        `linear-gradient(135deg, ${colors.join(", ")})`;
}

// 🔥 Call once
setBodyGradientByNumber(randomNumber);

// 🧠 Game logic
function checkNumber(number) {
    if (chanceNumber <= 0) return { message: "Chance is over", isWin: false };

    chanceNumber--;
    chance.innerText = chanceNumber;

    if (number > randomNumber) {
        return { message: `Your number ${number} is BIG`, isWin: false };
    } else if (number < randomNumber) {
        return { message: `Your number ${number} is SMALL`, isWin: false };
    } else {
        return { message: "🎉 YOU WIN 🎉", isWin: true };
    }
}

// 🎉 Confetti animation
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for(let i=0; i<100; i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => confettiContainer.remove(), 5000);
}

// 🖱 Button click
button.addEventListener('click', () => {
    if (chanceNumber === 0) {
        alert(`Game Over! Answer was ${randomNumber}`);
        window.location.reload();
        return;
    }

    const number = parseInt(userNumber.value);
    if (!number || number < 1 || number > 50) {
        msg.innerText = "Enter number between 1 to 50";
        return;
    }

    const ans = checkNumber(number);
    msg.innerText = ans.message;

    if (ans.isWin) {
        msg.classList.remove('loss');
        msg.classList.add('won');
        createConfetti(); // 🎉 trigger confetti
    } else {
        msg.classList.remove('won');
        msg.classList.add('loss');
    }
});

// 🎨 Confetti CSS
const style = document.createElement('style');
style.innerHTML = `
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}
.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: red;
  top: -10px;
  opacity: 0.8;
  transform: rotate(0deg);
  animation-name: confetti-fall;
  animation-timing-function: linear;
}
@keyframes confetti-fall {
  0% {transform: translateY(0) rotate(0deg);}
  100% {transform: translateY(100vh) rotate(360deg);}
}
`;

document.head.appendChild(style);
