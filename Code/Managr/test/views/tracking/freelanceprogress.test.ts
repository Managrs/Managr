import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SingleProjectCard from '../../../src/views/tracking/freelanceprogress.vue';

// Mock the user store
const mockUserStore = {
  email: 'freelancer@example.com'
};

vi.mock('../../stores/userStore', () => ({
  useUserStore: () => mockUserStore
}));

// Mock the router
const mockRoute = {
  query: {
    jobTitle: 'Website Development',
    clientName: 'Jane Smith',
    jobDesc: 'Build a responsive website with Vue.js'
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

describe('SingleProjectCard', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    
    wrapper = mount(SingleProjectCard, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });
  });

  describe('Component Initialization', () => {
    it('should render the component when loaded is true', async () => {
      wrapper.vm.loaded = true;
      await wrapper.vm.$nextTick();
      
      expect(wrapper.find('.project-card').exists()).toBe(true);
      expect(wrapper.find('h2').text()).toBe('Website Development');
    });

    it('should not render the component when loaded is false', () => {
      wrapper.vm.loaded = false;
      expect(wrapper.find('.project-card').exists()).toBe(false);
    });

    it('should initialize with route query parameters', () => {
      expect(wrapper.vm.title).toBe('Website Development');
      expect(wrapper.vm.clientName).toBe('Jane Smith');
      expect(wrapper.vm.description).toBe('Build a responsive website with Vue.js');
    });

    it('should initialize with default values', () => {
      expect(wrapper.vm.totalPrice).toBe(0);
      expect(wrapper.vm.Amountdue).toBe(0);
      expect(wrapper.vm.progress).toBe(0);
      expect(wrapper.vm.loaded).toBe(false);
      expect(wrapper.vm.id).toBe('');
    });
  });

  describe('updateProgress method', () => {
    it.skip('should update progress value', () => {
      wrapper.vm.updateProgress('75');
      expect(wrapper.vm.progress).toBe(75);
    });

    it('should parse string values to integers', () => {
      wrapper.vm.updateProgress('42.7');
      expect(wrapper.vm.progress).toBe(42);
    });

    it('should handle edge values', () => {
      wrapper.vm.updateProgress('0');
      expect(wrapper.vm.progress).toBe(0);

      wrapper.vm.updateProgress('100');
      expect(wrapper.vm.progress).toBe(100);
    });
  });

  describe('saveProject method', () => {
    beforeEach(() => {
      wrapper.vm.id = 'project456';
      wrapper.vm.progress = 75;
    });

    it.skip('should save progress successfully', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await wrapper.vm.saveProject();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/setprogress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progressid: 'project456',
          progress: 75
        })
      });

      expect(alertSpy).toHaveBeenCalledWith('Progress updated successfully!');
      alertSpy.mockRestore();
    });

    it('should handle save errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Update failed' })
      });

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await wrapper.vm.saveProject();

      expect(alertSpy).toHaveBeenCalledWith('Failed to update progress: Update failed');
      expect(consoleSpy).toHaveBeenCalledWith('Error updating progress:', expect.any(Error));
      
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await wrapper.vm.saveProject();

      expect(alertSpy).toHaveBeenCalledWith('Failed to update progress: Network error');
      
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('Progress Section', () => {
    beforeEach(async () => {
      wrapper.vm.loaded = true;
      wrapper.vm.progress = 65;
      await wrapper.vm.$nextTick();
    });

    it('should render progress slider with correct value', () => {
      const slider = wrapper.find('input[type="range"]');
      expect(slider.exists()).toBe(true);
      expect(slider.attributes('value')).toBe('65');
      expect(slider.attributes('min')).toBe('0');
      expect(slider.attributes('max')).toBe('100');
    });

    it('should render progress bar with correct value', () => {
      const progressBar = wrapper.find('.progress-bar');
      expect(progressBar.exists()).toBe(true);
      expect(progressBar.attributes('value')).toBe('65');
      expect(progressBar.attributes('max')).toBe('100');
    });

    it('should display progress percentage', () => {
      const progressDisplay = wrapper.find('.progress-display');
      expect(progressDisplay.text()).toBe('65%');
    });

    it.skip('should update progress when slider changes', async () => {
      const slider = wrapper.find('input[type="range"]');
      await slider.trigger('input', { target: { value: '80' } });
      
      expect(wrapper.vm.progress).toBe(80);
    });
  });

  describe('Project Details Display', () => {
    beforeEach(async () => {
      wrapper.vm.loaded = true;
      wrapper.vm.totalPrice = 2000;
      wrapper.vm.Amountdue = 800;
      await wrapper.vm.$nextTick();
    });

    it('should display project information correctly', () => {
      const projectInfo = wrapper.find('.project-info');
      expect(projectInfo.text()).toContain('Jane Smith');
      expect(projectInfo.text()).toContain('Build a responsive website with Vue.js');
    });

    it('should display financial information correctly', () => {
      expect(wrapper.find('.price').text()).toBe('$2000.00');
      expect(wrapper.find('.paid-amount').text()).toBe('$800.00');
      expect(wrapper.find('.remaining-amount').text()).toBe('$1200.00');
    });

    it('should handle zero values gracefully', async () => {
      wrapper.vm.totalPrice = 0;
      wrapper.vm.Amountdue = 0;
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.price').text()).toBe('$0.00');
      expect(wrapper.find('.paid-amount').text()).toBe('$0.00');
      expect(wrapper.find('.remaining-amount').text()).toBe('$0.00');
    });
  });

  describe('Action Buttons', () => {
    beforeEach(async () => {
      wrapper.vm.loaded = true;
      await wrapper.vm.$nextTick();
    });

    it('should render save and export buttons', () => {
      const saveButton = wrapper.find('.save-btn');
      const exportButton = wrapper.find('.export-btn');
      
      expect(saveButton.exists()).toBe(true);
      expect(exportButton.exists()).toBe(true);
      expect(saveButton.text()).toBe('Save Changes');
      expect(exportButton.text()).toBe('Export to PDF');
    });

    it('should call saveProject when save button is clicked', async () => {
      wrapper.vm.saveProject = vi.fn();
      
      const saveButton = wrapper.find('.save-btn');
      await saveButton.trigger('click');
      
      expect(wrapper.vm.saveProject).toHaveBeenCalled();
    });

    it('should call exportToPDF when export button is clicked', async () => {
      wrapper.vm.exportToPDF = vi.fn();
      
      const exportButton = wrapper.find('.export-btn');
      await exportButton.trigger('click');
      
      expect(wrapper.vm.exportToPDF).toHaveBeenCalled();
    });
  });

  describe('PDF Export', () => {
    beforeEach(() => {
      wrapper.vm.title = 'Test Project';
      wrapper.vm.clientName = 'John Doe';
      wrapper.vm.description = 'Test description';
      wrapper.vm.totalPrice = 1000;
      wrapper.vm.Amountdue = 400;
      wrapper.vm.progress = 75;
      wrapper.vm.id = 'test123';
    });

    it('should generate PDF with correct content', () => {
      const mockWindow = {
        document: {
          write: vi.fn(),
          close: vi.fn()
        },
        focus: vi.fn(),
        print: vi.fn()
      };
      
      vi.spyOn(window, 'open').mockReturnValue(mockWindow);

      wrapper.vm.exportToPDF();

      expect(window.open).toHaveBeenCalledWith('', '_blank', 'width=800,height=600');
      expect(mockWindow.document.write).toHaveBeenCalled();
      expect(mockWindow.document.close).toHaveBeenCalled();
      expect(mockWindow.focus).toHaveBeenCalled();

      // Check if the HTML content includes expected data
      const htmlContent = mockWindow.document.write.mock.calls[0][0];
      expect(htmlContent).toContain('Test Project');
      expect(htmlContent).toContain('John Doe');
      expect(htmlContent).toContain('$1000.00');
      expect(htmlContent).toContain('75%');
    });

    it('should handle popup blocking gracefully', () => {
      vi.spyOn(window, 'open').mockReturnValue(null);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      wrapper.vm.exportToPDF();

      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to export PDF'));
      expect(consoleSpy).toHaveBeenCalledWith('PDF Export Error:', expect.any(Error));
      
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });

    it('should generate correct payment progress calculation', () => {
      const mockWindow = {
        document: { write: vi.fn(), close: vi.fn() },
        focus: vi.fn(),
        print: vi.fn()
      };
      
      vi.spyOn(window, 'open').mockReturnValue(mockWindow);

      wrapper.vm.exportToPDF();

      const htmlContent = mockWindow.document.write.mock.calls[0][0];
      // Payment progress should be 60% (600/1000 * 100)
      expect(htmlContent).toContain('60.0% Paid');
    });

    it('should generate correct status text based on progress', () => {
      const mockWindow = {
        document: { write: vi.fn(), close: vi.fn() },
        focus: vi.fn(),
        print: vi.fn()
      };
      
      vi.spyOn(window, 'open').mockReturnValue(mockWindow);

      // Test different progress levels
      wrapper.vm.progress = 95;
      wrapper.vm.exportToPDF();
      let htmlContent = mockWindow.document.write.mock.calls[0][0];
      expect(htmlContent).toContain('Nearly Complete');

      wrapper.vm.progress = 75;
      wrapper.vm.exportToPDF();
      htmlContent = mockWindow.document.write.mock.calls[1][0];
      expect(htmlContent).toContain('Well Underway');

      wrapper.vm.progress = 50;
      wrapper.vm.exportToPDF();
      htmlContent = mockWindow.document.write.mock.calls[2][0];
      expect(htmlContent).toContain('In Progress');

      wrapper.vm.progress = 15;
      wrapper.vm.exportToPDF();
      htmlContent = mockWindow.document.write.mock.calls[3][0];
      expect(htmlContent).toContain('Getting Started');

      wrapper.vm.progress = 5;
      wrapper.vm.exportToPDF();
      htmlContent = mockWindow.document.write.mock.calls[4][0];
      expect(htmlContent).toContain('Just Started');
    });
  });

  describe('Component Lifecycle', () => {
    it('should call fetchProject on mounted', () => {
      const fetchProjectSpy = vi.spyOn(SingleProjectCard.methods, 'fetchProject').mockImplementation(() => {});
      
      mount(SingleProjectCard, {
        global: {
          mocks: {
            $route: mockRoute,
            $router: mockRouter
          }
        }
      });

      expect(fetchProjectSpy).toHaveBeenCalled();
      fetchProjectSpy.mockRestore();
    });
  });


  describe('Error Handling', () => {
    it('should handle missing project data gracefully', async () => {
      wrapper.vm.title = '';
      wrapper.vm.clientName = '';
      wrapper.vm.description = '';
      wrapper.vm.loaded = true;
      
      await wrapper.vm.$nextTick();

      // Component should still render without crashing
      expect(wrapper.find('.project-card').exists()).toBe(true);
    });

    it.skip('should handle undefined values in calculations', async () => {
      wrapper.vm.totalPrice = undefined;
      wrapper.vm.Amountdue = undefined;
      wrapper.vm.loaded = true;
      
      await wrapper.vm.$nextTick();

      // Should not crash when displaying financial info
      expect(wrapper.find('.project-card').exists()).toBe(true);
    });
  });

  describe('Progress Slider Interaction', () => {
    beforeEach(async () => {
      wrapper.vm.loaded = true;
      await wrapper.vm.$nextTick();
    });

    it('should handle slider input events', async () => {
      const slider = wrapper.find('input[type="range"]');
      
      // Simulate different slider values
      await slider.setValue(25);
      expect(wrapper.vm.progress).toBe(25);

      await slider.setValue(90);
      expect(wrapper.vm.progress).toBe(90);
    });

    it('should update progress display when slider changes', async () => {
      const slider = wrapper.find('input[type="range"]');
      
      await slider.setValue(80);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.find('.progress-display').text()).toBe('80%');
    });
  });
});