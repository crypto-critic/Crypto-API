const params = {
    LAST_POW_BLOCK: 238,
    RAMP_TO_BLOCK: 960,
    LAST_SEESAW_BLOCK: 200000
};

const nTargetTimespan = 60; // 1.5 minutes (90 seconds)

const blocksPerDay = (24 * 60 * 60) / nTargetTimespan; // 960

const blocksPerWeek = blocksPerDay * 7; // 6720

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 29220

const blocksPerYear = blocksPerDay * 365.25; // 350640

const colateral = 1000.0;

const getMNBlocksPerDay = (mns) => {
    return blocksPerDay / mns;
};
const totalSupply = 36000000;
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
    const ret = 1;
    return ret;
};

const getSubsidy = (nHeight = 0) => {
    const COIN = 1;
    if (nHeight <= params.LAST_POW_BLOCK && nHeight >= 1) {
		nSubsidy = 1600 * COIN;
	}
	else if (nHeight <= 10000 && nHeight > params.LAST_POW_BLOCK) {
		nSubsidy = 0.45 * COIN;
	}
	else if (nHeight <= 20000 && nHeight > 10000) {
		nSubsidy = 0.8 * COIN;
	}
	else if (nHeight <= 30000 && nHeight > 20000) {
		nSubsidy = 1.3 * COIN;
	}
	else if (nHeight <= 40000 && nHeight > 30000) {
		nSubsidy = 1.85 * COIN;
	}
	else if (nHeight <= 50000 && nHeight > 40000) {
		nSubsidy = 2.2 * COIN;
	}
	else if (nHeight <= 60000 && nHeight > 50000) {
		nSubsidy = 2.8 * COIN;
	}
	else if (nHeight <= 70000 && nHeight > 60000) {
		nSubsidy = 3.4 * COIN;
	}
	else if (nHeight <= 80000 && nHeight > 70000) {
		nSubsidy = 3.9 * COIN;
	}
	else if (nHeight <= 90000 && nHeight > 80000) {
		nSubsidy = 4.45 * COIN;
	}
	else if (nHeight <= 100000 && nHeight > 90000) {
		nSubsidy = 4.75 * COIN;
	}
	else if (nHeight <= 110000 && nHeight > 100000) {
		nSubsidy = 4.95 * COIN;
	}
	else if (nHeight <= 120000 && nHeight > 110000) {
		nSubsidy = 5.45 * COIN;
	}
	else if (nHeight <= 130000 && nHeight > 120000) {
		nSubsidy = 5.7 * COIN;
	}
	else if (nHeight <= 140000 && nHeight > 130000) {
		nSubsidy = 6.4 * COIN;
	}
	else if (nHeight <= 150000 && nHeight > 140000) {
		nSubsidy = 6.8 * COIN;
	}
	else if (nHeight <= 160000 && nHeight > 150000) {
		nSubsidy = 7.1 * COIN;
	}
	else if (nHeight <= 170000 && nHeight > 160000) {
		nSubsidy = 7.45 * COIN;
	}
	else if (nHeight <= 190000 && nHeight > 170000) {
		nSubsidy = 7.9 * COIN;
	}
	else if (nHeight <= 200000 && nHeight > 190000) {
		nSubsidy = 8 * COIN;
	}
	else if (nHeight <= 210000 && nHeight > 200000) {
		nSubsidy = 7.65 * COIN;
	}
	else if (nHeight <= 220000 && nHeight > 210000) {
		nSubsidy = 7.4 * COIN;
	}
	else if (nHeight <= 230000 && nHeight > 220000) {
		nSubsidy = 7 * COIN;
	}
	else if (nHeight <= 250000 && nHeight > 230000) {
		nSubsidy = 6.8 * COIN;
	}
	else if (nHeight <= 260000 && nHeight > 250000) {
		nSubsidy = 6.15 * COIN;
	}
	else if (nHeight <= 270000 && nHeight > 260000) {
		nSubsidy = 6 * COIN;
	}
	else if (nHeight <= 280000 && nHeight > 270000) {
		nSubsidy = 6.35 * COIN;
	}
	else if (nHeight <= 290000 && nHeight > 280000) {
		nSubsidy = 6.5 * COIN;
	}
	else if (nHeight <= 300000 && nHeight > 290000) {
		nSubsidy = 6.95 * COIN;
	}
	else if (nHeight <= 5161228 && nHeight > 300000) {
		nSubsidy = 7 * COIN;
	}
	else if (nHeight == 5161229) {
		nSubsidy = 5.25 * COIN;
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
    colateral,
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