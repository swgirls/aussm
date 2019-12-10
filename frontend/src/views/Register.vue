<template>
  <div>
    <h1>Register Schedule</h1>
    <br>
    <br>
    <input v-model="MovieTitle" placeholder="Title"/>
    <br>
    <br>
    <input v-model="Year" placeholder="Year"/>
    <br>
    <br>
    <input type="date" v-model="formData.mydate" />
    <br>
    <br>
    <button v-on:click="register">Register Schedule</button>
    <br>
    <br>
    </div>
</template>
<script>


</script>