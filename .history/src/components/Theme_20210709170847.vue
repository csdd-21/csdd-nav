<template>
  <div class="theme">
    <el-dropdown>
      <i class="iconfont icon-theme-palette-fill"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="bright" @click="CHANGE_THEME(0)">
            <span>Bright</span>
          </el-dropdown-item>
          <el-dropdown-item class="warm" @click="CHANGE_THEME(1)">
            <span>Warm</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Theme",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["CHANGE_THEME"]),
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Theme.less");
</style>
