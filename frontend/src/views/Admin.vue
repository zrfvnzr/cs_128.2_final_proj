<script>
import Header from '../components/Header.vue'
export default {
    name: 'Admin',
    components: {Header},
    data() {
        return {
            createUserObj: {
                role: '',
                username: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: ''
            },
            divRefs: [
                'usersIndexDiv',
                'userCreateDiv',
                'userEditDiv',
                'sqlConsoleDiv'
            ],
            editUserObj: {
                id: 0,
                role: '',
                username: '',
                newPassword: '',
                confirmNewPassword: '',
                firstName: '',
                lastName: ''
            },
            sql: {
                result: '',
                statement: ''
            },
            users: [
                {
                    id: 1,
                    role: 'admin',
                    username: 'admin1',
                    firstName: 'Paolo',
                    lastName: 'Licup'
                },
                {
                    id: 2,
                    role: 'admin',
                    username: 'admin2',
                    firstName: 'Emmanuel',
                    lastName: 'Ednalan'
                }
            ]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(async vm => {
            await vm.myMounted()
        })
    },
    methods: {
        async myMounted() {
            try {
                await this.getUsers()
            } catch(error) {
                console.error(error)
            }
            this.hideDivs()
        },
        async createUser() {
            try {
                const response = await this.axios.post('/api/users/create', this.createUserObj)
                alert('User created')
                this.switchDiv(null, 'usersIndexDiv')
            } catch (error) {
                alert(error.response.body.message)
            }
        },
        async deleteUser(user) {
            try {
                if (confirm('Delete user?')) {
                    const response = await this.axios.post('/api/users/delete', user)
                    alert('User deleted')
                    this.getUsers()
                } else {
                    return
                }
            } catch (error) {
                alert(error.response.body.message)
            }       
        },
        async editUser() {
            try {
                const response = await this.axios.post('/api/users/update', this.editUserObj)
                alert('User updated')
                this.switchDiv(null, 'usersIndexDiv')
            } catch (error) {
                alert(error.response.body.message)
            }
        },
        editUserDiv(user) {
            this.editUserObj = user
            this.switchDiv(null, 'userEditDiv')
        },
        async executeSql() {
            try {
                const response = await this.axios.post('/api/sql', this.sql.statement)
                this.sql.result = response.data.result
                alert('SQL statement executed')
            } catch (error) {
                alert(error.response.body.message)
            }
        },
        async getUsers() {
            try {
                const response = await this.axios.post('/api/users/index')
                this.users = response.data.rows
            } catch (error) {
                alert(error.response.body.message)
            }
        },
        hideDivs() {
            // initially hide all divs except for usersIndexDiv
            this.divRefs.forEach(divRef => {
                if (divRef !== 'usersIndexDiv') {
                    this.$refs[divRef].style.display = 'none'
                }
            })
        },
        switchDiv(_fromRef, toRef, _toRefDisplay) {
            // if fromRef is not specified, hide all divs
            if (!_fromRef || _fromRef == null) {
                this.divRefs.forEach(ref => {
                    this.$refs[ref].style.display = 'none'
                })
            } else {
                this.$refs[fromRef].style.display = 'none'
            }            
            // if _toRefDisplay is not specified, default to flex
            let toRefDisplay = 'flex'
            if (_toRefDisplay) {
                toRefDisplay = _toRefDisplay
            }
            this.$refs[toRef].style.display = toRefDisplay
        }
    }
}
</script>
<template>
<Header id="header" />
<div id="adminMainDiv" style="padding: 2rem 3rem 0rem 3rem;">
    <!-- Users Index -->
    <div id="usersIndexDiv" ref="usersIndexDiv">
        <!-- Users Index Header -->
        <div class="header">
            <div>
                <i class="bi bi-people-fill"></i>
                <h1>Admin Dashboard</h1>
            </div>
            <div class="d-flex" style="gap: 1rem;">
                <button @click="switchDiv(null, 'userCreateDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                    Add New User
                </button>
                <button @click="switchDiv(null, 'sqlConsoleDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                    SQL Console
                </button>
            </div>
        </div>
        <!-- end Users Index Header -->
        <!-- Users Index Table -->
        <div class="mb-3">
            <table class="table table-hover table-sm text-center">
                <thead class="text-white" style="background-color: var(--rich-electric-blue);">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Role</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(obj, index) in users" :key="index">
                        <th scope="row">{{ users[index].id }}</th>
                        <td class="text-capitalize">{{ users[index].role }}</td>
                        <td>{{ users[index].username }}</td>
                        <td class="text-capitalize">{{ users[index].firstName }}</td>
                        <td class="text-capitalize">{{ users[index].lastName }}</td>
                        <td>
                            <button @click="editUserDiv(this.users[index])" class="btn btn-sm btn-warning fw-bold hoverTransform">Edit</button>
                        </td>
                        <td>
                            <button @click="deleteUser(this.users[index])" class="btn btn-danger btn-sm fw-bold hoverTransform">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- end Users Index Table -->
    </div>
    <!-- end Users Index -->

    <!-- User Create -->
    <div ref="userCreateDiv">
        <!-- User Create Header -->
        <div class="header">
            <div>
                <i class="bi bi-person-plus-fill"></i>
                <h1>Create User</h1>
            </div>
            <button @click="switchDiv(null, 'usersIndexDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                Back
            </button>
        </div>
        <!-- end User Create Header -->
        <!-- User Create Body -->
        <div class="main-div">
            <label for="role">Role</label>
            <select v-model="createUserObj.role" name="role">
                <option value="">-- Select one --</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
            </select>
            <label for="username">Username</label>
            <input v-model="createUserObj.username" type="text" name="username">
            <label for="password">Password</label>
            <input v-model="createUserObj.password" type="password" name="password">
            <label for="confirmPassword">Confirm Password</label>
            <input v-model="createUserObj.confirmPassword" type="password" name="confirmPassword">
            <label for="firstName">First Name</label>
            <input v-model="createUserObj.firstName" type="text" name="firstName">
            <label for="lastName">Last Name</label>
            <input v-model="createUserObj.lastName" type="text" name="lastName">
            <button @click="createUser" class="btn btn-sm btn-success fw-bold hoverTransform lh-1 p-2">Register</button>
        </div>
        <!-- end User Create Body -->
    </div>
    <!-- end User Create -->

    <!-- User Edit -->
    <div ref="userEditDiv">
        <!-- User Edit Header -->
        <div class="header">
            <div>
                <i class="bi bi-person-fill-gear"></i>
                <h1>Edit User</h1>
            </div>
            <button @click="switchDiv(null, 'usersIndexDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                Back
            </button>
        </div>
        <!-- end User Edit Header -->
        <!-- User Edit Body -->
        <div class="main-div">
            <label for="id">ID</label>
            <input disabled v-model="editUserObj.id" type="text" name="id">
            <label for="role">Role</label>
            <select v-model="editUserObj.role" name="role">
                <option value="">-- Select one --</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
            </select>
            <label for="username">Username</label>
            <input v-model="editUserObj.username" type="text" name="username">
            <label for="password">New Password</label>
            <input v-model="editUserObj.newPassword" type="password" name="password">
            <label for="confirmPassword">Confirm New Password</label>
            <input v-model="editUserObj.confirmNewPassword" type="password" name="confirmPassword">
            <label for="firstName">First Name</label>
            <input v-model="editUserObj.firstName" type="text" name="firstName">
            <label for="lastName">Last Name</label>
            <input v-model="editUserObj.lastName" type="text" name="lastName">
            <button @click="editUser" class="btn btn-sm btn-success fw-bold hoverTransform lh-1 p-2">Register</button>
        </div>
        <!-- end User Edit Body -->
    </div>
    <!-- end User Edit -->

    <!-- SQL Console -->
    <div ref="sqlConsoleDiv">
        <!-- SQL Console Header -->
        <div class="header">
            <div>
                <i class="bi bi-hdd-stack-fill"></i>
                <h1>SQL Console</h1>
            </div>
            <button @click="switchDiv(null, 'usersIndexDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                Back
            </button>
        </div>
        <!-- end SQL Console Header -->
        <!-- SQL Console Body -->
        <div class="main-div">
            <label for="sqlStatement">SQL Statement</label>
            <textarea v-model="this.sql.statement" cols="70" rows="5"></textarea>
            <button @click="executeSql()" class="btn btn-sm btn-success fw-bold hoverTransform lh-1 mb-3 p-2">Execute</button>
            <label for="sqlResult">SQL Result</label>
            <textarea disabled v-model="this.sql.result" cols="70" rows="5"></textarea>
        </div>
        <!-- end SQL Console Body -->
    </div>
    <!-- end SQL Console -->

</div>
</template>

<style scoped>
#header {
    background: url(/navbar-bg.png);
}
/* TEMP */
.temp-body {
    border: 2px dotted black;
    margin-bottom: 2rem;
    min-height: 5rem;
}
/* end TEMP */

/* Main Divs */
#adminMainDiv > div {
    align-items: center;
    flex-direction: column;
}

#usersIndexDiv {
    align-items: stretch !important;
}

.main-div {
    align-items: start;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    min-height: 5rem;
    padding: 2rem;
}

.main-div select {
    width: 100%;
}

/* Labels */
label {
    font-weight: bold;
}

/* Inputs */
.main-div > input, .main-div > select, .main-div > textarea {
    margin-bottom: 1rem;
}

/* Headers */
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .5rem;
    width: 100%;
}
    .header > div {
        display: flex;
        flex-direction: row;
        color: var(--apple);
    }
        .header > div > i {
            font-size: 1.5rem;
            height: 1.5rem;
            line-height: 1;
            margin-right: .25rem;
        }
        .header > div > h1 {
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1;
            margin: 0;
        }
/* end Headers */

</style>