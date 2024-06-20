
// views/Demo.vue
<template>
  <div>DEMO</div>
  <el-button type="primary" @click="getObjContent">Hemo</el-button>
</template>

<script setup lang="ts">
// import { axiosInstance } from '@/utils/request'
import useUserStore from "@/store/modules/user";
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const getObjContent = async () => {
  // const data = await axiosInstance({method: 'get', url: '/11.obj'})
  router.push('Home')
}
</script>