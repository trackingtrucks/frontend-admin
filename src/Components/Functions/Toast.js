import Swal from 'sweetalert2';

const Toast = (timer) => Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
});

const makeToast = (timer, type, msg) => {
    Toast(timer).fire({
        icon: type,
        title: msg
    })
}

export default makeToast;