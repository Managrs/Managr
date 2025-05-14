import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import userProfile from '../../src/views/userProfile.vue';

describe.skip('userProfile', () => {
  it('shows user name and logout button', () => {
    const wrapper = mount(userProfile);
    expect(wrapper.text()).toContain('Dawid Pietrasiak');
    expect(wrapper.find('button').text()).toBe('Logout');
  });

  it('has 4 menu items', () => {
    const wrapper = mount(userProfile);
    expect(wrapper.findAll('li').length).toBe(4);
  });

  it('toggles visibility on hover', async () => {
    const wrapper = mount(userProfile);
    expect(wrapper.find('.sidebar').isVisible()).toBe(true);
    await wrapper.find('.sidebar').trigger('mouseleave');
    expect(wrapper.find('.sidebar').isVisible()).toBe(false);
  });
});