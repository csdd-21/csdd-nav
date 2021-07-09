<template>
  <div id="app">
    <router-view :key="routerKey" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  props: {},
  data() {
    return {
      routerKey: "",
    };
  },
  watch: {
    routerKey(val) {
      return this.$route.path + Date.now();
    },
  },
  computed: {
    ...mapState(["themeId"]),
    className() {
      switch (this.themeId) {
        case 0:
          return "add_bright";
        case 1:
          return "add_warm";
        case 2:
          return "add_dark";
      }
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
