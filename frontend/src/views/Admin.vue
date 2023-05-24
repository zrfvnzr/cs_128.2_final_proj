<script>
export default {
    name: 'Admin',
    data() {
        return {
            divRefs: [
                'usersIndexDiv',
                'userCreateDiv',
                'userEditDiv',
                'sqlConsoleDiv'
            ],
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
            this.hideDivs()
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
<div id="adminMainDiv" style="padding: 3rem 3rem 0 3rem;">

    <!-- Users Index -->
    <div ref="usersIndexDiv">
        <!-- Users Index Header -->
        <div class="header">
            <div>
                <i class="bi bi-people-fill"></i>
                <h1>Admin Dashboard</h1>
            </div>
            <div class="align-items-center d-flex">
                <input class="h-100 lh-1 me-1 px-1" type="text" placeholder="Search users...">
                <button class="btn btn-sm btn-success hoverTransform lh-1 p-2">Search</button>
            </div>
            <button @click="switchDiv(null, 'userCreateDiv')" class="btn btn-sm btn-warning fw-bold hoverTransform lh-1 p-2">
                Add New User
            </button>
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
                            <div class="btn btn-sm btn-warning hoverTransform">Edit</div>
                        </td>
                        <td>
                            <div class="btn btn-danger btn-sm hoverTransform">Delete</div>
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
        </div>
        <!-- end User Create Header -->
        <!-- User Create Body -->
        <div class="temp-body">

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
        </div>
        <!-- end User Edit Header -->
        <!-- User Edit Body -->
        <div class="temp-body">

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
        </div>
        <!-- end SQL Console Header -->
        <!-- SQL Console Body -->
        <div class="temp-body">

        </div>
        <!-- end SQL Console Body -->
    </div>
    <!-- end SQL Console -->

</div>
</template>

<style scoped>
/* TEMP */
.temp-body {
    border: 2px dotted black;
    margin-bottom: 2rem;
    min-height: 5rem;
}
/* end TEMP */

/* Main Divs */
#adminMainDiv > div {
    flex-direction: column;
}

/* Headers */
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .5rem;
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