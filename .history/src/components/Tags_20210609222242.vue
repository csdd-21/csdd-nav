<template>
  <div class="tags">
    <template v-for="i of tag" :key="i">
      <span :class="i">{{ i }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    tag: {
      type: Array,
      require: true,
    },
  },
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

<style lang="less">
@import url("../assets/allCss/Tags.less");
</style>
