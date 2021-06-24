<template>
  <div class="filterCond">
    <!-- 按标签 -->
    <span class="title">按标签 -- </span>
    <el-checkbox-group v-model="checked.tags">
      <el-checkbox-button v-for="i in tags" :label="i" :key="i">{{ i }}</el-checkbox-button>
    </el-checkbox-group>
    <!-- 按时间 -->
    <span class="title">按时间 -- </span> <br />
    <el-radio-group v-model="checked.sort">
      <el-radio-button label="1">正序</el-radio-button>
      <el-radio-button label="-1">倒序</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
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
      tags: [],
      checked: {
        title:"",
        tags: [],
      },
    };
  },
  watch: {
    checked: {
      handler(newVal, oldVal) {
        this.$emit("handleFilter", JSON.parse(JSON.stringify(this.checked)));
      },
      immediate: false,
      deep: true,
    },
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_STUDY_PARAMS", "SET_PARAMS"]),
    ...mapActions(["getArticles"]),
  },
  created() {},
  mounted() { 
    console.log('ddd',this.$store.state.tags);
    
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/FilterCond.less");
</style>
