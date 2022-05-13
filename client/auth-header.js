// import  store  from "./src/vuex.js";

export default function authHeader() {
  let token = localStorage.getItem("token");
  // let user = store.state.user;

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return { Authorization: null };
  }
}
