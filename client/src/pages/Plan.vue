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
        <div class="col-lg-7 col-xl-5 px-4 pb-4 pl-xl-5 pr-xl-5">
          <section class="mx-n4 mx-xl-n5 mb-4 mb-xl-5">
            <!-- Slider main container-->
            <div class="swiper-container booking-detail-slider">
              <!-- Additional required wrapper-->
              <div class="swiper-wrapper">
                <!-- Slides-->
                <div class="swiper-slide" v-for="(item, key) in banner_images" :key="key">
                  <img :src="item" alt class="yourFluidImage" />
                </div>
              </div>
              <div class="swiper-pagination swiper-pagination-white"></div>
            </div>
          </section>
          <div class="text-block">
            <p class="subtitle">{{this.start_month}} {{this.start_year}}</p>
            <h1 class="hero-heading mb-3">{{this.plan_details.planName}}</h1>
          </div>
          <div class="text-block">
            <h6 class="mb-4">{{this.num_days}} days of camping</h6>
            <div class="row mb-3">
              <div class="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                <div class="date-tile mr-3">
                  <div class="text-uppercase">
                    <span class="text-sm">{{this.start_month.substring(0,3)}}</span>
                    <br />
                    <strong class="text-lg">{{this.start_day}}</strong>
                  </div>
                </div>
                <p class="text-sm mb-0">
                  Start on {{this.start_weekday}}
                  <br />
                  {{this.plan_details.rally_time}}
                </p>
              </div>
              <div class="col-md-6 d-flex align-items-center">
                <div class="date-tile mr-3">
                  <div class="text-uppercase">
                    <span class="text-sm">{{this.end_month.substring(0,3)}}</span>
                    <br />
                    <strong class="text-lg">{{this.end_day}}</strong>
                  </div>
                </div>
                <p class="text-sm mb-0">
                  Ends on {{this.end_weekday}}
                  <br />Time to be discussed
                </p>
              </div>
            </div>
          </div>
          <div class="text-block">
            <div class="row">
              <div class="col-sm">
                <h6>Rallying Point</h6>
                <a
                  :href="googleDirections(this.plan_details.rally_lat, this.plan_details.rally_lon)"
                  class="text-muted"
                >{{this.plan_details.rally_address}}</a>
              </div>
              <div class="col-sm">
                <h6>Rally Time</h6>
                <p class="text-muted">{{this.plan_details.rally_time}}</p>
              </div>
            </div>
          </div>
          <div class="text-block">
            <div class="media align-items-center mb-3">
              <div class="media-body">
                <h6>Plan Organizer</h6>
                <p class="text-muted mb-0">
                  Hosted by
                  <a href="#" class="text-reset">{{this.plan_details.creator_displayName}}</a>
                </p>
              </div>
              <a href="#">
                <img
                  :src="plan_details.creator_photoURL"
                  alt
                  class="avatar avatar-lg avatar-border-white ml-4"
                />
              </a>
            </div>
          </div>
          <div class="text-block">
            <h6 class="mb-3">Plan Itinerary</h6>
            <p class="text-muted mb-0">Brainstorm the itinerary by moving the cards.</p>
            <br />
            <draggable v-model="list_data" group="people" @start="drag=true" @end="drag=false">
              <li class="list-group-item" v-for="(item, key) in list_data" :key="key">
                {{key+1 + ". " + item.name}}
                <a
                  :href="googleDirections(item.lat, item.lon)"
                  class="text-muted mb-0 float-right"
                >Get Driving Directions</a>
              </li>
            </draggable>
            <br />
            <button class="btn btn-lg btn-block btn-primary">Update Itinerary</button>
          </div>
          <br />
          <div class="card border-0 shadow mb-5">
            <div class="card-header bg-gray-100 py-4 border-0">
              <div class="media align-items-center">
                <div class="media-body">
                  <p class="subtitle text-sm text-primary">Calculated</p>
                  <h4 class="mb-0">Plan Summary</h4>
                </div>
                <svg class="svg-icon svg-icon svg-icon-light w-3rem h-3rem ml-3 text-muted">
                  <use xlink:href="#wall-clock-1" />
                </svg>
              </div>
            </div>
            <div class="card-body">
              <table class="table text-sm mb-0">
                <tr>
                  <th class="pl-0 border-0">Total Travel Time</th>
                  <td class="pr-0 text-right border-0">{{this.travel_time}}</td>
                </tr>
                <tr>
                  <th class="pl-0">Total Driving Distance</th>
                  <td class="pr-0 text-right">{{(this.total_distance/1000).toFixed(2)}}km</td>
                </tr>
                <tr>
                  <th class="pl-0">Total Fuel Cost (Assumed Fuel Efficiency: 10L/100km)</th>
                  <td class="pr-0 text-right">${{this.fuel_cost}}</td>
                </tr>
              </table>
            </div>
          </div>
          <hr />
          <div class="text-block">
            <h6 class="mb-4">Things to carry with you</h6>
            <ul class="list-unstyled">
              <li class="mb-2" v-for="(item, key) in things_to_carry" :key="key">
                <div class="media align-items-center mb-3">
                  <div class="icon-rounded icon-rounded-sm bg-secondary-light mr-4">
                    <i class="fa fas text-secondary fa-fw text-center fa fa-check"></i>
                  </div>
                  <div class="media-body">
                    <span class="text-sm">{{item}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="text-block d-print-none">
            <button onclick="window.print()" class="btn btn-link pl-0">
              <i class="fa fa-print mr-2"></i>Print
            </button>
          </div>
        </div>
        <div class="col-lg-5 col-xl-7 map-side-lg px-lg-0">
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
import CampsitesAPI from "../services/CampsitesAPI";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import firebase from "firebase";
import GoogleMap from "../components/Map";
import draggable from "vuedraggable";
import axios from "axios";

export default {
  name: "Planner",
  components: {
    Navigation,
    Footer,
    Loading,
    GoogleMap,
    draggable
  },
  data() {
    return {
      latitude: -35,
      longitude: 140,
      plan_id: "",
      isLoading: true,
      plan_details: {},
      trip_date_header: "",
      start_month: "",
      start_year: "",
      start_day: "",
      start_weekday: "",
      end_month: "",
      end_year: "",
      end_day: "",
      end_weekday: "",
      num_days: 0,
      list_data: [],
      campsites: [],
      banner_images: [],
      myArray: [],
      total_distance: 0,
      travel_time: 0,
      driving_ins: "",
      fuel_cost: 0,
      things_to_carry: []
    };
  },
  watch: {
    list_data: function() {
      this.calculatePlan();
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
      this.plan_id = getVars["plan_id"];
    }
    this.getPlanDetails();
    this.loadCampsites();
    this.isLoading = false;
  },
  methods: {
    onCancel: function() {},
    getPlanDetails: async function() {
      var db = firebase.firestore();
      var _this = this;
      var docRef = db.collection("plan").doc(this.plan_id);
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          _this.plan_details = doc.data();
          _this.formatData();
          _this.createThingsToCarry();
        } else {
        }
      });
    },
    formatData() {
      var bookingDate = this.plan_details.bookingDate;
      var start_date = new Date(bookingDate.split("to")[0].trim());
      var end_date = new Date(bookingDate.split("to")[1].trim());
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      var week = new Array();
      week[0] = "Sunday";
      week[1] = "Monday";
      week[2] = "Tuesday";
      week[3] = "Wednesday";
      week[4] = "Thursday";
      week[5] = "Friday";
      week[6] = "Saturday";
      this.start_month = month[start_date.getMonth()];
      this.start_year = start_date.getFullYear();
      this.start_day = start_date.getUTCDate();
      this.start_weekday = week[start_date.getDay()];
      this.end_month = month[end_date.getMonth()];
      this.end_year = end_date.getFullYear();
      this.end_day = end_date.getUTCDate();
      this.end_weekday = week[end_date.getDay()];

      function datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }

      this.num_days = datediff(
        new Date(bookingDate.split("to")[0].trim()),
        new Date(bookingDate.split("to")[1].trim())
      );
    },
    async loadCampsites() {
      const response = await CampsitesAPI.getCampsites();
      this.campsites = response.data;
      this.getListInfosucc();
      this.calculatePlan();
    },
    getListInfosucc() {
      var selected = [];
      var lat = 35;
      var lon = 140;
      var banner_images = [];
      if (this.campsites.length > 0) {
        for (let i in this.campsites) {
          if (this.plan_details.plannedSites.includes(this.campsites[i]._id)) {
            selected.push(this.campsites[i]);
            lat = lat + this.campsites[i].lat;
            lon = lon + this.campsites[i].lon;
            banner_images.push(this.campsites[i].image_urls);
          }
        }
      }
      banner_images = [].concat.apply([], banner_images);
      this.list_data = selected;
      this.latitude = lat / this.plan_details.plannedSites.length;
      this.longitude = lon / this.plan_details.plannedSites.length;
      this.banner_images = banner_images;
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
      });
    },
    googleDirections(lat, lon) {
      var url =
        "https://www.google.com/maps?saddr=My+Location&daddr=" +
        lat +
        "," +
        lon;
      return url;
    },
    calculatePlan() {
      // get starting point.
      var start_lat = this.plan_details.rally_lat;
      var start_lon = this.plan_details.rally_lon;
      var routing_api_start =
        "https://route.api.here.com/routing/7.2/calculateroute.xml?app_id=DUtRqTBXC40eCfJUyoD3&app_code=ZCowqrUcpTeM1x8gXpKeOg&waypoint0=geo!" +
        start_lat +
        "," +
        start_lon;
      // get way points
      var waypoints = "";
      if (this.list_data.length > 0) {
        for (var i = 0; i < this.list_data.length; i++) {
          waypoints =
            waypoints +
            "&waypoint" +
            (i + 1) +
            "=geo!" +
            this.list_data[i].lat +
            "," +
            this.list_data[i].lon;
        }
      }
      var routing_api_modes = "&mode=fastest;car;traffic:disabled";
      var api_call_string = routing_api_start + waypoints + routing_api_modes;
      axios.get(api_call_string).then(res => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(res.data, "text/xml");
        this.total_distance = xmlDoc.getElementsByTagName(
          "Distance"
        )[0].textContent;
        this.secondsToHms(
          xmlDoc.getElementsByTagName("TravelTime")[0].textContent
        );
        var driving_ins = xmlDoc.getElementsByTagName("Instruction");
        var driving_instructions = "";
        for (var i = 0; i < driving_ins.length; i++) {
          driving_instructions =
            driving_instructions + "<br />" + driving_ins[i].textContent;
        }
        this.driving_ins = driving_instructions;
        this.fuel_cost = ((this.total_distance / 1000 / 10) * 1.4).toFixed(2);
      });
    },
    secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      this.travel_time = hDisplay + " and " + mDisplay;
    },
    createThingsToCarry() {
      var things_to_carry = [];
      // basic necessities
      things_to_carry.push(
        "Bring camping essentials like Tent, sleeping bag, sleeping mat, pillow, head torch, tarp, toiletries, and mosquito net."
      );
      things_to_carry.push(
        "Bring cooking essentials like Esky, Gas burner, Firestarter, cooking pots and pans, cooking and eating utensils, plastic bags for rubbish."
      );
      if (this.plan_details.activities.length > 0) {
        for (var i = 0; i < this.plan_details.activities.length; i++) {
          var carry = "";
          if (this.plan_details.activities[i] == "walking") {
            carry = "Bring walking boots for hiking and trekking.";
          }
          if (this.plan_details.activities[i] == "4wd") {
            carry = "Bring a 4WD vehicle for some offroading adventure.";
          }
          if (this.plan_details.activities[i] == "horse_riding") {
            carry = "Bring horse riding pants, boots, gloves and helmets.";
          }
          if (
            this.plan_details.activities[i] == "canoeing" ||
            this.plan_details.activities[i] == "paddling"
          ) {
            carry =
              "Bring kayaks, life jackets, helmet and necessary clothing.";
          }
          if (
            this.plan_details.activities[i] == "water_slide" ||
            this.plan_details.activities[i] == "swimming"
          ) {
            carry = "Bring swim wear for water slides and sports.";
          }
          if (this.plan_details.activities[i] == "biking") {
            carry =
              "Bring a bike, padded shorts, cycling jersey, air pump and basic tools.";
          }
          if (this.plan_details.activities[i] == "hiking") {
            carry =
              "Bring hiking boots, map, compass, sunglasses, spare warm clothing, headlamp, first aid kit, firestarter or matches.";
          }
          things_to_carry.push(carry);
        }
      }
      this.things_to_carry = things_to_carry;
    }
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
.yourFluidImage {
  width: 100%;
  height: 400px;
}

.swiper-wrapper {
  height: 400px !important;
}

.swiper-slide {
  height: 400px !important;
}
</style>
