<template>
  <div id="map">
    <router-link :to="{ name: 'Create' }" class="button is-success mx-5 my-5">AJOUTER UN BAR</router-link>
    <div id="container" class="container" style="height:70vh"></div>
  </div>
</template>

<script>
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import Mapbox from "mapbox-gl";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  name: "BaseMap",
  components: {},
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoibmFoZWxvdSIsImEiOiJjazUxOG9yNDcwcDUyM3NtaTVzMnd5ejdrIn0.hFTRn-SVqOhufKAcRCnYLA",
      mapStyle: "mapbox://styles/nahelou/cjzokkh6s0rq31cqnu7blj9bd",
      coordinates: [-1.549668, 48.014],
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      container: "container",
      style: this.mapStyle,
      center: this.coordinates,
      zoom: 9,
    });
    map.on("load", () => {
      const { layers } = map.getStyle();

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
        }
      }

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });
  },

  created() {
    this.mapbox = Mapbox;
  },
};
</script>

<style>
</style>
