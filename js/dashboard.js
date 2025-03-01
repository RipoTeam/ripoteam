// Mock data storage (replace with actual backend storage)
let users = [
    { id: 1, username: "ripo team", role: "admin" }
];

let tasks = [
    { id: 1, title: "Complete website redesign", assigned: "john", status: "pending" }
];

let warnings = [
    { id: 1, user: "mike", reason: "Missed deadline", date: "2023-10-15" }
];

let attendance = [
    { id: 1, user: "sarah", date: "2023-10-15", status: "present" }
];
  document.addEventListener('DOMContentLoaded', function() {
      // Set welcome message
      const welcomeMessage = document.getElementById('welcomeMessage');
      welcomeMessage.innerHTML = `
          <h1 class="display-4">${getTimeBasedGreeting()}</h1>
          <p class="lead">Here's your latest activity overview</p>
      `;

      // Load dashboard data
      loadDashboardStats();
      loadRecentActivities();
  });

  function getTimeBasedGreeting() {
      const hour = new Date().getHours();
      const username = localStorage.getItem('username');
    
      if (hour >= 5 && hour < 12) {
          return `Good morning, ${username}! 🌅`;
      } else if (hour >= 12 && hour < 17) {
          return `Good afternoon, ${username}! ☀️`;
      } else if (hour >= 17 && hour < 21) {
          return `Good evening, ${username}! 🌆`;
      } else {
          return `Good night, ${username}! 🌙`;
      }
  }

  function updateDashboardStats() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const warnings = JSON.parse(localStorage.getItem('warnings')) || [];
      const bans = JSON.parse(localStorage.getItem('bans')) || [];

      document.getElementById('totalUsers').textContent = users.length;
      document.getElementById('activeTasks').textContent = tasks.length;
      document.getElementById('activeWarnings').textContent = warnings.length;
      document.getElementById('activeBans').textContent = bans.filter(ban => ban.active).length;
  }
  function loadRecentActivities() {
      // Mock data - replace with actual API calls
      const recentTasks = document.getElementById('recentTasks');
      const recentWarnings = document.getElementById('recentWarnings');

      recentTasks.innerHTML = `
          <div class="activity-item">
              <div class="activity-title">Website Redesign</div>
              <div class="activity-status">In Progress</div>
          </div>
      `;

      recentWarnings.innerHTML = `
          <div class="activity-item">
              <div class="activity-title">Missed Team Meeting</div>
              <div class="activity-date">Today</div>
          </div>
      `;
  }

  function logout() {
      localStorage.clear();
      window.location.href = 'index.html';
  }

// Track user statistics
function updateUserStats() {
    users.forEach(user => {
        const stats = {
            tasks: tasks.filter(t => t.assigneeId === user.id).length,
            warnings: warnings.filter(w => w.userId === user.id).length,
            attendance: attendance.filter(a => a.userId === user.id && a.status === 'present').length,
            bans: bans.filter(b => b.userId === user.id && b.active).length
        };
        user.stats = stats;
    });
    localStorage.setItem('users', JSON.stringify(users));
}
