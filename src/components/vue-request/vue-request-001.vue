<template>
  <div>
    <NGradientText type="info">
      {{ data ? `Welcome, ${data}!` : "What's your name?" }}
    </NGradientText>
    <br/>
    <br/>
    <NInputGroup>
      <NInput v-model:value="name" :style="{width:'50%'}" placeholder="Enter You Name"/>
      <NButton type="primary" ghost :loading="loading" @click="handleLogin"> Confirm</NButton>
    </NInputGroup>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NButton, NGradientText, NInput, NInputGroup} from 'naive-ui'
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
    NButton, NGradientText, NInput, NInputGroup
  },
  setup() {
    const name = ref('@John60676');

    const {run, data, loading} = useRequest(
        testService,
        {
          manual: true,
        });

    // name.value = data;

    const handleLogin = () => {
      run(name.value)
    }

    return {
      data,
      loading,
      name,
      handleLogin,
    }
  }
})

</script>