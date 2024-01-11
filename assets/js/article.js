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
                // Formatando a data ao ler do Firebase
                article.date = article.date ? new Date(article.date) : null;
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


function fillArticleScreen(article) {
    console.log("Article:", article);

    if (article.type == "article") {
        form.article().checked = true;  // Corrigido para usar form.article() ao invés de form.articletype()
    } else if (article.type == "question") {
        form.question().checked = true;  // Corrigido para usar form.question() ao invés de form.helptype()
    } else {
        form.tip().checked = true;  // Corrigido para usar form.tip() ao invés de form.tipType()
    }

    if (article.date) {
        const formattedDate = formatDateForDisplay(article.date);  // Modificado para exibir a data formatada
        // Exibir a data formatada na MainBar ou onde você desejar
        console.log("Formatted Date:", formattedDate);
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
    // Remova a linha abaixo para evitar chamar togglePostButtonDisable ao alterar a data
    // togglePostButtonDisable();
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

function postArticle() {
    showLoading();
    const myArticle = createArticle();

    if (isNewArticle()) {
        const nomeUsuario = "kevin willians"; // Substitua pela forma como você obtém o nome do usuário
        const currentDate = new Date(); // Obtemos a data atual
        myArticle.date = currentDate; // Atribuímos a data atual ao artigo
        save(myArticle, nomeUsuario);
    } else {
        update(myArticle);
    }
}


function save(article, userName) {
    // Certifique-se de que articleService.save aceite o nome do usuário
    articleService.save(article, userName)
        .then(() => {
            hideLoading();
            window.location.href = "../pages/home.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao publicar artigo');
        });
}

function createArticle() {
    const currentDate = new Date();

    let type;
    if (form.article().checked) {
        type = "article";
    } else if (form.question().checked) {
        type = "question";
    } else if (form.tip().checked) {
        type = "tip";
    } else {
        // Se nenhum tipo estiver selecionado, pode lidar com isso de acordo com seus requisitos.
        // Neste exemplo, defini como "article" por padrão.
        type = "article";
    }

    return {
        type: type,
        date: firebase.firestore.Timestamp.fromDate(currentDate),
        title: form.title().value,
        selectarea: form.selectarea().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.displayName,
        }
    };
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

const form = {
    dateRequiredError: () => document.getElementById('date-required-error'),
    title: () => document.getElementById('title'),
    titleRequiredError: () => document.getElementById('title-required-error'),
    selectarea: () => document.getElementById('activity-area'),
    selectRequired: () => document.getElementById('area-required-error'),
    postButton: () => document.getElementById('postButton'),
    type: () => document.getElementById('article'),
    article: () => document.getElementById('article'),  // Adicionado método para obter elemento com ID 'article'
    question: () => document.getElementById('question'),  // Adicionado método para obter elemento com ID 'question'
    tip: () => document.getElementById('tip'),  // Adicionado método para obter elemento com ID 'tip'
    description: () => document.getElementById('description') 
}

function cancelArticle() {
    window.location.href = "../pages/home.html"
}


function formatDate(date) {
    console.log(date);
    if (typeof date === 'string') {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    } else if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        return null;
    }
}