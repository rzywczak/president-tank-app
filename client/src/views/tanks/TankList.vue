<script>
import axios from "axios";
import authHeader from "../../../auth-header.js";
import Tanks from "../Tanks.vue";

let previousPage = 5;
let nextPage = 0;

export default {
  data() {
    return {

    };
  },
  methods: {
    async loadTanks() {
      
      this.loading = true;
      await axios
        .get("tanks?sortBy=createdAt_asc&limit=" + 5 + "&skip=" + nextPage, { headers: authHeader() })
        .then((response) => {
           
          if (response.data.length === 0 && nextPage === 0) {
            this.isVisible = false;
          }
          if (response.data.length > 0) {
            this.isVisible = true;
          }

          (this.loading = false), (this.tanks = response.data);
             console.log(response.data);
          return response.data
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
