$(function () {
    initPage();
    $('#btn-login').click(() => {
        console.log('login');
        console.log(g_users);
        const selectedUser = $('#option-users').find(":selected").val();
        const selectedDoc = $('#option-documents').find(":selected").val();
        console.log(selectedUser, selectedDoc);
        if (!Number(selectedUser)) return toastr.error('User error');
        if (!Number(selectedDoc)) return toastr.error('Document error');

        const user = g_users.find(user => user.user_id === Number(selectedUser));
        const document = g_documents.find(doc => doc.document_id === Number(selectedDoc));
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentDoc', JSON.stringify(document));
        window.location.href = '/inventory/create';
    });
});
function initPage() {
}