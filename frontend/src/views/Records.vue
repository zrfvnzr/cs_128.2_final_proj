<script>
import Header from '../components/Header.vue'
export default {
        name: 'Records',
        components: {Header},
        data() {
            return {
                patients: [],  //patient records database 
                searchFilter: '',
                filteredPatients: []
            }
        },
        computed:{

        },
        methods: {
            search(){
                this.filteredPatients = this.patients.filter((patient) =>
                patient.toLowerCase().includes(this.searchFilter.toLocaleLowerCase()))
            },
            read() {
                axios.get('/api/patientRecords').then(({ data }) => {
                    this.patients = data;

                })
                    .catch((err) => console.error(err));
            },
            mounted(){
                this.read()
            }
        }
}
</script>

<template>
<Header />
    <div class="" id="recordsContainer">
        <div class="recordsHeader">
            <h5 style="color:#5BB95A; float: left; position: absolute; bottom: 0;"><i class="bi bi-collection"></i> Results</h5>
            <button @click="search" id="searchButton" style="color: white;float: right; position: absolute; bottom: 0; right: 0;">Search</button>
            <input v-model="searchFilter" type="text" placeholder="Search..." style="float: right; position: absolute; bottom: 0; right: 0; margin-right: 70px;">
        </div>
        <div id="recordsDiv" >
            <table style="width: 100%;">
                <thead style="position: sticky;">
                    <tr style="background-color: #00A0DC; height: 70px; text-align: center;">
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
                </thead>
                <tbody style="overflow-y: scroll;">
                    <tr v-for="(patient, index) in patients" :key="index">
                    <td>{{ patients.id }}</td>
                    <td>{{ patients.dateExamined }}</td>
                    <td>{{ patients.lastName }} + "," + {{ patients.givenName }}</td>
                    <td>{{ patients.sex }}</td>
                    <td>{{ patients.birthDate }}</td>
                    <td>{{ patients.age }}</td>
                    <td>{{ patients.email }}</td>
                    <td>{{ patients.contact }}</td>
                    <td>{{ patients.physician }}</td>
                    <td>{{ patients.testResult }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<style>
.recordsHeader{
    min-height: 50px ;
    max-width: 90%;
    margin: auto;
    position: relative;
}
#recordsContainer{
    max-width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;
}
#recordsDiv{
    margin: auto;
    width: 90%;
    min-height: 400px;
    background-color: #F2F2F2;
    margin-top:10px ;
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
