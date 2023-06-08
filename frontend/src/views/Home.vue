<script>
import Header from '../components/Header.vue'
import Loading from '../components/Loading.vue'
export default {
    name: 'Home',
    components: {Header, Loading},
}
</script>

<template>
    <div>
        <div class="centered-div background-cover">
            <Header></Header>
            <h1 id="app-title">Deep<span id="app-title-dr">DR</span></h1>
            <p id="app-subtitle-1">Sight-saving. Insightful. Envisioning.</p>
            <p id="app-subtitle-2">Bring clarity in eye health with UP Manila’s DeepDR, where our system harnesses artificial intelligence 
                to deliver a precise and reliable prediction, and ensure early intervention and improved patient outcomes for a brighter future and eyesight.</p>
        </div>
        <div class="centered-div">
            <h1 id="creators-style">CREATORS</h1>
            <div class="avatar-group flex-wrap">
                <div class="avatar">
                    <img src="../components/paolo.png" alt="Paolo Licup">
                    <p class="avatar-name">JOHN PAOLO LICUP</p>
                    <p class="avatar-pos">Head Developer</p>
                </div>
                <div class="avatar">
                    <img src="../components/emman.jpg" alt="Emman Ednalan">
                    <p class="avatar-name">EMMANUEL EDNALAN</p>
                    <p class="avatar-pos">Frontend Developer</p>
                </div>
                <div class="avatar">
                    <img src="../components/dhone.jpg" alt="Dan Calibuyot">
                    <p class="avatar-name">DHONE CALIBUYOT</p>
                    <p class="avatar-pos">Frontend Developer</p>
                </div>
                <div class="avatar">
                    <img src="../components/nath.png" alt="Nath Ortega">
                    <p class="avatar-name">NATHANIEL ORTEGA</p>
                    <p class="avatar-pos">Backend Developer</p>
                </div>
                <div class="avatar">
                    <img src="../components/seth.png" alt="Seth Saluta">
                    <p class="avatar-name">SETH JARED SALUTA</p>
                    <p class="avatar-pos">Backend Developer</p>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.centered-div{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.background-cover{
    background: url('../components/navbar-bg.png') no-repeat center center fixed;
    background-size: cover;
    height: 400px;
}

#app-title{
    margin-top: 20px;
    font-size: 50px;
    font-weight: 800;
    color: #5BB95A;
}

#app-title-dr{
    color: #00A0DC;
}

#app-subtitle-1{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    margin-top: -10px;
}

#app-subtitle-2{
    margin: 10px;
    text-align: center;
    font-size: 21px;
    line-height: 23px;
    padding-left: 6rem;
    padding-right: 6rem;
}

#creators-style{
    margin-top: 30px;
    font-weight: 800;
    color: #0072C6;
}

.avatar-group{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 30px;
}

.avatar {
    display: flex;
    flex-direction: column;
    width: 250px; 
    margin-bottom: 1in;
}

.avatar img {
    width: 150px;
    height: 150px;
    align-self: center;
    border-radius: 50%;

}

.avatar-name{
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    line-height: 19px;
}

.avatar-pos{
    font-size: 16px;
    text-align: center;
    margin-top: -20px;
    margin-bottom: 10px;
}

</style>
