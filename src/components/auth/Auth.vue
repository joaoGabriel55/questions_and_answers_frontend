<template>
     <div class="auth-content">
          <div class="auth-modal">
               <img src="@/assets/logo.png" alt="Logo" width="200"/>
               <hr>
               <div class="auth-title">{{showSignup? 'Register' : 'Login'}}</div>

               <input type="text" v-if="showSignup" v-model="user.nome" placeholder="Name">
               <input type="email" v-model="user.email" name="email" placeholder="Email">
               <input type="password" v-model="user.password" name="password" placeholder="Password">
               <input type="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Repeat Password">

               <button class="btn btn-primary btn-block" v-if="showSignup" @click="signup">Register</button>
               <button class="btn btn-primary btn-block" v-else @click="signin">Sign in</button>

               <a href @click.prevent="showSignup = !showSignup">
                    <span v-if="showSignup">Do you already have account? Click here!</span>
                    <span v-else>Do you not have account? Register here!</span>
               </a>
          </div>
     </div>
</template>

<script>
import { baseApiURL, showError, userKey } from "@/global";
import axios from "axios";

export default {
    name: "Auth",
    data: function() {
        return {
            showSignup: false,
            user: {}
        };
    },
    methods: {
        signin() {
            axios
                .post(`${baseApiURL}/auth`, this.user)
                .then(res => {
                    this.$store.commit("setUser", res.data);
                    console.log(res.data.token);
                    
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    this.$router.push({ path: "/" });
                })
                .catch(showError);
        },
        signup() {
            if (this.user.password !== this.user.confirmPassword){
                 this.$toasted.global.defaultError();
            }
            axios
                .post(`${baseApiURL}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.user = {};
                    this.showSignup = false;
                })
                .catch(showError);
        }
    }
};
</script>

<style>
.auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 30px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
}

.auth-modal input {
    border: 1px solid #bbb;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}

/* .auth-modal button {
    align-self: flex-end;
    background-color: blue;
    color: #FFF;
    padding: 5px 15px;
} */

.auth-modal a {
    width: 100%;
    margin-top: 35px;
}

.auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0)
    );
}
</style>
