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
      <Navigation></Navigation>
    </header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 py-4 p-xl-5">
          <h2 class="mb-4">Campsites near {{this.address}}</h2>
          <hr class="my-4" />
          <form action="#" autocomplete="off">
            <div class="row">
              <div class="col-xl-12 col-md-6 mb-4">
                <label class="form-label" for="map">Search Location</label>
                <vue-google-autocomplete
                  ref="address"
                  id="map"
                  class="form-control"
                  placeholder="Search another location"
                  v-on:placechanged="getAddressData"
                  types="(regions)"
                  country="au"
                  style="border: 1px solid #ced4da;"
                ></vue-google-autocomplete>
              </div>

              <div class="col-xl-4 col-md-6 mb-4">
                <label class="form-label">Search Radius</label>
                <div class="d-flex align-items-center">
                  <select
                    name="searchradius"
                    id="searchradius"
                    data-style="btn-selectpicker"
                    title
                    class="selectpicker"
                    v-model="search_radius"
                    @change="onSearchRadiusChange($event)"
                  >
                    <option value="50">50 km</option>
                    <option value="100">100 km</option>
                    <option value="500">500 km</option>
                    <option value="10000">All</option>
                  </select>
                </div>
              </div>
              <div class="col-xl-4 col-md-6 mb-4">
                <label class="form-label">Number of Sites</label>
                <div class="d-flex align-items-center">
                  <div class="btn btn-items" @click="sitesDecrease">-</div>
                  <input type="text" class="form-control input-items" v-model="numSites" />
                  <div class="btn btn-items" @click="sitesIncrease">+</div>
                </div>
              </div>

              <div class="col-xl-4 col-md-6 mb-4">
                <label for="form_type" class="form-label">Activities</label>
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
                  <option value="fishing_allowed">Fishing</option>
                  <option value="walking_trails">Walking Trails</option>
                  <option value="4WD_trails">4WD Trails</option>
                  <option value="horse_riding">Horse Riding</option>
                  <option value="canoeing/kayakin">Canoeing</option>
                  <option value="water_slide">Water Slide</option>
                  <option value="swimming_allowed">Swimming</option>
                  <option value="biking">Biking Trails</option>
                  <option value="hiking">Hiking</option>
                  <option value="paddling">Paddling</option>
                </select>
              </div>
              <!--              <div class="col-xl-4 col-md-6 mb-4">-->
              <!--                <label class="form-label">Price range</label>-->
              <!--                <div id="slider-snap" class="text-primary"></div>-->
              <!--                <div class="nouislider-values">-->
              <!--                  <div class="min">-->
              <!--                    From $-->
              <!--                    <span id="slider-snap-value-from"></span>-->
              <!--                  </div>-->
              <!--                  <div class="max">-->
              <!--                    To $-->
              <!--                    <span id="slider-snap-value-to"></span>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <input type="hidden" name="pricefrom" id="slider-snap-input-from" value="0" />-->
              <!--                <input type="hidden" name="priceto" id="slider-snap-input-to" value="100" />-->
              <!--              </div>-->
              <div class="col-md-6 col-lg-12 col-xl-8 mb-4 d-xl-flex">
                <div>
                  <label class="form-label">Popular Filters</label>
                  <ul class="list-inline mb-0 mt-1">
                    <li class="list-inline-item">
                      <div class="custom-control custom-switch">
                        <input
                          id="petFriendly"
                          type="checkbox"
                          class="custom-control-input"
                          value="pets_allowed"
                          v-model="checkPopular"
                        />
                        <label for="petFriendly" class="custom-control-label">
                          <span class="text-sm">Pet Friendly</span>
                        </label>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="custom-control custom-switch">
                        <input
                          id="freeSites"
                          type="checkbox"
                          class="custom-control-input"
                          value="fees_and_booking"
                          v-model="checkPopular"
                        />
                        <label for="freeSites" class="custom-control-label">
                          <span class="text-sm">Free Sites</span>
                        </label>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="custom-control custom-switch">
                        <input
                          id="disabledAccess"
                          type="checkbox"
                          class="custom-control-input"
                          value="disabled_access"
                          v-model="checkPopular"
                        />
                        <label for="disabledAccess" class="custom-control-label">
                          <span class="text-sm">Disabled Access</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-12 pb-4">
                <div id="moreFilters" class="collapse">
                  <div class="filter-block">
                    <h6 class="mb-3">Facilities</h6>
                    <ul class="list-inline mb-0">
                      <!--                      <li class="list-inline-item">-->
                      <!--                        <div class="custom-control custom-checkbox">-->
                      <!--                          <input-->
                      <!--                            type="checkbox"-->
                      <!--                            id="amenities_0"-->
                      <!--                            name="amenities[]"-->
                      <!--                            class="custom-control-input"-->
                      <!--                            value="Public Kitchen"-->
                      <!--                            v-model="checkFacilites"-->
                      <!--                          />-->
                      <!--                          <label for="amenities_0" class="custom-control-label">Public Kitchen</label>-->
                      <!--                        </div>-->
                      <!--                      </li>-->
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_1"
                            name="amenities[]"
                            class="custom-control-input"
                            value="toilets"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_1" class="custom-control-label">Toilets</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_2"
                            name="amenities[]"
                            class="custom-control-input"
                            value="bbq_allowed"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_2" class="custom-control-label">Barbeque</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_3"
                            name="amenities[]"
                            class="custom-control-input"
                            value="water_availability"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_3" class="custom-control-label">Water Availability</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_4"
                            name="amenities[]"
                            class="custom-control-input"
                            value="campfire_allowed"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_4" class="custom-control-label">Campfire Allowed</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_5"
                            name="amenities[]"
                            class="custom-control-input"
                            value="picnic_allowed"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_5" class="custom-control-label">Picnic Allowed</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_6"
                            name="amenities[]"
                            class="custom-control-input"
                            value="showers"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_6" class="custom-control-label">Showers Available</label>
                        </div>
                      </li>
                      <li class="list-inline-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="amenities_8"
                            name="amenities[]"
                            class="custom-control-input"
                            value="phone_reception"
                            v-model="checkFacilites"
                          />
                          <label for="amenities_8" class="custom-control-label">Phone reception</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="filter-block">
                    <h6 class="mb-3">
                      Accomodation
                      <small
                        id="accomodationHelp"
                        class="text-muted form-text"
                      >Please visit the campsite website for booking information.</small>
                    </h6>
                    <div class="row pt-1">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch mb-3">
                          <input
                            id="caravan"
                            type="checkbox"
                            name="caravan"
                            aria-describedby="caravanHelp"
                            class="custom-control-input"
                            value="caravans"
                            v-model="checkAccomodation"
                          />
                          <label for="caravan" class="custom-control-label">
                            <span class="text-sm">Caravan</span>
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch mb-3">
                          <input
                            id="campervan"
                            type="checkbox"
                            name="campervan"
                            aria-describedby="campervanHelp"
                            class="custom-control-input"
                            value="campervans"
                            v-model="checkAccomodation"
                          />
                          <label for="campervan" class="custom-control-label">
                            <span class="text-sm">Campervan</span>
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch mb-3">
                          <input
                            id="cabins"
                            type="checkbox"
                            name="cabins"
                            aria-describedby="cabinsHelp"
                            class="custom-control-input"
                            value="cabins_available"
                            v-model="checkAccomodation"
                          />
                          <label for="cabins" class="custom-control-label">
                            <span class="text-sm">Cabins</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6 mb-4 order-2 order-sm-1">
                <button type="submit" class="btn btn-primary" @click.prevent="refineSearch">
                  <i class="fas fa-search mr-1"></i>Refine Search
                </button>
              </div>

              <div class="col-sm-6 mb-4 text-sm-right order-1 order-sm-2">
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#moreFilters"
                  aria-expanded="false"
                  aria-controls="moreFilters"
                  data-expanded-text="Less filters"
                  data-collapsed-text="More filters"
                  class="btn btn-link btn-collapse pl-0 text-secondary"
                >More filters</button>
              </div>
            </div>
          </form>
          <hr class="my-4" />
          <div class="col-12 d-none d-lg-block">
            <div
              class="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4"
            >
              <div class="mr-3">
                <p class="mb-3 mb-md-0">
                  <strong>{{this.list_data.length}}</strong> results found
                </p>
              </div>
              <div>
                <select
                  name="sort"
                  id="form_sort"
                  data-style="btn-selectpicker"
                  title
                  class="selectpicker"
                  v-model="sort_by"
                  @change="getSort"
                >
                  <option disabled value="0">Sort</option>
                  <option value="1">Distance (Low to High)</option>
                  <option value="2">Distance (High to Low)</option>
                </select>
              </div>
            </div>
            <div class="row">
              <!-- place item-->
              <div
                data-marker-id="59c0c8e33b1527bfe2abaf92"
                class="col-sm-6 mb-5 hover-animate"
                v-for="item in pageOfItems"
                :key="item._id"
              >
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img :src="item.image_urls[0]" alt="No Image Available" class="img-fluid" />
                    <a class="tile-link" @click="detail(item)"></a>
                    <div class="card-img-overlay-bottom text-right">
                      <a
                        v-if="!favourites.includes(item._id)"
                        :ref="'fav_button_' + item._id"
                        class="card-fav-icon position-relative z-index-40"
                        @click="addFavourite(item)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
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
                            <g fill="#ffffff">
                              <path
                                d="M86,162.71469l-2.20375,-1.8275c-4.17906,-3.49375 -9.83625,-7.28312 -16.39375,-11.66375c-25.54469,-17.10594 -60.5225,-40.51406 -60.5225,-80.42344c0,-24.65781 20.06219,-44.72 44.72,-44.72c13.39719,0 25.94781,5.96625 34.4,16.16531c8.45219,-10.19906 21.00281,-16.16531 34.4,-16.16531c24.65781,0 44.72,20.06219 44.72,44.72c0,39.90938 -34.97781,63.3175 -60.5225,80.42344c-6.5575,4.38063 -12.21469,8.17 -16.39375,11.66375z"
                              />
                            </g>
                          </g>
                        </svg>
                      </a>
                      <a
                        v-else
                        :ref="'fav_button_' + item._id"
                        class="card-fav-icon position-relative z-index-40"
                        @click="addFavourite(item)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
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
                                d="M86,162.71469l-2.20375,-1.8275c-4.17906,-3.49375 -9.83625,-7.28312 -16.39375,-11.66375c-25.54469,-17.10594 -60.5225,-40.51406 -60.5225,-80.42344c0,-24.65781 20.06219,-44.72 44.72,-44.72c13.39719,0 25.94781,5.96625 34.4,16.16531c8.45219,-10.19906 21.00281,-16.16531 34.4,-16.16531c24.65781,0 44.72,20.06219 44.72,44.72c0,39.90938 -34.97781,63.3175 -60.5225,80.42344c-6.5575,4.38063 -12.21469,8.17 -16.39375,11.66375z"
                              />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          class="text-decoration-none text-dark"
                          @click="detail(item)"
                        >{{item.name}}</a>
                      </h6>
                      <div class="d-flex card-subtitle mb-3">
                        <p
                          class="flex-grow-1 mb-0 text-muted text-sm"
                        >Number of Sites: {{item.num_sites}}</p>
                        <p v-if="item.fees_and_booking.toUpperCase().includes('$')">
                          <img src="https://img.icons8.com/offices/30/000000/us-dollar.png" /> Paid Site
                        </p>
                      </div>
                      <p class="card-text text-muted">
                        Distance to {{address}}:
                        <span class="h4 text-primary">{{item.distance}}km</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <jw-pagination
              v-if="isRouterAlive"
              :items="computedItems"
              @changePage="onChangePage"
              :labels="customLabels"
              :pageSize="8"
              :maxPages="5"
              :key="paginationRenderKey"
            ></jw-pagination>
          </div>
        </div>
        <div class="col-lg-6 map-side-lg pr-lg-0 pl-lg-0">
          <div class="map-full shadow-left">
            <GoogleMap
              :key="GoogleMapRenderKey"
              :list="list_data"
              :lat="latitude"
              :lon="longitude"
              :zoom="9"
            ></GoogleMap>
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
import GoogleMap from "../components/Map";
import Loading from "vue-loading-overlay";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import "vue-loading-overlay/dist/vue-loading.css";
import JwPagination from "jw-vue-pagination";

const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">"
};

export default {
  name: "Search",
  components: {
    Navigation,
    Footer,
    GoogleMap,
    Loading,
    VueGoogleAutocomplete,
    JwPagination
  },
  data() {
    return {
      longitude: parseFloat(localStorage.getItem("lon")) || -37.814,
      latitude: parseFloat(localStorage.getItem("lat")) || 144.96332,
      address: localStorage.getItem("address") || "Melbourne CBD",
      fullAddress: localStorage.getItem("full_address") || "Melbourne CBD",
      numSites: 0,
      numPoweredSites: 0,
      activities: [],
      priceFrom: 0,
      priceTo: 0,

      isRouterAlive: true,
      checkPopular: [],
      checkFacilites: [],
      checkAccomodation: [],

      sort_by: "0",
      search_radius: parseInt(localStorage.getItem("search_radius")) || 100,
      campsites: [],
      list_data: [],
      result_count: 0,
      favourites: [],
      isLoading: false,
      fullPage: true,
      selectedValue: null,
      GoogleMapRenderKey: 0,
      paginationRenderKey: 0,
      pageOfItems: [],
      customLabels
    };
  },
  mounted() {
    this.$nextTick(function() {
      $(".selectpicker").selectpicker();
      var snapSlider = document.getElementById("slider-snap");
      noUiSlider.create(snapSlider, {
        start: [
          parseInt(localStorage.getItem("price_0"))
            ? parseInt(localStorage.getItem("price_0"))
            : 0,
          parseInt(localStorage.getItem("price_1"))
            ? parseInt(localStorage.getItem("price_1"))
            : 100
        ],
        snap: false,
        connect: true,
        padding: [15, 0],
        step: 1,
        range: {
          min: -15,
          max: 100
        }
      });
      var snapValues = [
        document.getElementById("slider-snap-value-from"),
        document.getElementById("slider-snap-value-to")
      ];
      var inputValues = [
        document.getElementById("slider-snap-input-from"),
        document.getElementById("slider-snap-input-to")
      ];
      snapSlider.noUiSlider.on("update", function(values, handle) {
        snapValues[handle].innerHTML = values[handle];
        inputValues[handle].value = values[handle];
        localStorage.setItem("price_" + handle, values[handle]);
      });
    });
    this.loadCampsites();
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
    }
  },
  methods: {
    GoogleMapRender() {
      this.GoogleMapRenderKey += 1;
      this.paginationRenderKey += 1;
    },
    onActivitiesChange(event) {},
    getSort() {
      if (this.sort_by === "1") {
        this.sortDistanceLowToHigh();
      }
      if (this.sort_by === "2") {
        this.sortDistanceHighToLow();
      }
    },
    onCancel: function() {},
    onSearchRadiusChange() {
      this.getListInfosucc();
      this.GoogleMapRender();
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = placeResultData.formatted_address;
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
      localStorage.setItem("lat", this.latitude);
      localStorage.setItem("lon", this.longitude);
      localStorage.setItem("full_address", this.address);
      localStorage.setItem(
        "address",
        placeResultData.address_components[0].long_name
      );
      this.getListInfosucc();
      this.GoogleMapRender();
    },
    async loadCampsites() {
      this.isLoading = true;
      const response = await CampsitesAPI.getCampsites();
      this.campsites = response.data;
      this.getListInfosucc();
      this.isLoading = false;
    },
    getListInfosucc() {
      this.list_data = [];
      if (this.campsites.length > 0) {
        for (let i in this.campsites) {
          var dis = this.$options.methods.distance(
            this.campsites[i].lat,
            this.campsites[i].lon,
            this.latitude,
            this.longitude
          );
          dis = parseFloat(dis).toFixed(2);
          this.$set(this.campsites[i], "distance", dis);
        }
        for (let j in this.campsites) {
          if (parseFloat(this.campsites[j].distance) <= this.search_radius) {
            this.list_data.push(this.campsites[j]);
          }
        }
        this.result_count = this.list_data.length;
        this.reloadPagination();
      }
    },
    sitesIncrease() {
      this.numSites++;
    },
    sitesDecrease() {
      if (this.numSites <= 0) {
        this.numSites = 0;
      } else {
        this.numSites -= 1;
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
    addFavourite(item) {
      var refId = "fav_button_" + item._id;
      var favButton = this.$refs[refId][0];
      if (localStorage.favourites) {
        this.favourites = JSON.parse(localStorage.getItem("favourites"));
      } else {
        this.favourites = [];
      }
      if (this.favourites.includes(item._id)) {
        var index = this.favourites.indexOf(item._id);
        this.favourites.splice(index, 1);
        favButton.innerHTML =
          "<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 172 172' style=' fill:#000000;'><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,172v-172h172v172z' fill='none'></path><g fill='#ffffff'><path d='M86,162.71469l-2.20375,-1.8275c-4.17906,-3.49375 -9.83625,-7.28312 -16.39375,-11.66375c-25.54469,-17.10594 -60.5225,-40.51406 -60.5225,-80.42344c0,-24.65781 20.06219,-44.72 44.72,-44.72c13.39719,0 25.94781,5.96625 34.4,16.16531c8.45219,-10.19906 21.00281,-16.16531 34.4,-16.16531c24.65781,0 44.72,20.06219 44.72,44.72c0,39.90938 -34.97781,63.3175 -60.5225,80.42344c-6.5575,4.38063 -12.21469,8.17 -16.39375,11.66375z'></path></g></g></svg>";
      } else {
        this.favourites.push(item._id);
        favButton.innerHTML =
          "<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 172 172' style=' fill:#000000;'><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,172v-172h172v172z' fill='none'></path><g fill='#e74c3c'><path d='M86,162.71469l-2.20375,-1.8275c-4.17906,-3.49375 -9.83625,-7.28312 -16.39375,-11.66375c-25.54469,-17.10594 -60.5225,-40.51406 -60.5225,-80.42344c0,-24.65781 20.06219,-44.72 44.72,-44.72c13.39719,0 25.94781,5.96625 34.4,16.16531c8.45219,-10.19906 21.00281,-16.16531 34.4,-16.16531c24.65781,0 44.72,20.06219 44.72,44.72c0,39.90938 -34.97781,63.3175 -60.5225,80.42344c-6.5575,4.38063 -12.21469,8.17 -16.39375,11.66375z'></path></g></g></svg>";
      }
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
    reloadPagination() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    refineSearch() {
      this.getListInfosucc();
      var multifilters = this.activities
        .concat(this.checkPopular)
        .concat(this.checkFacilites)
        .concat(this.checkAccomodation);

      if (multifilters.length > 0 || this.numSites > 0) {
        var temp_list = this.list_data.concat();

        if (multifilters.includes("fees_and_booking")) {
          temp_list = temp_list.filter(
            item => !item["fees_and_booking"].includes("$")
          );
          var index = multifilters.indexOf("fees_and_booking");
          multifilters.splice(index, 1);
        }

        for (var i in multifilters) {
          temp_list = temp_list.filter(item => item[multifilters[i]] === "Y");
        }

        if (this.numSites !== 0) {
          temp_list = temp_list.filter(
            item => this.numSites <= parseInt(item["num_sites"])
          );
        }

        this.list_data = temp_list;
      }
      this.reloadPagination();
    },
    sortDistanceLowToHigh() {
      function compare(a, b) {
        return a.distance - b.distance;
      }

      this.list_data = this.list_data.sort(compare);
      this.reloadPagination();
    },
    sortDistanceHighToLow() {
      function compare(a, b) {
        return b.distance - a.distance;
      }

      this.list_data = this.list_data.sort(compare);
      this.reloadPagination();
    },
    allData() {
      this.list_data = this.campsites.concat();
    },
    detail(item) {
      this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {
          key: "key",
          detail: item,
          campsite: this.campsites
        }
      });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    }
  },
  computed: {
    computedItems() {
      return this.list_data;
    }
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>
