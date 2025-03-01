let warnings = [];

document.addEventListener('DOMContentLoaded', function() {
    const issueWarningBtn = document.getElementById('issueWarningBtn');
    if (issueWarningBtn) {
        issueWarningBtn.addEventListener('click', issueWarning);
    }
    updateWarningsDisplay();
    populateUserSelect('warningUser');
});

function issueWarning() {
    const warnings = JSON.parse(localStorage.getItem('warnings')) || [];
    const newWarning = {
        id: Date.now(),
        userId: document.getElementById('warningUser').value,
        reason: document.getElementById('warningReason').value,
        severity: document.getElementById('warningSeverity').value,
        date: new Date().toISOString()
    };
    
    warnings.push(newWarning);
    localStorage.setItem('warnings', JSON.stringify(warnings));
    
    // Close modal and refresh
    const modal = bootstrap.Modal.getInstance(document.getElementById('warningModal'));
    modal.hide();
    loadWarnings();
}function loadUsers() {
    const userSelect = document.getElementById('warningUser');
    userSelect.innerHTML = users.map(user => `
        <option value="${user.id}">${user.username}</option>
    `).join('');
}

function loadWarnings() {
    const warningsList = document.getElementById('warningsList');
    warningsList.innerHTML = warnings.map(warning => `
        <tr>
            <td>${getUserName(warning.userId)}</td>
            <td>${warning.reason}</td>
            <td>${warning.date}</td>
            <td>
                <span class="badge bg-${getWarningLevelColor(warning.level)}">
                    ${warning.level}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeWarning(${warning.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function getUserName(userId) {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
}

function getWarningLevelColor(level) {
    switch(level) {
        case 'minor': return 'warning';
        case 'moderate': return 'orange';
        case 'severe': return 'danger';
        default: return 'secondary';
    }
}

function showAddWarningModal() {
    new bootstrap.Modal(document.getElementById('warningModal')).show();
// Warnings system
let warnings = JSON.parse(localStorage.getItem('warnings')) || [];

function issueWarning() {
    const warning = {
        id: Date.now(),
        userId: document.getElementById('warningUser').value,
        reason: document.getElementById('warningReason').value,
        severity: document.getElementById('warningSeverity').value,
        date: new Date().toISOString()
    };
    
    warnings.push(warning);
    localStorage.setItem('warnings', JSON.stringify(warnings));
    updateWarningsDisplay();
}

function updateWarningsDisplay() {
    const warningsList = document.getElementById('warningsList');
    warningsList.innerHTML = warnings.map(warning => `
        <tr>
            <td>${getUserName(warning.userId)}</td>
            <td>${warning.reason}</td>
            <td><span class="badge bg-${warning.severity}">${warning.severity}</span></td>
            <td>${new Date(warning.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

function removeWarning(id) {
    warnings = warnings.filter(w => w.id !== id);
    loadWarnings();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-warning alert-dismissible fade show position-fixed top-0 end-0 m-3';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}