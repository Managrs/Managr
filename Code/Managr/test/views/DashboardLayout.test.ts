import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Dashboard from '../../src/views/DashboardLayout.vue'; 
import DashNavbar from '../../src/components/DashNavbar.vue';
import CategoryView from '../../src/components/CategoryView.vue';
import ProfileView from '../../src/components/ProfileView.vue';

describe('Dashboard', () => {
  it('renders the dashboard and its child components', async () => {
    // First, let's check if the component name matches what's in your file
    console.log('Component name:', Dashboard.name); // This should print "dashboardfreelance"
    
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'router-view': true // Stub router-view since it's not a real DOM element
        }
      }
    });
    
    // Debugging: Let's see what's actually being rendered
    console.log('HTML:', wrapper.html());
    
    // Check if the dashboard container exists
    const dashboardContainer = wrapper.find('.dashboard');
    expect(dashboardContainer.exists()).toBe(true);
    
    // Check if the main content is rendered correctly
    const dashboardBody = wrapper.find('.dashboard-body');
    expect(dashboardBody.exists()).toBe(true);
  });
});