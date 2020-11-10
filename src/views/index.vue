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
            <li v-for="(feature, index) in features" :key="feature.id">
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
                <span>{{ feature.device_name }}</span>
              </a>
            </li>
          </ul>
          <footer class="card-footer">
            <button class="link card-footer-item" @click="printDiv('printable')">
              <i class="fas fa-print"></i>
              <span>Print All</span>
            </button>
          </footer>
        </div>
        <!-- POPOUT -->
        
        <q-dialog v-model="alert" v-if="selectedFeature">
          <q-card>
            <q-card-section>
              <div class="text-h6">Alert</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              repellendus sit voluptate voluptas eveniet porro. Rerum
              blanditiis perferendis totam, ea at omnis vel numquam
              exercitationem aut, natus minima, porro labore.
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      
        <!--Card No.2-->
        <!--Appears only if selectedFeature is not undefined-->

        <div class="column is-3" v-if="selectedFeature">
          <!--Card Header-->
          <header class="card-header">
            <p class="card-header-title">{{ selectedFeature.name }}</p>
          </header>
          <!--Card Content-->
          <div class="card-content">
            <div class="content">
              <div id="printJS-form">
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
              </div>
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
              <footer class="card-footer">
                <button
                  class="link card-footer-item"
                  @click="redirect('/print/' + selectedFeature.id)"
                >
                  <!-- @click="printjs2()" -->
                  <i class="fas fa-print"></i>
                  <span>Print Preview</span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <!-- loooooooop -->
      <div id="printable">
       <div id="loop" v-for="feature in features" :key="feature.id">
     
      <div class="A4">
        <div id="A4-form">
          <v-select dir="rtl">
            <div class="header">
              <div>
                <div class="logo">
                  <p class="titles">مديرية أمن الاسماعيلية</p>
                  <p class="titles">ادارة مرور الاسماعيلية</p>
                </div>
                <div class="lable">
                  <p class="titles">نموذج ١٢٥ مرور</p>
                  <p class="titles">تقرير مخالفة مرور</p>
                </div>
              </div>
            </div>
            <div class="receipt-container">
              <div class="columnn 1">
                <div class="text">
                  <p>
                    <span> بتاريخ: </span>
                    <span> {{ feature.date_time }} </span>
                    &emsp;
                    <span> الساعة: </span>
                    <span> {{ feature.date_time }} </span>
                    &emsp;
                    <span> :بجهة </span>
                    <span>Data</span>
                  </p>
                  <p>
                    <span> اسم المخالف: </span>
                    <span> Data </span>
                    &emsp;
                    <span> عنوانه: </span>
                    <span> Data </span>
                  </p>
                  <p>
                    <span> رقم رخصة القيادة: </span>
                    <span> Data </span>
                    &emsp;
                    <span> نوعها و جهة صدورها: </span>
                    <span> Data </span>
                  </p>
                  <p>
                    <span> رقم المركبة: </span>
                    <span> {{ feature.plate_number }} </span>
                  </p>
                  <p class="center">وصف الاتهام</p>
                  <p class="center">Data</p>
                  <p>
                    <span>تم سحب رخصة القيادة (</span>
                    <span>Data</span>
                    <span>)&emsp;التسيير(</span>
                    <span>{{ feature.speed }}</span>
                    <span>)</span>
                  </p>
                  <p>
                    <span>مدة الايقاف(</span>
                    <span>{{ feature.confidence_number }}</span>
                    <span>)&emsp;الغاء(</span>
                    <span>{{ feature.brand }}</span>
                    <span>)م</span>
                  </p>
                  <p>
                    <span>تم التصالح بالايصال رقم:</span>
                    <span>{{ feature.transit_id }}</span>
                  </p>
                  <p>
                    <span>اسم و رتبة شاهد المخالفة:</span>
                    <span>Data</span>
                    &emsp;
                    <span>التوقيع:</span>
                    <span>Data</span>
                  </p>
                </div>
              </div>
              <div class="columnn 2">
                <div class="text">
                  <p class="center">بيانات خاصة بنيابة المرور</p>
                  <p>
                    <span>بتاريخ:</span>
                    <span>{{ feature.date_time }}</span>
                  </p>
                  <p>
                    <span>نحن:</span>
                    <span>Data </span>
                    &emsp;
                    <span>نحن</span>
                  </p>
                  <p>
                    <span>القائم بأعمال نيابة المرور </span>
                    <span>Data</span>
                    &emsp;
                    <span>نأمر بتغريم المخالف</span>
                  </p>
                  <p>
                    <span>مبلغ:</span>
                    <span>Data </span>
                    <span>قرش</span>
                  </p>
                  <p>
                    <span>كود المخالفة: </span>
                    <span>{{ feature.device_name }} </span>
                  </p>
                  <p>
                    <span>رقم القضية: </span>
                    <span>{{ feature.confidence_number }}</span>
                  </p>
                  <p class="lefttt">وكيل النيابة</p>
                </div>
              </div>
            </div>
          </v-select>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
@media print{
  #A4-form{page-break-after: always;}
}
div {
  margin-bottom: 0px;
}
.A4 {
  width: 21cm;
  padding: 10px;
  font-family: "Times New Roman", Times, serif;
}
.logo {
  text-align: right;
  margin-left: 7%;
  margin-top: 5px;
}
.lable {
  text-align: center;
}
.titles {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 2pt;
}
.receipt-container {
  display: flex;
  width: 100%;
}
.columnn {
  display: flex;
  width: 100%;
  border-style: solid;
  padding: 10px;
}
div .text {
  font-size: 10pt;
  font-weight: bold;
  margin: 1pt;
}
.center {
  text-align: center;
  float: inline-end;
  margin-left: auto;
  margin-right: auto;
}
.lefttt {
  float: left;
}
.righttt {
  text-align: right;
  float: right;
}
</style>

<script>
import print from "print-js";
import FeatureDataService from "../services/FeatureDataService";
import { mapActions, mapState } from "vuex";
export default {
  name: "Features",
  data() {
    return {
      // features: [],
      selectedFeature: null,
      currentIndex: -1,
      message: "",
    };
  },
  async created() {
    await this.retrieveFeatures();
  },
  methods: {
    printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();

      document.body.innerHTML = originalContents;
    },
    printjs() {
      print({
        printable: this.features,
        properties: ["name", "done", "description"],
        type: "json",
      });
    },
    printjs2() {
      print("printJS-form", "html");
    },
    ...mapActions(["getFeaturesAction"]),
    retrieveFeatures() {
      this.message = "Getting Features from database, please be patient!";
      this.getFeaturesAction();
      this.message = "";
    },

    setActiveFeature(feature, index) {
      this.selectedFeature = feature;
      this.currentIndex = index;
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

  computed: {
    ...mapState(["features"]),
  },
  mounted() {
    this.retrieveFeatures();
  },
};
</script>



