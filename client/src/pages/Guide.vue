<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"
      color="#4d66f7"
      :width="128"
      :height="128"
      :opacity="1.0"
    ></loading>
    <header class="header">
      <!-- Navbar-->
      <Navigation></Navigation>
      <!-- /Navbar -->
    </header>
    <section class="position-relative py-6">
      <img :src="guide.photos[0]" alt class="bg-image" />
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="bg-white rounded-lg shadow p-5">
              <strong class="text-uppercase text-secondary d-inline-block mb-2 text-sm">Featured</strong>
              <h2 class="mb-3">{{this.guide.name}}</h2>
              <p class="text-muted">{{this.guide.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row mb-5">
          <!-- blog item-->
          <div
            class="col-lg-4 col-sm-6 mb-4 hover-animate"
            v-for="(item,key) in list_data"
            :key="key"
          >
            <div class="card shadow border-0 h-100">
              <div
                class="card-img-top overflow-hidden dark-overlay bg-cover"
                style="max-height: 300px;"
              >
                <img :src="item.image_urls ? item.image_urls[0] : ''" alt />
                <a href class="tile-link" @click.prevent="detail(item)"></a>
                <div class="card-img-overlay-bottom z-index-20">
                  <h4 class="text-white text-shadow">{{item.name ? item.name : ''}}</h4>
                  <p class="mb-2 text-xs">
                    <i class="fa fa-xl fa-star text-warning" v-for="k in item.rating" :key="k"></i>
                    <i class="fa fa-star text-gray-300" v-for="l in 5-item.rating" :key="l+999"></i>
                  </p>
                </div>
                <div class="card-img-overlay-top d-flex justify-content-between align-items-center">
                  <div class="badge badge-transparent badge-pill px-3 py-2">Campsite</div>
                </div>
              </div>
              <div class="card-body">
                <p class="my-2 text-muted text-sm">{{item.description.substring(0, 100)}}...</p>
                <a href class="btn btn-link pl-0" @click.prevent="detail(item)">
                  Read more
                  <i class="fa fa-long-arrow-alt-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer-->
    <Footer></Footer>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A&libraries=places"></script>

<script>
require("../assets/js/theme.js");
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CampsitesAPI from "../services/CampsitesAPI";
import firebase from "firebase";

export default {
  name: "Guide",
  components: {
    Navigation,
    Footer,
    Loading
  },
  data() {
    return {
      guide: {},
      guide_id: "",
      campsites: [],
      list_data: [],
      reviews: [],
      isLoading: true
    };
  },
  methods: {
    getGuides: async function() {
      this.guides = [];
      var db = firebase.firestore();
      var _this = this;
      var docRef = db.collection("guides").doc(this.guide_id);
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          _this.guide = doc.data();
        } else {
          console.log("guide doesnt exist");
        }
      });
    },
    async loadCampsites() {
      const response = await CampsitesAPI.getCampsites();
      this.campsites = response.data;
      this.getListInfosucc();
      this.isLoading = false;
    },
    getListInfosucc() {
      this.list_data = [];
      if (this.campsites.length > 0) {
        for (let i in this.campsites) {
          if (this.guide.sites.includes(this.campsites[i]._id)) {
            var rating = this.rating(this.campsites[i]._id);
            this.$set(this.campsites[i], "rating", rating);
            this.list_data.push(this.campsites[i]);
          }
        }
        this.result_count = this.list_data.length;
        console.log(this.list_data);
      }
    },
    rating(id) {
      var counter = 0;
      var rating = 0;
      for (var i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].site_id == id) {
          counter++;
          rating = rating + parseInt(this.reviews[i].review_rating);
        }
      }
      if (counter > 0) {
        rating = parseInt(rating / counter);
      } else {
        rating = 0;
      }
      return rating;
    },
    getReviews: function() {
      this.reviews = [];
      var db = firebase.firestore();
      var _this = this;
      db.collection("review")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            _this.reviews.push(doc.data());
          });
        });
    },
    onCancel() {},
    detail(item) {
      this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {
          key: "key",
          detail: item
        }
      });
    }
  },
  mounted() {
    let uri = window.location.href.split("?");
    if (uri.length == 2) {
      let vars = uri[1].split("&");
      let getVars = {};
      let tmp = "";
      vars.forEach(function(v) {
        tmp = v.split("=");
        if (tmp.length == 2) getVars[tmp[0]] = tmp[1];
      });
      this.guide_id = getVars["id"];
    }
    this.getGuides();
    this.getReviews();
    this.loadCampsites();
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>
