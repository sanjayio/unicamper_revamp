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
      <img src="../../assets/img/photo/drinkingwater1.jpg" alt="Text page" class="bg-image" />
      <div class="container overlay-content">
        <h1 class="hero-heading">Drinking Water</h1>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <div role="alert" class="alert alert-secondary">
              <h4>Drinking Water Helpline</h4>
              <p>In the event of any emergencies,</p>
              <ul>
                <li>Contact Parks Victoria - <b>13 1963</b></li>
                <li>Contact the local camping store</li>
                <li>Contact your doctor for any illnesses or discomfort.</li>
                <li>The Environmental Health Officer at your local council</li>
                <li>Environmental Health Unit, Department of Health - <b>1300 761 874</b></li>
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
            >Camping and hiking can be tiring, and you must drink plenty of water and stay hydrated. Always drink water from reliable sources. Drinking untreated water from a creek, bore or even rain water can lead to illnesses including gastroenteritis.
            Natural water sources should be used with caution and water treatment should be done prior to drinking it.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <img src="../../assets/img/photo/drinkingwater2.jpg" alt class="figure-img img-fluid" />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <h2>Avoid the danger zones</h2>
            <p class="lead mb-5">When selecting natural waters, here are some rules to follow:
            <ul>
              <li>Check how it looks. The appearance of the water is not always a guarantee that it is safe to drink, but water that is clear, free of surface scum or debris, and has no odour is more likely be to free of contaminants than cloudy, smelly water, that has a surface scum.</li>
              <li>Choose water that is free flowing rather than water that is stagnant.</li>
              <li>Avoid collecting water from watercourses that are downstream of camping areas, mining areas, agricultural areas and unsewered towns.</li>
            </ul>
            </p>
            <h2>Treat natural water</h2>
            <p class="lead mb-5">Here are some treatment methods: 
            <ul>
              <li>The most straightforward treatment method is to boil the water before you drink it. Bring the water to a rolling boil, cool it and then use it for drinking.Boiling is effective against most microbial contaminants, but may not make the water safe if it is contaminated with chemicals or heavy metals. If the water tastes metallic or unpleasant do not continue to drink it.  </li>
              <li>If boiling the water is not practical other treatment methods can be used.  These include chlorine  and iodine tablets, handheld UV units, microfilters, and purifiers. These can be purchased from camping and outdoor stores. In all cases follow the manufacturer’s recommended instructions for use.</li>
            </ul>
            </p>
            <h2>Things to remember</h2>
            <p class="lead mb-5">Here are some things to remember before starting the trip:
            <ul>
              <li>Be self sufficient – take enough drinking water with you.</li>
              <li>Take some treatment methods like Iodine and Chlorine tablets with you, and necessary equipments to boil water.</li>
            </ul>
            </p>
            <h2>Additional Resources</h2>
            <p class="lead mb-5">
            <ul>
              <li><a href="https://parkweb.vic.gov.au/safety/be-safe-plan-ahead/drinking-water">Drinking Water Safety by Parks Victoria</a></li>
            </ul>
            </p>
            <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Time to complete: 5 mins</p>
                      <h4 class="mb-0">Drinking Water Quiz</h4>
                    </div>
                    <img src="../../assets/img/badges/water_badge.png" alt="" srcset="" style="height: 100px; -webkit-filter: drop-shadow(5px 5px 5px #a8a8a8); filter: drop-shadow(5px 5px 5px #a8a8a8);">
                  </div>
                </div>
                <div class="card-body">
                  <p>
                      Complete the Drinking Water quiz to level up and get the Drinking Water Expert badge. Completing quizzes help you level up as a user and earn more badges.
                  </p>
                  <router-link
                    :to="{ path: '/quiz', query: { quiz_id: 'aZfltKE13w1cjmh1TIZK' }}"
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
  name: "DrinkingWater",
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