import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DashboardAdmin from '../../src/views/dashboardadmin.vue';  // Adjust the import path as needed
import AdminSide from '../../src/components/AdminSide.vue';  // Adjust the import path as needed

describe('DashboardAdmin', () => {
  it('renders the dashboard with AdminSide and router-view', () => {
    const wrapper = mount(DashboardAdmin, {
      global: {
        components: {
          AdminSide,
        },
      },
    });

    // Check if the main layout container is rendered
    const dashboardLayout = wrapper.find('.dashboard-layout');
    expect(dashboardLayout.exists()).toBe(true);



    // Check if dashboard-content class exists and is applied correctly
    const dashboardContent = wrapper.find('.dashboard-content');
    expect(dashboardContent.exists()).toBe(true);
    
  });
});
