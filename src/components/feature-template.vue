<template>
  <div class="columns">
    <div class="column is-8">
      <!--Card Header-->
      <header class="card-header">
        <p class="card-header-title">{{ ClonedFeature.name }}</p>
      </header>
      <!--Card Content-->
      <div class="card-content">
        <div class="content">
          <div class="field">
            <!--id-->
            <label class="label" for="id">id</label>
            <label class="input" id="id" readonly>
              {{ ClonedFeature.id }}
            </label>
          </div>
          <!--Name-->
          <div class="field">
            <label class="label" for="name">Name</label>
            <input class="input" id="name" v-model="ClonedFeature.name" />
          </div>
          <!--Description-->
          <div class="field">
            <label class="label" for="description">description</label>
            <textarea
              class="input"
              id="description"
              type="text"
              v-model="ClonedFeature.description"
            />
          </div>
          <!--Done-->
          <div>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model="ClonedFeature.done"
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
  </div>
</template>
<script>
export default {
  name: "FeatureDetail",
  props: {
    selectedFeature: {
      type: Object,
      default: () => {},
    },
  //passing object in Props to prevent changing data from child to parent
   
  },data() {
     return {
       ClonedFeature: { ...this.selectedFeature},
     }
   },
  methods: {
    
    clearDone() {
      this.ClonedFeature.done = false;
    },
    cancelFeature() {
     this.$emit('cancel');
    },
    saveFeature() {
        this.$emit('save',this.ClonedFeature);
    },
  }
};
</script>
