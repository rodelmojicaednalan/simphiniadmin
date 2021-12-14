
export const sweetAlertComponent = {
    success(message) {
        this.$swal({
            icon: 'success',
            title: 'Congratulations',
            text: message,
            // footer: '<a href="">Why do I have this issue?</a>'
        });
    },
    error(message) {
        this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: message,
            // footer: '<a href="">Why do I have this issue?</a>'
        });
    },
}