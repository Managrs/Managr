import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useUserStore } from '../../src/stores/userStore'

const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  avatar: '/test.jpg',
  role: 'admin',
}

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should have default values', () => {
    const store = useUserStore()
    expect(store.name).toBe('User not found')
    expect(store.email).toBe('nouser@gmail.com')
    expect(store.avatar).toBe('/profile.jpg')
    expect(store.role).toBe('user')
  })

  it('sets user and updates localStorage', () => {
    const store = useUserStore()
    const spy = vi.spyOn(localStorage, 'setItem')
    store.setUser(mockUser)

    expect(store.name).toBe(mockUser.name)
    expect(store.email).toBe(mockUser.email)
    expect(store.avatar).toBe(mockUser.avatar)
    expect(store.role).toBe(mockUser.role)
    expect(spy).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
  })

  it('clears user and removes from localStorage', () => {
    const store = useUserStore()
    const spy = vi.spyOn(localStorage, 'removeItem')
    store.clearUser()

    expect(store.name).toBe('NO USER')
    expect(store.email).toBe('NO EMAIL')
    expect(store.avatar).toBe('/profile.jpg')
    expect(store.role).toBe('NON')
    expect(spy).toHaveBeenCalledWith('user')
  })

})
