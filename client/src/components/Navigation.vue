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
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler navbar-toggler-right"
      >
        <i class="fa fa-bars"></i>
      </button>
      <!-- Navbar Collapse -->
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link active" to="/search" v-if="currentRoute == 'Search'">Search</router-link>
            <router-link class="nav-link" to="/search" v-else>Search</router-link>
          </li>
          <li class="nav-item dropdown ml-lg-3">
            <a
              id="userDropdownMenuLink"
              class="nav-link active"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-if="currentRoute == 'Planner' || currentRoute == 'CreatePlan'"
            >Planner</a>
            <a
              id="userDropdownMenuLink"
              class="nav-link"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-else
            >Planner</a>
            <div aria-labelledby="userDropdownMenuLink" class="dropdown-menu dropdown-menu-right">
              <a href class="dropdown-item">
                <router-link
                  class="nav-link active"
                  to="/createPlan"
                  v-if="currentRoute == 'CreatePlan'"
                >Create a new plan</router-link>
                <router-link class="nav-link" to="/createPlan" v-else>Create a new plan</router-link>
              </a>
              <a href class="dropdown-item">
                <router-link
                  class="nav-link active"
                  to="/planner"
                  v-if="currentRoute == 'Planner'"
                >Existing plans</router-link>
                <router-link class="nav-link" to="/planner" v-else>Existing plans</router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown ml-lg-3">
            <a
              id="userDropdownMenuLink"
              class="nav-link active"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-if="currentRoute == 'Bushfire' || currentRoute == 'DrinkingWater'"
            >Safety</a>
            <a
              id="userDropdownMenuLink"
              class="nav-link"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-else
            >Safety</a>
            <div aria-labelledby="userDropdownMenuLink" class="dropdown-menu dropdown-menu-right">
              <a href class="dropdown-item">
                <router-link
                  class="nav-link active"
                  to="/safety/bushfire"
                  v-if="currentRoute == 'Bushfire'"
                >Bushfire Safety</router-link>
                <router-link class="nav-link" to="/safety/bushfire" v-else>Bushfire Safety</router-link>
              </a>
              <a href class="dropdown-item">
                <router-link
                  class="nav-link active"
                  to="/safety/drinkingwater"
                  v-if="currentRoute == 'DrinkingWater'"
                >Drinking Water</router-link>
                <router-link class="nav-link" to="/safety/drinkingwater" v-else>Drinking Water</router-link>
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
      currentUser: null,
      currentRoute: ""
    };
  },
  mounted() {
    this.checkStatus();
    this.checkLogin();
    this.currentRoute = this.$router.currentRoute.name;
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