<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
   <div class ="priorityList">
      <h1 style ="color :#2c3e50">Priority List</h1>
      <button v-on:click="updatePriority" style ="margin-left: 300px; width:100px; height: 30px; font-size: 20px;" id="Update">update</button>
      <hr style="border : 2px solid #8EC0E4; width : 450px;">

      <div v-if="showPriority"> 
      <div v-for="(schedule, index) in weeklyScheduleList">
         <img :src = "priorityImg[index]" style="width: 25px; height: 25px; margin-right:30px;">
         <span>{{ schedule.title }}</span>
         <br>
         <span>--------------------------------------------------------------------------------------------</span>
      </div>

      </div>
<!--         <span style ="color :#F0E5DE">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</span>-->
<!--         <br>-->
<!--         <img src = "../assets/two.png" style="width: 25px; height: 25px; margin-right:30px;">-->
<!--         <span>{{secondTitle}}</span>-->
<!--         <br>-->
<!--         <span style ="color :#F0E5DE">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</span>-->
<!--         <br>-->
<!--         <img src = "../assets/three.png" style="width: 25px; height: 25px; margin-right:30px;">-->
<!--         <span>{{thirdTitle}}</span>-->
<!--         <br>-->
<!--         <span style ="color :#F0E5DE">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</span>-->
<!--         <br>-->
<!--         <img src = "../assets/four.png" style="width: 25px; height: 25px; margin-right:30px;">-->
<!--         <span>{{fourthTitle}}</span>-->
<!--         <br>-->
<!--         <span style ="color :#F0E5DE">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</span>-->
<!--         <br>-->
<!--         <img src = "../assets/five.png" style="width: 25px; height: 25px; margin-right:30px;">-->
<!--         <span>{{fifthTitle}}</span>-->
<!--      </div>-->
      <br>

   </div>
</template>
<script>
   import axios from 'axios';
   
   var priorityImgList = ["./images/one.png", "./images/two.png","./images/three.png","./images/four.png","./images/five.png"];

   export default {
      data(){
         return {
            scheduleList :[],
            showPriority:false,
            weeklyScheduleList :[],

            priorityImg : [],
         }
      },
      methods:{
         updatePriority : async function (){
            this.weeklyScheduleList = [];
            var privateSchedule = [];
            var uniSchedule = [];
            var Schedule = [];
             await this.axios.get('/schedule')
                    .then((response)=>{

                       privateSchedule = response.data.pri;
                       uniSchedule = response.data.uni;
                    });
             for(var i = 0; i<privateSchedule.length; i++){
                var schedule = {date:privateSchedule[i].date, title:privateSchedule[i].title};
                Schedule.push(schedule);
             }
            for(var i = 0; i<uniSchedule.length; i++){
               var schedule = {date:uniSchedule[i].date, title:uniSchedule[i].title};
               Schedule.push(schedule);
            }
            this.scheduleList = Schedule;

            var d = new Date();

            var current_week_begin = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
            var current_week_end = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 7));
            //console.log(current_week_begin,current_week_end,typeof(current_week_begin));

            for(var i = 0; i<this.scheduleList.length; i++){
               var dateForm = this.scheduleList[i].date.substr(0,10);
               var date = new Date(dateForm);
               if(date.getDate() <= current_week_end.getDate() && date.getDate() >= current_week_begin.getDate()) {
                  this.weeklyScheduleList.push(this.scheduleList[i]);
               }
            }

            this.weeklyScheduleList.sort((a,b) => { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;});
            this.priorityImg = priorityImgList;
            console.log(this.weeklyScheduleList);
               //this.firstTitle = this.weeklyScheduleList[4].title;
               //this.secondTitle = this.weeklyScheduleList[3].title;
               //this.thirdTitle = this.weeklyScheduleList[2].title;
               //this.fourthTitle = this.weeklyScheduleList[1].title;
               //this.fifthTitle = this.weeklyScheduleList[0].title;
            
            this.scheduleList = [{}];
            this.showPriority = true;
         }
      }
   }
</script>
<style>
   #Update{
      margin-top:30px;
      background-color : white;
      border : 1.2px solid #4f953b;
      border-radius: 7px;
      color : #4f953b;
      height : 20px;
      width : 100px;
   }

</style>