// CodeMaster: Interactive Algorithm Learning Platform
class CodeMaster {
    constructor() {
        this.currentScreen = 'welcome';
        this.currentLesson = 0;
        this.currentQuestion = 0;
        this.currentChallenge = 0;
        this.selectedAlgorithm = 'fizzbuzz'; // Default algorithm
        
        // Enhanced Learning Progress with Brilliant.org features
        this.progress = {
            totalScore: 0,
            streak: 0,
            maxStreak: 0,
            level: 1,
            experience: 0,
            completedLessons: [],
            completedQuestions: [],
            completedChallenges: [],
            achievements: [],
            timeSpent: 0,
            hintsUsed: 0,
            skillMastery: {
                fizzbuzz: 0,
                twosum: 0,
                palindrome: 0,
                binarySearch: 0
            },
            adaptiveDifficulty: 'medium',
            learningStyle: 'visual', // visual, analytical, practical
            lastActivity: Date.now(),
            dailyStreak: 0,
            weeklyGoal: 5, // lessons per week
            personalBest: {
                fastestCorrectAnswer: Infinity,
                mostConsecutiveCorrect: 0
            },
            spacedRepetition: {
                reviewQueue: [],
                masteredConcepts: [],
                conceptDifficulty: {}, // concept_id -> difficulty_level (1-5)
                nextReviewDates: {}, // concept_id -> timestamp
                reviewHistory: [] // [{concept, performance, timestamp}]
            }
        };
        
        // Quiz State
        this.quizState = {
            currentQuestionIndex: 0,
            answers: [],
            timeRemaining: 30,
            timer: null,
            score: 0
        };
        
        // Code Editor State
        this.editorState = {
            originalCode: '',
            currentCode: '',
            isRunning: false,
            testsPassed: 0,
            totalTests: 0
        };
        
        this.lessons = this.initializeLessons();
        this.questions = this.initializeQuestions();
        this.challenges = this.initializeChallenges();
        this.achievements = this.initializeAchievements();
        
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.loadProgress();
        this.setupEventListeners();
        this.setupAlgorithmSelector();
        this.updateUI();
        this.hideLoadingScreen();
    }

    // Loading Screen Management
    showLoadingScreen() {
        document.getElementById('loading-screen').classList.remove('hidden');
        this.simulateLoading();
    }

    simulateLoading() {
        const progressBar = document.querySelector('.loading-progress');
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
            }
            progressBar.style.width = width + '%';
        }, 100);
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 2000);
    }

    // Algorithm Selector Setup
    setupAlgorithmSelector() {
        const algorithmCards = document.querySelectorAll('.algorithm-card');
        algorithmCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                algorithmCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                card.classList.add('active');
                // Update selected algorithm
                this.selectedAlgorithm = card.dataset.algorithm;
                // Update lessons, questions, and challenges based on algorithm
                this.updateAlgorithmContent();
                // Update header subtitle
                this.updateHeaderForAlgorithm();
            });
        });
    }

    updateAlgorithmContent() {
        switch (this.selectedAlgorithm) {
            case 'fizzbuzz':
                this.lessons = this.initializeFizzBuzzLessons();
                this.questions = this.initializeFizzBuzzQuestions();
                this.challenges = this.initializeFizzBuzzChallenges();
                break;
            case 'twosum':
                this.lessons = this.initializeTwoSumLessons();
                this.questions = this.initializeTwoSumQuestions();
                this.challenges = this.initializeTwoSumChallenges();
                break;
            case 'palindrome':
                this.lessons = this.initializePalindromeLessons();
                this.questions = this.initializePalindromeQuestions();
                this.challenges = this.initializePalindromeChallenges();
                break;
            case 'binary-search':
                this.lessons = this.initializeBinarySearchLessons();
                this.questions = this.initializeBinarySearchQuestions();
                this.challenges = this.initializeBinarySearchChallenges();
                break;
            default:
                // Default to FizzBuzz
                this.lessons = this.initializeFizzBuzzLessons();
                this.questions = this.initializeFizzBuzzQuestions();
                this.challenges = this.initializeFizzBuzzChallenges();
        }
        // Reset current indices
        this.currentLesson = 0;
        this.currentQuestion = 0;
        this.currentChallenge = 0;
    }

    updateHeaderForAlgorithm() {
        const subtitle = document.querySelector('.logo-subtitle');
        const algorithmNames = {
            'fizzbuzz': 'Interactive FizzBuzz Quiz',
            'twosum': 'Two Sum Challenge',
            'palindrome': 'Palindrome Checker',
            'binary-search': 'Binary Search Master',
            'dynamic-programming': 'Dynamic Programming',
            'trees': 'Tree Traversal'
        };
        subtitle.textContent = algorithmNames[this.selectedAlgorithm] || 'Algorithm Learning';
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation
        document.getElementById('start-learning').addEventListener('click', () => {
            this.switchScreen('lesson');
        });

        document.getElementById('back-to-welcome').addEventListener('click', () => {
            this.switchScreen('welcome');
        });

        document.getElementById('back-to-lesson').addEventListener('click', () => {
            this.switchScreen('lesson');
        });

        document.getElementById('back-to-quiz').addEventListener('click', () => {
            this.switchScreen('quiz');
        });

        // Lesson Navigation
        document.getElementById('prev-lesson').addEventListener('click', () => {
            this.previousLesson();
        });

        document.getElementById('next-lesson').addEventListener('click', () => {
            this.nextLesson();
        });

        // Quiz Actions
        document.getElementById('skip-question').addEventListener('click', () => {
            this.skipQuestion();
        });

        document.getElementById('submit-answer').addEventListener('click', () => {
            this.submitAnswer();
        });

        // Code Editor Actions
        document.getElementById('run-code').addEventListener('click', () => {
            this.runCode();
        });

        document.getElementById('check-solution').addEventListener('click', () => {
            this.checkSolution();
        });

        document.getElementById('get-hint').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('format-code').addEventListener('click', () => {
            this.formatCode();
        });

        document.getElementById('reset-code').addEventListener('click', () => {
            this.resetCode();
        });

        document.getElementById('clear-output').addEventListener('click', () => {
            this.clearOutput();
        });

        // Header Actions
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showContextualHint();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetProgress();
        });

        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Modal Controls
        document.getElementById('close-hint').addEventListener('click', () => {
            this.closeModal('hint-modal');
        });

        document.getElementById('close-explanation').addEventListener('click', () => {
            this.closeModal('explanation-modal');
        });

        document.getElementById('another-hint').addEventListener('click', () => {
            this.showAnotherHint();
        });

        document.getElementById('got-it').addEventListener('click', () => {
            this.closeModal('hint-modal');
        });

        document.getElementById('understand').addEventListener('click', () => {
            this.closeModal('explanation-modal');
        });

        // Results Actions
        document.getElementById('try-again').addEventListener('click', () => {
            this.resetQuiz();
        });

        document.getElementById('review-answers').addEventListener('click', () => {
            this.reviewAnswers();
        });

        document.getElementById('next-challenge').addEventListener('click', () => {
            this.switchScreen('code');
        });

        // Code Editor Events
        document.getElementById('editable-code').addEventListener('input', () => {
            this.updateLineNumbers();
            this.enableCheckSolution();
        });

        // Modal backdrop clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    // Screen Management
    switchScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

        // Initialize screen-specific content
        switch (screenName) {
            case 'lesson':
                this.initializeLesson();
                break;
            case 'quiz':
                this.initializeQuiz();
                break;
            case 'code':
                this.initializeCodeChallenge();
                break;
            case 'results':
                this.showResults();
                break;
        }
    }

    // Lesson System
    initializeFizzBuzzLessons() {
        return [
            {
                title: "What is FizzBuzz?",
                content: this.createLessonContent1(),
                type: "introduction"
            },
            {
                title: "Understanding the Pattern",
                content: this.createLessonContent2(),
                type: "pattern"
            },
            {
                title: "Step-by-Step Logic",
                content: this.createLessonContent3(),
                type: "logic"
            },
            {
                title: "Code Implementation",
                content: this.createLessonContent4(),
                type: "implementation"
            }
        ];
    }

    createLessonContent1() {
        return `
            <div class="lesson-section">
                <h3>Welcome to FizzBuzz! 🎯</h3>
                <p>FizzBuzz is a classic programming problem that tests your understanding of:</p>
                <ul>
                    <li><strong>Loops</strong> - Repeating actions</li>
                    <li><strong>Conditionals</strong> - Making decisions</li>
                    <li><strong>Modular arithmetic</strong> - Remainder operations</li>
                </ul>
                
                <div class="interactive-demo">
                    <h4>Try It Yourself!</h4>
                    <p>Enter a number to see what FizzBuzz would output:</p>
                    <div class="demo-controls">
                        <input type="number" id="demo-input" placeholder="Enter number" min="1" max="100">
                        <button class="demo-btn" onclick="app.demonstrateFizzBuzz()">Check</button>
                    </div>
                    <div class="demo-output" id="demo-output">
                        <div class="output-placeholder">
                            <i class="fas fa-play"></i>
                            <p>Enter a number to see the result</p>
                        </div>
                    </div>
                </div>
                
                <div class="key-points">
                    <h4>Key Rules:</h4>
                    <div class="rule-grid">
                        <div class="rule-item">
                            <div class="rule-number">3</div>
                            <div class="rule-text">If divisible by 3 → "Fizz"</div>
                        </div>
                        <div class="rule-item">
                            <div class="rule-number">5</div>
                            <div class="rule-text">If divisible by 5 → "Buzz"</div>
                        </div>
                        <div class="rule-item">
                            <div class="rule-number">15</div>
                            <div class="rule-text">If divisible by both → "FizzBuzz"</div>
                        </div>
                        <div class="rule-item">
                            <div class="rule-number">?</div>
                            <div class="rule-text">Otherwise → the number</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createLessonContent2() {
        return `
            <div class="lesson-section">
                <h3>Understanding the Pattern 🔍</h3>
                <p>Let's examine the first 15 numbers to see the pattern:</p>
                
                <div class="pattern-visualization" id="pattern-viz">
                    <div class="pattern-grid">
                        ${this.generatePatternGrid()}
                    </div>
                </div>
                
                <div class="pattern-explanation">
                    <h4>Why This Pattern?</h4>
                    <p>The magic happens with the <strong>modulo operator (%)</strong>:</p>
                    <ul>
                        <li><code>n % 3 === 0</code> means n is divisible by 3</li>
                        <li><code>n % 5 === 0</code> means n is divisible by 5</li>
                        <li><code>n % 15 === 0</code> means n is divisible by both 3 and 5</li>
                    </ul>
                </div>
                
                <div class="interactive-demo">
                    <h4>Explore the Pattern</h4>
                    <div class="demo-controls">
                        <button class="demo-btn" onclick="app.highlightPattern('fizz')">Highlight Fizz</button>
                        <button class="demo-btn" onclick="app.highlightPattern('buzz')">Highlight Buzz</button>
                        <button class="demo-btn" onclick="app.highlightPattern('fizzbuzz')">Highlight FizzBuzz</button>
                        <button class="demo-btn" onclick="app.highlightPattern('reset')">Reset</button>
                    </div>
                </div>
            </div>
        `;
    }

    createLessonContent3() {
        return `
            <div class="lesson-section">
                <h3>Step-by-Step Logic 🧠</h3>
                <p>Let's break down the thinking process:</p>
                
                <div class="logic-steps">
                    <div class="step-flow">
                        <div class="flow-step" data-step="1">
                            <div class="step-icon">1</div>
                            <div class="step-content">
                                <h4>Start with a number</h4>
                                <p>For example: <code>n = 15</code></p>
                            </div>
                        </div>
                        
                        <div class="flow-arrow">↓</div>
                        
                        <div class="flow-step" data-step="2">
                            <div class="step-icon">2</div>
                            <div class="step-content">
                                <h4>Check divisibility by both 3 AND 5</h4>
                                <p><code>n % 3 === 0 && n % 5 === 0</code></p>
                                <p class="result">15 % 3 = 0 ✓ AND 15 % 5 = 0 ✓</p>
                            </div>
                        </div>
                        
                        <div class="flow-arrow">↓</div>
                        
                        <div class="flow-step" data-step="3">
                            <div class="step-icon">3</div>
                            <div class="step-content">
                                <h4>If true, return "FizzBuzz"</h4>
                                <p class="result success">Result: "FizzBuzz" 🎉</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="logic-interactive">
                    <h4>Test Your Understanding</h4>
                    <p>What would happen with number 9?</p>
                    <div class="demo-controls">
                        <button class="demo-btn" onclick="app.walkThroughLogic(9)">Walk Through Logic</button>
                    </div>
                    <div class="demo-output" id="logic-output"></div>
                </div>
                
                <div class="decision-tree">
                    <h4>The Complete Decision Tree</h4>
                    <div class="tree-diagram">
                        <div class="tree-node root">
                            <span>Number n</span>
                        </div>
                        <div class="tree-branches">
                            <div class="branch">
                                <div class="condition">n % 15 === 0?</div>
                                <div class="result">→ "FizzBuzz"</div>
                            </div>
                            <div class="branch">
                                <div class="condition">n % 3 === 0?</div>
                                <div class="result">→ "Fizz"</div>
                            </div>
                            <div class="branch">
                                <div class="condition">n % 5 === 0?</div>
                                <div class="result">→ "Buzz"</div>
                            </div>
                            <div class="branch">
                                <div class="condition">else</div>
                                <div class="result">→ n</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createLessonContent4() {
        return `
            <div class="lesson-section">
                <h3>Code Implementation 💻</h3>
                <p>Now let's see how to write this in JavaScript:</p>
                
                <div class="code-example">
                    <h4>Basic FizzBuzz Function</h4>
                    <pre><code class="language-javascript">
function fizzBuzz(n) {
    if (n % 15 === 0) {
        return "FizzBuzz";
    } else if (n % 3 === 0) {
        return "Fizz";
    } else if (n % 5 === 0) {
        return "Buzz";
    } else {
        return n.toString();
    }
}

// Test it out
for (let i = 1; i <= 15; i++) {
    console.log(fizzBuzz(i));
}
                    </code></pre>
                </div>
                
                <div class="implementation-tips">
                    <h4>💡 Implementation Tips</h4>
                    <div class="tip-cards">
                        <div class="tip-card">
                            <div class="tip-icon">🔢</div>
                            <div class="tip-content">
                                <h5>Order Matters!</h5>
                                <p>Always check for FizzBuzz (divisible by both) first, then individual conditions.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon">⚡</div>
                            <div class="tip-content">
                                <h5>Efficiency</h5>
                                <p>Using <code>n % 15 === 0</code> is more efficient than checking both conditions.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon">🧪</div>
                            <div class="tip-content">
                                <h5>Test Edge Cases</h5>
                                <p>Always test with numbers like 0, 1, 3, 5, 15, 30 to ensure correctness.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="variations">
                    <h4>Fun Variations to Try</h4>
                    <ul>
                        <li><strong>FizzBuzzPop:</strong> Add "Pop" for multiples of 7</li>
                        <li><strong>Custom Rules:</strong> Use different numbers like 4 and 6</li>
                        <li><strong>String Concatenation:</strong> Build result by adding pieces</li>
                    </ul>
                </div>
            </div>
        `;
    }

    generatePatternGrid() {
        let html = '';
        for (let i = 1; i <= 15; i++) {
            const result = this.getFizzBuzzResult(i);
            const classes = this.getPatternClasses(i);
            html += `
                <div class="pattern-item ${classes}" data-number="${i}" style="--animation-delay: ${i}">
                    <div class="pattern-number">${i}</div>
                    <div class="pattern-result">${result}</div>
                </div>
            `;
        }
        return html;
    }

    getPatternClasses(n) {
        if (n % 15 === 0) return 'fizzbuzz-item';
        if (n % 3 === 0) return 'fizz-item';
        if (n % 5 === 0) return 'buzz-item';
        return 'number-item';
    }

    getFizzBuzzResult(n) {
        if (n % 15 === 0) return "FizzBuzz";
        if (n % 3 === 0) return "Fizz";
        if (n % 5 === 0) return "Buzz";
        return n.toString();
    }

    // Two Sum Lesson System
    initializeTwoSumLessons() {
        return [
            {
                title: "Understanding Two Sum Problem",
                content: this.createTwoSumLessonContent1(),
                type: "introduction"
            },
            {
                title: "Hash Map Approach",
                content: this.createTwoSumLessonContent2(),
                type: "optimization"
            },
            {
                title: "Time Complexity Analysis",
                content: this.createTwoSumLessonContent3(),
                type: "analysis"
            },
            {
                title: "Implementation Strategies",
                content: this.createTwoSumLessonContent4(),
                type: "implementation"
            }
        ];
    }

    createTwoSumLessonContent1() {
        return `
            <div class="lesson-section">
                <h3>Welcome to Two Sum! 🎯</h3>
                <p>The Two Sum problem is fundamental in understanding:</p>
                <ul>
                    <li><strong>Hash Maps</strong> - Key-value pair lookups</li>
                    <li><strong>Time Complexity</strong> - Efficiency optimization</li>
                    <li><strong>Array Traversal</strong> - Different iteration strategies</li>
                </ul>
                
                <div class="problem-statement">
                    <h4>Problem Statement</h4>
                    <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                    <div class="example-box">
                        <h5>Example:</h5>
                        <code>Input: nums = [2,7,11,15], target = 9</code><br>
                        <code>Output: [0,1]</code><br>
                        <p>Because nums[0] + nums[1] = 2 + 7 = 9</p>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h4>Try It Yourself!</h4>
                    <p>Enter an array and target to see the solution:</p>
                    <div class="demo-controls">
                        <input type="text" id="twosum-array" placeholder="Enter array: 2,7,11,15" value="2,7,11,15">
                        <input type="number" id="twosum-target" placeholder="Target" value="9">
                        <button class="demo-btn" onclick="app.demonstrateTwoSum()">Find Pair</button>
                    </div>
                    <div class="demo-output" id="twosum-output">
                        <div class="output-placeholder">
                            <i class="fas fa-play"></i>
                            <p>Enter values to see the result</p>
                        </div>
                    </div>
                </div>
                
                <div class="key-points">
                    <h4>Key Insights:</h4>
                    <div class="insight-grid">
                        <div class="insight-item">
                            <div class="insight-icon">🔍</div>
                            <div class="insight-text">We need to find two numbers that sum to target</div>
                        </div>
                        <div class="insight-item">
                            <div class="insight-icon">📝</div>
                            <div class="insight-text">Return the indices, not the values</div>
                        </div>
                        <div class="insight-item">
                            <div class="insight-icon">⚡</div>
                            <div class="insight-text">Can we do better than checking all pairs?</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createTwoSumLessonContent2() {
        return `
            <div class="lesson-section">
                <h3>Hash Map Approach 🗺️</h3>
                <p>The key insight: instead of checking all pairs, we can use a hash map to store complements!</p>
                
                <div class="approach-visualization">
                    <h4>The Hash Map Strategy</h4>
                    <div class="strategy-steps">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h5>Calculate Complement</h5>
                                <p>For each number, calculate: <code>complement = target - current_number</code></p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h5>Check Hash Map</h5>
                                <p>If complement exists in our map, we found our pair!</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h5>Store Current</h5>
                                <p>Add current number and its index to the map</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-table">
                    <h4>Approach Comparison</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Approach</th>
                                <th>Time Complexity</th>
                                <th>Space Complexity</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Brute Force</td>
                                <td>O(n²)</td>
                                <td>O(1)</td>
                                <td>Check all pairs</td>
                            </tr>
                            <tr class="highlight">
                                <td>Hash Map</td>
                                <td>O(n)</td>
                                <td>O(n)</td>
                                <td>One pass with lookup</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    createTwoSumLessonContent3() {
        return `
            <div class="lesson-section">
                <h3>Time Complexity Analysis ⏱️</h3>
                <p>Understanding why the hash map approach is so much faster:</p>
                
                <div class="complexity-comparison">
                    <div class="complexity-card brute-force">
                        <h4>Brute Force: O(n²)</h4>
                        <div class="complexity-visual">
                            <div class="nested-loops">
                                <div class="outer-loop">Outer Loop: n iterations</div>
                                <div class="inner-loop">Inner Loop: n-1 iterations each</div>
                            </div>
                        </div>
                        <p>Total operations: n × (n-1) / 2 ≈ n²</p>
                        <div class="example-size">
                            <p>For 1000 elements: ~500,000 operations</p>
                        </div>
                    </div>
                    
                    <div class="complexity-card hash-map">
                        <h4>Hash Map: O(n)</h4>
                        <div class="complexity-visual">
                            <div class="single-loop">
                                <div class="loop">Single Loop: n iterations</div>
                                <div class="lookup">Hash lookup: O(1) each</div>
                            </div>
                        </div>
                        <p>Total operations: n</p>
                        <div class="example-size">
                            <p>For 1000 elements: ~1,000 operations</p>
                        </div>
                    </div>
                </div>
                
                <div class="space-complexity">
                    <h4>Space Complexity Trade-off</h4>
                    <p>The hash map approach uses O(n) extra space, but the time savings are usually worth it:</p>
                    <ul>
                        <li><strong>Hash Map Storage:</strong> At most n entries (worst case)</li>
                        <li><strong>Memory vs Speed:</strong> We trade memory for significantly faster execution</li>
                        <li><strong>Real-world Impact:</strong> For large datasets, this trade-off is almost always beneficial</li>
                    </ul>
                </div>
            </div>
        `;
    }

    createTwoSumLessonContent4() {
        return `
            <div class="lesson-section">
                <h3>Implementation Strategies 💻</h3>
                <p>Let's see the Two Sum implementation in JavaScript:</p>
                
                <div class="code-example">
                    <h4>Efficient Two Sum Function</h4>
                    <pre><code class="language-javascript">
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Test it out
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // [0, 1]
                    </code></pre>
                </div>
                
                <div class="implementation-tips">
                    <h4>💡 Implementation Tips</h4>
                    <div class="tip-cards">
                        <div class="tip-card">
                            <div class="tip-icon">🔢</div>
                            <div class="tip-content">
                                <h5>Check Before Store!</h5>
                                <p>Always check for complement before storing current number to avoid using same element twice.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon">⚡</div>
                            <div class="tip-content">
                                <h5>O(1) Lookups</h5>
                                <p>Hash map provides average O(1) lookup time, making the algorithm efficient.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <div class="tip-icon">🧪</div>
                            <div class="tip-content">
                                <h5>Edge Cases</h5>
                                <p>Handle duplicates, no solution, and negative numbers in your implementation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Two Sum Interactive Methods
    demonstrateTwoSum() {
        const arrayInput = document.getElementById('twosum-array');
        const targetInput = document.getElementById('twosum-target');
        const output = document.getElementById('twosum-output');
        
        try {
            const nums = arrayInput.value.split(',').map(n => parseInt(n.trim()));
            const target = parseInt(targetInput.value);
            
            if (nums.some(isNaN) || isNaN(target)) {
                output.innerHTML = '<div class="error">Please enter valid numbers</div>';
                return;
            }
            
            const result = this.solveTwoSum(nums, target);
            const explanation = this.explainTwoSumResult(nums, target, result);
            
            output.innerHTML = `
                <div class="demo-result">
                    <div class="result-display">
                        <span class="input-array">[${nums.join(', ')}]</span>
                        <span class="target-display">target: ${target}</span>
                        <span class="arrow">→</span>
                        <span class="output-result">[${result.join(', ')}]</span>
                    </div>
                    <div class="result-explanation">${explanation}</div>
                </div>
            `;
        } catch (error) {
            output.innerHTML = '<div class="error">Please check your input format</div>';
        }
    }
    
    solveTwoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
                return [map.get(complement), i];
            }
            map.set(nums[i], i);
        }
        return [];
    }
    
    explainTwoSumResult(nums, target, result) {
        if (result.length === 0) {
            return `No two numbers in the array sum to ${target}`;
        }
        const [i, j] = result;
        return `nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${nums[i] + nums[j]} = ${target}`;
    }

    // Default lesson method for backward compatibility
    initializeLessons() {
        return this.initializeFizzBuzzLessons();
    }

    initializeLesson() {
        this.updateLessonUI();
        this.renderCurrentLesson();
    }

    updateLessonUI() {
        document.getElementById('lesson-title').textContent = this.lessons[this.currentLesson].title;
        document.getElementById('lesson-step').textContent = this.currentLesson + 1;
        document.getElementById('total-steps').textContent = this.lessons.length;
        
        // Update navigation buttons
        document.getElementById('prev-lesson').disabled = this.currentLesson === 0;
        // Don't disable next button on last lesson, allow quiz transition
        
        if (this.currentLesson === this.lessons.length - 1) {
            document.getElementById('next-lesson').innerHTML = 'Start Quiz <i class="fas fa-arrow-right"></i>';
        } else {
            document.getElementById('next-lesson').innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }

    renderCurrentLesson() {
        const lesson = this.lessons[this.currentLesson];
        document.getElementById('lesson-container').innerHTML = lesson.content;
        
        // Add syntax highlighting if Prism.js is available
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    nextLesson() {
        if (this.currentLesson < this.lessons.length - 1) {
            this.currentLesson++;
            this.progress.completedLessons.push(this.currentLesson - 1);
            this.updateLessonUI();
            this.renderCurrentLesson();
            this.updateProgress();
        } else {
            // Mark final lesson as completed and move to quiz
            this.progress.completedLessons.push(this.currentLesson);
            this.updateProgress();
            this.switchScreen('quiz');
        }
    }

    previousLesson() {
        if (this.currentLesson > 0) {
            this.currentLesson--;
            this.updateLessonUI();
            this.renderCurrentLesson();
        }
    }

    // Interactive Lesson Methods
    demonstrateFizzBuzz() {
        const input = document.getElementById('demo-input');
        const output = document.getElementById('demo-output');
        const n = parseInt(input.value);
        
        if (isNaN(n) || n < 1) {
            output.innerHTML = '<div class="error">Please enter a valid number (1 or greater)</div>';
            return;
        }
        
        const result = this.getFizzBuzzResult(n);
        const explanation = this.explainFizzBuzzResult(n, result);
        
        output.innerHTML = `
            <div class="demo-result">
                <div class="result-display">
                    <span class="input-number">${n}</span>
                    <span class="arrow">→</span>
                    <span class="output-result ${this.getResultClass(result)}">${result}</span>
                </div>
                <div class="result-explanation">${explanation}</div>
            </div>
        `;
    }

    explainFizzBuzzResult(n, result) {
        if (n % 15 === 0) {
            return `${n} is divisible by both 3 and 5 (${n}/3 = ${n/3}, ${n}/5 = ${n/5}), so we return "FizzBuzz"`;
        } else if (n % 3 === 0) {
            return `${n} is divisible by 3 (${n}/3 = ${n/3}) but not by 5, so we return "Fizz"`;
        } else if (n % 5 === 0) {
            return `${n} is divisible by 5 (${n}/5 = ${n/5}) but not by 3, so we return "Buzz"`;
        } else {
            return `${n} is not divisible by 3 or 5, so we return the number itself: ${n}`;
        }
    }

    getResultClass(result) {
        if (result === "FizzBuzz") return "fizzbuzz-result";
        if (result === "Fizz") return "fizz-result";
        if (result === "Buzz") return "buzz-result";
        return "number-result";
    }

    highlightPattern(type) {
        // Use the enhanced version if available
        if (this.highlightPatternAdvanced) {
            this.highlightPatternAdvanced(type);
            return;
        }
        
        const items = document.querySelectorAll('.pattern-item');
        
        items.forEach(item => {
            item.classList.remove('highlighted', 'dimmed');
            
            if (type === 'reset') return;
            
            const classes = item.className;
            const shouldHighlight = 
                (type === 'fizz' && classes.includes('fizz-item') && !classes.includes('fizzbuzz-item')) ||
                (type === 'buzz' && classes.includes('buzz-item') && !classes.includes('fizzbuzz-item')) ||
                (type === 'fizzbuzz' && classes.includes('fizzbuzz-item'));
                
            if (shouldHighlight) {
                item.classList.add('highlighted');
            } else {
                item.classList.add('dimmed');
            }
        });
    }

    walkThroughLogic(n) {
        const output = document.getElementById('logic-output');
        const steps = [];
        
        steps.push(`Starting with number: ${n}`);
        steps.push(`Check if ${n} % 15 === 0: ${n % 15} ${n % 15 === 0 ? '✓' : '✗'}`);
        
        if (n % 15 === 0) {
            steps.push(`Result: "FizzBuzz" 🎉`);
        } else {
            steps.push(`Check if ${n} % 3 === 0: ${n % 3} ${n % 3 === 0 ? '✓' : '✗'}`);
            if (n % 3 === 0) {
                steps.push(`Result: "Fizz" ⚡`);
            } else {
                steps.push(`Check if ${n} % 5 === 0: ${n % 5} ${n % 5 === 0 ? '✓' : '✗'}`);
                if (n % 5 === 0) {
                    steps.push(`Result: "Buzz" 🔥`);
                } else {
                    steps.push(`Result: ${n} (the number itself) 📝`);
                }
            }
        }
        
        output.innerHTML = `
            <div class="logic-walkthrough">
                ${steps.map((step, index) => `
                    <div class="logic-step" style="animation-delay: ${index * 0.3}s">
                        <span class="step-number">${index + 1}</span>
                        <span class="step-text">${step}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Quiz System - FizzBuzz
    initializeFizzBuzzQuestions() {
        return [
            {
                id: 1,
                type: "multiple-choice",
                question: "What would be the output for the number 6?",
                options: ["6", "Fizz", "Buzz", "FizzBuzz"],
                correct: 1,
                explanation: "6 is divisible by 3 (6 ÷ 3 = 2), but not by 5, so the output is 'Fizz'.",
                difficulty: "easy"
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "What would be the output for the number 25?",
                options: ["25", "Fizz", "Buzz", "FizzBuzz"],
                correct: 2,
                explanation: "25 is divisible by 5 (25 ÷ 5 = 5), but not by 3, so the output is 'Buzz'.",
                difficulty: "easy"
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "What would be the output for the number 30?",
                options: ["30", "Fizz", "Buzz", "FizzBuzz"],
                correct: 3,
                explanation: "30 is divisible by both 3 (30 ÷ 3 = 10) and 5 (30 ÷ 5 = 6), so the output is 'FizzBuzz'.",
                difficulty: "medium"
            },
            {
                id: 4,
                type: "code-input",
                question: "Complete this FizzBuzz function:\n\n```javascript\nfunction fizzBuzz(n) {\n    if (n % ___ === 0) {\n        return \"FizzBuzz\";\n    }\n    // ... rest of function\n}\n```\n\nWhat number should replace the blank?",
                answer: "15",
                explanation: "To check if a number is divisible by both 3 and 5, we can check if it's divisible by 15 (3 × 5 = 15).",
                difficulty: "medium"
            },
            {
                id: 5,
                type: "multiple-choice",
                question: "Why do we check for FizzBuzz (divisible by 15) first in our conditionals?",
                options: [
                    "It's more efficient",
                    "To prevent 'Fizz' or 'Buzz' from being returned for numbers that should be 'FizzBuzz'",
                    "It's a programming convention",
                    "It doesn't matter the order"
                ],
                correct: 1,
                explanation: "We check FizzBuzz first because if we checked divisibility by 3 first, numbers like 15 would return 'Fizz' instead of 'FizzBuzz'.",
                difficulty: "hard"
            },
            {
                id: 6,
                type: "sequence",
                question: "What would be the sequence for numbers 13, 14, 15, 16?",
                options: ["13, 14, FizzBuzz, 16", "13, Buzz, Fizz, 16", "Fizz, Buzz, FizzBuzz, Fizz", "13, 14, 15, 16"],
                correct: 0,
                explanation: "13 and 14 are not divisible by 3 or 5, 15 is divisible by both (FizzBuzz), and 16 is not divisible by either.",
                difficulty: "medium"
            },
            {
                id: 7,
                type: "debug",
                question: "What's wrong with this code?\n\n```javascript\nif (n % 3 === 0) return 'Fizz';\nif (n % 5 === 0) return 'Buzz';\nif (n % 15 === 0) return 'FizzBuzz';\n```",
                options: [
                    "Nothing is wrong",
                    "The FizzBuzz condition will never execute",
                    "The syntax is incorrect",
                    "Missing else statements"
                ],
                correct: 1,
                explanation: "The FizzBuzz condition should come first. As written, numbers divisible by 15 will return 'Fizz' (since they're also divisible by 3) and never reach the FizzBuzz condition.",
                difficulty: "hard"
            },
            {
                id: 8,
                type: "multiple-choice",
                question: "What would be the output for the number 7?",
                options: ["7", "Fizz", "Buzz", "FizzBuzz"],
                correct: 0,
                explanation: "7 is not divisible by 3 or 5, so we return the number itself: 7.",
                difficulty: "easy"
            },
            {
                id: 9,
                type: "multiple-choice",
                question: "How many times would 'Fizz' appear in the sequence from 1 to 30 (excluding FizzBuzz)?",
                options: ["8", "9", "10", "6"],
                correct: 3,
                explanation: "Fizz appears for: 3, 6, 9, 12, 18, 21, 24, 27. That's 8 times. (15 and 30 are FizzBuzz, not Fizz)",
                difficulty: "hard"
            },
            {
                id: 10,
                type: "application",
                question: "If we modified FizzBuzz to use 4 and 7 instead of 3 and 5, what would be the output for 28?",
                options: ["28", "Fizz", "Buzz", "FizzBuzz"],
                correct: 3,
                explanation: "28 is divisible by both 4 (28 ÷ 4 = 7) and 7 (28 ÷ 7 = 4), so it would be 'FizzBuzz' in this modified version.",
                difficulty: "hard"
            }
        ];
    }

    // Two Sum Quiz System
    initializeTwoSumQuestions() {
        return [
            {
                id: 1,
                type: "multiple-choice",
                question: "What is the time complexity of the hash map approach for Two Sum?",
                options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
                correct: 2,
                explanation: "The hash map approach uses a single pass through the array with O(1) hash map operations, resulting in O(n) time complexity.",
                difficulty: "medium"
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "For the array [2, 7, 11, 15] with target 9, what indices should be returned?",
                options: ["[2, 7]", "[0, 1]", "[1, 2]", "[7, 2]"],
                correct: 1,
                explanation: "The values at indices 0 and 1 are 2 and 7, which sum to 9. We return the indices, not the values.",
                difficulty: "easy"
            },
            {
                id: 3,
                type: "code-input",
                question: "In the hash map approach, what should we store as the key and value?\\n\\nKey: ____\\nValue: ____",
                answer: "number, index",
                explanation: "We store the number as the key and its index as the value, so we can quickly look up if a complement exists and retrieve its index.",
                difficulty: "medium"
            },
            {
                id: 4,
                type: "multiple-choice",
                question: "What is the space complexity of the hash map approach?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correct: 2,
                explanation: "In the worst case, we might store all n elements in the hash map before finding a solution, so space complexity is O(n).",
                difficulty: "medium"
            },
            {
                id: 5,
                type: "debug",
                question: "What's wrong with this Two Sum implementation?\\n\\n```javascript\\nfunction twoSum(nums, target) {\\n    const map = new Map();\\n    for (let i = 0; i < nums.length; i++) {\\n        map.set(nums[i], i);\\n        const complement = target - nums[i];\\n        if (map.has(complement)) {\\n            return [map.get(complement), i];\\n        }\\n    }\\n}\\n```",
                options: [
                    "Nothing is wrong",
                    "We store in map before checking, so we might use the same element twice",
                    "The complement calculation is incorrect",
                    "Missing return statement"
                ],
                correct: 1,
                explanation: "We should check for the complement BEFORE storing the current number in the map to avoid using the same element twice.",
                difficulty: "hard"
            },
            {
                id: 6,
                type: "application",
                question: "For array [3, 2, 4] with target 6, what happens in the hash map approach?",
                options: [
                    "Returns [0, 0] (using 3 twice)",
                    "Returns [1, 2] (indices of 2 and 4)",
                    "Returns no solution",
                    "Throws an error"
                ],
                correct: 1,
                explanation: "The algorithm correctly finds that 2 + 4 = 6 and returns their indices [1, 2]. It won't use the same element twice.",
                difficulty: "medium"
            },
            {
                id: 7,
                type: "multiple-choice",
                question: "Why is the hash map approach faster than brute force?",
                options: [
                    "It uses less memory",
                    "It avoids nested loops by using O(1) lookups",
                    "It sorts the array first",
                    "It uses recursion"
                ],
                correct: 1,
                explanation: "Instead of checking all pairs (O(n²)), we use hash map's O(1) average lookup time to find complements in a single pass (O(n)).",
                difficulty: "medium"
            },
            {
                id: 8,
                type: "sequence",
                question: "What's the correct order of operations in each iteration?",
                options: [
                    "Calculate complement → Check map → Store current",
                    "Store current → Calculate complement → Check map",
                    "Check map → Calculate complement → Store current",
                    "Calculate complement → Store current → Check map"
                ],
                correct: 0,
                explanation: "We first calculate the complement, then check if it's in our map. Only if it's not found do we store the current number.",
                difficulty: "hard"
            }
        ];
    }

    // Default quiz method for backward compatibility
    initializeQuestions() {
        return this.initializeFizzBuzzQuestions();
    }

    initializeQuiz() {
        this.quizState.currentQuestionIndex = 0;
        this.quizState.answers = [];
        this.quizState.score = 0;
        this.updateQuizUI();
        this.renderCurrentQuestion();
        this.startTimer();
    }

    updateQuizUI() {
        document.getElementById('current-question').textContent = this.quizState.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    renderCurrentQuestion() {
        const question = this.questions[this.quizState.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        let questionHTML = `
            <div class="question-header">
                <h3>Question ${this.quizState.currentQuestionIndex + 1}</h3>
                <div class="difficulty-badge ${question.difficulty}">
                    <i class="fas fa-star"></i>
                    ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </div>
            </div>
            <div class="question-text">${question.question}</div>
        `;
        
        switch (question.type) {
            case 'multiple-choice':
            case 'sequence':
            case 'debug':
            case 'application':
                questionHTML += this.renderMultipleChoice(question);
                break;
            case 'code-input':
                questionHTML += this.renderCodeInput(question);
                break;
        }
        
        container.innerHTML = questionHTML;
        
        // Add event listeners for options
        container.querySelectorAll('.choice-option').forEach((option, index) => {
            option.addEventListener('click', () => this.selectAnswer(index));
        });
    }

    renderMultipleChoice(question) {
        return `
            <div class="multiple-choice">
                ${question.options.map((option, index) => `
                    <div class="choice-option" data-index="${index}">
                        <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="choice-text">${option}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCodeInput(question) {
        return `
            <div class="code-question">
                <textarea class="code-input" placeholder="Enter your answer here..." id="code-answer"></textarea>
            </div>
        `;
    }

    selectAnswer(index) {
        // Remove previous selection
        document.querySelectorAll('.choice-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Select new option
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        
        // Enable submit button
        document.getElementById('submit-answer').disabled = false;
    }

    submitAnswer() {
        const question = this.questions[this.quizState.currentQuestionIndex];
        let userAnswer = null;
        let isCorrect = false;
        
        if (question.type === 'code-input') {
            userAnswer = document.getElementById('code-answer').value.trim();
            isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
        } else {
            const selected = document.querySelector('.choice-option.selected');
            if (selected) {
                userAnswer = parseInt(selected.dataset.index);
                isCorrect = userAnswer === question.correct;
            }
        }
        
        // Store answer
        this.quizState.answers.push({
            questionId: question.id,
            userAnswer,
            correct: isCorrect,
            timeSpent: 30 - this.quizState.timeRemaining
        });
        
        // Update score and streak
        if (isCorrect) {
            this.quizState.score++;
            this.progress.streak++;
            this.progress.maxStreak = Math.max(this.progress.maxStreak, this.progress.streak);
            this.createSuccessEffect();
        } else {
            this.progress.streak = 0;
            this.createErrorEffect();
        }
        
        // Show explanation
        this.showExplanation(question, isCorrect);
        
        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }

    nextQuestion() {
        if (this.quizState.currentQuestionIndex < this.questions.length - 1) {
            this.quizState.currentQuestionIndex++;
            this.updateQuizUI();
            this.renderCurrentQuestion();
            this.resetTimer();
            document.getElementById('submit-answer').disabled = true;
        } else {
            this.finishQuiz();
        }
    }

    skipQuestion() {
        this.quizState.answers.push({
            questionId: this.questions[this.quizState.currentQuestionIndex].id,
            userAnswer: null,
            correct: false,
            timeSpent: 30 - this.quizState.timeRemaining,
            skipped: true
        });
        
        this.progress.streak = 0;
        this.nextQuestion();
    }

    startTimer() {
        this.quizState.timeRemaining = 30;
        this.updateTimer();
        
        this.quizState.timer = setInterval(() => {
            this.quizState.timeRemaining--;
            this.updateTimer();
            
            if (this.quizState.timeRemaining <= 0) {
                this.submitAnswer(); // Auto-submit when time runs out
            }
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.quizState.timer);
        this.startTimer();
    }

    updateTimer() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.quizState.timeRemaining;
        
        if (this.quizState.timeRemaining <= 10) {
            timerElement.parentElement.classList.add('warning');
        } else {
            timerElement.parentElement.classList.remove('warning');
        }
    }

    finishQuiz() {
        clearInterval(this.quizState.timer);
        this.calculateFinalScore();
        this.switchScreen('results');
    }

    // Code Challenge System - FizzBuzz
    initializeFizzBuzzChallenges() {
        return [
            {
                id: 1,
                title: "Basic FizzBuzz Implementation",
                difficulty: "Beginner",
                description: "Complete the FizzBuzz function that returns the correct output for a given number.",
                instructions: `
                    <h4>Your Task:</h4>
                    <p>Complete the FizzBuzz function below. The function should:</p>
                    <ul>
                        <li>Return "FizzBuzz" if the number is divisible by both 3 and 5</li>
                        <li>Return "Fizz" if the number is divisible by 3 only</li>
                        <li>Return "Buzz" if the number is divisible by 5 only</li>
                        <li>Return the number as a string if none of the above conditions are met</li>
                    </ul>
                    <p><strong>Hint:</strong> Use the modulo operator (%) to check divisibility!</p>
                `,
                starterCode: `function fizzBuzz(n) {
    // Your code here
    // Remember to check for FizzBuzz first!
    
    if (/* condition for FizzBuzz */) {
        return "FizzBuzz";
    } else if (/* condition for Fizz */) {
        return "Fizz";
    } else if (/* condition for Buzz */) {
        return "Buzz";
    } else {
        return /* what should we return here? */;
    }
}

// Test your function
console.log(fizzBuzz(3));   // Should output: "Fizz"
console.log(fizzBuzz(5));   // Should output: "Buzz"
console.log(fizzBuzz(15));  // Should output: "FizzBuzz"
console.log(fizzBuzz(7));   // Should output: "7"`,
                solution: `function fizzBuzz(n) {
    if (n % 15 === 0) {
        return "FizzBuzz";
    } else if (n % 3 === 0) {
        return "Fizz";
    } else if (n % 5 === 0) {
        return "Buzz";
    } else {
        return n.toString();
    }
}`,
                testCases: [
                    { input: 3, expected: "Fizz" },
                    { input: 5, expected: "Buzz" },
                    { input: 15, expected: "FizzBuzz" },
                    { input: 7, expected: "7" },
                    { input: 30, expected: "FizzBuzz" },
                    { input: 1, expected: "1" }
                ],
                hints: [
                    "Use the modulo operator (%) to check if a number is divisible by another",
                    "n % 3 === 0 means n is divisible by 3",
                    "Check for FizzBuzz (divisible by both 3 and 5) first!",
                    "You can check for divisibility by both 3 and 5 using n % 15 === 0"
                ]
            },
            {
                id: 2,
                title: "FizzBuzz Range Generator",
                difficulty: "Intermediate",
                description: "Create a function that generates FizzBuzz output for a range of numbers.",
                instructions: `
                    <h4>Your Task:</h4>
                    <p>Create a function that generates FizzBuzz output for numbers from start to end (inclusive).</p>
                    <ul>
                        <li>The function should take two parameters: start and end</li>
                        <li>Return an array of FizzBuzz results</li>
                        <li>Handle edge cases like negative numbers or invalid ranges</li>
                    </ul>
                `,
                starterCode: `function fizzBuzzRange(start, end) {
    // Validate input
    if (/* invalid range check */) {
        return [];
    }
    
    const result = [];
    
    for (let i = start; i <= end; i++) {
        // Use your fizzBuzz logic here
        result.push(/* FizzBuzz result for i */);
    }
    
    return result;
}

// Helper function - implement this first
function fizzBuzz(n) {
    // Your FizzBuzz implementation
}

// Test your function
console.log(fizzBuzzRange(1, 15));`,
                solution: `function fizzBuzzRange(start, end) {
    if (start > end || start < 1) {
        return [];
    }
    
    const result = [];
    
    for (let i = start; i <= end; i++) {
        result.push(fizzBuzz(i));
    }
    
    return result;
}

function fizzBuzz(n) {
    if (n % 15 === 0) {
        return "FizzBuzz";
    } else if (n % 3 === 0) {
        return "Fizz";
    } else if (n % 5 === 0) {
        return "Buzz";
    } else {
        return n.toString();
    }
}`,
                testCases: [
                    { input: [1, 5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
                    { input: [13, 17], expected: ["13", "14", "FizzBuzz", "16", "17"] },
                    { input: [5, 3], expected: [] },
                    { input: [0, 3], expected: [] }
                ],
                hints: [
                    "Validate that start <= end and start >= 1",
                    "Use a for loop to iterate from start to end",
                    "Reuse your fizzBuzz function for each number",
                    "Push each result to the array"
                ]
            }
        ];
    }

    // Two Sum Challenge System
    initializeTwoSumChallenges() {
        return [
            {
                id: 1,
                title: "Basic Two Sum Implementation",
                difficulty: "Intermediate",
                description: "Implement the Two Sum algorithm using the hash map approach.",
                instructions: `
                    <h4>Your Task:</h4>
                    <p>Complete the Two Sum function using the efficient hash map approach. The function should:</p>
                    <ul>
                        <li>Take an array of numbers and a target sum</li>
                        <li>Return an array with indices of two numbers that sum to target</li>
                        <li>Use a hash map for O(n) time complexity</li>
                        <li>Handle the case where no solution exists</li>
                    </ul>
                    <p><strong>Hint:</strong> Store each number and its index in a Map, then check for complements!</p>
                `,
                starterCode: `function twoSum(nums, target) {
    // Create a Map to store numbers and their indices
    const map = new Map();
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate what number we need (complement)
        const complement = /* your code here */;
        
        // Check if complement exists in our map
        if (/* your condition here */) {
            // Found a pair! Return the indices
            return [/* complement index */, /* current index */];
        }
        
        // Store current number and its index
        map.set(/* key */, /* value */);
    }
    
    // No solution found
    return [];
}

// Test your function
console.log(twoSum([2, 7, 11, 15], 9));  // Should output: [0, 1]
console.log(twoSum([3, 2, 4], 6));       // Should output: [1, 2]
console.log(twoSum([3, 3], 6));          // Should output: [0, 1]`,
                solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
                testCases: [
                    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
                    { input: [[3, 2, 4], 6], expected: [1, 2] },
                    { input: [[3, 3], 6], expected: [0, 1] },
                    { input: [[1, 2, 3], 7], expected: [] },
                    { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] }
                ],
                hints: [
                    "The complement is target - current_number",
                    "Use map.has(complement) to check if complement exists",
                    "Use map.get(complement) to get the stored index",
                    "Store the number as key and index as value: map.set(nums[i], i)"
                ]
            },
            {
                id: 2,
                title: "Two Sum with Return Values",
                difficulty: "Advanced",
                description: "Modify Two Sum to return the actual values instead of indices.",
                instructions: `
                    <h4>Your Task:</h4>
                    <p>Create a variant of Two Sum that returns the actual values that sum to target:</p>
                    <ul>
                        <li>Return the two numbers (values) that sum to target</li>
                        <li>Still use the efficient hash map approach</li>
                        <li>Return empty array if no solution exists</li>
                        <li>Maintain O(n) time complexity</li>
                    </ul>
                `,
                starterCode: `function twoSumValues(nums, target) {
    // Your implementation here
    // This time return the values, not the indices
    
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = /* calculate complement */;
        
        if (map.has(complement)) {
            // Return the values, not indices
            return [/* complement value */, /* current value */];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test cases
console.log(twoSumValues([2, 7, 11, 15], 9));   // [2, 7]
console.log(twoSumValues([3, 2, 4], 6));        // [2, 4]
console.log(twoSumValues([1, 2, 3], 7));        // []`,
                solution: `function twoSumValues(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [complement, nums[i]];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
                testCases: [
                    { input: [[2, 7, 11, 15], 9], expected: [2, 7] },
                    { input: [[3, 2, 4], 6], expected: [2, 4] },
                    { input: [[3, 3], 6], expected: [3, 3] },
                    { input: [[1, 2, 3], 7], expected: [] }
                ],
                hints: [
                    "You still need to store indices to avoid using same element twice",
                    "When returning, use the complement and current nums[i] values",
                    "The complement is the value we found in the map",
                    "Return [complement, nums[i]] when found"
                ]
            }
        ];
    }

    // Placeholder methods for other algorithms
    initializePalindromeLessons() {
        return [
            {
                title: "Understanding Palindromes",
                content: "<h3>Coming Soon!</h3><p>Palindrome lessons will be available soon.</p>",
                type: "introduction"
            }
        ];
    }

    initializePalindromeQuestions() {
        return [
            {
                id: 1,
                type: "multiple-choice",
                question: "What is a palindrome?",
                options: ["A word that reads the same forwards and backwards", "A type of algorithm", "A data structure", "A programming language"],
                correct: 0,
                explanation: "A palindrome is a word, phrase, or sequence that reads the same backward as forward.",
                difficulty: "easy"
            }
        ];
    }

    initializePalindromeChallenges() {
        return [
            {
                id: 1,
                title: "Basic Palindrome Check",
                difficulty: "Beginner",
                description: "Check if a string is a palindrome.",
                instructions: "<h4>Coming Soon!</h4><p>Palindrome challenges will be available soon.</p>",
                starterCode: "// Coming soon...",
                solution: "// Coming soon...",
                testCases: [],
                hints: ["Coming soon..."]
            }
        ];
    }

    initializeBinarySearchLessons() {
        return [
            {
                title: "Understanding Binary Search",
                content: "<h3>Coming Soon!</h3><p>Binary search lessons will be available soon.</p>",
                type: "introduction"
            }
        ];
    }

    initializeBinarySearchQuestions() {
        return [
            {
                id: 1,
                type: "multiple-choice",
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1,
                explanation: "Binary search has O(log n) time complexity because it halves the search space in each iteration.",
                difficulty: "medium"
            }
        ];
    }

    initializeBinarySearchChallenges() {
        return [
            {
                id: 1,
                title: "Basic Binary Search",
                difficulty: "Intermediate",
                description: "Implement binary search algorithm.",
                instructions: "<h4>Coming Soon!</h4><p>Binary search challenges will be available soon.</p>",
                starterCode: "// Coming soon...",
                solution: "// Coming soon...",
                testCases: [],
                hints: ["Coming soon..."]
            }
        ];
    }

    // Default challenge method for backward compatibility
    initializeChallenges() {
        return this.initializeFizzBuzzChallenges();
    }

    initializeCodeChallenge() {
        const challenge = this.challenges[this.currentChallenge];
        document.getElementById('challenge-title').textContent = challenge.title;
        document.getElementById('difficulty-badge').innerHTML = `
            <i class="fas fa-star"></i>
            ${challenge.difficulty}
        `;
        document.getElementById('instruction-content').innerHTML = challenge.instructions;
        
        this.editorState.originalCode = challenge.starterCode;
        this.editorState.currentCode = challenge.starterCode;
        this.resetCode();
        
        document.getElementById('check-solution').disabled = true;
    }

    resetCode() {
        const editor = document.getElementById('editable-code');
        editor.textContent = this.editorState.originalCode;
        this.updateLineNumbers();
        this.clearOutput();
    }

    formatCode() {
        // Simple code formatting
        const editor = document.getElementById('editable-code');
        let code = editor.textContent;
        
        // Basic formatting rules
        code = code.replace(/\{/g, ' {\n    ');
        code = code.replace(/\}/g, '\n}');
        code = code.replace(/;/g, ';\n');
        code = code.replace(/\n\s*\n/g, '\n');
        
        editor.textContent = code;
        this.updateLineNumbers();
    }

    updateLineNumbers() {
        const editor = document.getElementById('editable-code');
        const lineNumbers = document.getElementById('line-numbers');
        const lines = editor.textContent.split('\n');
        
        lineNumbers.innerHTML = lines.map((_, index) => index + 1).join('\n');
    }

    enableCheckSolution() {
        const editor = document.getElementById('editable-code');
        this.editorState.currentCode = editor.textContent;
        document.getElementById('check-solution').disabled = false;
    }

    runCode() {
        const code = this.editorState.currentCode || document.getElementById('editable-code').textContent;
        const output = document.getElementById('output-content');
        
        try {
            // Clear previous output
            this.clearOutput();
            
            // Capture console.log output
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.join(' '));
                originalLog(...args);
            };
            
            // Execute the code
            eval(code);
            
            // Restore console.log
            console.log = originalLog;
            
            // Display output
            if (logs.length > 0) {
                output.innerHTML = `
                    <div class="output-success">
                        <div class="output-header">
                            <i class="fas fa-check-circle"></i>
                            Code executed successfully!
                        </div>
                        <div class="output-logs">
                            ${logs.map(log => `<div class="output-line">${this.escapeHtml(log)}</div>`).join('')}
                        </div>
                    </div>
                `;
            } else {
                output.innerHTML = `
                    <div class="output-info">
                        <i class="fas fa-info-circle"></i>
                        Code executed successfully (no output)
                    </div>
                `;
            }
            
            document.getElementById('check-solution').disabled = false;
            
        } catch (error) {
            output.innerHTML = `
                <div class="output-error">
                    <div class="error-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        Error in your code:
                    </div>
                    <div class="error-message">${this.escapeHtml(error.message)}</div>
                </div>
            `;
        }
    }

    checkSolution() {
        const code = document.getElementById('editable-code').textContent;
        const challenge = this.challenges[this.currentChallenge];
        const output = document.getElementById('output-content');
        
        try {
            // Test the solution against test cases
            eval(code);
            
            let passedTests = 0;
            const results = [];
            
            challenge.testCases.forEach((testCase, index) => {
                try {
                    let result;
                    if (Array.isArray(testCase.input)) {
                        result = fizzBuzzRange(testCase.input[0], testCase.input[1]);
                    } else {
                        result = fizzBuzz(testCase.input);
                    }
                    
                    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
                    if (passed) passedTests++;
                    
                    results.push({
                        index: index + 1,
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: result,
                        passed
                    });
                } catch (error) {
                    results.push({
                        index: index + 1,
                        input: testCase.input,
                        expected: testCase.expected,
                        actual: 'Error: ' + error.message,
                        passed: false
                    });
                }
            });
            
            this.displayTestResults(results, passedTests, challenge.testCases.length);
            
            if (passedTests === challenge.testCases.length) {
                this.completeChallenge();
            }
            
        } catch (error) {
            output.innerHTML = `
                <div class="output-error">
                    <div class="error-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        Cannot test solution - fix errors first:
                    </div>
                    <div class="error-message">${this.escapeHtml(error.message)}</div>
                </div>
            `;
        }
    }

    displayTestResults(results, passed, total) {
        const output = document.getElementById('output-content');
        const percentage = Math.round((passed / total) * 100);
        
        output.innerHTML = `
            <div class="test-results">
                <div class="test-summary ${passed === total ? 'success' : 'partial'}">
                    <div class="summary-header">
                        <i class="fas ${passed === total ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                        Tests: ${passed}/${total} passed (${percentage}%)
                    </div>
                </div>
                <div class="test-cases">
                    ${results.map(result => `
                        <div class="test-case ${result.passed ? 'passed' : 'failed'}">
                            <div class="test-header">
                                <span class="test-number">Test ${result.index}</span>
                                <span class="test-status">
                                    <i class="fas ${result.passed ? 'fa-check' : 'fa-times'}"></i>
                                </span>
                            </div>
                            <div class="test-details">
                                <div class="test-input">Input: ${JSON.stringify(result.input)}</div>
                                <div class="test-expected">Expected: ${JSON.stringify(result.expected)}</div>
                                <div class="test-actual">Actual: ${JSON.stringify(result.actual)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    completeChallenge() {
        this.createSuccessEffect();
        this.showAchievement("Code Master!", "You've successfully completed the challenge!");
        
        setTimeout(() => {
            this.switchScreen('results');
        }, 2000);
    }

    clearOutput() {
        const output = document.getElementById('output-content');
        output.innerHTML = `
            <div class="output-placeholder">
                <i class="fas fa-terminal"></i>
                <p>Run your code to see the output here</p>
            </div>
        `;
    }

    // Hint System
    showHint() {
        const challenge = this.challenges[this.currentChallenge];
        const hintIndex = this.progress.hintsUsed % challenge.hints.length;
        const hint = challenge.hints[hintIndex];
        
        document.getElementById('hint-content').innerHTML = `
            <div class="hint-message">
                <div class="hint-icon">💡</div>
                <div class="hint-text">${hint}</div>
            </div>
        `;
        
        this.showModal('hint-modal');
        this.progress.hintsUsed++;
    }

    showContextualHint() {
        let hint = "";
        
        switch (this.currentScreen) {
            case 'lesson':
                hint = "Take your time to understand each concept. Try the interactive examples!";
                break;
            case 'quiz':
                hint = "Think about the divisibility rules. Remember: FizzBuzz appears when a number is divisible by both 3 and 5.";
                break;
            case 'code':
                hint = "Start with the basic structure. Check divisibility by 15 first, then 3, then 5.";
                break;
            default:
                hint = "Explore the interactive elements and don't hesitate to experiment!";
        }
        
        document.getElementById('hint-content').innerHTML = `
            <div class="hint-message">
                <div class="hint-icon">💡</div>
                <div class="hint-text">${hint}</div>
            </div>
        `;
        
        this.showModal('hint-modal');
    }

    showAnotherHint() {
        this.showHint();
    }

    // Explanation System
    showExplanation(question, isCorrect) {
        const title = isCorrect ? "🎉 Correct!" : "🤔 Not Quite Right";
        document.getElementById('explanation-title').textContent = title;
        document.getElementById('explanation-content').innerHTML = `
            <div class="explanation-message ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="explanation-result">
                    <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    <span>${isCorrect ? 'Well done!' : 'Keep learning!'}</span>
                </div>
                <div class="explanation-text">${question.explanation}</div>
            </div>
        `;
        
        this.showModal('explanation-modal');
    }

    // Achievement System
    initializeAchievements() {
        return [
            {
                id: 'first_lesson',
                title: 'First Steps',
                description: 'Complete your first lesson',
                icon: 'fas fa-graduation-cap',
                unlocked: false
            },
            {
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Score 80% or higher on the quiz',
                icon: 'fas fa-medal',
                unlocked: false
            },
            {
                id: 'code_warrior',
                title: 'Code Warrior',
                description: 'Complete your first coding challenge',
                icon: 'fas fa-sword',
                unlocked: false
            },
            {
                id: 'streak_master',
                title: 'Streak Master',
                description: 'Get 5 answers correct in a row',
                icon: 'fas fa-fire',
                unlocked: false
            },
            {
                id: 'perfectionist',
                title: 'Perfectionist',
                description: 'Complete quiz with 100% score',
                icon: 'fas fa-crown',
                unlocked: false
            }
        ];
    }

    checkAchievements() {
        // Check for various achievement conditions
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                let shouldUnlock = false;
                
                switch (achievement.id) {
                    case 'first_lesson':
                        shouldUnlock = this.progress.completedLessons.length > 0;
                        break;
                    case 'quiz_master':
                        shouldUnlock = this.quizState.score / this.questions.length >= 0.8;
                        break;
                    case 'code_warrior':
                        shouldUnlock = this.progress.completedChallenges.length > 0;
                        break;
                    case 'streak_master':
                        shouldUnlock = this.progress.maxStreak >= 5;
                        break;
                    case 'perfectionist':
                        shouldUnlock = this.quizState.score === this.questions.length;
                        break;
                }
                
                if (shouldUnlock) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    unlockAchievement(achievement) {
        achievement.unlocked = true;
        this.progress.achievements.push(achievement.id);
        this.showAchievement(achievement.title, achievement.description);
        this.createParticleEffect();
    }

    showAchievement(title, description) {
        const notification = document.getElementById('achievement-notification');
        document.getElementById('achievement-title').textContent = title;
        document.getElementById('achievement-description').textContent = description;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Visual Effects
    createSuccessEffect() {
        this.createParticleEffect();
        document.body.style.animation = 'successFlash 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }

    createErrorEffect() {
        document.body.style.animation = 'errorShake 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }

    createParticleEffect() {
        const container = document.getElementById('particles-container');
        const colors = ['#34a853', '#fbbc04', '#1a73e8', '#9c27b0'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    // Progress Management
    updateProgress() {
        const totalSteps = this.lessons.length + this.questions.length + this.challenges.length;
        const completedSteps = this.progress.completedLessons.length + 
                              this.progress.completedQuestions.length + 
                              this.progress.completedChallenges.length;
        
        const percentage = Math.round((completedSteps / totalSteps) * 100);
        
        document.getElementById('overall-progress').style.width = percentage + '%';
        document.getElementById('progress-text').textContent = percentage + '% Complete';
        
        // Update header stats
        document.getElementById('total-score').textContent = this.progress.totalScore;
        document.getElementById('streak-count').textContent = this.progress.streak;
        document.getElementById('level-indicator').textContent = this.progress.level;
    }

    calculateFinalScore() {
        const correctAnswers = this.quizState.answers.filter(a => a.correct).length;
        const totalQuestions = this.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        this.progress.totalScore = percentage;
        this.checkAchievements();
        this.saveProgress();
    }

    showResults() {
        const correctAnswers = this.quizState.answers.filter(a => a.correct).length;
        const totalTime = this.calculateTotalTime();
        
        document.getElementById('final-score').textContent = this.progress.totalScore + '%';
        document.getElementById('total-time').textContent = this.formatTime(totalTime);
        document.getElementById('max-streak').textContent = this.progress.maxStreak;
        document.getElementById('achievements').textContent = this.progress.achievements.length;
        
        this.renderAchievements();
        
        // Update skill mastery display if enhanced version is available
        if (this.updateProgressWithInsights) {
            this.updateProgressWithInsights();
        }
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        const unlockedAchievements = this.achievements.filter(a => a.unlocked);
        
        grid.innerHTML = unlockedAchievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-text">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Utility Methods
    calculateTotalTime() {
        return Date.now() - this.startTime;
    }

    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = '';
    }

    // Data Persistence
    saveProgress() {
        localStorage.setItem('codemaster_progress', JSON.stringify(this.progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('codemaster_progress');
        if (saved) {
            this.progress = { ...this.progress, ...JSON.parse(saved) };
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('codemaster_progress');
            location.reload();
        }
    }

    toggleTheme() {
        document.documentElement.classList.toggle('dark-theme');
        const isDark = document.documentElement.classList.contains('dark-theme');
        localStorage.setItem('codemaster_theme', isDark ? 'dark' : 'light');
        
        const icon = document.querySelector('#theme-toggle i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Initialization
    updateUI() {
        this.updateProgress();
        
        // Load theme
        const savedTheme = localStorage.getItem('codemaster_theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.querySelector('#theme-toggle i').className = 'fas fa-sun';
        }
    }

    // Review System
    reviewAnswers() {
        // Implementation for reviewing quiz answers
        console.log('Reviewing answers...', this.quizState.answers);
    }

    resetQuiz() {
        this.quizState = {
            currentQuestionIndex: 0,
            answers: [],
            timeRemaining: 30,
            timer: null,
            score: 0
        };
        this.switchScreen('quiz');
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes successFlash {
        0%, 100% { background-color: var(--bg-primary); }
        50% { background-color: rgba(52, 168, 83, 0.1); }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .quiz-timer.warning {
        animation: pulse 1s infinite;
        color: var(--error-color) !important;
    }
    
    .highlighted {
        animation: glow 1s ease-in-out;
    }
    
    .dimmed {
        opacity: 0.3;
        transition: opacity 0.3s ease;
    }
    
    .logic-step {
        animation: slideIn 0.5s ease forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new CodeMaster();
});

// =============================================================================
// BRILLIANT.ORG INSPIRED ENHANCEMENTS
// =============================================================================

// Extend CodeMaster with Brilliant.org features
CodeMaster.prototype.initializeAdaptiveLearning = function() {
    this.adaptiveLearning = {
        difficultyAdjustment: {
            consecutive_correct: 0,
            consecutive_incorrect: 0,
            time_per_question: [],
            hint_usage_rate: 0
        },
        personalizedContent: {
            preferred_explanation_style: 'visual',
            learning_pace: 'medium',
            challenge_preference: 'balanced'
        },
        insights: {
            strengths: [],
            areas_for_improvement: [],
            recommended_next_topics: []
        }
    };
};

// Enhanced pattern highlighting with smooth transitions
CodeMaster.prototype.highlightPatternAdvanced = function(type) {
    const items = document.querySelectorAll('.pattern-item');
    
    // Add staggered animation delays
    items.forEach((item, index) => {
        item.style.setProperty('--animation-delay', index);
        item.classList.remove('highlighted', 'dimmed', 'revealing');
        
        setTimeout(() => {
            if (type === 'reset') {
                item.classList.remove('highlighted', 'dimmed');
                return;
            }
            
            const classes = item.className;
            const shouldHighlight = 
                (type === 'fizz' && classes.includes('fizz-item') && !classes.includes('fizzbuzz-item')) ||
                (type === 'buzz' && classes.includes('buzz-item') && !classes.includes('fizzbuzz-item')) ||
                (type === 'fizzbuzz' && classes.includes('fizzbuzz-item'));
                
            if (shouldHighlight) {
                item.classList.add('highlighted', 'revealing');
                this.createMiniParticleEffect(item);
            } else {
                item.classList.add('dimmed');
            }
        }, index * 100);
    });
};

// Create localized particle effects
CodeMaster.prototype.createMiniParticleEffect = function(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#34a853', '#1a73e8', '#9c27b0'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width/2 + 'px';
        particle.style.top = rect.top + rect.height/2 + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 20 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let x = 0, y = 0, opacity = 1;
        const animate = () => {
            x += vx * 0.1;
            y += vy * 0.1 + 0.5; // gravity
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// Enhanced skill tracking
CodeMaster.prototype.updateSkillMastery = function(skill, performance) {
    const current = this.progress.skillMastery[skill] || 0;
    const improvement = performance * 10; // Scale based on performance
    this.progress.skillMastery[skill] = Math.min(100, current + improvement);
    
    // Check for mastery milestones
    if (this.progress.skillMastery[skill] >= 25 && current < 25) {
        this.unlockAchievement({
            id: `${skill}_novice`,
            title: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Novice`,
            description: `Reached 25% mastery in ${skill}`,
            icon: 'fas fa-seedling'
        });
    }
    
    if (this.progress.skillMastery[skill] >= 75 && current < 75) {
        this.unlockAchievement({
            id: `${skill}_expert`,
            title: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Expert`,
            description: `Reached 75% mastery in ${skill}`,
            icon: 'fas fa-trophy'
        });
    }
};

// Adaptive difficulty adjustment
CodeMaster.prototype.adjustDifficulty = function(performance) {
    const adaptive = this.adaptiveLearning.difficultyAdjustment;
    
    if (performance.correct) {
        adaptive.consecutive_correct++;
        adaptive.consecutive_incorrect = 0;
        
        // Increase difficulty if consistently performing well
        if (adaptive.consecutive_correct >= 3 && this.progress.adaptiveDifficulty === 'easy') {
            this.progress.adaptiveDifficulty = 'medium';
            this.showAdaptiveMessage('Difficulty increased to Medium - you\'re doing great!');
        } else if (adaptive.consecutive_correct >= 5 && this.progress.adaptiveDifficulty === 'medium') {
            this.progress.adaptiveDifficulty = 'hard';
            this.showAdaptiveMessage('Difficulty increased to Hard - challenge accepted!');
        }
    } else {
        adaptive.consecutive_incorrect++;
        adaptive.consecutive_correct = 0;
        
        // Decrease difficulty if struggling
        if (adaptive.consecutive_incorrect >= 2 && this.progress.adaptiveDifficulty === 'hard') {
            this.progress.adaptiveDifficulty = 'medium';
            this.showAdaptiveMessage('Difficulty adjusted to Medium - let\'s build confidence!');
        } else if (adaptive.consecutive_incorrect >= 3 && this.progress.adaptiveDifficulty === 'medium') {
            this.progress.adaptiveDifficulty = 'easy';
            this.showAdaptiveMessage('Difficulty adjusted to Easy - focus on fundamentals!');
        }
    }
    
    // Track hint usage rate
    if (performance.hintUsed) {
        adaptive.hint_usage_rate = (adaptive.hint_usage_rate + 1) / 2; // Moving average
    }
};

// Show adaptive learning messages
CodeMaster.prototype.showAdaptiveMessage = function(message) {
    const notification = document.createElement('div');
    notification.className = 'adaptive-notification';
    notification.innerHTML = `
        <div class="adaptive-content">
            <i class="fas fa-brain"></i>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
};

// Enhanced micro-interactions
CodeMaster.prototype.addMicroInteractions = function() {
    // Hover effects for interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('demo-btn')) {
            this.createHoverParticles(e.target);
        }
    });
    
    // Click feedback
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('demo-btn') || e.target.classList.contains('pattern-item')) {
            this.createClickRipple(e.target, e);
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Create hover particle effects
CodeMaster.prototype.createHoverParticles = function(element) {
    if (element.dataset.particles) return; // Prevent multiple particle systems
    element.dataset.particles = 'true';
    
    const rect = element.getBoundingClientRect();
    const particles = [];
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--primary-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
        `;
        
        particles.push(particle);
        document.body.appendChild(particle);
    }
    
    const animate = () => {
        if (!element.matches(':hover')) {
            particles.forEach(p => p.remove());
            delete element.dataset.particles;
            return;
        }
        
        particles.forEach((particle, i) => {
            const angle = (Date.now() * 0.002 + i * 2.1) % (Math.PI * 2);
            const radius = 20 + Math.sin(Date.now() * 0.003 + i) * 5;
            const x = rect.left + rect.width/2 + Math.cos(angle) * radius;
            const y = rect.top + rect.height/2 + Math.sin(angle) * radius;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
        });
        
        requestAnimationFrame(animate);
    };
    
    animate();
};

// Create click ripple effects
CodeMaster.prototype.createClickRipple = function(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size/2;
    const y = event.clientY - rect.top - size/2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(26, 115, 232, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
};

// Enhanced progress visualization
CodeMaster.prototype.updateProgressWithInsights = function() {
    this.updateProgress(); // Call original method
    
    // Add skill mastery visualization
    const skillsContainer = document.getElementById('skills-progress');
    if (skillsContainer) {
        const skills = Object.entries(this.progress.skillMastery);
        skillsContainer.innerHTML = skills.map(([skill, mastery]) => `
            <div class="skill-progress">
                <div class="skill-name">${skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                <div class="skill-bar">
                    <div class="skill-fill" style="width: ${mastery}%"></div>
                </div>
                <div class="skill-percentage">${Math.round(mastery)}%</div>
            </div>
        `).join('');
    }
    
    // Update experience points with level progression
    const experienceNeeded = this.progress.level * 100;
    const experienceProgress = (this.progress.experience % 100) / 100 * 100;
    
    const expBar = document.getElementById('experience-bar');
    if (expBar) {
        expBar.style.width = experienceProgress + '%';
    }
};

// Add CSS for new animations
const brilliantStyle = document.createElement('style');
brilliantStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .adaptive-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .skill-progress {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .skill-name {
        min-width: 80px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .skill-bar {
        flex: 1;
        height: 8px;
        background: var(--bg-secondary);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .skill-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-green), var(--primary-blue));
        border-radius: 4px;
        transition: width 0.8s ease;
    }
    
    .skill-percentage {
        min-width: 40px;
        text-align: right;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(brilliantStyle);

// =============================================================================
// SPACED REPETITION SYSTEM
// =============================================================================

// Spaced repetition intervals (in days)
const SPACED_INTERVALS = [1, 3, 7, 14, 30, 90];

CodeMaster.prototype.initializeSpacedRepetition = function() {
    this.spacedRepetition = {
        getNextInterval: (difficulty, performance) => {
            const baseInterval = SPACED_INTERVALS[difficulty - 1] || 1;
            const performanceMultiplier = performance > 0.8 ? 1.3 : performance > 0.6 ? 1 : 0.6;
            return Math.round(baseInterval * performanceMultiplier);
        },
        
        calculateDifficulty: (concept, performance) => {
            const history = this.progress.spacedRepetition.reviewHistory.filter(r => r.concept === concept);
            if (history.length === 0) return 1;
            
            const avgPerformance = history.reduce((sum, r) => sum + r.performance, 0) / history.length;
            return Math.max(1, Math.min(5, Math.round((1 - avgPerformance) * 4 + 1)));
        }
    };
};

CodeMaster.prototype.addToSpacedRepetition = function(concept, performance) {
    const sr = this.progress.spacedRepetition;
    const difficulty = this.spacedRepetition.calculateDifficulty(concept, performance);
    const interval = this.spacedRepetition.getNextInterval(difficulty, performance);
    
    // Add to review history
    sr.reviewHistory.push({
        concept: concept,
        performance: performance,
        timestamp: Date.now(),
        difficulty: difficulty
    });
    
    // Schedule next review
    const nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000);
    sr.nextReviewDates[concept] = nextReview;
    sr.conceptDifficulty[concept] = difficulty;
    
    // Add to review queue if not mastered
    if (performance < 0.9 || difficulty > 2) {
        if (!sr.reviewQueue.includes(concept)) {
            sr.reviewQueue.push(concept);
        }
    } else if (performance >= 0.95 && difficulty <= 2) {
        // Move to mastered concepts
        if (!sr.masteredConcepts.includes(concept)) {
            sr.masteredConcepts.push(concept);
            this.showMasteryNotification(concept);
        }
        // Remove from review queue
        sr.reviewQueue = sr.reviewQueue.filter(c => c !== concept);
    }
    
    this.saveProgress();
};

CodeMaster.prototype.getConceptsForReview = function() {
    const sr = this.progress.spacedRepetition;
    const now = Date.now();
    
    return sr.reviewQueue.filter(concept => {
        const nextReview = sr.nextReviewDates[concept] || 0;
        return nextReview <= now;
    });
};

CodeMaster.prototype.showMasteryNotification = function(concept) {
    const notification = document.createElement('div');
    notification.className = 'mastery-notification';
    notification.innerHTML = `
        <div class="mastery-content">
            <div class="mastery-icon">🎓</div>
            <div class="mastery-text">
                <h4>Concept Mastered!</h4>
                <p>You've mastered: ${concept.charAt(0).toUpperCase() + concept.slice(1)}</p>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, var(--accent-green), var(--primary-blue));
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 600);
    }, 5000);
};

// =============================================================================
// COLLABORATIVE FEATURES & COMMUNITY ELEMENTS
// =============================================================================

CodeMaster.prototype.initializeCollaborativeFeatures = function() {
    this.community = {
        leaderboard: [],
        studyGroups: [],
        sharedChallenges: [],
        userProfile: {
            displayName: 'Anonymous Learner',
            avatar: '👤',
            badges: [],
            publicStats: {
                totalScore: 0,
                conceptsMastered: 0,
                helpfulContributions: 0
            }
        }
    };
    
    this.addCommunityElements();
};

CodeMaster.prototype.addCommunityElements = function() {
    // Add community panel to header
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        const communityBtn = document.createElement('button');
        communityBtn.className = 'icon-btn';
        communityBtn.id = 'community-btn';
        communityBtn.title = 'Community';
        communityBtn.innerHTML = '<i class="fas fa-users"></i>';
        
        communityBtn.addEventListener('click', () => this.showCommunityModal());
        headerActions.appendChild(communityBtn);
    }
};

CodeMaster.prototype.showCommunityModal = function() {
    const modal = document.createElement('div');
    modal.className = 'modal community-modal active';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>🌟 Learning Community</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="community-tabs">
                    <button class="tab-btn active" data-tab="leaderboard">🏆 Leaderboard</button>
                    <button class="tab-btn" data-tab="study-groups">👥 Study Groups</button>
                    <button class="tab-btn" data-tab="challenges">🎯 Challenges</button>
                </div>
                
                <div class="tab-content">
                    <div class="tab-panel active" id="leaderboard">
                        <div class="leaderboard-list">
                            ${this.generateMockLeaderboard()}
                        </div>
                    </div>
                    
                    <div class="tab-panel" id="study-groups">
                        <div class="study-groups-list">
                            ${this.generateMockStudyGroups()}
                        </div>
                    </div>
                    
                    <div class="tab-panel" id="challenges">
                        <div class="challenges-list">
                            ${this.generateMockChallenges()}
                        </div>
                    </div>
                </div>
                
                <div class="community-actions">
                    <button class="community-btn primary">
                        <i class="fas fa-plus"></i>
                        Create Study Group
                    </button>
                    <button class="community-btn secondary">
                        <i class="fas fa-share"></i>
                        Share Progress
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    this.initializeCommunityTabs(modal);
};

CodeMaster.prototype.generateMockLeaderboard = function() {
    const mockData = [
        { name: 'Alex Chen', score: 2847, streak: 23, avatar: '🥇' },
        { name: 'Sarah Kim', score: 2654, streak: 19, avatar: '🥈' },
        { name: 'Mike Johnson', score: 2489, streak: 15, avatar: '🥉' },
        { name: 'You', score: this.progress.totalScore, streak: this.progress.maxStreak, avatar: '👤' },
        { name: 'Emma Davis', score: 2156, streak: 12, avatar: '⭐' }
    ];
    
    return mockData.map((user, index) => `
        <div class="leaderboard-item ${user.name === 'You' ? 'current-user' : ''}">
            <div class="rank">#${index + 1}</div>
            <div class="user-avatar">${user.avatar}</div>
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-stats">Score: ${user.score} • Streak: ${user.streak}</div>
            </div>
            ${user.name === 'You' ? '<div class="current-badge">You</div>' : ''}
        </div>
    `).join('');
};

CodeMaster.prototype.generateMockStudyGroups = function() {
    const groups = [
        { name: 'Algorithm Masters', members: 47, activity: 'Studying Two Sum', level: 'Advanced' },
        { name: 'Beginner Coders', members: 128, activity: 'FizzBuzz Practice', level: 'Beginner' },
        { name: 'Interview Prep', members: 89, activity: 'Dynamic Programming', level: 'Expert' }
    ];
    
    return groups.map(group => `
        <div class="study-group-card">
            <div class="group-header">
                <h4>${group.name}</h4>
                <div class="group-level ${group.level.toLowerCase()}">${group.level}</div>
            </div>
            <div class="group-info">
                <div class="group-members">👥 ${group.members} members</div>
                <div class="group-activity">📚 ${group.activity}</div>
            </div>
            <button class="join-btn">Join Group</button>
        </div>
    `).join('');
};

CodeMaster.prototype.generateMockChallenges = function() {
    const challenges = [
        { title: 'Speed FizzBuzz', description: 'Complete 20 FizzBuzz questions in under 2 minutes', participants: 234, reward: '🏃‍♂️ Speed Demon' },
        { title: 'Perfect Week', description: 'Get 100% on all daily challenges for a week', participants: 89, reward: '💯 Perfectionist' },
        { title: 'Algorithm Explorer', description: 'Try all 6 different algorithms', participants: 156, reward: '🧭 Explorer' }
    ];
    
    return challenges.map(challenge => `
        <div class="challenge-card">
            <div class="challenge-header">
                <h4>${challenge.title}</h4>
                <div class="challenge-reward">${challenge.reward}</div>
            </div>
            <div class="challenge-description">${challenge.description}</div>
            <div class="challenge-stats">
                <span>👥 ${challenge.participants} participating</span>
            </div>
            <button class="challenge-btn">Join Challenge</button>
        </div>
    `).join('');
};

CodeMaster.prototype.initializeCommunityTabs = function(modal) {
    const tabBtns = modal.querySelectorAll('.tab-btn');
    const tabPanels = modal.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            modal.querySelector(`#${tabId}`).classList.add('active');
        });
    });
};

// =============================================================================
// ENHANCED GAMIFICATION SYSTEM
// =============================================================================

CodeMaster.prototype.initializeGamification = function() {
    this.gamification = {
        // Daily challenges
        dailyChallenges: [
            { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 5 questions in under 10 seconds each', progress: 0, target: 5, reward: 50 },
            { id: 'streak_master', name: 'Streak Master', description: 'Get 10 answers correct in a row', progress: 0, target: 10, reward: 100 },
            { id: 'explorer', name: 'Explorer', description: 'Try 3 different algorithms today', progress: 0, target: 3, reward: 75 }
        ],
        
        // XP and leveling system
        xpSystem: {
            currentXP: 0,
            currentLevel: 1,
            xpToNextLevel: 100,
            
            calculateLevel: (xp) => Math.floor(Math.sqrt(xp / 50)) + 1,
            calculateXPForLevel: (level) => Math.pow(level - 1, 2) * 50,
            
            awardXP: (amount, reason) => {
                this.gamification.xpSystem.currentXP += amount;
                this.updateLevel();
                this.showXPGain(amount, reason);
            }
        },
        
        // Enhanced badge system
        badges: [
            { id: 'first_steps', name: 'First Steps', description: 'Complete your first lesson', icon: '👶', unlocked: false },
            { id: 'quick_learner', name: 'Quick Learner', description: 'Answer correctly in under 5 seconds', icon: '⚡', unlocked: false },
            { id: 'perfectionist', name: 'Perfectionist', description: 'Get 100% on any quiz', icon: '💯', unlocked: false },
            { id: 'night_owl', name: 'Night Owl', description: 'Study after 10 PM', icon: '🦉', unlocked: false },
            { id: 'early_bird', name: 'Early Bird', description: 'Study before 7 AM', icon: '🐦', unlocked: false },
            { id: 'consistency_king', name: 'Consistency King', description: 'Study for 7 days in a row', icon: '👑', unlocked: false },
            { id: 'mentor', name: 'Mentor', description: 'Help others in study groups', icon: '🎓', unlocked: false },
            { id: 'algorithm_master', name: 'Algorithm Master', description: 'Master all 6 algorithms', icon: '🧠', unlocked: false }
        ],
        
        // Seasonal events
        seasonalEvents: {
            current: null,
            events: [
                { id: 'winter_coding', name: 'Winter Coding Challenge', start: new Date('2024-12-01'), end: new Date('2024-12-31'), multiplier: 1.5 },
                { id: 'spring_algorithms', name: 'Spring Algorithm Sprint', start: new Date('2024-03-01'), end: new Date('2024-03-31'), multiplier: 2.0 }
            ]
        }
    };
    
    this.checkDailyLogin();
    this.updateGamificationUI();
};

CodeMaster.prototype.checkDailyLogin = function() {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLogin');
    
    if (lastLogin !== today) {
        localStorage.setItem('lastLogin', today);
        this.gamification.xpSystem.awardXP(10, 'Daily Login Bonus');
        this.showDailyBonus();
    }
};

CodeMaster.prototype.showDailyBonus = function() {
    const bonus = document.createElement('div');
    bonus.className = 'daily-bonus-notification';
    bonus.innerHTML = `
        <div class="bonus-content">
            <div class="bonus-icon">🎁</div>
            <div class="bonus-text">
                <h4>Daily Login Bonus!</h4>
                <p>+10 XP for returning today</p>
            </div>
        </div>
    `;
    
    bonus.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: linear-gradient(135deg, var(--accent-yellow), var(--accent-orange));
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 300px;
    `;
    
    document.body.appendChild(bonus);
    
    setTimeout(() => bonus.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        bonus.style.transform = 'translateX(100%)';
        setTimeout(() => bonus.remove(), 600);
    }, 4000);
};

CodeMaster.prototype.showXPGain = function(amount, reason) {
    const xpGain = document.createElement('div');
    xpGain.className = 'xp-gain-notification';
    xpGain.innerHTML = `+${amount} XP - ${reason}`;
    xpGain.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: var(--accent-green);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        z-index: 10000;
        animation: xpPop 2s ease-out forwards;
    `;
    
    document.body.appendChild(xpGain);
    setTimeout(() => xpGain.remove(), 2000);
};

CodeMaster.prototype.updateLevel = function() {
    const xpSys = this.gamification.xpSystem;
    const newLevel = xpSys.calculateLevel(xpSys.currentXP);
    
    if (newLevel > xpSys.currentLevel) {
        const oldLevel = xpSys.currentLevel;
        xpSys.currentLevel = newLevel;
        this.showLevelUp(oldLevel, newLevel);
    }
    
    xpSys.xpToNextLevel = xpSys.calculateXPForLevel(xpSys.currentLevel + 1) - xpSys.currentXP;
};

CodeMaster.prototype.showLevelUp = function(oldLevel, newLevel) {
    const levelUp = document.createElement('div');
    levelUp.className = 'level-up-notification';
    levelUp.innerHTML = `
        <div class="level-up-content">
            <div class="level-up-icon">🎊</div>
            <div class="level-up-text">
                <h3>Level Up!</h3>
                <p>Level ${oldLevel} → Level ${newLevel}</p>
            </div>
        </div>
    `;
    
    levelUp.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, var(--accent-purple), var(--primary-blue));
        color: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10001;
        text-align: center;
        animation: levelUpAnimation 3s ease-out forwards;
    `;
    
    document.body.appendChild(levelUp);
    setTimeout(() => levelUp.remove(), 3000);
};

// =============================================================================
// PERFORMANCE OPTIMIZATIONS & LAZY LOADING
// =============================================================================

CodeMaster.prototype.initializePerformanceOptimizations = function() {
    // Lazy load images and heavy content
    this.setupLazyLoading();
    
    // Optimize animations for performance
    this.setupPerformanceMonitoring();
    
    // Implement virtual scrolling for large lists
    this.setupVirtualScrolling();
    
    // Cache management
    this.setupCaching();
    
    // Web Workers for heavy computations
    this.setupWebWorkers();
};

CodeMaster.prototype.setupLazyLoading = function() {
    // Intersection Observer for lazy loading
    this.lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Load images
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                // Load content modules
                if (element.dataset.module) {
                    this.loadModule(element.dataset.module);
                }
                
                this.lazyObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe lazy elements
    document.querySelectorAll('[data-src], [data-module]').forEach(el => {
        this.lazyObserver.observe(el);
    });
};

CodeMaster.prototype.setupPerformanceMonitoring = function() {
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    const monitorFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce animations if FPS is low
            if (fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorFPS);
    };
    
    requestAnimationFrame(monitorFPS);
};

CodeMaster.prototype.setupCaching = function() {
    // Service Worker for caching (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed - that's okay
        });
    }
    
    // Memory cache for frequently accessed data
    this.cache = new Map();
    this.cacheLimit = 50;
    
    this.getFromCache = (key) => this.cache.get(key);
    this.setCache = (key, value) => {
        if (this.cache.size >= this.cacheLimit) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    };
};

CodeMaster.prototype.setupWebWorkers = function() {
    // Create web worker for heavy computations
    if (typeof Worker !== 'undefined') {
        const workerCode = `
            self.onmessage = function(e) {
                const { type, data } = e.data;
                
                switch(type) {
                    case 'calculateStats':
                        const stats = calculateLearningStats(data);
                        self.postMessage({ type: 'statsResult', data: stats });
                        break;
                }
            };
            
            function calculateLearningStats(progressData) {
                // Heavy computation for learning analytics
                const results = {
                    averageTime: 0,
                    strongAreas: [],
                    weakAreas: [],
                    recommendations: []
                };
                
                // Simulate complex calculations
                for (let i = 0; i < progressData.length; i++) {
                    // Process each data point
                }
                
                return results;
            }
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.worker = new Worker(URL.createObjectURL(blob));
        
        this.worker.onmessage = (e) => {
            const { type, data } = e.data;
            if (type === 'statsResult') {
                this.handleStatsResult(data);
            }
        };
    }
};

// Add CSS for new animations
const gamificationStyle = document.createElement('style');
gamificationStyle.textContent = `
    @keyframes xpPop {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1.1);
        }
        100% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes levelUpAnimation {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
            opacity: 1;
        }
        70% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0;
        }
    }
    
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    .low-performance .particles-container {
        display: none !important;
    }
    
    .bonus-content,
    .level-up-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .bonus-icon,
    .level-up-icon {
        font-size: 2rem;
    }
    
    .bonus-text h4,
    .level-up-text h3 {
        margin-bottom: 0.25rem;
        font-size: 1.125rem;
    }
    
    .bonus-text p,
    .level-up-text p {
        font-size: 0.875rem;
        opacity: 0.9;
        margin: 0;
    }
`;
document.head.appendChild(gamificationStyle);

// Initialize enhanced features when app loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure app is fully initialized
    setTimeout(() => {
        if (app) {
            app.initializeAdaptiveLearning();
            app.addMicroInteractions();
            app.initializeSpacedRepetition();
            app.initializeCollaborativeFeatures();
            app.initializeGamification();
            app.initializePerformanceOptimizations();
            
            // Enhanced accessibility
            app.initializeAccessibility();
            
            // Update submit answer method to use all enhanced features
            const originalSubmitAnswer = app.submitAnswer.bind(app);
            app.submitAnswer = function() {
                const startTime = Date.now();
                const question = this.questions[this.quizState.currentQuestionIndex];
                const userAnswer = document.querySelector('.choice-option.selected')?.dataset.index;
                const isCorrect = userAnswer == question.correct;
                
                originalSubmitAnswer();
                
                // Track performance for adaptive learning
                const endTime = Date.now();
                const performance = isCorrect ? 1 : 0;
                const responseTime = endTime - startTime;
                
                this.adjustDifficulty({
                    correct: isCorrect,
                    timeSpent: responseTime,
                    hintUsed: false // Track this separately
                });
                
                // Update skill mastery
                this.updateSkillMastery(this.selectedAlgorithm, performance);
                
                // Add to spaced repetition system
                const conceptId = `${this.selectedAlgorithm}_q${question.id}`;
                this.addToSpacedRepetition(conceptId, performance);
                
                // Gamification rewards
                if (isCorrect) {
                    this.gamification.xpSystem.awardXP(20, 'Correct Answer');
                    
                    // Speed bonus
                    if (responseTime < 5000) {
                        this.gamification.xpSystem.awardXP(10, 'Speed Bonus');
                        this.checkBadgeUnlock('quick_learner');
                    }
                }
                
                // Update accessibility announcements
                this.announceToScreenReader(isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!');
            };
        }
    }, 500);
});

// Enhanced accessibility features
CodeMaster.prototype.initializeAccessibility = function() {
    // Keyboard navigation support
    this.setupKeyboardNavigation();
    
    // Screen reader announcements
    this.setupScreenReaderSupport();
    
    // Focus management
    this.setupFocusManagement();
};

CodeMaster.prototype.setupKeyboardNavigation = function() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'Escape':
                this.closeAllModals();
                break;
            case 'h':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.showContextualHint();
                }
                break;
            case 'Enter':
            case ' ':
                if (e.target.classList.contains('choice-option')) {
                    e.preventDefault();
                    e.target.click();
                }
                break;
        }
    });
    
    // Add keyboard user detection
    document.addEventListener('keydown', () => {
        document.body.classList.add('keyboard-user');
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-user');
    });
};

CodeMaster.prototype.setupScreenReaderSupport = function() {
    // Create announcement function
    this.announceToScreenReader = (message, priority = 'polite') => {
        const liveRegion = document.getElementById(priority === 'assertive' ? 'urgent-updates' : 'status-updates');
        liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
};

CodeMaster.prototype.setupFocusManagement = function() {
    // Focus trap for modals
    this.trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        firstElement?.focus();
    };
};

CodeMaster.prototype.closeAllModals = function() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
};

CodeMaster.prototype.checkBadgeUnlock = function(badgeId) {
    const badge = this.gamification.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
        badge.unlocked = true;
        this.showBadgeUnlock(badge);
    }
};