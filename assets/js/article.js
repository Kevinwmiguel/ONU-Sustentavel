if (!isNewArticle()){
    const uid = getArticleID();
    findArticlesByUid(uid);
}

function getArticleID(){
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    return uid;
}

function isNewArticle(){
    return getArticleID()? false : true;
}

function findArticlesByUid(uid){
    showLoading();

    articleService.findByUID(uid)
        .then(article => {
            hideLoading();
            if (article){
                fillArticleScreen(article);
                togglePostButtonDisable();
            } else {
                alert("Documento não encontrado");
                window.location.href = "../pages/home.html"
            }
        })
        .catch(() => {
            hideLoading();
            alert("Erro ao recuperar o documento");
            window.location.href = "../pages/home.html"
        });
}

function fillArticleScreen(article){

    console.log("Article:", article);
    if (article.type == "article") {
        form.articletype().checked = true;
    } else {
        form.helptype().checked = true;
    }

    if (article.date) {
        form.date().value = article.date;
    }
    form.title().value = article.title;
    form.selectarea().value = article.selectarea;
    if (article.description) {
        form.description().value = article.description;
    }
    
}

function logout(){
    firebase.auth().signOut().then(() => {
       window.location.href = "../pages/loginpage.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";
    togglePostButtonDisable()
}

function onChangeTitle(){
    const title = form.title().value;
    form.titleRequiredError().style.display = !title ? "block" : "none";
    togglePostButtonDisable()

}

function onChangeType(){
    const type = form.selectarea().value;
    form.selectRequired().style.display = !type ? "block" : "none";
    togglePostButtonDisable()
}

function togglePostButtonDisable(){
    form.postButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date){
        return false;
    }

    const title = form.title().value;
    if (!title) {
        return false;
    }
    const select = form.selectarea().value;
    if (!select){
        return false;
    }
    return true;
}

function postArticle(){
    showLoading();
    const myArticle = createArticle();
    
    if (isNewArticle()){
        save(myArticle);
    } else {
        update(myArticle);
    }
}

function update(article) {
    articleService.update(article)
        .then(() => {
            hideLoading();
            window.location.href = "../pages/home.html"
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao publicar artigo');
        })
}

function save(article){
    articleService.save(article)
        .then(() => {
            hideLoading();
            window.location.href = "../pages/home.html"
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao publicar artigo');
        })
}

function createArticle(){
    return {
        type: form.type().checked ? "article" : "question",
        date: form.date().value,
        title: form.title().value,
        selectarea: form.selectarea().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    title: () => document.getElementById('title'),
    titleRequiredError: () => document.getElementById('title-required-error'),
    selectarea: () => document.getElementById('activity-area'),
    selectRequired: () => document.getElementById('area-required-error'),
    postButton: () => document.getElementById('postButton'),
    type: () => document.getElementById('article'),
    articletype: () => document.getElementById('article'),
    helptype: () => document.getElementById('article'),
    description: () => document.getElementById('description')
}

function cancelArticle() {
    window.location.href = "../pages/home.html"
}