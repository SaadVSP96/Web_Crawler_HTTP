const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
    };
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1],
    ];
    const actual = sortPages(input)
    expect(actual).toEqual(expected);
});

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 2,
        'https://wagslane.dev/path3': 7,
        'https://wagslane.dev/path4': 9,
    };
    const expected = [
        ['https://wagslane.dev/path4', 9],
        ['https://wagslane.dev/path3', 7],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev/path', 1],
    ];
    const actual = sortPages(input)
    expect(actual).toEqual(expected);
});

