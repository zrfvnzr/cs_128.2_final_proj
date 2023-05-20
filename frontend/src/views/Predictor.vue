<script>
import Header from '../components/Header.vue'
export default {
        name: 'Predictor',
        components: [Header]
}
</script>

<template>
<Header />
    <div class="" id="container">
        <div>
            <form class="row" style="padding: 10px;">
                <div class="col-md" style="width: 20%;">
                        <label for="lastName">Last Name <h6 style="display: inline; color: red;">*</h6></label>
                        <input type="text" class="form-control" name="lastName" id="lastName" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="givenName">Given Name <h6 style="display: inline; color: red;">*</h6></label>
                    <input type="text" class="form-control" name="givenName" id="givenName" placeholder="">
                </div>
                <div class="col-md" style="display: inline;">
                    <label for="middleName">Middle Name</label>
                    <input type="text" class="form-control" name="middleName" id="middleName" placeholder="  ">
                </div>
                <div class="col-md">
                    <label for="sex" style="padding-right: 10px;">Sex <h6 style="display: inline; color: red;">*</h6></label>
                    <div class="form-check form-check" >
                        <input class="form-check-input" type="radio" name="sex" id="male" value="option1">
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="sex" id="female" value="option2">
                        <label class="form-check-label" for="female">Female</label>
                    </div>
                </div>
            </form>
            <form class="row" style="padding: 10px">
                <div class="col-md" style="width: 20%;">
                        <label for="birthDate">Date of Birth <h6 style="display: inline; color: red;">*</h6></label>
                        <input type="text" class="form-control" name="birthDate" id="birthDate" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="age">Age</label>
                    <input type="text" class="form-control" name="age" id="age" placeholder="">
                </div>
                <div class="col-md" style="display: inline;">
                    <label for="email">Email Address</label>
                    <input type="text" class="form-control" name="email" id="email" placeholder="  ">
                </div>  
                <div class="col-md" style="width: 20%;">
                        <label for="contact">Contact Number <h6 style="display: inline; color: red;">*</h6></label>
                        <input type="text" class="form-control" name="contact" id="contact" placeholder="">
                </div>
                <div class="col-md" style="width: 30%;">
                    <label for="physician">Assigned Physician <h6 style="display: inline; color: red;">*</h6></label>
                    <input type="text" class="form-control" name="physician" id="physician" placeholder="">
                </div>
            </form>
        </div>
        <div id="uploadImageDIv" >
            <div id="upimgHeader">
                <h5 style="display: inline;"><i class="bi bi-card-image" style="padding-right: 5px;"></i>Upload Image</h5>
                <button id="uploadButton" style="color: white">Select Image</button>
            </div>
            <div id="imageDiv" >
            
            </div>
            <button id="predictButton" style="color: white; font-weight: 500;">Predict</button>
        </div>
    </div>

</template>

<style>
#upimgHeader{
    background-color: #0072C6;
    border-radius:10px 10px 0px 0px;
    height: 60px;
    padding-top: 15px;
    padding-left: 20px;
    color: #F2F2F2;
}
#container{
    max-width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
}
#uploadImageDIv{
    display: block;
    margin: auto;
    margin-top: 20px;
    width: 40%;
    height: 400px;
    background-color: #F2F2F2;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    border-color:#0072C6 ;
    }
    #imageDiv{
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 60%;
    height: 275px;
    border-radius: 10px;
    background-image: url('emptyimg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    }
    #uploadButton {
        margin-left: 285px; 
        position: relative; 
        font-size: 15px; 
        width: 20%;
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
        margin-left: 250px; 
        position: relative; 
        top: 2%;
        font-size: 15px; 
        width: 20%;
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
