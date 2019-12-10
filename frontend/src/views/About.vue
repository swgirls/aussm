<template>
  <div class="about">
    <span style = "margin-left : 150px;font-size: 40px;">Your Calendar</span>
    <router-link to ="/register"><button id="createButton" style ="margin-left: 50px; width:100px; height: 30px; font-size: 20px;">Create</button></router-link>
    <Calendar style ="width : 1000px; height: 700px; float : right;"/>
    <PriorityList style ="width : 500px; height: 700px; float: left;"/>
  </div>
</template>
<script>
import Calendar from '../components/Calendar.vue';
import PriorityList from '../components/PriorityList.vue';


export default {
  name : 'about',
  components : {
    Calendar,
    PriorityList,
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
</style>