import { createApp } from '../../app';

beforeAll(async () => {
  const app = await createApp();
});

describe('Organisation module', () => {
  describe('query > organisation', () => {
    test.todo('should fetch a single organisation');
  });

  describe('query > organisations', () => {
    test.todo('should fetch a list of organisations');
  });

  describe('mutation > createOrganisation', () => {
    test.todo('should create an organisation');
  });
});
