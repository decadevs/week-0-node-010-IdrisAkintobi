/**
 * Laundry Problem
 *
 * @param {number} noOfWashes
 * @param {number[]} cleanPile
 * @param {number[]} dirtyPile
 *
 * @returns {number}
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
    let cleanStorage = {};
    let dirtyStorage = {};
    // Create 2 Objects of Clean and Dirty socks
    for (const cleanSock of cleanPile) {
        cleanStorage[cleanSock] = cleanStorage[cleanSock] + 1 || 1;
    }
    for (const dirtySock of dirtyPile) {
        dirtyStorage[dirtySock] = dirtyStorage[dirtySock] + 1 || 1;
    }
    // Loop through to see if there's clean sock that need to be paired
    // and check if it's available in the dirty storage 
    for (const sock of Object.keys(dirtyStorage)) {
        if (noOfWashes) {
            if (cleanStorage[sock] % 2 === 1 && dirtyStorage[sock]) {
                dirtyStorage[sock] -= 1;
                cleanStorage[sock] += 1;
                noOfWashes--;
            }
        }
    }
    // Do another loop to check if there's:
    for (const sock of Object.keys(dirtyStorage)) {
        // Exact pair of dirty socks
        if (dirtyStorage[sock] % 2 === 0) {
            if (noOfWashes > dirtyStorage[sock]) {
                let washes = dirtyStorage[sock];
                cleanStorage[sock] = cleanStorage[sock] + washes || washes;
                dirtyStorage[sock] -= washes;
                noOfWashes -= washes;
            } else {
                let washes = (Math.floor(noOfWashes / 2)) * 2;
                cleanStorage[sock] = cleanStorage[sock] + washes || washes;
                dirtyStorage[sock] -= washes;
                noOfWashes -= washes;
            }
            // A pair or more
        } else if (dirtyStorage[sock] / 2 >= 1) {
            if (noOfWashes > dirtyStorage[sock]) {
                let washes = Math.floor(dirtyStorage[sock] / 2) * 2;
                cleanStorage[sock] = cleanStorage[sock] + washes || washes;
                dirtyStorage[sock] -= washes;
                noOfWashes -= washes;
            } else {
                let washes = (Math.floor(noOfWashes / 2)) * 2;
                cleanStorage[sock] = cleanStorage[sock] + washes || washes;
                dirtyStorage[sock] -= washes;
                noOfWashes -= washes;
            }
        }
    }
    let pairs = Object.values(cleanStorage);
    // Get the total number of pair by adding up each pairs
    totalPair = pairs.reduce((pairs, sock) => { return pairs + (Math.floor(sock / 2)) }, 0);
    return totalPair
}

module.exports = getMaxPairs;