<template>
        <header class="user-head">
        <h1> Orders </h1>
    </header>
    <main>
        <section class="filter-by"> Filter </section>
        <table class="approval-table">
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Freelancer</th>
                <th>Client</th>
                <th>Product</th>
                <th>Delivered</th>

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
        name: "Aorders"
    }
</script>

<styles>

</styles>