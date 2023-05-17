<script>
export default {
        name: Header
}
</script>

<template>
<div class="container">
    <div id="upimgHeader">
        <a href=""><h5 style="display: inline;">Predictor</h5></a> 
        <a href=""><h5 style="display: inline; padding-left: 50px ;">History</h5></a> 
        <a href="">
                <div style="display: inline; padding-left: 420px ;">
                        <h1 style="display: inline; font-weight:500; color: #5BB95A;">DEEP</h1>
                        <h1 style="display: inline; font-weight:700; color: #00A0DC;">DR</h1>
                </div>
        </a> 
        <button id="signoutButton" style="color: white">Sign Out</button>
    </div>
</div>
</template>

<style>
.container{
    max-width: 100%;
    height: 90px;
    background-image: url('background1 (2).jpg');
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
#upimgHeader{
    padding-top: 10px;
    padding-left: 50px;
    color: black;
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
    box-shadow: 0 5px #666;
    transform: translateY(1px);
}
</style>
