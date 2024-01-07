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
    firebase.firestore()
        .collection('Artigos')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const articlesData = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
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
        li.addEventListener('click', () => {
            window.location.href = "../pages/add-article.html?uid=" + article.uid;
        });
        
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

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt');
}
