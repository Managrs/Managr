<template>
  <header class="user-head">
    <h1>Orders</h1>
  </header>

  <main>
    <section class="filter-by">Filter</section>

    <table class="approval-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Freelancer</th>
          <th>Client</th>
          <th>Product</th>
          <th>Delivered</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td>{{ order.freelancer }}</td>
          <td>{{ order.client }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.delivered ? "Yes" : "No" }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  name: "Aorders",
  data() {
    return {
      orders: [
        {
          orderId: "#ORD12345",
          freelancer: "Olivia Rhye",
          client: "Phoenix Baker",
          product: "Landing Page Design",
          delivered: true
        },
        {
          orderId: "#ORD12346",
          freelancer: "Lana Steiner",
          client: "Demi Howard",
          product: "E-commerce Setup",
          delivered: false
        },
        {
          orderId: "#ORD12347",
          freelancer: "Alex Johnson",
          client: "Jessie Walton",
          product: "Mobile App UI",
          delivered: true
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
</style>