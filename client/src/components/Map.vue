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
        :position="center"
        :clickable="false"
        :icon="{url:'https://img.icons8.com/dusk/48/000000/user-location.png'}"
      />
      <gmap-marker
        v-for="(item, key) in list"
        v-if="item.fees_and_booking.toUpperCase().includes('$')"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'data:image/png;base64,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'}"
      />
      <gmap-marker
        v-else
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEJUlEQVRoge2Xz28bRRTHv29md+1tEtGGqgJERUoLHBASUoWEEFRRD/wQh5wIf0DFkSN/AurfgJRLpAoCUQMnLhzaIAoCxAlxoSotxHZoE9uxHf/aH/N6WEjH3lnvbuwLYj9SFO+bN2/ed+e93VmgoKCgoOD/DB13Im/INbh0BSfljDKhD+jSYC33tOOsxZtyBY3wKwDAkgOUj30fdIZg9QYt+z/nmZR7Zd7CGRzQX/C4BABwCDjnACJvJCM7IPsiXTrcyzoh/7JdcesoeQDwGKj5ucMkcBbsb/ANWFkn5BLAG3INXXUhNtBRQD3ME2oSlyFLH2d1zlxCR3XPEyI9YwPuTGqJwfw+LXubaY6ZBMTqHkCgoqmW0BRZBDxrA3ImTX0Iya/S695vk5yy3a7xugcwCCS8YGx6wEA1yJlnIvMIaYu/wWOTnFIFJNX9MBAYBIZ3QFcBezMT8Tyc0jpzcqVMFMCbcgWt8IpprD2w0Rna5on1MBIyG1aw7XyUNJgogLdwBh31eVLTNnoOmv0EAQyg6gN+UsfnhOgqf1t6yzSUvAOGutdp9Epo9p3kRUNE/TAbDQJMn/J2+Vx8wEDi815jv+dgv5uoL6I/y37gRYC3+Hu4ujUmYFLd61TbLnbb5fR16yHQnlk/vIzA+UQ3jAhIq3ud2oGL3bab7ggAu3505MgLAwgZCBQwDIC+D3SD93SX0TNHV9yCp1LqInoH1PslCGKEiiBFSnIKQMWPTq5JXac4+gtVlDRz9H8cS9xPFjDkWJOYqLXdf+ITHnRLeHJhkD5pyMDfPvCEpSWoJZt1gwT9NHI5MuhQNUuMautR6WQuIwDoKeDQi0phEAC+iu56vuq6rl+MCrDpxywRqlrStVYOAeUpD3oERiv8UjeNRhQYGUyioiVdy7MDqd2VgqQGrcLTTaMCKLwOmb6hdxtzR7//PDiRPYHMnylJiF9jFv2CVuHBpuakEHuHJXQGj44Q1ZYLL8xYGnLK17Lgr2OmmJMdV6nzR3N+5FoxYSfrLkz7mcDq2rgpLsCKq9S5W5+L2e414jZzAlPsgKAevY3dmDnmWFbrk+7Unfp8zJapDxIOrpkRdNtoHjfQCu7Dob7JWTEZk820A9M/Qm+azOaojlltpeVi4Me/wiqtE/DTGnnaR2goPzOZzatKbJvMv+8tGN0DRbjXTNmF3I9QUpCiAkdew5y1TO/6xpesOayQ64D6cNx8e98sAIh647nTneR8Uh+hpCCpBkk3YdMaXQ62s5wxjAJo1f+Fv8DjsKyX4NGLoPACQlo6fWp48RXRWGx17XJ7YMmDnkP/ftjf2Z8DXpiUH8byOV7CprBT8cPVk0ueX3rTEnT+tfMPFgB6CiGfheJFhDgFhgufHTxNHgg7EOIGmNbpneC7adcuKCgoKCj4z/MQQWGmtmupYLgAAAAASUVORK5CYII='}"
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
      this.infoPosition = this.getPosition(marker);
      this.infoContentTitle = marker.name;
      this.infoContentDescription = marker.description;
      this.imgURL = marker.image_urls[0];

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
    },
    addFavourite(item) {
      var refId = "fav_button_" + item._id;
      var favButton = this.$refs[refId];
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
