import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';  // Import Vue Router
// import FreelancerPage from '../../src/views/Freelance.vue';  // Adjust the import path as needed
import { RouterLink } from 'vue-router';

// Define the routes for the test environment
const routes = [
  { path: '/', name: 'home' },
  { path: '/admin', name: 'admin' },
  { path: '/client', name: 'client' },
  { path: '/freelancer', name: 'freelancer' },
];

describe.skip('FreelancerPage', () => {
  it.skip('renders navigation links with correct routes and checks for expected text and link count', async () => {
    // Create a mock router instance for testing
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // Mount the FreelancerPage component, providing the router
    const wrapper = mount(FreelancerPage, {
      global: {
        plugins: [router],  // Add the router to the test environment
        stubs: {
          RouterLink,  // Stub RouterLink to prevent actual navigation
        },
      },
    });

    // Wait for the router to be ready before making assertions
    await router.isReady();

    // Ensure that the navigation container exists
    const linksContainer = wrapper.find('#links');
    expect(linksContainer.exists()).toBe(true);

    // Check that there are exactly 4 RouterLink components
    const links = linksContainer.findAllComponents(RouterLink);
    expect(links.length).toBe(4);

    // Check that each RouterLink has the correct 'to' prop
    const expectedLinks = ['/', '/admin', '/client', '/freelancer'];
    links.forEach((link, index) => {
      expect(link.props().to).toBe(expectedLinks[index]);
    });

    // Ensure that each RouterLink contains the expected text
    const expectedText = ['Homepage', 'Admin', 'Client', 'Freelancer'];
    links.forEach((link, index) => {
      expect(link.text()).toBe(expectedText[index]);
    });
  });
});
