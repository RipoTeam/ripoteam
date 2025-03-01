// Attendance tracking
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
let currentDate = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', function() {
    loadAttendanceUsers();
    updateAttendanceDisplay();
});

function loadAttendanceUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    const attendanceList = document.getElementById('attendanceList');
    
    attendanceList.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>
                <select class="form-select" onchange="markAttendance('${user.id}', this.value)">
                    <option value="">Select Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
            </td>
            <td id="status-${user.id}">-</td>
        </tr>
    `).join('');
}

function markAttendance(userId, status) {
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    const record = {
        id: Date.now(),
        userId: userId,
        date: today,
        status: status,
        timestamp: new Date().toISOString()
    };
    
    attendance.push(record);
    localStorage.setItem('attendance', JSON.stringify(attendance));
    
    document.getElementById(`status-${userId}`).textContent = status;
}

function updateAttendanceDisplay() {
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = attendance.map(record => `
        <tr>
            <td>${getUserName(record.userId)}</td>
            <td>${record.date}</td>
            <td><span class="badge bg-${record.status === 'present' ? 'success' : 'danger'}">${record.status}</span></td>
            <td>${record.notes}</td>
        </tr>
    `).join('');
}

function getAttendanceRecord(userId, date) {
    return attendance.find(record => 
        record.userId === userId && record.date === date
    );
}
function updateAttendanceStats() {
    const todayRecords = attendanceRecords.filter(record => record.date === currentDate);
    const presentCount = todayRecords.filter(record => record.status === 'present').length;
    const absentCount = todayRecords.filter(record => record.status === 'absent').length;

    document.getElementById('presentCount').textContent = presentCount;
    document.getElementById('absentCount').textContent = absentCount;
}

function showNoteModal(userId) {
    const record = getAttendanceRecord(userId, currentDate);
    document.getElementById('noteUserId').value = userId;
    document.getElementById('attendanceNote').value = record?.note || '';
    new bootstrap.Modal(document.getElementById('noteModal')).show();
}

function saveNote() {
    const userId = parseInt(document.getElementById('noteUserId').value);
    const note = document.getElementById('attendanceNote').value;
    const record = getAttendanceRecord(userId, currentDate);

    if (record) {
        record.note = note;
    }

    loadAttendance();
    bootstrap.Modal.getInstance(document.getElementById('noteModal')).hide();
    showNotification('Note saved successfully');
}

function saveAttendance() {
    // Here you would typically save to a backend server
    showNotification('Attendance saved successfully');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
