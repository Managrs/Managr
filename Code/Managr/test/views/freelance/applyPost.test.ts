// applyPost.test.ts
import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
//@ts-ignore
import applyPost from '../../../src/views/freelance/applyPost.vue';


// Mock the userStore
vi.mock('@/stores/userStore', () => ({
  useUserStore: vi.fn(() => ({
    email: 'freelancer@example.com'
  }))
}));

describe('applyPost', () => {
  let wrapper;
  let mockRoute;
  let mockFetch;

  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia());
    
    // Mock the route query params
    mockRoute = {
      query: {
        clientEmail: 'client@example.com'
      }
    };
    
    // Mock the fetch API
    mockFetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    );
    
    global.fetch = mockFetch;
    
    // Mock alert
    global.alert = vi.fn();
    
    // Mock console.log and console.error
    console.log = vi.fn();
    console.error = vi.fn();
    
    // Create the component wrapper
    wrapper = mount(applyPost, {
      global: {
        mocks: {
          $route: mockRoute
        },
        stubs: ['router-link']
      }
    });
  });

  it('renders the form structure', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.find('section.post-page').exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.findAll('input').length).toBe(2);
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('prefills the client email from route query param', () => {
    expect(wrapper.vm.gig.clientEmail).toBe('client@example.com');
  });

  it('prefills the freelancer email from userStore', () => {
    expect(wrapper.vm.gig.freelancerEmail).toBe('freelancer@example.com');
  });

  it('form inputs have the correct attributes', () => {
    const clientEmailInput = wrapper.find('#clientEmail');
    expect(clientEmailInput.exists()).toBe(true);
    expect(clientEmailInput.attributes('readonly')).toBeDefined();
    expect(clientEmailInput.attributes('required')).toBeDefined();
    
    const freelancerEmailInput = wrapper.find('#freelancerEmail');
    expect(freelancerEmailInput.exists()).toBe(true);
    expect(freelancerEmailInput.attributes('readonly')).toBeDefined();
    expect(freelancerEmailInput.attributes('required')).toBeDefined();
    
    const gigDescriptionTextarea = wrapper.find('#gigDescription');
    expect(gigDescriptionTextarea.exists()).toBe(true);
    expect(gigDescriptionTextarea.attributes('required')).toBeDefined();
    expect(gigDescriptionTextarea.attributes('rows')).toBe('5');
    expect(gigDescriptionTextarea.attributes('placeholder')).toBe('Write your application message here');
  });

  it('handles form submissions correctly', async () => {
    // Set up form data
    await wrapper.setData({ 
      gig: {
        clientEmail: 'client@example.com',
        freelancerEmail: 'freelancer@example.com',
        gigDescription: 'I am interested in this job opportunity'
      }
    });
    
    // Simulate form submission
    await wrapper.find('form').trigger('submit');
    
    // Check if fetch was called with the correct data
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/application'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          senderId: 'freelancer@example.com',
          receiverId: 'client@example.com',
          content: 'I am interested in this job opportunity'
        })
      })
    );
    
    await flushPromises();
    
    // Check if success alert was shown
    expect(global.alert).toHaveBeenCalledWith('Application sent successfully!');
    
    // Check if gigDescription was cleared
    expect(wrapper.vm.gig.gigDescription).toBe('');
  });

  it('handles API errors correctly', async () => {
    // Override the fetch mock to simulate an error
    //@ts-ignore
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid application data' })
      })
    );
    
    // Set up form data
    await wrapper.setData({ 
      gig: {
        clientEmail: 'client@example.com',
        freelancerEmail: 'freelancer@example.com',
        gigDescription: 'I am interested in this job opportunity'
      }
    });
    
    // Simulate form submission
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    
    // Check if error alert was shown
    expect(global.alert).toHaveBeenCalledWith('An error occurred while sending your application.');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles network errors correctly', async () => {
    // Override the fetch mock to simulate a network error
    global.fetch = vi.fn(() => Promise.reject('Network error'));
    
    // Set up form data
    await wrapper.setData({ 
      gig: {
        clientEmail: 'client@example.com',
        freelancerEmail: 'freelancer@example.com',
        gigDescription: 'I am interested in this job opportunity'
      }
    });
    
    // Simulate form submission
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    
    // Check if error alert was shown
    expect(global.alert).toHaveBeenCalledWith('An error occurred while sending your application.');
    expect(console.error).toHaveBeenCalled();
  });

  it('applies correct CSS classes for styling', () => {
    expect(wrapper.find('.post-page').exists()).toBe(true);
    expect(wrapper.find('.page-title').exists()).toBe(true);
    expect(wrapper.find('.secondary-btn').exists()).toBe(true);
  });

  it('renders the back to dashboard button', () => {
    const backButton = wrapper.find('.secondary-btn');
    expect(backButton.exists()).toBe(true);
    expect(backButton.text()).toBe('Back to Dashboard');
  });

  it.skip('form validation prevents submission with empty fields', async () => {
    // Reset the gigDescription to be empty
    await wrapper.setData({
      gig: {
        clientEmail: 'client@example.com',
        freelancerEmail: 'freelancer@example.com',
        gigDescription: ''
      }
    });
    
    // Get the form element
    const form = wrapper.find('form');
    
    // Add a mock to prevent the default form validation
    const preventDefaultSpy = vi.fn();
    
    // Trigger submit with preventDefault mocked
    await form.trigger('submit', {
      preventDefault: preventDefaultSpy
    });
    
    // Check if the fetch API was NOT called (form validation should prevent it)
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('correctly handles the mounted hook with missing query params', async () => {
    // Create a new wrapper with no query params
    const noQueryWrapper = mount(applyPost, {
      global: {
        mocks: {
          $route: { query: {} }
        },
        stubs: ['router-link']
      }
    });
    
    // Check that clientEmail is empty
    expect(noQueryWrapper.vm.gig.clientEmail).toBe('');
    
    // But freelancerEmail should still be set from the store
    expect(noQueryWrapper.vm.gig.freelancerEmail).toBe('freelancer@example.com');
  });
});