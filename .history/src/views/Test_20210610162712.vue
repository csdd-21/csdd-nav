<template>
  <div class="test">
    <el-button style="position: absolute; right: 0; bottom: 200px">Website</el-button>
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
@bgColor: rgb(216, 234, 217);
@color: rgb(128, 130, 128);
.test {
  .el-button {
    background-color: fade(@bgColor, 50%);
    border-color: fade(@bgColor, 20%);
    color: @color;
    padding: 8px 8px;
    animation-name: test;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes test {
    from {
      background: fade(@bgColor, 50%);
    }
    to {
      background: fade(@bgColor, 20%);
    }
  }
}
</style>
