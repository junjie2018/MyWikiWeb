<template>
  <div>
    <NInput :loading="loading" placeholder="Enter you email" @input="handleInput"/>
    <NSpin :show="loading">
      <ul style="height: 100px">
        <li v-for="{ id, email } in emails" :key="id">{{ email }}</li>
      </ul>
    </NSpin>
  </div>
</template>
<script lang="ts">

import {faker} from "@faker-js/faker";
import {NInput, NSpin} from 'naive-ui';
import {computed, defineComponent} from 'vue';
import {useRequest} from 'vue-request';

type EmailType = {
  email: string;
  id: number
}

function testService(): Promise<EmailType[]> {
  return new Promise<EmailType[]>(resolve => {
    setTimeout(() => {
      console.log('[vue-request] fetching data...');
      resolve(
          new Array(5).fill(null)
              .map(() => {
                return {
                  email: faker.internet.email(),
                  id: faker.datatype.number()
                }
              }))
    }, 700)
  });
}

export default defineComponent({
  components: {
    NInput, NSpin
  },
  setup() {

    const {data, loading, run} = useRequest(testService, {
      debounceInterval: 300,
      manual: true
    })

    const handleInput = () => {
      run();
    }

    return {
      handleInput,
      data,
      loading,
      emails: computed(() => {
        return data.value || [];
      })
    }
  }
})

</script>