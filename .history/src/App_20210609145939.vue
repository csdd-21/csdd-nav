<template>
  <div id="app">
    <el-container id="content">
      <div class="navSm">
        <div class="nav">
          <span class="col-xs-10 test"><span @click="clickHome">CSDD-plugin</span></span>
          <span class="col-xs-2">
            <i class="iconfont icon-daohang1" @click="showNav = true"></i>
          </span>
        </div>
        <div class="navTabs" v-show="showNav">
          <i class="iconfont icon-guanbi" @click="showNav = false"></i>
          <span @click="clickNavTab('home')">Home</span>
          <span @click="clickNavTab('about')">About</span>
        </div>
      </div>
      <el-header>
        <div class="navLg">
          <span class="imgWrapper" @click="clickHome"> 前端插件库</span>
          <el-tabs v-model="tab" @tab-click="clickElTab">
            <el-tab-pane label="home" name="home" key="home"></el-tab-pane>
            <el-tab-pane label="About" name="about" key="about"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <router-view style="min-height: 80vh; padding-bottom: 80px" :key="routerKey" />
      <el-footer > Made with csdd - <a href="https://github.com/csdd-21?tab=repositories" target="_blank"> Click here to enter github</a> <i class="iconfont icon-github"></i></el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      tab: "home",
      routerKey: "",
      showNav:false,
    };
  },
  watch: {
    routerKey(val) {
      return this.$route.path + Date.now();
    },
    tab(val) {
      window.sessionStorage.setItem("tab", val);
    },
  },
  computed: { },
  components: {},
  methods: {
    ...mapMutations(["SET_SHOW_FOOTER"]),
    clickHome() {
      this.$router.push("/home");
      this.tab = "home";
    },
    clickNavTab(i) {
      this.$router.push({ name: i });
      this.showNav = false;
    },
    clickElTab(tab, event) {
      this.$router.push({ name: JSON.parse(JSON.stringify(this.tab)) });   
    },
  },
  created() {
    this.tab = window.sessionStorage.getItem("tab") || this.tab;
  },
  mounted() { },
};
</script>
