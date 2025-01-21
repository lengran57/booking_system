<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.username" placeholder="预定人" clearable />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="query.meetingRoomName"
          placeholder="会议室名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query.rangeStartDate"
          type="date"
          placeholder="预定开始日期"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-time-picker
          v-model="query.rangeStartTime"
          placeholder="预定开始时间"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="query.rangeEndDate"
          type="date"
          placeholder="预定结束日期"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-time-picker
          v-model="query.rangeEndTime"
          placeholder="预定结束时间"
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="query.meetingRoomPosition"
          placeholder="位置"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="会议室名称">
        <template #default="{ row }">
          {{ row.room ? row.room.name : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="会议室位置">
        <template #default="{ row }">
          {{ row.room ? row.room.location : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="预定人">
        <template #default="{ row }">
          {{ row.user.username }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="180px">
        <template #default="{ row }">
          {{ formatToDateTime(row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180px">
        <template #default="{ row }">
          {{ formatToDateTime(row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审批状态"> </el-table-column>
      <el-table-column prop="createTime" label="预定时间" width="180px">
        <template #default="{ row }">
          {{ formatToDateTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="action" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getBookings } from '@/api/booking'
import { formatToDateTime } from '@/utils/dateUtil'

const query = reactive({
  username: '',
  meetingRoomName: '',
  rangeStartDate: '',
  rangeStartTime: '',
  rangeEndDate: '',
  rangeEndTime: '',
  meetingRoomPosition: '',
  pageNo: 1,
  pageSize: 20,
})
const tableData = ref()
const total = ref(0)

async function getList() {
  const { data } = await getBookings(query)
  tableData.value = data.bookings
  total.value = data.totalCount
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="less"></style>
