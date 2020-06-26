const Utils = require('../components/Utils');

const query = "Test query"

test('removes white space from string', () => {
    expect(Utils.removeWhiteSpace(query)).toBe("Test+query");
});