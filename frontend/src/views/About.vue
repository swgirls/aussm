<template>
  <div class="about">
    <span style = "margin-left : 150px;font-size: 40px;">Your Calendar</span>
    <router-link to ="/register"><button id="createButton" style ="margin-left: 50px; width:100px; height: 30px; font-size: 20px;">Create</button></router-link>
    <router-link to ="/delete"><button id="deleteButton" style ="margin-left: 20px; width:100px; height: 30px; font-size: 20px;">Delete</button></router-link>
    <Calendar style ="width : 70%; height: 100%; float : right;"/>
    <PriorityList style ="width : 30%; height: 100%; float: left;"/>
  </div>
</template>
<script>
import Calendar from '../components/Calendar.vue';
import PriorityList from '../components/PriorityList.vue';
import axios from 'axios';


export default {
  name : 'about',
  components : {
    Calendar,
    PriorityList,
  },
  methods : {
  }
}
</script>
<style>
#createButton{
        background-color : white;
        border : 1.2px solid #4f953b;
        border-radius: 7px;
        color : #4f953b;
        height : 20px;
        width : 100px;
    }
  #deleteButton{
    background-color : white;
    border : 1.2px solid #4f953b;
    border-radius: 7px;
    color : #4f953b;
    height : 20px;
    width : 100px;
  }

</style>