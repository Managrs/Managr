import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DashboardClient from '../../src/views/dashboardclient.vue';  
import DashClient from '../../src/components/DashClient.vue';  
import ProfileView from '../../src/components/ProfileView.vue';  
import SearchComponent from '../../src/components/SearchComponent.vue';  

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
