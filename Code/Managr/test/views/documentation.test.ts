import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Documentation from '../../src/views/documentation.vue';

// ✅ Mock Vue Router
vi.mock('../../src/router', () => ({
  default: {
    push: vi.fn()
  }
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

  it('navigates to signup on button click', async () => {
    const wrapper = mount(Documentation);
    const button = wrapper.find('button');
    await button.trigger('click');

    const router = await import('../../src/router');
    expect(router.default.push).toHaveBeenCalledWith('/signup');
  });
});
