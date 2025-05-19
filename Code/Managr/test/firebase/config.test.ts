import { vi,describe, it, expect } from 'vitest';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Mock Firebase imports
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
}));

describe('Firebase Authentication', () => {
  it('should call initializeApp when initializing Firebase', () => {
    initializeApp({
      apiKey: 'dummy-api-key',
      authDomain: 'dummy-auth-domain',
      projectId: 'dummy-project-id',
      storageBucket: 'dummy-storage-bucket',
      messagingSenderId: 'dummy-messaging-sender-id',
      appId: 'dummy-app-id',
    });

    expect(initializeApp).toHaveBeenCalled();
  });

  it('should call createUserWithEmailAndPassword with proper parameters', async () => {
    const auth = getAuth();
    const mockCreateUser = vi.fn().mockResolvedValue({ user: { email: 'test@example.com' } });
    //@ts-ignore
    createUserWithEmailAndPassword.mockImplementation(mockCreateUser);

    const email = 'test@example.com';
    const password = 'password123';

    await createUserWithEmailAndPassword(auth, email, password);

    expect(mockCreateUser).toHaveBeenCalledWith(auth, email, password);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
  });
});
