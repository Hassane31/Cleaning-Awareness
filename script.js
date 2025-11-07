const trashes = document.querySelectorAll('.trash');
const bins = document.querySelectorAll('.bin');
const message = document.getElementById('message');

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
        message.textContent = '🌟 Great job, little hero! You recycled correctly! 🌟';
        message.style.color = 'green';
        document.getElementById(trashId).style.display = 'none';
    } else {
        message.textContent = 'Oops! Try again! 🗑️';
        message.style.color = 'red';
    }
}