import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DashboardClient from '../../src/views/dashboardclient.vue';  // Adjust the import path as needed
import DashClient from '../../src/components/DashClient.vue';  // Adjust the import path as needed
import ProfileView from '../../src/components/ProfileView.vue';  // Adjust the import path as needed
import SearchComponent from '../../src/components/SearchComponent.vue';  // Adjust the import path as needed

describe('DashboardClient', () => {
  it('renders the component and checks for correct structure', () => {
    const wrapper = mount(DashboardClient, {
      global: {
        components: {
          DashClient,
          ProfileView,
          SearchComponent,
        },
      },
    });

    // Check that the main container exists
    const pageContainer = wrapper.find('.page-container');
    expect(pageContainer.exists()).toBe(true);


    // Check that .page-container has the right structure, this is a simple example check for the layout
    expect(pageContainer.classes()).toContain('page-container');
  });
});
