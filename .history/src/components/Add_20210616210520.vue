<template>
  <div class="add">
    <el-dialog :title="info.id" v-model="showAdd" :modal-append-to-body="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url"></el-input>
          <el-button><a :href="form.url" target="__blank">测试</a></el-button>
        </el-form-item>
        <el-form-item label="图标" prop="favicon" v-model="form.favicon">
          <el-upload action="/api/upload" :data="{ test: 111 }" :limit="1" :on-success="handleSuccess" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="clickCancel">取 消</el-button>
        <el-button @click="clickSure">确 定</el-button>
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
        // favicon: [{ required: true, message: "请选择图标", trigger: "blur" }],
      },
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

      this.$axios
        .post("/api/submit", { data: { url: 'C://Users//86138//Desktop//csdd-proj//src//assets//test//54.png' } })
        .then((res) => {
          console.log("submit res --", res);
        })
        .catch(function (err) {
          console.log("submit err --", err);
        })
    },
    handleSuccess(i, j) {
      console.log("i----", i);
    },
  },
  mounted() {
    console.log("new Date().getMinutes()", new Date().getMinutes() + "_" + new Date().getSeconds());
  },
};
</script>
<style lang="less" scoped>
.add {
  .el-input {
    width: 75%;
  }
  .el-upload__input {
    display: none;
  }
}
</style>
