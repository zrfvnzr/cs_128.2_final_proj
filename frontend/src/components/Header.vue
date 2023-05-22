<script>
export default {
        name: 'Header'
}
</script>

<template>
<div class="headerContainer">
        <a href=""><h5 style="display: inline;">Predictor</h5></a> 
        <a href=""><h5 style="display: inline; padding-left: 50px ;">Records</h5></a> 
        <a href="">
                <div style="display: inline; padding-left: 420px ;">
                        <h1 style="display: inline; font-weight:600; color: #5BB95A;">Deep</h1>
                        <h1 style="display: inline; font-weight:700; color: #00A0DC;">DR</h1>
                </div>
        </a> 
        <button id="signoutButton" style="color: white">Sign Out</button>
</div>
</template>

<style>
.headerContainer{
    min-width: 100%;
    min-height: 70px;
    background-image: url('../assets/headerBG.jpg');
    padding-top: 10px;
    padding-left: 50px;
    color: black;
}
a {
    color: black;
    text-decoration: none;
}
a:hover {
    color: #5BB95A;
    background-color: transparent;
    text-decoration: none;
}
#signoutButton {
    margin-left: 470px; 
    position: relative; 
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
