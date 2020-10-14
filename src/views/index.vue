<template>
  <!--Page Title-->
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">ToDo List</h2>
      <router-link tag="button" class="button add-button" :to="{ name: 'add' }">
        <i class="fas fa-plus"></i>
      </router-link>

      <!--Card No.1-->
      <div class="columns">
        <div class="column is-3">
          <!--Card Header-->
          <header class="card-header">
            <p class="card-header-title">Features List</p>
          </header>
          <div class="notification is-info" v-show="message">{{ message }}</div>
          <!--Card List-->
          <ul class="list">
            <!--loop over the items in features list-->
            <li v-for="feature in features" :key="feature.id">
              <a
                class="list-item"
                @click="setActiveFeature(feature, index)"
                :class="{
                  lineThrough: feature.done == true,
                  'is-active': selectedFeature == feature,
                  active: index == currentIndex,
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
        <!-- <div class="column is-3" v-if="selectedFeature" >
        <det :selectedFeature="selectedFeature" />
         </div> -->

        <div class="column is-3" v-if="selectedFeature">
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
                <input
                  class="input"
                  id="name"
                  v-model="selectedFeature.name"
                  readonly
                />
              </div>
              <!--Description-->
              <div class="field">
                <label class="label" for="description">description</label>
                <textarea
                  class="input"
                  id="description"
                  type="text"
                  v-model="selectedFeature.description"
                  readonly
                />
              </div>
              <!--Done-->
              <!-- <div>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model="selectedFeature.done"
                @keyup.esc="clearDone"
                @change="retrieveFeatures()"


              />
              Done
            </label>
          </div> -->
              <!--Card Footer-->
              <footer class="card-footer">
                <button
                  class="link card-footer-item cancel-button"
                  @click="deleteFeature()"
                >
                  <i class="fas fa-undo"></i>
                  <span>Delete</span>
                </button>

                <button
                  class="link card-footer-item"
                  @click="redirect('/features/' + selectedFeature.id)"
                >
                  <i class="fas fa-edit"></i>
                  <span>Edit</span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      
      
      </div>
    </div>
  </div>
</template>

<script>
import FeatureDataService from "../services/FeatureDataService";

export default {
  name: "Features",
  data() {
    return {
      features: [],
      selectedFeature: null,
      currentIndex: -1,
      message: "",
    };
  },
  async created() {
    await this.retrieveFeatures();
  },
  methods: {
    retrieveFeatures() {
      this.message = "Getting Features from database, please be patient!";
      FeatureDataService.getAll()
        .then((response) => {
          this.features = response.data;
          console.log(response.data);
          this.message =''
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveFeatures();
      this.selectedFeature = null;
      this.currentIndex = -1;
    },

    setActiveFeature(feature, index) {
      this.selectedFeature = feature;
      this.currentIndex = index;
    },

    removeAllFeatures() {
      FeatureDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      FeatureDataService.findByTitle(this.title)
        .then((response) => {
          this.features = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteFeature() {
      FeatureDataService.delete(this.selectedFeature.id)
        .then((response) => {
          console.log(response.data);
          this.retrieveFeatures();
          this.selectedFeature = null;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    redirect(url) {
      this.$router.push(url);
    },
  },
  updateFeature() {
    FeatureDataService.update(this.selectedFeature.id, this.selectedFeature)
      .then((response) => {
        console.log(response.data);
        this.message = "The feature was updated successfully!";
        this.retrieveFeatures();
        this.selectedFeature = null;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  //   handleDone(Value) {
  // const value = Value;
  // switch (value) {
  //   case 0:
  //     this.selectedFeature.done = false;
  //     this.updateFeature();
  //     break;
  //   case 1:
  //     this.selectedFeature.done = true;
  //     this.updateFeature();
  //     break;

  // }
  // },

  computed: {
    //...mapState({features: 'features'}),
    //...mapState(["features"]),
  },
  mounted() {
    this.retrieveFeatures();
  },
  // watch: {
  //   'selectedFeature.done': {
  //     immediate: true,
  //     handler(newValue) {
  //       this.handleDone(newValue);

  //     },
  //     selectedFeature:null,
  //   },
  // }
};
</script>



