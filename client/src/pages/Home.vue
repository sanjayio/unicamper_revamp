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
      <!-- Navbar-->
      <Navigation></Navigation>
      <!-- /Navbar -->
    </header>
    <section class="hero-home">
      <div class="swiper-container hero-slider">
        <div class="swiper-wrapper dark-overlay">
          <div
            style="background-image:url(https://images.pexels.com/photos/1246955/pexels-photo-1246955.jpeg)"
            class="swiper-slide"
          ></div>
          <div
            style="background-image:url(https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg)"
            class="swiper-slide"
          ></div>
          <div
            style="background-image:url(https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg)"
            class="swiper-slide"
          ></div>
          <div
            style="background-image:url(https://images.pexels.com/photos/1531683/pexels-photo-1531683.jpeg)"
            class="swiper-slide"
          ></div>
        </div>
      </div>
      <div class="container py-6 py-md-7 text-white z-index-20">
        <div class="row">
          <div class="col-xl-10">
            <div class="text-center text-lg-left">
              <p
                class="subtitle letter-spacing-4 mb-2 text-secondary text-shadow"
              >The best camping experience</p>
              <h1 class="display-3 font-weight-bold text-shadow">{{this.str2}}</h1>
            </div>
            <div class="search-bar mt-5 p-3 p-lg-1 pl-lg-4">
              <form action="#">
                <div class="row">
                  <div class="col-8 flex">
                    <vue-google-autocomplete
                      ref="address"
                      id="map"
                      class="form-control form-control-lg"
                      placeholder="Search..."
                      v-on:placechanged="getAddressData"
                      types="(regions)"
                      country="au"
                    ></vue-google-autocomplete>
                  </div>
                  <div class="col-4">
                    <router-link
                      to="/search"
                      tag="button"
                      class="btn btn-primary btn-block rounded-xl h-100"
                    >Search</router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="text-center pb-lg-4">
          <p class="subtitle text-secondary">One-of-a-kind camping solution</p>
          <h2 class="mb-5">Camping just got better</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <img class="text-primary w-2rem h-2rem" src="../assets/icons/tent.png" />
              </div>
              <h3 class="h5">Find the perfect campsite</h3>
              <p
                class="text-muted"
              >Use our website to find the perfect campsite, based on your needs and requirements.</p>
            </div>
          </div>
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <img class="text-primary w-2rem h-2rem" src="../assets/icons/checklist.png" />
              </div>
              <h3 class="h5">Plan your trip</h3>
              <p
                class="text-muted"
              >Our planner helps you plan your vacation, and also share your plan with your friends.</p>
            </div>
          </div>
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-0 px-lg-3">
              <div class="icon-rounded bg-primary-light mb-3">
                <img class="text-primary w-2rem h-2rem" src="../assets/icons/sandals.png" />
              </div>
              <h3 class="h5">Enjoy your vacation</h3>
              <p
                class="text-muted"
              >There is no better feeling than going on a vacation. We hope you have a wonderful time!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <p class="subtitle text-primary">Stay and eat like a local</p>
            <h2>Our guides</h2>
          </div>
          <div class="col-md-4 d-lg-flex align-items-center justify-content-end">
            <a href="category.html" class="text-muted text-sm">
              See all guides
              <i class="fas fa-angle-double-right ml-2"></i>
            </a>
          </div>
        </div>
        <div class="swiper-container guides-slider mx-n2 pt-3">
          <!-- Additional required wrapper-->
          <div class="swiper-wrapper pb-5">
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2">
              <div class="card card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
                <a href="category.html" class="tile-link"></a>
                <img src="../assets/img/photo/new-york.jpg" alt="Card image" class="bg-image" />
                <div class="card-body overlay-content">
                  <h6 class="card-title text-shadow text-uppercase">New York</h6>
                  <p class="card-text text-sm">The big apple</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <div class="card card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
                <a href="category.html" class="tile-link"></a>
                <img src="../assets/img/photo/paris.jpg" alt="Card image" class="bg-image" />
                <div class="card-body overlay-content">
                  <h6 class="card-title text-shadow text-uppercase">Paris</h6>
                  <p class="card-text text-sm">Artist capital of Europe</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <div class="card card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
                <a href="category.html" class="tile-link"></a>
                <img src="../assets/img/photo/barcelona.jpg" alt="Card image" class="bg-image" />
                <div class="card-body overlay-content">
                  <h6 class="card-title text-shadow text-uppercase">Barcelona</h6>
                  <p class="card-text text-sm">Dalí, Gaudí, Barrio Gotico</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide h-auto px-2">
              <div class="card card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
                <a href="category.html" class="tile-link"></a>
                <img src="../assets/img/photo/prague.jpg" alt="Card image" class="bg-image" />
                <div class="card-body overlay-content">
                  <h6 class="card-title text-shadow text-uppercase">Prague</h6>
                  <p class="card-text text-sm">City of hundred towers</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination d-md-none"></div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <p class="subtitle text-secondary">Hurry up, these are expiring soon.</p>
            <h2>Last minute deals</h2>
          </div>
          <div class="col-md-4 d-lg-flex align-items-center justify-content-end">
            <a href="category.html" class="text-muted text-sm">
              See all deals
              <i class="fas fa-angle-double-right ml-2"></i>
            </a>
          </div>
        </div>
        <!-- Slider main container-->
        <div
          data-swiper="{&quot;slidesPerView&quot;:4,&quot;spaceBetween&quot;:20,&quot;loop&quot;:true,&quot;roundLengths&quot;:true,&quot;breakpoints&quot;:{&quot;1200&quot;:{&quot;slidesPerView&quot;:3},&quot;991&quot;:{&quot;slidesPerView&quot;:2},&quot;565&quot;:{&quot;slidesPerView&quot;:1}},&quot;pagination&quot;:{&quot;el&quot;:&quot;.swiper-pagination&quot;,&quot;clickable&quot;:true,&quot;dynamicBullets&quot;:true}}"
          class="swiper-container swiper-container-mx-negative swiper-init pt-3"
        >
          <!-- Additional required wrapper-->
          <div class="swiper-wrapper pb-5">
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2" style="max-height: 300px; max-width: 200px;">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2" style="max-height: 300px; max-width: 200px;">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2" style="max-height: 300px; max-width: 200px;">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2" style="max-height: 300px; max-width: 200px;">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Slides-->
            <div class="swiper-slide h-auto px-2" style="max-height: 300px; max-width: 200px;">
              <!-- place item-->
              <div data-marker-id="59c0c8e33b1527bfe2abaf92" class="w-100 h-100 hover-animate">
                <div class="card h-100 border-0 shadow">
                  <div class="card-img-top overflow-hidden gradient-overlay">
                    <img
                      src="../assets/img/photo/photo-1484154218962-a197022b5858.jpg"
                      alt="Modern, Well-Appointed Room"
                      class="img-fluid"
                    />
                    <a href="detail-rooms.html" class="tile-link"></a>
                    <div class="card-img-overlay-bottom z-index-20">
                      <div class="media text-white text-sm align-items-center">
                        <img
                          src="../assets/img/avatar/avatar-0.jpg"
                          alt="Pamela"
                          class="avatar avatar-border-white mr-2"
                        />
                        <div class="media-body">Pamela</div>
                      </div>
                    </div>
                    <div class="card-img-overlay-top text-right">
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
                  <div class="card-body d-flex align-items-center">
                    <div class="w-100">
                      <h6 class="card-title">
                        <a
                          href="detail-rooms.html"
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
                      <p class="card-text text-muted">
                        <span class="h4 text-primary">$80</span> per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- If we need pagination-->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
    <!-- Divider Section-->
    <section class="py-7 position-relative dark-overlay">
      <img src="../assets/img/photo/photo-1497436072909-60f360e1d4b1.jpg" alt class="bg-image" />
      <div class="container">
        <div class="overlay-content text-white py-lg-5">
          <h3
            class="display-3 font-weight-bold text-serif text-shadow mb-5"
          >Ready for your next holidays?</h3>
          <a href class="btn btn-light">Get started</a>
        </div>
      </div>
    </section>
    <section class="py-7">
      <div class="container">
        <div class="text-center">
          <p class="subtitle text-primary">Testimonials</p>
          <h2 class="mb-5">Our dear customers said about us</h2>
        </div>
        <!-- Slider main container-->
        <div class="swiper-container testimonials-slider testimonials">
          <!-- Additional required wrapper-->
          <div class="swiper-wrapper pt-2 pb-5">
            <!-- Slides-->
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
            <div class="swiper-slide px-3">
              <div class="testimonial card rounded-lg shadow border-0">
                <div class="testimonial-avatar">
                  <img src="img/avatar/avatar-3.jpg" alt="..." class="img-fluid" />
                </div>
                <div class="text">
                  <div class="testimonial-quote">
                    <i class="fas fa-quote-right"></i>
                  </div>
                  <p
                    class="testimonial-text"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <strong>Jessica Watson</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-gray-100">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <p class="subtitle text-secondary">Stories from Victoria</p>
            <h2>From our travel blog</h2>
          </div>
          <div class="col-md-4 d-md-flex align-items-center justify-content-end">
            <a href="blog.html" class="text-muted text-sm">
              See all articles
              <i class="fas fa-angle-double-right ml-2"></i>
            </a>
          </div>
        </div>
        <div class="row">
          <!-- blog item-->
          <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
              <a href="post.html">
                <img
                  src="../assets/img/photo/photo-1512917774080-9991f1c4c750.jpg"
                  alt="..."
                  class="img-fluid card-img-top"
                />
              </a>
              <div class="card-body">
                <a href="#" class="text-uppercase text-muted text-sm letter-spacing-2">Travel</a>
                <h5 class="my-2">
                  <a href="post.html" class="text-dark">Autumn fashion tips and tricks</a>
                </h5>
                <p class="text-gray-500 text-sm my-3">
                  <i class="far fa-clock mr-2"></i>January 16, 2016
                </p>
                <p
                  class="my-2 text-muted text-sm"
                >Pellentesque habitant morbi tristique senectus. Vestibulum tortor quam, feugiat vitae, ultricies ege...</p>
                <a href="post.html" class="btn btn-link pl-0">
                  Read more
                  <i class="fa fa-long-arrow-alt-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- blog item-->
          <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
              <a href="post.html">
                <img
                  src="img/photo/photo-1522771739844-6a9f6d5f14af.jpg"
                  alt="..."
                  class="img-fluid card-img-top"
                />
              </a>
              <div class="card-body">
                <a href="#" class="text-uppercase text-muted text-sm letter-spacing-2">Living</a>
                <h5 class="my-2">
                  <a href="post.html" class="text-dark">Newest photo apps</a>
                </h5>
                <p class="text-gray-500 text-sm my-3">
                  <i class="far fa-clock mr-2"></i>January 16, 2016
                </p>
                <p
                  class="my-2 text-muted text-sm"
                >ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibu...</p>
                <a href="post.html" class="btn btn-link pl-0">
                  Read more
                  <i class="fa fa-long-arrow-alt-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- blog item-->
          <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
              <a href="post.html">
                <img
                  src="img/photo/photo-1482463084673-98272196658a.jpg"
                  alt="..."
                  class="img-fluid card-img-top"
                />
              </a>
              <div class="card-body">
                <a href="#" class="text-uppercase text-muted text-sm letter-spacing-2">Travel</a>
                <h5 class="my-2">
                  <a href="post.html" class="text-dark">Best books about Photography</a>
                </h5>
                <p class="text-gray-500 text-sm my-3">
                  <i class="far fa-clock mr-2"></i>January 16, 2016
                </p>
                <p
                  class="my-2 text-muted text-sm"
                >Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Mauris placerat eleif...</p>
                <a href="post.html" class="btn btn-link pl-0">
                  Read more
                  <i class="fa fa-long-arrow-alt-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Instagram-->
    <section>
      <div class="container-fluid px-0">
        <div class="swiper-container instagram-slider">
          <div class="swiper-wrapper">
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-1.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-2.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-3.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-4.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-5.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-6.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-7.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-8.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-9.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-10.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-11.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-12.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-13.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-14.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-10.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-11.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-12.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-13.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
            <div class="swiper-slide overflow-hidden">
              <a href="#">
                <img src="img/instagram/instagram-14.jpg" alt class="img-fluid hover-scale" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer-->
    <Footer></Footer>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A&libraries=places"></script>

<script>
require("../assets/js/theme.js");
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
    VueGoogleAutocomplete,
    Loading
  },
  data() {
    return {
      str: "Start Camping today",
      i: 0,
      timer: 0,
      str2: "",
      address: "Melbourne CBD, VIC",
      lat: -37.8136,
      lon: 144.9631,
      isLoading: true,
      fullPage: true
    };
  },
  methods: {
    typing() {
      if (this.i <= this.str.length) {
        this.str2 = this.str.slice(0, this.i++);
        this.timer = setTimeout(() => {
          this.typing();
        }, 200);
      } else {
        clearTimeout(this.timer);
      }
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = placeResultData.formatted_address;
      this.lat = addressData.latitude;
      this.lon = addressData.longitude;
      localStorage.setItem("lat", this.lat);
      localStorage.setItem("lon", this.lon);
      localStorage.setItem("full_address", this.address);
      localStorage.setItem(
        "address",
        placeResultData.address_components[0].long_name
      );
    },
    onCancel: function() {}
  },
  mounted() {
    this.$nextTick(function() {
      $(".swiper-init").each(function() {
        var slider = $(this),
          configuration = JSON.parse($(this).attr("data-swiper"));

        new Swiper(slider, configuration);
      });

      var homeSlider = new Swiper(".home-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 1500,
        parallax: true,
        /*
        autoplay: {
            delay: 5000,
        },
        */
        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        },
        // Navigation arrows
        navigation: {
          nextEl: "#homeNext",
          prevEl: "#homePrev"
        }
      });
      var swiper = new Swiper(".hero-slider", {
        effect: "fade",
        speed: 2000,
        allowTouchMove: false,
        autoplay: {
          delay: 10000
        }
      });
      var guidesSlider = new Swiper(".guides-slider", {
        slidesPerView: 5,
        spaceBetween: 15,
        loop: true,
        roundLengths: true,
        breakpoints: {
          1200: {
            slidesPerView: 4
          },
          991: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 2
          },
          400: {
            slidesPerView: 1
          }
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        }
      });
    });
    this.isLoading = false;
    this.typing();
  }
};
</script>
<style lang="css">
header {
  margin-bottom: 5rem;
}
</style>