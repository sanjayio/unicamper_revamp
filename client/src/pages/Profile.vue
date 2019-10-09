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
              <h2 :key="updateKey">{{this.currUser.displayName}}'s Profile</h2>
              <p
                class="text-muted"
              >This is your profile page. Update personal information such as display name and email here. You can also see your XP points and badges you earned.</p>
            </div>
            <form class="form-validate">
              <div class="form-group">
                <label for="displayName" class="form-label">Display Name</label>
                <input
                  name="displayName"
                  v-model="newDisplayName"
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  autocomplete="off"
                  required
                  data-msg="Please enter your display name"
                  class="form-control"
                />
              </div>
              <button
                @click.prevent="updateUserDetails"
                class="btn btn-lg btn-block btn-primary"
              >Update Profile</button>
            </form>
            <br />
            <div class="card border-0 shadow mb-5">
              <div class="card-header bg-gray-100 py-4 border-0">
                <div class="media align-items-center">
                  <div class="media-body">
                    <p class="subtitle text-sm text-primary">Total XP Gained: {{this.xp}}</p>
                    <h4 class="mb-0">Badges you earned</h4>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <img
                  src="../assets/img/badges/bushfire.png"
                  alt
                  srcset
                  style="margin: 20px; height: 100px; -webkit-filter: drop-shadow(5px 5px 5px #a8a8a8); filter: drop-shadow(5px 5px 5px #a8a8a8);"
                  v-if="badges.includes('37bZHsBpelOVWsP8p5Gf')"
                />
                <img
                  src="../assets/img/badges/water_badge.png"
                  alt
                  srcset
                  style="height: 100px; -webkit-filter: drop-shadow(5px 5px 5px #a8a8a8); filter: drop-shadow(5px 5px 5px #a8a8a8);"
                  v-if="badges.includes('aZfltKE13w1cjmh1TIZK')"
                />
              </div>
            </div>
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
  name: "Profile",
  components: {},
  data() {
    return {
      redirect_url: this.$route.query.redirect,
      currUser: firebase.auth().currentUser,
      newDisplayName: "",
      xp: 0,
      badges: [],
      updateKey: 0
    };
  },
  mounted() {
    console.log(this.currUser);
    this.getXP();
  },
  methods: {
    updateUserDetails: function() {
      var _this = this;
      if (_this.currUser) {
        _this.currUser
          .updateProfile({
            displayName:
              _this.newDisplayName == ""
                ? _this.currUser.displayName
                : _this.newDisplayName
          })
          .then(
            function(response) {
              console.log("success");
              _this.updateKey++;
            },
            function(err) {
              console.log(err);
            }
          );
      }
    },
    getXP: function() {
      var db = firebase.firestore();
      var _this = this;
      if (this.currUser) {
        var docRef = db.collection("user").doc(_this.currUser.uid);

        docRef
          .get()
          .then(function(doc) {
            if (doc.exists) {
              var xps = doc.data()["xp"];
              var total_xp = 0;
              for (var i = 0; i < xps.length; i++) {
                total_xp = total_xp + xps[i];
              }
              _this.xp = total_xp;
              _this.badges = doc.data()["badges"];
            } else {
              console.log("doc doesnt exist");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="css">
</style>