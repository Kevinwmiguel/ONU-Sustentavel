const articleService = {
    findByUser: user => {
        return firebase.firestore()
            .collection('Artigos')
            .where('user.uid', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    },
    findByUID: uid => {
        return firebase.firestore()
            .collection("Artigos")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.data();
            });
    },
    remove: article => {
        return firebase.firestore()
            .collection("Artigos")
            .doc(article.uid)
            .delete();
    },
    save: (article, userName) => {
        const articleData = {
            ...article,
            user: {
                uid: firebase.auth().currentUser.uid,
                name: userName
            },
            // Verifica se article.date é uma instância de Date e não é nulo
            date: article.date instanceof Date && !isNaN(article.date) ? formatDate(article.date) : null
        };
    
        return firebase.firestore()
            .collection('Artigos')
            .add(articleData);
    },
    update: article => {
        return firebase.firestore()
            .collection("Artigos")
            .doc(article.uid)
            .update(article);
    }
};
