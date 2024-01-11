function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../pages/loginpage.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Consultar o nome do usuário no Firestore
        firebase.firestore().collection("users").doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    const nomeUsuario = doc.data().name;
                    // Faça o que quiser com o nome do usuário (por exemplo, exibir na página)
                    document.getElementById('nome-usuario').innerText = `Bem-vindo, ${nomeUsuario}!`;
                }
            })
            .catch(error => {
                console.error("Erro ao obter o nome do usuário:", error);
            });

        findArticles(user);
    }
});


function createArticle() {
    window.location.href = '../pages/add-article.html';
}



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
            li.appendChild(createParagraph(article.description));
        }
        li.appendChild(createDeleteButton(article));
        const type = createParagraph(article.type);
        li.appendChild(type);
        const areadeatuacao = createParagraph(article.selectarea);
        li.appendChild(areadeatuacao);
        
        console.log(article.type);
        
        orderedList.appendChild(li);
    });
}

function createArticleListItem(article) {
    const li = document.createElement('li');
    li.classList.add(article.type);
    li.id = article.uid;
    
    return li;
}

function createDeleteButton(article){
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Remover";
    deleteButton.classList.add('outline', 'dange');
    deleteButton.addEventListener('click', event => {
        event.stopPropagation();
        askRemoveArticle(article);
    })
    return deleteButton;
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

function askRemoveArticle(article){
    const shouldRemove = confirm('Deseja remover?');
    if (shouldRemove) {
        removeArticle(article);
    }
}

function removeArticle(article){
    showLoading();

    articleService.remove(article)
        .then(() => {
            hideLoading();
            document.getElementById(article.uid).remove();
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('erro ao apagar o artigo')
        })
}