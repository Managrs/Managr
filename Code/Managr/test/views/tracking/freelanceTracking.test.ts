import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import freelanceTrack from '../../../src/views/tracking/freelanceTracking.vue';

// Mock router
const mockRouter = {
  go: vi.fn()
};

// Mock window methods
const mockWindow = {
  open: vi.fn(),
  focus: vi.fn(),
  print: vi.fn(),
  document: {
    write: vi.fn(),
    close: vi.fn()
  }
};

describe('FreelanceTrack', () => {
  let wrapper;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock window.open to return our mock window
    global.window.open = vi.fn().mockReturnValue(mockWindow);
    global.alert = vi.fn();
    global.console.log = vi.fn();

    wrapper = mount(freelanceTrack, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
  });

  // Basic rendering tests
  it('renders component correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Project Dashboard');
    expect(wrapper.find('.dashboard-header p').text()).toBe('Track your freelance projects and tasks');
  });

  it('renders all projects', () => {
    const projectCards = wrapper.findAll('.project-card');
    expect(projectCards).toHaveLength(3);
  });

  it('displays project information correctly', () => {
    const firstProject = wrapper.find('.project-card');
    expect(firstProject.find('h2').text()).toBe('E-commerce Website Development');
    expect(firstProject.find('dd').text()).toBe('Tech Solutions Inc.');
    expect(firstProject.find('.price').text()).toBe('$2500.00');
  });

  // Method tests
  it('goBack calls router.go(-1)', () => {
    wrapper.vm.goBack();
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('formatDate formats date correctly', () => {
    const result = wrapper.vm.formatDate('2024-06-15');
    expect(result).toBe('June 15, 2024');
  });

  // Progress update tests
  it('updateProgress updates project progress', () => {
    const initialProgress = wrapper.vm.projects[0].progress;
    wrapper.vm.updateProgress(1, '75');
    
    expect(wrapper.vm.projects[0].progress).toBe(75);
    expect(wrapper.vm.projects[0].progress).not.toBe(initialProgress);
  });

  it('updateProgress handles invalid project ID gracefully', () => {
    const originalProjects = [...wrapper.vm.projects];
    wrapper.vm.updateProgress(999, '50');
    
    expect(wrapper.vm.projects).toEqual(originalProjects);
  });

  // Payment confirmation tests
  it('confirmPayment processes unconfirmed payments', () => {
    const project = wrapper.vm.projects[0]; // Has $1000 paid, $1000 confirmed
    const initialConfirmed = project.paymentsConfirmed;
    
    // Simulate new payment
    project.paidAmount = 1500;
    
    wrapper.vm.confirmPayment(1);
    
    expect(project.paymentsConfirmed).toBe(1500);
    expect(global.alert).toHaveBeenCalledWith('Payment of $500.00 confirmed successfully!');
  });

  it('confirmPayment marks project as fully paid when appropriate', () => {
    const project = wrapper.vm.projects[0];
    project.paidAmount = 2500; // Full amount
    project.paymentsConfirmed = 1000;
    
    wrapper.vm.confirmPayment(1);
    
    expect(project.paymentReceived).toBe(true);
    expect(project.paymentsConfirmed).toBe(2500);
  });

  it('confirmPayment does nothing when no new payments', () => {
    const project = wrapper.vm.projects[0];
    const initialConfirmed = project.paymentsConfirmed;
    
    wrapper.vm.confirmPayment(1);
    
    expect(project.paymentsConfirmed).toBe(initialConfirmed);
    expect(global.alert).not.toHaveBeenCalled();
  });

  it('confirmPayment handles invalid project ID', () => {
    wrapper.vm.confirmPayment(999);
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Payment status helper methods
  it('isPaymentFullyConfirmed returns correct status', () => {
    const fullyPaidProject = wrapper.vm.projects[2]; // Brand Identity - fully paid
    const partiallyPaidProject = wrapper.vm.projects[0]; // E-commerce - partial
    
    expect(wrapper.vm.isPaymentFullyConfirmed(fullyPaidProject)).toBe(true);
    expect(wrapper.vm.isPaymentFullyConfirmed(partiallyPaidProject)).toBe(false);
  });

  it.skip('getPaymentButtonClass returns correct CSS classes', () => {
    const projects = wrapper.vm.projects;
    
    // Fully confirmed project
    expect(wrapper.vm.getPaymentButtonClass(projects[2])).toBe('payment-confirmed-complete');
    
    // Project with unconfirmed payment
    projects[0].paidAmount = 1500; // More than confirmed
    expect(wrapper.vm.getPaymentButtonClass(projects[0])).toBe('payment-pending-confirmation');
    
    // Project waiting for payment
    expect(wrapper.vm.getPaymentButtonClass(projects[1])).toBe('payment-waiting');
  });

  it.skip('getPaymentButtonText returns correct text', () => {
    const projects = wrapper.vm.projects;
    
    // Fully confirmed
    expect(wrapper.vm.getPaymentButtonText(projects[2])).toBe('✓ All Payments Confirmed');
    
    // Pending confirmation
    projects[0].paidAmount = 1500;
    expect(wrapper.vm.getPaymentButtonText(projects[0])).toBe('Confirm Payment ($500.00)');
    
    // Waiting for payment
    expect(wrapper.vm.getPaymentButtonText(projects[1])).toBe('Waiting for Payment');
  });

  it.skip('getPaymentStatusMessage returns correct messages', () => {
    const projects = wrapper.vm.projects;
    
    // Fully confirmed
    expect(wrapper.vm.getPaymentStatusMessage(projects[2]))
      .toBe('All payments have been received and confirmed.');
    
    // Has unconfirmed payment
    projects[0].paidAmount = 1500;
    expect(wrapper.vm.getPaymentStatusMessage(projects[0]))
      .toBe('$500.00 payment received, awaiting your confirmation.');
    
    // Waiting for payment
    expect(wrapper.vm.getPaymentStatusMessage(projects[1]))
      .toBe('Waiting for $1200.00 payment from client.');
    
    // Edge case: no pending payments but not fully paid
    const testProject = {
      totalPrice: 1000,
      paidAmount: 1000,
      paymentsConfirmed: 1000
    };
    expect(wrapper.vm.getPaymentStatusMessage(testProject))
      .toBe('All payments have been received and confirmed.');
  });

  // Save and export functionality
  it('saveProject logs and shows alert', () => {
    wrapper.vm.saveProject(1);
    expect(console.log).toHaveBeenCalledWith('Saving project 1');
    expect(global.alert).toHaveBeenCalledWith('Project saved successfully!');
  });

  it('exportToPDF calls generatePDF with correct project', () => {
    const generatePDFSpy = vi.spyOn(wrapper.vm, 'generatePDF');
    wrapper.vm.exportToPDF(1);
    expect(generatePDFSpy).toHaveBeenCalledWith(wrapper.vm.projects[0]);
  });

  it('exportToPDF handles invalid project ID', () => {
    const generatePDFSpy = vi.spyOn(wrapper.vm, 'generatePDF');
    wrapper.vm.exportToPDF(999);
    expect(generatePDFSpy).not.toHaveBeenCalled();
  });

  it('generatePDF creates and prints PDF window', () => {
    const project = wrapper.vm.projects[0];
    wrapper.vm.generatePDF(project);

    expect(global.window.open).toHaveBeenCalledWith('', '_blank');
    expect(mockWindow.document.write).toHaveBeenCalled();
    expect(mockWindow.document.close).toHaveBeenCalled();
    expect(mockWindow.focus).toHaveBeenCalled();
    
    // Check that PDF content includes project details
    const pdfContent = mockWindow.document.write.mock.calls[0][0];
    expect(pdfContent).toContain(project.title);
    expect(pdfContent).toContain(project.client);
    expect(pdfContent).toContain(`${project.progress}%`);
  });

  // UI interaction tests
  it('back button triggers goBack', async () => {
    const backButton = wrapper.find('.secondary-btn');
    await backButton.trigger('click');
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('progress slider updates on input', async () => {
    const progressSlider = wrapper.find('.progress-slider');
    const updateProgressSpy = vi.spyOn(wrapper.vm, 'updateProgress');
    
    await progressSlider.setValue('80');
    await progressSlider.trigger('input');
    
    expect(updateProgressSpy).toHaveBeenCalled();
  });

  it('payment button shows correct disabled state', async () => {
    const fullyPaidProject = wrapper.vm.projects[2];
    await wrapper.vm.$nextTick();
    
    // Find the payment button for the fully paid project
    const paymentButtons = wrapper.findAll('.payment-confirm-btn');
    const fullyPaidButton = paymentButtons[2]; // Third project (index 2)
    
    expect(fullyPaidButton.attributes('disabled')).toBeDefined();
  });

  it('save and export buttons trigger correct methods', async () => {
    const saveProjectSpy = vi.spyOn(wrapper.vm, 'saveProject');
    const exportToPDFSpy = vi.spyOn(wrapper.vm, 'exportToPDF');
    
    const saveButton = wrapper.find('.save-btn');
    const exportButton = wrapper.find('.export-btn');
    
    await saveButton.trigger('click');
    await exportButton.trigger('click');
    
    expect(saveProjectSpy).toHaveBeenCalled();
    expect(exportToPDFSpy).toHaveBeenCalled();
  });

  // Data calculations
  it('calculates remaining amount correctly', () => {
    const project = wrapper.vm.projects[0];
    const expectedRemaining = project.totalPrice - project.paidAmount;
    
    const remainingElement = wrapper.find('.remaining-amount');
    expect(remainingElement.text()).toBe(`$${expectedRemaining.toFixed(2)}`);
  });

  it('displays progress percentage correctly', () => {
    const project = wrapper.vm.projects[0];
    const progressDisplay = wrapper.find('.progress-display');
    expect(progressDisplay.text()).toBe(`${project.progress}%`);
  });

  // Edge cases and error handling
  it('handles progress update with string input correctly', () => {
    wrapper.vm.updateProgress(1, '85');
    expect(wrapper.vm.projects[0].progress).toBe(85);
    expect(typeof wrapper.vm.projects[0].progress).toBe('number');
  });

  it('handles date formatting edge cases', () => {
    expect(wrapper.vm.formatDate('2024-01-01')).toBe('January 1, 2024');
    expect(wrapper.vm.formatDate('2024-12-31')).toBe('December 31, 2024');
  });

  // Component state tests
  it('maintains correct initial data structure', () => {
    expect(wrapper.vm.projects).toHaveLength(3);
    expect(wrapper.vm.projects[0]).toHaveProperty('id');
    expect(wrapper.vm.projects[0]).toHaveProperty('title');
    expect(wrapper.vm.projects[0]).toHaveProperty('client');
    expect(wrapper.vm.projects[0]).toHaveProperty('progress');
    expect(wrapper.vm.projects[0]).toHaveProperty('paymentsConfirmed');
  });
});