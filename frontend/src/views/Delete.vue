<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <img alt="Vue logo" src="../assets/logo.png" style ="width : 700px; height : 250px;">
        <h1>Delete Schedule</h1>
        <br>
        <br>
        <input v-model="title" placeholder="Title"/>
        <br>
        <br>
        <br>
        <br>
        <button v-on:click="deletion" id = "deleteButton">Delete Schedule</button>
        <br>
        <br>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'delete',
        data() {
            return {
                title: '',
                subject : '',
            }
        },
        methods : {
            deletion : async function() {
                var title = this.title;
                const deleteSchedule = await this.axios.delete('/deletepriSchedule/'+title);
                if(deleteSchedule == "false") {
                    alert("Delete Fail!");
                }
                else {
                    alert("Delete Success!");
                }
                this.$router.push({
                    name:'about'
                })
            }
        }
    }

</script>
<style>
    #deleteButton{
        background-color : white;
        border : 1.2px solid #4F86C6;
        border-radius: 7px;
        color : #4F86C6;
        width : 200px;
    }
</style>