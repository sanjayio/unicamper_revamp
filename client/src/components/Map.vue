<template>
  <div>
    <gmap-map :center="center" :zoom="zoom" :options="mapStyle" style="width:100%; height:100vh;">
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened=false"
      >
        <!--  get/set  data -->
        <div class="mapList">
          <b-img fluid-grow class="mapImg" :src="imgURL"></b-img>
          <h5>{{infoContentTitle}}</h5>
          <button
            class="btn btn-outline-dark my-2 my-sm-0"
            style="margin-right: 10px;"
            @click="forwordDetail(detail)"
          >Learn More</button>
        </div>
      </gmap-info-window>
      <gmap-marker
        v-for="(item, key) in list"
        v-if="item.fees_and_booking.toUpperCase().includes('$')"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'https://img.icons8.com/office/48/000000/us-dollar.png'}"
      />
      <gmap-marker
        v-else
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'https://img.icons8.com/color/48/000000/tent.png'}"
      />
    </gmap-map>
  </div>
</template>

<script>
import { BImg } from "bootstrap-vue";
import Vue from "vue";
Vue.component("b-img", BImg);

export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: this.$props.lat, lng: this.$props.lon },
      zoom: this.$props.zoom,
      markers: [],
      places: [],
      currentPlace: null,
      infoPosition: null,
      infoOptions: null,
      infoContentTitle: null,
      infoContentDescription: null,
      infoOpened: false,
      infoCurrentKey: null,
      detail: {},
      favourites: [],
      imgURL: "",
      mapStyle: {
        disableDefaultUI: true,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
          },
          {
            featureType: "administrative.neighborhood",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#dadada"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#c9c9c9"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          }
        ]
      }
    };
  },
  props: {
    list: Array,
    lat: Number,
    lon: Number,
    zoom: Number
  },
  mounted() {
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      console.log(this.favourites);
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker["lat"]),
        lng: parseFloat(marker["lon"])
      };
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    toggleInfo: function(marker, key) {
      this.detail = marker;
      console.log("detail", this.detail);
      this.infoPosition = this.getPosition(marker);
      this.infoContentTitle = marker.name;
      this.infoContentDescription = marker.description;
      this.imgURL = marker.image_urls[0];
      console.log(this.imgURL);

      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
    forwordDetail(item) {
      this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {
          key: "key",
          detail: item
        }
      });
      console.log(item.name);
    },
    addFavourite(item) {
      var refId = "fav_button_" + item._id;
      var favButton = this.$refs[refId];
      //console.log(this.$refs[refId]);
      if (localStorage.favourites) {
        this.favourites = JSON.parse(localStorage.getItem("favourites"));
      } else {
        this.favourites = [];
      }
      if (this.favourites.includes(item._id)) {
        var index = this.favourites.indexOf(item._id);
        this.favourites.splice(index, 1);
        favButton.innerHTML =
          '<img src="https://img.icons8.com/ios/16/000000/like.png" />';
      } else {
        this.favourites.push(item._id);
        favButton.innerHTML =
          '<img src="https://img.icons8.com/offices/16/000000/like.png" />';
      }
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }
  }
};
</script>

<style lang="css" scoped>
.mapList {
  max-width: 18rem;
}

.mapImg {
  padding-left: 0.4rem;
}
</style>
