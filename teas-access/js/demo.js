// ======================================================
// ATI TEAS ACCESS
// Demo Quiz
// ======================================================



// ======================================================
// QUESTIONS
// ======================================================

const demoQuestions = [

    {

        question: "Which of the following properties does soap, an emulsifier, have that makes it useful for washing dirt off one's hands with water?",

        options: [

            "Soap's enzymatic action helps to dissolve grime into smaller particles.",
        "Soap's dual polar and nonpolar nature helps bond oil and water.",
        "Soap's rough texture physically scours grime off surfaces.",
        "Soap's acidity causes grime to precipitate into the water."

        ],

        answer: 2,

        rationale:
            "Soap molecules are amphipathic, meaning they have a hydrophilic (polar) end and a hydrophobic (nonpolar) end. The nonpolar end binds to oils and grease while the polar end interacts with water, allowing dirt and oil to be washed away. This emulsifying property is why soap is effective at cleaning."

    },

    
{
    question: "Which of the following actions allows for repolarization of a neuron?",

    options: [
        "The inhibition of sodium and potassium pumps, stopping all ion movement into the neuron.",
        "The opening of sodium channels, allowing sodium to enter the neuron.",
        "The opening of potassium channels, allowing potassium to leave the neuron.",
        "The closing of both sodium and potassium channels to restrict movement of ions into and out of the neuron."
    ],

    answer: 3,

    rationale: "Repolarization occurs after depolarization when voltage-gated potassium channels open, allowing potassium ions (K⁺) to leave the neuron. This restores the membrane potential toward its resting negative charge. Sodium influx causes depolarization, not repolarization."
},

   
{
    question: "In the sentence 'The jurors for the trial were randomly selected from a pool,' in which of the following sentences does the word 'pool' have the same meaning?",

    options: [
        "The group planned to meet at nine o'clock at the pool hall.",
        "The children had to pool their money to buy ice cream.",
        "They looked nervously at the pool of oil under the car.",
        "The pool of available workers diminished during the summer."
    ],

    answer: 4,

    rationale: "In both sentences, the word 'pool' refers to a collection or group of available people or resources from which selections can be made. It does not refer to a game, combining money, or a body of liquid."
},

    {
    question: "The graceful dancer moved across the stage as the music began to play. Which of the following is the meaning of the suffix '-ful' as used in the sentence above?",

    options: [
        "Characterized by",
        "Worthy",
        "Able",
        "State of"
    ],

    answer: 1,

    rationale: "The suffix '-ful' means 'full of' or 'characterized by.' The word 'graceful' means characterized by grace. Understanding common prefixes and suffixes helps determine the meaning of unfamiliar words on the TEAS exam."
},
{
    question: "Bees can develop deformed wings and die after infection from a virus carried by Varroa mites. Researchers engineered gut microbes of bees to produce double-stranded RNA that they hypothesized could reduce transmission of the virus from the mites to the bees. Healthy bees with engineered gut microbes were exposed to virus-carrying mites and had a 37% higher survival rate than bees without the engineered microbes. Which of the following actions would increase the validity of the experiment?",

    options: [
        "Repeat the experiment, but use microbes that produce double-stranded DNA instead of RNA.",
        "Repeat the experiment, but in an environment more similar to bees' natural environment.",
        "Repeat the experiment, but determine survival rate 5 days after exposure instead of 10.",
        "Repeat the experiment, but only expose the bees to microbes and not the virus."
    ],

    answer: 2,

    rationale: "Increasing external validity means making experimental conditions more representative of the real world. Repeating the experiment in an environment similar to the bees' natural habitat helps determine whether the results apply outside the laboratory. The other options either change the hypothesis or fail to test the treatment effectively."
},
{
    question: "A biochemist has invented a new drug intended to reduce blood pressure. When this is tested on humans, which of the following groups will those who receive a placebo be in?",

    options: [
        "Dependent",
        "Baseline",
        "Experimental",
        "Control"
    ],

    answer: 4,

    rationale: "Participants who receive a placebo belong to the control group. The control group provides a comparison for the experimental group receiving the actual treatment, allowing researchers to determine whether the drug truly produces the observed effect."
},
{
    question: "Which of the following sentences contains formal language rather than informal language?",

    options: [
        "I didn't want to tell on my friends, but the teacher gave me no choice.",
        "The blue-footed booby is a magnificent specimen.",
        "When traveling alone, be on the lookout for pick-pockets.",
        "If you can't take the heat, get out of the kitchen."
    ],

    answer: 2,

    rationale: "Formal language uses objective, precise, and professional wording. 'The blue-footed booby is a magnificent specimen' is written in a style appropriate for academic or scientific writing. The remaining choices contain conversational or idiomatic language."
},

{
    question: "Osteoporosis results from which of the following?",

    options: [
        "An increase in osteocyte activity while osteoblast activity continues at expected levels.",
        "An increase in osteocyte activity while osteoclast activity continues at expected levels.",
        "A decline in osteoblast activity while osteoclast activity continues at expected levels.",
        "A decline in osteoclast activity while osteoblast activity continues at expected levels."
    ],

    answer: 3,

    rationale: "Osteoporosis develops when bone resorption exceeds bone formation. Osteoblasts are responsible for building new bone, while osteoclasts break down bone. A decline in osteoblast activity with continued osteoclast activity results in decreased bone density and an increased risk of fractures."
},
{
    question: "Which of the following statements best supports the hypothesis that viruses can cause cancer?",

    options: [
        "Cancerous and normal cells share genetic sequences.",
        "Viruses and cancer cells both replicate rapidly.",
        "Genes that regulate cell division are found in some viruses.",
        "Cellular DNA has sequences related to viral sequences."
    ],

    answer: 3,

    rationale: "Some viruses contain oncogenes or genes that interfere with normal regulation of the cell cycle. When these genes alter cell division, uncontrolled cell growth may occur, increasing the risk of cancer. This provides the strongest evidence that viruses can contribute to cancer development."
}


];
// ======================================================
// QUIZ VARIABLES
// ======================================================

let currentQuestion = 0;
let score = 0;
let answered = false;


// ======================================================
// PAGE ELEMENTS
// ======================================================

const questionsContainer = document.getElementById("questionsContainer");

const questionCounter = document.getElementById("questionCounter");

const progressPercent = document.getElementById("progressPercent");

const progressFill = document.getElementById("progressFill");
// ======================================================
// START QUIZ
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadQuestion();

});
// ======================================================
// UPDATE PROGRESS
// ======================================================

function updateProgress() {

    const percent = (currentQuestion / demoQuestions.length) * 100;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${demoQuestions.length}`;

    progressPercent.textContent =
        `${Math.round(percent)}%`;

    progressFill.style.width =
        `${percent}%`;

}



// ======================================================
// LOAD QUESTION
// ======================================================

function loadQuestion() {

    answered = false;

    updateProgress();

    const question = demoQuestions[currentQuestion];

    questionsContainer.innerHTML = `

        <div class="question-card">

            <div class="question-number">

                Question ${currentQuestion + 1}

            </div>

            <h2 class="question-title">

                ${question.question}

            </h2>

            <div id="optionsContainer"></div>

        </div>

    `;

    const optionsContainer =
        document.getElementById("optionsContainer");

    const letters = ["A", "B", "C", "D"];

    question.options.forEach((option, index) => {

        optionsContainer.innerHTML += `

            <button
                class="option"
                onclick="checkAnswer(${index})"
            >

                <span class="option-letter">

                    ${letters[index]}

                </span>

                <span class="option-text">

                    ${option}

                </span>

            </button>

        `;

    });

}
// ======================================================
// CHECK ANSWER
// ======================================================

function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const question = demoQuestions[currentQuestion];

    const options = document.querySelectorAll(".option");



    // Disable all buttons

    options.forEach(option => {

        option.disabled = true;

    });



    // Highlight answers

    options.forEach((option, index) => {

        if (index === question.answer) {

            option.classList.add("correct");

        }
        else if (index === selectedIndex) {

            option.classList.add("wrong");

        }

    });



    // Update score

    if (selectedIndex === question.answer) {

        score++;

    }



    // Create feedback

    const feedback = document.createElement("div");

    feedback.className =
        selectedIndex === question.answer
            ? "feedback correct"
            : "feedback wrong";

    feedback.innerHTML = `

        <h3>

            ${
                selectedIndex === question.answer
                    ? "✅ Correct!"
                    : "❌ Incorrect"
            }

        </h3>

        <p>

            <strong>Correct Answer:</strong>

            ${question.options[question.answer]}

        </p>

        <p>

    ${question.rationale}

</p>

    `;

    questionsContainer
        .querySelector(".question-card")
        .appendChild(feedback);



    // Next button

    const nextButton = document.createElement("button");

    nextButton.className = "next-btn";

    nextButton.textContent = "Next Question →";

    nextButton.onclick = nextQuestion;

    questionsContainer
        .querySelector(".question-card")
        .appendChild(nextButton);

}
// ======================================================
// NEXT QUESTION
// ======================================================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < demoQuestions.length) {

        loadQuestion();

    } else {

        showResults();

    }

}



// ======================================================
// SHOW RESULTS
// ======================================================

function showResults() {

    const percentage = Math.round(
        (score / demoQuestions.length) * 100
    );

    let emoji = "";
    let message = "";

    if (percentage === 100) {

        emoji = "🏆";
        message = "Excellent! You're TEAS Ready.";

    }
    else if (percentage >= 75) {

        emoji = "🎉";
        message = "Great Job! You're almost ready.";

    }
    else if (percentage >= 50) {

        emoji = "👍";
        message = "Good Progress! Keep practicing.";

    }
    else {

        emoji = "📚";
        message = "Keep Studying. You can do this.";

    }

    questionsContainer.innerHTML = `

        <div class="results-card">

            <div class="results-emoji">

                ${emoji}

            </div>

            <h2>

                ${message}

            </h2>

            <div class="score-circle">

                ${percentage}%

            </div>

            <p>

                You answered
                <strong>${score}</strong>
                out of
                <strong>${demoQuestions.length}</strong>
                questions correctly.

            </p>

            <button
                class="restart-btn"
                onclick="restartQuiz()"
            >

                Try Again

            </button>

            <a
                href="product.html"
                class="hero-btn unlock-btn"
            >

                🔓 Unlock Full Access

            </a>

        </div>

    `;
    if (percentage >= 75) {

    celebrate();

}

}

// ======================================================
// RESTART QUIZ
// ======================================================

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    loadQuestion();

}
// ======================================================
// CONFETTI
// ======================================================

function celebrate() {

    confetti({

        particleCount: 150,

        spread: 70,

        origin: {

            y: 0.6

        }

    });

}