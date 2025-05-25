import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ChatThread from '../../src/views/messageCard.vue';

describe('ChatThread.vue', () => {
  it('shows user name and avatar', () => {
    const wrapper = mount(ChatThread, {
      props: {
        userName: 'Test User',
        avatar: 'test.jpg',
        messages: []
      }
    });
    expect(wrapper.find('h3').text()).toBe('Test User');
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg');
  });

  it.skip('displays messages correctly', () => {
    const wrapper = mount(ChatThread, {
      props: {
        messages: ['Hello', 'How are you?'],
        userName: 'Test'
      }
    });
    const messages = wrapper.findAll('.message');
    expect(messages.length).toBe(2);
    expect(messages[0].text()).toBe('Hello');
    expect(messages[1].text()).toBe('How are you?');
  });


  it('clears input after sending', async () => {
    const wrapper = mount(ChatThread, {
      props: {
        messages: [],
        userName: 'Test'
      }
    });
    await wrapper.find('input').setValue('Test message');
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.newMessage).toBe('');
  });

  it('does not send empty messages', async () => {
    const wrapper = mount(ChatThread, {
      props: {
        messages: [],
        userName: 'Test'
      }
    });
    await wrapper.find('input').setValue('   ');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('send-message')).toBeFalsy();
  });
});