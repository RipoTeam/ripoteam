// Central database handler
const DB = {
    init() {
        if (!localStorage.getItem('dbInitialized')) {
            localStorage.setItem('users', JSON.stringify([{
                id: 1,
                username: "Ripo Team",
                password: "admin123",
                role: "admin",
                status: "active"
            }]));
            localStorage.setItem('dbInitialized', 'true');
        }
    },

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    },

    saveUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            ...userData,
            status: 'active'
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return newUser;
    },

    updateUser(id, userData) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            localStorage.setItem('users', JSON.stringify(users));
        }
    },

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
    }
};
