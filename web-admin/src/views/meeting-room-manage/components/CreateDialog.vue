<template>
  <el-dialog
    v-model="visible"
    title="新增房间"
    width="500"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="form"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="房间名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="位置" prop="location">
        <el-input v-model="form.location" />
      </el-form-item>
      <el-form-item label="人数" prop="capacity">
        <el-input v-model="form.capacity" />
      </el-form-item>
      <el-form-item label="设备" prop="equipment">
        <el-input v-model="form.equipment" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RoomItem } from '../types'
import { createRoom, updateRoom } from '@/api/room'

const emits = defineEmits(['refresh'])

const visible = ref(false)
const formRef = ref()
const form = reactive({
  id: '',
  name: '',
  location: '',
  capacity: '',
  equipment: '',
  description: '',
})
const rules = {
  name: [{ required: true, message: '请输入房间名称', trigger: 'blur' }],
  location: [{ required: true, message: '请输入位置', trigger: 'blur' }],
  capacity: [{ required: true, message: '请输入人数', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  equipment: [{ required: true, message: '请输入设备', trigger: 'blur' }],
}
function show(record: RoomItem) {
  if (record) {
    form.id = record.id
    form.name = record.name
    form.location = record.location
    form.capacity = record.capacity
    form.description = record.description
    form.equipment = record.equipment
  }
  visible.value = true
}
function handleClose() {
  visible.value = false
}

async function handleSubmit() {
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const { message } = form.id
          ? await updateRoom(form)
          : await createRoom(form)
        ElMessage.success(message)
        emits('refresh')
        handleClose()
      } catch (error) {}
    }
  })
}

defineExpose({
  show,
})
</script>

<style scoped lang="less"></style>
