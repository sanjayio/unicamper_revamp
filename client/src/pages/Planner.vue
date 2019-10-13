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
                    v-if="item.data.createShareableLink"
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
                            <strong>https://unicamper.now.sh/#/plan?plan_id={{item.id}}</strong>
                          </p>
                        </div>
                        <div class="modal-footer justify-content-end">
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
          <div
            data-marker-id="59c0c8e33b1527bfe2abaf92"
            class="col-xl-3 col-md-4 col-sm-6 mb-5"
            v-for="(item, key) in pastPlans"
            :key="key+99"
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
                    v-if="item.data.createShareableLink"
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
                            <strong>https://unicamper.now.sh/#/plan?plan_id={{item.id}}</strong>
                          </p>
                        </div>
                        <div class="modal-footer justify-content-end">
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
        <h2 class="mb-5">Upcoming Community trips</h2>
        <div v-if="upcomingCommunity.length==0">
          <p class="text-muted mb-5">Oops! There are no upcoming community trips.</p>
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
            v-for="(item, key) in upcomingCommunity"
            :key="key+199"
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
                    <p
                      class="flex-grow-1 mb-0 text-muted text-sm"
                    >Created by {{item.data.creator_displayName}}</p>
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
                    v-if="item.data.createShareableLink"
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
                            <strong>https://unicamper.now.sh/#/plan?plan_id={{item.id}}</strong>
                          </p>
                        </div>
                        <div class="modal-footer justify-content-end">
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
      upcomingCommunity: [],
      displayName: firebase.auth().currentUser.displayName,
      user_email: firebase.auth().currentUser.email
    };
  },
  mounted() {
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
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
              var start_date = Date.parse(
                document["data"]["bookingDate"].split(" to ")[0]
              );
              var now = new Date();
              now.setHours(0, 0, 0, 0);
              if (start_date < now) {
                _this.pastPlans.push(document);
              } else {
                _this.upcomingPlans.push(document);
              }
            } else {
              if (document["data"]["allowOthersToJoin"]) {
                var start_date = Date.parse(
                  document["data"]["bookingDate"].split(" to ")[0]
                );
                var now = new Date();
                now.setHours(0, 0, 0, 0);
                if (start_date > now) {
                  _this.upcomingCommunity.push(document);
                }
              }
            }
          });
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