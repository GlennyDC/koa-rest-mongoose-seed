import request from 'supertest';

import { createApp } from '../../app';

let api: any;

beforeAll(async () => {
  const app = await createApp();
  api = request(app.callback());
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
