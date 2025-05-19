import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProfileView from '../../src/components/ProfileView.vue';
import SearchComponent from '../../src/components/SearchComponent.vue';

describe('ProfileView', () => {
  // Setup mock data
  beforeEach(() => {
    //@ts-ignore Mock fetch
    global.fetch = vi.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, avatar: 'img1.jpg', fullName: 'John Doe', role: 'developer' },
          { id: 2, avatar: 'img2.jpg', fullName: 'Jane Smith', role: 'designer' }
        ])
      })
    );
  });

  // Test component mounting
  it('mounts component correctly', () => {
    const wrapper = shallowMount(ProfileView);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.profile-page').exists()).toBe(true);
    expect(wrapper.find('.sticky-header').exists()).toBe(true);
    expect(wrapper.find('.scrollable-profiles').exists()).toBe(true);
  });

  // Test SearchComponent interaction
  it.skip('handles search events from SearchComponent', async () => {
    const wrapper = mount(ProfileView);
    const searchComp = wrapper.findComponent(SearchComponent);
    await searchComp.vm.$emit('search', 'developer');
    expect(wrapper.vm.searchQuery).toBe('developer');
  });

  // Test loading state
  it('sets loading state correctly during fetch', async () => {
    const wrapper = mount(ProfileView);
    expect(wrapper.vm.loading).toBe(true);
    await wrapper.vm.fetchProfiles();
    expect(wrapper.vm.loading).toBe(false);
  });

  // Test error handling
  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject('API error'));
    console.error = vi.fn(); // Mock console.error
    const wrapper = mount(ProfileView);
    await wrapper.vm.fetchProfiles();
    expect(console.error).toHaveBeenCalled();
    expect(wrapper.vm.loading).toBe(false);
  });

  // Test data transformation
  it('transforms API data correctly', async () => {
    const wrapper = mount(ProfileView);
    await wrapper.vm.fetchProfiles();
    expect(wrapper.vm.profiles[0].job).toBe('Developer'); // Test capitalization
    expect(wrapper.vm.profiles.length).toBe(2);
  });
});