
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
            const polynomialInput = document.getElementById('polynomial');
            const findFactorsBtn = document.getElementById('find-factors-btn');
            const clearFactorsBtn = document.getElementById('clear-factors-btn');
            const factorsResult = document.getElementById('factors-result');
            const factorsTableContainer = document.getElementById('factors-table-container');
            const factorsTableBody = document.getElementById('factors-table-body');
            
            // Tab switching
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    document.getElementById(`${tabId}-tab`).classList.add('active');
                });
            });

            // Focus on expression input on load
            expressionInput.focus();

            // Function key insertion
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

                    // Find all variable names in the expression using a regex
                    // This looks for letters that aren't part of function names like sin, cos, etc.
                    const functions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log', 'exp', 'abs'];
                    const funcPattern = new RegExp(`\\b(${functions.join('|')})\\b`, 'g');
                    
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
                        
                        const varLabel = document.createElement('label');
                        varLabel.textContent = variable + ' =';
                        
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
            
            // Allow pressing Enter to calculate
            expressionInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') calculateResult();
            });

            // Clear inputs and result
            clearBtn.addEventListener('click', function() {
                expressionInput.value = '';
                variableInputs.innerHTML = '';
                resultDisplay.innerHTML = 'Enter an expression and click Calculate';
                resultDisplay.classList.remove('error');
                expressionInput.focus();
            });

            // Close button (just resets the calculator for demo purposes)
            closeButton.addEventListener('click', function() {
                expressionInput.value = '';
                variableInputs.innerHTML = '';
                resultDisplay.innerHTML = 'Enter an expression and click Calculate';
                resultDisplay.classList.remove('error');
                expressionInput.focus();
            });

            function calculateResult() {
                try {
                    const expression = expressionInput.value.trim();
                    if (!expression) {
                        throw new Error('Please enter an expression');
                    }

                    // Remove any semicolons that could cause parsing errors
                    const cleanExpression = expression.replace(/;/g, '');

                    // Create a scope with all variable values
                    const scope = {};
                    const varInputs = document.querySelectorAll('[data-var]');
                    
                    if (varInputs.length > 0) {
                        varInputs.forEach(input => {
                            const varName = input.getAttribute('data-var');
                            const varValue = input.value.trim();
                            
                            if (!varValue) {
                                throw new Error(`Please enter a value for ${varName}`);
                            }
                            
                            try {
                                scope[varName] = math.evaluate(varValue);
                            } catch (e) {
                                throw new Error(`Invalid value for ${varName}: ${e.message}`);
                            }
                        });
                    } else {
                        // If no variables have been detected yet, try to detect them now
                        detectVariables();
                        
                        // If we now have variables, ask the user to set values
                        const newVarInputs = document.querySelectorAll('[data-var]');
                        if (newVarInputs.length > 0) {
                            throw new Error('Variables detected. Please set values for them and calculate again.');
                        }
                    }

                    // Evaluate the expression with the scope
                    let result;
                    try {
                        result = math.evaluate(cleanExpression, scope);
                    } catch (e) {
                        // Provide more user-friendly error message
                        if (e.message.includes("Undefined symbol")) {
                            throw new Error("Unknown symbol or function. Check your expression.");
                        } else if (e.message.includes("Unexpected end of expression")) {
                            throw new Error("Incomplete expression. Check for missing parentheses.");
                        } else {
                            throw new Error(e.message);
                        }
                    }
                    
                    // Format the result
                    let formattedResult;
                    if (typeof result === 'number') {
                        // Check if the result is very close to an integer
                        if (Math.abs(result - Math.round(result)) < 1e-10) {
                            formattedResult = Math.round(result);
                        } else {
                            // Limit decimal places but remove trailing zeros
                            formattedResult = result.toFixed(10).replace(/\.?0+$/, '');
                            // If it has a decimal point but ends with just the decimal point, remove it
                            if (formattedResult.endsWith('.')) {
                                formattedResult = formattedResult.slice(0, -1);
                            }
                        }
                    } else {
                        formattedResult = result.toString();
                    }

                    // Build the result display
                    let resultText = `Result: ${formattedResult}`;
                    
                    // Add variable values to the display
                    if (Object.keys(scope).length > 0) {
                        resultText += "<br><br>With variables:";
                        for (const [key, value] of Object.entries(scope)) {
                            resultText += `<br>${key} = ${value}`;
                        }
                    }

                    resultDisplay.innerHTML = resultText;
                    resultDisplay.classList.remove('error');
                } catch (error) {
                    resultDisplay.innerHTML = `<span class="error">Error: ${error.message}</span>`;
                    resultDisplay.classList.add('error');
                }
            }
            
            // Polynomial Factor Finding
            findFactorsBtn.addEventListener('click', findFactors);
            
            clearFactorsBtn.addEventListener('click', function() {
                polynomialInput.value = '';
                factorsResult.innerHTML = 'Enter a polynomial and click Find Factors';
                factorsTableContainer.classList.add('hidden');
                factorsTableBody.innerHTML = '';
            });

            function findFactors() {
                try {
                    const polynomial = polynomialInput.value.trim();
                    if (!polynomial) {
                        throw new Error('Please enter a polynomial');
                    }

                    // Parse the polynomial to get coefficients
                    const polyObj = parsePolynomial(polynomial);
                    const degree = polyObj.degree;
                    const coefficients = polyObj.coefficients;
                    
                    // Get possible rational roots using the Rational Root Theorem
                    const rationalRoots = getPossibleRationalRoots(coefficients);
                    
                    // Test each potential root
                    const actualRoots = [];
                    const testResults = [];
                    
                    rationalRoots.forEach(root => {
                        // Evaluate the polynomial at this value
                        const scope = { x: root };
                        let result;
                        
                        try {
                            result = math.evaluate(polynomial, scope);
                            // Round to handle floating point errors
                            result = Math.round(result * 1e10) / 1e10;
                            
                            const isRoot = Math.abs(result) < 1e-9;
                            testResults.push({
                                value: root,
                                result: result,
                                isRoot: isRoot
                            });
                            
                            if (isRoot) {
                                actualRoots.push(root);
                            }
                        } catch (e) {
                            console.error(`Error evaluating at x = ${root}: ${e.message}`);
                        }
                    });
                    
                    // Display results
                    factorsTableContainer.classList.remove('hidden');
                    factorsTableBody.innerHTML = '';
                    
                    // Sort test results: roots first, then by absolute value
                    testResults.sort((a, b) => {
                        if (a.isRoot && !b.isRoot) return -1;
                        if (!a.isRoot && b.isRoot) return 1;
                        return Math.abs(a.value) - Math.abs(b.value);
                    });
                    
                    testResults.forEach(test => {
                        const row = document.createElement('tr');
                        
                        const valueCell = document.createElement('td');
                        valueCell.textContent = test.value;
                        
                        const resultCell = document.createElement('td');
                        resultCell.textContent = test.result;
                        
                        const isRootCell = document.createElement('td');
                        if (test.isRoot) {
                            isRootCell.textContent = "YES";
                            isRootCell.style.color = "green";
                            isRootCell.style.fontWeight = "bold";
                        } else {
                            isRootCell.textContent = "NO";
                        }
                        
                        row.appendChild(valueCell);
                        row.appendChild(resultCell);
                        row.appendChild(isRootCell);
                        factorsTableBody.appendChild(row);
                    });
                    
                    // Display a summary in the results area
                    let resultHTML = `<strong>Polynomial: ${polynomial}</strong><br><br>`;
                    
                    if (actualRoots.length > 0) {
                        resultHTML += `<strong>Found ${actualRoots.length} root(s):</strong><br>`;
                        actualRoots.forEach(root => {
                            resultHTML += `• x = ${root} is a root (P(${root}) = 0)<br>`;
                            const factor = root === 0 ? 'x' : `(x - ${root})`;
                            resultHTML += `  Therefore ${factor} is a factor<br>`;
                        });
                    } else {
                        resultHTML += "No rational roots found among the tested values.<br>";
                        resultHTML += "The polynomial might have irrational or complex roots.<br>";
                    }
                    
                    factorsResult.innerHTML = resultHTML;
                } catch (error) {
                    factorsResult.innerHTML = `<span class="error">Error: ${error.message}</span>`;
                    factorsTableContainer.classList.add('hidden');
                }
            }

            function parsePolynomial(polyString) {
                try {
                    // Create a symbolic polynomial expression
                    const node = math.parse(polyString);
                    
                    // Convert to a polynomial in the form a*x^n + b*x^(n-1) + ... + c
                    const simplified = node.toString({implicit: 'hide'});
                    
                    // Try to extract the degree and coefficients
                    let degree = 0;
                    const coefficients = [];
                    
                    // Find the highest power of x (the degree)
                    const degreeMatch = simplified.match(/x\^(\d+)/);
                    if (degreeMatch) {
                        degree = parseInt(degreeMatch[1]);
                    } else if (simplified.includes('x')) {
                        // If there's an x without a power, the degree is 1
                        degree = 1;
                    }
                    
                    // For a proper analysis, we'd need to extract all coefficients
                    // This is a simplified version - for a real calculator we'd use a more
                    // robust polynomial parser, but this helps demonstrate the feature
                    
                    // Extract constant term
                    const constantTerm = evaluateAtZero(polyString);
                    
                    // Extract leading coefficient
                    let leadingCoef = 1; // Default if not specified
                    
                    try {
                        // Temporarily replace x with a very large value to isolate the leading term
                        const largeX = 1e10;
                        const scope = { x: largeX };
                        const evaluated = math.evaluate(polyString, scope);
                        
                        // The leading coefficient is approximately evaluated / x^degree
                        leadingCoef = evaluated / Math.pow(largeX, degree);
                        leadingCoef = Math.round(leadingCoef * 1000) / 1000; // Round to handle float errors
                    } catch (e) {
                        console.error("Error finding leading coefficient:", e);
                    }
                    
                    return {
                        degree: degree,
                        coefficients: {
                            leading: leadingCoef,
                            constant: constantTerm
                        }
                    };
                } catch (e) {
                    throw new Error("Invalid polynomial format: " + e.message);
                }
            }
            
            function evaluateAtZero(expression) {
                try {
                    const scope = { x: 0 };
                    return math.evaluate(expression, scope);
                } catch (e) {
                    console.error("Error evaluating at zero:", e);
                    return 0;
                }
            }
            
            function getPossibleRationalRoots(coeffs) {
                // Based on the Rational Root Theorem
                // If p/q is a rational root (in lowest terms), p divides the constant term
                // and q divides the leading coefficient
                
                const constantTerm = Math.abs(coeffs.constant);
                const leadingCoeff = Math.abs(coeffs.leading);
                
                // Get factors of the constant term (possible p values)
                const pFactors = getFactors(constantTerm);
                
                // Get factors of the leading coefficient (possible q values)
                const qFactors = getFactors(leadingCoeff);
                
                // Generate all possible rational roots p/q
                const possibleRoots = [];
                
                // Add 0 if constant term is 0
                if (constantTerm === 0) {
                    possibleRoots.push(0);
                }
                
                // Generate p/q values
                pFactors.forEach(p => {
                    qFactors.forEach(q => {
                        possibleRoots.push(p/q);
                        possibleRoots.push(-p/q);  // Also need negative values
                    });
                });
                
                // Add some common values for thoroughness
                const commonValues = [
                    -2, -1.5, -1, -0.5, -0.25, 0.25, 0.5, 1, 1.5, 2
                ];
                
                commonValues.forEach(val => {
                    if (!possibleRoots.includes(val)) {
                        possibleRoots.push(val);
                    }
                });
                
                // Remove duplicates and sort
                return [...new Set(possibleRoots)].sort((a, b) => a - b);
            }
            
            function getFactors(n) {
                // Get all factors of a number
                if (n === 0) return [0];
                
                const factors = [];
                const absN = Math.abs(n);
                
                // Find factors
                for (let i = 1; i <= Math.sqrt(absN); i++) {
                    if (absN % i === 0) {
                        factors.push(i);
                        if (i !== absN / i) {
                            factors.push(absN / i);
                        }
                    }
                }
                
                // Include 1 if not already there
                if (!factors.includes(1)) {
                    factors.push(1);
                }
                
                return factors.sort((a, b) => a - b);
            }

            // Support for dark mode
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
            
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
        });