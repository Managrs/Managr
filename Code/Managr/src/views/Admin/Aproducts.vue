<template>
    <header class="user-head">
        <h1> Products </h1>
    </header>
    <main>
        <section class="filter-by"> Filter </section>
        <table class="approval-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Product</th>
                <th>Description</th>
                <th>Creator</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="user in Users" :key="user.name">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td> </td>
                <td> </td>
              </tr>
            </tbody>
          </table>
    </main>    
</template>

<script>
        export default {
        name: "Aproducts"
    }
</script>

<styles>

</styles>