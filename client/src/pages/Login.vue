<template>
  <div>
    <div class="container-fluid px-3">
      <div class="row min-vh-100">
        <div class="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div class="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div class="mb-4">
              <img
                src="../assets/img/unicamper_logo.svg"
                alt="..."
                style="max-width: 6rem;"
                class="img-fluid mb-4"
              />
              <h2>Login</h2>
              <p
                class="text-muted"
              >Login to your Unicamper account to access Planner and other member only features.</p>
            </div>
            <form class="form-validate">
              <div class="form-group">
                <label for="loginUsername" class="form-label">Email Address</label>
                <input
                  name="loginUsername"
                  v-model="loginUsername"
                  id="loginUsername"
                  type="email"
                  placeholder="name@address.com"
                  autocomplete="off"
                  required
                  data-msg="Please enter your email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="loginPassword" class="form-label">Password</label>
                <input
                  name="loginPassword"
                  v-model="loginPassword"
                  id="loginPassword"
                  placeholder="Password"
                  type="password"
                  required
                  data-msg="Please enter your password"
                  class="form-control"
                />
              </div>
              <button @click.prevent="login" class="btn btn-lg btn-block btn-primary">Login</button>
              <router-link
                to="/signup"
                class="btn btn-lg btn-block btn-secondary"
              >Create a new account</router-link>
              <small class="text-danger">{{this.errorText}}</small>
              <hr data-content="OR" class="my-3 hr-text letter-spacing-2" />
              <button class="btn btn-lg btn-block btn-outline-muted" @click.prevent="googleSignIn">
                <img
                  src="https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg"
                  alt
                  srcset
                /> Sign in with Google
              </button>
            </form>
            <router-link href class="close-absolute mr-md-5 mr-xl-6 pt-5" to="/">
              <svg
                class="svg-icon w-3rem h-3rem"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="close-1"
              >
                <title>Close</title>
                <desc>A line styled icon from Orion Icon Library.</desc>
                <path
                  data-name="layer1"
                  fill="none"
                  stroke="#202020"
                  stroke-miterlimit="10"
                  d="M41.999 20.002l-22 22m22 0L20 20"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  style="stroke:var(--layer1, #202020)"
                />
              </svg>
            </router-link>
          </div>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
          <!-- Image-->
          <div
            style="background-image: url(https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg);"
            class="bg-cover h-100 mr-n3"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      redirect_url: this.$route.query.redirect,
      errorText: ""
    };
  },
  mounted() {},
  methods: {
    login: function() {
      var _this = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.loginUsername, this.loginPassword)
        .then(
          function(user) {
            _this.$router.push(_this.redirect_url || "/");
          },
          function(err) {
            _this.errorText = "Error: " + err.message;
          }
        );
    },
    googleSignIn: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      var _this = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          _this.$router.push(_this.redirect_url || "/");
        })
        .catch(err => {
          _this.errorText = "Error: " + err.message;
        });
    }
  }
};
</script>
<style lang="css">
</style>
