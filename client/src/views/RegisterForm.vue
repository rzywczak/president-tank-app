<template>
  <div class="auth-inner">
    <div v-if="!user">
      <Form @submit="handleSubmit" :validation-schema="schema">
        <h5>Sign Up</h5>
        <error v-if="error" :error="error" />
        <div class="form-group">
          <label>Name <ErrorMessage class="error" name="name" /> </label>
          <Field name="name" type="text" class="form-control" placeholder="Name" />
        </div>

        <div class="form-group">
          <CountryLabel />
        </div>

        <div class="form-group">
          <label>Email <ErrorMessage class="error" name="email" /></label>
          <Field name="email" type="text" class="form-control" placeholder="Email" />
        </div>

        <div class="form-group">
          <label>Password <ErrorMessage class="error" name="password" /></label>
          <Field name="password" type="password" class="form-control" placeholder="Password" />
        </div>

        <div class="form-group">
          <label>Repeat password <ErrorMessage class="error" name="repeatPassword" /></label>
          <Field name="repeatPassword" type="password" class="form-control" placeholder="Repeat password" />
        </div>

        <div class="form-group atomic-btn">
          <label class="form-check-label">Atomic Buttom: </label>
          <Field name="atomicButton" type="radio" class="form-check-input" :value="true" />
          <label class="form-check-label radio">yes</label>
          <Field name="atomicButton" type="radio" class="form-check-input radio" :value="false" />
          <label class="form-check-label radio">no</label>
          <ErrorMessage class="error-radio" name="atomicButton" />
        </div>

        <button class="btn btn-primary btn-block">Sign Up</button>
      </Form>
    </div>
    <div v-if="user">
      {{ loadData() }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "./Error.vue";
import { mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import CountryLabel from "../components/CountryLabel.vue";

export default {
  name: "RegisterForm",
  components: {
    Error,
    Field,
    Form,
    ErrorMessage,
    CountryLabel,
  },
  data() {
    return {
      CountryLabel,
      processing: false,
      schema: yup.object({
        name: yup.string().required(),
        country: yup.string().required(),
        email: yup.string().required().email(),
        password: yup
          .string()
          .required()
          .min(6)
          .matches("(?=.*?[0-9])", "Password must contains at least one number")
          .matches("(?=.*?[#?!@$%^&*-])", "Password must contains at least one special character"),
        repeatPassword: yup
          .string()
          .required()
          .oneOf([yup.ref("password"), null], "Password must match each other"),
        atomicButton: yup.string().required(),
        error: "",
      }),
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async handleSubmit(values) {
      if (this.processing) return;
      this.processing = true;
      try {
        const response = await axios.post(
          "users",
          {
            name: values.name,
            country: values.country,
            email: values.email,
            password: values.password,
            atomicButton: values.atomicButton,
          },
          { withCredentials: true }
        );

        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user", response.data.user);
        await this.$router
          .push("/manage")
          .then(() => {
            // Tanks.methods.loadTanks;
          })
          .catch((err) => {
            console.log(err);
            this.processing = true;
          });
      } catch (e) {
        this.error = "Something went wrong!";
      }
      this.processing = false;
    },
    loadData() {
      this.$router.push("/manage");
    },
  },
};
</script>

<style>
@import url("../assets/base.css");
.error {
  color: #940d28;
}
.radio {
  margin-left: 5px;
}
.error-radio {
  display: flex;
  color: #940d28;
}
select {
  background-color: #a78725 !important;
  border: 1px solid #0e312c !important;
}
select:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
