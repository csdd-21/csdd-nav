<template>
  <div :class="themeId == 0 ? 'home_bright' : 'home_warm'">
    <div class="wrapper">
      <div class="menuWrapper" id="menuWrapper">
        <div class="header" id="header">
          <i class="iconfont icon-back" @click="click_hide"></i>
          <a href="/">CSDD-NAV</a>
        </div>
        <div class="menu" id="menu">
          <div style="height: 5vh"></div>
          <div style="height: 90vh; width: 100%">
            <div class="menuTab" id="menuTab" v-for="(i, index) of menus" :key="i._id" @click="click_menu(index)">
              <i class="iconfont icon-fuzhushuxian">
                <span>{{ i._id }}</span>
              </i>
            </div>
          </div>
        </div>
        <div class="subMenu">
          <div class="subMenuHeader"><i class="iconfont icon-back" @click="click_back" v-if="show.sub"></i><a href="/" v-if="show.sub">CSDD</a></div>
          <a class="subMenuTab" v-for="i of subMenus" :key="i._id" :href="'#' + i.title">{{ i.title }}</a>
          <div class="subMenuFooter" v-if="show.sub">
            <Theme />
            <el-tooltip class="item" effect="dark" content="change language" placement="top">
              <i class="iconfont icon-zhongwen" v-if="show.cn" @click="click_language"></i>
              <i class="iconfont icon-yingwen" v-if="show.en" @click="click_language"></i>
            </el-tooltip>
            <More />
          </div>
        </div>
        <div class="footer" id="footer">
          <Theme />
          <el-tooltip class="item" v-if="show.cn" effect="dark" content="change language" placement="top">
            <i class="iconfont icon-zhongwen" v-if="show.cn" @click="click_language"></i>
          </el-tooltip>
          <el-tooltip class="item" v-if="show.en" effect="dark" content="change language" placement="top">
            <i class="iconfont icon-yingwen" v-if="show.en" @click="click_language"></i>
          </el-tooltip>
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
import { mapState, mapMutations } from "vuex";
import Theme from "../components/Theme.vue";
import More from "../components/More.vue";
export default {
  name: "Home",
  components: { More, Theme },
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
  },
  methods: {
    ...mapMutations(["CHANGE_LANGUAGE"]),
    click_hide() {
      document.getElementById("header").style.display = "none";
      document.getElementById("menu").style.display = "none";
      document.getElementById("footer").style.display = "none";
      document.getElementById("contentWrapper").style.width = "92%";
      this.show.sub = true;
    },
    click_back() {
      document.getElementById("header").style.display = "block";
      document.getElementById("menu").style.display = "block";
      document.getElementById("footer").style.display = "flex";
      document.getElementById("contentWrapper").style.width = "84%";
      this.show.sub = false;
    },
    change_fontColor(n) {
      for (let i = 0; i < this.menus.length; i++) {
        menuTab[i].style["font-weight"] = "inherit";
      }
      menuTab[n].style["font-weight"] = "700";
    },
    click_menu(i) {
      this.subMenus = this.menus[i].children;
      switch (i) {
        case 0:
          this.change_fontColor(0);
          this.$router.push({ name: "websites" });
          break;
        case 1:
          this.change_fontColor(1);
          this.$router.push({ name: "githubs" });
          break;
        case 2:
          this.change_fontColor(2);
          this.$router.push({ name: "studies" });
          break;
        case 3:
          this.change_fontColor(3);
          this.$router.push({ name: "tests" });
          break;
      }
    },
    click_language() {
      this.show.cn = !this.show.cn;
      this.show.en = !this.show.en;
      if (this.show.cn) {
        this.CHANGE_LANGUAGE("cn");
        this.$message({
          message: "已切换至中文模式",
          type: "info",
          customClass: this.themeId == 0 ? "msgBoxInfo_bright" : "msgBoxInfo_warm",
        });
      } else {
        this.CHANGE_LANGUAGE("en");
        this.$message({
          message: "change language to English successfully",
          type: "info",
          customClass: this.themeId == 0 ? "msgBoxInfo_bright" : "msgBoxInfo_warm",
        });
      }
    },
  },
  mounted() {
    this.$router.push({ name: "websites" });
    this.axios
      .get("/api/menu")
      .then((res) => {
        if (res.data.status == 200) {
          this.menus = JSON.parse(JSON.stringify(res.data.data));
          this.subMenus = this.menus[0].children;
        }
      })
      .catch((err) => {});
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Home.less");
</style>
