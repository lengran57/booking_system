<template>
  <div class="h-full flex flex-col">
    <el-tabs v-model="activeName" class="w-full">
      <el-tab-pane label="信息修改" name="first">
        <div class="w-full flex items-center justify-center">
          <el-form
            ref="formRef"
            style="max-width: 600px"
            :model="form"
            :rules="rules"
            label-width="auto"
            class="w-100"
          >
            <el-form-item label="头像" prop="headPic">
              <el-upload
                class="avatar-uploader w-20 h-20 bg-blueGray rounded-full flex items-center justify-center"
                action="http://localhost:3000/upload/image"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleUploadSuccess"
              >
                <img
                  v-if="form.headPic"
                  :src="form.headPic"
                  class="w-20 h-20 rounded-full"
                />
                <el-icon v-else color="#333" size="40"><UserFilled /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
              <el-input v-model="form.nickName" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-row :gutter="16">
                <el-col :span="16"><el-input v-model="form.captcha" /></el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="sendCaptcha"
                    >发送验证码</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label=" " class="mt-10">
              <el-button class="w-full" type="primary" @click="handleSubmit">
                确 定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="second">
        <ForgetPassword />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import router from '@/router'
import { UserFilled } from '@element-plus/icons-vue'
import { sendRegisterCaptcha } from '@/api/login'
import { getUserInfo, updateInfo } from '@/api/user'
import ForgetPassword from '@/views/forget-password/index.vue'

const activeName = ref('first')
const rules = {
  headPic: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}
const formRef = ref()
const form = reactive({
  headPic: '',
  nickName: '',
  email: '',
  captcha: '',
})
const token = 'Bearer ' + localStorage.getItem('access_token')

async function handleSubmit() {
  if (!formRef.value) return
  console.log(form)
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateInfo(form)
      ElMessage.success('修改成功')
      router.push('/')
    }
  })
}
async function sendCaptcha() {
  if (!form.email) return ElMessage.warning('请输入邮箱')
  const { data } = await sendRegisterCaptcha(2, form.email)
  ElMessage.success(data)
  router.push('/login')
}
async function _getUserInfo() {
  const { data } = await getUserInfo()
  form.headPic = data.headPic
  form.nickName = data.nickName
  form.email = data.email
}

async function handleBeforUpload(file: File) {
  console.log(file)
}
function handleUploadSuccess({ data }: any) {
  form.headPic = data
}
onMounted(() => {
  _getUserInfo()
})
</script>

<style scoped lang="less"></style>
