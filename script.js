const trashes = document.querySelectorAll('.trash');
const bins = document.querySelectorAll('.bin');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const restartbtn = document.getElementById('restart-btn');
let score = 0;
trashes.forEach(trash => {
    trash.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', dropTrash);
});

function dragStart(e) {
    e.dataTransfer.setData('type', e.target.dataset.type);
    e.dataTransfer.setData('id', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dropTrash(e) {
    e.preventDefault();
    const trashType = e.dataTransfer.getData('type');
    const trashId = e.dataTransfer.getData('id');
    const binType = e.currentTarget.dataset.type;

    if (trashType === binType) {
        score = score + 10;
        scoreDisplay.textContent = score;
        message.textContent = '🌟 Great job, little hero! You recycled correctly! 🌟';
        message.style.color = 'green';
        document.getElementById(trashId).style.display = 'none';
    } else {
        score = score - 10;
        if (score < 0) score = 0;
        scoreDisplay.textContent = score;
        message.textContent = 'Oops! Try again! 🗑️';
        message.style.color = 'red';
    }
    checkGameOver();
}
window.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    const leftImg = document.querySelector(".side-img.left");
    const rightImg = document.querySelector(".side-img.right");

    if (leftImg) leftImg.style.transform = `translateY(${scroll * -0.3}px)`;
    if (rightImg) rightImg.style.transform = `translateY(${scroll * -0.3}px)`;
});
const restartBtn = document.getElementById('restart-btn');


function checkGameOver() {
    const hiddenTrashes = document.querySelectorAll('.trash[style*="display: none"]');
    if (hiddenTrashes.length === trashes.length) {
        message.textContent = "🎉 You recycled everything! You're an Eco Hero! 🎉";
        message.style.color = "green";
        restartBtn.style.display = "inline-block";
    }
}


restartBtn.addEventListener('click', () => {
    trashes.forEach(trash => {
        trash.style.display = 'inline';
    });
    score = 0;
    scoreDisplay.textContent = score;
    message.textContent = '';
    restartBtn.style.display = 'none';
});