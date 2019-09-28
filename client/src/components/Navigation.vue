<template>
  <!-- Navbar-->
  <nav class="navbar navbar-expand-lg fixed-top shadow navbar-light bg-white">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <router-link class="navbar-brand py-1" to="/">
          <img src="../assets/img/unicamper_logo.svg" style="height: 50px;" alt="Directory logo" />
          <b style="font-size: 18px;">Unicamper</b>
        </router-link>
      </div>
      <!-- Navbar Collapse -->
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Search</router-link>
          </li>
          <li class="nav-item dropdown ml-lg-3">
            <a
              id="userDropdownMenuLink"
              class="nav-link"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Planner</a>
            <div aria-labelledby="userDropdownMenuLink" class="dropdown-menu dropdown-menu-right">
              <a href class="dropdown-item">
                <router-link class="nav-link" to="/createPlan">Create a new plan</router-link>
              </a>
              <a href class="dropdown-item">
                <router-link class="nav-link" to="/planner">Existing plans</router-link>
              </a>
            </div>
          </li>
          <router-link class="nav-link" to="/login" v-if="!this.loggedIn">Login</router-link>
          <li class="nav-item dropdown ml-lg-3" v-else>
            <a
              id="userDropdownMenuLink"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                :src="currentUser.photoURL"
                alt="Jack London"
                class="avatar avatar-sm avatar-border-white mr-2"
              />
            </a>
            <div aria-labelledby="userDropdownMenuLink" class="dropdown-menu dropdown-menu-right">
              <a href class="dropdown-item">
                <b>{{this.currentUser.displayName}}</b>'s Profile
              </a>
              <div class="dropdown-divider"></div>
              <a href class="nav-link" @click="logout">
                <i class="fas fa-sign-out-alt mr-2 text-muted"></i>Logout
              </a>
            </div>
          </li>
          <li class="nav-item"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CampsitesAPI from "../services/CampsitesAPI";
import firebase from "firebase";
export default {
  name: "Navigation",
  data() {
    return {
      server_status: 0,
      loggedIn: false,
      currentUser: null
    };
  },
  mounted() {
    this.checkStatus();
    this.checkLogin();
    //console.log(this.$router.currentRoute);
  },
  methods: {
    async checkStatus() {
      const response = await CampsitesAPI.getCampsites();
      console.log(response.status);
      if (response.status == 200) {
        this.server_status = 1;
      }
    },
    checkLogin() {
      var currUser = firebase.auth().currentUser;
      if (currUser) {
        this.loggedIn = true;
        this.currentUser = currUser;
        console.log(this.currentUser);
      }
    },
    logout() {
      var _this = this;
      if (this.currentUser) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            _this.$router.push({
              name: "home"
            });
            this.loggedIn = false;
            this.currentUser = null;
          });
      }
    }
  }
};
</script>