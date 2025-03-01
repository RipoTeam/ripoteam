// Include this in all pages to maintain consistent navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Insert sidebar into every page
    document.body.insertAdjacentHTML('afterbegin', `
        <div class="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-shield-alt"></i> Ripo Team
            </div>
            <ul class="sidebar-menu">
                <li>
                    <a href="dashboard.html" class="${currentPage === 'dashboard.html' ? 'active' : ''}">
                        <i class="fas fa-home"></i> Dashboard
                    </a>
                </li>
                <li>
                    <a href="users.html" class="${currentPage === 'users.html' ? 'active' : ''}">
                        <i class="fas fa-users"></i> Users
                    </a>
                </li>
                <li>
                    <a href="tasks.html" class="${currentPage === 'tasks.html' ? 'active' : ''}">
                        <i class="fas fa-tasks"></i> Tasks
                    </a>
                </li>
                <li>
                    <a href="warnings.html" class="${currentPage === 'warnings.html' ? 'active' : ''}">
                        <i class="fas fa-exclamation-triangle"></i> Warnings
                    </a>
                </li>
                <li>
                    <a href="bans.html" class="${currentPage === 'bans.html' ? 'active' : ''}">
                        <i class="fas fa-ban"></i> Bans
                    </a>
                </li>
                <li>
                    <a href="attendance.html" class="${currentPage === 'attendance.html' ? 'active' : ''}">
                        <i class="fas fa-calendar-check"></i> Attendance
                    </a>
                </li>
                <li class="mt-auto">
                    <a href="#" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </li>
            </ul>
        </div>
    `);
});
