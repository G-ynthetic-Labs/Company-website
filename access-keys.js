const ACCESS_KEYS = {
    // Legacy keys (for dev testing)
    "GRANT-READY-2026": 1,
    "PATENT-EXAMINER": 2,
    "CITY-SECURED-V1": 3,
    "ADMIN-OVERRIDE": 3,
    "MASTER-KEY": 3, // Added master key
    // Investor deck access keys
    "INVESTOR-2026": 1,       // General investor link
    "SEED-ROUND-2026": 1,     // Alternative shareable key
    "ANGEL-NETWORK-2026": 1,  // Angel investor network specific
};

function decodeSecureKey(key) {
    // Format: GYN-[TIER]-[ENCODED_PAYLOAD]
    if (!key.startsWith("GYN-")) return null;

    try {
        const parts = key.split("-");
        if (parts.length < 3) return null;

        const tier = parseInt(parts[1]);
        // Join remaining parts in case there are hyphens in the base64
        let encoded = parts.slice(2).join("-");

        // Base64 decode (padding is already included by Python generator)
        const decoded = atob(encoded); // recipient|tier|expiry
        const [recipient, tierFromPayload, expiry] = decoded.split("|");

        return {
            recipient,
            tier: parseInt(tierFromPayload),
            expiry: parseInt(expiry)
        };
    } catch (e) {
        console.error("Key decode error:", e);
        return null;
    }
}

function isLevelUnlocked(key, level) {
    if (level === 0) return true; // Public is always unlocked
    if (!key) return false;

    const normalizedKey = key.toUpperCase();

    // MASTER-KEY bypasses all checks
    if (normalizedKey === "MASTER-KEY") return true;

    // Check secure dynamic key
    const secureKey = decodeSecureKey(key);
    if (secureKey) {
        const now = Math.floor(Date.now() / 1000);
        if (now > secureKey.expiry) return false; // Expired
        return secureKey.tier >= level;
    }

    // Fallback to legacy static keys
    const maxTier = ACCESS_KEYS[normalizedKey] || 0;
    return maxTier >= level;
}
