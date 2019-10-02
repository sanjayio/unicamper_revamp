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
    <!-- Hero Section-->
    <section class="hero py-6 py-lg-7 text-white dark-overlay">
      <img src="../../assets/img/photo/bushfire1.jpg" alt="Text page" class="bg-image" />
      <div class="container overlay-content">
        <h1 class="hero-heading">Bushfire Safety</h1>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <div role="alert" class="alert alert-secondary">
              <h4>Bushfire Emergency Helpline</h4>
              <p>In the event of any bushfire emergencies,</p>
              <ul>
                <li>Listen to your local emergency broadcaster or ABC Local radio for fire updates. Have a battery powered radio in case fire fails.</li>
                <li>
                  For online information about current fires, go to
                  <a
                    href="http://www.emergency.vic.gov.au"
                  >VicEmergency</a> website.
                </li>
                <li>
                  For specific queries, call the VicEmergency Hotline -
                  <b>1800 226 226</b>
                </li>
              </ul>
            </div>
            <div role="alert" class="alert alert-warning">
              <h4>Data Quality Disclaimer</h4>
              <p>We are trying our best to keep our data up to date, but we are not responsible for any incorrect information. </p>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <p
              class="lead mb-5"
            >Summers vacations at University is the perfect time to explore regional Victoria. However, you must know that Victoria is most fire prone during the summer months, between November and April. If you are hiking, or camping in heavily forested areas covered with thick bush or dry grass, you are at rish of Bush fire.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <img src="../../assets/img/photo/bushfire2.jpg" alt class="figure-img img-fluid" />
            <figcaption class="figure-caption text-center">Photo by Alex Passmore, Melbourne</figcaption>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <h2>Before you travel</h2>
            <p class="lead mb-5">Here are some things to do before arriving at your campsite:
            <ul>
              <li>Check for any current incidents on <a
                    href="http://www.emergency.vic.gov.au"
                  >VicEmergency</a> website by listening to ABC local radio or emergency broadcasters.</li>
              <li>Do NOT expect an official bushfire warning.</li>
              <li>Stay alert for bushfire smokes or flames.</li>
              <li>Check weather forecast.</li>
              <li>Check fire restrictions and <a href="http://www.cfa.vic.gov.au/warnings-restrictions/total-fire-bans-and-ratings/">Total Fire Bans</a></li>
              <li>Be prepared to change your plans on days of Severe, Extreme or Code Red (catastrophic) Fire Danger Ratings</li>
              <li>Check the latest conditions and park closures</li>
              <li>Check woollen blankets and drinking water are in the car</li>
              <li>Inform your local guardians or university that you are going.</li>
              <li>Take a portable AM/FM radio and mobile phone</li>
            </ul>
            </p>
            <h2>On your way</h2>
            <p class="lead mb-5">Here are some things to do on your way:
            <ul>
              <li>Avoid bushfire situations, where possible. If in doubt, U-turn to safety. Fire safety information is available about travelling through, or visiting, areas that may be affected by bushfires.</li>
              <li>If it is a hot, dry, windy day, or it is a <a href="http://www.cfa.vic.gov.au/warnings-restrictions/total-fire-bans-and-ratings/">Total Fire Bans</a>, plan your trip carefully. Avoid high bushfire risk areas at these times, especially if walking.</li>
              <li>If you see a bushfire when driving or bushwalking, turn around and go back, if possible.</li>
              <li>Report a new fire by telephoning Triple Zero (000) to contact the emergency services.</li>
              <li>Exercise caution when driving, due to possible smoke and other hazards such as fire vehicles on roads - even if even some distance away from a fire.</li>
              <li>Always follow the guidelines for campfire safety - don't accidentally start a bushfire.</li>
            </ul>
            </p>
            <h2>After arriving at the campsite</h2>
            <p class="lead mb-5">Here are some things to do after arriving at your campsite:
            <ul>
              <li>Check for any current incidents on <a
                    href="http://www.emergency.vic.gov.au"
                  >VicEmergency</a> website by listening to ABC local radio or emergency broadcasters.</li>
              <li>Do NOT expect an official bushfire warning.</li>
              <li>Do NOT let your actions result in a bushfire - extinguish cigarettes and campfires completely.</li>
            </ul>
            </p>
            <figure class="figure mb-3">
                <img
                  src="../../assets/img/photo/photo-1482463084673-98272196658a.jpg"
                  alt="Example blog post alt."
                  class="figure-img img-fluid"
                />
                <figcaption class="figure-caption text-center">Photo by Jack Tran, New York</figcaption>
            </figure>
            <h2>If there is a bushfire</h2>
            <p class="lead mb-5">
                <b>Protect yourself from heat and flames</b>
            <ul>
              <li>Stay calm - do not panic</li>
              <li>If your are unsure if it is a bushfire, call the VicEmergency Hotline – <b>1800 226 226</b></li>
              <li>Listen to ABC Local Radio or other emergency broadcasters  for updates</li>
              <li>Report new fires by calling <b>000</b></li>
              <li>Late evacuation can be deadly</li>
            </ul>
            </p>
            <h2>If you get caught in a fire</h2>
            <p class="lead mb-5">
                <b>In the car</b>
            <ul>
              <li>If you can, U-turn to safety and leave the area</li>
              <li>Do not get out and run - stay in the vehicle</li>
              <li>Park in a large clear area, away from trees and long grass</li>
              <li>Turn on headlights and hazards lights</li>
              <li>Close windows and vents. Get below window level</li>
              <li>Cover exposed skin with a dry woollen blanket</li>
              <li>Wear dry, natural fibre clothing</li>
              <li>When the fire has passed, get out of the car</li>
            </ul>
            </p>
            <p class="lead mb-5">
                <b>Outdoors</b>
            <ul>
              <li>See refuge behind a rocky outcrop or high wall, in cave, gully or large animal burrow, in a large clear area away from trees and grass or in large dam or lake</li>
              <li>Avoid slopes and hill tops - avoid being above a fire</li>
              <li>Do not seek refuge in above ground tanks or above ground pools</li>
              <li>Cover exposed skin with dry natural fibre clothing</li>
            </ul>
            </p>
            <h2>Additional Resources</h2>
            <p class="lead mb-5">
            <ul>
              <li><a href="https://www.cfa.vic.gov.au/warnings-restrictions/total-fire-bans-and-ratings/">Total Fire Bans and ratings</a></li>
              <li><a href="https://www.ffm.vic.gov.au/permits-and-regulations/fire-restrictions-and-regulations">Fire restrictions and regulations from Forest Fire Management Victoria</a></li>
              <li><a href="https://parkweb.vic.gov.au/__data/assets/pdf_file/0008/522197/Hiking-and-camping-in-parks-and-forests-FINAL-web.pdf">Hiking and camping in parks and forests (PDF)</a></li>
            </ul>
            </p>
            <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Time to complete: 5 mins</p>
                      <h4 class="mb-0">Bushfire Safety Quiz</h4>
                    </div>
                    <img src="../../assets/img/badges/bushfire.png" alt="" srcset="" style="height: 100px; -webkit-filter: drop-shadow(5px 5px 5px #a8a8a8); filter: drop-shadow(5px 5px 5px #a8a8a8);">
                  </div>
                </div>
                <div class="card-body">
                  <p>
                      Complete the Bushfire safety quiz to level up and get the Bushfire Expert badge. Completing quizzes help you level up as a user and earn more badges.
                  </p>
                  <router-link
                    :to="{ path: '/quiz', query: { quiz_id: '37bZHsBpelOVWsP8p5Gf' }}"
                    class="btn btn-primary"
                  >Take the quiz</router-link>
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
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Bushfire",
  components: {
    Navigation,
    Footer,
    Loading
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    onCancel() {}
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>