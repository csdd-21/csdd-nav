<template>
  <div class="more">
    <el-dropdown>
      <i class="iconfont icon-untitled"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <a href="https://github.com/csdd-21" target="_blank"><i class="iconfont icon-github"></i>Github</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://github.com/csdd-21/csdd-blog" target="_blank"><i class="iconfont icon-blog"> </i>Blog</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "More",
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/More.less");
</style>
