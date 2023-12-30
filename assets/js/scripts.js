
function onchangePassword(){
    togglePassworderrors();
    toggleButtonsDisable();
}

function onchangeEmail(){
    toggleButtonsDisable();
    toggleEmailerrors();
}

function isEmailValid(){
    const email = form.email.value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = form.password.value;
    if (!password){
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function toggleEmailerrors() {
    const email = form.email.value;
    form.emailRequiredError().style.display = email ? "display" : "none";
    form.emailInvalidError().style.display = validateEmail(email) ? "block" : "none";
}

function togglePassworderrors() {
    const password = form.password.value;
    form.passwordRequiredError().style.display = password ? "block" : "none";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword.disabled = !emailValid;
    const passwordValid = isPasswordValid();
    form.loginButton.disabled = !emailValid || !passwordValid;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}