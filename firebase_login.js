import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtwT5vh0VSYQ3j-qDSjHFI3DsfdzRoCpw",
    authDomain: "opportunity-9d3bf.firebaseapp.com",
    databaseURL: "https://opportunity-9d3bf-default-rtdb.firebaseio.com",
    projectId: "opportunity-9d3bf",
    storageBucket: "opportunity-9d3bf.firebasestorage.app",
    messagingSenderId: "57906230058",
    appId: "1:57906230058:web:4bd2c2b66a97ad34536453",
    measurementId: "G-NNMZ1KHB32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(getCookie('accessToken'));
console.log(getCookie('email'));
console.log(getCookie('password'));

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

if (!(getCookie('accessToken') || (getCookie('email') && getCookie('password')))) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                if (currentUser.emailVerified) {
                    currentUser.getIdToken(true).then((idToken) => {
                        console.log("Access Token:", idToken);
                        // Set the access token in a cookie
                        setCookie("accessToken", idToken, 7);
                        setCookie("email", email, 7);
                        setCookie("password", password, 7);
                        alert("User Logged In Successfully");
                        window.location.href = 'mainpage.html';
                    }).catch((error) => {
                        console.error("Error getting access token:", error);
                    });
                } else {
                    alert("Please verify your email first");
                }
            })
            .catch((error) => {
                console.error('Error signing in:', error);
                alert('Invalid email or password');
            });
    });

    document.getElementById('google_login').addEventListener("click", () => {
        const auth = getAuth(app);
        auth.languageCode = 'en';
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const accessToken = result._tokenResponse.oauthAccessToken;
                console.log("User:", user);
                console.log("Display Name:", user.displayName);
                console.log("Email:", user.email);
                console.log("Access Token:", accessToken);

                // Set the access token in a cookie
                setCookie("accessToken", accessToken, 7);
                alert("User Logged In Successfully");
                window.location.href = "mainpage.html";
            }) 
            .catch((error) => {
                console.error("Error during Google sign-in:", error);
                alert('Invalid Google Account');
            });
    });
}
