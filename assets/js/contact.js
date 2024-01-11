firebase.auth().onAuthStateChanged(user => {
    if (user){
        document.querySelector('header').innerHTML = `
            <h1>Comunidade Sustentável Júnior</h1>
            <p>Transformando a sociedade com inovação e sustentabilidade</p>
        `;
        document.querySelector('nav ul').innerHTML = `
            <ul class="cabecalho">
                <li><a href="../pages/community.html">Comunidade</a></li>
                <li><a href="../pages/event.html">Evento</a></li>
                <li><a href="../pages/home.html">Meus Artigos</a></li>
                <li><a href="../pages/Contato.html">Contato</a></li>
                <button type="button" id="logout" onclick="logout()">Sair</button>
            </ul>
        `;
    }
})

