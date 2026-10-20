// Vitest setup: keep tests isolated from production services.
// No test may reach the live dataset; handlers receive injected mock clients
// and the read client is never called with the network (see tests/mocks).
process.env.FORM_SECRET = "test-secret-at-least-sixteen-chars";
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "testproj";
process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
delete process.env.SANITY_API_TOKEN;
