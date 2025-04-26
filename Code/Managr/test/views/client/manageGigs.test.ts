// manageGigs.test.ts
import { mount } from '@vue/test-utils';
import { describe, it , expect} from 'vitest';
import manageGigs from '../../../src/views/client/manageGigs.vue';

describe('manageGigs', () => {
  it('renders basic structure', () => {
    const wrapper = mount(manageGigs)
    
    // Check main sections exist
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('section.manage-requests').exists()).toBe(true)
    
    // Check for at least one router link
    expect(wrapper.findAll('router-link').length).toBeGreaterThan(0)
    
    // Check request box exists
    expect(wrapper.find('.request-box').exists()).toBe(true)
  })
})