<template>
  <div class="add">
    <el-dialog :title="info.id" :visible.sync="showAdd" :modal-append-to-body="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url"></el-input>
          <el-button><a :href="form.url" target="__blank">测试</a></el-button>
        </el-form-item>
        <el-form-item label="图标" prop="favicon" v-model="form.favicon">
          <!-- :headers="loadHeader"  -->
          <el-upload action="http://127.0.0.1:8200/api/upload" :limit="1" :headers="loadHeader"  :on-success="handleSuccess" :on-change="handleChange" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="clickCancel">取 消</el-button>
        <el-button @click="clickSure">确 定</el-button>
      </div>
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
        // favicon: [{ required: true, message: "请选择图标", trigger: "blur" }],
      },
      // loadHeader: { Authorization: window.sessionStorage.getItem("token") },
      loadHeader: { "Access-Control-Allow-Origin": "*" },
    };
  },
  props: {
    showAdd: {
      required: true,
    },
    info: {
      required: true,
    },
  },
  watch: {},
  computed: {},
  methods: {
    clickCancel() {
      this.$emit("closeAdd", false);
      this.$refs["form"].resetFields();
    },
    clickSure() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("closeAdd", false);
          this.$message({
            message: "添加成功",
            type: "info",
            customClass: "infoBox",
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "error",
          });
          console.error("error submit!!");
        }
      });
    },
    handleSuccess() {},
    handleChange(file, fileList) {
      console.log("file, fileList", file, fileList);
      // this.$axios
      //   .get("/api/upload", { params: { url: window.URL.createObjectURL(file.raw) } })
      //   .then((res) => {
      //     console.log("axios file res --", res);
      //     this.datas = JSON.parse(JSON.stringify(res.data));
      //   })
      //   .catch(function (err) {
      //     console.log("axios  file err --", err);
      //   })
      //   .then(function () {});
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.add {
  .el-input {
    width: 75%;
  }
}
</style>
