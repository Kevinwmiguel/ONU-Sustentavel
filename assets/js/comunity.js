function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../pages/loginpage.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findArticles(user);
    }
});

function findArticles(user) {
    showLoading();
    articleService.findByUser(user)
        .then(articlesData => {
            hideLoading();
            addArticlesToScreen(articlesData);
        })
        .catch(error => {
            hideLoading();
            console.error(error);
            alert('Erro ao recuperar transações');
        });
}

function addArticlesToScreen(articles) {
    const orderedList = document.getElementById('main-articles');
    orderedList.innerHTML = ""; // Limpar a lista antes de adicionar os novos itens

    articles.forEach(article => {
        const li = createArticleListItem(article);

        // Adiciona um parágrafo para exibir a data
        var novaDiv = document.createElement('div');
        novaDiv.classList.add('mainbar');
        var h2 = createParagraphH2(article.title);
        var pDate = createParagraph(`Data: ${article.date}`);  // Modificado para exibir a data
        novaDiv.appendChild(h2);
        novaDiv.appendChild(pDate);  // Adiciona o parágrafo com a data
        li.appendChild(novaDiv);
        if (article.description) {
            const description = createParagraph(article.description);
            description.classList.add('desc');
            li.appendChild(description);
        }
        const pin = document.createElement('div');

        const type = createParagraph(`Tipo de postagem: ${article.type}`);
        type.classList.add('docType');
        pin.appendChild(type);

        const areadeatuacao = createParagraph(`Área de atuação: ${article.selectarea}`);
        areadeatuacao.classList.add('docArea');
        pin.appendChild(areadeatuacao);

        pin.classList.add('pin');
        li.appendChild(pin);

        orderedList.appendChild(li);
    });
}

function createArticleListItem(article) {
    const li = document.createElement('li');
    li.classList.add(article.type);
    li.id = article.uid;
    return li;
}



function createParagraph(value){
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
}

function createParagraphH2(value){
    const element = document.createElement('h2');
    element.innerHTML = value;
    return element;
}