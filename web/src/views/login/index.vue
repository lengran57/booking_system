<template>
  <div class="h-full flex flex-col items-center justify-center">
    <h1 class="mb-12">冷然民宿预订系统</h1>

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
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label=" ">
        <div class="w-full flex justify-between">
          <el-button type="primary" link @click="$router.push('/register')">
            创建账号
          </el-button>
          <el-button
            type="primary"
            link
            @click="$router.push('/forgetPassword')"
          >
            忘记密码
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label=" " class="mt-10">
        <el-button class="w-full" type="primary" @click="handleSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { login } from '@/api/login'
import router from '@/router'

const form = reactive({
  username: '',
  password: '',
})
const formRef = ref()
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await login(form.username, form.password)
      ElMessage.success('登录成功')
      localStorage.setItem('access_token', data.accessToken)
      localStorage.setItem('refresh_token', data.refreshToken)
      localStorage.setItem('user_info', JSON.stringify(data.userInfo))
      router.push('/')
    }
  })
}
</script>

<style scoped lang="less"></style>
