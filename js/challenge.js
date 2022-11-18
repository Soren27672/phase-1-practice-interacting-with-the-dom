
const init = () => {
    const counterNode = findId('counter');
    const pauseButton = findId('pause');
    const minusButton = findId('minus');
    const plusButton = findId('plus');
    const heartButton = findId('heart');
    const likeList = findId('list');
    const commentForm = findId('comment-form');
    const comments = findId('comments');
    const likeStorage = [];
    const submitButton = findId('submit');

    let counter = 0;
    let paused = false;

    pauseButton.addEventListener('click',e => {
        paused = !paused;
        pauseButton.textContent = paused ? ' resume ' : ' pause ';
        minusButton.textContent = paused ? 'X' : '➖';
        plusButton.textContent = paused ? 'X' : '➕';
        heartButton.textContent = paused ? 'X' : '❤️';
        submitButton.textContent = paused ? 'X' : 'Post!';
    })

    minusButton.addEventListener('click',e => {
        if (!paused) counterNode.textContent = --counter;
    })

    plusButton.addEventListener('click',e => {
        if (!paused) counterNode.textContent = ++counter;
    })

    heartButton.addEventListener('click',e => {
        if (!paused) {
            const currentCounter = counter;
            //console.log([...likeList.children].find(cv => cv.id === currentCounter))
            if (![...likeList.children].find(cv => parseInt(cv.id) === currentCounter)) {
                const newList = document.createElement('li');
                newList.id = `${currentCounter}`;
                likeList.appendChild(newList);

                likeStorage[currentCounter] = likeStorage[currentCounter] ? likeStorage[currentCounter] : 0;
                ++likeStorage[currentCounter];
                newList.textContent = `${currentCounter} has been liked ${likeStorage[currentCounter]} time!`;
            } else document.getElementById(`${currentCounter}`).textContent = `${currentCounter} has been liked ${++likeStorage[currentCounter]} times!`;
        }
    });

    commentForm.addEventListener('submit',e => {
        e.preventDefault();
        if (!paused) {
            const currentCounter = counter;

            const div = document.createElement('div');
            div.classList.add('commentDiv');
            const titleP = document.createElement('p');
            titleP.classList.add('commentTitle');
            titleP.textContent = `While showing ${currentCounter}`;
            div.appendChild(titleP);
            const bodyP = document.createElement('p');
            bodyP.classList.add('commentBody');
            bodyP.textContent = document.querySelector('[type=text]').value;
            div.appendChild(bodyP);
            comments.appendChild(div);

            document.querySelector('[type=text]').value = '';
        }
    })

    setInterval(() => {
        if (!paused) counterNode.textContent = ++counter;
    },1000);

}

document.addEventListener('DOMContentLoaded',init);

function findId(id) {
    return document.getElementById(id);
}