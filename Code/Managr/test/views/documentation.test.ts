import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Documentation from '../../src/views/documentation.vue';

// Simple mock for Auth0
vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn()
  })
}));

describe('Documentation.vue', () => {
  it('shows the main heading', () => {
    const wrapper = mount(Documentation);
    expect(wrapper.find('h1').text()).toContain('Empowering Projects');
  });

  it('displays the info section', () => {
    const wrapper = mount(Documentation);
    expect(wrapper.find('.info h2').exists()).toBe(true);
  });
});