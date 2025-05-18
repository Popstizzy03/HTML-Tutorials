document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const expressionInput = document.getElementById('expression');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const detectBtn = document.getElementById('detect-btn');
    const resultDisplay = document.getElementById('result');
    const closeButton = document.querySelector('.close-button');
    const functionKeys = document.querySelectorAll('.function-key');
    const variableInputs = document.getElementById('variable-inputs');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Polynomial factors elements
    const PolynomialInput = document.getElementById('polynomial');
    const findFactorsButton = document.getElementById('find-factors-btn');
    const clearFactorsButton = document.getElementById('clear-factors-btn');
    const factorsResult = document.getElementById('factors-result');
    const factorsTableContainer = document.getElementById('factors-table-container');
    const factorsTableBody = document.getElementById('factors-table-body');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            //Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Focus on expression input on load
    expressionInput.focus();

    // Function Key insertion
    functionKeys.forEach(key => {
        key.addEventListener('click', function() {
            const value = this.getAttribute('data-key');
            const activeInput = document.activeElement;

            // If an input is focused, insert at cursor
            if (activeInput.tagName === 'INPUT') {
                insertAtCursor(activeInput, value);
            } else {
                // Default to expression input
                insertAtCursor(expressionInput, value);
                expressionInput.focus();
            }
        });
    });

    function insertAtCursor(input, text) {
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        const scrollTop = input.scrollTop;
        const currentValue = input.value;

        input.value = currentValue.substring(0, startPos) + text + currentValue.substring(endPos);
        input.selectionStart = input.selectionEnd = startPos + text.length;
        input.scrollTop = scrollTop;
    }

    // Detect variables in the expression
    detectBtn.addEventListener('click', detectVariables);

    function detectVariables() {
        try {
            const expression = expressionInput.value.trim();
            if (!expression) {
                throw new Error('Please enter an expression first');
            }
            // Find all variable names in the expression using regex
            // This looks for letters that aren't part of function names like sin, cos, etc.
            const functions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log', 'exp', 'abs'];
            const funcPattern = new RegExp(`\\b(${functions.join('|')})\\b`, `g`);

            // Replace known function names with empty strings temporarily
            let tempExpr = expression.replace(funcPattern, '');

            // Now find all single letters that could be variables
            const varRegex = /[a-zA-Z]/g;
            const matches = tempExpr.match(varRegex);

            // Extract unique variables
            const variables = [...new Set(matches)];

            if (!variables || variables.length === 0) {
                variableInputs.innerHTML = '<div>No variables detected in expression</div>';
                return;
            }

            // Create input fields for each variable
            variableInputs.innerHTML = '';
            variables.forEach(variable => {
                const varDiv = document.createElement('div');
                varDiv.className = 'variable-item';

                const varLabel = document.createElement('lable');
                varLabel.textContent = variable + '=';

                const varInput = document.createElement('input');
                varInput.type = 'text';
                varInput.id = `var-${variable}`;
                varInput.setAttribute('data-var', variable);
                varInput.value = '1'; // Default value

                varDiv.appendChild(varLabel);
                varDiv.appendChild(varInput);
                variableInputs.appendChild(varDiv);
            });
        } catch (error) {
            resultDisplay.innerHTML = `<span class="error">Error: ${error.message}</span>`;
            resultDisplay.classList.add('error');
        }
    }

                // Handle calculation
            calculateBtn.addEventListener('click', calculateResult);
})