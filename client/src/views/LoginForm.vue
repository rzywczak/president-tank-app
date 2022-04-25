<template>
  <div class="auth-inner">
    <div v-if="!user">
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <error v-if="error" :error="error"  />
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button class="btn btn-primary btn-blok">Login</button>
    </form>
    </div>
     <div v-if="user">
         {{  loadData()}}
     </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import Error from './Error.vue'
 import Tanks from './Tanks.vue'
 import { mapGetters } from "vuex";

 export default {
     name: 'Login',
     components: {
         Error,
         Tanks
     },
      computed: {
    ...mapGetters(["user"]),
  },
     data(){
         return {
             email: '',
             password: '',
             error: ''
         }
     },
     methods: {
         async handleSubmit(){
             try {
            const response = await axios.post('users/login', {
                email: this.email,
                password: this.password
            })
            localStorage.setItem('token', response.data.token)
            this.$store.dispatch('user', response.data.user)
            await this.$router.push('/manage').then(() => {
              location.reload()
            }).catch((err) => {
                console.log(err)
            });
             } catch (e){
                this.error = 'Invalid username/password'
             }
         },
        loadData() {
      this.$router
        .push('/manage')
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
     }
 }

</script>

