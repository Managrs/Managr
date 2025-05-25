import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import editProfile from '../../src/views/editProfile.vue';
import { useUserStore } from '../../src/stores/userStore';

// Mock fetch globally
global.fetch = vi.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
global.URL.revokeObjectURL = vi.fn();

// Mock FileReader
global.FileReader = vi.fn(() => ({
  readAsDataURL: vi.fn(function() {
    this.onload();
  }),
  result: 'data:image/png;base64,mockbase64string'
}));

// Mock import.meta.env
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

describe('editProfile Component', () => {
  let wrapper;
  let userStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
    userStore.email = 'test@example.com';
    
    wrapper = mount(editProfile);
  });

  afterEach(() => {
    vi.clearAllMocks();
    wrapper?.unmount();
  });

  it('renders the component correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Update Your Profile');
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    expect(wrapper.find('p').text()).toBe('Upload your profile here.');
  });

  it('shows file input when no image is selected', () => {
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    expect(wrapper.find('.image-preview').exists()).toBe(false);
  });

 
  it('does not process file upload if no file is selected', async () => {
    const input = wrapper.find('input[type="file"]');
    
    // Mock empty file input
    Object.defineProperty(input.element, 'files', {
      value: [],
      writable: false,
    });

    await input.trigger('change');

    expect(wrapper.vm.selectedFile).toBe(null);
    expect(wrapper.vm.imageSrc).toBe(null);
  });
});