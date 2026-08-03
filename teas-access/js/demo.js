// ======================================================
// ATI TEAS ACCESS
// Demo Quiz — Multiple Choice + Free Response (separate phases)
// ======================================================


// ======================================================
// MULTIPLE CHOICE QUESTIONS
// ======================================================

const mcqQuestions = [

    {

        question: "Which of the following properties does soap, an emulsifier, have that makes it useful for washing dirt off one's hands with water?",

        options: [

            "Soap's enzymatic action helps to dissolve grime into smaller particles.",
        "Soap's dual polar and nonpolar nature helps bond oil and water.",
        "Soap's rough texture physically scours grime off surfaces.",
        "Soap's acidity causes grime to precipitate into the water."

        ],

        answer: 1,

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

    answer: 2,

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

    answer: 3,

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

    answer: 0,

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

    answer: 1,

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

    answer: 3,

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

    answer: 1,

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

    answer: 2,

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

    answer: 2,

    rationale: "Some viruses contain oncogenes or genes that interfere with normal regulation of the cell cycle. When these genes alter cell division, uncontrolled cell growth may occur, increasing the risk of cancer. This provides the strongest evidence that viruses can contribute to cancer development."
}

];


// ======================================================
// FREE RESPONSE QUESTIONS
// ======================================================

const freeResponseQuestions = [

    {
        subject: "Science",

        question: "If a dominant allele (A) has incomplete penetrance of 80%, what percentage of Aa individuals will NOT express the phenotype?",

        acceptedAnswers: ["20", "20%"],

        hint: "Penetrance is the percentage that DOES express the phenotype. Subtract from 100%.",

        rationale: "Incomplete penetrance of 80% means only 80% of individuals with the Aa genotype actually show the expected phenotype. The remaining 20% carry the allele but do not express it."
    },

    {
        subject: "Science",

        question: "A hormone inhibits its own releasing factor but stimulates a structurally similar hormone from the same gland. Name the two most likely hormones described:",

        acceptedAnswers: [
            "growth hormone and prolactin",
            "prolactin and growth hormone",
            "gh and prolactin",
            "prolactin and gh"
        ],

        hint: "Think about anterior pituitary hormones that share a structural family.",

        rationale: "Growth hormone (GH) and prolactin are structurally related hormones secreted by the anterior pituitary, both belonging to the same hormone family. GH exerts negative feedback on its own releasing hormone (GHRH) while also influencing prolactin secretion, since the two share overlapping regulatory pathways at the pituitary."
    },

    {
        subject: "Math",

        question: "Solve for x, rounding to the nearest hundredth: 3x² − 7x − 12 = 0, using only the positive root:",

        acceptedAnswers: ["3.48"],

        hint: "Use the quadratic formula: x = [−b ± √(b² − 4ac)] / 2a, then take only the positive result.",

        rationale: "Using the quadratic formula with a = 3, b = −7, c = −12: x = [7 ± √(49 + 144)] / 6 = [7 ± √193] / 6. The positive root rounds to 3.48."
    },

    {
        subject: "Math",

        question: "A drug is ordered at 0.4 mg/kg/day, divided into 3 doses, for a 62 lb patient. Calculate the mg per single dose:",

        acceptedAnswers: ["3.75", "3.76"],

        hint: "Convert lb to kg first (divide by 2.2), find the total daily dose, then divide by 3.",

        rationale: "62 lb ÷ 2.2 = 28.18 kg. 28.18 kg × 0.4 mg/kg/day = 11.27 mg/day. 11.27 mg ÷ 3 doses ≈ 3.76 mg per dose."
    }

];


// ======================================================
// QUIZ STATE
// ======================================================

let phase = "mcq";       // "mcq" | "transition" | "free"
let mcqIndex = 0;
let freeIndex = 0;
let score = 0;


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

    loadMcqQuestion();

});


// ======================================================
// PROGRESS (tracked separately per phase)
// ======================================================

function updateProgress() {

    if (phase === "mcq") {

        const percent = (mcqIndex / mcqQuestions.length) * 100;

        questionCounter.textContent =
            `Multiple Choice — Question ${mcqIndex + 1} of ${mcqQuestions.length}`;

        progressPercent.textContent = `${Math.round(percent)}%`;

        progressFill.style.width = `${percent}%`;

    } else if (phase === "free") {

        const percent = (freeIndex / freeResponseQuestions.length) * 100;

        questionCounter.textContent =
            `Free Response — Question ${freeIndex + 1} of ${freeResponseQuestions.length}`;

        progressPercent.textContent = `${Math.round(percent)}%`;

        progressFill.style.width = `${percent}%`;

    }

}


// ======================================================
// LOAD MCQ QUESTION
// ======================================================

function loadMcqQuestion() {

    phase = "mcq";

    updateProgress();

    const question = mcqQuestions[mcqIndex];

    questionsContainer.innerHTML = `

        <div class="question-card">

            <div class="question-number">

                Multiple Choice · Question ${mcqIndex + 1}

            </div>

            <h2 class="question-title">

                ${question.question}

            </h2>

            <div id="optionsContainer"></div>

        </div>

    `;

    const optionsContainer = document.getElementById("optionsContainer");

    const letters = ["A", "B", "C", "D"];

    question.options.forEach((option, index) => {

        optionsContainer.innerHTML += `

            <button class="option" onclick="checkMcqAnswer(${index})">

                <span class="option-letter">${letters[index]}</span>

                <span class="option-text">${option}</span>

            </button>

        `;

    });

}


// ======================================================
// CHECK MCQ ANSWER
// ======================================================

function checkMcqAnswer(selectedIndex) {

    const question = mcqQuestions[mcqIndex];

    const options = document.querySelectorAll(".option");

    options.forEach(option => option.disabled = true);

    options.forEach((option, index) => {

        if (index === question.answer) {
            option.classList.add("correct");
        } else if (index === selectedIndex) {
            option.classList.add("wrong");
        }

    });

    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) score++;

    const feedback = document.createElement("div");

    feedback.className = isCorrect ? "feedback correct" : "feedback wrong";

    feedback.innerHTML = `

        <h3>${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</h3>

        <p><strong>Correct Answer:</strong> ${question.options[question.answer]}</p>

        <p>${question.rationale}</p>

    `;

    document.querySelector(".question-card").appendChild(feedback);

    const nextButton = document.createElement("button");

    nextButton.className = "next-btn";

    nextButton.textContent =
        mcqIndex < mcqQuestions.length - 1
            ? "Next Question →"
            : "Continue to Free Response →";

    nextButton.onclick = nextMcqQuestion;

    document.querySelector(".question-card").appendChild(nextButton);

}

function nextMcqQuestion() {

    mcqIndex++;

    if (mcqIndex < mcqQuestions.length) {

        loadMcqQuestion();

    } else {

        loadTransitionCard();

    }

}


// ======================================================
// TRANSITION CARD (separates MCQ from Free Response)
// ======================================================

function loadTransitionCard() {

    phase = "transition";

    questionsContainer.innerHTML = `

        <div class="question-card transition-card">

            <div class="question-number">Nice Work!</div>

            <h2 class="question-title">
                Now Let's Try Some Free Response Questions
            </h2>

            <p class="transition-text">
                These work a little differently — type your answer instead
                of choosing from options, just like you'll need to on
                grid-in style ATI TEAS questions.
            </p>

            <button class="next-btn" onclick="loadFreeQuestion()">
                Start Free Response →
            </button>

        </div>

    `;

}


// ======================================================
// LOAD FREE RESPONSE QUESTION
// ======================================================

function loadFreeQuestion() {

    phase = "free";

    updateProgress();

    const question = freeResponseQuestions[freeIndex];

    questionsContainer.innerHTML = `

        <div class="question-card">

            <div class="question-number">

                <span class="subject-tag">${question.subject}</span>
                Free Response · Question ${freeIndex + 1}

            </div>

            <h2 class="question-title">

                ${question.question}

            </h2>

            <div class="free-response-wrap">

                <input
                    type="text"
                    id="freeResponseInput"
                    class="free-response-input"
                    placeholder="Type your answer here..."
                    autocomplete="off"
                >

                <div id="freeResponseHint" class="free-response-hint">
                    💡 ${question.hint}
                </div>

                <button
                    id="freeResponseSubmit"
                    class="free-response-submit"
                    onclick="checkFreeAnswer()"
                >
                    Submit Answer
                </button>

            </div>

        </div>

    `;

    const input = document.getElementById("freeResponseInput");

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            checkFreeAnswer();
        }

    });

}


// ======================================================
// CHECK FREE RESPONSE ANSWER
// ======================================================

function checkFreeAnswer() {

    const question = freeResponseQuestions[freeIndex];

    const input = document.getElementById("freeResponseInput");
    const hint = document.getElementById("freeResponseHint");
    const submitBtn = document.getElementById("freeResponseSubmit");

    const rawValue = input.value.trim();

    // Normalize: lowercase + strip extra spaces, so text answers compare fairly.
    // Numeric answers are matched after stripping non-numeric characters.

    const normalizedText = rawValue.toLowerCase().replace(/\s+/g, " ");
    const normalizedNumber = rawValue.replace(/[^0-9.]/g, "");

    const isCorrect = question.acceptedAnswers.some(accepted => {
        const acceptedLower = accepted.toLowerCase();
        return normalizedText === acceptedLower || normalizedNumber === accepted;
    });

    input.classList.remove("correct", "wrong");

    if (!isCorrect) {

        input.classList.add("wrong");
        hint.classList.add("visible");
        return;

    }

    input.classList.add("correct");
    input.disabled = true;
    submitBtn.disabled = true;
    hint.classList.remove("visible");

    score++;

    const feedback = document.createElement("div");

    feedback.className = "feedback correct";

    feedback.innerHTML = `

        <h3>✅ Correct!</h3>
        <p>${question.rationale}</p>

    `;

    document.querySelector(".question-card").appendChild(feedback);

    const nextButton = document.createElement("button");

    nextButton.className = "next-btn";

    nextButton.textContent =
        freeIndex < freeResponseQuestions.length - 1
            ? "Next Question →"
            : "See My Results →";

    nextButton.onclick = nextFreeQuestion;

    document.querySelector(".question-card").appendChild(nextButton);

}

function nextFreeQuestion() {

    freeIndex++;

    if (freeIndex < freeResponseQuestions.length) {

        loadFreeQuestion();

    } else {

        showResults();

    }

}


// ======================================================
// SHOW RESULTS
// ======================================================

function showResults() {

    const totalQuestions = mcqQuestions.length + freeResponseQuestions.length;

    const percentage = Math.round((score / totalQuestions) * 100);

    let emoji = "";
    let message = "";

    if (percentage === 100) {
        emoji = "🏆";
        message = "Excellent! You're TEAS Ready.";
    } else if (percentage >= 75) {
        emoji = "🎉";
        message = "Great Job! You're almost ready.";
    } else if (percentage >= 50) {
        emoji = "👍";
        message = "Good Progress! Keep practicing.";
    } else {
        emoji = "📚";
        message = "Keep Studying. You can do this.";
    }

    questionsContainer.innerHTML = `

        <div class="results-card">

            <div class="results-emoji">${emoji}</div>

            <h2>${message}</h2>

            <div class="score-circle">${percentage}%</div>

            <p>
                You answered <strong>${score}</strong> out of
                <strong>${totalQuestions}</strong> questions correctly.
            </p>

            <button class="restart-btn" onclick="restartQuiz()">
                Try Again
            </button>

            <a href="product.html" class="hero-btn unlock-btn">
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

    phase = "mcq";
    mcqIndex = 0;
    freeIndex = 0;
    score = 0;

    loadMcqQuestion();

}


// ======================================================
// CONFETTI
// ======================================================

function celebrate() {

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

}