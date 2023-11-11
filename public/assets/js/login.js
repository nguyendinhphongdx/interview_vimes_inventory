$(function () {
    initPage();
    $('#btn-login').click(() => {
        console.log('login');
        console.log(g_users);
        var selectedUser = $('#option-users').find(":selected").val();
        console.log(selectedUser);
        if (!Number(selectedUser)) return toastr.error('User error');
        const user = g_users.find(user => user.user_id === selectedUser);
        localStorage.setItem('currentUser', user);
        window.location.href = '/inventory/create';
    });
});
function initPage() {
}