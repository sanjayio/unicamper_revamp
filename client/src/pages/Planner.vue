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
    <section class="py-5">
      <div class="container">
        <h1 class="h2 mb-5">
          Your upcoming trips
          <span class="float-right">
            <router-link
              href
              class="btn btn-primary"
              to="/createPlan"
              v-if="favourites.length>0"
            >Create a new Plan</router-link>
            <router-link href class="btn btn-primary disabled" to="/search" v-else>Favourites empty</router-link>
          </span>
        </h1>

        <div v-if="upcomingPlans.length==0">
          <p
            class="text-muted mb-5"
          >You have no upcoming trips. Start by creating a new plan for your next trip.</p>
          <p class="mb-6">
            <img
              src="../assets/img/illustration/undraw_trip_dv9f.svg"
              alt
              style="width: 400px;"
              class="img-fluid"
            />
          </p>
        </div>
        <div class="row" v-else>
          <!-- place item-->
          <div
            data-marker-id="59c0c8e33b1527bfe2abaf92"
            class="col-xl-3 col-md-4 col-sm-6 mb-5"
            v-for="(item, key) in upcomingPlans"
            :key="key"
          >
            <div class="card h-100 border-0 shadow">
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <p class="subtitle font-weight-normal text-sm mb-2">{{item.data.bookingDate}}</p>
                  <h6 class="card-title">
                    <a
                      href="user-booking-detail.html"
                      class="text-decoration-none text-dark"
                    >{{item.data.planName}}</a>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">Created by {{displayName}}</p>
                  </div>
                  <router-link
                    :to="{ path: 'plan', query: { plan_id: item.id }}"
                    class="btn btn-primary"
                  >View</router-link>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#shareModal"
                    class="btn btn-secondary"
                  >Share</button>
                  <!-- Modal-->
                  <div
                    id="shareModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    class="modal fade"
                  >
                    <div role="document" class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-body">
                          <button
                            type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                            class="close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                          <h2 id="exampleModalLabel" class="modal-title mb-3">Share your Plan</h2>
                          <p class="text-muted">
                            Shareable Link:
                            <strong>www.client.sanjay94.now.sh/#/plan?plan_id={{item.id}}</strong>
                          </p>
                        </div>
                        <div class="modal-footer justify-content-end">
                          <button type="button" class="btn btn-primary">Save changes</button>
                          <button
                            type="button"
                            data-dismiss="modal"
                            class="btn btn-outline-muted"
                          >Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 class="mb-5">Your past trips</h2>
        <div v-if="pastPlans.length==0">
          <p
            class="text-muted mb-5"
          >You have no past trips. Start by creating a new plan for your next trip.</p>
          <p class="mb-6">
            <img
              src="../assets/img/illustration/undraw_trip_dv9f.svg"
              alt
              style="width: 400px;"
              class="img-fluid"
            />
          </p>
        </div>
        <div class="row" v-else>
          <!-- place item-->
          <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="col-xl-3 col-md-4 col-sm-6 mb-5">
            <div class="card h-100 border-0 shadow">
              <div class="card-img-top overflow-hidden">
                <a href="user-booking-detail.html">
                  <img
                    src="img/photo/photo-1484154218962-a197022b5858.jpg"
                    alt="Modern, Well-Appointed Room"
                    class="img-fluid"
                  />
                </a>
              </div>
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <p class="subtitle font-weight-normal text-sm mb-2">March 2019</p>
                  <h6 class="card-title">
                    <a
                      href="user-booking-detail.html"
                      class="text-decoration-none text-dark"
                    >Modern, Well-Appointed Room</a>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">Private room</p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-right">
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- place item-->
          <div data-marker-id="59c0c8e322f3375db4d89128" class="col-xl-3 col-md-4 col-sm-6 mb-5">
            <div class="card h-100 border-0 shadow">
              <div class="card-img-top overflow-hidden">
                <a href="user-booking-detail.html">
                  <img
                    src="img/photo/photo-1426122402199-be02db90eb90.jpg"
                    alt="Cute Quirky Garden apt, NYC adjacent"
                    class="img-fluid"
                  />
                </a>
              </div>
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <p class="subtitle font-weight-normal text-sm mb-2">March 2019</p>
                  <h6 class="card-title">
                    <a
                      href="user-booking-detail.html"
                      class="text-decoration-none text-dark"
                    >Cute Quirky Garden apt, NYC adjacent</a>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">Entire apartment</p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-right">
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-gray-300"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- place item-->
          <div data-marker-id="59c0c8e3a31e62979bf147c9" class="col-xl-3 col-md-4 col-sm-6 mb-5">
            <div class="card h-100 border-0 shadow">
              <div class="card-img-top overflow-hidden">
                <a href="user-booking-detail.html">
                  <img
                    src="img/photo/photo-1512917774080-9991f1c4c750.jpg"
                    alt="Modern Apt - Vibrant Neighborhood!"
                    class="img-fluid"
                  />
                </a>
              </div>
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <p class="subtitle font-weight-normal text-sm mb-2">March 2019</p>
                  <h6 class="card-title">
                    <a
                      href="user-booking-detail.html"
                      class="text-decoration-none text-dark"
                    >Modern Apt - Vibrant Neighborhood!</a>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">Entire apartment</p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-right">
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-gray-300"></i>
                      <i class="fa fa-star text-gray-300"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- place item-->
          <div data-marker-id="59c0c8e3503eb77d487e8082" class="col-xl-3 col-md-4 col-sm-6 mb-5">
            <div class="card h-100 border-0 shadow">
              <div class="card-img-top overflow-hidden">
                <a href="user-booking-detail.html">
                  <img
                    src="img/photo/photo-1494526585095-c41746248156.jpg"
                    alt="Sunny Private Studio-Apartment"
                    class="img-fluid"
                  />
                </a>
              </div>
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <p class="subtitle font-weight-normal text-sm mb-2">March 2019</p>
                  <h6 class="card-title">
                    <a
                      href="user-booking-detail.html"
                      class="text-decoration-none text-dark"
                    >Sunny Private Studio-Apartment</a>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                    <p class="flex-grow-1 mb-0 text-muted text-sm">Shared room</p>
                    <p class="flex-shrink-1 mb-0 card-stars text-xs text-right">
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-warning"></i>
                      <i class="fa fa-star text-gray-300"></i>
                    </p>
                  </div>
                </div>
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

<script>
import CampsitesAPI from "../services/CampsitesAPI";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import firebase from "firebase";

export default {
  name: "Planner",
  components: {
    Navigation,
    Footer,
    Loading
  },
  data() {
    return {
      isLoading: true,
      favourites: [],
      upcomingPlans: [],
      pastPlans: [],
      displayName: firebase.auth().currentUser.displayName,
      user_email: firebase.auth().currentUser.email
    };
  },
  mounted() {
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      //console.log(this.favourites);
    }
    this.getPlans();
    this.isLoading = false;
  },
  methods: {
    onCancel: function() {},
    getPlans: function() {
      var db = firebase.firestore();
      var _this = this;
      db.collection("plan")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var document = {};
            document["id"] = doc.id;
            document["data"] = doc.data();
            if (document["data"]["creator_email"] == _this.user_email) {
              _this.upcomingPlans.push(document);
            }
          });
        });
      console.log(this.upcomingPlans);
    }
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>