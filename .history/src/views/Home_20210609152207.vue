<template>
  <div class="life" style="padding-top: 100px">
    <FilterCond class="filter" :tab="{ parent: 'life' }"></FilterCond>
    <div class="contentWrapper">
      <div :style="life.datas.length == 0 ? empty.show : empty.hide">{{ empty.info }}</div>
      <div class="content col-xs-12 col-sm-6" v-for="(i, index) of life.datas" :key="index" @click="clickArticle(i)">
        <img :src="i.imgUrl" :alt="i.title" />
        <div class="info">
          <b>{{ i.title }}</b>
          <Tags :tags="i.tags"></Tags>
          <span class="desc"> {{ i.abstracts }}</span>
          <div class="read">
            <span>{{ i.createdDate }}</span>
            <span>Read</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page" :key="page.skip">
      <el-pagination layout="prev, next, jumper" :total="life.total" :current-page="page.skip" :page-size="page.limit" @current-change="handleCurrentPage"> </el-pagination>
      <span class="total"> / 共 {{ Math.ceil(life.total / page.limit) }} 页</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import FilterCond from "@/components/FilterCond";
import Tags from "@/components/Tags";
export default {
  name: "Life",
  components: {
    FilterCond,
    Tags,
  },
  props: {},
  data() {
    return {
      empty: {
        info: "there is no data for Life page, please check the database or network !",
        show: {
          display: "block",
          "text-align": "center",
          "margin-top": "200px",
        },
        hide: {
          display: "none",
        },
      },
      // page: {
      //   current: 1,
      //   size: 2,
      // },
    };
  },
  watch: {},
  computed: {
    ...mapState({
      life: (state) => state.life.res,
      page: (state) => state.life.req,
    }),
  },
  methods: {
    ...mapMutations(["SET_PARAMS_DEFAULT", "SET_PARAMS", "SET_SHOW_FOOTER"]),
    ...mapActions(["getArticles"]),
    clickArticle(i) {
      this.$router.push({
        name: "article",
        params: { tab: "life", title: i.title },
      });
      this.SET_SHOW_FOOTER({ showFooter: false });
    },
    handleCurrentPage(val) {
      this.SET_PARAMS({ parent: "life", skip: val });
      this.getArticles("life");
    },
  },
  created() {},
  mounted() {
    this.getArticles("life");
  },
  unmounted() {
    this.SET_PARAMS_DEFAULT("life");
  },
};
</script>

<style lang="less">
@import url("../assets/allCss、Life.less");
</style>
