<template>
  <div :class="className">
    <div class="websites">
      <div class="content">
        <div class="part" v-for="(i, index) of datas" :key="index">
          <div class="col-sm-12 col-md-12 col-lg-12 partTitle" :id="i._id">
            <span>{{ i._id }}</span>
            <div class="action">
              <span class="add" @click="click_showAdd({ id: i._id, flag: i.flag, parent: i.parent })">+</span>
              <i class="iconfont icon-edit2" @click="click_showEdit"></i>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3 partContent" v-for="j of i.children" :key="j._id">
            <div class="info">
              <div class="one">
                <img :src="j.icon" />
                <div class="url">
                  <a :href="j.url" target="_blank">{{ j.title }}</a>
                </div>
              </div>
              <div class="two">
                <i class="iconfont icon-edit1" @click="click_edit(j)"></i>
                <i class="iconfont icon-cuo" @click="click_delete(j)"></i>
              </div>
            </div>
          </div>
        </div>
        <Add v-if="showAdd" :showAdd="showAdd" @closeAdd="closeAdd" :info="info" />
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
      showAdd: false,
      info: {},
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
    click_showAdd(i) {
      this.showAdd = true;
      i.action = "add";
      this.info = i;
    },
    closeAdd(i) {
      this.showAdd = i;
    },
    click_showEdit() {},
    click_edit(j) {
      this.showAdd = true;
      j.action = "edit";
      this.info = j;
    },
    click_delete(j) {
      this.axios
        .post("/api/delete", { _id: j._id })
        .then((res) => {
          console.log("delete res --", res);
        })
        .catch(function (err) {
          console.log("delete err --", err);
        });
    },
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
