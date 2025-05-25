import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ClientProjectCard from '../../../src/views/tracking/clientprogress.vue';

// Mock the router
const mockRoute = {
  query: {
    jobTitle: 'Test Project',
    clientName: 'John Doe',
    jobDesc: 'Test project description',
    clientMail: 'test@example.com'
  }
};

const mockRouter = {
  push: vi.fn()
};

// Mock fetch globally
global.fetch = vi.fn();

// Mock environment variable
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

describe('ClientProjectCard', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    
    wrapper = mount(ClientProjectCard, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });
  });

  describe('Component Initialization', () => {
    it('should render the component with correct initial data', () => {
      expect(wrapper.find('.project-card').exists()).toBe(true);
      expect(wrapper.find('h2').text()).toBe('Test Project');
      expect(wrapper.find('.freelancer-name').text()).toBe('John Doe');
    });

    it('should initialize with route query parameters', () => {
      expect(wrapper.vm.title).toBe('Test Project');
      expect(wrapper.vm.clientName).toBe('John Doe');
      expect(wrapper.vm.description).toBe('Test project description');
    });

    it('should initialize with default values', () => {
      expect(wrapper.vm.totalPrice).toBe(0);
      expect(wrapper.vm.Amountdue).toBe(0);
      expect(wrapper.vm.paymentAmount).toBe(0);
      expect(wrapper.vm.progress).toBe(0);
      expect(wrapper.vm.loaded).toBe(false);
    });
  });

  describe('fetchProject method', () => {
    it.skip('should fetch project data successfully', async () => {
      const mockProjectData = [{
        _id: 'project123',
        jobBudget: 1000,
        Amountdue: 500,
        progress: 75
      }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProjectData)
      });

      await wrapper.vm.fetchProject();

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/getprogress?email=test@example.com&Title=Test Project&Description=Test project description'
      );
      expect(wrapper.vm.id).toBe('project123');
      expect(wrapper.vm.totalPrice).toBe(1000);
      expect(wrapper.vm.Amountdue).toBe(500);
      expect(wrapper.vm.progress).toBe(75);
      expect(wrapper.vm.loaded).toBe(true);
    });

    it('should handle empty project data', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await wrapper.vm.fetchProject();

      expect(consoleSpy).toHaveBeenCalledWith('No project found');
      consoleSpy.mockRestore();
    });

    it('should handle fetch errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await wrapper.vm.fetchProject();

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('should handle non-ok response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await wrapper.vm.fetchProject();

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('submitGig method', () => {
    beforeEach(() => {
      wrapper.vm.id = 'project123';
      wrapper.vm.Amountdue = 500;
      wrapper.vm.paymentAmount = 200;
    });

    it.skip('should submit payment successfully', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await wrapper.vm.submitGig();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/setmilestone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progressid: 'project123',
          Amountdue: 300
        })
      });

      expect(alertSpy).toHaveBeenCalledWith('Due Amount updated successfully!');
      alertSpy.mockRestore();
    });

    it('should handle payment submission errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Payment failed' })
      });

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await wrapper.vm.submitGig();

      expect(alertSpy).toHaveBeenCalledWith('Failed to update progress: Payment failed');
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('Computed Properties', () => {
    it('should compute progress status class correctly', () => {
      wrapper.vm.progress = 95;
      expect(wrapper.vm.progressStatusClass).toBe('status-complete');

      wrapper.vm.progress = 75;
      expect(wrapper.vm.progressStatusClass).toBe('status-near-complete');

      wrapper.vm.progress = 50;
      expect(wrapper.vm.progressStatusClass).toBe('status-in-progress');

      wrapper.vm.progress = 20;
      expect(wrapper.vm.progressStatusClass).toBe('status-just-started');
    });

    it('should compute progress status text correctly', () => {
      wrapper.vm.progress = 95;
      expect(wrapper.vm.progressStatusText).toBe('Nearly Complete');

      wrapper.vm.progress = 75;
      expect(wrapper.vm.progressStatusText).toBe('Well Underway');

      wrapper.vm.progress = 50;
      expect(wrapper.vm.progressStatusText).toBe('In Progress');

      wrapper.vm.progress = 15;
      expect(wrapper.vm.progressStatusText).toBe('Getting Started');

      wrapper.vm.progress = 5;
      expect(wrapper.vm.progressStatusText).toBe('Just Started');
    });
  });

  describe('Payment Form', () => {
    beforeEach(async () => {
      wrapper.vm.Amountdue = 500;
      await wrapper.vm.$nextTick();
    });

    it('should render payment form when amount is due', () => {
      expect(wrapper.find('.payment-section').exists()).toBe(true);
      expect(wrapper.find('#paymentAmount').exists()).toBe(true);
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it.skip('should validate payment amount input', async () => {
      const paymentInput = wrapper.find('#paymentAmount');
      const submitButton = wrapper.find('button[type="submit"]');

      // Test with valid amount
      await paymentInput.setValue(200);
      expect(submitButton.attributes('disabled')).toBeUndefined();

      // Test with amount exceeding due amount
      await paymentInput.setValue(600);
      expect(submitButton.attributes('disabled')).toBeDefined();

      // Test with zero amount
      await paymentInput.setValue(0);
      expect(submitButton.attributes('disabled')).toBeDefined();
    });

    it('should handle form submission', async () => {
      const form = wrapper.find('form');
      wrapper.vm.paymentAmount = 200;
      wrapper.vm.submitGig = vi.fn();

      await form.trigger('submit.prevent');

      expect(wrapper.vm.submitGig).toHaveBeenCalled();
    });
  });

  describe('Progress Display', () => {
    it('should display progress correctly', async () => {
      wrapper.vm.progress = 65;
      await wrapper.vm.$nextTick();

      const progressBar = wrapper.find('.progress-bar');
      const progressDisplay = wrapper.find('.progress-display');

      expect(progressBar.attributes('value')).toBe('65');
      expect(progressDisplay.text()).toBe('65% Complete');
    });

    it('should apply correct progress status styling', async () => {
      wrapper.vm.progress = 85;
      await wrapper.vm.$nextTick();

      const progressStatus = wrapper.find('.progress-status');
      expect(progressStatus.classes()).toContain('status-near-complete');
    });
  });

  describe('Financial Information Display', () => {
    beforeEach(async () => {
      wrapper.vm.totalPrice = 1000;
      wrapper.vm.Amountdue = 300;
      await wrapper.vm.$nextTick();
    });

    it('should display financial information correctly', () => {
      expect(wrapper.find('.total-price').text()).toBe('$1000.00');
      expect(wrapper.find('.due-amount').text()).toBe('$300.00');
      expect(wrapper.find('.paid-amount').text()).toBe('$700.00');
    });
  });

  describe('PDF Export', () => {
    it.skip('should call exportToPDF method when button is clicked', async () => {
      wrapper.vm.exportToPDF = vi.fn();
      
      const exportButton = wrapper.find('button').filter(button => 
        button.text().includes('Export to PDF')
      );
      
      await exportButton.trigger('click');
      expect(wrapper.vm.exportToPDF).toHaveBeenCalled();
    });

    it('should generate PDF with correct content', () => {
      // Mock window.open
      const mockWindow = {
        document: {
          write: vi.fn(),
          close: vi.fn()
        },
        focus: vi.fn(),
        print: vi.fn()
      };
      
      vi.spyOn(window, 'open').mockReturnValue(mockWindow);
      
      wrapper.vm.title = 'Test Project';
      wrapper.vm.clientName = 'John Doe';
      wrapper.vm.totalPrice = 1000;
      wrapper.vm.progress = 75;

      wrapper.vm.exportToPDF();

      expect(window.open).toHaveBeenCalledWith('', '_blank');
      expect(mockWindow.document.write).toHaveBeenCalled();
      expect(mockWindow.document.close).toHaveBeenCalled();
      expect(mockWindow.focus).toHaveBeenCalled();
    });
  });

  describe('Component Lifecycle', () => {
    it('should call fetchProject on mounted', () => {
      const fetchProjectSpy = vi.spyOn(ClientProjectCard.methods, 'fetchProject');
      
      mount(ClientProjectCard, {
        global: {
          mocks: {
            $route: mockRoute,
            $router: mockRouter
          }
        }
      });

      expect(fetchProjectSpy).toHaveBeenCalled();
    });
  });

  describe('Conditional Rendering', () => {
    it('should not render payment section when no amount is due', async () => {
      wrapper.vm.Amountdue = 0;
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.payment-section').exists()).toBe(false);
    });

    it('should render payment section when amount is due', async () => {
      wrapper.vm.Amountdue = 500;
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.payment-section').exists()).toBe(true);
    });
  });
});