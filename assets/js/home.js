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

function createArticle() {
    window.location.href = '../pages/add-article.html';
}

function findArticles(user) {
    showLoading();
    articleService.findByuser(user)
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
        const li = document.createElement('li');
        li.classList.add(article.type);
        li.id = article.uid;
        li.addEventListener('click', () => {
            window.location.href = "../pages/add-article.html?uid=" + article.uid;
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Remover";
        deleteButton.classList.add('outline', 'dange');
        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            askRemoveArticle(article);
        })
        li.appendChild(deleteButton);

        const date = document.createElement('p');
        date.innerHTML = formatDate(article.date);
        li.appendChild(date);

        const type = document.createElement('p');
        type.innerHTML = article.type;
        li.appendChild(type);

        if (article.description) {
            const description = document.createElement('p');
            description.innerHTML = article.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function askRemoveArticle(article){
    const shouldRemove = confirm('Deseja remover?');
    if (shouldRemove) {
        removeArticle(article);
    }
}

function removeArticle(article){
    showLoading();

    firebase.firestore()
        .collection("Artigos")
        .doc(article.uid)
        .delete()
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

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt');
}