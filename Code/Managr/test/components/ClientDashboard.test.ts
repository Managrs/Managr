import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ClientDashboard from '../../src/components/ClientDashboard.vue'; // adjust if path or filename differs

describe('FreelancerDashboard.vue', () => {
  it('renders search header', () => {
    const wrapper = mount(ClientDashboard)
    expect(wrapper.find('h2').text()).toContain('Find Trusted Freelancers')
  })

  it('renders freelancer categories', () => {
    const wrapper = mount(ClientDashboard)
    const categories = wrapper.findAll('.category-box')
    expect(categories.length).toBeGreaterThan(0)
  })

  it('shows filtered results after search', async () => {
    const wrapper = mount(ClientDashboard)

    // Set inputs
    await wrapper.find('.search-bar').setValue('Web Design')
    await wrapper.findAll('input[type="number"]')[0].setValue(800) // min
    await wrapper.findAll('input[type="number"]')[1].setValue(1000) // max

    // Trigger search
    await wrapper.find('#search-btn').trigger('click')

    // Check the results header
    expect(wrapper.find('.freelancer-results').exists()).toBe(true)

    const results = wrapper.findAll('.freelancer-profile')
    expect(results.length).toBeGreaterThan(0)

    // Optionally: validate first result name or title
    expect(results[0].text()).toContain('Web Design')
  })

})

