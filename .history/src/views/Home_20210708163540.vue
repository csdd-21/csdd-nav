<template>
  <div :class="className">
    <div class="wrapper">
      <div class="menuWrapper" id="menuWrapper">
        <div class="header" id="header">
          <i class="iconfont icon-back" @click="clickHide"></i>
          <a href="/">CSDD-NAV</a>
        </div>
        <div class="menu" id="menu">
          <div style="height: 5vh"></div>
          <div style="height: 90vh; width: 100%">
            <div class="menuTab" id="menuTab" v-for="(i, index) of menus" :key="i._id" @click="clickMenu(index)">
              <i class="iconfont icon-fuzhushuxian">
                <span>{{ i._id }}</span>
              </i>
            </div>
          </div>
        </div>
        <div class="subMenu">
          <div class="subMenuHeader"><i class="iconfont icon-back" @click="clickBack" v-if="show.sub"></i><a href="/" v-if="show.sub">CSDD</a></div>
          <a class="subMenuTab" v-for="i of subMenus" :key="i._id" :href="'#' + i.title">{{ i.title }}</a>
          <div class="subMenuFooter" v-if="show.sub">
            <Theme />
            <i class="iconfont icon-zhongwen" v-if="show.cn" @click="clickLanguage"></i>
            <i class="iconfont icon-yingwen" v-if="show.en" @click="clickLanguage"></i>
            <More />
          </div>
        </div>
        <div class="footer" id="footer">
          <Theme />
          <i class="iconfont icon-zhongwen" v-if="show.cn" @click="clickLanguage"></i>
          <i class="iconfont icon-yingwen" v-if="show.en" @click="clickLanguage"></i>
          <el-tooltip class="item" effect="dark" content="goto github to see code" placement="top">
            <a href="https://github.com/csdd-21" target="_blank"><i class="iconfont icon-github"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="goto csdd blog" placement="top">
            <a href="https://github.com/csdd-21/csdd-blog" target="_blank"><i class="iconfont icon-blog"></i></a>
          </el-tooltip>
        </div>
      </div>
      <div class="contentWrapper" id="contentWrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Theme from "../components/Theme.vue";
import More from "../components/More.vue";
export default {
  name: "Home",
  components: { More, Theme },
  props: {},
  data() {
    return {
      menus: [],
      subMenus: [],
      show: {
        sub: false,
        cn: true,
        en: false,
      },
    };
  },
  watch: {},
  computed: {
    ...mapState(["themeId", "language"]),
    className() {
      switch (this.themeId) {
        case 0:
          return "home_bright";
        case 1:
          return "home_warm";
        case 2:
          return "home_dark";
      }
    },
  },
  methods: {
    ...mapMutations([ "CHANGE_LANGUAGE"]),
    clickHide() {
      document.getElementById("header").style.display = "none";
      document.getElementById("menu").style.display = "none";
      document.getElementById("footer").style.display = "none";
      document.getElementById("contentWrapper").style.width = "92%";
      this.show.sub = true;
    },
    clickBack() {
      document.getElementById("header").style.display = "block";
      document.getElementById("menu").style.display = "block";
      document.getElementById("footer").style.display = "flex";
      document.getElementById("contentWrapper").style.width = "84%";
      this.show.sub = false;
    },
    changeFontColor(n) {
      for (let i = 0; i < this.menus.length; i++) {
        menuTab[i].style["font-weight"] = "500";
      }
      menuTab[n].style["font-weight"] = "700";
    },
    clickMenu(i) {
      this.subMenus = this.menus[i].children;
      switch (i) {
        case 0:
          this.changeFontColor(0);
          this.$router.push({ name: "websites" });
          break;
        case 1:
          this.changeFontColor(1);
          this.$router.push({ name: "githubs" });
          break;
        case 2:
          this.changeFontColor(2);
          this.$router.push({ name: "studies" });
          break;
        case 3:
          this.changeFontColor(3);
          this.$router.push({ name: "tests" });
          break;
      }
    },
    clickLanguage() {
      this.show.cn = !this.show.cn;
      this.show.en = !this.show.en;
      if (this.show.cn) {
        this.CHANGE_LANGUAGE("cn");
        this.$message({
          message: "已切换至中文模式",
          type: "info",
          customClass: "infoBox",
        });
      } else {
        this.CHANGE_LANGUAGE("en");
        this.$message({
          message: "change language to English successfully",
          type: "info",
          customClass: "infoBox",
        });
      }
    },
  },
  created() {},
  mounted() {
    this.$router.push({ name: "websites" });
    this.axios
      .get("/api/menu")
      .then((res) => {
        console.log("home axios res --", res);
        if (res.data.status == 200) {
          this.menus = JSON.parse(JSON.stringify(res.data.data));
          this.subMenus = this.menus[0].children;
        }
      })
      .catch((err) => {
        console.error("home axios err --", err);
      })
      .then(function () {});
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Home.less");
</style>
