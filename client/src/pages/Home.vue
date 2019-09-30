<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
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
    <section
      style="background-image: url(https://images.pexels.com/photos/1531683/pexels-photo-1531683.jpeg);"
      class="d-flex align-items-center dark-overlay bg-cover"
    >
      <div class="container py-6 py-lg-7 text-white overlay-content text-center">
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <h1 class="display-3 font-weight-bold text-shadow">Unicamper</h1>
            <p class="text-lg text-shadow">Keep Calm and Camp on.</p>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="search-bar rounded p-3 p-lg-4 position-relative mt-n5 z-index-20">
        <form action="#">
          <div class="row">
            <div class="col-lg-7 d-flex align-items-center form-group">
              <vue-google-autocomplete
                ref="address"
                id="map"
                class="form-control form-control-lg"
                placeholder="Search suburb or postcode"
                v-on:placechanged="getAddressData"
                types="(regions)"
                country="au"
              ></vue-google-autocomplete>
            </div>

            <div class="col-lg-3 d-flex align-items-center form-group no-divider">
              <select title="Within Radius (km)" data-style="btn-form-control" class="selectpicker">
                <option value="50">50 km</option>
                <option value="100">100 km</option>
                <option value="500">500 km</option>
                <option value="All">All</option>
              </select>
            </div>
            <div class="col-lg-2 form-group mb-0">
              <router-link to="/search" tag="button" class="btn btn-primary btn-block h-100">Search</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Our picks section-->
    <section class="py-6">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <p class="subtitle text-primary">Editor's picks</p>
            <h2>Best Camping Guides</h2>
          </div>
        </div>
        <div class="row">
          <div class="d-flex align-items-lg-stretch mb-4 col-lg-8">
            <div
              style="background: center center url(img/photo/photo-1449034446853-66c86144b0ad.jpg) no-repeat; background-size: cover;"
              class="card shadow-lg border-0 w-100 border-0 hover-animate"
            >
              <a href="category.html" class="tile-link"></a>
              <div
                class="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7"
              >
                <h3 class="text-shadow text-uppercase mb-0">San Francisco</h3>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-lg-stretch mb-4 col-lg-4">
            <div
              style="background: center center url(img/photo/photo-1429554429301-1c7d5ae2d42e.jpg) no-repeat; background-size: cover;"
              class="card shadow-lg border-0 w-100 border-0 hover-animate"
            >
              <a href="category.html" class="tile-link"></a>
              <div
                class="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7"
              >
                <h3 class="text-shadow text-uppercase mb-0">Los Angeles</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-flex align-items-lg-stretch mb-4 col-lg-4">
            <div
              style="background: center center url(img/photo/photo-1523430410476-0185cb1f6ff9.jpg) no-repeat; background-size: cover;"
              class="card shadow-lg border-0 w-100 border-0 hover-animate"
            >
              <a href="category.html" class="tile-link"></a>
              <div
                class="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7"
              >
                <h3 class="text-shadow text-uppercase mb-0">Santa Monica</h3>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-lg-stretch mb-4 col-lg-4">
            <div
              style="background: center center url(img/photo/photo-1505245208761-ba872912fac0.jpg) no-repeat; background-size: cover;"
              class="card shadow-lg border-0 w-100 border-0 hover-animate"
            >
              <a href="category.html" class="tile-link"></a>
              <div
                class="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7"
              >
                <h3 class="text-shadow text-uppercase mb-0">San Diego</h3>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-lg-stretch mb-4 col-lg-4">
            <div
              style="background: center center url(img/photo/photo-1519867850-74775a87e783.jpg) no-repeat; background-size: cover;"
              class="card shadow-lg border-0 w-100 border-0 hover-animate"
            >
              <a href="category.html" class="tile-link"></a>
              <div
                class="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7"
              >
                <h3 class="text-shadow text-uppercase mb-0">Fresno</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-4 pb-6">
      <div class="container">
        <div class="pb-lg-4">
          <p class="subtitle text-secondary">The best camping guide for students</p>
          <h2 class="mb-5">Discover Victoria while studying</h2>
        </div>
        <div class="row">
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div class="px-0 pr-lg-3">
              <div class="icon-rounded mb-3 bg-secondary-light">
                <img src="https://img.icons8.com/nolan/48/000000/search.png" />
              </div>
              <h3 class="h6 text-uppercase">Find the perfect place</h3>
              <p
                class="text-muted text-sm"
              >Discover the best camping sites in Victoria from our curated beginners guides or by searching for sites near you.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div class="px-0 pr-lg-3">
              <div class="icon-rounded mb-3 bg-primary-light">
                <img src="https://img.icons8.com/nolan/48/000000/todo-list.png" />
              </div>
              <h3 class="h6 text-uppercase">Plan your trip</h3>
              <p
                class="text-muted text-sm"
              >Plan your trip using our best in the industry trip planner, get expert recommendations for students and first time campers about things to carry and safety instructions.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div class="px-0 pr-lg-3">
              <div class="icon-rounded mb-3 bg-secondary-light">
                <img src="https://img.icons8.com/nolan/48/000000/trekking.png" />
              </div>
              <h3 class="h6 text-uppercase">Enjoy your trip</h3>
              <p
                class="text-muted text-sm"
              >You will never run out of places to see and food to try with our recommendations for each campsite. Also spot indigenous wildlife if you are lucky.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div class="px-0 pr-lg-3">
              <div class="icon-rounded mb-3 bg-primary-light">
                <img src="https://img.icons8.com/nolan/48/000000/poor-quality.png" />
              </div>
              <h3 class="h6 text-uppercase">Earn points</h3>
              <p
                class="text-muted text-sm"
              >After your vacation, write reviews about your trip and earn points to increase your reputation in the Unicamper community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="text-center pb-lg-4">
          <p class="subtitle text-secondary">Trending on Unicamper</p>
          <h2 class="mb-5">Popular Campsites</h2>
        </div>
      </div>
      <div class="container-fluid">
        <!-- Slider main container-->
        <div class="swiper-container swiper-container-mx-negative items-slider-full px-lg-5 pt-3">
          <!-- Additional required wrapper-->
          <div class="swiper-wrapper pb-5">
            <!-- Slides-->
            <div
              class="swiper-slide h-auto px-2"
              style="max-height: 500px;"
              v-for="(item, key) in list_data"
              :key="key"
            >
              <!-- venue item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
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
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Campsite</div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >{{item.description? item.description.substring(0, 100) : ''}}...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- If we need pagination-->
          <div class="swiper-pagination"></div>
        </div>
        <div class="text-center mt-5">
          <a href="category-2.html" class="btn btn-outline-primary">See all places</a>
        </div>
      </div>
    </section>
    <!-- Divider Section-->
    <section class="py-6 py-lg-7 position-relative dark-overlay">
      <img
        src="https://images.pexels.com/photos/1246955/pexels-photo-1246955.jpeg"
        alt
        class="bg-image"
      />
      <div class="container">
        <div class="overlay-content text-white py-lg-5 text-center">
          <p class="subtitle text-white letter-spacing-4 mb-4">Find the best spots</p>
          <h3 class="display-3 font-weight-bold text-serif text-shadow mb-5">Travel & Explore</h3>
          <p
            class="lead text-shadow mb-5"
          >Earth and sky, woods and fields, lakes and rivers, the mountain and the sea, are excellent schoolmasters, and teach of us more than we can ever learn from books. - John Lubbock</p>
        </div>
      </div>
    </section>

    <!-- Divider Section-->
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-5 mb-lg-0 text-center text-lg-left">
            <p class="subtitle text-secondary">Start using Unicamper today</p>
            <p
              class="text-lg"
            >Unicamper is the best way to travel & explore Victoria while studying.</p>
            <p
              class="text-muted mb-0"
            >If you are a student and new to Victoria and want to explore what it has to offer, don't wait anymore. Sign Up now!</p>
          </div>
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="text-center">
              <p class="mb-2">
                <router-link
                  to="/login"
                  class="btn btn-lg btn-block btn-primary"
                >Create a new account</router-link>
              </p>
              <p class="text-muted text-small">It's free!</p>
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
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CampsitesAPI from "../services/CampsitesAPI";
import firebase from "firebase";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
    VueGoogleAutocomplete,
    Loading
  },
  data() {
    return {
      str: "Start Camping today",
      i: 0,
      timer: 0,
      str2: "",
      address: "Melbourne CBD, VIC",
      lat: -37.8136,
      lon: 144.9631,
      isLoading: true,
      fullPage: true,
      campsites: [],
      list_data: [1, 2, 3, 4, 5],
      result_count: 0,
      reviews: []
    };
  },
  methods: {
    typing() {
      if (this.i <= this.str.length) {
        this.str2 = this.str.slice(0, this.i++);
        this.timer = setTimeout(() => {
          this.typing();
        }, 200);
      } else {
        clearTimeout(this.timer);
      }
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = placeResultData.formatted_address;
      this.lat = addressData.latitude;
      this.lon = addressData.longitude;
      localStorage.setItem("lat", this.lat);
      localStorage.setItem("lon", this.lon);
      localStorage.setItem("full_address", this.address);
      localStorage.setItem(
        "address",
        placeResultData.address_components[0].long_name
      );
    },
    onCancel: function() {},
    async loadCampsites() {
      const response = await CampsitesAPI.getCampsites();
      this.campsites = response.data;
      this.getListInfosucc();
      this.$nextTick(function() {
        $(".selectpicker").selectpicker();
        var itemsSliderFull = new Swiper(".items-slider-full", {
          slidesPerView: 6,
          spaceBetween: 20,
          loop: false,
          roundLengths: true,
          breakpoints: {
            1600: {
              slidesPerView: 5
            },
            1400: {
              slidesPerView: 4
            },
            1200: {
              slidesPerView: 3
            },
            991: {
              slidesPerView: 2
            },
            565: {
              slidesPerView: 1
            }
          },

          // If we need pagination
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true
          }
        });
      });
      this.isLoading = false;
      console.log(this.result_count);
    },
    getListInfosucc() {
      if (this.campsites.length > 0) {
        for (let i in this.campsites) {
          var dis = this.$options.methods.distance(
            this.campsites[i].lat,
            this.campsites[i].lon,
            this.latitude,
            this.longitude
          );
          dis = parseFloat(dis).toFixed(2);
          var rating = this.rating(this.campsites[i]._id);
          this.$set(this.campsites[i], "distance", dis);
          this.$set(this.campsites[i], "rating", rating);
        }
        this.list_data = this.campsites;
        this.result_count = this.campsites.length;
        this.sortRating();
      }
    },
    distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295; // Math.PI / 180
      var c = Math.cos;
      var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    },
    rating(id) {
      var counter = 0;
      var rating = 0;
      for (var i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].site_id == id) {
          counter++;
          rating = rating + this.reviews[i].review_rating;
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
          this.loadCampsites();
        });
    },
    sortRating() {
      function compare(a, b) {
        if (a.rating > b.rating) {
          return -1;
        } else {
          return 1;
        }
      }
      this.list_data = this.campsites.concat();
      this.list_data.sort(compare);
      this.list_data = this.list_data.slice(0, 10);
    },
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
    this.$nextTick(function() {
      $(".selectpicker").selectpicker();
    });
    this.getReviews();
    this.typing();
    this.isLoading = false;
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>