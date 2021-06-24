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
        <el-form-item label="图标" prop="favicon">
          <!-- <el-upload class="upload-demo" action="/api/upload" :limit="1" :on-change="handleChange" :on-success="handleSuccess" list-type="picture" v-model="form.favicon" drag>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
          <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
            <template #trigger>
              <el-button size="small" type="primary">选取文件</el-button>
            </template>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
        favicon: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入网址", trigger: "blur" }],
        favicon: [{ required: true, message: "请选择图标", trigger: "blur" }],
      },
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
    handleChange(i, j) {
      console.log("change ---", i, j);
      // this.form.favicon = "ok";
    },
    handleSuccess(file, fileLists) {
      console.log("success ---", file, fileLists);
      if (file.status == 200) {
        this.form.favicon = file.data.url;
        console.log("6666");
      }
      console.log("77777");
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
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Add.less");
</style>
