<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style ="width : 700px; height : 250px;">
    <HelloWorld msg="Welcome to AUSSM"/>
    <img src = "../assets/university.jpg" style ="width: 500px; height : 300px;">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
