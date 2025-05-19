import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AdminDash from '../../src/components/Admin_Dash.vue'

describe('AdminDash.vue', () => {

  it('approves a user when approve button clicked', async () => {
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

  const wrapper = mount(AdminDash)
  const approveButtons = wrapper.findAll('.approve-btn')
  await approveButtons[0].trigger('click')

  expect(alertMock).toHaveBeenCalledWith('Kagiso has been approved.')

  alertMock.mockRestore()
})


  it('renders admin welcome message', () => {
    const wrapper = mount(AdminDash)
    expect(wrapper.text()).toContain("Welcome, Admin! Here's your platform overview")
  })

  it('shows correct summary numbers', () => {
    const wrapper = mount(AdminDash)
    expect(wrapper.text()).toContain('Freelancers: 0')
    expect(wrapper.text()).toContain('Projects: 0')
    expect(wrapper.text()).toContain('Pending Payments: R0')
  })

  it('renders pending users table with correct number of rows', () => {
    const wrapper = mount(AdminDash)
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3) // Kagiso, Kgaugelo, Lebo
  })

  it('renders "No freelancer data" message', () => {
    const wrapper = mount(AdminDash)
    expect(wrapper.text()).toContain('No freelancer data available.')
  })
})
