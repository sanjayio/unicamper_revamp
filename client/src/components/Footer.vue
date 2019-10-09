<template>
  <footer class="position-relative z-index-10 d-print-none">
    <!-- Main block - menus, subscribe form-->
    <div class="py-6 bg-gray-200 text-muted">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-5 mb-lg-0">
            <img src="../assets/img/unicamper_logo.svg" style="height: 100px;" alt="Directory logo" />
            <div class="font-weight-bold text-uppercase text-dark mb-3">
              <h4>Unicamper</h4>
            </div>
            <p>Keep Calm and Camp on.</p>
          </div>
          <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
            <h6 class="text-uppercase text-dark mb-3">Blog</h6>
            <ul class="list-unstyled">
              <li>
                <router-link class="text-muted" to="/blog/essentialtips">Essential Tips</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/blog/beforeyouleave">Before You Leave</router-link>
              </li>
            </ul>
            <h6 class="text-uppercase text-dark mb-3">Safety</h6>
            <ul class="list-unstyled">
              <li>
                <router-link class="text-muted" to="/safety/bushfire">Bushfire Safety</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/safety/drinkingwater">Drinking Water Safety</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
            <h6 class="text-uppercase text-dark mb-3">Pages</h6>
            <ul class="list-unstyled">
              <li>
                <router-link class="text-muted" to="/">Home</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/search">Search</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/planner">Existing Plans</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/createPlan">Create A Plan</router-link>
              </li>
              <li>
                <router-link class="text-muted" to="/profile">Profile</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-4">
            <h6 class="text-uppercase text-dark mb-3">About Us</h6>
            <p class="mb-3">Unicamper was born at Monash University in August 2019</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Copyright section of the footer-->
    <div class="py-4 font-weight-light bg-gray-800 text-gray-300">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-left">
            <p class="text-sm mb-md-0">&copy; 2019 Unicamper. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>