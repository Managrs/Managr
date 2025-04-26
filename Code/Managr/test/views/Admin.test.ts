import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';  // Import Vue Router
import AdminPage from '../../src/views/Admin.vue';  // Adjust the import path to your component
import { RouterLink } from 'vue-router';

// Define your routes for the test
const routes = [
  { path: '/', name: 'home' },
  { path: '/admin', name: 'admin' },
  { path: '/client', name: 'client' },
  { path: '/freelancer', name: 'freelancer' },
];

describe('AdminPage', () => {
  it('renders the navigation links with correct routes', async () => {
    // Create a router instance for testing
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // Mount the AdminPage component with the router
    const wrapper = mount(AdminPage, {
      global: {
        plugins: [router],  // Provide the router plugin to the component
        stubs: {
          RouterLink,  // Stub RouterLink to prevent actual navigation
        },
      },
    });

    // Wait for the router to be ready before running assertions
    await router.isReady();

    // Check that the container exists
    const btnSec = wrapper.find('#btnSec');
    expect(btnSec.exists()).toBe(true);

    // Check if the RouterLinks exist and have the correct 'to' prop
    const links = btnSec.findAllComponents(RouterLink);
    expect(links.length).toBe(4);

    // Check that each RouterLink has the correct 'to' prop
    const expectedLinks = ['/', '/admin', '/client', '/freelancer'];
    links.forEach((link, index) => {
      expect(link.props().to).toBe(expectedLinks[index]);
    });

    // Optionally, check for specific text content in each link
    const expectedLinkTexts = ['Homepage', 'Admin', 'Client', 'Freelancer'];
    links.forEach((link, index) => {
      expect(link.text()).toBe(expectedLinkTexts[index]);
    });
  });
});
