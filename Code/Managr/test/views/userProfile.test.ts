import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userProfile from '../../src/views/userProfile.vue'

// ✅ Mock the Pinia store used by the component
vi.mock('../../src/stores/userStore', () => ({
  useUserStore: () => ({
    name: 'Dawid Pietrasiak',
    email: 'dawid@example.com',
    avatar: 'https://example.com/avatar.jpg',
    clearUser: vi.fn()
  }),
}))

// ✅ Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
  getAuth: vi.fn()
}))

// ✅ Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
}))

describe('userProfile', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(userProfile)
  })

  it('renders user name and logout button', () => {
    expect(wrapper.text()).toContain('Dawid Pietrasiak')
    expect(wrapper.find('button').text()).toBe('Logout')
  })

 it.skip('hides sidebar on mouseleave and shows it on mouseenter', async () => {
  const sidebar = wrapper.find('.sidebar')

  // Trigger mouseleave: sidebar should disappear (v-if=false)
  await sidebar.trigger('mouseleave')
  expect(wrapper.find('.sidebar').exists()).toBe(false)

  // Cast to access component methods
  const vm = wrapper.vm as unknown as {
    openSidebar: () => void
  }

  // Trigger mouseenter to open it again
  vm.openSidebar()
  await wrapper.vm.$nextTick()
  expect(wrapper.find('.sidebar').exists()).toBe(true)
})


  it('calls logout function when button is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.findComponent(userProfile).vm.userStore.clearUser).toHaveBeenCalled()
  })
})
