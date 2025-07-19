// ExpenseFlow - Advanced Expense Tracker
class ExpenseTracker {
    constructor() {
        this.transactions = this.loadFromStorage('transactions') || [];
        this.budgets = this.loadFromStorage('budgets') || [];
        this.goals = this.loadFromStorage('goals') || [];
        this.settings = this.loadFromStorage('settings') || this.getDefaultSettings();
        
        this.currentSection = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortField = 'date';
        this.sortDirection = 'desc';
        this.filters = {};
        
        this.charts = {};
        this.notifications = [];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupTheme();
        this.populateCategories();
        this.renderDashboard();
        this.hideLoadingScreen();
        
        // Sample data for demonstration
        if (this.transactions.length === 0) {
            this.addSampleData();
        }
    }

    // Storage Management
    saveToStorage(key, data) {
        localStorage.setItem(`expenseflow_${key}`, JSON.stringify(data));
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(`expenseflow_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from storage:', error);
            return null;
        }
    }

    getDefaultSettings() {
        return {
            currency: 'USD',
            currencySymbol: '$',
            dateFormat: 'MM/DD/YYYY',
            theme: 'light',
            notifications: true,
            categories: {
                income: [
                    'Salary', 'Freelance', 'Investment', 'Rental Income', 
                    'Business', 'Gifts', 'Other Income'
                ],
                expense: [
                    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
                    'Bills & Utilities', 'Healthcare', 'Education', 'Travel',
                    'Groceries', 'Rent/Mortgage', 'Insurance', 'Savings',
                    'Investments', 'Other Expenses'
                ]
            }
        };
    }

    // Loading Screen
    showLoadingScreen() {
        document.getElementById('loading-screen').classList.remove('hidden');
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 1500);
    }

    // Theme Management
    setupTheme() {
        const theme = this.settings.theme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.settings.theme = newTheme;
        this.saveToStorage('settings', this.settings);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Event Listeners
    setupEventListeners() {
        // Menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            this.toggleNavModal();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Navigation modal
        document.getElementById('close-nav-modal').addEventListener('click', () => {
            this.closeNavModal();
        });

        document.querySelector('.nav-modal-overlay').addEventListener('click', () => {
            this.closeNavModal();
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
                this.closeNavModal();
            });
        });

        // Add transaction buttons
        document.getElementById('add-transaction-btn').addEventListener('click', () => {
            this.openTransactionModal();
        });

        document.getElementById('add-transaction-btn-2').addEventListener('click', () => {
            this.openTransactionModal();
        });

        // Transaction modal
        document.getElementById('close-transaction-modal').addEventListener('click', () => {
            this.closeTransactionModal();
        });

        document.getElementById('cancel-transaction').addEventListener('click', () => {
            this.closeTransactionModal();
        });

        document.getElementById('transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTransaction();
        });

        // Transaction type radio buttons
        document.querySelectorAll('input[name="type"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateCategoriesForType(radio.value);
            });
        });

        // Recurring transaction checkbox
        document.getElementById('transaction-recurring').addEventListener('change', (e) => {
            document.getElementById('recurring-options').classList.toggle('hidden', !e.target.checked);
        });

        // Search and filters
        document.getElementById('transaction-search').addEventListener('input', (e) => {
            this.searchTransactions(e.target.value);
        });

        document.getElementById('filter-transactions-btn').addEventListener('click', () => {
            this.toggleFilters();
        });

        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Date range selector
        document.getElementById('date-range').addEventListener('change', (e) => {
            this.updateDateRange(e.target.value);
        });

        // Chart controls
        document.querySelectorAll('.chart-control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartType = e.target.dataset.chart;
                const chartCard = e.target.closest('.chart-card');
                const chartId = chartCard.querySelector('canvas').id;
                this.updateChartType(chartId, chartType);
                
                // Update active button
                chartCard.querySelectorAll('.chart-control-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Export/Import
        document.getElementById('export-data-btn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('import-data-btn').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });

        document.getElementById('import-file-input').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // Pagination
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTransactionsTable();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            this.currentPage++;
            this.renderTransactionsTable();
        });

        // Bulk actions
        document.getElementById('select-all-transactions').addEventListener('change', (e) => {
            this.toggleSelectAllTransactions(e.target.checked);
        });

        document.getElementById('delete-selected').addEventListener('click', () => {
            this.deleteSelectedTransactions();
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

    // Navigation
    toggleNavModal() {
        const modal = document.getElementById('nav-modal');
        const toggle = document.getElementById('menu-toggle');
        
        modal.classList.toggle('active');
        toggle.classList.toggle('active');
    }

    closeNavModal() {
        document.getElementById('nav-modal').classList.remove('active');
        document.getElementById('menu-toggle').classList.remove('active');
    }

    switchSection(section) {
        this.currentSection = section;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });

        // Show/hide sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `${section}-section`);
        });

        // Render section content
        switch (section) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'transactions':
                this.renderTransactionsTable();
                break;
            case 'budgets':
                this.renderBudgets();
                break;
            case 'goals':
                this.renderGoals();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'reports':
                this.renderReports();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    // Transaction Management
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    openTransactionModal(transaction = null) {
        const modal = document.getElementById('transaction-modal');
        const title = document.getElementById('transaction-modal-title');
        const form = document.getElementById('transaction-form');
        
        if (transaction) {
            title.textContent = 'Edit Transaction';
            this.populateTransactionForm(transaction);
        } else {
            title.textContent = 'Add Transaction';
            form.reset();
            document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
            this.updateCategoriesForType('expense');
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeTransactionModal() {
        document.getElementById('transaction-modal').classList.remove('active');
        document.body.style.overflow = '';
    }

    populateTransactionForm(transaction) {
        document.querySelector(`input[name="type"][value="${transaction.type}"]`).checked = true;
        document.getElementById('transaction-amount').value = transaction.amount;
        document.getElementById('transaction-date').value = transaction.date;
        document.getElementById('transaction-description').value = transaction.description;
        document.getElementById('transaction-notes').value = transaction.notes || '';
        document.getElementById('transaction-payment-method').value = transaction.paymentMethod || 'cash';
        
        this.updateCategoriesForType(transaction.type);
        document.getElementById('transaction-category').value = transaction.category;
    }

    updateCategoriesForType(type) {
        const categorySelect = document.getElementById('transaction-category');
        const categories = this.settings.categories[type] || [];
        
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    saveTransaction() {
        const formData = new FormData(document.getElementById('transaction-form'));
        const transaction = {
            id: this.generateId(),
            type: formData.get('type'),
            amount: parseFloat(formData.get('amount') || '0'),
            date: formData.get('date'),
            category: document.getElementById('transaction-category').value,
            description: document.getElementById('transaction-description').value,
            notes: document.getElementById('transaction-notes').value,
            paymentMethod: document.getElementById('transaction-payment-method').value,
            recurring: document.getElementById('transaction-recurring').checked,
            createdAt: new Date().toISOString()
        };

        if (transaction.recurring) {
            transaction.recurringFrequency = document.getElementById('recurring-frequency').value;
            transaction.recurringEndDate = document.getElementById('recurring-end-date').value;
        }

        this.transactions.unshift(transaction);
        this.saveToStorage('transactions', this.transactions);
        
        this.closeTransactionModal();
        this.renderDashboard();
        this.renderTransactionsTable();
        
        this.showNotification('Transaction added successfully!', 'success');
    }

    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveToStorage('transactions', this.transactions);
            this.renderDashboard();
            this.renderTransactionsTable();
            this.showNotification('Transaction deleted successfully!', 'success');
        }
    }

    // Categories Management
    populateCategories() {
        const filterCategory = document.getElementById('filter-category');
        const allCategories = [
            ...this.settings.categories.income,
            ...this.settings.categories.expense
        ];
        
        filterCategory.innerHTML = '<option value="">All Categories</option>';
        allCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });
    }

    // Dashboard Rendering
    renderDashboard() {
        this.updateOverviewCards();
        this.renderCharts();
        this.renderRecentTransactions();
        this.updateNavBalance();
    }

    updateOverviewCards() {
        const dateRange = this.getDateRange();
        const filteredTransactions = this.filterTransactionsByDate(dateRange);
        
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const expenses = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const balance = income - expenses;
        const savings = income * 0.2; // Assume 20% savings rate
        
        document.getElementById('total-income').textContent = this.formatCurrency(income);
        document.getElementById('total-expenses').textContent = this.formatCurrency(expenses);
        document.getElementById('net-balance').textContent = this.formatCurrency(balance);
        document.getElementById('total-savings').textContent = this.formatCurrency(savings);
        
        // Update trends (simplified calculation)
        this.updateTrends(filteredTransactions);
    }

    updateTrends(transactions) {
        // This is a simplified trend calculation
        // In a real app, you'd compare with previous periods
        const incomeTransactions = transactions.filter(t => t.type === 'income');
        const expenseTransactions = transactions.filter(t => t.type === 'expense');
        
        const incomeTrend = incomeTransactions.length > 5 ? '+12%' : '+5%';
        const expenseTrend = expenseTransactions.length > 10 ? '-8%' : '-3%';
        
        document.getElementById('income-trend').textContent = incomeTrend;
        document.getElementById('expense-trend').textContent = expenseTrend;
    }

    updateNavBalance() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const totalExpenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const balance = totalIncome - totalExpenses;
        document.getElementById('nav-balance').textContent = this.formatCurrency(balance);
    }

    // Charts
    renderCharts() {
        this.renderExpenseChart();
        this.renderTrendChart();
    }

    renderExpenseChart() {
        const ctx = document.getElementById('expense-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.expenseChart) {
            this.charts.expenseChart.destroy();
        }
        
        const expensesByCategory = this.getExpensesByCategory();
        
        this.charts.expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(expensesByCategory),
                datasets: [{
                    data: Object.values(expensesByCategory),
                    backgroundColor: [
                        '#6366f1', '#10b981', '#f59e0b', '#ef4444',
                        '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6',
                        '#f97316', '#84cc16', '#6b7280', '#64748b'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = this.formatCurrency(context.parsed);
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    renderTrendChart() {
        const ctx = document.getElementById('trend-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }
        
        const trendData = this.getTrendData();
        
        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: [
                    {
                        label: 'Income',
                        data: trendData.income,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Expenses',
                        data: trendData.expenses,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    updateChartType(chartId, type) {
        if (chartId === 'expense-chart' && this.charts.expenseChart) {
            this.charts.expenseChart.config.type = type;
            this.charts.expenseChart.update();
        } else if (chartId === 'trend-chart' && this.charts.trendChart) {
            this.charts.trendChart.config.type = type;
            this.charts.trendChart.update();
        }
    }

    getExpensesByCategory() {
        const expenses = this.transactions.filter(t => t.type === 'expense');
        const categories = {};
        
        expenses.forEach(expense => {
            const category = expense.category || 'Other';
            categories[category] = (categories[category] || 0) + expense.amount;
        });
        
        return categories;
    }

    getTrendData() {
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();
        
        const income = last30Days.map(date => {
            return this.transactions
                .filter(t => t.type === 'income' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);
        });
        
        const expenses = last30Days.map(date => {
            return this.transactions
                .filter(t => t.type === 'expense' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);
        });
        
        return {
            labels: last30Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            income,
            expenses
        };
    }

    // Recent Transactions
    renderRecentTransactions() {
        const container = document.getElementById('recent-transactions-list');
        const recentTransactions = this.transactions.slice(0, 5);
        
        if (recentTransactions.length === 0) {
            container.innerHTML = '<p class="text-center">No transactions yet. Add your first transaction!</p>';
            return;
        }
        
        container.innerHTML = recentTransactions.map(transaction => this.createTransactionRow(transaction, true)).join('');
    }

    createTransactionRow(transaction, isRecent = false) {
        const typeIcon = transaction.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down';
        const typeClass = transaction.type === 'income' ? 'text-success' : 'text-danger';
        const amount = transaction.type === 'income' ? `+${this.formatCurrency(transaction.amount)}` : `-${this.formatCurrency(transaction.amount)}`;
        
        if (isRecent) {
            return `
                <div class="transaction-row" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-light);">
                    <div class="transaction-icon" style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${transaction.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)'}; color: white;">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--text-primary);">${transaction.description}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${transaction.category} • ${new Date(transaction.date).toLocaleDateString()}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: ${transaction.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)'};">${amount}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${transaction.paymentMethod || 'Cash'}</div>
                    </div>
                </div>
            `;
        }
        
        return `
            <tr>
                <td><input type="checkbox" class="transaction-select" data-id="${transaction.id}"></td>
                <td>${new Date(transaction.date).toLocaleDateString()}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td><span class="badge badge-${transaction.type}">${transaction.type}</span></td>
                <td class="${typeClass}">${amount}</td>
                <td>
                    <button class="btn-sm btn-primary" onclick="app.editTransaction('${transaction.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-danger" onclick="app.deleteTransaction('${transaction.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    // Transactions Table
    renderTransactionsTable() {
        const tbody = document.getElementById('transactions-tbody');
        const filteredTransactions = this.getFilteredTransactions();
        const paginatedTransactions = this.paginateTransactions(filteredTransactions);
        
        tbody.innerHTML = paginatedTransactions.map(transaction => this.createTransactionRow(transaction)).join('');
        
        this.updatePaginationInfo(filteredTransactions.length);
        this.updateTransactionsCount(filteredTransactions.length);
    }

    getFilteredTransactions() {
        let filtered = [...this.transactions];
        
        // Apply filters
        if (this.filters.type) {
            filtered = filtered.filter(t => t.type === this.filters.type);
        }
        
        if (this.filters.category) {
            filtered = filtered.filter(t => t.category === this.filters.category);
        }
        
        if (this.filters.dateFrom) {
            filtered = filtered.filter(t => t.date >= this.filters.dateFrom);
        }
        
        if (this.filters.dateTo) {
            filtered = filtered.filter(t => t.date <= this.filters.dateTo);
        }
        
        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            filtered = filtered.filter(t => 
                t.description.toLowerCase().includes(search) ||
                t.category.toLowerCase().includes(search) ||
                t.notes?.toLowerCase().includes(search)
            );
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            let aVal = a[this.sortField];
            let bVal = b[this.sortField];
            
            if (this.sortField === 'date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else if (this.sortField === 'amount') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            if (this.sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        return filtered;
    }

    paginateTransactions(transactions) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return transactions.slice(startIndex, endIndex);
    }

    updatePaginationInfo(totalItems) {
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        document.getElementById('pagination-info').textContent = 
            `Showing ${startItem}-${endItem} of ${totalItems}`;
        
        document.getElementById('prev-page').disabled = this.currentPage <= 1;
        document.getElementById('next-page').disabled = this.currentPage >= totalPages;
        
        // Update page numbers
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.innerHTML = '';
        
        for (let i = Math.max(1, this.currentPage - 2); i <= Math.min(totalPages, this.currentPage + 2); i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = i === this.currentPage ? 'active' : '';
            button.addEventListener('click', () => {
                this.currentPage = i;
                this.renderTransactionsTable();
            });
            pageNumbers.appendChild(button);
        }
    }

    updateTransactionsCount(count) {
        document.getElementById('transactions-count').textContent = 
            `${count} transaction${count !== 1 ? 's' : ''}`;
    }

    // Search and Filters
    searchTransactions(query) {
        this.filters.search = query;
        this.currentPage = 1;
        this.renderTransactionsTable();
    }

    toggleFilters() {
        const filters = document.getElementById('transaction-filters');
        filters.classList.toggle('hidden');
    }

    applyFilters() {
        this.filters = {
            type: document.getElementById('filter-type').value,
            category: document.getElementById('filter-category').value,
            dateFrom: document.getElementById('filter-date-from').value,
            dateTo: document.getElementById('filter-date-to').value,
            search: this.filters.search || ''
        };
        
        this.currentPage = 1;
        this.renderTransactionsTable();
        this.toggleFilters();
    }

    clearFilters() {
        this.filters = {};
        this.currentPage = 1;
        
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-date-from').value = '';
        document.getElementById('filter-date-to').value = '';
        document.getElementById('transaction-search').value = '';
        
        this.renderTransactionsTable();
        this.toggleFilters();
    }

    // Date Range Management
    getDateRange() {
        const days = parseInt(document.getElementById('date-range').value);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
        
        return { startDate, endDate };
    }

    updateDateRange(days) {
        this.renderDashboard();
    }

    filterTransactionsByDate(dateRange) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= dateRange.startDate && transactionDate <= dateRange.endDate;
        });
    }

    // Utility Functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.settings.currency
        }).format(amount);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = '';
    }

    // Notifications
    showNotification(message, type = 'info', title = '') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${this.getNotificationIcon(type)}"></i>
                </div>
                <div class="notification-text">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Data Export/Import
    exportData() {
        const data = {
            transactions: this.transactions,
            budgets: this.budgets,
            goals: this.goals,
            settings: this.settings,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenseflow-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.transactions) this.transactions = data.transactions;
                if (data.budgets) this.budgets = data.budgets;
                if (data.goals) this.goals = data.goals;
                if (data.settings) this.settings = { ...this.settings, ...data.settings };
                
                this.saveToStorage('transactions', this.transactions);
                this.saveToStorage('budgets', this.budgets);
                this.saveToStorage('goals', this.goals);
                this.saveToStorage('settings', this.settings);
                
                this.renderDashboard();
                this.renderTransactionsTable();
                this.populateCategories();
                
                this.showNotification('Data imported successfully!', 'success');
            } catch (error) {
                this.showNotification('Error importing data. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Sample Data
    addSampleData() {
        const sampleTransactions = [
            {
                id: this.generateId(),
                type: 'income',
                amount: 5000,
                date: '2024-01-15',
                category: 'Salary',
                description: 'Monthly Salary',
                paymentMethod: 'bank-transfer',
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                type: 'expense',
                amount: 1200,
                date: '2024-01-10',
                category: 'Rent/Mortgage',
                description: 'Monthly Rent',
                paymentMethod: 'bank-transfer',
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                type: 'expense',
                amount: 450,
                date: '2024-01-08',
                category: 'Groceries',
                description: 'Weekly Grocery Shopping',
                paymentMethod: 'debit-card',
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                type: 'expense',
                amount: 80,
                date: '2024-01-05',
                category: 'Transportation',
                description: 'Gas Station',
                paymentMethod: 'credit-card',
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                type: 'income',
                amount: 1500,
                date: '2024-01-03',
                category: 'Freelance',
                description: 'Web Development Project',
                paymentMethod: 'digital-wallet',
                createdAt: new Date().toISOString()
            }
        ];
        
        this.transactions = sampleTransactions;
        this.saveToStorage('transactions', this.transactions);
    }

    // Placeholder methods for other sections
    renderBudgets() {
        console.log('Rendering budgets...');
    }

    renderGoals() {
        console.log('Rendering goals...');
    }

    renderAnalytics() {
        console.log('Rendering analytics...');
    }

    renderReports() {
        console.log('Rendering reports...');
    }

    renderSettings() {
        console.log('Rendering settings...');
    }

    // Bulk Actions
    toggleSelectAllTransactions(checked) {
        document.querySelectorAll('.transaction-select').forEach(checkbox => {
            checkbox.checked = checked;
        });
        this.updateBulkActionsState();
    }

    updateBulkActionsState() {
        const selectedCount = document.querySelectorAll('.transaction-select:checked').length;
        document.getElementById('delete-selected').disabled = selectedCount === 0;
    }

    deleteSelectedTransactions() {
        const selectedIds = Array.from(document.querySelectorAll('.transaction-select:checked'))
            .map(checkbox => checkbox.dataset.id);
        
        if (selectedIds.length === 0) return;
        
        if (confirm(`Are you sure you want to delete ${selectedIds.length} transaction(s)?`)) {
            this.transactions = this.transactions.filter(t => !selectedIds.includes(t.id));
            this.saveToStorage('transactions', this.transactions);
            this.renderDashboard();
            this.renderTransactionsTable();
            this.showNotification(`${selectedIds.length} transaction(s) deleted successfully!`, 'success');
        }
    }

    editTransaction(id) {
        const transaction = this.transactions.find(t => t.id === id);
        if (transaction) {
            this.openTransactionModal(transaction);
        }
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new ExpenseTracker();
});