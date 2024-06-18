import { test, expect } from '@jest/globals';
import { normalizeURL } from './crawl.js';

test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles no trailing hash', () => {
    const input = 'https://blog.boot.dev/path';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL strips trailing hash', () => {
    const input = 'http://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles mixed case', () => {
    const input = 'https://Blog.boot.Dev/PaTh/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles query parameters', () => {
    const input = 'https://blog.boot.dev/path?query=123';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});
  
  test('normalizeURL handles different protocols', () => {
    let input = 'http://blog.boot.dev/path';
    let expected = 'blog.boot.dev/path';
    let actual = normalizeURL(input);
    expect(actual).toEqual(expected);
  
    input = 'https://blog.boot.dev/path';
    expected = 'blog.boot.dev/path';
    actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});
