<template>
  <div class="columns">
    <div class="column is-8" v-if="selectedFeature">
      <!--Card Header-->
      <header class="card-header">
        <p class="card-header-title">{{ selectedFeature.name }}</p>
      </header>
      <!--Card Content-->
      <div class="card-content">
        <div class="content">
          <!--Name-->
          <div class="field">
            <label class="label" for="name">Name</label>
            <input class="input" id="name" v-model="selectedFeature.name" />
          </div>
          <!--Description-->
          <div class="field">
            <label class="label" for="description">description</label>
            <textarea
              class="input"
              id="description"
              type="text"
              v-model="selectedFeature.description"
            />
          </div>
          <!--Done-->
          <div>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model="selectedFeature.done"
                @keyup.esc="clearDone"
              />
              Done
            </label>
          </div>
          <!--Card Footer-->
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelFeature()"
            >
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="updateFeature">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FeatureDataService from "../services/FeatureDataService";
export default {
  name: "FeatureDetail",
  props: {
    selectedFeature: null,
  },
  methods: {
    getFeature(id) {
      FeatureDataService.get(id)
        .then((response) => {
          this.selectedFeature = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateFeature() {
      FeatureDataService.update(this.selectedFeature.id, this.selectedFeature)
        .then((response) => {
          console.log(response.data);
          this.message = "The feature was updated successfully!";
          this.$router.push({ name: "features" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    clearDone() {
      this.selectedFeature.done = false;
    },
    cancelFeature() {
      this.$router.push({ name: "features" });
    },
  },
  mounted() {
    this.getFeature(this.$route.params.id);
  },
};
</script>
