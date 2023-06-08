<script>

export default {
    name: 'Header',
    data() {
        return {
            user: {}
        }
    },
    computed: {
        isInHome() {
            return window.location.pathname == '/'
        }
    },
    beforeRouteEnter (to, from, next) {
        next(async vm => {
            await vm.myMounted()
        })
    },
    async mounted() {
        await this.myMounted()
    },
    methods: {
        async myMounted() {
            try {
                await this.authorize()
            } catch(error) {
                console.error(error)
            }
        },
        async authorize() {
            try {
                const response = await this.axios.post('/api/auth/authorize')
                const tempUser = {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                }
                this.user = tempUser
            } catch (error) {
                location.href = '/login'
            }
        },
        goToRecords() {
            location.href = '/records'
        },
        goToPredictor() {
            location.href = '/predictor'
        },
        goToHome(){
            location.href = '/'
        },   
        goToAdminDashboard() {
            location.href = '/admin'
        }, 
        async logOut(){
            try {            
                await this.axios.post("/api/auth/logout");
                location.href = "/login?loggedOut=1"
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    }
}

</script>

<template>
<div class="d-flex align-items-center headerContainer justify-content-between px-4 py-3">
    <div class="leftHeader" style="">
        <a @click="goToHome" href="#"><h5 style="display: inline;">Home</h5></a> 
        <a v-if="this.user.role == 'doctor'" @click="goToPredictor" href="#"><h5 style="display: inline; margin-left: 30px ;">Predictor</h5></a> 
        <a v-if="this.user.role == 'doctor'" @click="goToRecords" href="#"><h5 style="display: inline; margin-left: 30px ;">Records</h5></a> 
        <a v-if="this.user.role == 'admin'" @click="goToAdminDashboard" href="#"><h5 style="display: inline; margin-left: 30px ;">Dashboard</h5></a> 
    </div>
    <a href="">
        <div class="midheader" style="padding-right: 30px;" v-if="isInHome == false">
            <h1 style="display: inline; font-weight:800; color: #5BB95A;">Deep</h1>
            <h1 style="display: inline; font-weight:800; color: #00A0DC;">DR</h1>
        </div>
    </a> 
    <button @click="logOut" id="signoutButton" style="color: white;">Log Out</button>
</div>
</template>

<style>
.leftHeader {
    display:inline; 
    float: left;
    /* margin-top:  20px; */
}
.midheader{
    display: inline;
    position: relative;
}
.headerContainer{
    min-width: 100%;
    min-height: 75px;
    background-image: url();
    background-size: cover;
    color: black;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
}
a {
    /* margin-top:  20px; */
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
    /* margin-top: 20px; */
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
