import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

const Eemail = document.getElementById('email');
const Epassword = document.getElementById('password');
const Efirstname = document.getElementById('firstname');
const Elastname = document.getElementById('lastname');

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, Eemail.value, Epassword.value)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: `${Efirstname.value} ${Elastname.value}`
            }).then(() => {
                alert('Account successfully created and profile updated');
            }).catch((error) => {
                alert('Account created but failed to update profile');
            });
            // Update profile
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert("Email Verification Sent");
                    window.location.href = "opportunity_login.html";
                })
                .catch((error) => {
                    alert("email not sent");
                });
        })
        .catch((error) => {
            // big flaw is that it doesn't check if the account already exists or just a google account
            alert('Account already exists');
        });
});


// ------------------------------------code generatd by AI-------------------------------------------------
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("registerButton").addEventListener("click", (e) => {
    e.preventDefault();
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const firstnameVAL = capitalize(firstname.value);
    const lastnameVAL = capitalize(lastname.value);
    const emailVAL = email.value;
    const passwordVAL = password.value;

    if (passwordVAL.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    } else {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, emailVAL, passwordVAL)
            .then((userCredential) => {
                const user = userCredential.user;

                sendEmailVerification(user)
                    .then(() => {
                        alert("Email Verification Sent");
                    })
                    .catch((error) => {
                        alert("Email not sent: " + error.message);
                    });

                return updateProfile(user, {
                    displayName: `${firstnameVAL} ${lastnameVAL}`
                });
            })
            .then(() => {
                alert("User Registered Successfully");
            })
            .catch((error) => {
                alert("Account is already exist: " + error.message);
            });
    }
});
*/