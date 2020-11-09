<template>
  <div class="content container">

<button class="link card-footer-item" @click="printDiv('A4-form')">
        <i class="fas fa-print">Print</i>
      </button>
    <div class="A4">
      <div id="A4-form">
        <v-select dir="rtl">
          <div class="header">
            <div>
              <div class="logo">
                <p class="title">مديرية أمن الاسماعيلية</p>
                <p class="title">ادارة مرور الاسماعيلية</p>
              </div>
              <div class="lable">
                <p class="title">نموذج ١٢٥ مرور</p>
                <p class="title">تقرير مخالفة مرور</p>
              </div>
            </div>
          </div>
          <div class="receipt-container">
            <div class="column 1">
              <div class="text">
                <p>
                  <span> بتاريخ: </span>
                  <span> {{ selectedFeature.date_time }} </span>
                  &emsp;
                  <span> الساعة: </span>
                  <span> {{ selectedFeature.date_time }} </span>
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
                  <span> {{ selectedFeature.plate_number }} </span>
                </p>
                <p class="center">وصف الاتهام</p>
                <p class="center">Data</p>
                <p>
                  <span>تم سحب رخصة القيادة (</span>
                  <span>Data</span>
                  <span>)&emsp;التسيير(</span>
                  <span>{{ selectedFeature.speed }}</span>
                  <span>)</span>
                </p>
                <p>
                  <span>مدة الايقاف(</span>
                  <span>{{ selectedFeature.confidence_number }}</span>
                  <span>)&emsp;الغاء(</span>
                  <span>{{ selectedFeature.brand }}</span>
                  <span>)م</span>
                </p>
                <p>
                  <span>تم التصالح بالايصال رقم:</span>
                  <span>{{ selectedFeature.transit_id }}</span>
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
            <div class="column 2">
              <div class="text">
                <p class="center">بيانات خاصة بنيابة المرور</p>
                <p>
                  <span>بتاريخ:</span>
                  <span>{{ selectedFeature.date_time }}</span>
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
                  <span>{{ selectedFeature.device_name }} </span>
                </p>
                <p>
                  <span>رقم القضية: </span>
                  <span>{{ selectedFeature.confidence_number }}</span>
                </p>
                <p class="lefttt">وكيل النيابة</p>
              </div>
            </div>
          </div>
        </v-select>
      </div>
      
      




 
    </div>
  </div>
</template>
<style scoped>

div {
  margin-bottom: 0px;
}


.A4 {
  width: 21cm;
  height: 29.7cm;
  border-style: dashed;
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
.title {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 2pt;
}
.receipt-container {
  display: flex;
  width: 100%;
}
.column {
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


import FeatureDataService from "../services/FeatureDataService";


export default {
  
  name: "FeatureDetail",
  props: {
    selectedFeature: null,
  },

  methods: {
    printDiv(divName){
			var printContents = document.getElementById(divName).innerHTML;
			var originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;
			window.print();

			document.body.innerHTML = originalContents;

    },
    printpage() {
      window.print();
    },
    
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
  created(){
    this.printjs();
    this.printpage()

  }
};
</script>