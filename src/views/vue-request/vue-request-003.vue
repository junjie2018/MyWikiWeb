<template>
  <NCard class="polling-demo-conatiner">
    <NStatistic label="User count" :value="userCount"/>
  </NCard>
</template>

<script lang="ts">

import {faker} from '@faker-js/faker';
import gsap from 'gsap';
import {defineComponent, ref, computed, reactive} from "vue";
import {NCard, NStatistic} from 'naive-ui';
import {useRequest} from "vue-request";

// 3秒后随机返回一个数字
function testService(name: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(faker.datatype.number());
    }, 3000)
  })
}

export default defineComponent({
  components: {
    NCard,
    NStatistic,
  },
  setup() {

    const userInfo = reactive({
      count: 0
    })

    useRequest(
        testService,
        {
          pollingInterval: 1000,
          initialData: 0,
          onSuccess: data => {
            // 在gsap眼里，这个userInfo可能只是一个普通的对象
            gsap.to(userInfo, {duration: 5, count: data})
          }
        });

    const userCount = computed(() => {

      return parseInt(userInfo.count.toFixed(0).toLocaleString())
    })

    return {
      userCount
    }
  }
})

</script>