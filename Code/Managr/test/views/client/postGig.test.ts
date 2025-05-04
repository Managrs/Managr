// manageGigs.test.ts
import { mount} from '@vue/test-utils';
import { describe, it , expect} from 'vitest';
import PostGig from '../../../src/views/client/postGig.vue';



describe('PostGig', () => {
  it.skip('renders the form structure', () => {
    const wrapper = mount(PostGig)
    
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('section.post-page').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input').length).toBeGreaterThan(0)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
})