<template>
  <div class="about">
    <!-- <div class="content" v-html="postHtml"></div> -->
    <div class="one col-xs-12 col-md-4">
      <img src="../../public/name.jpg" alt="" />
    </div>
    <div class="two col-xs-12 col-md-8">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="一致性 Consistency" name="1">
          <div class="content" v-html="postHtml"></div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
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
      postHtml: "",
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
        this.postHtml = new MarkdownIt({ html: true }).render(res.data);
      })
      .catch(function (err) {})
      .then(function () {});
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/About.less");
</style>
