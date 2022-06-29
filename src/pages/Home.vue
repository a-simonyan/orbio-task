<template>
  <div class="main">
    <div class="main__search">
      <v-text-field
        rounded
        dense
        outlined
        hide-details
        color="#111d30"
        prepend-inner-icon="mdi-magnify"
        placeholder="Type/Subtype"
        @keyup.enter="filterFeatures"
        v-model.trim="search"
      ></v-text-field>
    </div>
    <yandex-map
      class="main__map pt-16"
      ref="map"
      :coords="coords"
      :zoom="zoom"
      :controls="controls"
      :detailed-controls="detailedControls"
    >
      <ymap-marker
        v-for="(polygon, index) in featuresList.features"
        :key="`polygon_${index}`"
        :coords="polygon.geometry.coordinates"
        :markerId="index"
        :hint-content="`Feature: ${polygon.id}`"
        :marker-fill="markerFill"
        :properties="polygon.properties"
        :marker-stroke="markerStroke"
        :marker-type="polygon.geometry.type"
      >
        <div slot="balloon">
          <div class="main__map--balloon">
            <div class="main__map--balloon__title">
              Feature #{{ polygon.id }}
            </div>
            <v-divider class="mt-1 mb-3"></v-divider>
            <div class="main__map--balloon__content">
              <div
                class="main__map--balloon__content--item"
                v-for="(property, key, idx) in polygon.properties"
                :key="`property_${idx}`"
              >
                <div class="mb-2" v-if="!Array.isArray(property)">
                  <span class="key">{{ key.replaceAll("_", " ") }}</span> -
                  <span class="value" :class="{ 'no-info': !property }">{{
                    property ? property : "No Info"
                  }}</span>
                </div>
                <div v-else class="mb-2">
                  <span class="key">{{ key.replaceAll("_", " ") }}</span> -
                  <span class="value" :class="{ 'no-info': !property.length }">
                    {{ property.length ? property.join(", ") : "No Info" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ymap-marker>
    </yandex-map>
    <div v-if="isLoadingAssets" class="main__overlay-loader">
      <v-progress-circular
        color="#04a777"
        size="50"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-snackbar color="orange" v-model="showNoDataSnackbar">
      <span class="no-data">No Data Found With Requested Parameters</span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data: () => ({
    coords: [46.95179297, 64.404501],
    zoom: 10,
    isLoadingAssets: false,
    controls: ["searchControl", "zoomControl"],
    detailedControls: {
      searchControl: {
        noPlacemark: true,
      },
    },
    featuresList: {},
    featuresListCopy: {},
    markerStroke: { color: "#04a777", width: 3 },
    markerFill: { color: "#04a777", opacity: 0.4 },
    search: null,

    showNoDataSnackbar: false,
  }),

  methods: {
    getAssets() {
      this.isLoadingAssets = true;
      this.axios
        .get("assets/features")
        .then(({ data }) => {
          this.featuresList = data;
          this.featuresListCopy = JSON.parse(JSON.stringify(data)); // Copying Object;
        })
        .finally(() => {
          this.isLoadingAssets = false;
        });
    },
    filterFeatures() {
      if (!this.search) {
        this.featuresList = this.featuresListCopy;
      } else {
        this.featuresList.features = [...this.featuresListCopy.features].filter(
          (el) =>
            el.properties.type
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            el.properties.subtype
              .toLowerCase()
              .includes(this.search.toLowerCase())
        );
        if (!this.featuresList.features.length) {
          this.showNoDataSnackbar = true;
        }
      }
    },
  },

  created() {
    this.getAssets();
  },
};
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  &__search {
    width: 330px;
    position: absolute;
    top: 74px;
    right: 10px;
    z-index: 99999;
    border-radius: 18px;
    background: white;
  }
  &__map {
    height: 100%;

    &--balloon {
      width: 350px;

      &__title {
        font-size: 18px;
        font-weight: 700;
      }

      &__content {
        &--item {
          font-size: 16px;
          text-transform: capitalize;
          .key {
            font-weight: 600;
            color: #111d30;
          }
          .value {
            color: #2b70d6;

            &.no-info {
              font-style: italic;
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  &__overlay-loader {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.36);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999999;
    display: grid;
    place-items: center;
    place-content: center;
  }
  .no-data {
    color: white;
  }
}
</style>
