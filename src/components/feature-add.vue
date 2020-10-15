<template>
  <div class="columns">
    <div class="column is-8" v-if="!submitted">
      <!--Card Header-->
      <header class="card-header">
        <p class="card-header-title">Add Feature</p>
      </header>
      <!--Card Content-->
      <div class="card-content">
        <div class="content">
          <!--Name-->
          <div class="field">
            <label class="label" for="name">Name</label>
            <input class="input" id="name" v-model="feature.name" />
          </div>
          <!--Description-->
          <div class="field">
            <label class="label" for="description">description</label>
            <textarea
              class="input"
              id="description"
              type="text"
              v-model="feature.description"
            />
          </div>
          <!--Done-->
          <div>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model="feature.done"
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
            <button class="link card-footer-item" @click="saveFeature()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>
<script>
import FeatureDataService from "../services/FeatureDataService";
export default {
  name: "FeatureAdd",
  data() {
    return {
      feature: {
        id: null,
        name: "",
        description: "",
        done: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveFeature() {
      var data = {
        name: this.feature.name,
        description: this.feature.description,
        done: this.feature.done,
      };

      FeatureDataService.create(data)
        .then((response) => {
          this.feature.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
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
};
</script>
