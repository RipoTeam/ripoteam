let bans = [];

document.addEventListener('DOMContentLoaded', function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userSelect = document.getElementById('banUser');
    userSelect.innerHTML = users.map(user => `
        <option value="${user.id}">${user.username}</option>
    `).join('');
});

function loadUsers() {
    const userSelect = document.getElementById('banUser');
    userSelect.innerHTML = users.map(user => `
        <option value="${user.id}">${user.username}</option>
    `).join('');
}

function loadBans() {
    const bansList = document.getElementById('bansList');
    bansList.innerHTML = bans.map(ban => `
        <tr>
            <td>${getUserName(ban.userId)}</td>
            <td>${ban.reason}</td>
            <td>${formatDuration(ban.duration)}</td>
            <td>${ban.startDate}</td>
            <td>${ban.duration === 'permanent' ? 'Never' : ban.endDate}</td>
            <td>
                <span class="badge bg-${ban.active ? 'danger' : 'secondary'}">
                    ${ban.active ? 'Active' : 'Expired'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="revokeBan(${ban.id})">
                    <i class="fas fa-undo"></i> Revoke
                </button>
            </td>
        </tr>
    `).join('');
}

function formatDuration(duration) {
    if (duration === 'permanent') return 'Permanent';
    if (duration === '1') return '1 Day';
    if (duration === '3') return '3 Days';
    if (duration === '7') return '1 Week';
    if (duration === '30') return '1 Month';
    return duration + ' Days';
}

function calculateEndDate(duration) {
    if (duration === 'permanent') return 'Never';
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(duration));
    return endDate.toLocaleDateString();
}

function showAddBanModal() {
    new bootstrap.Modal(document.getElementById('banModal')).show();
}

function addBan() {
    const bans = JSON.parse(localStorage.getItem('bans')) || [];
    const newBan = {
        id: Date.now(),
        userId: document.getElementById('banUser').value,
        reason: document.getElementById('banReason').value,
        duration: document.getElementById('banDuration').value,
        date: new Date().toISOString(),
        active: true
    };
    
    bans.push(newBan);
    localStorage.setItem('bans', JSON.stringify(bans));
    
    // Close modal and refresh display
    const modal = bootstrap.Modal.getInstance(document.getElementById('banModal'));
    modal.hide();
    loadBans();
}

function revokeBan(id) {
    const banIndex = bans.findIndex(b => b.id === id);
    if (banIndex !== -1) {
        const ban = bans[banIndex];
        ban.active = false;
        
        // Update user status
        const userIndex = users.findIndex(u => u.id === ban.userId);
        if (userIndex !== -1) {
            users[userIndex].status = 'active';
        }
        
        loadBans();
        showNotification(`Ban revoked for ${getUserName(ban.userId)}`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 m-3';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
