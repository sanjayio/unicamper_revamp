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
      <img src="../../assets/img/photo/camping.jpg" alt="Text page" class="bg-image" />
      <div class="container overlay-content">
        <h1 class="hero-heading">Before you leave，Please read this！</h1>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <p
              class="lead mb-5"
            >If you want to learn how to go camping for the first time there is a lot to know, but don't worry—it's not hard to be a happy camper. We were all beginners once, and expert campers could each could share a funny anecdote about a campground mishap or two. New campers sometimes learn things the hard way, and even experienced campers overlook things from time to time. Remember these common mistakes of new campers, and learn how to become a smart camper with the best advice and tips for your first time camping.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <h2>Choose your campsite wisely</h2>
            <p
              class="mb-5"
            >Check the distance of the campsites before planning your trip. Don’t forget to check the facilities like shower, BBQ, shade options and clean and safe drinking water. This will help you decide how to get the campsite and what to pack.</p>
            <h2>Check your gears’ reliability</h2>
            <p
              class="mb-5"
            >Please make your tent is in a good condition and set it up at home to ensure that you know how to setup and pack it away. Also take some nylon rope and duct tape and check these things before your trip.</p>
            <h2>Read up the potential dangers</h2>
            <p
              class="mb-5"
            >Are there any poisonous plant, animals in that area? Pack your first-aid kit accordingly. Don’t remember to bring first-kit staples with you to deal every emergency caused by cuts and burns. Also remember plenty of repellent with you. You love water tons, but insects love water three thousand. If you don’t want your camping destroyed by these small animals, bring plenty repellent.</p>
            <h2>Check the weather</h2>
            <p
              class="mb-5"
            >It’s best to pack for changing weather conditions, so don’t forget thermals and waterproof rainwear. One of our favorite camping tips is to prepare for the worst weather conditions but expect the best. Also, try to pack smart. One rain jacket will do the job – you don’t need three! If you are facing an extreme weather, don’t hesitate to cancel your trip.</p>
            <h2>Be prepared for the worst</h2>
            <p
              class="mb-5"
            >Camping essentials also include preparing for emergencies. Tell friends and family where you are going and how long you’ll be. Make sure you carry some money and a phone in case you need to contact someone. The emergency phone call in Australia is 000, don’t hesitate to call them if something emergent really happens.</p>
            <h2>Take good lighting</h2>
            <p
              class="mb-5"
            >While it may sound romantic to get about by the moon or fire light, the reality is you don’t want to be cooking, trying to find the toilet or hearing strange noises in pitch dark. The right camp lighting equipment makes a big difference. You can hang a headlamp or torch from your tent ceiling to illuminate the whole tent (also keep one near the entrance so it's easy to find at night).</p>
            <h2>Remember all the small things</h2>
            <p
              class="mb-5"
            >Matches in a waterproof container are a must and don’t forget hand sanitizers, soap and facewipes. If you’re car camping, it’s worth throwing in a mallet for banging in tent pegs and a brush and shovel for sweeping out your tent before pack-up. And, if you’re taking a bottle of wine, don’t forget the corkscrew!</p>
            <h2>Check all the things before you leave</h2>
            <p
              class="mb-5"
            >Please check all the things you need before you leave. It is a wise choice to make a list which display all the things you need to bring with you. Use this list will help you on your preparation.</p>
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
  name: "BeforeYouLeave",
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