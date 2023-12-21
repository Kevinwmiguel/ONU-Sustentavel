

window.onclick = function (event) {
    if (event.target === document.getElementById("cadastroModal")) {
        document.getElementById("cadastroModal").style.display = "none";
    }
}

window.onkeydown = function (event) {
    if (event.key === "Escape") {
        document.getElementById("cadastroModal").style.display = "none";
    }
}

// Adicione esta lógica para alternar entre as seções de cadastro, login e esqueci minha senha

document.getElementById("cadastroBtn").onclick = function () {
    document.getElementById("cadastroModal").style.display = "block";
    document.getElementById("cadastro").classList.add("active");
    document.getElementById("login").classList.remove("active");
    document.getElementById("esqueciSenha").classList.remove("active");
}

document.getElementById("loginBtn").onclick = function () {
    document.getElementById("cadastroModal").style.display = "block";
    document.getElementById("login").classList.add("active");
    document.getElementById("cadastro").classList.remove("active");
    document.getElementById("esqueciSenha").classList.remove("active");
}

document.getElementById("esqueciSenhaBtn").onclick = function () {
    document.getElementById("cadastroModal").style.display = "block";
    document.getElementById("cadastro").classList.remove("active");
    document.getElementById("login").classList.remove("active");
    document.getElementById("esqueciSenha").classList.add("active");
}



function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Sucesso no login
            alert('Login realizado com sucesso!');
            // Redirecionar para outra página
            window.location.href = 'sua_pagina_secreta.html';
        })
        .catch((error) => {
            // Tratar erros
            alert(error.message);
        });
}


// Mantenha a lógica para abrir e fechar o modal

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_ID_DO_PROJETO",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
  };

firebase.initializeApp(firebaseConfig);