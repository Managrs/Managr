// app.test.ts
import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

describe('App', () => {
  it('renders without crashing', () => {
    mount(App);
  });
});