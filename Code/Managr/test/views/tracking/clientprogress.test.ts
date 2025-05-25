import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ClientProjectCard from '../../../src/views/tracking/clientprogress.vue';

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

describe('ClientProjectCard.vue', () => {
  let mockRoute;
  let consoleSpy;
  let alertSpy;
  let windowOpenSpy;

  const mockRouteQuery = {
    jobTitle: 'Test Project',
    clientName: 'John Doe',
    jobDesc: 'Test project description',
    clientMail: 'john@example.com'
  };

  const mockProjectData = [
    {
      _id: 'project123',
      jobBudget: 5000,
      Amountdue: 2000,
      progress: 75
    }
  ];

  beforeEach(() => {
    // Mock route
    mockRoute = {
      query: mockRouteQuery
    };

    // Mock console and alert
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Mock window.open for PDF export
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => ({
      document: {
        write: vi.fn(),
        close: vi.fn()
      },
      focus: vi.fn(),
      print: vi.fn()
    }));

    // Mock fetch API
    global.fetch = vi.fn();
    
    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
    windowOpenSpy.mockRestore();
  });

  const setupSuccessfulFetch = () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProjectData)
      });
  };

  const createWrapper = (routeQuery = mockRouteQuery) => {
    return mount(ClientProjectCard, {
      global: {
        mocks: {
          $route: {
            query: routeQuery
          }
        }
      }
    });
  };

  it('renders properly with correct structure', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();

    // Test basic structure
    expect(wrapper.find('.project-card').exists()).toBe(true);
    expect(wrapper.find('.project-header').exists()).toBe(true);
    expect(wrapper.find('.project-details').exists()).toBe(true);
    expect(wrapper.find('.progress-section').exists()).toBe(true);
    expect(wrapper.find('.project-actions').exists()).toBe(true);

    // Test initial data from route
    expect(wrapper.find('.project-header h2').text()).toBe('Test Project');
    expect(wrapper.find('.freelancer-name').text()).toBe('John Doe');

    await flushPromises();

    // Test data after API call
    expect(wrapper.vm.totalPrice).toBe(5000);
    expect(wrapper.vm.Amountdue).toBe(2000);
    expect(wrapper.vm.progress).toBe(75);
  });

  it('initializes data correctly from route query', () => {
    const wrapper = createWrapper();

    expect(wrapper.vm.title).toBe('Test Project');
    expect(wrapper.vm.clientName).toBe('John Doe');
    expect(wrapper.vm.description).toBe('Test project description');
    expect(wrapper.vm.paymentAmount).toBe(0);
    expect(wrapper.vm.loaded).toBe(false);
  });

  it.skip('fetches project data successfully', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();

    await flushPromises();

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/getprogress?email=john@example.com&Title=Test Project&Description=Test project description'
    );

    // Verify data update
    expect(wrapper.vm.id).toBe('project123');
    expect(wrapper.vm.totalPrice).toBe(5000);
    expect(wrapper.vm.Amountdue).toBe(2000);
    expect(wrapper.vm.progress).toBe(75);
    expect(wrapper.vm.loaded).toBe(true);
  });

  it('handles empty project data', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    const wrapper = createWrapper();
    await flushPromises();

    expect(console.warn).toHaveBeenCalledWith('No project found');
    expect(wrapper.vm.loaded).toBe(false);
  });

  it('handles fetch error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const wrapper = createWrapper();
    await flushPromises();

    expect(console.error).toHaveBeenCalledWith('Error fetching project:', expect.any(Error));
  });

  it('displays financial information correctly', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();
    await flushPromises();

    const totalPrice = wrapper.find('.total-price');
    const paidAmount = wrapper.find('.paid-amount');
    const dueAmount = wrapper.find('.due-amount');

    expect(totalPrice.text()).toBe('$5000.00');
    expect(paidAmount.text()).toBe('$3000.00'); // totalPrice - Amountdue
    expect(dueAmount.text()).toBe('$2000.00');
  });

  it('displays progress information correctly', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();
    await flushPromises();

    const progressBar = wrapper.find('.progress-bar');
    const progressDisplay = wrapper.find('.progress-display');

    expect(progressBar.attributes('value')).toBe('75');
    expect(progressDisplay.text()).toBe('75% Complete');
  });

  it('computes progress status correctly', async () => {
    const testCases = [
      { progress: 95, expectedClass: 'status-complete', expectedText: 'Nearly Complete' },
      { progress: 80, expectedClass: 'status-near-complete', expectedText: 'Well Underway' },
      { progress: 50, expectedClass: 'status-in-progress', expectedText: 'In Progress' },
      { progress: 15, expectedClass: 'status-just-started', expectedText: 'Getting Started' },
      { progress: 5, expectedClass: 'status-just-started', expectedText: 'Just Started' }
    ];

    for (const testCase of testCases) {
      const wrapper = createWrapper();
      wrapper.setData({ progress: testCase.progress });

      expect(wrapper.vm.progressStatusClass).toBe(testCase.expectedClass);
      expect(wrapper.vm.progressStatusText).toBe(testCase.expectedText);
    }
  });

  it('shows payment section when amount is due', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();
    await flushPromises();

    expect(wrapper.find('.payment-section').exists()).toBe(true);
    expect(wrapper.find('.payment-input').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('hides payment section when no amount is due', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{
        _id: 'project123',
        jobBudget: 5000,
        Amountdue: 0,
        progress: 100
      }])
    });

    const wrapper = createWrapper();
    await flushPromises();

    expect(wrapper.find('.payment-section').exists()).toBe(false);
  });

  it('validates payment input correctly', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();
    await flushPromises();

    const paymentInput = wrapper.find('.payment-input');
    const submitButton = wrapper.find('button[type="submit"]');

    // Test initial state
    expect(submitButton.attributes('disabled')).toBeDefined();

    // Test valid payment amount
    await wrapper.setData({ paymentAmount: 1000 });
    expect(submitButton.attributes('disabled')).toBeUndefined();

    // Test payment amount exceeding due amount
    await wrapper.setData({ paymentAmount: 3000 });
    expect(submitButton.attributes('disabled')).toBeDefined();

    // Test zero payment amount
    await wrapper.setData({ paymentAmount: 0 });
    expect(submitButton.attributes('disabled')).toBeDefined();
  });

  it('handles payment submission error', async () => {
    setupSuccessfulFetch();
    
    // Mock payment submission error
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Payment failed' })
    });

    const wrapper = createWrapper();
    await flushPromises();

    await wrapper.setData({ paymentAmount: 1000 });
    
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(console.error).toHaveBeenCalledWith('Error updating progress:', expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Failed to update progress: Payment failed');
  });


  it('handles payment input validation attributes', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();
    await flushPromises();

    const paymentInput = wrapper.find('.payment-input');

    expect(paymentInput.attributes('type')).toBe('number');
    expect(paymentInput.attributes('min')).toBe('100');
    expect(paymentInput.attributes('max')).toBe('2000');
    expect(paymentInput.attributes('step')).toBe('100');
    expect(paymentInput.attributes('required')).toBeDefined();
  });

  it('handles network error during payment', async () => {
    setupSuccessfulFetch();
    
    // Mock network error for payment
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const wrapper = createWrapper();
    await flushPromises();

    await wrapper.setData({ paymentAmount: 1000 });
    
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(console.error).toHaveBeenCalledWith('Error updating progress:', expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Failed to update progress: Network error');
  });

  it('maintains component name correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.$options.name).toBe('ClientProjectCard');
  });

  it('has correct CSS classes and styling structure', async () => {
    setupSuccessfulFetch();
    const wrapper = createWrapper();

    // Test main CSS classes
    expect(wrapper.find('.project-card').exists()).toBe(true);
    expect(wrapper.find('.project-header').exists()).toBe(true);
    expect(wrapper.find('.project-details').exists()).toBe(true);
    expect(wrapper.find('.progress-section').exists()).toBe(true);
    expect(wrapper.find('.project-actions').exists()).toBe(true);

    await flushPromises();

    // Test payment section styling
    expect(wrapper.find('.payment-section').exists()).toBe(true);
    expect(wrapper.find('.hire-button').exists()).toBe(true);
  });
});