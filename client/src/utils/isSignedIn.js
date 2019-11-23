import firebase from 'firebase';

// 
function isSignedIn() {
    return firebase.auth().onAuthStateChanged(user => {
        console.log('\n DeveloperView sees user :', user.displayName, user.email, user.photoURL, user.emailVerified, user.uid)
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