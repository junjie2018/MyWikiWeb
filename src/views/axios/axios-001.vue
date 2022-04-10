<template>
  <div>
    测试Axios中。。。
    <button @click="handleGet01">handleGet01</button>
    <button @click="handleGet02">handleGet02</button>
    <button @click="handleGet03">handleGet03</button>
    <button @click="handlePost01">handlePost01</button>
    <button @click="handlePost02">handlePost02</button>
    <button @click="handlePost03">handlePost03</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";


export default defineComponent({
  setup() {
    // 这种写法以后估计不会用，非常不优雅
    const handleGet01 = function () {
      axios
          .get('http://localhost:8081/user?ID=12345')
          .then(function (response) {
            // 处理成功情况
            console.log(response);
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error)
          })
          .then(function () {
            // 总是会执行
            console.log("Running...")
          })
    }
    const handleGet02 = function () {
      axios
          .get('http://localhost:8081/user', {params: {ID: 12345}})
          .then(function (response) {
            // 处理成功情况
            console.log(response);
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error)
          })
          .then(function () {
            // 总是会执行
            console.log("Running...")
          })
    }
    const handleGet03 = async function () {
      try {
        const response = await axios.get('http://localhost:8081/user', {params: {ID: 12345}})
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    const handlePost01 = function () {
      axios
          .post(
              'http://localhost:8081/user',
              {firstName: 'Fred', lastName: 'FlintStone'},
              {params: {ID: 12345}}
          )
          .then(function (response) {
            // 处理成功情况
            console.log(response);
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error)
          })
    }

    const handlePost02 = function () {

      function getUserAccount() {
        return axios.get('http://localhost:8081/user/12345')
      }

      function getUserPermissions() {
        return axios.get('http://localhost:8081/user/12345/permissions')
      }

      Promise
          .all([getUserAccount(), getUserPermissions()])
          .then(function (results) {
            const acct = results[0];
            const perm = results[1];
          })
    }

    const handlePost03 = function () {
      axios({
        method: 'post',
        url: 'http://localhost:8081/user',
        data: {
          firstName: 'Fred',
          lastName: 'FlintStone'
        }
      });
    }

    return {
      handleGet01,
      handleGet02,
      handleGet03,

      handlePost01,
      handlePost02,
      handlePost03,
    }
  }
})

</script>