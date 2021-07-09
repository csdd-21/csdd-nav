<template>
  <div :class="themeId == 0 ? 'websites_bright' : 'websites_warm'">
    <div class="websites">
      <div class="content">
        <div class="part" v-for="(i, index) of datas" :key="index">
          <div class="col-sm-12 col-md-12 col-lg-12 partTitle" :id="i._id">
            <template v-if="!show.edit[i.flag] || show.edit[i.flag] == false">
              <span>{{ i._id }}</span>
            </template>
            <template v-else><el-input v-model='title' :key="i.flag"></el-input></template>
            <div class="action">
              <span class="add" @click="click_showAdd({ index: index, flag: i.flag, parent: i.parent })">+</span>
              <i class="iconfont icon-edit2" @click="click_showEdit(i.flag)" v-if="!show.edit[i.flag]"></i>
              <i class="iconfont icon-bianji" @click="click_closeShowEdit(i.flag)" v-if="show.edit[i.flag]"></i>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3 partContent" v-for="j of i.children" :key="j._id">
            <div class="info">
              <div class="one">
                <img :src="j.iconPath" />
                <div class="url">
                  <a :href="j.url" target="_blank" v-show="language == 'cn'">{{ j.title_cn }}</a>
                  <a :href="j.url" target="_blank" v-show="language == 'en'">{{ j.title_en }}</a>
                </div>
              </div>
              <div class="two">
                <i class="iconfont icon-edit1" @click="click_edit(index, j)" v-show="show.edit[j.flag]"></i>
                <i class="iconfont icon-cuo" @click="click_delete(index, j)" v-show="show.edit[j.flag]"></i>
              </div>
            </div>
          </div>
        </div>
        <Add v-if="show.add" :showAdd="show.add" :info="info" @close_showAdd="close_showAdd" />
      </div>
      <div class="footer" id="end">
        <hr />
        The end of current page ~
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Add from "../components/Add.vue";
export default {
  name: "Websites",
  components: { Add },
  props: {},
  data() {
    return {
      title:"moren",
      datas: [],
      show: {
        add: false,
        edit: {},
      },
      info: {},
      index: 0,
    };
  },
  watch: {
    language() {
      this.getDatas("allGet");
    },
  },
  computed: {
    ...mapState(["themeId", "language"]),
  },
  methods: {
    getDatas(type) {
      console.log("this.index ----", this.index, "this.info ----", this.info);
      if (type == "allGet") {
        this.axios
          .get("/api/websites", { params: { type: type } })
          .then((res) => {
            if (res.data.status == 200) {
              this.datas = res.data.data;
              console.log("333---- get allGet -----");
            }
          })
          .catch(function (err) {});
        return;
      }
      if (type == "partGet") {
        this.axios
          .get("/api/websites", { params: { type: type, flag: this.info.flag, parent: this.info.parent } })
          .then((res) => {
            if (res.data.status == 200) {
              console.log("res part", res);
              this.$nextTick(() => {
                this.datas[this.index] = res.data.data;
              });
              console.log("333----- get partGet -----");
            }
          })
          .catch(function (err) {});
        return;
      }
    },

    // 新增
    click_showAdd(i) {
      this.show.add = true;
      i.action = "add";
      this.index = i.index;
      this.info = i;
    },
    close_showAdd({ show_add, refresh }) {
      this.show.add = show_add;
      if (refresh == true) {
        this.getDatas("partGet");
      }
    },

    // 编辑
    click_showEdit(flag) {
      this.show.edit[flag] = true;
      this.show.edit[flag] = true;
    },
    click_closeShowEdit(flag) {
      this.show.edit[flag] = false;
      this.show.edit[flag] = false;
    },
    click_edit(index, j) {
      this.show.add = true;
      j.action = "edit";
      this.index = index;
      this.info = j;
    },

    // 删除
    click_delete(index, j) {
      this.index = index;
      this.info = j;
      this.$confirm("确定删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: this.themeId == 0 ? "alertBox_bright" : "alertBox_warm",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/api/delete", { _id: j._id, iconPath: j.iconPath })
            .then((res) => {
              console.log("delete res --", res);
              if (res.data.status == 200) {
                this.$message({ message: "删除成功", type: "info", customClass: this.themeId == 0 ? "msgBoxInfo_bright" : "msgBoxInfo_warm" });
                this.getDatas("partGet");
              }
            })
            .catch(function (err) {
              console.log("delete err --", err);
            });
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    console.log("websites mounted");
    this.getDatas("allGet");
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/allCss/Websites.less");
</style>
