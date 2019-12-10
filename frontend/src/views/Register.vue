<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" style ="width : 700px; height : 250px;">
    <h1>Register Schedule</h1>
    <br>
    <br>
    <input v-model="title" placeholder="Title"/>
    <br>
    <br>
    <input type="date" v-model="dueDate" />
    <br>
    <br>
    <button v-on:click="register" id = "registerButton">Register Schedule</button>
    <br>
    <br>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'register',
  data() {
    return {
      title: '',
      subject : '',
      dueDate: '',
    }
  },
  methods : {
    register : async function() {
        var dateForm = this.dueDate.substr(0,10);
        var date = new Date(dateForm);
        console.log(dateForm, date);
        const result = await this.axios.post('/register', {title : this.title, date : date});
        if(result.data == "true"){
           alert("Create Schedule!");
        }
        this.dueDate = '';
        this.title = '';
        this.$router.push({
          name: 'home'
        });
    }
  }
}

</script>
<style>
#registerButton{
        background-color : white;
        border : 1.2px solid #4F86C6;
        border-radius: 7px;
        color : #4F86C6;
        height : 30px;
        width : 200px;
    }
</style>