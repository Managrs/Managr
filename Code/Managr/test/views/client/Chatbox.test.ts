import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import Chatbox from '../../../src/views/client/Chatbox.vue';
import { ref } from 'vue';
import { defineComponent, h } from 'vue';

const originalConsoleError = console.error;

beforeEach(() => {
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('getActivePinia()')) {
      // Ignore this specific error
      return;
    }
    originalConsoleError(...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
});


// If you're mocking userStore:
vi.mock('@/stores/userStore', () => ({
  useUserStore: () => ({
    name: ref('Mock User'),
    email: ref('mock@example.com'),
    avatar: ref('/mock.jpg'),
    role: ref('admin'),
    setUser: vi.fn(),
    clearUser: vi.fn(),
  }),
}));

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

// Mock components to avoid having to import them
vi.mock('../../../src/components/chatCard.vue', () => ({
  default: {
    name: 'ChatCard',
    props: ['user'],
    emits: ['select'],
    template: '<div class="chat-card" @click="$emit(\'select\', user)">{{user.name}}</div>'
  }
}));

vi.mock('../../../src/components/messageCard.vue', () => ({
  default: defineComponent({
    name: 'MessageCard',
    props: ['userName', 'avatar', 'receiverMail'],
    setup(props) {
      return () => h('div', { class: 'message-card-mock' }, props.userName);
    }
  })
}));



describe('Chatbox.vue', () => {
  let mockRouter;
  let pinia;

  beforeEach(() => {
    // Setup Pinia
    pinia = createPinia();
    setActivePinia(pinia);

    // Mock router
    mockRouter = {
      go: vi.fn()
    };

    // Mock fetch API with proper implementation
    global.fetch = vi.fn();
    
    // Reset fetch mock before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const setupFetchMocks = () => {
    // Mock contacts endpoint
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, fullName: 'Contact One', avatar: 'contact1.jpg', email: 'contact1@example.com' },
          { id: 2, fullName: 'Contact Two', avatar: 'contact2.jpg', email: 'contact2@example.com' }
        ])
      })
      // Mock allusers endpoint
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { id: 3, fullName: 'John Doe', avatar: 'avatar1.jpg', email: 'john@example.com' },
          { id: 4, fullName: 'Jane Smith', avatar: 'avatar2.jpg', email: 'jane@example.com' }
        ])
      });
  };

  it.skip('renders properly with correct structure', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
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
    expect(wrapper.find('h2').text()).toBe('Messages');

    // Wait for API calls to resolve
    await flushPromises();

    // Test data population
    expect(wrapper.vm.contacts.length).toBe(2);
    expect(wrapper.vm.categories.length).toBe(2);
    
    // Verify API calls were made with correct URLs
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/contacts?email=test@example.com');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/allusers');
  });

  it('filters contacts and categories based on search input', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Test initial state
    expect(wrapper.vm.filteredContacts.length).toBe(2);
    expect(wrapper.vm.filteredCategories.length).toBe(2);

    // Test search filtering for contacts
    await wrapper.setData({ search: 'contact one' });
    expect(wrapper.vm.filteredContacts.length).toBe(1);
    expect(wrapper.vm.filteredContacts[0].name).toBe('Contact One');

    // Test search filtering for categories
    await wrapper.setData({ search: 'john' });
    expect(wrapper.vm.filteredCategories.length).toBe(1);
    expect(wrapper.vm.filteredCategories[0].name).toBe('John Doe');

    // Test case insensitivity
    await wrapper.setData({ search: 'JANE' });
    expect(wrapper.vm.filteredCategories.length).toBe(1);
    expect(wrapper.vm.filteredCategories[0].name).toBe('Jane Smith');

    // Test no results
    await wrapper.setData({ search: 'nobody' });
    expect(wrapper.vm.filteredContacts.length).toBe(0);
    expect(wrapper.vm.filteredCategories.length).toBe(0);
  });

  it('toggles categories visibility', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Initial state
    expect(wrapper.vm.showCategories).toBe(false);

    // Find and click toggle button
    const toggleButton = wrapper.find('.toggle-categories button');
    expect(toggleButton.text()).toBe('All Users');

    await toggleButton.trigger('click');
    expect(wrapper.vm.showCategories).toBe(true);
    expect(toggleButton.text()).toBe('Hide Users');

    await toggleButton.trigger('click');
    expect(wrapper.vm.showCategories).toBe(false);
    expect(toggleButton.text()).toBe('All Users');
  });

  it.skip('selects user correctly', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Initially no user is selected
    expect(wrapper.vm.selectedUser).toBe(null);
    expect(wrapper.find('.empty-state').text()).toBe('Select a chat to start messaging');

    // Select a user
    const testUser = wrapper.vm.contacts[0];
    await wrapper.vm.selectUser(testUser);

    expect(wrapper.vm.selectedUser).toEqual(testUser);
    expect(wrapper.find('.chat-thread').exists()).toBe(true);
  });

  it.skip('handles empty states correctly', async () => {
    // Mock empty responses
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Should show empty state when no users
    expect(wrapper.find('.empty-state').text()).toContain('No users available');

    // Test search with no results
    await wrapper.setData({ search: 'test' });
    expect(wrapper.find('.empty-state').text()).toContain('No users match your search');
  });

  it('handles back navigation', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    const backButton = wrapper.find('.user-btn');
    expect(backButton.text()).toBe('Back');

    await backButton.trigger('click');
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it.skip('handles API errors gracefully', async () => {
    // Mock fetch to reject
    global.fetch.mockRejectedValue(new Error('API Error'));

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Component should still render even if API calls fail
    expect(wrapper.find('.chat-app').exists()).toBe(true);
    expect(wrapper.vm.contacts.length).toBe(0);
    expect(wrapper.vm.categories.length).toBe(0);
  });

  it.skip('updates search input correctly', async () => {
    setupFetchMocks();

    const wrapper = mount(Chatbox, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    const searchInput = wrapper.find('input.search');
    
    await searchInput.setValue('test search');
    expect(wrapper.vm.search).toBe('test search');
    expect(searchInput.element.value).toBe('test search');
  });
});