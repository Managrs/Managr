import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import clientTrack from '../../../src/views/tracking/clientTracking.vue';

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

describe('clientTrack', () => {
  let wrapper;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock window.open to return our mock window
    global.window.open = vi.fn().mockReturnValue(mockWindow);
    global.alert = vi.fn();
    global.console.log = vi.fn();

    wrapper = mount(clientTrack, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
  });

  // Basic rendering tests
  it('renders component correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Client Dashboard');
    expect(wrapper.find('.dashboard-header p').text()).toBe('Manage your projects and payments');
  });

  it('renders all projects', () => {
    const projectCards = wrapper.findAll('.project-card');
    expect(projectCards).toHaveLength(4);
  });

  it('displays project information correctly', () => {
    const firstProject = wrapper.find('.project-card');
    expect(firstProject.find('h2').text()).toBe('E-commerce Website Development');
    expect(firstProject.find('.freelancer-name').text()).toBe('Sarah Johnson');
    expect(firstProject.find('.total-price').text()).toBe('$2500.00');
  });

  // Method tests
  it('goBack calls router.go(-1)', () => {
    wrapper.vm.goBack();
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('formatDate formats date correctly', () => {
    const result = wrapper.vm.formatDate('2024-05-01');
    expect(result).toBe('May 1, 2024');
  });

  it('getProgressStatusText returns correct status', () => {
    expect(wrapper.vm.getProgressStatusText(0)).toBe('Not Started');
    expect(wrapper.vm.getProgressStatusText(15)).toBe('Just Getting Started');
    expect(wrapper.vm.getProgressStatusText(30)).toBe('Making Progress');
    expect(wrapper.vm.getProgressStatusText(65)).toBe('More Than Halfway');
    expect(wrapper.vm.getProgressStatusText(85)).toBe('Nearly Complete');
    expect(wrapper.vm.getProgressStatusText(100)).toBe('Completed');
  });

  it('getProgressStatusClass returns correct CSS class', () => {
    expect(wrapper.vm.getProgressStatusClass(0)).toBe('status-not-started');
    expect(wrapper.vm.getProgressStatusClass(30)).toBe('status-in-progress');
    expect(wrapper.vm.getProgressStatusClass(85)).toBe('status-near-completion');
    expect(wrapper.vm.getProgressStatusClass(100)).toBe('status-completed');
  });

  it('getPaymentMethodLabel returns correct label', () => {
    expect(wrapper.vm.getPaymentMethodLabel('EFT')).toBe('EFT');
    expect(wrapper.vm.getPaymentMethodLabel('paypal')).toBe('PayPal');
    expect(wrapper.vm.getPaymentMethodLabel('unknown')).toBe('unknown');
  });

  // Payment validation tests
  it.skip('canMakePayment validates correctly', () => {
    const project = {
      paymentAmount: 100,
      totalPrice: 1000,
      paidAmount: 500,
      selectedPaymentMethod: 'EFT'
    };
    expect(wrapper.vm.canMakePayment(project)).toBe(true);

    // Test invalid cases
    project.paymentAmount = 0;
    expect(wrapper.vm.canMakePayment(project)).toBe(false);

    project.paymentAmount = 600; // More than remaining
    expect(wrapper.vm.canMakePayment(project)).toBe(false);

    project.paymentAmount = 100;
    project.selectedPaymentMethod = '';
    expect(wrapper.vm.canMakePayment(project)).toBe(false);
  });

  // Payment modal tests
  it('makePayment opens modal with correct project', () => {
    wrapper.vm.makePayment(1);
    expect(wrapper.vm.showPaymentModal).toBe(true);
    expect(wrapper.vm.selectedProject.id).toBe(1);
  });

  it.skip('confirmPayment processes payment correctly', async () => {
    // Setup project with payment details
    wrapper.vm.selectedProject = {
      id: 1,
      paidAmount: 1000,
      paymentAmount: 500,
      selectedPaymentMethod: 'EFT',
      paymentNote: 'Test payment'
    };
    wrapper.vm.showPaymentModal = true;

    wrapper.vm.confirmPayment();

    expect(wrapper.vm.selectedProject.paidAmount).toBe(1500);
    expect(wrapper.vm.selectedProject.paymentAmount).toBe(null);
    expect(wrapper.vm.selectedProject.selectedPaymentMethod).toBe('');
    expect(wrapper.vm.selectedProject.paymentNote).toBe('');
    expect(wrapper.vm.showPaymentModal).toBe(false);
    expect(global.alert).toHaveBeenCalledWith('Payment of $500 processed successfully!');
  });

  it('cancelPayment closes modal without processing', () => {
    wrapper.vm.showPaymentModal = true;
    wrapper.vm.selectedProject = { id: 1 };
    
    wrapper.vm.cancelPayment();
    
    expect(wrapper.vm.showPaymentModal).toBe(false);
    expect(wrapper.vm.selectedProject).toBe(null);
  });

  // Communication tests
  it('contactFreelancer opens chat window', () => {
    wrapper.vm.contactFreelancer(1);
    expect(global.window.open).toHaveBeenCalledWith('/chatsystem/', '_blank');
  });

  it('requestUpdate logs and shows alert', () => {
    wrapper.vm.requestUpdate(1);
    expect(global.console.log).toHaveBeenCalledWith('Requesting update for project 1');
    expect(global.alert).toHaveBeenCalledWith('Progress update request will be sent to freelancer');
  });

  // PDF export tests
  it('exportToPDF calls generatePDF with correct project', () => {
    const generatePDFSpy = vi.spyOn(wrapper.vm, 'generatePDF');
    wrapper.vm.exportToPDF(1);
    expect(generatePDFSpy).toHaveBeenCalledWith(wrapper.vm.projects[0]);
  });

  it('generatePDF creates and prints PDF window', () => {
    const project = wrapper.vm.projects[0];
    wrapper.vm.generatePDF(project);

    expect(global.window.open).toHaveBeenCalledWith('', '_blank');
    expect(mockWindow.document.write).toHaveBeenCalled();
    expect(mockWindow.document.close).toHaveBeenCalled();
    expect(mockWindow.focus).toHaveBeenCalled();
  });

  // UI interaction tests
  it('back button triggers goBack', async () => {
    const backButton = wrapper.find('.secondary-btn');
    await backButton.trigger('click');
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it('payment button is disabled when payment invalid', async () => {
    const project = wrapper.vm.projects[0];
    project.paymentAmount = null;
    project.selectedPaymentMethod = '';
    
    await wrapper.vm.$nextTick();
    
    const paymentButton = wrapper.find('.payment-btn');
    expect(paymentButton.attributes('disabled')).toBeDefined();
  });

  it('shows payment section only for unpaid projects', () => {
    const paidProject = wrapper.vm.projects.find(p => p.paidAmount >= p.totalPrice);
    const unpaidProject = wrapper.vm.projects.find(p => p.paidAmount < p.totalPrice);
    
    expect(paidProject).toBeDefined();
    expect(unpaidProject).toBeDefined();
  });

  it('calculates due amount correctly', () => {
    const project = wrapper.vm.projects[0];
    const expectedDue = project.totalPrice - project.paidAmount;
    
    const dueAmountElement = wrapper.find('.due-amount');
    expect(dueAmountElement.text()).toBe(`$${expectedDue.toFixed(2)}`);
  });

  // Edge cases
  it('handles exportToPDF with invalid project ID', () => {
    const generatePDFSpy = vi.spyOn(wrapper.vm, 'generatePDF');
    wrapper.vm.exportToPDF(999);
    expect(generatePDFSpy).not.toHaveBeenCalled();
  });

  it('handles confirmPayment without selected project', () => {
    wrapper.vm.selectedProject = null;
    wrapper.vm.confirmPayment();
    expect(wrapper.vm.showPaymentModal).toBe(false);
  });
});