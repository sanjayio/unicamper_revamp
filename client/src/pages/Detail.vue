<template>
  <div>
    <Navigation></Navigation>
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
    <!-- Hero Section-->
    <section :style="header_image" class="pt-7 pb-5 d-flex align-items-end dark-overlay bg-cover">
      <div class="container overlay-content">
        <div
          class="d-flex justify-content-between align-items-start flex-column flex-lg-row align-items-lg-end"
        >
          <div class="text-white mb-4 mb-lg-0">
            <div class="badge badge-pill badge-transparent px-3 py-2 mb-4">CAMPSITE</div>
            <h1 class="text-shadow verified">{{this.campsite_name}}</h1>
            <p>
              <i class="fa-map-marker-alt fas mr-2"></i>
              {{this.campsite_address}}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- About Listing-->
            <div class="text-block">
              <h3 class="mb-3">About</h3>
              <p class="text-muted">{{this.description}}</p>
            </div>
            <div class="text-block">
              <h3 class="mb-3">Access</h3>
              <p class="text-muted">{{this.access_description}}</p>
            </div>
            <div class="text-block">
              <!-- Listing Location-->
              <h3 class="mb-3">Location</h3>
              <DetailMap
                :key="GoogleMapRenderKey"
                :ff_list="nearby_ff"
                :pv_list="nearby_pv"
                :lat="lat"
                :lon="lon"
                :zoom="12"
              ></DetailMap>
            </div>
            <div class="text-block">
              <!-- Gallery-->
              <h3 class="mb-4">Gallery</h3>
              <div class="row gallery ml-n1 mr-n1">
                <div class="col-lg-4 col-6 px-1 mb-2" v-for="(item, key) in image_urls" :key="key">
                  <a :href="item">
                    <img :src="item" alt="..." class="img-fluid" />
                  </a>
                </div>
              </div>
            </div>
            <!-- Amenities-->
            <div class="text-block">
              <h3 class="mb-4">Facilities</h3>
              <ul class="amenities-list list-inline">
                <li
                  class="list-inline-item mb-3"
                  v-for="(item, key) in routerParams"
                  :key="key"
                  v-if="routerParams[key] == 'Y'"
                >
                  <div class="d-flex align-items-center">
                    <div class="icon-circle bg-secondary mr-2">
                      <i class="fa fa-check"></i>
                    </div>
                    <span style="text-transform:capitalize;">{{key.replace('_', ' ')}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="text-block">
              <h3 class="mb-4">Points of Interest</h3>
              <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Nearby</p>
                      <h4 class="mb-0">Food and Fuel</h4>
                    </div>
                    <svg class="svg-icon svg-icon svg-icon-light w-3rem h-3rem ml-3 text-muted">
                      <use xlink:href="#wall-clock-1" />
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <div v-if="nearby_ff.length==0">
                    <img
                      src="../assets/img/loading.png"
                      alt
                      srcset
                      style="max-height:100%; max-width:100%;"
                    />
                    <h4 class="mb-0 text-muted text-center">Hmm, we are working on it . . .</h4>
                  </div>
                  <div v-else>
                    <table class="table text-sm mb-0">
                      <tr v-for="(item, key) in nearby_ff" :key="key">
                        <th class="pl-0" v-if="key!=0">{{item.title}}</th>
                        <th class="pl-0 border-0" v-else>{{item.title}}</th>
                        <td class="pr-0 text-center" v-if="key!=0">{{item.category}}</td>
                        <td class="pr-0 text-center border-0" v-else>{{item.category}}</td>
                        <td
                          class="pr-0 text-right"
                          v-if="key!=0"
                        >{{(item.distance/1000).toFixed(2)}}km</td>
                        <td
                          class="pr-0 text-right border-0"
                          v-else
                        >{{(item.distance/1000).toFixed(2)}}km</td>
                        <td class="pr-0 text-center" v-if="key!=0">
                          <a :href="googleDirections(item.lat, item.lon)">Directions</a>
                        </td>
                        <td class="pr-0 text-center border-0" v-else>
                          <a :href="googleDirections(item.lat, item.lon)">Directions</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Nearby</p>
                      <h4 class="mb-0">Places to See</h4>
                    </div>
                    <svg class="svg-icon svg-icon svg-icon-light w-3rem h-3rem ml-3 text-muted">
                      <use xlink:href="#wall-clock-1" />
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <div v-if="nearby_pv.length==0">
                    <img
                      src="../assets/img/loading.png"
                      alt
                      srcset
                      style="max-height:100%; max-width:100%;"
                    />
                    <h4 class="mb-0 text-muted text-center">Hmm, we are working on it . . .</h4>
                  </div>
                  <div v-else>
                    <table class="table text-sm mb-0">
                      <tr v-for="(item, key) in nearby_pv" :key="key">
                        <th class="pl-0" v-if="key!=0">{{item.title}}</th>
                        <th class="pl-0 border-0" v-else>{{item.title}}</th>
                        <td class="pr-0 text-center" v-if="key!=0">{{item.category}}</td>
                        <td class="pr-0 text-center border-0" v-else>{{item.category}}</td>
                        <td
                          class="pr-0 text-right"
                          v-if="key!=0"
                        >{{(item.distance/1000).toFixed(2)}}km</td>
                        <td
                          class="pr-0 text-right border-0"
                          v-else
                        >{{(item.distance/1000).toFixed(2)}}km</td>
                        <td class="pr-0 text-center" v-if="key!=0">
                          <a :href="googleDirections(item.lat, item.lon)">Directions</a>
                        </td>
                        <td class="pr-0 text-center border-0" v-else>
                          <a :href="googleDirections(item.lat, item.lon)">Directions</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-block">
              <h3 class="mb-4">Australian Wildlife</h3>
              <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Nearby</p>
                      <h4 class="mb-0">Flora and Fauna</h4>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="form_name" class="form-label">Search by name</label>
                      <input
                        name="name"
                        id="form_name"
                        class="form-control"
                        v-model="animalSearchName"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="form_name" class="form-label">Search radius</label>
                      <select
                        name="activities"
                        id="activities"
                        v-model="animalSearchRadius"
                        data-style="btn-selectpicker"
                        title
                        class="selectpicker form-control"
                      >
                        <option value="10">10 km</option>
                        <option value="50">50 km</option>
                        <option value="100">100 km</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <a
                      href="#"
                      class="btn btn-primary px-3"
                      @click.prevent="getAnimalsNearby"
                    >Search</a>
                  </div>
                  <div class="mr-3">
                    <p class="mb-3 mb-md-0">
                      <strong>{{this.animals_nearby.length}}</strong> results found
                    </p>
                  </div>
                  <br />
                  <div class="row">
                    <div
                      data-marker-id="59c0c8e33b1527bfe2abaf92"
                      class="col-sm-6 mb-5 hover-animate"
                      v-for="(item,key) in animals_nearby"
                      :key="key"
                    >
                      <div class="card border-0 shadow">
                        <div class="card-body d-flex align-items-center">
                          <div class="w-100">
                            <h6 class="card-title">
                              <a
                                class="text-dark"
                                :href="googleDirections(item.decimalLatitude, item.decimalLongitude)"
                              >{{item.vernacularName}} spotted in {{item.lga}}</a>
                            </h6>
                            <div class="d-flex card-subtitle mb-3">
                              <p
                                class="flex-grow-1 mb-0 text-muted text-sm"
                              >Last Seen: {{item.month ? item.month : 'NA'}},{{item.year ? item.year : 'NA'}}</p>
                            </div>
                            <p class="flex-grow-1 mb-0 text-muted text-sm">Click for Directions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-block">
              <p class="subtitle text-sm text-primary">Reviews</p>
              <h5 class="mb-4">{{this.campsite_name}} Reviews</h5>
              <div class="card border-0 shadow mb-5">
                <div class="card-body py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p
                        class="subtitle text-sm text-primary"
                        v-if="reviews.length > 0"
                      >{{this.reviews.length}} Review(s)</p>
                      <h5
                        class="subtitle text-lg text-dark"
                        v-if="reviews.length > 0"
                      >Overall Rating</h5>
                      <div class="mb-2" v-if="reviews.length > 0">
                        <i
                          class="fa fa-xl fa-star text-warning"
                          v-for="n in overall_rating"
                          :key="n"
                        ></i>
                        <small>({{this.overall_rating}}/5)</small>
                      </div>
                      <h5 class="subtitle text-sm text-primary" v-else>No reviews yet</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="media d-block d-sm-flex review"
                v-for="(item, key) in reviews"
                :key="key"
                v-if="reviews.length > 0"
              >
                <div class="text-md-center mr-4 mr-xl-5">
                  <img
                    :src="item.data.review_photoURL"
                    alt
                    class="d-block avatar avatar-xl p-2 mb-2"
                  />
                  <span class="text-uppercase text-muted text-sm">{{item.data.review_dt}}</span>
                </div>
                <div class="media-body align-self-center">
                  <h6 class="mt-2 mb-1">{{item.data.review_displayName}}</h6>
                  <div class="mb-2">
                    <i
                      class="fa fa-xs fa-star text-warning"
                      v-for="n in parseInt(item.data.review_rating)"
                      :key="n"
                    ></i>
                  </div>
                  <ul class="list-inline">
                    <li
                      class="list-inline-item mb-2"
                      v-for="(like_item, like_key) in item.data.review_likes"
                      :key="like_key"
                    >
                      <span
                        class="badge badge-pill badge-primary p-3 font-weight-normal"
                        style="text-transform:capitalize;"
                      >{{like_item.replace('_', ' ')}}</span>
                    </li>
                    <li
                      class="list-inline-item mb-2"
                      v-for="(dislike_item, dislike_key) in item.data.review_dislikes"
                      :key="dislike_key"
                    >
                      <span
                        class="badge badge-pill badge-light p-3 text-muted font-weight-normal"
                        style="text-transform:capitalize;"
                      >{{dislike_item.replace('_', ' ')}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="py-5">
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#leaveReview"
                  aria-expanded="false"
                  aria-controls="leaveReview"
                  class="btn btn-outline-primary"
                  v-if="currentUser"
                >Leave a review</button>
                <router-link
                  class="btn btn-outline-primary"
                  to="/login"
                  v-else
                >Login to leave a review</router-link>
                <div id="leaveReview" class="collapse mt-4">
                  <h5 class="mb-4">Leave a review</h5>
                  <form>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="youliked" class="form-label">You liked</label>
                          <select
                            name="youliked"
                            id="youliked"
                            :ref="youliked"
                            v-model="youliked"
                            multiple
                            data-style="btn-selectpicker"
                            data-live-search="true"
                            data-selected-text-format="count &gt; 1"
                            title
                            @change="onYouLikedChange($event)"
                            class="selectpicker form-control"
                          >
                            <option value="getting_there">Getting there</option>
                            <option value="location">Location</option>
                            <option value="facilities">Facilities</option>
                            <option value="activities">Activities</option>
                            <option value="nature">Nature</option>
                            <option value="cleanliness">Cleanliness</option>
                            <option value="people">People</option>
                            <option value="weather">Weather</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="youdliked" class="form-label">You disliked</label>
                          <select
                            name="youdliked"
                            id="youdliked"
                            :ref="youdliked"
                            v-model="youdliked"
                            multiple
                            data-style="btn-selectpicker"
                            data-live-search="true"
                            data-selected-text-format="count &gt; 1"
                            title
                            @change="onYouDLikedChange($event)"
                            class="selectpicker form-control"
                          >
                            <option value="getting_there">Getting there</option>
                            <option value="location">Location</option>
                            <option value="facilities">Facilities</option>
                            <option value="activities">Activities</option>
                            <option value="nature">Nature</option>
                            <option value="cleanliness">Cleanliness</option>
                            <option value="people">People</option>
                            <option value="weather">Weather</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="rating" class="form-label">Your rating</label>
                          <select
                            name="rating"
                            id="rating"
                            :ref="rating"
                            v-model="rating"
                            data-style="btn-selectpicker"
                            title
                            @change="onRatingChange($event)"
                            class="selectpicker form-control"
                          >
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                            <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                            <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                            <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-primary" @click.prevent="onReviewClick">Post review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div style="top: 150px;" class="pl-xl-4 sticky-top">
              <div>
                <a
                  v-if="favourites.includes(campsite_id)"
                  href="#"
                  :ref="'favourites_btn'"
                  class="btn btn-primary"
                  style="width: 100%; margin-bottom: 20px;"
                  @click.prevent="addFavourite"
                >
                  <i class="fa fa-heart mr-3"></i>Remove from Favourites
                </a>
                <a
                  v-else
                  href="#"
                  :ref="'favourites_btn'"
                  class="btn btn-primary"
                  style="width: 100%; margin-bottom: 20px;"
                  @click.prevent="addFavourite"
                >
                  <i class="fa fa-heart mr-3"></i>Add to Favourites
                </a>
              </div>
              <!-- Opening Hours      -->
              <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Weather</p>
                      <h4 class="mb-0">Forecast</h4>
                    </div>
                    <svg class="svg-icon svg-icon svg-icon-light w-3rem h-3rem ml-3 text-muted">
                      <use xlink:href="#wall-clock-1" />
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <table class="table text-sm mb-0">
                    <tr v-for="(item, key) in weather_forecast" :key="key">
                      <th class="pl-0" v-if="key!=0">
                        {{item.dayOfWeek}}
                        <p class="text-muted" style="text-transform:capitalize;">{{item.weather}}</p>
                      </th>
                      <th class="pl-0 border-0" v-else>
                        {{item.dayOfWeek}}
                        <p class="text-muted" style="text-transform:capitalize;">{{item.weather}}</p>
                      </th>
                      <td class="pr-0 text-right" v-if="key!=0">
                        <img :src="item.icon" alt srcset style="width: 50px; height: 50px;" />
                      </td>
                      <td class="pr-0 text-right border-0" v-else>
                        <img :src="item.icon" alt srcset style="width: 50px; height: 50px;" />
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="card-footer bg-primary-light py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <h6 class="text-primary">Our Recommendation</h6>
                      <p class="text-sm text-primary opacity-8 mb-0">{{this.weather_recommendation}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Contact-->
              <div class="card border-0 shadow mb-5">
                <div class="card-header bg-gray-100 py-4 border-0">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <p class="subtitle text-sm text-primary">Drop Us a Line</p>
                      <h4 class="mb-0">Contact</h4>
                    </div>
                    <svg class="svg-icon svg-icon svg-icon-light w-3rem h-3rem ml-3 text-muted">
                      <use xlink:href="#fountain-pen-1" />
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <ul class="list-unstyled mb-4">
                    <li class="mb-2">
                      <a href="#" class="text-gray-00 text-sm text-decoration-none">
                        <i class="fa fa-phone mr-3"></i>
                        <span class="text-muted">{{this.phone}}</span>
                      </a>
                    </li>
                    <li class="mb-2">
                      <a :href="website" class="text-sm text-decoration-none">
                        <i class="fa fa-globe mr-3"></i>
                        <span class="text-muted">{{this.website}}</span>
                      </a>
                    </li>
                  </ul>
                  <div class="text-center">
                    <a
                      :href="googleDirections(this.lat, this.lon)"
                      class="btn btn-outline-primary btn-block"
                    >
                      <i class="far fa-paper-plane mr-2"></i>Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="py-6 bg-gray-100">
      <div class="container">
        <h5 class="mb-0">Similar places</h5>
        <p class="subtitle text-sm text-primary mb-4">You may also like</p>
        <!-- Slider main container-->
        <div class="swiper-container swiper-container-mx-negative items-slider">
          <!-- Additional required wrapper-->
          <div class="swiper-wrapper pb-5">
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1430931071372-38127bd472b8.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Blue Hill</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-gray-300"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Restaurants</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Cupidatat excepteur non dolore laborum et quis nostrud veniam dolore deserunt. Pariatur dolore ut in elit id nulla. Irur...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Restaurant,</a>
                      <a href="#" class="mr-1">Contemporary</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e322f3375db4d89128" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1436018626274-89acd1d6ec9d.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Plutorque</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Restaurant</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Proident irure eiusmod velit veniam consectetur id minim irure et nostrud mollit magna velit. Commodo amet proident aliq...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Restaurant,</a>
                      <a href="#" class="mr-1">Fusion</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e3a31e62979bf147c9" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1466978913421-dad2ebd01d17.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Junipoor</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Music club</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Lorem amet ex duis in et fugiat consectetur laborum eiusmod labore. Quis cupidatat et do dolor in in magna. Eu sit quis ...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Music,</a>
                      <a href="#" class="mr-1">Techno,</a>
                      <a href="#" class="mr-1">House</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e3503eb77d487e8082" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1477763858572-cda7deaa9bc5.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Musix</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-gray-300"></i>
                        <i class="fa fa-star text-gray-300"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Music club</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Deserunt eiusmod Lorem proident consequat elit culpa laboris ea cupidatat. Consequat dolore proident ipsum qui sint enim...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Music,</a>
                      <a href="#" class="mr-1">Club,</a>
                      <a href="#" class="mr-1">Rock</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e39aa2eed0626e485d" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1504087697492-238a6bf49ce8.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Prosure</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Restaurant</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Cillum sunt reprehenderit ea non irure veniam dolore commodo labore fugiat est consequat velit. Cupidatat nisi qui ad si...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Nisi,</a>
                      <a href="#" class="mr-1">Ex,</a>
                      <a href="#" class="mr-1">Eiusmod</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <!-- venue item-->
              <div data-marker-id="59c0c8e39aa2edasd626e485d" class="w-100 h-100">
                <div class="card h-100 border-0 shadow">
                  <div
                    style="background-image: url(img/photo/restaurant-1505275350441-83dcda8eeef5.jpg); min-height: 200px;"
                    class="card-img-top overflow-hidden dark-overlay bg-cover"
                  >
                    <!--img.img-fluid(src="#{imgBasePath}#{val.image}" alt="#{val.name}")-->
                    <a href="detail.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <h4 class="text-white text-shadow">Take That</h4>
                      <p class="mb-2 text-xs">
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-gray-300"></i>
                      </p>
                    </div>
                    <div
                      class="card-img-overlay-top d-flex justify-content-between align-items-center"
                    >
                      <div class="badge badge-transparent badge-pill px-3 py-2">Café</div>
                      <a
                        href="javascript: void();"
                        class="card-fav-icon position-relative z-index-40"
                      >
                        <svg class="svg-icon text-white">
                          <use xlink:href="#heart-1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <p
                      class="text-sm text-muted mb-3"
                    >Cillum sunt reprehenderit ea non irure veniam dolore commodo labore fugiat est consequat velit. Cupidatat nisi qui ad si...</p>
                    <p class="text-sm text-muted text-uppercase mb-1">
                      By
                      <a href="#" class="text-dark">Matt Damon</a>
                    </p>
                    <p class="text-sm mb-0">
                      <a href="#" class="mr-1">Nisi,</a>
                      <a href="#" class="mr-1">Ex,</a>
                      <a href="#" class="mr-1">Eiusmod</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- If we need pagination-->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";
import firebase from "firebase";
import DetailMap from "../components/DetailMap";

export default {
  name: "Detail",
  components: {
    Navigation,
    Footer,
    Loading,
    DetailMap
  },
  computed: {
    header_image() {
      if (this.routerParams) {
        return "background-image: url(" + this.routerParams.image_urls[0] + ")";
      }
    },
    static_map() {
      var url =
        "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=10&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A";
      if (this.routerParams) {
        var center = this.routerParams.lat + "," + this.routerParams.lon;
        url =
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          center +
          "&zoom=10&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:sds%7C" +
          center +
          "&key=AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A";
      }
      return url;
    }
  },
  data() {
    return {
      routerParams: null,
      campsite_name: "",
      campsite_id: "",
      description: "",
      access_description: "",
      image_urls: [],
      phone: "",
      website: "",
      lat: JSON.parse(localStorage.getItem("routerParams")).lat,
      lon: JSON.parse(localStorage.getItem("routerParams")).lon,
      isLoading: false,
      fullPage: true,
      favourites: [],
      campsite_address: "",
      nearby_ff: [],
      nearby_pv: [],
      weather_forecast: [],
      weather_recommendation: "The weather looks perfect! Happy Camping!",
      animals_nearby: [],
      animalSearchRadius: 10,
      animalSearchName: "",
      youliked: [],
      youdliked: [],
      rating: "",
      reviews: [],
      overall_rating: 0,
      currentUser: null,
      GoogleMapRenderKey: 0
    };
  },
  methods: {
    getParams() {
      this.routerParams = JSON.parse(localStorage.getItem("routerParams"));
      console.log(this.routerParams);
      this.campsite_id = this.routerParams._id;
      this.campsite_name = this.routerParams.name;
      this.description = this.routerParams.description;
      this.access_description = this.routerParams.access_desc;
      this.image_urls = this.routerParams.image_urls;
      this.phone = this.routerParams.phone;
      this.website = this.routerParams.website;
      this.lat = this.routerParams.lat;
      this.lon = this.routerParams.lon;
    },
    googleDirections(lat, lon) {
      var url =
        "https://www.google.com/maps?saddr=My+Location&daddr=" +
        lat +
        "," +
        lon;
      return url;
    },
    addFavourite(item) {
      var refId = "favourites_btn";
      var favButton = this.$refs[refId];
      console.log(favButton);
      if (this.favourites.includes(this.campsite_id)) {
        var index = this.favourites.indexOf(this.campsite_id);
        this.favourites.splice(index, 1);
        favButton.innerHTML =
          "<i class='fa fa-heart mr-3'></i> ADD TO FAVOURITES";
      } else {
        this.favourites.push(this.campsite_id);
        favButton.innerHTML =
          "<i class='fa fa-heart mr-3'></i>REMOVE FROM FAVOURITES";
      }
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
    getFoodAndFuel() {
      var url =
        "https://places.cit.api.here.com/places/v1/discover/explore?app_id=DUtRqTBXC40eCfJUyoD3&app_code=ZCowqrUcpTeM1x8gXpKeOg&in=" +
        this.lat +
        "," +
        this.lon +
        ";r=10000&cat=petrol-station,eat-drink&pretty=";
      axios.get(url).then(res => {
        this.campsite_address = res.data.search.context.location.address.text.replace(
          /<\/?[^>]+(>|$)/g,
          ", "
        );
        for (var i = 0; i < res.data.results.items.length; i++) {
          var item = res.data.results.items[i];
          var ff_item = {};
          ff_item["title"] = item.title;
          ff_item["category"] = item.category.title;
          ff_item["distance"] = item.distance;
          ff_item["lat"] = item.position[0];
          ff_item["lon"] = item.position[1];
          ff_item["icon"] = item.icon;
          ff_item["address"] = item.vicinity.replace(/<\/?[^>]+(>|$)/g, ", ");
          this.nearby_ff.push(ff_item);
        }
        this.GoogleMapRender();
      });
    },
    getPlacesToVisit() {
      var url =
        "https://places.cit.api.here.com/places/v1/discover/explore?app_id=DUtRqTBXC40eCfJUyoD3&app_code=ZCowqrUcpTeM1x8gXpKeOg&in=" +
        this.lat +
        "," +
        this.lon +
        ";r=10000&cat=sights-museums,natural-geographical&pretty=";
      axios.get(url).then(res => {
        for (var i = 0; i < res.data.results.items.length; i++) {
          var item = res.data.results.items[i];
          var pv_item = {};
          pv_item["title"] = item.title;
          pv_item["category"] = item.category.title;
          pv_item["distance"] = item.distance;
          pv_item["lat"] = item.position[0];
          pv_item["lon"] = item.position[1];
          pv_item["icon"] = item.icon;
          pv_item["address"] = item.vicinity.replace(/<\/?[^>]+(>|$)/g, ", ");
          pv_item["average_rating"] = item.averageRating;
          this.nearby_pv.push(pv_item);
        }
        this.GoogleMapRender();
      });
    },
    async get_weather_forecast() {
      var open_api_call =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        this.lat +
        "&lon=" +
        this.lon +
        "&appid=fa250324b761890e884085debec36f35";
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      axios.get(open_api_call).then(res => {
        for (var i = 0; i < res.data.list.length; i += 8) {
          var weather = {};
          var day = new Date(res.data.list[i]["dt_txt"].substring(0, 10));
          var dayOfWeek = weekday[day.getDay()];
          weather["dayOfWeek"] = dayOfWeek;
          weather["weather"] = res.data.list[i]["weather"][0]["description"];
          weather["temperature"] = parseFloat(
            parseFloat(res.data.list[i]["main"]["temp"]) - 273.15
          ).toFixed(2);
          weather["humidity"] = res.data.list[i]["main"]["humidity"];
          weather["windspeed"] = res.data.list[i]["wind"]["speed"];
          weather["icon"] =
            "https://openweathermap.org/img/wn/" +
            res.data.list[i]["weather"][0]["icon"] +
            "@2x.png";
          this.weather_forecast.push(weather);
        }
        this.makeWeatherRecommendation();
      });
    },
    makeWeatherRecommendation() {
      var recomm = "The weather looks perfect! ";
      var rain = 0;
      var wind = 0;
      var heat = 0;
      for (var i = 0; i < this.weather_forecast.length; i++) {
        if (this.weather_forecast[i].weather == "light rain") {
          rain = 1;
        }
        if (this.weather_forecast[i].windspeed > 25) {
          wind = 1;
        }
        if (parseFloat(this.weather_forecast[i].temperature) > 30) {
          heat = 1;
        }
      }
      if (rain == 1) {
        recomm = "We suggest you carry rain jackets. ";
      }
      if (wind == 1) {
        recomm =
          recomm +
          "Use extra guy ropes and pegs to secure the tent during wind. ";
      }
      if (heat == 1) {
        recomm = recomm + "Carry extra water with you to bear the heat. ";
      }
      recomm = recomm + "Happy Camping!";
      this.weather_recommendation = recomm;
    },
    getAnimalsNearby() {
      var open_api_call =
        "https://biocache-ws.ala.org.au/ws/occurrences/search?q=" +
        this.animalSearchName +
        "&lat=" +
        this.lat +
        "&lon=" +
        this.lon +
        "&radius=" +
        this.animalSearchRadius +
        "&sort=year&dir=desc";
      axios.get(open_api_call).then(res => {
        this.animals_nearby = res.data.occurrences;
      });
    },
    GoogleMapRender() {
      this.GoogleMapRenderKey += 1;
    },
    onCancel() {},
    onYouLikedChange() {
      //console.log(this.youliked);
    },
    onYouDLikedChange() {
      //console.log(this.youdliked);
    },
    onRatingChange() {
      //console.log(this.rating);
    },
    onReviewClick() {
      var db = firebase.firestore();
      var _this = this;
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      db.collection("review")
        .add({
          site_id: _this.campsite_id,
          site_name: _this.campsite_name,
          review_email: firebase.auth().currentUser.email,
          review_displayName: firebase.auth().currentUser.displayName,
          review_photoURL: firebase.auth().currentUser.photoURL,
          review_likes: _this.youliked,
          review_dislikes: _this.youdliked,
          review_rating: _this.rating,
          review_dt: date
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          _this.getReviews();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    getReviews: function() {
      this.reviews = [];
      var db = firebase.firestore();
      var _this = this;
      db.collection("review")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var document = {};
            document["id"] = doc.id;
            document["data"] = doc.data();
            if (document["data"]["site_id"] == _this.campsite_id) {
              _this.overall_rating =
                _this.overall_rating +
                parseInt(document["data"]["review_rating"]);
              _this.reviews.push(document);
            }
          });
          if (this.reviews.length > 0) {
            this.overall_rating = parseInt(
              this.overall_rating / this.reviews.length
            );
          }
        });
      console.log(this.reviews);
    },
    checkLogin() {
      var currUser = firebase.auth().currentUser;
      if (currUser) {
        this.currentUser = currUser;
      }
    }
  },
  mounted() {
    this.isLoading = true;
    this.checkLogin();
    if (this.$route.params.detail) {
      localStorage.setItem(
        "routerParams",
        JSON.stringify(this.$route.params.detail)
      );
    }
    this.$nextTick(function() {
      $(".selectpicker").selectpicker();
    });
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
    } else {
      this.favourites = [];
    }
    this.getParams();
    this.getFoodAndFuel();
    this.getPlacesToVisit();
    this.get_weather_forecast();
    this.getAnimalsNearby();
    this.getReviews();
    this.isLoading = false;
  }
};
</script>

<style>
header {
  margin-bottom: 5rem;
}
</style>