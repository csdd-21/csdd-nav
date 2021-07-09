<template>
  <div :class="themeId == 0 ? 'more_bright' : 'more_warm'">
    <el-dropdown>
      <i class="iconfont icon-untitled"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item >
            <a href="https://github.com/csdd-21" target="_blank">github <i class="iconfont icon-github"></i> </a>
          </el-dropdown-item>
          <el-dropdown-item >
            <a href="https://github.com/csdd-21/csdd-blog" target="_blank">blog <i class="iconfont icon-blog"> </i> </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "More",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["themeId"]),
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/More.less");
</style>
