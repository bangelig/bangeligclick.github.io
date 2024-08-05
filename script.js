document.addEventListener('DOMContentLoaded', () => {
    const gameImage = document.getElementById('gameImage');
    const clickIcon = document.getElementById('clickIcon');
    const clickCountElem = document.getElementById('clickCount');
    const messageElem = document.getElementById('message');
    const questionArea = document.getElementById('questionArea');
    const questionTextElem = document.getElementById('questionText');
    const answerInput = document.getElementById('answer');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const feedbackMessageElem = document.getElementById('feedbackMessage');
    
    let clickCount = 0;
    let correctAnswer = 0;
    let questionPending = false;

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        questionTextElem.textContent = `Berapa ${num1} x ${num2}?`;
    }

    function enableClick() {
        gameImage.style.pointerEvents = 'auto';
    }

    function disableClick() {
        gameImage.style.pointerEvents = 'none';
    }

    gameImage.addEventListener('click', () => {
        if (questionPending) {
            return;
        }

        clickCount++;
        clickCountElem.textContent = clickCount;

        // Add animation class
        gameImage.classList.add('clicked');

        // Remove animation class after animation ends to allow it to be triggered again
        setTimeout(() => {
            gameImage.classList.remove('clicked');
        }, 600); // Match the duration of the animation

        if (clickCount % 100 === 0) {
            questionPending = true;
            disableClick();
            questionArea.classList.remove('hidden');
            generateQuestion();
        }

        if (clickCount >= 1000) {
            messageElem.textContent = 'Congratulations! You have won 50 XRD!';
            gameImage.style.pointerEvents = 'none'; // Disable further clicks
        }
    });

    submitAnswerBtn.addEventListener('click', () => {
        const userAnswer = parseInt(answerInput.value, 10);

        if (userAnswer === correctAnswer) {
            feedbackMessageElem.textContent = 'Oke lanjut bre';
            questionArea.classList.add('hidden');
            questionPending = false;
            enableClick();
        } else {
            feedbackMessageElem.textContent = 'Salah bre, matematika mu pasti 0 :D';
        }

        answerInput.value = '';
    });
});
