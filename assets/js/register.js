firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../pages/home.html";
    }
})

function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

function onChangePassword(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword(){
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch(){
    const confirmPassword = form.confirmPassword().value;
    const password = form.password().value;
    form.confirmPasswordDoesntMatch().style.display = confirmPassword == password ? "none" : "block";
}

function toggleRegisterButtonDisable(){
    form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if (!email || !validateEmail(email)){
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6)
    {
        return false;
    }

    const confirmPassword = form.confirmPassword().value
    if(password != confirmPassword)
    {
        return false;
    }
    return true;
}

function register() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;
    const nome = form.nome().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Adicione o nome do usuário à coleção "users" no Firestore
            return firebase.firestore().collection("users").doc(user.uid).set({
                name: nome,
                email: email, // opcional, você pode adicionar mais informações se desejar
            });
        })
        .then(() => {
            hideLoading();
            window.location.href = "../pages/home.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}



function getErrorMessage(error){
    if (error.code == "auth/email-already-in-use"){
        return "Email já está em uso";
    }
    return error.message;
}

const form = {
    nome: () => document.getElementById('nome'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatch: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    registerButton: () => document.getElementById('register-button')
}