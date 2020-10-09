<template>
<!--Page Title-->
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">ToDo List</h2>
    </div>
<!--Card No.1-->
    <div class="columns">
      <div class="column is-3">
<!--Card Header-->
        <header class="card-header">
          <p class="card-header-title">Features List</p>
        </header>
<!--Card List-->
        <ul class="list ">
          <!--loop over the items in features list-->
          <li v-for="feature in features" :key="feature.id">  
            <a 
            class="list-item" 
            @click="selectedFeature = feature"
            :class="{'lineThrough': feature.done == true , 'is-active':selectedFeature == feature, 
            'is-activeAndDone':(selectedFeature == feature & feature.done == true)}">
              <span>{{feature.name}}</span>
              </a>
          </li>
        </ul>
      </div>
       <div class="column is-3" v-if="selectedFeature">
<!--Card Header-->
        <header class="card-header">
          <p class="card-header-title" >{{ selectedFeature.name }}</p>
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
              <input
                class="input"
                id="name"
                v-model="selectedFeature.name"
              />
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
            <div class="field"  v-show="showMore">
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
          </div>
        </div>
       </div>
    </div>
<!--Card No.2-->
    <!--Appears only if selectedFeature is not undefined-->
   </div>

</template>

<script>
export default {

  name: 'Features',
  data() {
    return {

      selectedFeature: undefined,
      showMore:false,
      features: [
        {
          id: 10,
          name: 'Binding',   
          description: 'Property binding',
          done:false
        },
        {
          id: 20,
          name: 'Todo List',
          description: 'List of items',
          done:false
        },
        {
          id: 30,
          name: 'Show More',
          description: 'CheckBox to show hidden fields',
          done:false
        },
        {
          id: 40,
          name: 'Done',
          description: 'CheckBox to mark done items',
          done:false
        },{
          id: 50,
          name: 'Escape Button',
          description: 'Methods to reset "Show More" and "Done"',
          done:false
        },
      ],
    };  
  },

  methods: {
    clearShowMore() {
      this.showMore = false;
    },
    clearDone() {
      this.selectedFeature.done = false;
    },
  },
};
</script>



