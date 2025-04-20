<template>
    <header class="user-head">
        <h1> Users </h1>
    </header>
    <main>
        <section class="filter-by"> Filter </section>
        <table class="approval-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Email</th>
                <th>Full name</th>
                <th>Roles</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in Users" :key="user.name">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <button class="delete-btn">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
    </main>
    
</template>

<script>
        export default {
        name: "Ausers"
    }
</script>

<styles>

</styles>