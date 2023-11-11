$(function () {
    initPage();

});
function initPage() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return window.location.href = "/login";

}