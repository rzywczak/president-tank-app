<script>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Nav,
  },
  async created() {
    const response = await axios.get("users/:id");
    this.$store.dispatch("user", response.data);
  },
};
</script>

<template>
  <div id="app">
    <Nav />

    <div class="auth-wrapper">
      <router-view />
    </div>  
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

* {
  box-sizing: border-box;
}

body {
  min-height: 100vb;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: "Fira Sans", sans-serif;
}
body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}
#app {
  text-align: center;
}
.navbar-light {
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner {
  width: 450px;
  margin-top: 135px!important;
  margin: auto;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 20px 55px 25px 35px;
  border-radius: 15px;
  transform: all 0.3s;
}
.custom-control-label {
  font-weight: 400;
}

@media screen and (max-width: 768px) {

   .auth-inner {
  display: flex;
  width: 350px;
  font-size: 0.7rem!important;
   }
}
@media screen and (max-width: 576px) {
     .auth-inner {
  display: flex;
  width: 250px;
  font-size: 0.7rem!important;
     }
  img {
    width: 35px;
    height: 35px
  }
} 
 
  @media screen and (max-width: 250px) {

   .auth-inner {
  display: flex;
  width: 200px;
  font-size: 0.7rem!important;
  
   }
  .form-control{
    font-size: 0.7rem!important;
    width: 130px !important;
  }
  .atomic-btn{
    display: flex;
    flex-direction: row !important;
  }
  .form-check-input{
    padding: 8px !important;
  }

}
</style>
