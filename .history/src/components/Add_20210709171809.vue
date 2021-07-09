<template>
  <div :class="themeId == 0? 'add_bright':'add_warm'">
    <div class="add">
      <el-dialog :title="info.parent" v-model="showAdd" :before-close="click_close">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="标题" prop="title_cn">
            <el-input v-model="form.title_cn"></el-input>
          </el-form-item>
          <el-form-item label="网址" prop="url">
            <el-input v-model="form.url"></el-input>
            <el-tooltip class="item" effect="dark" content="测试网址是否跳转成功" placement="top">
              <el-button> <a v-show="!form.url">测试</a><a v-show="form.url" :href="form.url" target="__blank">测试</a></el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="图标" prop="iconPath">
            <el-upload action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-remove="handle_remove" :on-success="handle_success" v-model="form.icon" list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="click_close">取 消</el-button>
          <el-button @click="click_submit" type="primary">确 定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  data() {
    const iconValidate = (rule, value, callback) => {
      if (!this.hasIcon) {
        callback(new Error("请选择图片"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        title_cn: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入网址", trigger: "blur" }],
        iconPath: [{ validator: iconValidate, trigger: ["blur", "change"] }],
      },
      hasIcon: false,
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
  computed: {
    ...mapState(["themeId"]),
  },
  methods: {
    // 图片上传
    handle_before(file) {
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
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    handle_remove(file, fileList) {
      if (fileList.length == 0) {
        this.hasIcon = false;
      }
    },
    handle_success(res, file) {
      this.form.iconPath = res.data.url;
      this.hasIcon = true;
      this.$refs.form.clearValidate(["iconPath"]);
    },

    click_close() {
      this.$emit("close_showAdd", { show_add: false, refresh: false });
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
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", { show_add: false, refresh: true });
                    this.$message({ message: "添加成功", type: "info",  customClass: this.themeId == 0 ? "msgBoxInfo_bright" : "msgBoxInfo_warm", });
                  }
                })
                .catch();
              break;
            case "edit":
              this.axios
                .post("/api/edit", this.form)
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", { show_add: false, refresh: true });
                    this.$message({ message: "编辑成功", type: "info",  customClass: this.themeId == 0 ? "msgBoxInfo_bright" : "msgBoxInfo_warm", });
                    return
                  }
                })
                .catch();
              break;
          }
        }
      });
    },
  },
  mounted() {
    if (this.info["iconPath"]) {
      this.fileList.push({ name: this.info.title_cn, url: this.info["iconPath"] });
      this.hasIcon = true;
    }
    Object.keys(this.info).forEach((i) => {
      this.form[i] = this.info[i] || "";
    });
    this.form.old_iconPath = this.info.iconPath;
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
