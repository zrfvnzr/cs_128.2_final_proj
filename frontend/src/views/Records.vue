<script>
import Header from '../components/Header.vue'
export default {
        name: 'Records',
        components: {Header},
        data() {
            return {
                patients: [
                    // {
                    //     id: 1,
                    //     dateExamined: moment().format("MMM DD YYYY"), 
                    //     firstName: 'Paolo',
                    //     middleName: 'Mercado',
                    //     lastName: 'Licup',
                    //     sex: 'Male',
                    //     birthDate: 'May 10 2000',
                    //     age: 23,
                    //     email: 'jmlicup@up.edu.ph',
                    //     contact: '09560097819',
                    //     assignedPhysician: 'Doc Will',
                    //     testResult: 'With Diabetic Retinopathy'
                    // }
                ],  //patient records database
            }
        },
        computed:{
            formattedDate(date){
                   return moment(date).format("MMM DD YYYY") 
            }
        },
        methods: {
            async read() {
                try {
                    const response = await this.axios.post('/api/records/getAllRecords') 
                this.patients = response.data.rows;
                }
                catch(error) {  
                    alert(error.response.data.message)
                };
            },
            async myMounted(){
                await this.read()
            }
        },
        beforeRouteEnter (to, from, next) {
            next(async vm => {
                await vm.myMounted()
            })
        },
        async mounted(){
            await this.myMounted()
        }
}
</script>

<template>
<Header />
    <div class="" id="recordsContainer">
        <div class="recordsHeader">
            <h5 style="color:#5BB95A; float: left; position: absolute; bottom: 0;"><i class="bi bi-collection"></i> Results</h5>
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
                    <td>{{ patients[index].id }}</td>
                    <td>{{ formattedDate(patients[index].date_examined) }}</td>
                    <td class="wsnwoh">{{ patients[index].last_name + ", " + patients[index].first_name + " " + patients[index].middle_name }}</td>
                    <td>{{ patients[index].sex }}</td>
                    <td class="wsnwoh">{{ formattedDate(patients[index].birthday) }}</td>
                    <td>{{ patients[index].age }}</td>
                    <td class="wsnwoh">{{ patients[index].email }}</td>
                    <td>{{ patients[index].contact_number }}</td>
                    <td class="wsnwoh">{{ patients[index].assigned_physician }}</td>
                    <td class="wsnwoh">{{ patients[index].result }}</td>
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
th, td {
    padding: .5rem;
}
.wsnwoh {
    white-space: nowrap;
    overflow: hidden;
}
</style>
