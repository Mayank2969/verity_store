/**
 * Fuzzy Search Utility
 * Implements Levenshtein distance algorithm for string similarity matching
 * Supports typo-tolerant search without external dependencies
 */

/**
 * Calculate Levenshtein distance between two strings
 * Returns the minimum number of single-character edits needed to change one string into another
 */
function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;

    // Create a 2D array for dynamic programming
    const matrix: number[][] = Array(len1 + 1)
        .fill(null)
        .map(() => Array(len2 + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= len1; i++) {
        matrix[i][0] = i;
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    return matrix[len1][len2];
}

/**
 * Calculate similarity score between two strings (0 to 1)
 * 1 = identical, 0 = completely different
 */
export function calculateSimilarity(str1: string, str2: string): number {
    if (!str1 || !str2) return 0;

    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    // Exact match
    if (s1 === s2) return 1;

    // Check if one string contains the other (substring match)
    if (s1.includes(s2) || s2.includes(s1)) {
        return 0.9; // High score for substring matches
    }

    // Calculate Levenshtein distance
    const distance = levenshteinDistance(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);

    // Convert distance to similarity score
    const similarity = 1 - distance / maxLength;

    return similarity;
}

/**
 * Fuzzy match: returns true if the query matches the target with sufficient similarity
 * @param query - The search query
 * @param target - The target string to match against
 * @param threshold - Minimum similarity score (0-1), default 0.6
 */
export function fuzzyMatch(
    query: string,
    target: string,
    threshold: number = 0.6
): boolean {
    if (!query || !target) return false;

    const similarity = calculateSimilarity(query, target);
    return similarity >= threshold;
}

/**
 * Search for a query in multiple target strings
 * Returns true if any target matches the query
 */
export function fuzzySearchMultiple(
    query: string,
    targets: string[],
    threshold: number = 0.6
): boolean {
    if (!query || !targets || targets.length === 0) return false;

    return targets.some((target) => fuzzyMatch(query, target, threshold));
}
