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
      <img src="../../assets/img/photo/quiz.jpg" alt="Text page" class="bg-image" />
      <div class="container overlay-content">
        <h1 class="hero-heading">{{this.quiz_title}}</h1>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 mx-auto">
            <div class="card border-0 shadow mb-5">
              <div class="card-header bg-gray-100 py-4 border-0">
                <div class="media align-items-center">
                  <div class="media-body">
                    <p class="subtitle text-sm text-primary">Time to complete: 5 mins</p>
                    <p class="subtitle text-sm text-secondary">XP Gain: +{{this.quiz_points}}</p>
                    <h4 class="mb-0">{{this.quiz_title}}</h4>
                  </div>
                  <img
                    src="../../assets/img/badges/bushfire.png"
                    alt
                    srcset
                    style="height: 100px; -webkit-filter: drop-shadow(5px 5px 5px #a8a8a8); filter: drop-shadow(5px 5px 5px #a8a8a8);"
                  />
                </div>
              </div>
              <div class="card-body">
                <p>{{this.score_text}}</p>
                <button
                  :ref="'startquizbutton'"
                  class="btn btn-primary"
                  @click.prevent="start_quiz()"
                >Start the quiz</button>
              </div>
            </div>
            <div
              class="card border-0 shadow mb-5"
              v-for="(item, key) in questions"
              :key="key"
              v-if="quiz_started==true"
            >
              <div class="card-header bg-gray-100 py-4 border-0" :ref="'question_card_' + key">
                <div class="media align-items-center">
                  <div class="media-body">
                    <h4 class="mb-0">{{item[0]}}</h4>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-check" v-if="item[2]">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="key"
                    :id="key"
                    :ref="'option_' + key"
                    value="1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">{{item[2]}}</label>
                </div>
                <div class="form-check" v-if="item[3]">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="key"
                    :id="key"
                    :ref="'option_' + key"
                    value="2"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">{{item[3]}}</label>
                </div>
                <div class="form-check" v-if="item[4]">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="key"
                    :id="key"
                    :ref="'option_' + key"
                    value="3"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">{{item[4]}}</label>
                </div>
                <div class="form-check" v-if="item[5]">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="key"
                    :id="key"
                    :ref="'option_' + key"
                    value="4"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">{{item[5]}}</label>
                </div>
                <br />
                <button
                  class="btn btn-primary"
                  :ref="'button_' + key"
                  @click.prevent="saveAnswer(key)"
                >Save Answer</button>
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
import firebase from "firebase";

export default {
  name: "Quiz",
  components: {
    Navigation,
    Footer,
    Loading
  },
  data() {
    return {
      isLoading: true,
      quiz_id: "",
      plan_details: null,
      quiz_title: "Quiz",
      quiz_description: "Quiz Description",
      quiz_points: 0,
      question_counter: 0,
      question_count: 0,
      questions: {},
      quiz_started: false,
      answers: {},
      score: 0,
      badge_awarded: "",
      score_text:
        "Complete the Bushfire safety quiz to level up, gain 500XP and get the Bushfire Expert badge. Completing quizzes help you level up as a user and earn more badges."
    };
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
      //console.log(getVars);
      this.quiz_id = getVars["quiz_id"];
    }
    this.isLoading = false;
    this.getQuiz();
  },
  methods: {
    onCancel() {},
    getQuiz: async function() {
      var db = firebase.firestore();
      var _this = this;
      var docRef = db.collection("quiz").doc(this.quiz_id);
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          _this.plan_details = doc.data();
          _this.quiz_title = _this.plan_details.quiz_title;
          _this.quiz_description = _this.plan_details.quiz_description;
          _this.quiz_points = _this.plan_details.quiz_points;
          _this.question_count = Object.keys(
            _this.plan_details.questions
          ).length;
          _this.questions = _this.plan_details.questions;
        } else {
          console.log("doc doesnt exist");
        }
      });
    },
    start_quiz() {
      if (this.quiz_started) {
        if (this.score == this.plan_details.quiz_points) {
          this.badge_awarded = this.quiz_id;
        }
        this.$refs["question_card_q1"][0].nextElementSibling.hidden = true;
        this.$refs["question_card_q2"][0].nextElementSibling.hidden = true;
        this.$refs["question_card_q3"][0].nextElementSibling.hidden = true;
        this.$refs["question_card_q4"][0].nextElementSibling.hidden = true;
        this.$refs["question_card_q5"][0].nextElementSibling.hidden = true;
        this.score_text =
          "You gained " +
          this.score +
          " XP!. Check your profile for any badges earned.";
        this.$refs["startquizbutton"].hidden = true;
        var currUser = firebase.auth().currentUser;
        var db = firebase.firestore();
        var _this = this;
        // Add a new document in collection "user"
        db.collection("user")
          .doc(currUser.uid)
          .set(
            {
              xp: firebase.firestore.FieldValue.arrayUnion(_this.score)
            },
            { merge: true }
          )
          .then(function() {
            console.log("xp successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        if (_this.badge_awarded != "") {
          db.collection("user")
            .doc(currUser.uid)
            .set(
              {
                badges: firebase.firestore.FieldValue.arrayUnion(
                  _this.badge_awarded
                )
              },
              { merge: true }
            )
            .then(function() {
              console.log("badge successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      } else {
        this.quiz_started = true;
        this.$refs["startquizbutton"].innerText = "SUBMIT ANSWERS";
      }
      console.log(this.questions);
    },
    saveAnswer(key) {
      var option = this.$refs["option_" + key];
      var counter = 1;
      var selected_option = -1;
      for (var i = 0; i < option.length; i++) {
        if (option[i].checked) {
          selected_option = counter;
        }
        counter++;
      }
      this.answers[key] = selected_option;
      if (this.questions[key][1] == selected_option) {
        this.score = this.score + 100;
      }
      this.$refs["question_card_" + key][0].nextElementSibling.hidden = true;
      this.$refs["button_" + key][0]["className"] = "btn btn-primary disabled";
      console.log(this.answers);
    }
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>