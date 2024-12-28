import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);

if (getCookie('email') && getCookie('password')) {
    const auth = getAuth(app);
    const email = getCookie('email');
    const password = getCookie('password');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const name = user.displayName;
            document.getElementById('name').innerHTML = `Welcome, ${name}`;
        } else if (email && password) {
            signInWithEmailAndPassword(auth, email, password)

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const name = user.displayName;
                    document.getElementById('name').innerHTML = `Welcome, ${name}`;
                }
            });
        }
        else {
            window.location.href = 'opportunity_login.html';
        }
    });
} else if (getCookie('accessToken')) {
    const auth = getAuth(app);
    const accessToken = getCookie("accessToken");
        console.log(accessToken);
    // Check if the access token is from Google or email/password
    if (isGoogleAccessToken(accessToken)) {
        const credential = GoogleAuthProvider.credential(null, accessToken);
        console.log(credential);
        signInWithCredential(auth, credential)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in with credential:", user);
                document.getElementById("name").innerHTML = 'Welcome, ' + user.displayName;
            })
            .catch((error) => {
                console.error("Error signing in with credential:", error);
                // Redirect to opportunity_login.html if sign-in fails
                // window.location.href = "opportunity_login.html";
            });
    } else {
        // console.log(accessToken);
        // signInWithCustomToken(auth, accessToken)
        //     .then((userCredential) => {
        //         user = userCredential.user;
        //         console.log(user);
        //         console.log("User signed in with custom token:", user);
        //         document.getElementById("name").innerHTML = 'Welcome, ' + user.displayName;
        //     })
        //     .catch((error) => {
        //         console.error("Error signing in with custom token:", error);
        //         // Redirect to opportunity_login.html if sign-in fails
        //         // window.location.href = "opportunity_login.html";
        //     });
    }
}else window.location.href = 'opportunity_login.html';


// Logout function
document.getElementById('logout_btn').addEventListener('click', () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        deleteCookie('email');
        deleteCookie('password');
        deleteCookie('accessToken');
        window.location.href = 'opportunity_login.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

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

function isGoogleAccessToken(token) {
    // Implement a check to determine if the token is a Google OAuth token
    // This is a placeholder function and should be replaced with actual logic
    // For example, you might check the token format or decode it to check the issuer
    return token.startsWith("ya29."); // Example check for Google OAuth token
}

document.getElementById('searchBtn').addEventListener("click", fetchData);
async function fetchData()
{
    try{
        const pokemonName = document.getElementById("pokemonSearch").value.toLowerCase();

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName);

        if(!response.ok)
        {
            throw new Error("Could not access that data");
        }
        const data = await response.json();
        console.log(data);
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const card = document.getElementById("cardContainer");
        
        const name = document.getElementById("pokename");
        const types = document.getElementById("types");
        const abilities = document.getElementById("abilities");
        const moves = document.getElementById("moves");

        card.style.display = "block";
        imgElement.style.display = "block";
        imgElement.src = pokemonSprite;

        // types
        name.innerHTML = "Name: "+data.name;
        var htmlType = 'Types: ';
        for(var i=0; i<data.types.length; i++)
        {
            htmlType+= data.types[i].type.name;
            if(!(i==data.types.length-1)) htmlType+="/";
        }
        types.innerHTML = htmlType;

        // abilites
        var htmlAbilites = 'Abilites: ';
        for(var i=0; i<data.abilities.length; i++)
        {
            htmlAbilites+= data.abilities[i].ability.name;
            if(!(i==data.abilities.length-1)) htmlAbilites+=", ";
        }
        abilities.innerHTML = htmlAbilites;

        // moves
        var htmlMoves = 'Moves: ';
        for(var i=0; i<15; i++)
        {
            htmlMoves+= data.moves[i].move.name;
            if(!(i==15-1)) htmlMoves+=", ";
        }
        moves.innerHTML = htmlMoves;
    }
    catch(error){
        console.error(error);
        alert("Pokemon does not exist.");
    }
}