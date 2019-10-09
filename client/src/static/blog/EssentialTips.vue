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
        <h1 class="hero-heading">Essential Tips for First Time Campers</h1>
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
            <h2>Become Familiar With Your Gear.</h2>
            <p class="mb-5">New campers usually wait until they get to the campground before they try out new gear. It's not uncommon to watch campers fumble for hours trying to figure out how to set up a tent. Practice really does make perfect. Set up tents in your backyard before taking them camping. Check the operation of lanterns and camp stoves to make sure they work properly. Try your sleeping bag one night on the living room floor to see how well you sleep in it. Be a smart camper, become familiar with your gear.
            </p>
            <h2>Buy a Tent That Is Big Enough</h2>
            <p class="mb-5">New campers frequently find themselves in a crowded tent. Make space and comfort a priority in your choice of tents (unless you're backpacking). Most tents fit in a car trunk, so size and weight aren't a major concern. For family camping get a tent with a capacity rated two higher than the number of campers that will use it. So for a family of two, get a 4-person tent, for a family of four a 6-person tent, and so on. Be a smart camper, buy a tent that is big enough.
            </p>
            <h2>Make (and Use) a Checklist Camping checklist</h2>
            <p class="mb-5">New campers often overlook a checklist. It's no fun getting to the campground and finding out that you forgot something. Stay organized and make sure nothing is left behind by keeping a camping gear checklist. Use it while packing and check off each item. Update and revise the list as needed. If something breaks or wears out, replace it. If something really doesn't get used, take it off the list. Be a smart camper, use a checklist.
            </p>
            <h2>Arrive at the Campground Early</h2>
            <p class="mb-5">New campers will probably be unfamiliar with campground amenities and rules. You've never been camping, how are you supposed to know? Arrive early enough to give yourself time to learn the campground layout. Make your campground neighbors happy and set up camp during daylight hours. It's much easier when you can see what you're doing. Be a smart camper, arrive at the campground early.
            </p>
            <h2>Plan Your Meals</h2>
            <p class="mb-5">Cooking at the campground is simple and delicious with a few camping food essentials. New campers don't always put enough thought into meal planning. Figure out how many meals you'll be making for how many people, and put together some menu ideas. Then do your grocery shopping a day or two before departure so that the food will be fresh. Avoid buying munchies. Don't be one of those new campers that stops at the quick mart to buy food on the way to the campground. Be a smart camper, plan your meals.
            </p>
            <h2>Observe Campground Rules</h2>
            <p class="mb-5">New campers may not realize that there is no real privacy in a campground. Sound travels so well that you can usually hear campers whispering at the next site. One noisy campsite can keep dozens of campers from a good sleep. Please observe quiet hours. The little privacy you have is limited to your campsite. Respect the space that other campers have chosen, and don't walk through another campsite to get someplace. Be a smart camper, observe campground rules.
            </p>
            <h2>Learn to Reverse Your RV in Advance</h2>
            <p class="mb-5">Don't embarrass yourself by putting on a show for the other campers while trying to back your RV into your campsite. Be a smart camper, learn to back your RV before you get to the campground.
            </p>
            <h2>Bring Sufficient Clothing</h2>
            <p class="mb-5">Camping is all about being prepared. New campers often neglect to bring enough clothes. Remember, there are no laundry facilities at the campground. Weather conditions can also demand different attire. You'll like a rain suit in case it rains, a swimsuit for a dip, and maybe a sweater or jacket for those cool evenings. Be a smart camper, bring sufficient clothing.
            </p>
            <h2>Avoid Severe Weather</h2>
            <p class="mb-5">If you are a glutton for punishment, try putting up a tent in the rain. Camping is about relaxing outdoors, so don't go camping if you know there is going to be foul weather. There is nothing more uncomfortable than sitting in your tent for two days while rain pounds your tent and the wind keeps laying it down on top of you. Right after a storm could be just as bad with rain-soaked campsites and mud. Be a smart camper, avoid severe weather.
            </p>
            <h2>Camp Close to Home</h2>
            <p class="mb-5">Just in case, don't travel far for your first camping trip. You may find out after a night of sleeping on the ground that you are not cut out to be a camper. You may have gear trouble and find yourself without a tent. You may run out of food. The weather may change for the worse. Any number of things could happen to make you want to go home early. Be a smart camper, camp close to home for the first few trips.
            </p>
            <h2>Additional Resources</h2>
            <p class="lead mb-5">
            <ul>
              <li><a href="https://www.travellers-autobarn.com.au/blog/10-must-have-items-for-first-time-campers/">10 Must Have Items for First Time Campers</a></li>
              <li><a href="https://www.big4.com.au/tips-and-inspiration/tips-advice/camping/top-tips-for-first-time-campers">Top tips for first-time campers</a></li>
            </ul>
            </p>
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
  name: "EssentialTips",
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