<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel grey lighten-4 black-text center">
                        <h3>Register or Login</h3>
                        <form @submit.prevent="registerOrLogin">
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label for="password">Password</label>
                            </div>
                            <button type="submit" class="btn btn-large grey lighten-4 black-text">Register/Login with Email</button>
                        </form>
                        <button v-on:click="registerOrLoginWithGoogle" class="btn btn-large grey lighten-4 black-text">Register/Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Updated Firebase imports for v10.4.0
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration remains the same
const firebaseConfig = {
    apiKey: "AIzaSyAxG3LGCtQHwZLxIxvFoaplouY5HlNU6JM",
    authDomain: "tc2023-21859.firebaseapp.com",
    projectId: "tc2023-21859",
    storageBucket: "tc2023-21859.appspot.com",
    messagingSenderId: "960022654133",
    appId: "1:960022654133:web:79b8495bce163d7f3322fc",
    measurementId: "G-589259DH29"
};

// Initialize Firebase and get the auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export default {
    name: 'registerUser',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        registerOrLogin: function() {
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(user => {
                alert(`Logged in as ${user.user.email}`);
                this.$router.push('/profile'); // Navigate to profile page
            })
            .catch(err => {
                if(err.code === "auth/user-not-found") {
                    this.register();
                } else {
                    alert(err.message);
                }
            });
        },
        register: function() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(user => {
                alert(`Account created for ${user.user.email}`);
                this.$router.push('/profile'); // Navigate to profile page
            })
            .catch(err => {
                alert(err.message);
            });
        },
        registerOrLoginWithGoogle: function() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then(result => {
                alert(`Logged in as ${result.user.email}`);
                this.$router.push('/profile'); // Navigate to profile page
            })
            .catch(err => {
                alert(err.message);
            });
        }
    }
};
</script>

<style>
input {
    border: 1px solid black !important;
}
</style>
