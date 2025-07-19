// Notes & Tasks Manager JavaScript

class NotesTasksManager {
    constructor() {
        this.notes = this.loadFromStorage('notes') || [];
        this.tasks = this.loadFromStorage('tasks') || [];
        this.currentTab = 'notes';
        this.currentFilter = 'all';
        this.editingId = null;
        this.editingType = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.renderNotes();
        this.renderTasks();
        this.updateTasksSummary();
    }

    // Local Storage Methods
    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from storage:', error);
            return null;
        }
    }

    // Theme Management
    setupTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#toggle-theme i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        document.getElementById('toggle-theme').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Clear all data
        document.getElementById('clear-all').addEventListener('click', () => {
            this.confirmAction('Are you sure you want to clear all notes and tasks? This action cannot be undone.', () => {
                this.clearAllData();
            });
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Add buttons
        document.getElementById('add-note-btn').addEventListener('click', () => {
            this.openNoteModal();
        });

        document.getElementById('add-task-btn').addEventListener('click', () => {
            this.openTaskModal();
        });

        // Search functionality
        document.getElementById('notes-search').addEventListener('input', (e) => {
            this.searchNotes(e.target.value);
        });

        document.getElementById('tasks-search').addEventListener('input', (e) => {
            this.searchTasks(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTaskFilter(btn.dataset.filter);
            });
        });

        // Modal event listeners
        this.setupModalListeners();
    }

    setupModalListeners() {
        // Note modal
        document.getElementById('close-note-modal').addEventListener('click', () => {
            this.closeModal('note-modal');
        });

        document.getElementById('cancel-note').addEventListener('click', () => {
            this.closeModal('note-modal');
        });

        document.getElementById('note-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNote();
        });

        // Task modal
        document.getElementById('close-task-modal').addEventListener('click', () => {
            this.closeModal('task-modal');
        });

        document.getElementById('cancel-task').addEventListener('click', () => {
            this.closeModal('task-modal');
        });

        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Confirmation modal
        document.getElementById('confirm-cancel').addEventListener('click', () => {
            this.closeModal('confirm-modal');
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

    // Tab Management
    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === `${tab}-section`);
        });
    }

    // Notes Management
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    openNoteModal(noteId = null) {
        this.editingId = noteId;
        this.editingType = 'note';
        
        const modal = document.getElementById('note-modal');
        const title = document.getElementById('note-modal-title');
        const form = document.getElementById('note-form');
        
        if (noteId) {
            const note = this.notes.find(n => n.id === noteId);
            title.textContent = 'Edit Note';
            document.getElementById('note-title').value = note.title;
            document.getElementById('note-content').value = note.content;
            document.getElementById('note-category').value = note.category;
        } else {
            title.textContent = 'Add Note';
            form.reset();
        }
        
        this.showModal('note-modal');
        document.getElementById('note-title').focus();
    }

    saveNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();
        const category = document.getElementById('note-category').value;

        if (!title || !content) {
            alert('Please fill in all required fields.');
            return;
        }

        const noteData = {
            id: this.editingId || this.generateId(),
            title,
            content,
            category,
            createdAt: this.editingId ? 
                this.notes.find(n => n.id === this.editingId).createdAt : 
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingId) {
            const index = this.notes.findIndex(n => n.id === this.editingId);
            this.notes[index] = noteData;
        } else {
            this.notes.unshift(noteData);
        }

        this.saveToStorage('notes', this.notes);
        this.renderNotes();
        this.closeModal('note-modal');
        this.editingId = null;
    }

    deleteNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        this.confirmAction(`Are you sure you want to delete "${note.title}"?`, () => {
            this.notes = this.notes.filter(n => n.id !== noteId);
            this.saveToStorage('notes', this.notes);
            this.renderNotes();
        });
    }

    searchNotes(query) {
        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase()) ||
            note.category.toLowerCase().includes(query.toLowerCase())
        );
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        const container = document.getElementById('notes-grid');
        const emptyState = document.getElementById('empty-notes');
        
        if (notesToRender.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        container.innerHTML = notesToRender.map(note => this.createNoteCard(note)).join('');
    }

    createNoteCard(note) {
        const date = new Date(note.createdAt).toLocaleDateString();
        const truncatedContent = note.content.length > 200 ? 
            note.content.substring(0, 200) + '...' : 
            note.content;

        return `
            <div class="note-card">
                <div class="note-header">
                    <h3 class="note-title">${this.escapeHtml(note.title)}</h3>
                    <div class="note-actions">
                        <button class="note-action edit" onclick="app.openNoteModal('${note.id}')" title="Edit note">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-action delete" onclick="app.deleteNote('${note.id}')" title="Delete note">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content">${this.escapeHtml(truncatedContent)}</div>
                <div class="note-footer">
                    <span class="note-category category-${note.category}">${note.category}</span>
                    <span class="note-date">${date}</span>
                </div>
            </div>
        `;
    }

    // Tasks Management
    openTaskModal(taskId = null) {
        this.editingId = taskId;
        this.editingType = 'task';
        
        const modal = document.getElementById('task-modal');
        const title = document.getElementById('task-modal-title');
        const form = document.getElementById('task-form');
        
        if (taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            title.textContent = 'Edit Task';
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description || '';
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('task-due-date').value = task.dueDate || '';
        } else {
            title.textContent = 'Add Task';
            form.reset();
            document.getElementById('task-priority').value = 'medium';
        }
        
        this.showModal('task-modal');
        document.getElementById('task-title').focus();
    }

    saveTask() {
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-due-date').value;

        if (!title) {
            alert('Please enter a task title.');
            return;
        }

        const taskData = {
            id: this.editingId || this.generateId(),
            title,
            description,
            priority,
            dueDate,
            completed: this.editingId ? 
                this.tasks.find(t => t.id === this.editingId).completed : 
                false,
            createdAt: this.editingId ? 
                this.tasks.find(t => t.id === this.editingId).createdAt : 
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingId) {
            const index = this.tasks.findIndex(t => t.id === this.editingId);
            this.tasks[index] = taskData;
        } else {
            this.tasks.unshift(taskData);
        }

        this.saveToStorage('tasks', this.tasks);
        this.renderTasks();
        this.updateTasksSummary();
        this.closeModal('task-modal');
        this.editingId = null;
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        
        this.saveToStorage('tasks', this.tasks);
        this.renderTasks();
        this.updateTasksSummary();
    }

    deleteTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        this.confirmAction(`Are you sure you want to delete "${task.title}"?`, () => {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveToStorage('tasks', this.tasks);
            this.renderTasks();
            this.updateTasksSummary();
        });
    }

    setTaskFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderTasks();
    }

    searchTasks(query) {
        const filteredTasks = this.getFilteredTasks().filter(task => 
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(query.toLowerCase()))
        );
        this.renderTasks(filteredTasks);
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'high':
                return this.tasks.filter(task => task.priority === 'high');
            default:
                return this.tasks;
        }
    }

    renderTasks(tasksToRender = null) {
        const tasks = tasksToRender || this.getFilteredTasks();
        const container = document.getElementById('tasks-list');
        const emptyState = document.getElementById('empty-tasks');
        
        if (tasks.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'block';
        emptyState.style.display = 'none';
        
        container.innerHTML = tasks.map(task => this.createTaskCard(task)).join('');
    }

    createTaskCard(task) {
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        const dueDateText = task.dueDate ? 
            new Date(task.dueDate).toLocaleDateString() : 
            'No due date';

        return `
            <div class="task-card ${task.completed ? 'completed' : ''}">
                <div class="task-header">
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        onchange="app.toggleTaskComplete('${task.id}')"
                    >
                    <div class="task-content">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                        <div class="task-meta">
                            <span class="task-priority priority-${task.priority}">${task.priority} priority</span>
                            <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                                <i class="fas fa-calendar-alt"></i>
                                ${dueDateText}
                                ${isOverdue ? ' (Overdue)' : ''}
                            </span>
                        </div>
                        <div class="task-actions">
                            <button class="task-action edit" onclick="app.openTaskModal('${task.id}')" title="Edit task">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="task-action delete" onclick="app.deleteTask('${task.id}')" title="Delete task">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateTasksSummary() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        document.getElementById('total-tasks').textContent = total;
        document.getElementById('completed-tasks').textContent = completed;
        document.getElementById('pending-tasks').textContent = pending;
    }

    // Modal Management
    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        document.body.style.overflow = '';
        this.editingId = null;
        this.editingType = null;
    }

    // Confirmation Dialog
    confirmAction(message, callback) {
        document.getElementById('confirm-message').textContent = message;
        this.showModal('confirm-modal');
        
        // Remove any existing listeners
        const confirmBtn = document.getElementById('confirm-ok');
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        // Add new listener
        newConfirmBtn.addEventListener('click', () => {
            callback();
            this.closeModal('confirm-modal');
        });
    }

    // Utility Methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearAllData() {
        this.notes = [];
        this.tasks = [];
        this.saveToStorage('notes', this.notes);
        this.saveToStorage('tasks', this.tasks);
        this.renderNotes();
        this.renderTasks();
        this.updateTasksSummary();
    }

    // Export/Import functionality (bonus feature)
    exportData() {
        const data = {
            notes: this.notes,
            tasks: this.tasks,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `notes-tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.notes) this.notes = data.notes;
                if (data.tasks) this.tasks = data.tasks;
                
                this.saveToStorage('notes', this.notes);
                this.saveToStorage('tasks', this.tasks);
                this.renderNotes();
                this.renderTasks();
                this.updateTasksSummary();
                
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new NotesTasksManager();
    
    // Add some sample data if no data exists
    if (app.notes.length === 0 && app.tasks.length === 0) {
        // Sample notes
        app.notes = [
            {
                id: 'sample-note-1',
                title: 'Welcome to Notes & Tasks Manager!',
                content: 'This is a sample note to help you get started. You can create, edit, and delete notes easily. Notes are great for capturing ideas, meeting notes, and important information.',
                category: 'general',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'sample-note-2',
                title: 'Project Ideas',
                content: 'Here are some project ideas for this weekend:\n\n• Build a personal website\n• Learn a new programming language\n• Create a mobile app\n• Start a blog\n• Contribute to open source',
                category: 'ideas',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                updatedAt: new Date(Date.now() - 86400000).toISOString()
            }
        ];
        
        // Sample tasks
        app.tasks = [
            {
                id: 'sample-task-1',
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the new project including setup instructions and API documentation.',
                priority: 'high',
                dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // 2 days from now
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'sample-task-2',
                title: 'Review code changes',
                description: 'Review the pull requests from team members and provide feedback.',
                priority: 'medium',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 1 day from now
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'sample-task-3',
                title: 'Set up development environment',
                description: 'Install necessary tools and configure the development environment for the new project.',
                priority: 'medium',
                dueDate: '',
                completed: true,
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        
        app.saveToStorage('notes', app.notes);
        app.saveToStorage('tasks', app.tasks);
        app.renderNotes();
        app.renderTasks();
        app.updateTasksSummary();
    }
});