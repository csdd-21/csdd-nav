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
@color_bright: rgb(84, 84, 84);
@bgColor_bright: rgb(230, 243, 247);

@color_warm: rgb(84, 84, 84);
@bgColor_warm: rgb(250, 226, 218);

@color_dark: rgb(150, 150, 150);
@bgColor_dark: rgb(38, 38, 38);

.el-dropdown:hover{
color:rgb(255,255,255)
}

.el-dropdown-menu {
  margin: 0;
  padding: 0;

  .bright {
    color: @color_bright;
    background-color: @bgColor_bright;
    font-size: 12px;
    line-height: 28px;
    &:hover {
      color: @color_bright;
      background-color: fade(@bgColor_bright, 80%);
    }
  }

  .warm {
    color: @color_warm;
    background-color: @bgColor_warm;
    font-size: 12px;
    line-height: 28px;
    &:hover {
      color: @color_warm;
      background-color: fade(@bgColor_warm, 80%);
    }
  }

  .dark {
    color: @color_dark;
    background-color: @bgColor_dark;
    font-size: 12px;
    line-height: 28px;
    &:hover {
      color: @color_dark;
      background-color: fade(@bgColor_dark, 80%);
    }
  }
}
</style>
