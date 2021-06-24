<template>
  <div class="about">
    <div class="one col-xs-12 col-md-4">
      <img src="../../public/about.jpg" alt="about.jpg" />
    </div>
    <div class="two col-xs-12 col-md-8">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="项目介绍" name="1">
          <div class="content" v-html="postAbout"></div>
        </el-collapse-item>
        <el-collapse-item title="其它" name="2">
          <div class="content" v-html="postOther"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
export default {
  components: {
    name: "About",
  },
  props: {},
  data() {
    return {
      activeNames: ["1"],
      postAbout: "",
      postOther: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  created() {},
  mounted() {
    this.axios
      .get("/about/about.md")
      .then((res) => {
        this.postAbout = new MarkdownIt({ html: true }).render(res.data);
      })
      .catch(function (err) {})
      .then(function () {});
    this.axios
      .get("/about/other.md")
      .then((res) => {
        this.postOther = new MarkdownIt({ html: true }).render(res.data);
      })
      .catch(function (err) {})
      .then(function () {});
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/About.less");
</style>
