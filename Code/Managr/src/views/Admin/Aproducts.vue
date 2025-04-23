<template>
  <header class="user-head">
    <h1>Products</h1>
  </header>

  <main>
    <section class="filter-by">Filter</section>

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
        <tr v-for="product in products" :key="product.name">
          <td>
            <img :src="product.photo" class="avatar" alt="product image" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.creator }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  name: "Aproducts",
  data() {
    return {
      products: [
        {
          name: "Wooden Chair",
          photo: "https://via.placeholder.com/40",
          description: "Classic wooden dining chair",
          creator: "Olivia Rhye"
        },
        {
          name: "Desk Lamp",
          photo: "https://via.placeholder.com/40",
          description: "Modern adjustable lamp",
          creator: "Phoenix Baker"
        },
        {
          name: "Standing Desk",
          photo: "https://via.placeholder.com/40",
          description: "Height-adjustable work desk",
          creator: "Lana Steiner"
        }
      ]
    };
  }
};
</script>

<style scoped>
.user-head {
  padding: 16px;
  font-size: 24px;
  font-weight: bold;
}

.filter-by {
  margin: 12px 0;
  font-weight: 500;
  color: #4b5563;
}

.approval-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
}

.approval-table th,
.approval-table td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.approval-table thead {
  background-color: #f9fafb;
  color: #374151;
}

.approval-table tbody tr:hover {
  background-color: #f3f4f6;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}
</style>