<script>
import Header from '../components/Header.vue'
export default {
        name: 'Records',
        components: {Header},
        data() {
            return {
                patient: {
                    lastName: '',
                    givenName: '',
                    middleName: '',
                    sex: 'male',
                    birthDate: '',
                    age: null,
                    email: '',
                    contact: null,
                    physician: '',
                }
            }
        },
        methods: {
            // STORE PATIENT INFO IN DATABASE
            async saveInfo(){
                try {
                
                } catch (error) {
                    
                }
            },
        }
}
</script>

<template>
<Header />
    <div class="" id="recordsContainer">
        <div>
            <h5 style="color:#5BB95A; float: left;"><i class="bi bi-collection"></i> Results</h5>
            <button onclick="uploadImage()" id="searchButton" style="color: white;float: right;">Search</button>
            <input v-model="searchFilter" type="text" placeholder="Search...">
        </div>
        <div id="recordsDiv" >
            <div id="recordsHeader">
                <table>
                    <tr>
                        <th>Patient ID</th>
                        <th>Date Examined</th>
                        <th>Patient Name</th>
                        <th>Sex</th>
                        <th>Birthday</th>
                        <th>Age</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Assigned Physician</th>
                        <th>Results</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>

<style>
#recordsContainer{
    max-width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;
}
#recordsHeader{
    margin-top: 50px;
    background-color: #0072C6;
    min-height: 60px;
    padding-top: 15px;
    padding-left: 20px;
    color: #F2F2F2;
}
#recordsDiv{
    display: block;
    margin: auto;
    margin-top: 20px;
    width: 90%;
    min-height: 400px;
    background-color: #F2F2F2;
    }
#searchButton {
    margin-left: 10px; 
    position: relative; 
    font-size: 15px; 
    width: 4%;
    background-color: #8BC34A;
    border-radius: 5px;
    border-color:  #C7C7CC;
}
    input[type=text]{
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    border-color:#797979 ;
    float:right;
    padding-left: 5px;
}
table, th, td {
  border:1px solid black;
}
</style>
