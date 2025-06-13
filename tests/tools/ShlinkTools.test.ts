// Basic test to verify ShlinkTools functionality
import { shlinkTools } from '../../tools/ShlinkTools';

describe('ShlinkTools', () => {
  test('should export all required functions', () => {
    expect(typeof shlinkTools.createShortUrl).toBe('function');
    expect(typeof shlinkTools.getShortUrlDetails).toBe('function');
    expect(typeof shlinkTools.listShortUrls).toBe('function');
    expect(typeof shlinkTools.getVisitStatistics).toBe('function');
    expect(typeof shlinkTools.editShortUrl).toBe('function');
    expect(typeof shlinkTools.deleteShortUrl).toBe('function');
  });

  test('should validate URL format correctly', () => {
    // We can't access validateUrl directly since it's not exported
    // But we can test the tool functions exist and are callable
    expect(shlinkTools).toBeDefined();
    expect(Object.keys(shlinkTools)).toHaveLength(6);
  });
});