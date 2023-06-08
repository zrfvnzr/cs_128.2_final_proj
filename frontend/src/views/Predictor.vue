<script>
import Header from '../components/Header.vue'
import Loading from '../components/Loading.vue'
export default {
        name: 'Predictor',
        components: {Header, Loading},
        data() {
            return {
                isLoading: false,
                patient: {
                    lastName: '',
                    givenName: '',
                    middleName: '',
                    sex: 'male',
                    birthday: '',
                    age: null,
                    email: '',
                    contact: null,
                    assignedPhysician: '',
                },
                fundusIMG: null,
                patientID: null, //pero ito diba auto-generatedonce nasave sa database pati
                dateExamined: Date, // ito diba
            }
        },
        methods: {
            // STORE PATIENT INFO IN DATABASE
            async saveInfo(){
                // TO DO
                try {
                    console.log(this.patient)
                    // DATABASE FOR PATIENT RECORDS
                    const response = await this.axios.post('/api/records', {
                        lastName: this.patient.lastName,
                        givenName: this.patient.givenName,
                        middleName: this.patient.middleName,
                        sex: this.patient.sex,
                        birthday: this.patient.birthday,
                        age: this.patient.age,
                        email: this.patient.email,
                        contact: this.patient.contact,
                        assignedPhysician: this.patient.assignedPhysician,
                    })
                    this.isLoading = false
                } catch (error) {
                    alert('Error on saveInfo ')
                    this.isLoading = false
                }
            },
            // SELECT IMAGE 
            uploadImage(){
                this.$refs.fileInput.click();

            },
            handleFileSelect(event){
                const file = event.target.files[0];
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    this.fundusIMG = e.target.result;
                }
                fileReader.readAsDataURL(file);
            },
            // PREDICTOR
            async predictImage(){
                try {
                    let formData = new FormData();
                    let imageFile = fundusIMG
                    // formData.append("file", imagefile.files[0]);
                    formData.append("file", imageFile)

                    // axios.post('upload_file', formData, {
                    //     headers: {
                    //     'Content-Type': 'multipart/form-data'
                    //     }
                    // })

                    this.isLoading = true
                    const response = await this.axios.post('https://deep-dr-flask.up.railway.app/api/predict', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    this.isLoading = false
                } catch (error) {
                    alert(error.response.data.message)
                    this.isLoading = false
                }
            }
        }
}
</script>

<template>
<Loading v-if="isLoading" />
<Header />
    <div v-if="!isLoading" class="p-4" id="container">
        <div class="patientInformation">
            <form class="row" style="">
                <div class="col-md" style="width: 20%;">
                        <label for="lastName">Last Name <h6 style="display: inline; color: red;">*</h6></label>
                        <input v-model="patient.lastName" type="text" class="form-control" name="lastName" id="lastName" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="givenName">Given Name <h6 style="display: inline; color: red;">*</h6></label>
                    <input v-model="patient.givenName" type="text" class="form-control" name="givenName" id="givenName" placeholder="">
                </div>
                <div class="col-md" style="display: inline;">
                    <label for="middleName">Middle Name</label>
                    <input v-model="patient.middleName" type="text" class="form-control" name="middleName" id="middleName" placeholder="  ">
                </div>
                <div class="col-md" style="margin-top: 20px;">
                    <!-- <label for="sex" style="padding-right: 10px;">Sex <h6 style="display: inline; color: red;">*</h6></label> -->
                    <div class="form-check form-check-inline" >
                        <input v-model="patient" :value="'male'" class="form-check-input" type="radio" name="sex" id="male">
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input v-model="patient" :value="'female'" class="form-check-input" type="radio" name="sex" id="female" >
                        <label class="form-check-label" for="female">Female</label>
                    </div>
                </div>
            </form>
            <form class="row" style="">
                <div class="col-md" style="width: 20%;">
                        <label for="birthday">Date of Birth <h6 style="display: inline; color: red;">*</h6></label>
                        <input v-model="patient.birthday" type="text" class="form-control" name="birthday" id="birthday" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="age">Age</label>
                    <input v-model="patient.age" type="text" class="form-control" name="age" id="age" placeholder="">
                </div>
                <div class="col-md" style="display: inline;">
                    <label for="email">Email Address</label>
                    <input v-model="patient.email" type="text" class="form-control" name="email" id="email" placeholder="  ">
                </div>  
                <div class="col-md" style="width: 20%;">
                        <label for="contact">Contact Number <h6 style="display: inline; color: red;">*</h6></label>
                        <input v-model="patient.contact" type="text" class="form-control" name="contact" id="contact" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="assignedPhysician">Assigned assignedPhysician <h6 style="display: inline; color: red;">*</h6></label>
                    <input v-model="patient.assignedPhysician" type="text" class="form-control" name="assignedPhysician" id="assignedPhysician" placeholder="">
                </div>
            </form>
        </div>
        <div id="uploadImageDIv" >
            <div id="upimgHeader">
                <h5 style="display: inline; float: left;"><i class="bi bi-card-image" style="padding-right: 5px"></i>Upload Image</h5>
                <button @click="uploadImage" id="uploadButton" style="color: white">Select Image</button>
                <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleFileSelect">
            </div>
            <div id="imageDiv" style="background-color: white;">
                <img :src="fundusIMG" v-if="fundusIMG" alt="Uploaded Image">
            </div>
            <button @click="predictImage(); saveInfo();" id="predictButton" style="color: white; font-weight: 500;">Predict</button>
        </div>
    </div>

</template>

<style>
    #container{
        max-width: 100%;
        min-height: 100vh;
        background-color: #F2F2F2;
    }
    #uploadImageDIv{
        margin: auto;
        margin-top: 20px;
        max-width: 40%;
        min-height: 400px;
        background-color: #F2F2F2;
        border-width: 1px;
        border-style: solid;
        border-radius: 10px;
        border-color:#0072C6 ;
        text-align: center;
    }
    #upimgHeader{
    background-color: #0072C6;
    border-radius:10px 10px 0px 0px;
    min-height: 60px;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    color: #F2F2F2;
    min-width: 100%;
    }
    #imageDiv{
    margin: auto;
    margin-top: 10px;
    width: 60%;
    height: 275px;
    border-radius: 10px;
    overflow: hidden;
    }
    #imageDiv img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #uploadButton {
        display: inline;
        position: relative; 
        float: right;
        /* margin-top: 15px;
        margin-right: 20px ; */
        font-size: 15px; 
        min-width: 20%;
        background-color: #8BC34A;
        border-radius: 5px;
        border-color:  #C7C7CC;
    }
    #uploadButton:hover{
        background-color: #5BB95A;
    }
    #uploadButton:active {
        background-color: #5BB95A;
        box-shadow: 0 5px #666;
        transform: translateY(1px);
    }
    #predictButton {
        position: relative; 
        margin-top: 1%;
        font-size: 15px; 
        min-width: 20%;
        background-color: #8BC34A;
        border-radius: 5px;
        border-color:  #C7C7CC;
    }
    #predictButton:hover{
        background-color: #5BB95A;
    }
    #predictButton:active {
        background-color: #5BB95A;
        box-shadow: 0 5px #666;
        transform: translateY(1px);
    }
    input[type=text]{
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    border-color:#5BB95A ;
    }
</style>
