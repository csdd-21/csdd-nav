<template>
  <div :class="className">
    <div class="websites">
      <div class="content">
        <div class="part" v-for="(i, index) of datas" :key="index">
          <div class="col-sm-12 col-md-12 col-lg-12 partTitle" :id="i._id">
            <span>{{ i._id }}</span>
            <div class="action">
              <span class="add" @click="click_showAdd({ flag: i.flag, parent: i.parent })">+</span>
              <i class="iconfont icon-edit2" @click="click_showEdit(i.flag)" v-if="!show.edit.status_1[i.flag]"></i>
              <i class="iconfont icon-bianji" @click="click_closeShowEdit(i.flag)" v-if="show.edit.status_1[i.flag]"></i>
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
                <i class="iconfont icon-edit1" @click="click_edit(j)" v-show="show.edit.status_2[j.flag]"></i>
                <i class="iconfont icon-cuo" @click="click_delete(j)" v-show="show.edit.status_2[j.flag]"></i>
              </div>
            </div>
          </div>
        </div>
        <Add v-if="show.add" :showAdd="show.add" :info="info" @close_showAdd="close_showAdd" />
      </div>
      <div class="footer" id="end">
        <hr />
        The end of current page !
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
      datas: [],
      show: {
        add: false,
        edit: {
          status_1: {},
          status_2: {},
        },
      },
      info: {},
    };
  },
  watch: {
    language() {
      this.getDatas("/api/websites");
    },
  },
  computed: {
    ...mapState(["themeId", "language"]),
    className() {
      switch (this.themeId) {
        case 0:
          return "websites_bright";
        case 1:
          return "websites_warm";
        case 2:
          return "websites_dark";
      }
    },
  },
  methods: {
    getDatas(url) {
      this.axios
        .get(url)
        .then((res) => {
          console.log("res 99999 ----", res);
          if (res.data.status == 200) this.datas = res.data.data;
        })
        .catch(function (err) {});
    },

    // 新增
    click_showAdd(i) {
      this.show.add = true;
      i.action = "add";
      this.info = i;
    },
    close_showAdd(i) {
      this.show.add = i;
      this.getDatas("/api/websites");
    },

    // 编辑
    click_showEdit(flag) {
      this.show.edit.status_1[flag] = true;
      this.show.edit.status_2[flag] = true;
    },
    click_closeShowEdit(flag) {
      this.show.edit.status_1[flag] = false;
      this.show.edit.status_2[flag] = false;
    },
    click_edit(j) {
      this.show.add = true;
      j.action = "edit";
      this.info = j;
    },

    // 删除
    click_delete(params) {
      this.$confirm("确定删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "infoBoxCancel",
        customClass: "infoBox",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/api/delete", { _id: params._id, iconPath: params.iconPath })
            .then((res) => {
              console.log("delete res --", res);
              if (res.data.status == 200) {
                this.$message({ message: "删除成功", type: "info", customClass: "infoBox" });
                this.getDatas("/api/websites");
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
    this.getDatas("/api/websites");
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/allCss/Websites.less");
</style>
