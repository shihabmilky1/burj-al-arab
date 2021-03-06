import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
 }

const Login = () => {
    const [logInUser,setLogInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email} = result.user;
    const newUserInfo = {name:displayName,email:email}
    setLogInUser(newUserInfo);
    history.replace(from);
}).catch((error) => {
    var errorMessage = error.message;
  });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogle}>Sign In Google</button>
        </div>
    );
};

export default Login;