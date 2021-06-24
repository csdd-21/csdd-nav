<template>
  <div class="add">
    <el-dialog :title="info.parent" v-model="showAdd" :before-close="click_close">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url"></el-input>
          <el-tooltip class="item" effect="dark" content="测试网址是否跳转成功" placement="top">
            <el-button><a :href="form.url" target="__blank">测试</a></el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-upload action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-success="handle_success" v-model="form.icon" list-type="picture-card">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="click_close">取 消</el-button>
        <el-button class="sure" @click="click_submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    const iconValidate = (rule, value, callback) => {
      console.log("valid ---", this.fileList);

      if (this.fileList.length == 0) {
        callback(new Error("请选择图片"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入网址", trigger: "blur" }],
        // icon: [{ required: true, message: "请输入图片", trigger: "blur" }],
        // icon: [{ validator: iconValidate, trigger: "blur" }],
      },
      fileList: [],
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
  watch: {},
  computed: {},
  methods: {
    // 图片上传
    handle_before(file) {
      console.log("before ---", file);
      let txt = "";
      let isType = ["image/png", "image/jpg", "image/jpeg", "image/x-icon"].some((i) => {
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
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    handle_success(res, file) {
      console.log("success ---", res, file);
      this.form.icon = res.data.url;
    },

    click_close() {
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
                .post("/api/edit", this.form)
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
    if (this.info["icon"]) {
      this.fileList.push({ name: this.info.title, url: require("../assets" + this.info["icon"]) });
    }
    Object.keys(this.info).forEach((i) => {
      this.form[i] = this.info[i] || "";
    });
    console.log("info ---", this.info, "form ---", this.form);
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
