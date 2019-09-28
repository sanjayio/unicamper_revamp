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
              <h2>Sign up</h2>
              <p
                class="text-muted"
              >His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table.</p>
            </div>
            <form class="form-validate">
              <div class="form-group">
                <label for="displayName" class="form-label">Display Name</label>
                <input
                  name="displayName"
                  v-model="displayName"
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  autocomplete="off"
                  required
                  data-msg="Please enter your display name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="loginUsername" class="form-label">Email Address</label>
                <input
                  name="loginUsername"
                  v-model="loginUsername"
                  id="loginUsername"
                  type="email"
                  placeholder="johndoe@gmail.com"
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
              <div class="form-group mb-4">
                <label for="loginPassword2" class="form-label">Confirm your password</label>
                <input
                  name="loginPassword2"
                  id="loginPassword2"
                  placeholder="Password"
                  type="password"
                  required
                  data-msg="Please enter your password"
                  class="form-control"
                />
              </div>
              <button @click.prevent="signUp" class="btn btn-lg btn-block btn-primary">Sign up</button>
              <hr class="my-4" />
              <p class="text-sm text-muted">
                By signing up you agree to Directory's
                <a href="#">Terms and Conditions</a> and
                <a href="#">Privacy Policy</a>.
              </p>
            </form>
            <router-link href class="close-absolute mr-md-5 mr-xl-6 pt-5" to="/login">
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
import router from "../router";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      displayName: ""
    };
  },
  mounted() {},
  methods: {
    signUp: function() {
      var _this = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.loginUsername, this.loginPassword)
        .then(
          function(user) {
            //alert("user created");
            console.log("user created");
            _this.updateUserProfile();
            router.replace("login");
          },
          function(err) {
            console.log("error: " + err.message);
          }
        );
    },
    updateUserProfile: function() {
      var currUser = firebase.auth().currentUser;
      currUser
        .updateProfile({
          displayName: this.displayName,
          photoURL: "https://img.icons8.com/color/48/000000/bot.png"
        })
        .then(function() {
          console.log("user details updated");
        })
        .catch(function(err) {
          console.log("error: " + err.message);
        });
    },
    goBack: function() {
      router.go(-1);
    }
  }
};
</script>
<style lang="css">
</style>