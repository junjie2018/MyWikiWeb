<template>
  <ul>
    <li v-for="user in userList" :key="user.id" style="width: 50%">
      <NSpace justify="space-between">
        <span>{{ user.name }} </span>
        <NButton :loading="queries[user.id]&&queries[user.id].loading" @click="() => run(user.id)"> Update</NButton>
      </NSpace>
    </li>
  </ul>
</template>

<script lang="ts">

import {NButton, NSpace} from 'naive-ui';
import Toastify from 'toastify-js';
import {defineComponent} from 'vue';
import {useRequest} from 'vue-request';

// 3秒后随机返回一个数字
function testService(userId: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      const name = userList.find(i => i.id === userId)?.name;
      resolve(`${name} status update successfully`)
    }, 3000)
  })
}

const userList = [
  {id: 1, name: 'AAA'},
  {id: 2, name: 'BBB'},
  {id: 3, name: 'CCC'},
]

export default defineComponent({
  components: {
    NButton,
    NSpace,
  },
  setup() {

    const {run, loading, queries} = useRequest(testService, {
      manual: true,
      queryKey: id => String(id),
      onSuccess: data => {
        showMessage(data as string);
      },
    });

    const showMessage = (msg: string) => {
      Toastify({
        text: msg,
        position: 'center'
      }).showToast();
    }

    return {
      userList,
      queries,
      run,
    }
  }
})

</script>