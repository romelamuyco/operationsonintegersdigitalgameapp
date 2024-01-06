<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integers Digital Game App</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .screen {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #001f3f;
            color: white;
        }

        #container,
        #rulesContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #001f3f;
            color: white;
            padding: 20px;
        }

        #title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        #author {
            font-size: 18px;
            margin-bottom: 20px;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 49%, 100% {
                opacity: 1;
            }
            50%, 99% {
                opacity: 0;
            }
        }

        #timer {
            font-size: 18px;
            margin-bottom: 10px;
            color: gold; /* Gold color for the timer */
        }

        #currentProblem {
            font-size: 36px;
            margin-bottom: 10px;
            padding: 20px;
            border-radius: 10px;
            background-color: #001f3f;
            color: white;
        }

        #answer {
            font-size: 24px;
            font-weight: bold;
            width: 40%;
            max-width: 200px;
            height: 60px;
            margin-bottom: 10px;
            padding: 5px;
            text-align: center; /* Centered text */
            margin-left: auto;
            margin-right: auto;
            display: block;
        }

        #feedback {
            font-size: 16px;
            margin-bottom: 20px;
        }

        #submitBtn,
        #rulesBtn,
        #newGameBtn,
        #exitBtn,
        #backBtn {
            font-size: 14px;
            padding: 10px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            width: 60px;
            height: 60px;
            margin: 10px;
        }

        #newGameBtn {
            background-color: #3498db;
        }

        #exitBtn {
            background-color: #f1c40f;
        }

        #backBtn {
            background-color: #3498db;
        }

        #rulesBtn {
            background-color: #e74c3c;
        }

        #submitBtn {
            background-color: #2ecc71; /* Green color for Submit button */
            color: white; /* White text color */
        }

        #submitBtn,
        #rulesBtn,
        #newGameBtn,
        #exitBtn,
        #backBtn {
            display: inline-block;
        }

        #buttonContainer {
            display: flex;
            gap: 10px;
        }

        #statistics {
            font-size: 14px;
            margin-bottom: 20px;
        }

        #rulesContainer p,
        #rulesContainerContent p {
            font-size: 14px;
            max-width: 400px;
            margin: 20px;
            text-align: left;
        }

        /* Mobile responsiveness */
        @media only screen and (max-width: 600px) {
            body {
                font-size: 12px;
            }

            #container,
            #rulesContainer {
                padding: 10px;
            }

            #title {
                font-size: 24px;
            }

            #author {
                font-size: 16px;
            }

            #timer {
                font-size: 14px;
            }

            #currentProblem {
                font-size: 24px;
            }

            #answer {
                font-size: 14px;
                width: 100%;
                max-width: none;
            }

            #feedback {
                font-size: 14px;
            }

            #submitBtn,
            #rulesBtn,
            #newGameBtn,
            #exitBtn,
            #backBtn {
                font-size: 12px;
                padding: 10px;
            }

            #statistics {
                font-size: 12px;
            }

            #rulesContainer p,
            #rulesContainerContent p {
                font-size: 12px;
            }
        }
    </style>
</head>

<body>
    <!-- Main Game Screen -->
    <div id="container" class="screen">
        <div id="title">Integers Digital Game App</div>
        <div id="author">Romela A. Muyco</div>
        <div id="timer">Time: <span id="time">600</span> seconds</div>
        <div id="currentProblem"></div>
        <input type="text" id="answer" placeholder="Your Answer">
        <div id="feedback"></div>
        <div id="buttonContainer">
            <button id="submitBtn" onclick="checkAnswer()">Submit</button>
            <button id="rulesBtn" onclick="showRules()">Show Rules</button>
        </div>
        <div id="statistics">Correct: <span id="correctCount">0</span> | Wrong: <span id="wrongCount">0</span> | Total Answered: <span
                id="totalAttempts">0</span></div>
        <div id="buttonContainer">
            <button id="newGameBtn" onclick="startNewGame()">New Game</button>
            <button id="exitBtn" onclick="exitGame()">Exit</button>
        </div>
    </div>

    <!-- Rules Screen -->
    <div id="rulesContainer" class="screen">
        <div id="title">Integers Digital Game App</div>
        <div id="author">Romela A. Muyco</div>
        <div id="rulesContainerContent">
            <p>Rules on Integers:</p>
            <p>1. Addition: To add two integers, add their numerical values.</p>
            <p>2. Subtraction: To subtract an integer, add its opposite.</p>
            <p>3. Multiplication: The product of two integers with the same sign is positive, and with different signs is negative.</p>
            <p>4. Division: The quotient of two integers with the same sign is positive, and with different signs is negative. Ensure
                non-decimal quotient.</p>
        </div>
        <button id="backBtn" onclick="showMainScreen()">Back to Game</button>
    </div>

    <!-- Your audio and script elements remain unchanged -->

    <script>
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let totalAttempts = 0;
        const totalItems = 40;
        let timeLeft = 600;

        function generateProblem() {
            const operations = ['+', '-', '*', '/'];
            const operation = operations[Math.floor(Math.random() * operations.length)];

            let num1, num2;

            switch (operation) {
                case '+':
                    num1 = Math.floor(Math.random() * 20) - 10;
                    num2 = Math.floor(Math.random() * 20) - 10;
                    break;
                case '-':
                    num1 = Math.floor(Math.random() * 20) - 10;
                    num2 = Math.floor(Math.random() * 20) - 10;
                    break;
                case '*':
                    num1 = Math.floor(Math.random() * 10) - 5;
                    num2 = Math.floor(Math.random() * 10) - 5;
                    break;
                case '/':
                    do {
                        num1 = Math.floor(Math.random() * 10) - 5;
                        num2 = Math.floor(Math.random() * 5) + 1;
                    } while (num1 % num2 !== 0);
                    break;
                default:
                    break;
            }

            const problem = `${num1} ${operation} ${num2}`;
            document.getElementById('currentProblem').innerText = `Solve: ${problem}`;
            return problem;
        }

        function checkAnswer() {
            const problem = document.getElementById('currentProblem').innerText.replace('Solve: ', '');
            const userAnswer = parseFloat(document.getElementById('answer').value); // Use parseFloat to handle negative zero
            const correctAnswer = eval(problem);

            const feedback = document.getElementById('feedback');
            if (userAnswer === 0 && (1 / userAnswer) === -Infinity) {
                // Handle negative zero
                feedback.innerText = 'Incorrect. Try again.';
                feedback.style.color = '#e74c3c';
                wrongAnswers++;
            } else if (userAnswer === correctAnswer) {
                feedback.innerText = 'Correct! Well done.';
                feedback.style.color = '#2ecc71';
                correctAnswers++;
            } else {
                feedback.innerText = 'Incorrect. Try again.';
                feedback.style.color = '#e74c3c';
                wrongAnswers++;
            }

            totalAttempts++;
            updateStatistics();

            setTimeout(() => {
                document.getElementById('answer').value = '';
                feedback.innerText = '';

                if (totalAttempts === totalItems) {
                    showCongratulations();
                } else {
                    generateProblem();
                }
            }, 1000);
        }

        function updateStatistics() {
            document.getElementById('correctCount').innerText = correctAnswers;
            document.getElementById('wrongCount').innerText = wrongAnswers;
            document.getElementById('totalAttempts').innerText = totalAttempts;
        }

        function showCongratulations() {
            clearInterval(timerInterval);
            const percentageCorrect = (correctAnswers / totalAttempts) * 100;
            const congratsMessage = document.getElementById('feedback');
            congratsMessage.innerHTML = (percentageCorrect >= 80) ?
                `Congratulations! You got ${percentageCorrect}% correct. Well done!` :
                `Nice try! You got ${percentageCorrect}% correct. Keep practicing!`;

            congratsMessage.style.color = (percentageCorrect >= 80) ? '#2ecc71' : '#e74c3c';
        }

        function updateTimer() {
            const timerElement = document.getElementById('time');
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.innerText = timeLeft;
            } else {
                showCongratulations();
            }
        }

        function startNewGame() {
            correctAnswers = 0;
            wrongAnswers = 0;
            totalAttempts = 0;
            timeLeft = 600;

            document.getElementById('feedback').innerText = '';
            document.getElementById('correctCount').innerText = '0';
            document.getElementById('wrongCount').innerText = '0';
            document.getElementById('totalAttempts').innerText = '0';
            document.getElementById('time').innerText = '600';

            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);

            generateProblem();
            showMainScreen();
        }

        function exitGame() {
            clearInterval(timerInterval);
            document.getElementById('container').style.display = 'none';
            document.getElementById('rulesContainer').style.display = 'none';
        }

        // Initialize the game
        generateProblem();

        // Start the timer
        const timerInterval = setInterval(updateTimer, 1000);

        function showRulesScreen() {
            document.getElementById('container').style.display = 'none';
            document.getElementById('rulesContainer').style.display = 'flex';
        }

        function showMainScreen() {
            document.getElementById('container').style.display = 'flex';
            document.getElementById('rulesContainer').style.display = 'none';
        }

        function showRules() {
            showRulesScreen();
        }
    </script>
</body>

</html>
