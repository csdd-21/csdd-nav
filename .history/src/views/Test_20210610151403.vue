<template>
  <div class="test">
    <!-- <i class="iconfont icon-lianjie"></i> -->
     <b>title__test</b> 
    <div class="loader">
      <div class="loader-inner ball-scale-ripple-multiple">
        
        <div><i class="iconfont icon-lianjie"></i> </div>
        <div></div>
        <div></div>
      </div>
    </div>
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
.test {
  .loader {
      position: absolute;
      top:50%;
      left:50%;
      div {
        border-color: rgba(196, 207, 219, 0.8);
        width: 28px;
        height: 28px;
        border-radius:10px;
      }
    }

}
</style>
