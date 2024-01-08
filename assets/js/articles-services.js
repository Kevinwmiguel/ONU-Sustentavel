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
    }
}