<template>
  <div class="add">
    <el-dialog :title="info.parent" v-model="showAdd" :before-close="handle_close">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url"></el-input>
          <el-button><a :href="form.url" target="__blank">测试</a></el-button>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <img :src="form.iconPath" alt="img" />

          <el-upload action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-success="handle_success" v-model="form.icon" list-type="text">
            <el-button size="small" type="primary" >{{test}}</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="click_cancel">取 消</el-button>
        <el-button @click="click_submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        url: "",
        icon: "",
        iconPath: "/favicon/3d.png",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入网址", trigger: "blur" }],
        icon: [{ required: true, message: "请选择图标", trigger: "blur" }],
      },
      fileList: [],
      test:"点击上传"
    };
  },
  props: {
    showAdd: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },
  watch: {
    fileList(val) {
      console.log("fileList", val);
    },
  },
  computed: {},
  methods: {
    // 图片上传
    handle_before(file) {
      console.log("before ---", file);
      let txt = "";
      let isType = ["image/png", "image/jpg", "image/jpeg","image/x-icon"].some((i) => {
        return file.type == i;
      });
      txt = isType ? "" : "图片只能是 jpg/png 格式";
      if (file.size / 1024 > 1024) {
        txt += txt ? ",且图片大小不能超过1MB" : "图片大小不能超过1MB";
      }
      if (txt) {
        this.$message.error(txt);
        return false;
      }
      return true;
    },
    handle_change(file, fileList) {
      console.log("change ---", file, fileList);
      this.fileList = fileList.slice(-1);
    },
    handle_success(res, file) {
      console.log("success ---", res, file);
      if (res.status == 200) {
        this.form.icon = res.data.url;
        this.form.iconPath = require("../../server/tmp_uploads/bilibili.png");
        this.test ="重新上传"
        console.log("form ----", this.form);
      }
    },

    handle_close() {
      this.$emit("close_showAdd", false);
      this.$refs["form"].resetFields();
    },
    click_cancel() {
      this.$emit("close_showAdd", false);
      this.$refs["form"].resetFields();
    },
    click_submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          switch (this.info.action) {
            case "add":
              this.axios
                .post("/api/submit", Object.assign({}, this.form, this.info))
                .then((res) => {
                  console.log("submit res --", res);
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", false);
                    this.$message({ message: "添加成功", type: "info", customClass: "infoBox" });
                  }
                })
                .catch(function (err) {
                  console.error("submit err --", err);
                });
              break;
            case "edit":
              this.axios
                .post("/api/edit", Object.assign({}, { _id: this.info._id }, this.form))
                .then((res) => {
                  console.log("edit res --", res);
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", false);
                    this.$message({ message: "编辑成功", type: "info", customClass: "infoBox" });
                  }
                })
                .catch(function (err) {
                  console.error("edit err --", err);
                });
              break;
          }
        } else {
          switch (this.info.action) {
            case "add":
              this.$message({ message: "添加失败", type: "error" });
              break;
            case "edit":
              this.$message({ message: "编辑失败", type: "error" });
              break;
          }
        }
      });
    },
  },
  mounted() {
    console.log("info ---", this.info);
    this.form.title = this.info.title || "";
    this.form.url = this.info.url || "";
    this.form.icon = this.info.    this.form.icon = this.info.url || "";
 || "";
  },
};
</script>
<style>
input[type="file"] {
  display: none;
}
</style>
<style lang="less" scoped>
@import url("../assets/allCss/Add.less");
</style>
