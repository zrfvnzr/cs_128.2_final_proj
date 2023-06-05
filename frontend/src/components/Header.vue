<script>

export default {
    name: 'Header',
    methods: {
        goToRecords() {
            location.href = '/records'
        },
        goToPredictor() {
            location.href = '/predictor'
        },
        goToHome(){
            location.href = './home'
        },       
        async signoutButton(){
            try {            
                await router.post("/api/auth/logout");
                this.$router.push("/login?loggedOut=1");
            } catch (error) {
                console.log(error)
            }
        }
    }
}

</script>

<template>
<div class="headerContainer">
    <div class="leftHeader" style="">
        <a @click="goToHome" href="#"><h5 style="display: inline;">Home</h5></a> 
        <a @click="goToPredictor" href="#"><h5 style="display: inline; margin-left: 30px ;">Predictor</h5></a> 
        <a @click="goToRecords" href="#"><h5 style="display: inline; margin-left: 30px ;">Records</h5></a> 
    </div>
    <a href="">
            <div class="midheader" style="padding-right: 30px;">
                    <h1 style="display: inline; font-weight:600; color: #5BB95A;">Deep</h1>
                    <h1 style="display: inline; font-weight:700; color: #00A0DC;">DR</h1>
            </div>
    </a> 
    <button id="signoutButton" style="color: white;">Log Out</button>
</div>
</template>

<style>
.leftHeader {
    display:inline; 
    float: left;
    margin-top:  20px;
}
.midheader{
    display: inline;
    position: relative;
}
.headerContainer{
    min-width: 100%;
    min-height: 60px;
    background-image: url('headerBG.png');
    background-size: cover;
    color: black;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
}
a {
    margin-top:  20px;
    color: black;
    text-decoration: none;
    position: static;
}

a:hover {
    color: #5BB95A;
    background-color: transparent;
    text-decoration: none;
}
#signoutButton {
    display: inline;
    position: relative; 
    float: right;
    margin-top: 20px;
    font-size: 15px; 
    width: 10%;
    background-color: #8BC34A;
    border-radius: 5px;
    border-color:  #C7C7CC;
}
#signoutButton:hover{
    background-color: #5BB95A;
}
#signoutButton:active {
    background-color: #5BB95A;
    box-shadow: 3px #666;
   
}
</style>
