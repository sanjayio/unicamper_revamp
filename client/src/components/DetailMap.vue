<template>
  <div>
    <gmap-map :center="center" :zoom="zoom" :options="mapStyle" style="width:100%; height:30vh;">
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened=false"
      >
        <!--  get/set  data -->
        <div class="mapList">
          <h5>{{infoContentTitle}}</h5>
          <p>{{infoContentDescription}}</p>
        </div>
      </gmap-info-window>
      <gmap-marker
        :position="center"
        :clickable="false"
        :icon="{url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEJUlEQVRoge2Xz28bRRTHv29md+1tEtGGqgJERUoLHBASUoWEEFRRD/wQh5wIf0DFkSN/AurfgJRLpAoCUQMnLhzaIAoCxAlxoSotxHZoE9uxHf/aH/N6WEjH3lnvbuwLYj9SFO+bN2/ed+e93VmgoKCgoOD/DB13Im/INbh0BSfljDKhD+jSYC33tOOsxZtyBY3wKwDAkgOUj30fdIZg9QYt+z/nmZR7Zd7CGRzQX/C4BABwCDjnACJvJCM7IPsiXTrcyzoh/7JdcesoeQDwGKj5ucMkcBbsb/ANWFkn5BLAG3INXXUhNtBRQD3ME2oSlyFLH2d1zlxCR3XPEyI9YwPuTGqJwfw+LXubaY6ZBMTqHkCgoqmW0BRZBDxrA3ImTX0Iya/S695vk5yy3a7xugcwCCS8YGx6wEA1yJlnIvMIaYu/wWOTnFIFJNX9MBAYBIZ3QFcBezMT8Tyc0jpzcqVMFMCbcgWt8IpprD2w0Rna5on1MBIyG1aw7XyUNJgogLdwBh31eVLTNnoOmv0EAQyg6gN+UsfnhOgqf1t6yzSUvAOGutdp9Epo9p3kRUNE/TAbDQJMn/J2+Vx8wEDi815jv+dgv5uoL6I/y37gRYC3+Hu4ujUmYFLd61TbLnbb5fR16yHQnlk/vIzA+UQ3jAhIq3ud2oGL3bab7ggAu3505MgLAwgZCBQwDIC+D3SD93SX0TNHV9yCp1LqInoH1PslCGKEiiBFSnIKQMWPTq5JXac4+gtVlDRz9H8cS9xPFjDkWJOYqLXdf+ITHnRLeHJhkD5pyMDfPvCEpSWoJZt1gwT9NHI5MuhQNUuMautR6WQuIwDoKeDQi0phEAC+iu56vuq6rl+MCrDpxywRqlrStVYOAeUpD3oERiv8UjeNRhQYGUyioiVdy7MDqd2VgqQGrcLTTaMCKLwOmb6hdxtzR7//PDiRPYHMnylJiF9jFv2CVuHBpuakEHuHJXQGj44Q1ZYLL8xYGnLK17Lgr2OmmJMdV6nzR3N+5FoxYSfrLkz7mcDq2rgpLsCKq9S5W5+L2e414jZzAlPsgKAevY3dmDnmWFbrk+7Unfp8zJapDxIOrpkRdNtoHjfQCu7Dob7JWTEZk820A9M/Qm+azOaojlltpeVi4Me/wiqtE/DTGnnaR2goPzOZzatKbJvMv+8tGN0DRbjXTNmF3I9QUpCiAkdew5y1TO/6xpesOayQ64D6cNx8e98sAIh647nTneR8Uh+hpCCpBkk3YdMaXQ62s5wxjAJo1f+Fv8DjsKyX4NGLoPACQlo6fWp48RXRWGx17XJ7YMmDnkP/ftjf2Z8DXpiUH8byOV7CprBT8cPVk0ueX3rTEnT+tfMPFgB6CiGfheJFhDgFhgufHTxNHgg7EOIGmNbpneC7adcuKCgoKCj4z/MQQWGmtmupYLgAAAAASUVORK5CYII='}"
      />
      <gmap-marker
        v-for="(item, key) in ff_list"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'data:image/png;base64,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'}"
      />
      <gmap-marker
        v-for="(item, key) in pv_list"
        :key="key+30"
        :position="getPosition(item)"
        :clickable="true"
        @click="toggleInfo(item, key)"
        :icon="{ url:'data:image/png;base64,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'}"
      />
    </gmap-map>
  </div>
</template>

<script>
import { BImg } from 'bootstrap-vue'
import Vue from 'vue'
Vue.component('b-img', BImg)

export default {
  name: 'GoogleMap',
  data () {
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
      imgURL: '',
      mapStyle: {
        disableDefaultUI: true,
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f5f5'
              }
            ]
          },
          {
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161'
              }
            ]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#f5f5f5'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#bdbdbd'
              }
            ]
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#eeeeee'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e5e5e5'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#ffffff'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dadada'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e5e5e5'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#eeeeee'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#c9c9c9'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e'
              }
            ]
          }
        ]
      }
    }
  },
  props: {
    ff_list: Array,
    pv_list: Array,
    lat: Number,
    lon: Number,
    zoom: Number
  },
  mounted () {},

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    getPosition: function (marker) {
      return {
        lat: parseFloat(marker['lat']),
        lng: parseFloat(marker['lon'])
      }
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    toggleInfo: function (marker, key) {
      this.detail = marker
      this.infoPosition = this.getPosition(marker)
      this.infoContentTitle = marker.title
      this.infoContentDescription = marker.address

      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    }
  }
}
</script>

<style lang="css" scoped>
.mapList {
  max-width: 18rem;
}

.mapImg {
  padding-left: 0.4rem;
}
</style>
