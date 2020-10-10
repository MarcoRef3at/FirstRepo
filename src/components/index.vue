<template>
  <!--Page Title-->
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">ToDo List</h2>

      <!--Card No.1-->
      <div class="columns" v-if="!editing">
        <div class="column is-3" >
          <!--Card Header-->
          <header class="card-header">
            <p class="card-header-title">
              Features List
              <button class="button add-button fas fa-plus"></button>
            </p>
          </header>
          <!--Card List-->
          <ul class="list" v-if="!editing">
            <!--loop over the items in features list-->
            <li v-for="feature in features" :key="feature.id">
              <a
                class="list-item"
                @click="selectedFeature = feature"
                :class="{
                  lineThrough: feature.done == true,
                  'is-active': selectedFeature == feature,
                  'is-activeAndDone':
                    (selectedFeature == feature) & (feature.done == true),
                }"
              >
                <span>{{ feature.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!--Card No.2-->
        <!--Appears only if selectedFeature is not undefined-->

        <div class="column is-3" v-if="selectedFeature" >
          <!--Card Header-->
          <header class="card-header" >
            <p class="card-header-title">{{ selectedFeature.name }}</p>
          </header>
          <!--Card Content-->
          <div class="card-content">
            <div class="content">
              <div class="field">
                <!--id-->
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>
                  {{ selectedFeature.id }}
                </label>
              </div>
              <!--Name-->
              <div class="field">
                <label class="label" for="name">Name</label>
                <input class="input" id="name" v-model="selectedFeature.name" />
              </div>
              <!--ShowMore-->
              <label class="checkbox">
                <input
                  type="checkbox"
                  v-model="showMore"
                  @keyup.esc="clearShowMore"
                />
                Show More
              </label>
              <!--Description-->
              <!--Hidden until showMore is active-->
              <div class="field" v-show="showMore">
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
                  class="link card-footer-item"
                  @click="editFeature(selectedFeature)"
                >
                  <i class="fas fa-check"></i>
                  <span>Delete</span>
                </button>
                <button class="link card-footer-item"
                @click="editMethod(selectedFeature)">
                  <i class="fas fa-check"></i>
                  <span>Edit</span>
                </button>
              </footer>
            </div>
          </div>
        </div>
        </div>
         <edit 
         v-if="editing" 
         :selectedFeature="selectedFeature"
         @cancel="cancelFeature"
          @save="saveFeature"
          />
        
      
    </div>
  </div>
</template>

<script>
//import FeatureDetails from "@/components/feature-detail";
import edit from "@/components/feature-template";
const ourFeatures = [
  {
    id: 10,
    name: "Binding",
    description: "Property binding",
    done: false,
  },
  {
    id: 20,
    name: "Todo List",
    description: "List of items",
    done: false,
  },
  {
    id: 30,
    name: "Show More",
    description: "CheckBox to show hidden fields",
    done: false,
  },
  {
    id: 40,
    name: "Done",
    description: "CheckBox to mark done items",
    done: false,
  },
  {
    id: 50,
    name: "Escape Button",
    description: 'Methods to reset "Show More" and "Done"',
    done: false,
  },
];
export default {
  name: "Features",
  data() {
    return {
      features: ourFeatures,
      selectedFeature: undefined,
      editing:undefined,
      showMore: false,
    };
  },
  components: {  edit },
  methods: {
    clearShowMore() {
      this.showMore = false;
    },
    clearDone() {
      this.selectedFeature.done = false;
    },
    // Fake Database loading -------------------------------------------------------------------------------------------------------------------------------DON'T FORGET TO CHANGE ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    async getFeatures() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(ourFeatures), 1000);
        // return ourFeatures
      });
    },
    async loadFeatures() {
      this.features = [];
      this.message = "Loading please wait";
      this.features = await this.getFeatures();
      this.message = "";
    },
    editFeature(feature) {
      this.editedFeature = feature;
    },
    editMethod(feature){
      this.editing = feature;
    },
    cancelFeature(){
    this.selectedFeature = undefined;
    this.editing=undefined;
  },
  saveFeature(feature){
    const index = this.features.findIndex(h => h.id === feature.id);
      this.features.splice(index, 1, feature);
      this.features = [...this.features];
      this.selectedFeature = undefined;
      this.editing=undefined;
  },
  },
  
};
</script>



