import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ManageGigs from '../../../src/views/client/manageGigs.vue';

// Mock the user store
vi.mock('../../../src/stores/userStore', () => ({
  useUserStore: () => ({
    email: 'test@example.com'
  })
}));

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

// Mock ProposalCard component
vi.mock('../../../src/views/client/proposalCard.vue', () => ({
  default: {
    name: 'ProposalCard',
    props: ['id', 'ClientName', 'mail', 'avatar', 'status', 'content', 'jobTitle', 'jobDesc', 'jobBudget'],
    template: `
      <div class="proposal-card-mock" :data-id="id">
        <h3>{{ClientName}}</h3>
        <p>{{jobTitle}}</p>
        <span>{{status}}</span>
        <span>Budget: {{jobBudget}}</span>
      </div>
    `
  }
}));

describe('ManageGigs.vue', () => {
  let mockRouter;
  let pinia;
  let consoleSpy;

  beforeEach(() => {
    // Setup Pinia
    pinia = createPinia();
    setActivePinia(pinia);

    // Mock router
    mockRouter = {
      go: vi.fn()
    };

    // Mock console.error to test error handling
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock fetch API
    global.fetch = vi.fn();
    
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    consoleSpy.mockRestore();
  });

  const mockProposalsData = [
    {
      id: '1',
      name: 'John Client',
      sender: 'john@client.com',
      avatar: 'john-avatar.jpg',
      content: 'Looking for a web developer',
      jobTitle: 'Web Development Project',
      jobDesc: 'Build a modern website',
      status: 'pending',
      jobBudget: 5000
    },
    {
      id: '2',
      name: 'Jane Client',
      sender: 'jane@client.com',
      avatar: 'jane-avatar.jpg',
      content: 'Need mobile app development',
      jobTitle: 'Mobile App Project',
      jobDesc: 'Create iOS and Android app',
      status: 'accepted',
      jobBudget: 8000
    }
  ];

  const setupSuccessfulFetch = () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProposalsData)
    });
  };

  it.skip('renders properly with correct structure', async () => {
    setupSuccessfulFetch();

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    // Test component structure
    expect(wrapper.find('.proposal-view').exists()).toBe(true);
    expect(wrapper.find('.secondary-btn').exists()).toBe(true);
    expect(wrapper.find('.view-title').exists()).toBe(true);
    expect(wrapper.find('.proposal-card').exists()).toBe(true);

    // Test content
    expect(wrapper.find('.view-title').text()).toBe('All Proposals');
    expect(wrapper.find('.secondary-btn').text()).toBe('Back');

    // Wait for API call to resolve
    await flushPromises();

    // Test that ProposalCard components are rendered
    const proposalCards = wrapper.findAllComponents({ name: 'ProposalCard' });
    expect(proposalCards).toHaveLength(2);
  });


  it('handles back navigation correctly', async () => {
    setupSuccessfulFetch();

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    const backButton = wrapper.find('.secondary-btn');
    await backButton.trigger('click');

    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('handles empty proposals list', async () => {
    // Mock empty response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    expect(wrapper.vm.Proposals).toHaveLength(0);
    const proposalCards = wrapper.findAllComponents({ name: 'ProposalCard' });
    expect(proposalCards).toHaveLength(0);
  });

  it('handles API fetch failure', async () => {
    // Mock fetch failure
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Verify error is caught and logged
    expect(consoleSpy).toHaveBeenCalledWith('Error loading applications:', expect.any(Error));
    expect(wrapper.vm.Proposals).toHaveLength(0);
  });


  it('handles malformed API response gracefully', async () => {
    // Mock malformed response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        {
          id: '1',
          // Missing some required fields
          name: 'Incomplete Client'
        }
      ])
    });

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    await flushPromises();

    // Component should handle missing fields gracefully
    expect(wrapper.vm.Proposals).toHaveLength(1);
    expect(wrapper.vm.Proposals[0].ClientName).toBe('Incomplete Client');
    expect(wrapper.vm.Proposals[0].mail).toBeUndefined();
  });

  it('has correct CSS classes and styling structure', () => {
    setupSuccessfulFetch();

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    // Test CSS classes
    expect(wrapper.find('.proposal-view').exists()).toBe(true);
    expect(wrapper.find('.view-title').exists()).toBe(true);
    expect(wrapper.find('.proposal-card').exists()).toBe(true);
    expect(wrapper.find('.secondary-btn').exists()).toBe(true);

    // Test button styling
    const backButton = wrapper.find('.secondary-btn');
    expect(backButton.classes()).toContain('secondary-btn');
  });

  it('maintains component name correctly', () => {
    setupSuccessfulFetch();

    const wrapper = mount(ManageGigs, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter
        }
      }
    });

    expect(wrapper.vm.$options.name).toBe('ManageGigs');
  });
});