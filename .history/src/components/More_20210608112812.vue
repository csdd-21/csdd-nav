<template>
  <div class="more">
    <el-dropdown>
      <i class="iconfont icon-untitled"></i>
      <template slot="dropdown">
        <el-dropdown-menu>
          <el-dropdown-item class="github">
            <a href="https://github.com/csdd-21" target="_blank">github <i class="iconfont icon-github"></i> </a>
          </el-dropdown-item>
          <el-dropdown-item class="blog">
            <a href="http://localhost:8080" target="_blank">blog <i class="iconfont icon-blog"> </i> </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "More",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.icon-untitled {
  transform: rotate(90deg);
}

.el-dropdown-menu {
  margin: 0;
  padding: 0;
  text-align: right;

  .github {
    color: inherit;
    text-decoration: none;
    font-size: 14px;
    margin: 0;
    padding: 0;
    line-height: 28px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .blog {
    color: inherit;
    text-decoration: none;
    font-size: 14px;
    margin: 0;
    padding: 0;
    line-height: 28px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
