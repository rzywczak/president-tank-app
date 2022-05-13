<template>
  


</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import authHeader from "../../../auth-header.js";
import axios from "axios";
import Tanks from "../Tanks.vue"

export default {

  name: "UpdateTankForm",
  methods: {
           async updateTank(values) {
        console.log(values)
      if (this.processing) return;
      this.processing = true
      try {
        await axios.patch(`tanks/${this.id}`, {
            sideNumber: values.sideNumber,
            producent: values.producent,
            model: values.model,
            currentModification: values.currentModification,
            productonYear: values.productonYear,
            introductionToCountry: values.introductionToCountry,
            course: values.course,
            ammunition: values.ammunition,
            armorSide: values.armorSide,
            armorFront: values.armorFront,
            armorBack: values.armorBack,
        }, {headers: authHeader()});
        this.loadTanks();
      } catch (e) {
        console.log(e);
      }
      this.processing = false
  },
  },
}
</script>

<style>

</style>