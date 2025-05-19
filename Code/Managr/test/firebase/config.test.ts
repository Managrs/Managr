import { describe, it, expect, vi } from 'vitest'

// Mock Firebase SDKs
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}))
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => 'mocked-auth-object'),
}))

// Now import your config file — this will trigger the mocked initializeApp
import { auth } from '../../src/firebase/config'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

describe('Firebase config', () => {
  it('initializes Firebase and gets auth', () => {
    expect(initializeApp).toHaveBeenCalledOnce()
    expect(getAuth).toHaveBeenCalledOnce()
    expect(auth).toBe('mocked-auth-object')
  })
})
