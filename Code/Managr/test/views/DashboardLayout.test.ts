import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Dashboard from '../../src/views/DashboardLayout.vue'; // Adjust the import path as needed
import DashNavbar from '../../src/components/DashNavbar.vue'; // Adjust the import path as needed
import CategoryView from '../../src/components/CategoryView.vue'; // Adjust the import path as needed
import ProfileView from '../../src/components/ProfileView.vue'; // Adjust the import path as needed

describe('Dashboard', () => {
  it('renders the dashboard and its child components', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        components: {
          DashNavbar,
          CategoryView,
          ProfileView,
        },
      },
    });

    // Check if the dashboard container exists
    const dashboardContainer = wrapper.find('.dashboard');
    expect(dashboardContainer.exists()).toBe(true);

    // Check if DashNavbar is rendered
    const dashNavbar = wrapper.findComponent(DashNavbar);
    expect(dashNavbar.exists()).toBe(true);

    // Check if CategoryView is rendered
    const categoryView = wrapper.findComponent(CategoryView);
    expect(categoryView.exists()).toBe(true);

    // Check if ProfileView is rendered
    const profileView = wrapper.findComponent(ProfileView);
    expect(profileView.exists()).toBe(true);

    // Check if router-view exists, it should be a placeholder for dynamic routes
    const routerView = wrapper.find('router-view');
    expect(routerView.exists()).toBe(true);

    // Ensure that the main content is rendered correctly
    const dashboardBody = wrapper.find('.dashboard-body');
    expect(dashboardBody.exists()).toBe(true);
  });
});
