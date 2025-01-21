<template>
  <div class="h-full flex flex-col items-center justify-center">
    <h1 class="mb-12">注册</h1>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="w-100"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          show-password
        />
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
</template>

<script setup lang="ts">
import { register, sendRegisterCaptcha } from '@/api/login'
import router from '@/router'
import { ref } from 'vue'
import { reactive } from 'vue'

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}
const formRef = ref()
const form = reactive({
  username: '',
  nickName: '',
  password: '',
  confirmPassword: '',
  email: '',
  captcha: '',
})

async function handleSubmit() {
  if (!formRef.value) return
  if (form.password !== form.confirmPassword) {
    return ElMessage.error('两次密码不一致')
  }
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await register(form)
      ElMessage.success(data)
      router.push('/login')
    }
  })
}
async function sendCaptcha() {
  if (!form.email) return ElMessage.warning('请输入邮箱')
  const { data } = await sendRegisterCaptcha(0, form.email)
  ElMessage.success(data)
}
</script>

<style scoped lang="less"></style>
