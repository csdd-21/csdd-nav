<template>
  <div :class="className">
    <div class="websites">
      <div class="content">
        <div class="part" v-for="(i, index) of datas" :key="index">
          <div class="col-sm-12 col-md-12 col-lg-12 partTitle" :id="i._id">
            <span>{{ i._id }}</span>
            <span class="addBtn" @click="clickAdd({ id: i._id, flag: i.flag })">+</span>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3 partContent" v-for="j of i.children" :key="j._id">
            <a :href="j.url" target="_blank">
              <div class="info">
                <div class="imgWrapper"><img :src="j.icon" /></div>
                <span>{{ j.title }}</span>
              </div>
            </a>
          </div>
        </div>
        <Add v-if='showAdd' :showAdd='showAdd' @closeAdd='closeAdd' :info='info'/>
      </div>
      <div class="footer" id="end">
        <hr />
        The end of current page !
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Add from "../components/Add.vue";
export default {
  name: "Websites",
  components: { Add },
  props: {},
  data() {
    return {
      datas: [],
      showAdd:true,
      info:{}
    };
  },
  watch: {
    language() {
      this.getDatas("/api/data/" + this.language);
    },
  },
  computed: {
    ...mapState(["themeId", "language"]),
    className() {
      switch (this.themeId) {
        case 0:
          return "websites_bright";
        case 1:
          return "websites_warm";
        case 2:
          return "websites_dark";
      }
    },
  },
  methods: {
    getDatas(url) {
      this.axios
        .get(url)
        .then((res) => {
          console.log("axios get websites file res --", res);
          this.datas = JSON.parse(JSON.stringify(res.data));
        })
        .catch(function (err) {
          console.error("axios get websites file err --", err);
        })
        .then(function () {});
    },
    clickAdd(i) {
      this.showAdd = true;
      this.info = i
      console.log('iiiii',i);
      
    },
    closeAdd(i){
      this.showAdd = i;
    }
  },
  created() {},
  mounted() {
    console.log("websites mounted");
    this.getDatas("/api/data/" + this.language);
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/allCss/Websites.less");
</style>
