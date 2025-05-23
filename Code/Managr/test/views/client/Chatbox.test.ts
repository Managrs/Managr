import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Chatbox from '../../../src/views/client/Chatbox.vue';
import ChatCard from '../../../src/components/chatCard.vue';
import ChatThread from '../../../src/components/messageCard.vue';

// Mock components to avoid having to import them
vi.mock('../../../src/components/chatCard.vue', () => ({
  default: {
    name: 'ChatCard',
    props: ['user'],
    template: '<div class="chat-card">{{user.name}}</div>'
  }
}));

vi.mock('../../../src/components/messageCard.vue', () => ({
  default: {
    name: 'ChatThread',
    props: ['userName', 'avatar', 'messages'],
    template: '<div class="chat-thread">{{userName}}</div>'
  }
}));

describe('Chatbox.vue', () => {
  // Mock fetch API
  beforeEach(() => {
    global.fetch = vi.fn();
    
    // Mock allusers endpoint
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, fullName: 'John Doe', avatar: 'avatar1.jpg', email: 'john@example.com' },
          { id: 2, fullName: 'Jane Smith', avatar: 'avatar2.jpg', email: 'jane@example.com' }
        ])
      })
    );
    
    // Mock messages endpoint
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        json: () => Promise.resolve([
          { senderId: 1, receiverId: 2, senderName: 'John Doe' },
          { senderId: 2, receiverId: 1, senderName: 'Jane Smith' }
        ])
      })
    );
  });

  it('renders properly with correct structure', async () => {
    const mockRouter = {
      go: vi.fn()
    };
    
    const wrapper = mount(Chatbox, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    
    // Test component structure
    expect(wrapper.find('.chat-app').exists()).toBe(true);
    expect(wrapper.find('.sidebar').exists()).toBe(true);
    expect(wrapper.find('.chat-area').exists()).toBe(true);
    expect(wrapper.find('.sidebar-header').exists()).toBe(true);
    expect(wrapper.find('input.search').exists()).toBe(true);
    
    // Wait for API calls to resolve
    await flushPromises();
    
    // Test data population
    expect(wrapper.vm.categories.length).toBe(2);
  });

  it('navigates back when back button is clicked', async () => {
    const mockRouter = {
      go: vi.fn()
    };
    
    const wrapper = mount(Chatbox, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    
    await wrapper.find('.secondary-btn').trigger('click');
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('filters users based on search input', async () => {
    const wrapper = mount(Chatbox);
    await flushPromises();
    
    // Test initial state
    expect(wrapper.vm.filteredCategories.length).toBe(2);
    
    // Test search filtering
    await wrapper.setData({ search: 'john' });
    expect(wrapper.vm.filteredCategories.length).toBe(1);
    expect(wrapper.vm.filteredCategories[0].name).toBe('John Doe');
    
    // Test case insensitivity
    await wrapper.setData({ search: 'JANE' });
    expect(wrapper.vm.filteredCategories.length).toBe(1);
    expect(wrapper.vm.filteredCategories[0].name).toBe('Jane Smith');
    
    // Test no results
    await wrapper.setData({ search: 'nobody' });
    expect(wrapper.vm.filteredCategories.length).toBe(0);
  });

  it('selects a user and fetches messages', async () => {
    const wrapper = mount(Chatbox);
    await flushPromises();
    
    // Manually call selectUser with a user
    await wrapper.vm.selectUser({
      id: 1,
      name: 'John Doe',
      avatar: 'avatar1.jpg',
      email: 'john@example.com'
    });
    
    await flushPromises();
    
    // Check selectedUser was set

    
    // Check that messages were fetched
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(expect.stringContaining('/messages?userId='));
  });

  it('handles sending a new message', async () => {
    const wrapper = mount(Chatbox);
    await flushPromises();
    
    // Select a user first
    await wrapper.vm.selectUser({
      id: 1,
      name: 'John Doe',
      avatar: 'avatar1.jpg',
      email: 'john@example.com'
    });
    
    // Send a message
    wrapper.vm.handleSendMessage('Hello, world!');
    
    // Check the chat history is updated
    expect(wrapper.vm.chatHistory[1]).toBeDefined();
    expect(wrapper.vm.chatHistory[1].length).toBe(1);
    expect(wrapper.vm.chatHistory[1][0]).toEqual({
      sender: 'me',
      content: 'Hello, world!'
    });
    
    // Send another message
    wrapper.vm.handleSendMessage('Second message');
    expect(wrapper.vm.chatHistory[1].length).toBe(2);
  });

  it('protects against sending messages when no user is selected', async () => {
    const wrapper = mount(Chatbox);
    await flushPromises();
    
    // Try to send message without selecting user
    wrapper.vm.handleSendMessage('This should not be sent');
    
    // Check that no messages were added
    expect(Object.keys(wrapper.vm.chatHistory).length).toBe(0);
  });
});