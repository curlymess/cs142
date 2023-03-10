var crypto = require('crypto');
/**
 * Return a salted and hashed password entry from a clear text password.
 * @param {string} clearTextPassword
 * @return {object} passwordEntry where passwordEntry is an object with two
 * string properties:
 *    salt - The salt used for the password.
 *    hash - The sha1 hash of the password and salt.
 */
function makePasswordEntry(clearTextPassword) {
    var passwordEntry = {};
    const salt = crypto.randomBytes(8).toString('hex');
    passwordEntry.salt = salt;

    // update digest
    const hash = crypto.createHash('sha1');
    hash.update(clearTextPassword + salt);
    passwordEntry.hash = hash.digest('hex');

    return passwordEntry;
}

/**
 * Return true if the specified clear text password and salt generates the
 * specified hash.
 * @param {string} hash
 * @param {string} salt
 * @param {string} clearTextPassword
 * @return {boolean}
 */
function doesPasswordMatch(hash, salt, clearTextPassword) {
    var saltPassword = clearTextPassword.concat(salt);

    const newHash = crypto.createHash('sha1');
    newHash.update(saltPassword);
    
    return newHash.digest('hex') === hash;
}

module.exports = {
    makePasswordEntry: makePasswordEntry,
    doesPasswordMatch: doesPasswordMatch
};