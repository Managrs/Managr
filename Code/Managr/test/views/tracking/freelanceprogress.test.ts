import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import freelanceprogress from '../../../src/views/tracking/freelanceprogress.vue';

// Mock the user store
const mockUserStore = {
  email: 'test@example.com'
};

vi.mock('../../stores/userStore', () => ({
  useUserStore: () => mockUserStore
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock route params
const mockRoute = {
  query: {
    jobTitle: 'Test Project',
    clientName: 'Test Client',
    jobDesc: 'Test Description'
  }
};

describe('SingleProjectCard', () => {
  let wrapper;
  
  beforeEach(() => {
    // Create fresh Pinia instance for each test
    setActivePinia(createPinia());
    
    // Reset fetch mock
    vi.clearAllMocks();
    
    // Mock environment variable
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000');
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Component Initialization', () => {
    it('should render with route query data', () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      expect(wrapper.vm.title).toBe('Test Project');
      expect(wrapper.vm.clientName).toBe('Test Client');
      expect(wrapper.vm.description).toBe('Test Description');
    });

    it('should initialize with default values', () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      expect(wrapper.vm.totalPrice).toBe(0);
      expect(wrapper.vm.Amountdue).toBe(0);
      expect(wrapper.vm.progress).toBe(0);
      expect(wrapper.vm.loaded).toBe(false);
    });
  });

  describe('fetchProject method', () => {
    it('should fetch project data successfully', async () => {
      const mockResponse = [{
        _id: 'test-id',
        jobBudget: 1000,
        Amountdue: 500,
        progress: 75
      }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      await wrapper.vm.fetchProject();

      expect(wrapper.vm.id).toBe('test-id');
      expect(wrapper.vm.totalPrice).toBe(1000);
      expect(wrapper.vm.Amountdue).toBe(500);
      expect(wrapper.vm.progress).toBe(75);
      expect(wrapper.vm.loaded).toBe(true);
    });

    it('should handle fetch error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      fetch.mockRejectedValueOnce(new Error('Network error'));

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      await wrapper.vm.fetchProject();

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', expect.any(Error));
      expect(wrapper.vm.loaded).toBe(false);
      
      consoleSpy.mockRestore();
    });

    it('should handle empty response', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      await wrapper.vm.fetchProject();

      expect(consoleSpy).toHaveBeenCalledWith('No project found');
      
      consoleSpy.mockRestore();
    });
  });

  describe('updateProgress method', () => {
    it('should update progress value', () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      wrapper.vm.updateProgress('50');
      expect(wrapper.vm.progress).toBe(50);

      wrapper.vm.updateProgress('100');
      expect(wrapper.vm.progress).toBe(100);
    });
  });

  describe('exportToPDF method', () => {
    it('should generate PDF with project data', () => {
      const mockWindow = {
        document: {
          write: vi.fn(),
          close: vi.fn()
        },
        focus: vi.fn(),
        print: vi.fn()
      };

      vi.spyOn(window, 'open').mockReturnValue(mockWindow);
      vi.useFakeTimers();

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      wrapper.vm.title = 'Test Project';
      wrapper.vm.clientName = 'Test Client';
      wrapper.vm.totalPrice = 1000;
      wrapper.vm.Amountdue = 300;
      wrapper.vm.progress = 70;

      wrapper.vm.exportToPDF();

      expect(window.open).toHaveBeenCalledWith('', '_blank', 'width=800,height=600');
      expect(mockWindow.document.write).toHaveBeenCalled();
      expect(mockWindow.document.close).toHaveBeenCalled();
      expect(mockWindow.focus).toHaveBeenCalled();

      // Fast-forward time to trigger print
      vi.advanceTimersByTime(750);
      expect(mockWindow.print).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('should handle popup blocker', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      vi.spyOn(window, 'open').mockReturnValue(null);

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      wrapper.vm.exportToPDF();

      expect(consoleSpy).toHaveBeenCalledWith('PDF Export Error:', expect.any(Error));
      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to export PDF'));
      
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('Template Rendering', () => {
    it('should not render when not loaded', () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      expect(wrapper.find('.project-card').exists()).toBe(false);
    });

    it('should render project information when loaded', async () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      // Set loaded state and project data
      await wrapper.setData({
        loaded: true,
        totalPrice: 1000,
        Amountdue: 300,
        progress: 75
      });

      expect(wrapper.find('.project-card').exists()).toBe(true);
      expect(wrapper.find('h2').text()).toBe('Test Project');
      expect(wrapper.text()).toContain('Test Client');
      expect(wrapper.text()).toContain('$1000.00');
      expect(wrapper.text()).toContain('$300.00');
      expect(wrapper.text()).toContain('$700.00');
    });

    it('should update progress slider', async () => {
      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      await wrapper.setData({ loaded: true, progress: 50 });

      const slider = wrapper.find('input[type="range"]');
      expect(slider.element.value).toBe('50');

      // Simulate slider change
      await slider.setValue('75');
      await slider.trigger('input');

      expect(wrapper.vm.progress).toBe(75);
    });

    it('should trigger save and export actions', async () => {
      const saveProjectSpy = vi.spyOn(freelanceprogress.methods, 'saveProject').mockImplementation(() => {});
      const exportToPDFSpy = vi.spyOn(freelanceprogress.methods, 'exportToPDF').mockImplementation(() => {});

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      await wrapper.setData({ loaded: true });

      const saveButton = wrapper.find('.save-btn');
      const exportButton = wrapper.find('.export-btn');

      await saveButton.trigger('click');
      await exportButton.trigger('click');

      expect(saveProjectSpy).toHaveBeenCalled();
      expect(exportToPDFSpy).toHaveBeenCalled();

      saveProjectSpy.mockRestore();
      exportToPDFSpy.mockRestore();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should call fetchProject on mount', () => {
      const fetchProjectSpy = vi.spyOn(freelanceprogress.methods, 'fetchProject').mockImplementation(() => {});

      wrapper = mount(freelanceprogress, {
        global: {
          mocks: {
            $route: mockRoute
          }
        }
      });

      expect(fetchProjectSpy).toHaveBeenCalled();
      
      fetchProjectSpy.mockRestore();
    });
  });
});