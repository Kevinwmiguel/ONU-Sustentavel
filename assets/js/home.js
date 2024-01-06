function logout(){
    firebase.auth().signOut().then(() => {
       window.location.href = "../pages/loginpage.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

findArticles();

function findArticles() {
    setTimeout(() => {
        addArticlesToScreen(fakearticle)
    }, 1000)
}

function addArticlesToScreen(articles){
    const orderedList = document.getElementById('main-articles');

    articles.forEach(article => {
        const li = document.createElement('li');
        li.classList.add(article.type);
        
        const date = document.createElement('p');
        date.innerHTML = formatDate(article.date);
        li.appendChild(date);

        const type = document.createElement('p');
        type.innerHTML = article.type;
        li.appendChild(type);

        if(article.descricao) {
            const description = document.createElement('p');
            description.innerHTML = article.descricao;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt');
}

const fakearticle = [{
    type: 'article',
    date: '2024-01-05',
    title: 'titulo do artigo',
    descricao: 'conteudo do meu artigo'
},
{
    type: 'article',
    date: '2024-01-05',
    title: 'titulo do artigo',
    descricao: 'conteudo do meu artigo'
}]