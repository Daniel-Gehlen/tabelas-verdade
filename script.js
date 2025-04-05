document.addEventListener('DOMContentLoaded', function() {
    // Operadores lógicos com suas tabelas-verdade e dicas
    const logicalOperators = [
        {
            name: "Negação (¬p)",
            symbol: "¬",
            truthTable: [
                ["p", "¬p"],
                ["V", "F"],
                ["F", "V"]
            ],
            tip: "Inverte o valor - o que é V vira F e vice-versa"
        },
        {
            name: "Conjunção (p ∧ q)",
            symbol: "∧",
            truthTable: [
                ["p", "q", "p ∧ q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "F"],
                ["F", "F", "F"]
            ],
            tip: "Só é V quando ambos são V - 'E' exige perfeição"
        },
        {
            name: "Disjunção (p ∨ q)",
            symbol: "∨",
            truthTable: [
                ["p", "q", "p ∨ q"],
                ["V", "V", "V"],
                ["V", "F", "V"],
                ["F", "V", "V"],
                ["F", "F", "F"]
            ],
            tip: "Só é F quando ambos são F - 'OU' é inclusivo"
        },
        {
            name: "Condicional (p → q)",
            symbol: "→",
            truthTable: [
                ["p", "q", "p → q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "V"],
                ["F", "F", "V"]
            ],
            tip: "Só é F quando V→F - 'Vera Fischer é Falsa'"
        },
        {
            name: "Bicondicional (p ↔ q)",
            symbol: "↔",
            truthTable: [
                ["p", "q", "p ↔ q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "F"],
                ["F", "F", "V"]
            ],
            tip: "Só é V quando ambos valores são iguais - gosta de clones"
        },
        {
            name: "OU Exclusivo (p ⊕ q)",
            symbol: "⊕",
            truthTable: [
                ["p", "q", "p ⊕ q"],
                ["V", "V", "F"],
                ["V", "F", "V"],
                ["F", "V", "V"],
                ["F", "F", "F"]
            ],
            tip: "Só é V quando os valores são diferentes - quer um ou outro, nunca ambos"
        }
    ];

    // Elementos da interface
    const tablesSection = document.querySelector('.tables-section');
    const practiceSection = document.querySelector('.practice-section');
    const quizSection = document.querySelector('.quiz-section');
    const showAllBtn = document.getElementById('show-all-btn');
    const practiceBtn = document.getElementById('practice-btn');
    const quizBtn = document.getElementById('quiz-btn');
    const checkAnswerBtn = document.getElementById('check-answer');
    const exerciseTable = document.querySelector('.exercise-table');
    const feedbackDiv = document.querySelector('.feedback');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const quizScore = document.querySelector('.quiz-score');

    // Estado da aplicação
    let currentExercise = null;
    let quizState = {
        score: 0,
        total: 0,
        currentQuestion: null
    };

    // Mostrar todas as tabelas-verdade
    function showAllTables() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        quizSection.classList.add('hidden');
        
        logicalOperators.forEach(operator => {
            const tableDiv = document.createElement('div');
            tableDiv.className = 'operator-table';
            
            const title = document.createElement('h3');
            title.textContent = operator.name;
            tableDiv.appendChild(title);
            
            const tip = document.createElement('p');
            tip.className = 'operator-tip';
            tip.textContent = `Macete: ${operator.tip}`;
            tableDiv.appendChild(tip);
            
            const table = document.createElement('table');
            table.className = 'truth-table';
            
            // Cabeçalho
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            operator.truthTable[0].forEach(cell => {
                const th = document.createElement('th');
                th.textContent = cell;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Corpo da tabela
            const tbody = document.createElement('tbody');
            for (let i = 1; i < operator.truthTable.length; i++) {
                const row = document.createElement('tr');
                operator.truthTable[i].forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            }
            table.appendChild(tbody);
            
            tableDiv.appendChild(table);
            tablesSection.appendChild(tableDiv);
        });
    }

    // Iniciar modo prática
    function startPractice() {
        tablesSection.innerHTML = '';
        quizSection.classList.add('hidden');
        practiceSection.classList.remove('hidden');
        
        // Seleciona um operador aleatório
        const randomOperator = logicalOperators[Math.floor(Math.random() * logicalOperators.length)];
        currentExercise = randomOperator;
        
        // Cria tabela de exercício
        exerciseTable.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'truth-table';
        
        // Cabeçalho
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        randomOperator.truthTable[0].forEach(cell => {
            const th = document.createElement('th');
            th.textContent = cell;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Corpo da tabela com células editáveis
        const tbody = document.createElement('tbody');
        for (let i = 1; i < randomOperator.truthTable.length; i++) {
            const row = document.createElement('tr');
            randomOperator.truthTable[i].forEach((cell, cellIndex) => {
                const td = document.createElement('td');
                
                // Primeiras colunas são fixas (valores de p e q)
                if (cellIndex < randomOperator.truthTable[0].length - 1) {
                    td.textContent = cell;
                } else {
                    // Última coluna é editável (resultado)
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.style.width = '20px';
                    input.style.textAlign = 'center';
                    input.dataset.expected = randomOperator.truthTable[i][cellIndex];
                    td.appendChild(input);
                }
                
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        
        exerciseTable.appendChild(table);
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'feedback';
    }

    // Verificar resposta no modo prática
    function checkPracticeAnswer() {
        const inputs = exerciseTable.querySelectorAll('input');
        let allCorrect = true;
        
        inputs.forEach(input => {
            const userAnswer = input.value.toUpperCase();
            const expected = input.dataset.expected;
            
            if (userAnswer === expected) {
                input.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            } else {
                input.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            feedbackDiv.textContent = 'Parabéns! Todas respostas corretas!';
            feedbackDiv.className = 'feedback correct';
        } else {
            feedbackDiv.textContent = 'Algumas respostas estão incorretas. Tente novamente!';
            feedbackDiv.className = 'feedback wrong';
        }
    }

    // Iniciar modo quiz
    function startQuiz() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        
        generateQuizQuestion();
    }

    // Gerar nova pergunta no quiz
    function generateQuizQuestion() {
        const randomOperator = logicalOperators[Math.floor(Math.random() * logicalOperators.length)];
        const randomRow = Math.floor(Math.random() * (randomOperator.truthTable.length - 1)) + 1;
        
        const pValue = randomOperator.truthTable[randomRow][0];
        const qValue = randomOperator.truthTable[0].length > 2 ? randomOperator.truthTable[randomRow][1] : null;
        const correctAnswer = randomOperator.truthTable[randomRow][randomOperator.truthTable[0].length - 1];
        
        quizState.currentQuestion = {
            operator: randomOperator,
            correctAnswer: correctAnswer
        };
        
        let questionText;
        if (qValue !== null) {
            questionText = `Qual o resultado de p ${randomOperator.symbol} q quando p=${pValue} e q=${qValue}?`;
        } else {
            questionText = `Qual o resultado de ${randomOperator.symbol}p quando p=${pValue}?`;
        }
        
        document.querySelector('.quiz-question h3').textContent = questionText;
        quizFeedback.textContent = '';
        quizFeedback.className = 'quiz-feedback';
    }

    // Verificar resposta no quiz
    function checkQuizAnswer(selectedOption) {
        const userAnswer = selectedOption.textContent;
        const correctAnswer = quizState.currentQuestion.correctAnswer;
        
        quizState.total++;
        
        if (userAnswer === correctAnswer) {
            quizState.score++;
            quizFeedback.textContent = 'Correto!';
            quizFeedback.className = 'quiz-feedback correct';
        } else {
            quizFeedback.textContent = `Incorreto! A resposta correta é ${correctAnswer}.`;
            quizFeedback.className = 'quiz-feedback wrong';
        }
        
        quizScore.textContent = `Acertos: ${quizState.score}/${quizState.total}`;
        
        // Nova pergunta após 1.5 segundos
        setTimeout(generateQuizQuestion, 1500);
    }

    // Event listeners
    showAllBtn.addEventListener('click', showAllTables);
    practiceBtn.addEventListener('click', startPractice);
    quizBtn.addEventListener('click', startQuiz);
    checkAnswerBtn.addEventListener('click', checkPracticeAnswer);
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            checkQuizAnswer(this);
        });
    });

    // Mostrar todas as tabelas ao carregar
    showAllTables();
});
