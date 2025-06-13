# Testing Guide

This document explains how to test the Shlink AI Agent for n8n.

## Test Types

### Unit Tests
**Location**: `tests/tools/`  
**Purpose**: Test individual functions in isolation  
**Run**: `npm test`

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Integration Tests
**Location**: `scripts/integration-test.ts`  
**Purpose**: Test against real Shlink server  
**Run**: `npm run test:integration`

⚠️ **Requires**: Live Shlink server with API access

### Local Testing with n8n
**Purpose**: Test the node in actual n8n workflows

```bash
# Build and link the node
npm run build
npm link

# In your n8n installation
npm link n8n-nodes-shlink-ai

# Start n8n
n8n start
```

## Setting Up Test Environment

### Prerequisites
- Node.js 18.17.0+
- Jest testing framework
- (Optional) Live Shlink server for integration tests

### Test Data Setup
For integration tests, you'll need:
1. **Shlink server** (self-hosted or cloud)
2. **API key** with appropriate permissions
3. **Test URLs** that can be safely shortened

### Environment Configuration
Create test configuration without committing secrets:

```typescript
// For integration tests only
const testConfig = {
  baseUrl: 'https://your-test-shlink.example.com',
  apiKey: 'your-test-api-key'  // Never commit this!
};
```

## Running Tests

### Quick Test Run
```bash
# Run all unit tests
npm test
```

### Comprehensive Testing
```bash
# Run linting
npm run lint

# Run tests with coverage
npm run test:coverage

# Build project
npm run build

# Run integration tests (if configured)
npm run test:integration
```

### CI/CD Testing
GitHub Actions automatically runs:
- ESLint code linting
- Jest unit tests  
- TypeScript compilation
- Tests on Node.js 18.x and 20.x

## Test Structure

### Unit Test Example
```typescript
describe('ShlinkTools', () => {
  test('should export all required functions', () => {
    expect(typeof shlinkTools.createShortUrl).toBe('function');
    // ... test all exports
  });
  
  test('should validate URL format correctly', () => {
    // Mock tests without real API calls
  });
});
```

### Test Files Organization
```
tests/
├── tools/
│   └── ShlinkTools.test.ts    # Unit tests for tool functions
├── setup.ts                   # Test configuration
└── __mocks__/                 # Mock implementations
```

## Writing Tests

### Test Guidelines
1. **Test public interfaces** - focus on exported functions
2. **Mock external dependencies** - no real API calls in unit tests
3. **Test error conditions** - verify error handling works
4. **Test edge cases** - empty inputs, invalid data, etc.
5. **Keep tests focused** - one concept per test

### Mocking Fetch Requests
```typescript
// Mock fetch for testing
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

beforeEach(() => {
  mockFetch.mockClear();
});

test('should handle API success', async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ shortCode: 'abc123' })
  });
  
  const result = await shlinkTools.createShortUrl(params, credentials);
  expect(result.success).toBe(true);
});
```

### Testing AI Response Format
Verify all responses follow the standard format:
```typescript
test('should return proper AI response format', async () => {
  const result = await shlinkTools.createShortUrl(params, credentials);
  
  expect(result).toHaveProperty('success');
  expect(result).toHaveProperty('operation');
  expect(result).toHaveProperty('data');
  expect(result).toHaveProperty('metadata');
  expect(result.metadata).toHaveProperty('human_summary');
  expect(result.metadata).toHaveProperty('actionable_fields');
  expect(result.metadata).toHaveProperty('next_possible_actions');
});
```

## Integration Testing

### Setup Requirements
1. **Live Shlink server** with API enabled
2. **Valid API key** with permissions for:
   - Creating short URLs
   - Reading URL details
   - Listing URLs
   - Getting visit statistics
   - Editing URLs
   - Deleting URLs

### Integration Test Process
```bash
# Configure test credentials (DO NOT COMMIT)
export SHLINK_BASE_URL="https://your-shlink.example.com"
export SHLINK_API_KEY="your-api-key"

# Run integration tests
npm run test:integration
```

### Test Cleanup
Integration tests should:
- Create test URLs with recognizable patterns
- Clean up created URLs after testing
- Use test-specific tags for identification
- Avoid interfering with production data

## Troubleshooting Tests

### Common Issues

**Tests fail with "fetch is not defined"**
- Solution: Tests need fetch mocking or polyfill

**TypeScript compilation errors**
- Solution: Run `npm run build` to check types
- Fix type errors before running tests

**Integration tests fail**
- Check Shlink server accessibility
- Verify API key permissions
- Confirm network connectivity

**CI tests pass but local fail**
- Check Node.js version compatibility
- Verify all dependencies installed
- Clear `node_modules` and reinstall

### Debug Mode
```bash
# Run tests with debug output
npm test -- --verbose

# Run specific test file
npm test -- ShlinkTools.test.ts

# Run tests matching pattern
npm test -- --grep "createShortUrl"
```

## Performance Testing

### Response Time Expectations
- **API calls**: < 5 seconds under normal conditions
- **Input validation**: < 100ms
- **Unit tests**: < 1 second total
- **Integration tests**: < 30 seconds total

### Load Testing
For production deployments:
- Test with multiple concurrent requests
- Verify rate limiting handling
- Monitor memory usage
- Test error recovery

## Continuous Integration

### GitHub Actions Workflow
Automatically runs on:
- Push to main branch
- Pull request creation
- Pull request updates

### CI Test Matrix
- **Node.js 18.x**: LTS version
- **Node.js 20.x**: Current stable
- **Operating System**: Ubuntu Linux
- **Test Coverage**: Unit tests only

### Branch Protection
- All tests must pass before merge
- Code coverage requirements
- Linting must pass
- Build must succeed

## Contributing Test Improvements

### Adding New Tests
1. Follow existing patterns
2. Mock external dependencies
3. Test both success and error cases
4. Update this documentation
5. Ensure tests pass in CI

### Test Coverage Goals
- **Functions**: 90%+ coverage
- **Lines**: 80%+ coverage
- **Branches**: 75%+ coverage
- **Critical paths**: 100% coverage

### Testing Best Practices
- Write tests before fixing bugs
- Test the interface, not implementation
- Use descriptive test names
- Keep tests simple and focused
- Avoid testing third-party code
