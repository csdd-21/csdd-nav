<template>
  <div class="tags">
    <template v-for="i of tag" :key="i._id">
      <span :class="i">{{ i._id }}</span>
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
