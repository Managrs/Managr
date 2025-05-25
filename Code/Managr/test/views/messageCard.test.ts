import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ChatThread from '../../src/views/messageCard.vue';

describe('ChatThread.vue', () => {
  it('shows user name and avatar', () => {
    // Mock the mounted hook to prevent Pinia calls
    const mockMounted = vi.fn();
    
    const wrapper = mount(ChatThread, {
      props: {
        userName: 'Test User',
        avatar: 'test.jpg',
        messages: []
      },
      global: {
        mixins: [{
          mounted: mockMounted
        }]
      }
    });

    expect(wrapper.find('h3').text()).toBe('Test User');
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg');
  });
});