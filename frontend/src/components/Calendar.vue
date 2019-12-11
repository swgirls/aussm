<template>
  <div class="calendar">
      <h2>
        <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
        {{currentYear}}년 {{currentMonth}}월
        <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
        <button id="createButton" v-on:click="updateSchedule" style ="margin-left: 50px; width:100px; height: 30px; font-size: 20px;">Update</button>
      </h2>
      <table class="table table-hover">
          <thead>
            <tr>
              <td v-for="(weekName, index) in weekNames" v-bind:key="index">
                {{weekName}}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
              <td v-for="(day, index2) in row" :key="index2" style="padding:20px;">
                <span v-if="isToday(currentYear, currentMonth, day)" class="rounded">
                  {{day}}
                </span>
                <span v-else>
                  {{day}}
                  <!--<span>HELLO</span>-->
                </span>
                <br>
                <span v-if="isPrivateSchedule(currentYear,currentMonth,day)" style ="color : #F6B352" v-on:click = "deletepriSchedule(pstitle)">
                {{ pstitle }}
                </span>
                <br>
                <span v-if = "isUniversitySchedule(currentYear,currentMonth,day)" style ="color : #6C49B8" v-on:click = "deleteuniSchedule(ustitle)">
                {{ ustitle }}
                <br>
                {{ ussubname }}
                </span>
              </td>
            </tr>
          </tbody>
      </table>    
  </div>
</template>

<script>
import axios from 'axios';

var privateschedules = [];
var universityschedules = [];
export default {
  name: 'Calendar',
  data () {
    return {
      weekNames: ["Mon", "Tue", "Wed","Thu", "Fri", "Sat", "Mon"],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()+1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
      pstitle : '',
      ustitle : '',
      ussubname : '',
    }
  },
  mounted(){
      this.init();
  },
  async beforeCreate() {
    const resultSchedule = await this.axios.get('/schedule');
        privateschedules = resultSchedule.data.pri;
        universityschedules = resultSchedule.data.uni;
        //console.log(this.privateschedules, this.universityschedules);
  },
  methods: {
     updateSchedule : function (){
          this.$router.push({
            name:'home'
          })
          
      },
      deletepriSchedule : async function(title) {
          const deleteSchedule = await this.axios.delete('/deletepriSchedule/'+title);
          if(deleteSchedule == "false") {
            alert("Delete Fail!");
          }
          else {
            alert("Delete Success!");
          }
          this.$router.push({
            name:'home'
          })
      },
      deleteuniSchedule : async function(utitle) {
          const deleteSchedule2 = await this.axios.delete('/deleteuniSchedule/'+utitle);
          if(deleteSchedule == "false") {
            alert("Delete Fail!");
          }
          if(deleteSchedule2 == "true") {
            alert("Delete Success!");
          }
      },
      isPrivateSchedule: function(year,month,day){
        //console.log(privateschedules[0]);
        for (let i = 0; i < privateschedules.length; i++) {
          var dateForm = privateschedules[i].date.substr(0,10);
          var date = new Date(dateForm);
          //console.log("fff"+date.getFullYear());
          if (year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate()){
              this.pstitle = privateschedules[i].title;
              return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
          }
        } 
      },
      isUniversitySchedule: function(year,month,day){
        for (let i = 0; i < universityschedules.length; i++){
          var dateForm = universityschedules[i].date.substr(0,10);
          var date = new Date(dateForm);
          //console.log(universityschedules[i]);
          if(year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate()){
            this.ustitle = universityschedules[i].title;
            this.ussubname = universityschedules[i].subjectName;
            return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
          }
        } 
      },
      init:function(){
        this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
      initCalendar:function(){
        this.currentCalendarMatrix = [];
        let day=1;
        for(let i=0; i<6; i++){
          let calendarRow = [];
          for(let j=0; j<7; j++){
            if(i==0 && j<this.currentMonthStartWeekIndex){
              calendarRow.push("");
            }
            else if(day<=this.endOfDay){
              calendarRow.push(day);
              day++;
            }
            else{
              calendarRow.push("");
            }
          }
          this.currentCalendarMatrix.push(calendarRow);
        }
      },
      getEndOfDay: function(year, month){
          switch(month){
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                return 31;
                break;
              case 4:
              case 6:
              case 9:
              case 11:
                return 30;
                break;
              case 2:
                if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                return 29;   
                }
                else{
                    return 28;
                }
                break;
              default:
                console.log("unknown month " + month);
                return 0;
                break;
          }
      },
      getStartWeek: function(targetYear, targetMonth){
        let year = this.rootYear;
        let month = 1;
        let sumOfDay = this.rootDayOfWeekIndex;
        while(true){
          if(targetYear > year){
            for(let i=0; i<12; i++){
              sumOfDay += this.getEndOfDay(year, month+i);
            }
            year++;
          }
          else if(targetYear == year){
            if(targetMonth > month){
              sumOfDay += this.getEndOfDay(year, month);
              month++;
            }
            else if(targetMonth == month){
              return (sumOfDay)%7;
            }
          }
        }
      },
      onClickPrev: function(month){
        month--;
        if(month<=0){
          this.currentMonth = 12;
          this.currentYear -= 1;
        }
        else{
          this.currentMonth -= 1;
        }
        this.init();
      },
      onClickNext: function(month){
        month++;
        if(month>12){
          this.currentMonth = 1;
          this.currentYear += 1;
        }
        else{
          this.currentMonth += 1;
        }
        this.init();
      },
      isToday: function(year, month, day){
        let date = new Date();
        return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
      }
  }
}
</script>

<style type="text/css">
    .rounded {
      -moz-border-radius:20px 20px 20px 20px; 
      border-radius:20px 20px 20px 20px;
      border:solid 1px #ffffff;
      background-color:#2b6bd1;
      padding:10px;
      color:#ffffff;
    }
</style>