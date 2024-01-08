const articleService = {
    findByuser: user => {
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
            })
    },
    findByUID: uid =>{
        return firebase.firestore()
            .collection("Artigos")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.data();
            })
    },
    remove: article => {
        return firebase.firestore()
            .collection("Artigos")
            .doc(article.uid)
            .delete()
    },
    save: article => {
        return firebase.firestore()
            .collection('Artigos')
            .add(article)
    },
    update: article => {
        return firebase.firestore()
            .collection("Artigos")
            .doc(getArticleID())
            .update(article)
    }
}