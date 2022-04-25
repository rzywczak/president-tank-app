<template>
  <div class="form-group" v-if="loading">
    <div class="auth-inner">
      <div class="items-home">
        <h1>loading...</h1>
      </div>
    </div>
  </div>
  <div class="list-group" v-else style="overflow-x: auto;">
    <div class="container-tanks">
      <div class="table-wrapper">
        <div class="table-title"> 
          <div class="row">
            <div class="col-sm-8">
              <h2>{{ user.name }} <b>Tanks</b></h2>
            </div>
            <div class="col-sm-4">
              <button
                type="button"
                class="btn btn-add-new"
                data-bs-toggle="modal"
                data-bs-target="#CreateModal"
                @click="clearForm"
              >
                <i class="fa fa-plus"></i> Add New
              </button>

              <div class="modal fade" id="CreateModal" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <Form autocomplete="off" @submit="addTank" :validation-schema="schema">
                       <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add tank</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                     <error v-if="error" :error="error" />
                    <div class="modal-body">
                      <div class="form-group">
                        <label>Side number</label>
                        <Field
                          name="sideNumber"
                          type="text"
                          class="form-control"
                          placeholder="Side number"
                        />
                        <ErrorMessage class="error" name="sideNumber" />

                      </div>

                       <div class="form-group">
                          <label>Producent</label>
                          <Field
                            name="producent"
                            type="text"
                            class="form-control"
                            placeholder="Producent"
                          />
                          <ErrorMessage class="error" name="producent" />
                        </div>

                        <div class="form-group">
                          <label>Model</label>
                          <Field name="model" type="text" class="form-control" placeholder="Model" />
                          <ErrorMessage class="error" name="model" />
                        </div>

                        <div class="form-group">
                          <label>Modification</label>
                          <Field
                            name="currentModification"
                            type="text"
                            class="form-control"
                            placeholder="Modification"
                          />
                          <ErrorMessage class="error" name="currentModification" />
                        </div>
                        <div class="form-group">
                          <label>Prod. Year</label>
                          <Field
                            name="productonYear"
                            type="number"
                            class="form-control"
                            placeholder="producton Year"
                          />
                          <ErrorMessage class="error" name="productonYear" />
                        </div>

                        <div class="form-group">
                          <label>Into Country</label>
                          <Field
                            name="introductionToCountry"
                            type="date"
                            class="form-control"
                            placeholder="Into Country date YYYY-MM-DD"
                          />
                          <ErrorMessage class="error" name="introductionToCountry" />
                        </div>

                        <div class="form-group">
                          <label>Course (KM)</label>
                          <Field name="course" type="text" class="form-control" v-model="course" placeholder="Course" />
                          <ErrorMessage class="error" name="course" />
                        </div>

                        <div class="form-group">
                          <label>Ammunition</label>
                          <Field
                            name="ammunition"
                            type="text"
                            class="form-control"
                            placeholder="Ammunition"
                          />
                          <ErrorMessage class="error" name="ammunition" />
                        </div>

                        <div class="form-group">
                          <label>Armor Side</label>
                          <Field
                            name="armorSide"
                            type="text"
                            class="form-control"
                            placeholder="Armor Side"
                          />
                          <ErrorMessage class="error" name="armorSide" />
                        </div>

                        <div class="form-group">
                          <label>Armor Front</label>
                          <Field
                            name="armorFront"
                            type="text"
                            class="form-control"
                            placeholder="Armor Front"
                          />
                          <ErrorMessage class="error" name="armorFront" />
                        </div>

                        <div class="form-group">
                          <label>Armor Back</label>
                          <Field
                            name="armorBack"
                            type="text"
                            class="form-control"
                            placeholder="Armor Back"
                          />
                          <ErrorMessage class="error" name="armorBack" />
                        </div>
                      </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button class="btn btn-primary" >Add</button>
                    </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="overflow-x:auto;">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Side number</th>
              <th>Producent</th>
              <th>Model</th>
              <th>Modification</th>
              <th>Prod. Year</th>
              <th>Into Country</th>
              <th>Course</th>
              <th>Ammunition</th>
              <th>Armor Side</th>
              <th>Armor Front</th>
              <th>Armor Back</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tank in tanks" v-bind:key="tank._id">
              <td>{{ tank.sideNumber }}</td>
              <td>{{ tank.producent }}</td>
              <td>{{ tank.model }}</td>
              <td>{{ tank.currentModification }}</td>
              <td>{{ tank.productonYear }}</td>
              <td>{{ tank.introductionToCountry }}</td>
              <td>{{ tank.course }}</td>
              <td>{{ tank.ammunition }}</td>
              <td>{{ tank.armorSide }}</td>
              <td>{{ tank.armorFront }}</td>
              <td>{{ tank.armorBack }}</td>

              <td>
                <a class="add" title="Add" data-toggle="modal" data-target="#exampleModalCenter"
                  ><i class="material-icons">&#xE03B;</i>
                </a>

                <a
                  class="edit"
                  title="Edit"
                  data-toggle="tooltip"
                  data-bs-toggle="modal"
                  data-bs-target="#UpdateModal"
                  @click="updateTankDataForm(tank)"
                  ><i class="material-icons">&#xE254;</i></a
                >

                <a class="delete" title="Delete" data-toggle="tooltip" @click="deleteTank(tank._id)"
                  ><i class="material-icons">&#xE872;</i></a
                >
              </td> 
              </tr>
              <div class="modal fade" id="UpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog">
                  <div class="modal-content">
                      <Form @submit="updateTank" :validation-schema="schema">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Update tank</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                     <error v-if="error" :error="error" />
                    <div class="modal-body">
                      <div class="form-group">
                        <label>Side number</label>
                        <Field
                          name="sideNumber"
                          type="text"
                          class="form-control"
                          v-model="sideNumber"
                          placeholder="Side number"
                        />
                        <ErrorMessage class="error" name="sideNumber" />

                      </div>

                       <div class="form-group">
                          <label>Producent</label>
                          <Field
                            name="producent"
                            type="text"
                            class="form-control"
                            v-model="producent"
                            placeholder="Producent"
                          />
                          <ErrorMessage class="error" name="producent" />
                        </div>

                        <div class="form-group">
                          <label>Model</label>
                          <Field name="model" type="text" class="form-control" v-model="model" placeholder="Model" />
                          <ErrorMessage class="error" name="model" />
                        </div>

                        <div class="form-group">
                          <label>Modification</label>
                          <Field
                            name="currentModification"
                            type="text"
                            class="form-control"
                            v-model="currentModification"
                            placeholder="Modification"
                          />
                          <ErrorMessage class="error" name="currentModification" />
                        </div>
                        <div class="form-group">
                          <label>Prod. Year</label>
                          <Field
                            name="productonYear"
                            type="number"
                            class="form-control"
                            v-model="productonYear"
                            placeholder="producton Year"
                          />
                          <ErrorMessage class="error" name="productonYear" />
                        </div>

                        <div class="form-group">
                          <label>Into Country</label>
                          <Field
                            name="introductionToCountry"
                            type="date"
                            class="form-control"
                            v-model="introductionToCountry"
                            placeholder="Into Country date YYYY-MM-DD"
                          />
                          <ErrorMessage class="error" name="introductionToCountry" />
                        </div>

                        <div class="form-group">
                          <label>Course (KM)</label>
                          <Field name="course" type="text" class="form-control" v-model="course" placeholder="Course" />
                          <ErrorMessage class="error" name="course" />
                        </div>

                        <div class="form-group">
                          <label>Ammunition</label>
                          <Field
                            name="ammunition"
                            type="text"
                            class="form-control"
                            v-model="ammunition"
                            placeholder="Ammunition"
                          />
                          <ErrorMessage class="error" name="ammunition" />
                        </div>

                        <div class="form-group">
                          <label>Armor Side</label>
                          <Field
                            name="armorSide"
                            type="text"
                            class="form-control"
                            v-model="armorSide"
                            placeholder="Armor Side"
                          />
                          <ErrorMessage class="error" name="armorSide" />
                        </div>

                        <div class="form-group">
                          <label>Armor Front</label>
                          <Field
                            name="armorFront"
                            type="text"
                            class="form-control"
                            v-model="armorFront"
                            placeholder="Armor Front"
                          />
                          <ErrorMessage class="error" name="armorFront" />
                        </div>

                        <div class="form-group">
                          <label>Armor Back</label>
                          <Field
                            name="armorBack"
                            type="text"
                            class="form-control"
                            v-model="armorBack"
                            placeholder="Armor Back"
                          />
                          <ErrorMessage class="error" name="armorBack" />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary">Update</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
           
          </tbody>
        </table>
      </div>
        <div class="btn-page">
          <button class="btn " @click="loadLessData">Previous</button>
          <button class="btn" @click="loadMoreData">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let previousPage = 5;
let nextPage = 0;
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


export default {
  name: "Tanks",
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {

      const schema = yup.object({
        sideNumber: yup.string().required().max(255),
        producent: yup.string().required().max(255),
        model: yup.string().required().max(255),
        currentModification: yup.string().required().max(255),
        productonYear: yup.number().required().min(1900).max(2022),
        introductionToCountry: yup.date().required().min("1970-01-01").max((date)),
        course: yup.number().required().positive().lessThan(999999),
        ammunition: yup.number().required().positive().lessThan(999999),
        armorSide: yup.number().required().positive().lessThan(999),
        armorFront: yup.number().required().positive().lessThan(999),
        armorBack: yup.number().required().positive().lessThan(999),
        
      });

    return {
       
      loading: false,
      tanks: [],
      sideNumber: "",
      producent: "",
      model: "",
      currentModification: "",
      productonYear: "",
      introductionToCountry: "",
      course: "",
      ammunition: "",
      armorSide: "",
      armorFront: "",
      armorBack: "",
      id: "",
      schema,
    };
  },
  created() {
    this.loadTanks();
  },
  methods: {
    loadTanks() {
      this.loading = true;
      axios
        .get("tanks?sortBy=createdAt_asc&limit=" + previousPage + "&skip=" + nextPage)
        .then((response) => {
          (this.loading = false), (this.tanks = response.data);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    async addTank(values) {
      try {
        await axios.post("tanks", {
          header: {
            Authorization: `Bearer ${localStorage.token}`,
          },
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
          user: this.user._id,
        });
        this.loadTanks();
        location.reload();
      } catch (e) {
       this.error = "Something went wrong!";
      }
    },
    async deleteTank(id) {
      try {
        await axios.delete(`tanks/${id}`, {
          header: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        this.loadTanks();
      } catch (e) {
        console.log(e);
      }
    },
    async updateTank(values) {
      try {
        await axios.patch(`tanks/${this.id}`, {
          header: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: {
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
          },
        });
        this.loadTanks();
      } catch (e) {
        console.log(e);
      }
    },
    clearForm() {
      this.sideNumber = "";
      this.producent = "";
      this.model = "";
      this.currentModification = "";
      this.productonYear = "";
      this.introductionToCountry = "";
      this.course = "";
      this.ammunition = "";
      this.armorSide = "";
      this.armorFront = "";
      this.armorBack = "";
      this.id = "";
    },
    updateTankDataForm(tank) {
      this.sideNumber = tank.sideNumber;
      this.producent = tank.producent;
      this.model = tank.model;
      this.currentModification = tank.currentModification;
      this.productonYear = tank.productonYear;
      this.introductionToCountry = tank.introductionToCountry;
      this.course = tank.course;
      this.ammunition = tank.ammunition;
      this.armorSide = tank.armorSide;
      this.armorFront = tank.armorFront;
      this.armorBack = tank.armorBack;
      this.id = tank._id;
    },
    async loadMoreData() {
      if (this.tanks.length == 5) {
        previousPage += 5;
        nextPage += 5;
      }
      await this.loadTanks();
    },
    async loadLessData() {
      if (previousPage > 5) {
        previousPage -= 5;
        nextPage -= 5;
      }

      await this.loadTanks();
    },
  },
};
</script>

<style>
.btn-close {
  opacity: 1 !important;
}
.table-wrapper {
  background-color: #99844b !important;
}
tr {
  border-color: black !important;
}
th {
  border-color: black !important;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
th:hover {
  border-color: black !important;
}
th:focus {
  border-color: black !important;
}
td {
  border-color: black !important;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.modal-content {
  background-color: #99844b !important;
}
.btn-page {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.btn-page .btn{
  margin: 1px;
}
.modal-backdrop.show {
  display: none;
}
.table {
  table-layout: auto !important;
}
.btn-add-new{
  float: right;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #95ab8e; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #0E312C; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1b5f55; 
}
 /* @media screen and (max-width: 992px) {

   

} */
/*
@media screen and (max-width: 768px) {

}
@media screen and (max-width: 576px) {

} */
</style>
