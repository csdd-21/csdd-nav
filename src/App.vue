<template>
  <div id="app">
    <router-view :key="routerKey" />
  </div>
</template>

<script>
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
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
