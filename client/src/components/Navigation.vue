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
          <li class="nav-item">
            <a href class="nav-link">Planner</a>
          </li>
          <li class="nav-item mt-3 mt-lg-0 ml-lg-3 d-lg-none d-xl-inline-block">
            <a href class="btn btn-primary" v-if="server_status == 0" @click.prevent="checkStatus">
              Server Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#e74c3c">
                    <path
                      d="M157.66667,86c0,39.57433 -32.09233,71.66667 -71.66667,71.66667c-39.57433,0 -71.66667,-32.09233 -71.66667,-71.66667c0,-39.57433 32.09233,-71.66667 71.66667,-71.66667c39.57433,0 71.66667,32.09233 71.66667,71.66667z"
                    />
                    <path
                      d="M118.25,86c0,17.81633 -14.43367,32.25 -32.25,32.25c-17.81633,0 -32.25,-14.43367 -32.25,-32.25c0,-17.81633 14.43367,-32.25 32.25,-32.25c17.81633,0 32.25,14.43367 32.25,32.25z"
                    />
                  </g>
                </g>
              </svg>
            </a>
            <a href class="btn btn-primary" v-else @click.prevent="checkStatus">
              Server Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#2ecc71">
                    <path
                      d="M157.66667,86c0,39.57433 -32.09233,71.66667 -71.66667,71.66667c-39.57433,0 -71.66667,-32.09233 -71.66667,-71.66667c0,-39.57433 32.09233,-71.66667 71.66667,-71.66667c39.57433,0 71.66667,32.09233 71.66667,71.66667z"
                    />
                    <path
                      d="M118.25,86c0,17.81633 -14.43367,32.25 -32.25,32.25c-17.81633,0 -32.25,-14.43367 -32.25,-32.25c0,-17.81633 14.43367,-32.25 32.25,-32.25c17.81633,0 32.25,14.43367 32.25,32.25z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CampsitesAPI from "../services/CampsitesAPI";
export default {
  name: "Navigation",
  data() {
    return {
      server_status: 0
    };
  },
  mounted() {
    this.checkStatus();
  },
  methods: {
    async checkStatus() {
      const response = await CampsitesAPI.getCampsites();
      console.log(response.status);
      if (response.status == 200) {
        this.server_status = 1;
      }
    }
  }
};
</script>