<script>
export default {
    name: 'Login',
    computed: {
      // loggedOut(){
      //   return (location.search === 'toLoggedOut')
      // }
    },
    data () {
      return {
        username: '',
        password: '',
        message: ''
      }
    },
    async mounted(){
    },
    methods: {
      async login(){
        try {
          const response = await router.post("/api/auth/login", {
          username: this.username,
          password: this.password
        },
        alert('this button is clicked'))
        this.message = response.data.message;
        } catch (error) {
          this.message = "Log in unsuccessful";
        }
    }
  }
}
</script>

<template>
<div class="d-flex" id="container">
    <!-- logout -->
    <div v-if="loggedOut" class="align-items-center alert alert-danger d-flex" role="alert" style="height: 40px; margin-bottom: 20px;">
      You have logged out
    </div>
    <!-- login -->
    <div id="loginDiv" >
      <div style="margin-top: 50px; text-align: center;">
        <h1 style="display: inline; font-weight:700; color: #5BB95A;">DEEP</h1>
        <h1 style="display: inline; font-weight:800; color: #00A0DC;">DR</h1>
      </div>
      <form>
      <div class="form-group">
        <label for="username">Username <h6 style="display: inline; color: red;">*</h6></label>
        <input v-model="username" type="text" class="form-control" name="username" id="username" placeholder="Required">
      </div>
      <div class="form-group">
        <label for="username">Password <h6 style="display: inline; color: red; ">*</h6></label>
        <input v-model="password" type="text" class="form-control" name="password" id="password" placeholder="Required">
      </div>
      <div class="form-group">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember" style="padding-left: 5px; opacity: 0.75;">Remember me</label>
      </div>
      </form>
      <button onclick="login()" id="loginButton" style="color: white; font-weight: 500;">Login</button>
    </div>
  </div>
</template>

<style scoped>

#container{
  max-width: 100%;
  height: 100vh;
  background-image: url('../assets/loginBG.jpg');
  text-align: center;
  overflow: hidden;
}
#loginDiv {
  margin: auto;
  margin-top: 120px;
  width: 40%;
  min-height: 500px;
  background-color: #F2F2F2;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  border-color:#0072C6 ;
}
#loginButton {
  font-size: 15px; 
  width: 20%;
  background-color: #8BC34A;
  border-radius: 5px;
  border-color:  #C7C7CC;
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
  margin-top: 40px;
}
.form-control{
  max-width:80% ;
}
input[type=text]{
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  border-color:#5BB95A ;
  box-sizing: border-box;
  width: 400px;
  margin-right: 30px;
  
}
input[type=text]::-webkit-input-placeholder{
  opacity: 0.5;
}
input[type=checkbox]{
  background-color:#5BB95A;
}
</style>
