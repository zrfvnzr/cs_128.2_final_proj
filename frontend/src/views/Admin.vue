<script>
export default {
  name: 'Admin'
}
</script>
<template>
<div class="p-4">
    <h1>Admin View</h1>

    <!-- Users Index -->
    <div ref="usersIndexDiv" class="border border-2 border-dark mb-3">
        <div class="p-3">
            <h2>Users Index</h2>
            <table class="table table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>admin1</td>
                        <td>admin</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>admin2</td>
                        <td>admin</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>doctor1</td>
                        <td>doctor</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- end Users Index -->

    <!-- User Edit -->
    <div ref="userEditDiv" class="border border-2 border-dark mb-3 p-3">
        <h2>Edit User</h2>
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
    <!-- end User Edit -->

    <!-- SQL Console -->
    <div ref="sqlConsoleDiv" class="border border-2 border-dark p-3">
        <h2>SQL Console</h2>
        <div class="align-items-start d-flex flex-column">
            <label>Execute SQL</label>
            <textarea cols="100" rows="5"></textarea>
            <label>Response</label>
            <textarea disabled cols="100" rows="5"></textarea>
        </div>
        
    </div>
    <!-- end SQL Console -->

</div>
</template>
<style scoped>
</style>