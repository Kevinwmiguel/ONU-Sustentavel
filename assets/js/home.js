function logout(){
    firebase.auth().signOut().then(() => {
       window.location.href = "../pages/loginpage.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

const form = {
    logout: () => document.getElementById('logout')
}