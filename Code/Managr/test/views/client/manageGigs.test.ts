// manageGigs.test.ts
import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ManageGigs from '../../../src/views/client/manageGigs.vue';
import ProposalCard from '../../../src/components/ProfileCard.vue';

// Mock ProposalCard component
vi.mock('../../../src/components/proposalCard.vue', () => ({
  default: {
    name: 'ProposalCard',
    props: ['name', 'mail', 'avatar', 'content', 'jobId'],
    template: '<div class="proposal-card-mock">{{name}}</div>'
  }
}));

describe.skip('ManageGigs', () => {
  // Mock fetch before each test
  beforeEach(() => {
    // Mock environment variable
    vi.stubEnv('VITE_API_URL', 'http://test-api.com');
    
    // Mock fetch API
    //@ts-ignore
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { 
            id: 1, 
            name: 'John Doe', 
            sender: 'john@example.com', 
            avatar: 'avatar1.jpg', 
            content: 'I am interested in this job',
            jobId: 'job123'
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            sender: 'jane@example.com', 
            avatar: 'avatar2.jpg', 
            content: 'I have experience in this field',
            jobId: 'job456'
          }
        ])
      })
    );
  });

  // Reset mocks after each test
  //@ts-ignore
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('renders the correct component structure', async () => {
    const wrapper = mount(ManageGigs);
    
    // Check basic structure
    expect(wrapper.find('.proposal-view').exists()).toBe(true);
    expect(wrapper.find('.secondary-btn').exists()).toBe(true);
    expect(wrapper.find('.view-title').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('All Proposals');
    
    // Button content check
    expect(wrapper.find('.secondary-btn').text()).toContain('Back');
  });

  it('fetches applications on mount', async () => {
    const wrapper = mount(ManageGigs);
    
    // Check that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://test-api.com/applications');
    
    // Wait for the Promise to resolve
    await flushPromises();
    
    // Check that Proposals array was populated
    expect(wrapper.vm.Proposals.length).toBe(2);
    expect(wrapper.vm.Proposals[0].name).toBe('John Doe');
    expect(wrapper.vm.Proposals[1].mail).toBe('jane@example.com');
  });

  it('correctly formats the application data', async () => {
    const wrapper = mount(ManageGigs);
    await flushPromises();
    
    // Check data transformation
    expect(wrapper.vm.Proposals[0]).toEqual({
      id: 1,
      name: 'John Doe',
      mail: 'john@example.com',
      image: 'avatar1.jpg',
      content: 'I am interested in this job',
      jobId: 'job123'
    });
  });

  it.skip('renders the correct number of ProposalCard components', async () => {
    const wrapper = mount(ManageGigs);
    await flushPromises();
    
    // Check ProposalCard components
    const proposalCards = wrapper.findAllComponents(ProposalCard);
    expect(proposalCards.length).toBe(2);
  });

  it.skip('passes correct props to ProposalCard components', async () => {
    const wrapper = mount(ManageGigs);
    await flushPromises();
    
    // Find all proposal cards
    const proposalCards = wrapper.findAllComponents(ProposalCard);
    
    // Check props of first card
    expect(proposalCards[0].props()).toEqual({
      name: 'John Doe',
      mail: 'john@example.com',
      avatar: 'avatar1.jpg', 
      content: 'I am interested in this job',
      jobId: 'job123'
    });
  });

  it('navigates back when the back button is clicked', async () => {
    const mockRouter = {
      go: vi.fn()
    };
    
    const wrapper = mount(ManageGigs, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    
    // Click back button
    await wrapper.find('.secondary-btn').trigger('click');
    
    // Check router navigation
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('handles fetch error gracefully', async () => {
    // Mock console.error
    console.error = vi.fn();
    
    // Override fetch to simulate an error
    //@ts-ignore
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: false,
        status: 404
      })
    );
    
    const wrapper = mount(ManageGigs);
    await flushPromises();
    
    // Check error handling
    expect(console.error).toHaveBeenCalled();
    expect(wrapper.vm.Proposals.length).toBe(0);
  });

  it('handles network failure gracefully', async () => {
    // Mock console.error
    console.error = vi.fn();
    
    // Override fetch to throw an error
    global.fetch = vi.fn(() => Promise.reject('Network error'));
    
    const wrapper = mount(ManageGigs);
    await flushPromises();
    
    // Check error handling
    expect(console.error).toHaveBeenCalled();
    expect(wrapper.vm.Proposals.length).toBe(0);
  });

  it('applies correct CSS classes for styling', () => {
    const wrapper = mount(ManageGigs);
    
    // Check CSS classes
    expect(wrapper.find('.proposal-view').exists()).toBe(true);
    expect(wrapper.find('.view-title').exists()).toBe(true);
    expect(wrapper.find('.proposal-card').exists()).toBe(true);
    expect(wrapper.find('.secondary-btn').exists()).toBe(true);
  });
});