<template>
  <div class="auth-inner">
    <div v-if="!user">
      <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <error v-if="error" :error="error" />
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email" placeholder="Email" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>

        <button class="btn btn-primary btn-blok">Login</button>
      </form>
    </div>
    <div v-if="user">
      {{ this.loadTanksData }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "./Error.vue";
import Tanks from "./Tanks.vue";
import { mapGetters } from "vuex";
import authHeader from "../../auth-header.js"

export default {
  name: "Login",
  components: {
    Error,
    Tanks,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      processing: false,
    };
  },
 loadTanksData(){
   Tanks.methods.loadTanks;
  },
  methods: {
    async handleSubmit() {
      if (this.processing) return;
      this.processing = true;
      try {
         await axios.post (
          "users/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        ).then((response) => {
         this.$store.dispatch("user", response.data.user).then(() => {
        //  this.console.log(response.data.token)
          //  this.$store.dispatch("token", response.data.token)
         localStorage.setItem("token", response.data.token);
        //  localStorage.setItem("user", response.data.user);
        //  console.log(gar)
        
         this.$router.push("/manage")
        //  axios.get("users/:id", { headers: authHeader() })
        //   .then((userAuthAfterLogin) => {
        //     //  const response = await axios.get("users/:id");
           
        //     this.$store.dispatch("user", userAuthAfterLogin.data)
        //     //  this.$store.dispatch("user", response.data)
        //     //  console.log(response)
        //     // Tanks.methods.loadTanks;
        //   })
        //   })
        //   .catch((err) => {
        //     console.log(err);
          });
         })
      
      } catch (e) {
        this.error = "Invalid username/password";
        this.processing = false;
      }
    
    },
  },
};
</script>
