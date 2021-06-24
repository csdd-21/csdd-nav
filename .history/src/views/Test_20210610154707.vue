<template>
  <div class="test">
    <el-button>Website</el-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    let obj = {
      a: "11",
    };
    let arr = [11];
    if (obj.a) {
      console.log("obj.a有值");
    } else {
      console.log("obj.a为空");
    }
    if (arr.length != 0) {
      console.log("arr有值");
    } else {
      console.log("arr为空");
    }
  },
};
</script>

<style lang="less" scoped>
@bgcolor: rgb(216, 234, 217);
.test {
  .el-button {
    background-color: @bgColor;
    padding: 8px 8px;
    animation-name: test;
    animation-duration: 3s;
  }
  @keyframes test {
    from {
      background: fade(@bgColor,100%);
    }
    to {
      background: fade(@bgColor,20%);
    }
  }
}
</style>
