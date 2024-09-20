const questionElement = document.getElementById('question');
const doorsElement = document.getElementById('doors');
const resultDiv = document.getElementById('result');
const nextButton = document.getElementById('next');
const doorSound = document.getElementById('doorSound');
const levelDisplay = document.getElementById('levelDisplay');
const timerDisplay = document.getElementById('time');

const questions = [
    {
        question: "फिशिंग म्हणजे काय?",
        options: ["फेक ईमेल्स", "चॉकलेट देणे", "इंटरनेट गती कमी करणे"],
        answer: 0
    },
    {
        question: "मालवेयर म्हणजे काय?",
        options: ["एक चांगला अॅप", "सॉफ़्टवेअर जे संगणकाला हानी पोहोचवते", "संगणकाची गती वाढविणारे"],
        answer: 1
    },
    {
        question: "सोशल इंजिनियरिंग म्हणजे काय?",
        options: ["लोकांना फसवणे", "संगणकाच्या सुरक्षेसाठी उपाय", "ऑनलाइन गेम खेळणे"],
        answer: 0
    },
    {
        question: "डीडॉस अटॅक म्हणजे काय?",
        options: ["संगणकांना चांगले कार्य करणे", "वेबसाइटवरून ट्रॅफिक थांबवणे", "डाटा साठवणे"],
        answer: 1
    },
    {
        question: "रॅन्समवेअर म्हणजे काय?",
        options: ["चांगले सॉफ्टवेअर", "डेटा लॉक करणारे मालवेयर", "संगणकाची गती वाढविणारे"],
        answer: 1
    },
    {
        question: "साइट थ्रेट म्हणजे काय?",
        options: ["सुरक्षित साइट", "वेबसाइटवर धोकादायक सामग्री", "सामाजिक मीडिया"],
        answer: 1
    },
    {
        question: "बोटनेट म्हणजे काय?",
        options: ["सुरक्षित नेटवर्क", "हॅक केलेले संगणकांचे जाळे", "तंत्रज्ञानातील नवीनता"],
        answer: 1
    },
    {
        question: "फेक अकाउंट म्हणजे काय?",
        options: ["सत्यापित खाते", "असत्य माहिती देणारे खाते", "सामाजिक मीडिया"],
        answer: 1
    },
    {
        question: "स्पायवेयर म्हणजे काय?",
        options: ["सुरक्षित सॉफ्टवेअर", "गोपनीय माहिती चोरणारे सॉफ्टवेअर", "फक्त गेमसाठी"],
        answer: 1
    },
    {
        question: "क्लाउड स्टोरेज म्हणजे काय?",
        options: ["स्थानिक संगणकावर डेटा", "ऑनलाइन डेटा साठवणे", "संगणकाची गती कमी करणे"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let timer;
let timeLimit = 10;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    doorsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const doorDiv = document.createElement('div');
        doorDiv.classList.add('door');
        doorDiv.innerText = option;
        doorDiv.onclick = () => checkAnswer(index, doorDiv);
        doorsElement.appendChild(doorDiv);
    });

    resultDiv.innerText = '';
    nextButton.style.display = 'none';
    resetTimer();
    startTimer();
    levelDisplay.innerText = `स्तर ${Math.floor(currentQuestionIndex / 10) + 1}`; // Update level display
}

function startTimer() {
    timer = setInterval(() => {
        timeLimit--;
        timerDisplay.innerText = timeLimit;

        if (timeLimit <= 0) {
            clearInterval(timer);
            resultDiv.innerText = "वेळ संपली! चुकले!";
            nextButton.style.display = 'block';
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLimit = 100; // Reset timer
    timerDisplay.innerText = timeLimit;
}

function checkAnswer(selectedIndex, doorDiv) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        resultDiv.innerText = "सही उत्तर! दरवाजा उघडत आहे...";
        doorDiv.classList.add('open');
        doorSound.play();
        setTimeout(() => {
            nextButton.style.display = 'block';
        }, 1000); // Delay before showing the next button
    } else {
        resultDiv.innerText = "चुकले! दरवाजा बंद आहे.";
        doorDiv.style.backgroundColor = '#ff4d4d'; // Change color for wrong answer
        setTimeout(() => {
            doorDiv.style.backgroundColor = ''; // Reset color
        }, 1000);
        nextButton.style.display = 'block';
    }
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        resultDiv.innerText = "आपण सर्व प्रश्नांची उत्तरे दिली! सायबर क्राइमबद्दल जाणून घेणे चालू ठेवा!";
        nextButton.style.display = 'none';
    }
};

// Start the game
displayQuestion();
