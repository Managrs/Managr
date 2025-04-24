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

    // Check that DashClient is rendered
    const dashClient = wrapper.findComponent(DashClient);
    expect(dashClient.exists()).toBe(true);

    // Check that SearchComponent is rendered
    const searchComponent = wrapper.findComponent(SearchComponent);
    expect(searchComponent.exists()).toBe(true);

    // Check that ProfileView is rendered
    const profileView = wrapper.findComponent(ProfileView);
    expect(profileView.exists()).toBe(true);

    // Check that the .freelancer-section has the appropriate class (instead of inline styles)
    const freelancerSection = wrapper.find('.freelancer-section');
    expect(freelancerSection.exists()).toBe(true);
    expect(freelancerSection.classes()).toContain('freelancer-section'); // Ensure the section has the right class

    // Check that .page-container has the right structure, this is a simple example check for the layout
    expect(pageContainer.classes()).toContain('page-container');
  });
});
