<template>
  <div v-if="user">
    <p>{{ loadData() }}</p>
  </div>
  <div v-if="!user">
   
      <div class="auth-inner">
        <div class="items-home">
          <h1>Start managing your tanks</h1>
          <img src="..\components\icons\tank.png" width="150" height="150" />
        </div>
      </div>
    </div>
 
</template>

<script>
import { mapGetters } from "vuex";
import Tanks from "./Tanks.vue";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    Tanks,
  },
  methods: {
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
  },
};
</script>

<style>
h1 {
  text-align: center;
  padding: 0 0 15px 0;
}

img {
  margin-left: 20px;
}
.items-home {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #99844b !important;
}
</style>
