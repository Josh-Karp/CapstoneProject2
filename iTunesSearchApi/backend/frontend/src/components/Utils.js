module.exports = {
    removeWhiteSpace: function (str) {
        str = str.replace(/\s+/g, '+');

        return str;
    }
}