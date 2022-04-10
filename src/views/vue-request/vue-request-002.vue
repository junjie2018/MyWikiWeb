<template>
  <NSpin :show="loading">
    <NSpace vertical>
      <div>My Name Is： {{ data }}</div>
      <NInputGroup>
        <NInput v-model:value="name" :style="{width:'50%'}" placeholder="Enter You Name"/>
        <NButton type="primary" ghost @click="handleMutate"> Mutte</NButton>
      </NInputGroup>
    </NSpace>
  </NSpin>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NButton, NInput, NInputGroup, NSpace, NSpin} from 'naive-ui';
import {useRequest} from "vue-request";

function testService(name: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(name);
    }, 3000)
  })
}

export default defineComponent({
  components: {
    NInput,
    NSpace,
    NSpin,
    NButton,
    NInputGroup,
  },
  setup() {
    const name = ref('@John60676');

    const {data, loading, mutate} = useRequest(
        testService,
        {
          manual: true,
        });

    const handleMutate = () => {
      // 我觉得应该这样写，但是现在不对，应该是iter的参数传递错误了
      mutate((item: string) => {
        return 'After Dispose: ' + item
      })
      // mutate(name.value);
    }

    return {
      data,
      loading,
      name,
      handleMutate,
    }
  }
})

</script>