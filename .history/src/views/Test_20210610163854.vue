<template>
  <div class="test">
   <div class='one'> <i class="iconfont icon-github"></i></div>
    
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
 /deep/ one{
  // color:red;
  transform:rotate(9deg);
  -webkit-transform:rotate(70deg); /* Safari 和 Chrome */
}
</style>
