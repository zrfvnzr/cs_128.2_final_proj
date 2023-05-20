<script>
export default {
  name: 'Admin',
  data() {
    return {
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
  }
}
</script>
<template>
<div style="padding: 3rem 3rem 0 3rem;">

    <!-- Users Index -->
    <div ref="usersIndexDiv">
        <!-- Users Index Header -->
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex fc-apple">
                <i class="bi bi-people-fill fs-3 h-1-rem lh-1 me-1"></i>
                <h1 class="fs-3 fw-bold lh-1 m-0">Admin Dashboard</h1>
            </div>
            <div class="align-items-center d-flex">
                <input class="h-100 lh-1 me-1 px-1" type="text" placeholder="Search users...">
                <div class="btn btn-sm btn-success hoverTransform lh-1 p-2">Search</div>
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

    <!-- User Edit -->
    <div ref="userEditDiv">
        <!-- User Edit Header -->
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex fc-apple">
                <i class="bi bi-person-fill-gear fs-3 h-1-rem lh-1 me-1"></i>
                <h1 class="fs-3 fw-bold lh-1 m-0">Edit User</h1>
            </div>
        </div>
        <!-- end User Edit Header -->
        <!-- User Edit Body -->
        <!-- end User Edit Body -->
    </div>
    <!-- end User Edit -->

    <!-- Old User Edit -->
    <div ref="userEditDiv" class="border border-2 border-dark mb-3 p-3">
        <h2>Old Edit User</h2>
        <div class="align-items-start d-flex flex-column">
            <label>Username</label>
            <input type="text">
            <label>New Password</label>
            <input type="password">
            <label>Role</label>
            <select>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
            </select>
        </div>
    </div>
    <!-- end  OldUser Edit -->

    <!-- Old SQL Console -->
    <div ref="sqlConsoleDiv" class="border border-2 border-dark p-3">
        <h2>Old SQL Console</h2>
        <div class="align-items-start d-flex flex-column">
            <label>Execute SQL</label>
            <textarea cols="100" rows="5"></textarea>
            <label>Response</label>
            <textarea disabled cols="100" rows="5"></textarea>
        </div>
        
    </div>
    <!-- end Old SQL Console -->

</div>
</template>
<style scoped>
</style>