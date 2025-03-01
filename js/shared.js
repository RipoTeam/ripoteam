function populateUserSelect(selectId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = users.map(user => `
            <option value="${user.id}">${user.username}</option>
        `).join('');
    }
}
