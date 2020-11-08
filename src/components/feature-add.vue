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
          <!--transit_id-->
          <div class="field">
            <label class="label" for="transit_id">transit_id</label>
            <input class="input" id="transit_id" v-model="feature.transit_id" />
          </div>
          <!--device_name-->
          <div class="field">
            <label class="label" for="device_name">device_name</label>
            <input
              class="input"
              id="device_name"
              v-model="feature.device_name"
            />
          </div>
          <!--plate_number-->
          <div class="field">
            <label class="label" for="plate_number">plate_number</label>
            <input
              class="input"
              id="plate_number"
              v-model="feature.plate_number"
            />
          </div>
          <!--country-->
          <div class="field">
            <label class="label" for="country">country</label>
            <input class="input" id="country" v-model="feature.country" />
          </div>
          <!--date_time-->
          <div class="field">
            <label class="label" for="date_time">date_time</label>
            <input class="input" id="date_time" v-model="feature.date_time" />
          </div>
          <!--speed-->
          <div class="field">
            <label class="label" for="speed">speed</label>
            <input class="input" id="speed" v-model="feature.speed" />
          </div>
          <!--confidence_number-->
          <div class="field">
            <label class="label" for="confidence_number"
              >confidence_number</label
            >
            <input
              class="input"
              id="confidence_number"
              v-model="feature.confidence_number"
            />
          </div>
          <!--brand-->
          <div class="field">
            <label class="label" for="brand">brand</label>
            <input class="input" id="brand" v-model="feature.brand" />
          </div>
          <!--model-->
          <div class="field">
            <label class="label" for="model">model</label>
            <input class="input" id="model" v-model="feature.model" />
          </div>
          <!--color-->
          <div class="field">
            <label class="label" for="color">color</label>
            <input class="input" id="color" v-model="feature.color" />
          </div>
          <!--car_class-->
          <div class="field">
            <label class="label" for="car_class">car_class</label>
            <input class="input" id="car_class" v-model="feature.car_class" />
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
        transit_id: "",
        device_name: "",
        plate_number: "",
        country: "",
        date_time: "",
        speed: "",
        confidence_number: "",
        brand: "",
        model: "",
        color: "",
        car_class: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveFeature() {
      var data = {
        transit_id: this.feature.transit_id,
        device_name: this.feature.device_name,
        plate_number: this.feature.plate_number,
        country: this.feature.country,
        date_time: this.feature.date_time,
        speed: this.feature.speed,
        confidence_number: this.feature.confidence_number,
        brand: this.feature.brand,
        model: this.feature.model,
        color: this.feature.color,
        car_class: this.feature.car_class,
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
