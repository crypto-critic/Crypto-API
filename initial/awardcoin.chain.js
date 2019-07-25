const params = {
    LAST_POW_BLOCK: 200,
    RAMP_TO_BLOCK: 960,
    LAST_SEESAW_BLOCK: 200000
};

const nTargetTimespan = 60; // 1.5 minutes (90 seconds)

const blocksPerDay = (24 * 60 * 60) / nTargetTimespan; // 960

const blocksPerWeek = blocksPerDay * 7; // 6720

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 29220

const blocksPerYear = blocksPerDay * 365.25; // 350640

const collateral = 10000.0;

const getMNBlocksPerDay = (mns) => {
    return blocksPerDay / mns;
};
const totalSupply = 420000000;
const getMNBlocksPerWeek = (mns) => {
    return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
    return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
    return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
    const ret = 0.98;
    return ret;
};

const getSubsidy = (nHeight = 0) => {
    const COIN = 1;
    if (nHeight == 0) {
        nSubsidy = 7950000 * COIN;
    }
    else if (nHeight < 10000 && nHeight > 0) {
        nSubsidy = 5 * COIN;
    }
    else if (nHeight <= 19999 && nHeight >= 10000) {
        nSubsidy = 7.5 * COIN;
    }
    else if (nHeight <= 29999 && nHeight >= 20000) {
        nSubsidy = 10 * COIN;
    }
    else if (nHeight <= 39999 && nHeight >= 30000) {
        nSubsidy = 12.5 * COIN;
    }
    else if (nHeight <= 49999 && nHeight >= 40000) {
        nSubsidy = 15 * COIN;
    }
    else if (nHeight <= 59999 && nHeight >= 50000) {
        nSubsidy = 17.5 * COIN;
    }
    else if (nHeight <= 69999 && nHeight >= 60000) {
        nSubsidy = 20 * COIN;
    }
    else if (nHeight <= 79999 && nHeight >= 70000) {
        nSubsidy = 22.5 * COIN;
    }
    else if (nHeight <= 89999 && nHeight >= 80000) {
        nSubsidy = 25 * COIN;
    }
    else if (nHeight <= 99999 && nHeight >= 90000) {
        nSubsidy = 27.5 * COIN;
    }
    else if (nHeight <= 109999 && nHeight >= 100000) {
        nSubsidy = 30 * COIN;
    }
    else if (nHeight <= 119999 && nHeight >= 110000) {
        nSubsidy = 32.5 * COIN;
    }
    else if (nHeight <= 129999 && nHeight >= 120000) {
        nSubsidy = 35 * COIN;
    }
    else if (nHeight <= 139999 && nHeight >= 130000) {
        nSubsidy = 37.5 * COIN;
    }
    else if (nHeight <= 149999 && nHeight >= 140000) {
        nSubsidy = 40 * COIN;
    }
    else if (nHeight <= 159999 && nHeight >= 150000) {
        nSubsidy = 42.5 * COIN;
    }
    else if (nHeight <= 169999 && nHeight >= 160000) {
        nSubsidy = 45 * COIN;
    }
    else if (nHeight <= 179999 && nHeight >= 170000) {
        nSubsidy = 47.5 * COIN;
    }
    else if (nHeight <= 189999 && nHeight >= 180000) {
        nSubsidy = 50 * COIN;
    }
    else if (nHeight <= 199999 && nHeight >= 190000) {
        nSubsidy = 52.5 * COIN;
    }
    else if (nHeight <= 209999 && nHeight >= 200000) {
        nSubsidy = 55 * COIN;
    }
    else if (nHeight <= 219999 && nHeight >= 210000) {
        nSubsidy = 57.5 * COIN;
    }
    else if (nHeight <= 229999 && nHeight >= 220000) {
        nSubsidy = 60 * COIN;
    }
    else if (nHeight <= 239999 && nHeight >= 230000) {
        nSubsidy = 62.5 * COIN;
    }
    else if (nHeight <= 249999 && nHeight >= 240000) {
        nSubsidy = 65 * COIN;
    }
    else if (nHeight <= 259999 && nHeight >= 250000) {
        nSubsidy = 67.5 * COIN;
    }
    else if (nHeight <= 269999 && nHeight >= 260000) {
        nSubsidy = 70 * COIN;
    }
    else if (nHeight <= 279999 && nHeight >= 270000) {
        nSubsidy = 69 * COIN;
    }
    else if (nHeight <= 289999 && nHeight >= 280000) {
        nSubsidy = 68 * COIN;
    }
    else if (nHeight <= 299999 && nHeight >= 290000) {
        nSubsidy = 67 * COIN;
    }
    else if (nHeight <= 309999 && nHeight >= 300000) {
        nSubsidy = 66 * COIN;
    }
    else if (nHeight <= 319999 && nHeight >= 310000) {
        nSubsidy = 65 * COIN;
    }
    else if (nHeight <= 329999 && nHeight >= 320000) {
        nSubsidy = 64 * COIN;
    }
    else if (nHeight <= 339999 && nHeight >= 330000) {
        nSubsidy = 63 * COIN;
    }
    else if (nHeight <= 349999 && nHeight >= 340000) {
        nSubsidy = 62 * COIN;
    }
    else if (nHeight <= 359999 && nHeight >= 350000) {
        nSubsidy = 61 * COIN;
    }
    else if (nHeight <= 369999 && nHeight >= 360000) {
        nSubsidy = 60 * COIN;
    }
    else if (nHeight <= 379999 && nHeight >= 370000) {
        nSubsidy = 59 * COIN;
    }
    else if (nHeight <= 389999 && nHeight >= 380000) {
        nSubsidy = 58 * COIN;
    }
    else if (nHeight <= 399999 && nHeight >= 390000) {
        nSubsidy = 57 * COIN;
    }
    else if (nHeight <= 409999 && nHeight >= 400000) {
        nSubsidy = 56 * COIN;
    }
    else if (nHeight <= 419999 && nHeight >= 410000) {
        nSubsidy = 55 * COIN;
    }
    else if (nHeight <= 429999 && nHeight >= 420000) {
        nSubsidy = 54 * COIN;
    }
    else if (nHeight <= 439999 && nHeight >= 430000) {
        nSubsidy = 53 * COIN;
    }
    else if (nHeight <= 449999 && nHeight >= 440000) {
        nSubsidy = 52 * COIN;
    }
    else if (nHeight <= 459999 && nHeight >= 450000) {
        nSubsidy = 51 * COIN;
    }
    else if (nHeight <= 469999 && nHeight >= 460000) {
        nSubsidy = 50 * COIN;
    }
    else if (nHeight <= 479999 && nHeight >= 470000) {
        nSubsidy = 49 * COIN;
    }
    else if (nHeight <= 489999 && nHeight >= 480000) {
        nSubsidy = 48 * COIN;
    }
    else if (nHeight <= 499999 && nHeight >= 490000) {
        nSubsidy = 47 * COIN;
    }
    else if (nHeight <= 509999 && nHeight >= 500000) {
        nSubsidy = 46 * COIN;
    }
    else if (nHeight <= 519999 && nHeight >= 510000) {
        nSubsidy = 45 * COIN;
    }
    else if (nHeight >= 520000) {
        nSubsidy = 40 * COIN;
    }
    else {
        nSubsidy = 0 * COIN;
    }
    return nSubsidy;
};

// const getROI = (subsidy, mns) => {
//     return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
// };

const isAddress = (s) => {
    return typeof (s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
    return !isNaN(s) || (typeof (s) === 'string');
};

const isPoS = (b) => {
    return !!b && b.height > params.LAST_POW_BLOCK; // > 182700
};

const isTX = (s) => {
    return typeof (s) === 'string' && s.length === 64;
};

/**
 * How we identify if a raw transaction is Proof Of Stake & Masternode reward
 * @param {String} rpctx The transaction hash string.
 */
const isRewardRawTransaction = (rpctx) => {
    return rpctx.vin.length == 1 &&
        rpctx.vout.length == 3 &&
        // First vout is always in this format
        rpctx.vout[0].value == 0.0 &&
        rpctx.vout[0].n == 0 &&
        rpctx.vout[0].scriptPubKey &&
        rpctx.vout[0].scriptPubKey.type == "nonstandard";

}

module.exports = {
    totalSupply,
    nTargetTimespan,
    blocksPerDay,
    blocksPerMonth,
    blocksPerWeek,
    blocksPerYear,
    collateral,
    // params,
    getMNBlocksPerDay,
    getMNBlocksPerMonth,
    getMNBlocksPerWeek,
    getMNBlocksPerYear,
    getMNSubsidy,
    getSubsidy,
    // getROI,
    isAddress,
    isBlock,
    isPoS,
    isTX,
    isRewardRawTransaction
};