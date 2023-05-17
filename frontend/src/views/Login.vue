<script>
export default {
    name: 'Login'
}
</script>

<template>
<div class="d-flex" id="container">
    <div id="loginDiv" >
      <div style="margin-top: 50px; margin-left: 225px;">
        <h1 style="display: inline; font-weight:700; color: #5BB95A;">DEEP</h1>
        <h1 style="display: inline; font-weight:800; color: #00A0DC;">DR</h1>
      </div>
      <form>
      <div class="form-group">
        <label for="username">Username <h6 style="display: inline; color: red;">*</h6></label>
        <input type="text" class="form-control" name="username" id="username" placeholder="Required">
      </div>
      <div class="form-group">
        <label for="username">Password <h6 style="display: inline; color: red;">*</h6></label>
        <input type="text" class="form-control" name="password" id="password" placeholder="Required">
      </div>
      <div class="form-group">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember" style="padding-left: 5px; opacity: 0.75;">Remember me</label>
      </div>
      </form>
      <button id="loginButton" style="color: white; font-weight: 500;">Login</button>
    </div>
  </div>
</template>
<button id="uploadButton" style="color:white; font-weight: 500;">Select Image</button>

<style>
#container{
  max-width: 100%;
  height: 100vh;
  background-image: url('background1 (2).jpg');
}
#loginDiv {
  margin: auto;
  margin-top: 120px;
  width: 40%;
  height: 500px;
  background-color: #F2F2F2;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  border-color:#0072C6 ;
}
#loginButton {
  margin-left: 240px; 
  font-size: 15px; 
  width: 20%;
  background-color: #8BC34A;
  border-radius: 5px;
  border-color:  #C7C7CC;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 5%;
}
#loginButton:hover{
  background-color: #5BB95A;
}
#loginButton:active {
  background-color: #5BB95A;
  box-shadow: 0 5px #666;
  transform: translateY(1px);
}
.form-group{
  margin-top: 30px;
  margin-left: 100px;

}
input[type=text]{
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  border-color:#5BB95A ;
  width: 400px;
}
input[type=text]::-webkit-input-placeholder{
  opacity: 0.5;
}
input[type=checkbox]{
  background-color: #D9D9D9;
}

</style>
