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
      <Navigation></Navigation>
    </header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 py-4 p-xl-5">
          <h2 class="mb-4">Create a new Plan</h2>
          <hr class="my-4" />
          <form action="#" autocomplete="off">
            <div class="form-group">
              <label for="planName" class="form-label">Plan Name</label>
              <input
                name="planName"
                v-model="planName"
                id="planName"
                type="text"
                placeholder="Grampians Camping trip"
                autocomplete="off"
                required
                data-msg="Please enter your plan name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="form_dates" class="form-label">Dates</label>
              <div class="datepicker-container datepicker-container-left">
                <input
                  type="text"
                  id="form_dates"
                  name="bookingDate"
                  :ref="'bookingDate'"
                  placeholder="Choose your dates"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="search" class="form-label">Rally Point</label>
              <vue-google-autocomplete
                ref="address"
                id="search"
                class="form-control"
                placeholder="Search..."
                v-on:placechanged="getAddressData"
                types="address"
                country="au"
              ></vue-google-autocomplete>
            </div>
            <div class="form-group">
              <label for="rallytime" class="form-label">Rally Time</label>
              <select
                name="rallytime"
                id="rallytime"
                :ref="'rallytime'"
                v-model="rally_time"
                data-style="btn-selectpicker"
                title
                @change="onRallyTimeChange($event)"
                class="selectpicker form-control"
              >
                <option value="12AM">12 AM</option>
                <option value="1AM">1 AM</option>
                <option value="2AM">2 AM</option>
                <option value="3AM">3 AM</option>
                <option value="4AM">4 AM</option>
                <option value="5AM">5 AM</option>
                <option value="6AM">6 AM</option>
                <option value="7AM">7 AM</option>
                <option value="8AM">8 AM</option>
                <option value="9AM">9 AM</option>
                <option value="10AM">10 AM</option>
                <option value="11AM">11 AM</option>
                <option value="12PM">12 PM</option>
                <option value="1PM">1 PM</option>
                <option value="2PM">2 PM</option>
                <option value="3PM">3 PM</option>
                <option value="4PM">4 PM</option>
                <option value="5PM">5 PM</option>
                <option value="6PM">6 PM</option>
                <option value="7PM">7 PM</option>
                <option value="8PM">8 PM</option>
                <option value="9PM">9 PM</option>
                <option value="10PM">10 PM</option>
                <option value="11PM">11 PM</option>
              </select>
            </div>
            <div class="form-group">
              <label for="activities" class="form-label">Activities</label>
              <select
                name="activities"
                id="activities"
                :ref="activities"
                v-model="activities"
                multiple
                data-style="btn-selectpicker"
                data-live-search="true"
                data-selected-text-format="count &gt; 1"
                title
                @change="onActivitiesChange($event)"
                class="selectpicker form-control"
              >
                <option value="fishing">
                  <img
                    src="../assets/img/profile_pic.png"
                    alt
                    class="avatar avatar-sm avatar-border-white mr-2"
                  />Fishing
                </option>
                <option value="walking">Walking Trails</option>
                <option value="4wd">4WD Trails</option>
                <option value="horse_riding">Horse Riding</option>
                <option value="canoeing">Canoeing</option>
                <option value="water_slide">Water Slide</option>
                <option value="swimming">Swimming</option>
                <option value="biking">Biking Trails</option>
                <option value="hiking">Hiking</option>
                <option value="paddling">Paddling</option>
              </select>
            </div>

            <div class="form-group">
              <label for="campingspots" class="form-label">Your favourite Camping spots</label>
              <!-- Slider main container -->
              <div
                id="campingspots"
                name="campingspots"
                class="swiper-container swiper-container-mx-negative items-slider"
                v-if="list_data.length>0"
              >
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper pb-5">
                  <!-- Slides-->
                  <div class="swiper-slide h-auto px-2" v-for="(item, key) in list_data" :key="key">
                    <!-- place item-->
                    <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100">
                      <div class="card h-100 border-0 shadow">
                        <div class="card-img-top overflow-hidden gradient-overlay">
                          <img
                            :src="item.image_urls[0]"
                            alt="Modern, Well-Appointed Room"
                            class="img-fluid"
                          />
                          <a href class="tile-link" @click.prevent="detail(item)"></a>
                        </div>
                        <div class="card-body d-flex align-items-center">
                          <div class="w-100">
                            <h6 class="card-title">
                              <a
                                href
                                class="text-decoration-none text-dark"
                                @click.prevent="detail(item)"
                              >{{item.name}}</a>
                            </h6>
                            <a
                              href
                              :ref="'addToPlan_' + item._id"
                              class="btn btn-primary"
                              @click.prevent="addToPlan(item)"
                            >Add to Plan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- If we need pagination -->
                <div class="swiper-pagination"></div>
              </div>
              <p v-else>Add campsites to your favourites to show up here.</p>
            </div>
            <div class="form-group">
              <label for="planName" class="form-label">Plan settings</label>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  id="settings_allowothers"
                  v-model="settings_allowothers"
                  name="settings_allowothers"
                  class="custom-control-input"
                />
                <label
                  for="settings_allowothers"
                  class="custom-control-label"
                >Allow other unicampers to join the plan</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  id="settings_createshareable"
                  v-model="settings_createshareable"
                  name="settings_createshareable"
                  class="custom-control-input"
                />
                <label
                  for="settings_createshareable"
                  class="custom-control-label"
                >Create shareable link</label>
              </div>
            </div>
            <hr data-content="PUBLISH MY PLAN" class="my-3 hr-text letter-spacing-2" />
            <p class="text-sm text-muted">
              By signing up you agree to Unicamper's
              <a href="#">Terms and Conditions</a> and
              <a href="#">Privacy Policy</a>.
            </p>

            <button
              @click.prevent="onSubmitClick"
              class="btn btn-lg btn-block btn-primary"
              v-if="list_data.length>1"
            >Create</button>
            <button
              @click.prevent
              class="btn btn-lg btn-block btn-primary disabled"
              v-else
            >No Campsites selected</button>
          </form>
        </div>
        <div class="col-lg-6 map-side-lg pr-lg-0 pl-lg-0">
          <div class="map-full shadow-left">
            <GoogleMap :list="list_data" :lat="latitude" :lon="longitude" :zoom="6"></GoogleMap>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer-->
    <Footer></Footer>
  </div>
</template>
<script>
require("../assets/js/theme.js");
require("../assets/vendor/nouislider/nouislider.min.js");
require("../assets/js/price_slider.js");
import CampsitesAPI from "../services/CampsitesAPI";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import GoogleMap from "../components/Map";
import "vue-loading-overlay/dist/vue-loading.css";
import firebase from "firebase";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "Planner",
  components: {
    Navigation,
    Footer,
    Loading,
    GoogleMap,
    VueGoogleAutocomplete
  },
  data() {
    return {
      isLoading: true,
      latitude: parseFloat(localStorage.getItem("lat")),
      longitude: parseFloat(localStorage.getItem("lon")),
      list_data: [],
      planName: "",
      from_date: null,
      to_date: null,
      rally_address: "",
      rally_lat: null,
      rally_lon: null,
      rally_time: "",
      activities: [],
      campsites: [],
      favourites: [],
      dates: null,
      bookingDate: "",
      plannedSites: [],
      settings_allowothers: false,
      settings_createshareable: false
    };
  },
  mounted() {
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
    }
    this.loadCampsites();
    this.$nextTick(function() {
      $(".selectpicker").selectpicker();
      var dateRangeConfig = {
        autoClose: true,
        startDate: new Date(),
        selectForward: true,
        applyBtnClass: "btn btn-primary",
        container: ".datepicker-container",
        inline: true,
        showDateFilter: function(time, date) {
          return (
            '<div style="padding:5px;">\
                            <span style="">' +
            date +
            "</span>\
                        </div>"
          );
        },
        customOpenAnimation: function(cb) {
          $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function(cb) {
          $(this).fadeOut(300, cb);
        }
      };
      $("#form_dates").dateRangePicker(dateRangeConfig);
      $("#form_dates").on("apply.daterangepicker", function(ev, picker) {
        this.bookingDate = $("#daterange").val();
      });
      var snapSlider = document.getElementById("slider-snap");

      $(".btn-items-decrease").on("click", function() {
        var input = $(this).siblings(".input-items");
        if (parseInt(input.val(), 10) >= 1) {
          if (input.hasClass("input-items-greaterthan")) {
            input.val(parseInt(input.val(), 10) - 1 + "+");
          } else {
            input.val(parseInt(input.val(), 10) - 1);
          }
        }
      });

      $(".btn-items-increase").on("click", function() {
        var input = $(this).siblings(".input-items");
        if (input.hasClass("input-items-greaterthan")) {
          input.val(parseInt(input.val(), 10) + 1 + "+");
        } else {
          input.val(parseInt(input.val(), 10) + 1);
        }
      });
    });
  },
  methods: {
    onCancel: function() {},
    printdates: function() {},
    onActivitiesChange(event) {},
    onRallyTimeChange(event) {},
    async loadCampsites() {
      const response = await CampsitesAPI.getCampsites();
      this.campsites = response.data;
      this.getListInfosucc();
      this.isLoading = false;
    },
    getListInfosucc() {
      var selected = [];
      var lat = 35;
      var lon = 140;
      if (this.campsites.length > 0) {
        for (let i in this.campsites) {
          if (this.favourites.includes(this.campsites[i]._id)) {
            selected.push(this.campsites[i]);
            lat = lat + this.campsites[i].lat;
            lon = lon + this.campsites[i].lon;
          }
        }
      }
      this.list_data = selected;
      this.latitude = lat / this.favourites.length;
      this.longitude = lon / this.favourites.length;
      this.$nextTick(function() {
        var mySwiper = new Swiper(".swiper-container", {
          // Optional parameters
          direction: "horizontal",
          loop: false,

          // If we need pagination
          pagination: {
            el: ".swiper-pagination"
          }
        });
        var itemsSlider = new Swiper(".items-slider", {
          slidesPerView: 2,
          spaceBetween: 20,
          loop: false,
          roundLengths: true,
          breakpoints: {
            1200: {
              slidesPerView: 2
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
    },
    addToPlan(item) {
      if (this.plannedSites.includes(item._id)) {
        var index = this.plannedSites.indexOf(item._id);
        if (index !== -1) this.plannedSites.splice(index, 1);
        this.$refs["addToPlan_" + item._id][0].innerText = "Add to plan";
      } else {
        this.plannedSites.push(item._id);
        this.$refs["addToPlan_" + item._id][0].innerText = "Added";
      }
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.rally_address = placeResultData.formatted_address;
      this.rally_lat = addressData.latitude;
      this.rally_lon = addressData.longitude;
    },
    onSubmitClick() {
      this.bookingDate = $("#form_dates").val();
      var db = firebase.firestore();
      var _this = this;
      db.collection("plan")
        .add({
          planName: _this.planName,
          activities: _this.activities,
          plannedSites: _this.plannedSites,
          allowOthersToJoin: _this.settings_allowothers,
          createShareableLink: _this.settings_createshareable,
          creator_email: firebase.auth().currentUser.email,
          creator_displayName: firebase.auth().currentUser.displayName,
          creator_photoURL: firebase.auth().currentUser.photoURL,
          rally_address: _this.rally_address,
          rally_lat: _this.rally_lat,
          rally_lon: _this.rally_lon,
          rally_time: _this.rally_time,
          bookingDate: _this.bookingDate
        })
        .then(function(docRef) {
          _this.$router.push("/planner");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
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
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>