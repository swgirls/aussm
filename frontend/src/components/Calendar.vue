<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="calendar">
      <h2>
        <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
        {{currentYear}}년 {{currentMonth}}월
        <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
        <button id="createButton" v-on:click="updateSchedule" style ="margin-left: 50px; width:100px; height: 30px; font-size: 20px;">Update</button>
          <div class="popup" id="popUp">
              <span class="helper" id="helperPopUp"></span>
              <div>
                  <div style="font-size: 20px;margin-top: 10px; color: #2b6bd1" >This Is Your University Schedule List</div>
                    <div v-for="(name,index) in uList" v-bind:key="index">
                        <div style="color: black; font-style: normal; font-size: 20px;
                              margin-top: 10px">{{index+1}}. {{name.title}}<br></div>
                    </div>
                  <button v-on:click="popupCloseButton" style="margin-top: 10px; margin-bottom: 10px; background-color : white; border : 1.2px solid #4f953b; border-radius: 7px; color : #4f953b;">
                      <div style="margin: 10px; font-size:20px">OK, I WANT UPDATE</div>
                  </button>

              </div>
          </div>

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
                <span v-if="isPrivateSchedule(currentYear,currentMonth,day)" style ="color : #F6B352">
                {{ pstitle }}
                </span>
                <br>
                <span v-if = "isUniversitySchedule(currentYear,currentMonth,day)" style ="color : #6C49B8">
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
var anotherUniversityS = [];
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
        uList : [],
        pList: [],
        justForComputed:0,
    }
  },
  mounted(){
      this.init();
  },
  async beforeCreate() {
    const resultSchedule = await this.axios.get('/schedule');
        privateschedules = resultSchedule.data.pri;
        this.pList = privateschedules;
        //console.log(this.privateschedules, this.universityschedules);
  },
  methods: {
      async popupCloseButton(){
          document.getElementById('popUp').style.display = 'block';
          document.getElementById('popUp').style.visibility = 'hidden';
          const resultSchedule = await this.axios.get('/schedule');
          universityschedules = resultSchedule.data.uni;
          this.uList = universityschedules;
            this.justForComputed = 1;
      },
      updateSchedule : async function (){
         document.getElementById('popUp').style.display = 'block';
         document.getElementById('popUp').style.visibility = 'visible';
          const resultSchedule = await this.axios.get('/schedule');
          anotherUniversityS = resultSchedule.data.uni;
          this.uList = anotherUniversityS;

      }, //비교해서 새로운거 넣는거 없앰
      isPrivateSchedule: function(year,month,day){
        //console.log(privateschedules[0]);
        for (let i = 0; i < this.pList.length; i++) {
          var dateForm = this.pList[i].date.substr(0,10);
          var date = new Date(dateForm);
          //console.log("fff"+date.getFullYear());
          if (year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate()){
              this.pstitle = this.pList[i].title;
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
  },
    // computed:{
    //     isUniversitySchedule: function(year,month,day){
    //         for (let i = 0; i < universityschedules.length; i++){
    //             var dateForm = universityschedules[i].date.substr(0,10);
    //             var date = new Date(dateForm);
    //             var a = this.justForComputed;
    //             //console.log(universityschedules[i]);
    //             if(year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate()){
    //                 this.ustitle = universityschedules[i].title;
    //                 this.ussubname = universityschedules[i].subjectName;
    //                 return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate();
    //             }
    //         }
    //     },
    // }
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
    .popup{
        background:rgba(0,0,0,.4);
        clear:both;
        position: fixed;
        height: 100%;
        position: fixed;
        align-content: center;
        text-align: center;
        width: 100%;
        top: 0;
        left: 0;
        display: none;
        /*clear: both;*/
        cursor:pointer;
        /*display:none;*/
        /*height:100%;*/
        /*position:fixed;*/
        /*text-align:center;*/
        /*top:0;*/
        /*width:100%;*/
    }
    .popup .helper{
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .popup> div {
        background-color: #fff;
        box-shadow: 10px 10px 60px #555;
        display: inline-block;
        height: auto;
        max-width: 551px;
        min-height: 100px;
        vertical-align: middle;
        width: 100%;
        position: center;
        border-radius: 8px;
        /*padding: 15px 5%;*/
    }
    .popupCloseButton {
        background-color: #fff;
        border: 3px solid #999;
        border-radius: 50px;
        cursor: pointer;
        display: inline-block;
        font-family: arial;
        font-weight: bold;
        position: absolute;
        top: -20px;
        right: -20px;
        font-size: 25px;
        line-height: 30px;
        width: 30px;
        height: 30px;
        text-align: center;
    }
    .popupCloseButton:hover {
        background-color: #ccc;
    }
</style>