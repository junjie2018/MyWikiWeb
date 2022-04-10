<template>
  <NSpace class="ready-demo" vertical align="center" justify="space-around">
    <Transition name="fade" mode="out-in">
      <NCard v-if="!data" class="ready-demo__placeholder"> Please login first</NCard>
      <NCard v-else size="small" style="width: 200px">
        <template #cover>
          <img :src="data.avatar" :alt="data.name"/>
        </template>
        <template #header>
          {{ data.name }}
        </template>
        <span>{{ data.type }}</span>
      </NCard>
    </Transition>

    <NButton type="primary" :loading="tokenLoading" :disabled="!!token" @click="run">
      Login
    </NButton>
  </NSpace>
</template>
<script lang="ts">

import {NButton, NCard, NSpace} from 'naive-ui';
import {computed, defineComponent} from 'vue';
import {useRequest} from 'vue-request';

type UserInfo = {
  id: string;
  name: string;
  avatar: string;
  type: string;
  createdAt: string;
};

function loginService() {
  return new Promise(resolve => {
    setInterval(() => {
      resolve('1234')
    }, 3000)
  })
}

function getUser(): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve({id: '1234', name: '张三', avatar: '201', type: '202', createdAt: '1234'})
    }, 3000)
  })
}

export default defineComponent({
  components: {
    NButton,
    NCard,
    NSpace,
  },
  setup() {

    const {data: token, loading: tokenLoading, run} = useRequest(
        loginService,
        {manual: true}
    );

    const {data, loading} = useRequest<UserInfo>(
        getUser,
        {
          ready: computed(() => !!token.value)
        }
    )

    return {
      run,
      data,
      loading,
      token,
      tokenLoading
    }
  }
})

</script>