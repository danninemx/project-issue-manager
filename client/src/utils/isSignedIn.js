import firebase from 'firebase';

function isSignedIn() {
    return firebase.auth().onAuthStateChanged(user => {
        this.setState({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            idToken: user.getIdToken()
        })
    });
}

export default isSignedIn;