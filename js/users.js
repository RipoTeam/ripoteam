// Initialize database on page load
DB.init();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize users array from localStorage
    loadUsers();
    populateUserSelects();
    
    // Add click event listener to save button
    document.getElementById('saveUserBtn').addEventListener('click', function() {
        saveUser();
    });
});
  // Initialize users if not exists
  if (!localStorage.getItem('users')) {
      const initialUsers = [
          { 
              id: 1, 
              username: "Ripo Team", 
              password: "admin123", 
              role: "admin", 
              status: "active" 
          },
          {
              id: 2,
              username: "test",
              password: "test123",
              role: "user",
              status: "active"
          }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  function loadUsers() {
      const users = JSON.parse(localStorage.getItem('users'));
      const usersList = document.getElementById('usersList');
    
      usersList.innerHTML = users.map(user => `
          <tr>
              <td>${user.username}</td>
              <td><span class="badge bg-${user.role === 'admin' ? 'primary' : 'secondary'}">${user.role}</span></td>
              <td><span class="badge bg-${user.status === 'active' ? 'success' : 'danger'}">${user.status}</span></td>
              <td>
                  <button class="btn btn-sm btn-info" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
              </td>
          </tr>
      `).join('');
  }

  // Call this when page loads
  document.addEventListener('DOMContentLoaded', function() {
      loadUsers();
      populateUserSelects();
  });

  function populateUserSelects() {
      const users = JSON.parse(localStorage.getItem('users'));
      const selects = ['banUser', 'warningUser', 'taskAssignee', 'attendanceUser'];
    
      selects.forEach(selectId => {
          const select = document.getElementById(selectId);
          if (select) {
              select.innerHTML = users.map(user => `
                  <option value="${user.id}">${user.username}</option>
              `).join('');
          }
      });
  }

  function editUser(id) {
      const users = JSON.parse(localStorage.getItem('users'));
      const user = users.find(u => u.id === id);
      if (user) {
          document.getElementById('userId').value = user.id;
          document.getElementById('username').value = user.username;
          document.getElementById('userRole').value = user.role;
          new bootstrap.Modal(document.getElementById('userModal')).show();
      }
  }

  function deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
          let users = JSON.parse(localStorage.getItem('users'));
          users = users.filter(u => u.id !== id);
          localStorage.setItem('users', JSON.stringify(users));
          loadUsers();
          showNotification('User deleted successfully');
      }
  }

  function saveUser() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('userRole').value;

      if (!username || !password) {
          alert('Please fill in all fields');
          return;
      }

      const newUser = {
          id: Date.now(),
          username: username,
          password: password,
          role: role,
          status: 'active'
      };

      let users = JSON.parse(localStorage.getItem('users'));
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
      modal.hide();
    
      // Refresh user list
      loadUsers();
    
      // Clear form
      document.getElementById('userForm').reset();

      showNotification('User created successfully!');
  }

  function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
      notification.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
  }
