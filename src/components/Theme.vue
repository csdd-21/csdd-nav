<template>
  <div class="theme">
    <el-dropdown>
      <i class="iconfont icon-theme-palette-fill"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="bright">
            <span @click="CHANGE_THEME(0)">Bright</span>
          </el-dropdown-item>
          <el-dropdown-item class="warm">
            <span @click="CHANGE_THEME(1)">Warm</span>
          </el-dropdown-item>
          <el-dropdown-item class="dark">
            <span @click="CHANGE_THEME(2)">Dark</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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

<style lang="less">
@import url("../assets/allCss/Theme.less");
</style>
