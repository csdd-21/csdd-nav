<template>
  <div class="filterCond">
    <div class='search'>
      <el-input v-model='checked.title' placeholder='Type title or select tag below to search...'> </el-input>
      <el-button  @click='handleSearch' >查 询</el-button>
      <el-button @click="checked.title=''" >重 置</el-button>
    </div>
    <!-- 按标签 -->
    <span class="title">标签分类</span>
    <el-checkbox-group v-model="checked.tags">
      <el-checkbox-button v-for="i in tags" :label="i._id" :key="i._id">{{ i._id }}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "FilterCond",
  components: {},
  props: {
    tags: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      checked: {
        title: "",
        tags: [],
      },
    };
  },
  watch: {
    'checked.tags':function (newVal,oldVal){
      console.log('1111',this.checked);
      
      this.$emit("handleFilter", JSON.parse(JSON.stringify(this.checked)));
    }
  },
  computed: {},
  methods: {
    handleSearch(){
       console.log('1111',this.checked);
      
     this.$emit("handleFilter", JSON.parse(JSON.stringify(this.checked)));
    }
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less">
@import url("../assets/allCss/FilterCond.less");
</style>
