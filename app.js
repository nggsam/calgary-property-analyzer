/**
 * Calgary Property Analyzer
 * Investment property analysis with Calgary-specific defaults
 * 
 * @fileoverview Main application logic with JSDoc type annotations
 * (Ready for TypeScript conversion)
 */

// ============================================
// TYPE DEFINITIONS (JSDoc for TypeScript-like typing)
// ============================================

/**
 * @typedef {Object} PropertyInputs
 * @property {'house' | 'condo' | 'townhouse'} propertyType
 * @property {number} purchasePrice
 * @property {number} downPaymentPercent
 * @property {number} interestRate
 * @property {number} amortizationYears
 * @property {number} closingCosts
 * @property {number} monthlyRent
 * @property {number} vacancyRate
 * @property {string} neighborhood
 * @property {number} propertyTaxAnnual
 * @property {number} insuranceAnnual
 * @property {number} condoFeesMonthly
 * @property {number} maintenancePercent
 * @property {number} propertyManagementPercent
 * @property {boolean} utilitiesIncluded
 * @property {number} utilitiesCostMonthly
 */

/**
 * @typedef {Object} AnalysisResults
 * @property {number} monthlyCashFlow
 * @property {number} annualCashFlow
 * @property {number} capRate
 * @property {number} cashOnCash
 * @property {number} irr
 * @property {number} dscr
 * @property {number} breakEvenVacancy
 * @property {number} dealScore
 * @property {number} mortgagePayment
 * @property {number} totalMonthlyExpenses
 * @property {number} effectiveGrossIncome
 * @property {number} noi
 * @property {number} totalCashRequired
 */

/**
 * @typedef {Object} NeighborhoodData
 * @property {string} name
 * @property {string} slug
 * @property {number} avgRent1BR
 * @property {number} avgRent2BR
 * @property {string} area
 * @property {string} tag
 */

// ============================================
// CALGARY MARKET DATA
// ============================================

/** @type {Object.<string, NeighborhoodData>} */
const NEIGHBORHOODS = {
    'downtown-core': { name: 'Downtown Core', slug: 'downtown-core', avgRent1BR: 1997, avgRent2BR: 2500, area: 'Downtown', tag: 'Urban Core' },
    'east-village': { name: 'East Village', slug: 'east-village', avgRent1BR: 2079, avgRent2BR: 2600, area: 'Downtown', tag: 'Most Expensive' },
    'beltline': { name: 'Beltline', slug: 'beltline', avgRent1BR: 1849, avgRent2BR: 2200, area: 'Downtown', tag: 'Urban Core' },
    'mission': { name: 'Mission', slug: 'mission', avgRent1BR: 1760, avgRent2BR: 2000, area: 'Inner City', tag: 'Established' },
    'cliff-bungalow': { name: 'Cliff Bungalow', slug: 'cliff-bungalow', avgRent1BR: 2020, avgRent2BR: 2400, area: 'Inner City', tag: 'Premium' },
    'bridgeland': { name: 'Bridgeland/Riverside', slug: 'bridgeland', avgRent1BR: 1955, avgRent2BR: 2100, area: 'Inner City', tag: 'Trending' },
    'kensington': { name: 'Kensington', slug: 'kensington', avgRent1BR: 1800, avgRent2BR: 2100, area: 'Inner City', tag: 'Walkable' },
    'hillhurst': { name: 'Hillhurst', slug: 'hillhurst', avgRent1BR: 1750, avgRent2BR: 2050, area: 'Inner City', tag: 'Family-Friendly' },
    'sunnyside': { name: 'Sunnyside', slug: 'sunnyside', avgRent1BR: 1780, avgRent2BR: 2100, area: 'Inner City', tag: 'Walkable' },
    'inglewood': { name: 'Inglewood', slug: 'inglewood', avgRent1BR: 1720, avgRent2BR: 2000, area: 'Inner City', tag: 'Arts District' },
    'altadore': { name: 'Altadore', slug: 'altadore', avgRent1BR: 1862, avgRent2BR: 2200, area: 'Southwest', tag: 'Desirable' },
    'marda-loop': { name: 'Marda Loop', slug: 'marda-loop', avgRent1BR: 1820, avgRent2BR: 2150, area: 'Southwest', tag: 'Trendy' },
    'mount-royal': { name: 'Mount Royal', slug: 'mount-royal', avgRent1BR: 1645, avgRent2BR: 1950, area: 'Southwest', tag: 'Established' },
    'killarney': { name: 'Killarney', slug: 'killarney', avgRent1BR: 1680, avgRent2BR: 1950, area: 'Southwest', tag: 'Value' },
    'sage-hill': { name: 'Sage Hill', slug: 'sage-hill', avgRent1BR: 1980, avgRent2BR: 2300, area: 'Northwest', tag: 'New Development' },
    'nolan-hill': { name: 'Nolan Hill', slug: 'nolan-hill', avgRent1BR: 1449, avgRent2BR: 1700, area: 'Northwest', tag: 'Affordable' },
    'university-heights': { name: 'University Heights', slug: 'university-heights', avgRent1BR: 1720, avgRent2BR: 2000, area: 'Northwest', tag: 'Near U of C' },
    'skyview-ranch': { name: 'Skyview Ranch', slug: 'skyview-ranch', avgRent1BR: 1692, avgRent2BR: 1950, area: 'Northeast', tag: 'Growing' },
    'tuxedo-park': { name: 'Tuxedo Park', slug: 'tuxedo-park', avgRent1BR: 1504, avgRent2BR: 1750, area: 'Northeast', tag: 'Affordable' },
    'renfrew': { name: 'Renfrew', slug: 'renfrew', avgRent1BR: 1620, avgRent2BR: 1900, area: 'Northeast', tag: 'Revitalizing' },
    'mckenzie-towne': { name: 'McKenzie Towne', slug: 'mckenzie-towne', avgRent1BR: 1750, avgRent2BR: 2050, area: 'Southeast', tag: 'Community' },
    'auburn-bay': { name: 'Auburn Bay', slug: 'auburn-bay', avgRent1BR: 1720, avgRent2BR: 2000, area: 'Southeast', tag: 'Lake Community' },
    'new-brighton': { name: 'New Brighton', slug: 'new-brighton', avgRent1BR: 1680, avgRent2BR: 1950, area: 'Southeast', tag: 'Family' },
    'applewood-park': { name: 'Applewood Park', slug: 'applewood-park', avgRent1BR: 1430, avgRent2BR: 1650, area: 'Southeast', tag: 'Most Affordable' },
    'bankview': { name: 'Bankview', slug: 'bankview', avgRent1BR: 1434, avgRent2BR: 1700, area: 'Southwest', tag: 'Affordable Urban' },
    'kingsland': { name: 'Kingsland', slug: 'kingsland', avgRent1BR: 1472, avgRent2BR: 1720, area: 'Southwest', tag: 'Value' },
    'carrington': { name: 'Carrington', slug: 'carrington', avgRent1BR: 1494, avgRent2BR: 1750, area: 'Northwest', tag: 'New' }
};

/** Calgary-specific default values */
const CALGARY_DEFAULTS = {
    propertyTaxRate: 0.00618,  // 2025 combined rate (municipal + education)
    avgInsuranceAnnual: 1800,  // Landlord policy
    avgCondoFeePerSqFt: 0.50,  // Per month
    avgUtilitiesMonthly: 350,   // Gas + Electric + Water
    currentVacancyRate: 0.06,  // 6% as of 2025
    avgRent1BR: 1522,
    avgRent2BR: 1860,
    avgPropertyManagement: 0.08, // 8%
    avgMaintenance: 0.08,        // 8%
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format a number as currency
 * @param {number} value 
 * @returns {string}
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Format a number as percentage
 * @param {number} value - Value as decimal (e.g., 0.05 for 5%)
 * @param {number} decimals 
 * @returns {string}
 */
function formatPercent(value, decimals = 1) {
    return (value * 100).toFixed(decimals) + '%';
}

/**
 * Parse currency input string to number
 * @param {string} value 
 * @returns {number}
 */
function parseCurrency(value) {
    return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}

/**
 * Format number with commas
 * @param {number} value 
 * @returns {string}
 */
function formatNumber(value) {
    return new Intl.NumberFormat('en-CA').format(Math.round(value));
}

// ============================================
// FINANCIAL CALCULATIONS
// ============================================

/**
 * Calculate monthly mortgage payment
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate as decimal
 * @param {number} years - Amortization period in years
 * @returns {number}
 */
function calculateMortgagePayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;

    if (monthlyRate === 0) {
        return principal / numPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
}

/**
 * Calculate Net Operating Income (NOI)
 * @param {number} grossRent - Monthly gross rent
 * @param {number} vacancyRate - Vacancy rate as decimal
 * @param {number} operatingExpenses - Monthly operating expenses (excluding mortgage)
 * @returns {number} - Monthly NOI
 */
function calculateNOI(grossRent, vacancyRate, operatingExpenses) {
    const effectiveGrossIncome = grossRent * (1 - vacancyRate);
    return effectiveGrossIncome - operatingExpenses;
}

/**
 * Calculate Cap Rate
 * @param {number} annualNOI 
 * @param {number} propertyValue 
 * @returns {number} - Cap rate as decimal
 */
function calculateCapRate(annualNOI, propertyValue) {
    return propertyValue > 0 ? annualNOI / propertyValue : 0;
}

/**
 * Calculate Cash-on-Cash Return
 * @param {number} annualCashFlow - Annual pre-tax cash flow
 * @param {number} totalCashInvested - Down payment + closing costs
 * @returns {number} - Cash-on-cash return as decimal
 */
function calculateCashOnCash(annualCashFlow, totalCashInvested) {
    return totalCashInvested > 0 ? annualCashFlow / totalCashInvested : 0;
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * @param {number} noi - Net Operating Income (annual)
 * @param {number} annualDebtService - Annual mortgage payments
 * @returns {number}
 */
function calculateDSCR(noi, annualDebtService) {
    return annualDebtService > 0 ? noi / annualDebtService : 0;
}

/**
 * Calculate break-even vacancy rate
 * @param {number} grossRent - Monthly gross rent
 * @param {number} totalExpenses - All monthly expenses including mortgage
 * @returns {number} - Break-even vacancy rate as decimal
 */
function calculateBreakEvenVacancy(grossRent, totalExpenses) {
    return grossRent > 0 ? 1 - (totalExpenses / grossRent) : 0;
}

/**
 * Estimate 5-year IRR (simplified)
 * @param {number} initialInvestment 
 * @param {number} annualCashFlow 
 * @param {number} propertyValue 
 * @param {number} appreciationRate - Annual appreciation rate
 * @param {number} loanBalance - Remaining loan balance at end
 * @returns {number} - IRR as decimal
 */
function estimateIRR(initialInvestment, annualCashFlow, propertyValue, appreciationRate, loanBalance) {
    // Simplified IRR calculation using 5-year projection
    const years = 5;
    const futureValue = propertyValue * Math.pow(1 + appreciationRate, years);
    const sellingCosts = futureValue * 0.05; // 5% selling costs
    const netSaleProceeds = futureValue - sellingCosts - loanBalance;

    // Total returns over 5 years
    const totalCashFlows = annualCashFlow * years;
    const totalReturn = totalCashFlows + netSaleProceeds;

    // Calculate approximate IRR using CAGR formula
    const multiple = totalReturn / initialInvestment;
    const irr = Math.pow(multiple, 1 / years) - 1;

    return Math.max(0, irr);
}

/**
 * Calculate Deal Score (0-100)
 * @param {AnalysisResults} results 
 * @returns {{score: number, label: string, cashFlowScore: number, capRateScore: number, marketFitScore: number}}
 */
function calculateDealScore(results) {
    // Cash Flow Score (0-40 points)
    // Negative cash flow = 0, $500+/month = 40
    const cashFlowScore = Math.min(40, Math.max(0, (results.monthlyCashFlow / 500) * 40));

    // Cap Rate Score (0-30 points)
    // 0% = 0, 8%+ = 30
    const capRateScore = Math.min(30, Math.max(0, (results.capRate / 0.08) * 30));

    // Market Fit Score (0-30 points)
    // Based on DSCR and break-even vacancy
    let marketFitScore = 0;
    if (results.dscr >= 1.25) marketFitScore += 15;
    else if (results.dscr >= 1.0) marketFitScore += 10;
    else marketFitScore += results.dscr * 10;

    if (results.breakEvenVacancy >= 0.15) marketFitScore += 15;
    else if (results.breakEvenVacancy >= 0.10) marketFitScore += 10;
    else marketFitScore += Math.max(0, results.breakEvenVacancy * 100);

    const totalScore = Math.round(cashFlowScore + capRateScore + marketFitScore);

    let label = 'Poor Deal';
    if (totalScore >= 80) label = 'Excellent Deal';
    else if (totalScore >= 65) label = 'Good Deal';
    else if (totalScore >= 50) label = 'Fair Deal';
    else if (totalScore >= 35) label = 'Marginal';

    return {
        score: totalScore,
        label,
        cashFlowScore: Math.round((cashFlowScore / 40) * 100),
        capRateScore: Math.round((capRateScore / 30) * 100),
        marketFitScore: Math.round((marketFitScore / 30) * 100)
    };
}

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

/**
 * Perform full property analysis
 * @param {PropertyInputs} inputs 
 * @returns {AnalysisResults}
 */
function analyzeProperty(inputs) {
    // Calculate loan details
    const downPaymentAmount = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
    const loanAmount = inputs.purchasePrice - downPaymentAmount;
    const monthlyMortgage = calculateMortgagePayment(
        loanAmount,
        inputs.interestRate / 100,
        inputs.amortizationYears
    );

    // Calculate monthly operating expenses (excluding mortgage)
    const monthlyPropertyTax = inputs.propertyTaxAnnual / 12;
    const monthlyInsurance = inputs.insuranceAnnual / 12;
    const monthlyMaintenance = inputs.monthlyRent * (inputs.maintenancePercent / 100);
    const monthlyPM = inputs.monthlyRent * (inputs.propertyManagementPercent / 100);
    const monthlyCondoFees = inputs.propertyType === 'condo' ? inputs.condoFeesMonthly : 0;
    const monthlyUtilities = inputs.utilitiesIncluded ? inputs.utilitiesCostMonthly : 0;

    const monthlyOperatingExpenses = monthlyPropertyTax + monthlyInsurance +
        monthlyMaintenance + monthlyPM + monthlyCondoFees + monthlyUtilities;

    // Calculate income
    const vacancyLoss = inputs.monthlyRent * (inputs.vacancyRate / 100);
    const effectiveGrossIncome = inputs.monthlyRent - vacancyLoss;

    // Calculate NOI (monthly)
    const monthlyNOI = effectiveGrossIncome - monthlyOperatingExpenses;
    const annualNOI = monthlyNOI * 12;

    // Calculate cash flow
    const totalMonthlyExpenses = monthlyOperatingExpenses + monthlyMortgage;
    const monthlyCashFlow = effectiveGrossIncome - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;

    // Calculate investment totals
    const totalCashRequired = downPaymentAmount + inputs.closingCosts;

    // Calculate metrics
    const capRate = calculateCapRate(annualNOI, inputs.purchasePrice);
    const cashOnCash = calculateCashOnCash(annualCashFlow, totalCashRequired);
    const dscr = calculateDSCR(annualNOI, monthlyMortgage * 12);
    const breakEvenVacancy = calculateBreakEvenVacancy(inputs.monthlyRent, totalMonthlyExpenses);

    // Estimate loan balance after 5 years (simplified)
    const monthlyRate = (inputs.interestRate / 100) / 12;
    const paymentsAfter5Years = 5 * 12;
    const loanBalanceAfter5Years = loanAmount *
        (Math.pow(1 + monthlyRate, inputs.amortizationYears * 12) - Math.pow(1 + monthlyRate, paymentsAfter5Years)) /
        (Math.pow(1 + monthlyRate, inputs.amortizationYears * 12) - 1);

    // Estimate IRR with 3% annual appreciation
    const irr = estimateIRR(totalCashRequired, annualCashFlow, inputs.purchasePrice, 0.03, loanBalanceAfter5Years);

    // Calculate deal score
    const scoreResult = calculateDealScore({
        monthlyCashFlow,
        annualCashFlow,
        capRate,
        cashOnCash,
        irr,
        dscr,
        breakEvenVacancy,
        dealScore: 0,
        mortgagePayment: monthlyMortgage,
        totalMonthlyExpenses,
        effectiveGrossIncome,
        noi: monthlyNOI,
        totalCashRequired
    });

    return {
        monthlyCashFlow,
        annualCashFlow,
        capRate,
        cashOnCash,
        irr,
        dscr,
        breakEvenVacancy: Math.max(0, breakEvenVacancy),
        dealScore: scoreResult.score,
        dealScoreLabel: scoreResult.label,
        cashFlowScore: scoreResult.cashFlowScore,
        capRateScore: scoreResult.capRateScore,
        marketFitScore: scoreResult.marketFitScore,
        mortgagePayment: monthlyMortgage,
        totalMonthlyExpenses,
        effectiveGrossIncome,
        noi: monthlyNOI,
        totalCashRequired,
        downPaymentAmount,
        loanAmount,
        vacancyLoss,
        monthlyPropertyTax,
        monthlyInsurance,
        monthlyMaintenance,
        monthlyPM,
        monthlyCondoFees,
        monthlyUtilities
    };
}

// ============================================
// DOM INTERACTION & UI
// ============================================

/**
 * Get all input values from the form
 * @returns {PropertyInputs}
 */
function getInputValues() {
    return {
        propertyType: document.querySelector('.property-type-btn.active')?.dataset.type || 'house',
        purchasePrice: parseCurrency(document.getElementById('purchasePrice')?.value || '0'),
        downPaymentPercent: parseFloat(document.getElementById('downPayment')?.value || '20'),
        interestRate: parseFloat(document.getElementById('interestRate')?.value || '5.5'),
        amortizationYears: parseInt(document.getElementById('amortization')?.value || '25'),
        closingCosts: parseCurrency(document.getElementById('closingCosts')?.value || '0'),
        monthlyRent: parseCurrency(document.getElementById('monthlyRent')?.value || '0'),
        vacancyRate: parseFloat(document.getElementById('vacancyRate')?.value || '6'),
        neighborhood: document.getElementById('neighborhood')?.value || '',
        propertyTaxAnnual: parseCurrency(document.getElementById('propertyTax')?.value || '0'),
        insuranceAnnual: parseCurrency(document.getElementById('insurance')?.value || '0'),
        condoFeesMonthly: parseCurrency(document.getElementById('condoFees')?.value || '0'),
        maintenancePercent: parseFloat(document.getElementById('maintenance')?.value || '8'),
        propertyManagementPercent: parseFloat(document.getElementById('propertyManagement')?.value || '8'),
        utilitiesIncluded: document.getElementById('utilitiesIncluded')?.checked || false,
        utilitiesCostMonthly: parseCurrency(document.getElementById('utilitiesCost')?.value || '0')
    };
}

/**
 * Update the results display
 * @param {AnalysisResults} results 
 */
function updateResultsDisplay(results) {
    // Update deal score
    const scoreElement = document.getElementById('dealScore');
    const scoreLabelElement = document.getElementById('scoreLabel');
    const scoreRing = document.getElementById('scoreRing');

    if (scoreElement) scoreElement.textContent = results.dealScore;
    if (scoreLabelElement) {
        scoreLabelElement.textContent = results.dealScoreLabel;
        scoreLabelElement.className = 'score-label';
        if (results.dealScore >= 65) scoreLabelElement.style.color = 'var(--success-500)';
        else if (results.dealScore >= 50) scoreLabelElement.style.color = 'var(--warning-500)';
        else scoreLabelElement.style.color = 'var(--danger-500)';
    }

    // Update score ring (283 is the circumference)
    if (scoreRing) {
        const offset = 283 - (283 * results.dealScore / 100);
        scoreRing.style.strokeDashoffset = offset;
    }

    // Update score breakdowns
    const cashFlowBar = document.getElementById('cashFlowBar');
    const capRateBar = document.getElementById('capRateBar');
    const marketFitBar = document.getElementById('marketFitBar');

    if (cashFlowBar) cashFlowBar.style.width = results.cashFlowScore + '%';
    if (capRateBar) capRateBar.style.width = results.capRateScore + '%';
    if (marketFitBar) marketFitBar.style.width = results.marketFitScore + '%';

    // Update key metrics
    const monthlyCashFlowEl = document.getElementById('monthlyCashFlow');
    if (monthlyCashFlowEl) {
        monthlyCashFlowEl.textContent = formatCurrency(results.monthlyCashFlow);
        const card = monthlyCashFlowEl.closest('.metric-card');
        if (card) {
            card.classList.remove('positive', 'negative');
            card.classList.add(results.monthlyCashFlow >= 0 ? 'positive' : 'negative');
        }
    }

    updateElement('capRate', formatPercent(results.capRate));
    updateElement('cashOnCash', formatPercent(results.cashOnCash));
    updateElement('irr', formatPercent(results.irr));
    updateElement('dscr', results.dscr.toFixed(2) + 'x');
    updateElement('breakEven', formatPercent(results.breakEvenVacancy));

    // Update financial summary
    updateElement('grossRent', formatCurrency(getInputValues().monthlyRent));
    updateElement('vacancyPct', getInputValues().vacancyRate);
    updateElement('vacancyLoss', '-' + formatCurrency(results.vacancyLoss));
    updateElement('effectiveIncome', formatCurrency(results.effectiveGrossIncome));

    updateElement('mortgagePayment', formatCurrency(results.mortgagePayment));
    updateElement('monthlyTax', formatCurrency(results.monthlyPropertyTax));
    updateElement('monthlyInsurance', formatCurrency(results.monthlyInsurance));
    updateElement('maintenancePct', getInputValues().maintenancePercent);
    updateElement('monthlyMaintenance', formatCurrency(results.monthlyMaintenance));
    updateElement('pmPct', getInputValues().propertyManagementPercent);
    updateElement('monthlyPM', formatCurrency(results.monthlyPM));

    // Condo fees row
    const condoFeesRow = document.getElementById('condoFeesRow');
    if (condoFeesRow) {
        condoFeesRow.style.display = getInputValues().propertyType === 'condo' ? 'flex' : 'none';
    }
    updateElement('monthlyCondoFees', formatCurrency(results.monthlyCondoFees));

    // Utilities row
    const utilitiesRow = document.getElementById('utilitiesRow');
    if (utilitiesRow) {
        utilitiesRow.style.display = getInputValues().utilitiesIncluded ? 'flex' : 'none';
    }
    updateElement('monthlyUtilities', formatCurrency(results.monthlyUtilities));

    updateElement('totalExpenses', formatCurrency(results.totalMonthlyExpenses));

    // Net cash flow
    const netCashFlowEl = document.getElementById('netCashFlow');
    if (netCashFlowEl) {
        netCashFlowEl.textContent = formatCurrency(results.monthlyCashFlow);
        netCashFlowEl.style.color = results.monthlyCashFlow >= 0 ? 'var(--success-400)' : 'var(--danger-400)';
    }
    updateElement('annualCashFlow', formatCurrency(results.annualCashFlow));

    // Investment summary
    updateElement('investDownPayment', formatCurrency(results.downPaymentAmount));
    updateElement('investClosingCosts', formatCurrency(getInputValues().closingCosts));
    updateElement('totalCashRequired', formatCurrency(results.totalCashRequired));
}

/**
 * Helper to update element text content
 * @param {string} id 
 * @param {string|number} value 
 */
function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

/**
 * Update property tax based on purchase price
 */
function updatePropertyTax() {
    const price = parseCurrency(document.getElementById('purchasePrice')?.value || '0');
    const taxAmount = Math.round(price * CALGARY_DEFAULTS.propertyTaxRate);
    const taxInput = document.getElementById('propertyTax');
    if (taxInput) {
        taxInput.value = formatNumber(taxAmount);
    }
}

/**
 * Update down payment display amount
 */
function updateDownPaymentDisplay() {
    const price = parseCurrency(document.getElementById('purchasePrice')?.value || '0');
    const percent = parseFloat(document.getElementById('downPayment')?.value || '20');
    const amount = price * (percent / 100);
    updateElement('downPaymentAmount', formatCurrency(amount));
}

/**
 * Initialize the neighborhoods grid
 */
function initNeighborhoodsGrid() {
    const grid = document.getElementById('neighborhoodsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    Object.values(NEIGHBORHOODS).slice(0, 12).forEach(neighborhood => {
        const card = document.createElement('div');
        card.className = 'neighborhood-card';
        card.innerHTML = `
            <h4>${neighborhood.name}</h4>
            <div class="neighborhood-stats">
                <div class="neighborhood-stat">
                    <span class="neighborhood-stat-label">Avg 1BR</span>
                    <span class="neighborhood-stat-value">${formatCurrency(neighborhood.avgRent1BR)}</span>
                </div>
                <div class="neighborhood-stat">
                    <span class="neighborhood-stat-label">Avg 2BR</span>
                    <span class="neighborhood-stat-value">${formatCurrency(neighborhood.avgRent2BR)}</span>
                </div>
            </div>
            <span class="neighborhood-tag">${neighborhood.tag}</span>
        `;

        card.addEventListener('click', () => {
            const neighborhoodSelect = document.getElementById('neighborhood');
            if (neighborhoodSelect) {
                neighborhoodSelect.value = neighborhood.slug;
            }
            const rentInput = document.getElementById('monthlyRent');
            if (rentInput) {
                rentInput.value = formatNumber(neighborhood.avgRent1BR);
            }
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
            runAnalysis();
        });

        grid.appendChild(card);
    });
}

/**
 * Format currency inputs on blur
 */
function formatCurrencyInputs() {
    document.querySelectorAll('.currency-input').forEach(input => {
        input.addEventListener('blur', function () {
            const value = parseCurrency(this.value);
            this.value = formatNumber(value);
        });

        input.addEventListener('focus', function () {
            const value = parseCurrency(this.value);
            this.value = value || '';
        });
    });
}

/**
 * Run the analysis and update UI
 */
function runAnalysis() {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);
    updateResultsDisplay(results);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Property type buttons
    document.querySelectorAll('.property-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.property-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide condo fees row
            const condoFeeRow = document.getElementById('condoFeeRow');
            if (condoFeeRow) {
                condoFeeRow.style.display = btn.dataset.type === 'condo' ? 'grid' : 'none';
            }

            runAnalysis();
        });
    });

    // Utilities toggle
    const utilitiesToggle = document.getElementById('utilitiesIncluded');
    if (utilitiesToggle) {
        utilitiesToggle.addEventListener('change', function () {
            const utilitiesField = document.getElementById('utilitiesCostField');
            const toggleLabel = this.closest('.toggle-wrapper')?.querySelector('.toggle-label');

            if (utilitiesField) {
                utilitiesField.style.display = this.checked ? 'flex' : 'none';
            }
            if (toggleLabel) {
                toggleLabel.textContent = this.checked ? 'Landlord pays' : 'Tenant pays';
            }

            runAnalysis();
        });
    }

    // Analyze button
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', runAnalysis);
    }

    // Auto-update on input changes
    const autoUpdateInputs = [
        'purchasePrice', 'downPayment', 'interestRate', 'amortization',
        'closingCosts', 'monthlyRent', 'vacancyRate', 'propertyTax',
        'insurance', 'condoFees', 'maintenance', 'propertyManagement',
        'utilitiesCost', 'neighborhood'
    ];

    autoUpdateInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (id === 'purchasePrice') {
                    updatePropertyTax();
                    updateDownPaymentDisplay();
                }
                if (id === 'downPayment') {
                    updateDownPaymentDisplay();
                }
                runAnalysis();
            });

            el.addEventListener('input', () => {
                if (id === 'downPayment') {
                    updateDownPaymentDisplay();
                }
            });
        }
    });

    // Format currency inputs
    formatCurrencyInputs();

    // Initialize property tax based on default price
    updatePropertyTax();
    updateDownPaymentDisplay();

    // Initialize neighborhoods grid
    initNeighborhoodsGrid();

    // Add SVG gradient for score ring
    const svg = document.querySelector('.score-ring svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6366f1"/>
                <stop offset="100%" style="stop-color:#8b5cf6"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Run initial analysis
    runAnalysis();

    // Initialize new features
    initScenarioAnalysis();
    initBRRRRCalculator();
    initPropertyComparison();
    initAISignup();
    initActionButtons();

    console.log('Calgary Property Analyzer initialized');
    console.log('Neighborhoods loaded:', Object.keys(NEIGHBORHOODS).length);
});

/**
 * Initialize export, print, and share buttons
 */
function initActionButtons() {
    // Export PDF button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Create a printable version
            const inputs = getInputValues();
            const results = analyzeProperty(inputs);

            const reportContent = `
Calgary Property Investment Analysis Report
Generated: ${new Date().toLocaleDateString('en-CA')}
============================================

PROPERTY DETAILS
Purchase Price: ${formatCurrency(inputs.purchasePrice)}
Property Type: ${inputs.propertyType.charAt(0).toUpperCase() + inputs.propertyType.slice(1)}
Down Payment: ${inputs.downPaymentPercent}% (${formatCurrency(results.downPaymentAmount)})
Interest Rate: ${inputs.interestRate}%
Amortization: ${inputs.amortizationYears} years

RENTAL INCOME
Monthly Rent: ${formatCurrency(inputs.monthlyRent)}
Vacancy Rate: ${inputs.vacancyRate}%
Effective Gross Income: ${formatCurrency(results.effectiveGrossIncome)}/mo

KEY METRICS
Deal Score: ${results.dealScore}/100 (${results.dealScoreLabel})
Monthly Cash Flow: ${formatCurrency(results.monthlyCashFlow)}
Annual Cash Flow: ${formatCurrency(results.annualCashFlow)}
Cap Rate: ${formatPercent(results.capRate)}
Cash-on-Cash Return: ${formatPercent(results.cashOnCash)}
DSCR: ${results.dscr.toFixed(2)}x
5-Year IRR: ${formatPercent(results.irr)}

INVESTMENT REQUIRED
Total Cash Required: ${formatCurrency(results.totalCashRequired)}

---
Generated by Calgary Property Analyzer
https://calgarypropertyanalyzer.ca
            `;

            // Create download
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `property-analysis-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Show feedback
            exportBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Downloaded!
            `;
            setTimeout(() => {
                exportBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export PDF
                `;
            }, 2000);
        });
    }

    // Print button
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const inputs = getInputValues();
            const results = analyzeProperty(inputs);

            const shareData = {
                title: 'Calgary Property Analysis',
                text: `I analyzed a property: ${formatCurrency(inputs.purchasePrice)} with ${formatCurrency(results.monthlyCashFlow)}/mo cash flow. Deal Score: ${results.dealScore}/100`,
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback: copy to clipboard
                    await navigator.clipboard.writeText(shareData.text + ' - ' + shareData.url);
                    shareBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Copied!
                    `;
                    setTimeout(() => {
                        shareBtn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="18" cy="5" r="3"/>
                                <circle cx="6" cy="12" r="3"/>
                                <circle cx="18" cy="19" r="3"/>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                            </svg>
                            Share
                        `;
                    }, 2000);
                }
            } catch (err) {
                console.log('Share failed:', err);
            }
        });
    }
}

// ============================================
// SCENARIO ANALYSIS
// ============================================

/** @type {AnalysisResults|null} */
let currentAnalysisResults = null;

/**
 * Initialize scenario analysis sliders and calculations
 */
function initScenarioAnalysis() {
    // Interest Rate Slider
    const rateSlider = document.getElementById('rateSlider');
    const rateSliderValue = document.getElementById('rateSliderValue');

    if (rateSlider) {
        rateSlider.addEventListener('input', () => {
            if (rateSliderValue) {
                rateSliderValue.textContent = rateSlider.value + '%';
            }
            updateRateScenarios();
        });
    }

    // Vacancy Slider
    const vacancySlider = document.getElementById('vacancySlider');
    const vacancySliderValue = document.getElementById('vacancySliderValue');

    if (vacancySlider) {
        vacancySlider.addEventListener('input', () => {
            if (vacancySliderValue) {
                vacancySliderValue.textContent = vacancySlider.value + '%';
            }
            updateVacancyScenarios();
        });
    }

    // Rent Growth Slider
    const rentGrowthSlider = document.getElementById('rentGrowthSlider');
    const rentGrowthValue = document.getElementById('rentGrowthValue');

    if (rentGrowthSlider) {
        rentGrowthSlider.addEventListener('input', () => {
            if (rentGrowthValue) {
                rentGrowthValue.textContent = rentGrowthSlider.value + '%';
            }
            updateRentGrowthProjections();
        });
    }

    // Initial update
    setTimeout(() => {
        updateAllScenarios();
    }, 100);
}

/**
 * Update all scenario analyses based on current inputs
 */
function updateAllScenarios() {
    const inputs = getInputValues();
    currentAnalysisResults = analyzeProperty(inputs);

    updateRateScenarios();
    updateVacancyScenarios();
    updateRentGrowthProjections();
    updateTimelineChart();
}

/**
 * Calculate cash flow at a given interest rate
 * @param {number} rate - Interest rate as percentage
 * @returns {number} Monthly cash flow
 */
function calculateCashFlowAtRate(rate) {
    const inputs = getInputValues();
    inputs.interestRate = rate;
    const results = analyzeProperty(inputs);
    return results.monthlyCashFlow;
}

/**
 * Update interest rate scenario analysis
 */
function updateRateScenarios() {
    const inputs = getInputValues();
    const currentRate = inputs.interestRate;

    // Calculate cash flows at different rates
    const cf4 = calculateCashFlowAtRate(4.0);
    const cf55 = calculateCashFlowAtRate(5.5);
    const cf7 = calculateCashFlowAtRate(7.0);

    // Update display
    updateElement('rate4CashFlow', formatCashFlowDisplay(cf4));
    updateElement('rate55CashFlow', formatCashFlowDisplay(cf55));
    updateElement('rate7CashFlow', formatCashFlowDisplay(cf7));

    // Calculate break-even rate (binary search)
    const breakEvenRate = findBreakEvenRate(inputs);
    updateElement('breakEvenRate', breakEvenRate.toFixed(1) + '%');

    // Update classes
    updateCashFlowClass('rate4CashFlow', cf4);
    updateCashFlowClass('rate55CashFlow', cf55);
    updateCashFlowClass('rate7CashFlow', cf7);
}

/**
 * Find the interest rate at which cash flow becomes zero
 * @param {PropertyInputs} inputs 
 * @returns {number}
 */
function findBreakEvenRate(inputs) {
    let low = 0;
    let high = 15;

    for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        const testInputs = { ...inputs, interestRate: mid };
        const results = analyzeProperty(testInputs);

        if (Math.abs(results.monthlyCashFlow) < 1) {
            return mid;
        }

        if (results.monthlyCashFlow > 0) {
            low = mid;
        } else {
            high = mid;
        }
    }

    return (low + high) / 2;
}

/**
 * Update vacancy scenario analysis
 */
function updateVacancyScenarios() {
    const inputs = getInputValues();

    // Calculate cash flows at different vacancy rates
    const inputsV0 = { ...inputs, vacancyRate: 0 };
    const inputsV6 = { ...inputs, vacancyRate: 6 };
    const inputsV10 = { ...inputs, vacancyRate: 10 };

    const cf0 = analyzeProperty(inputsV0).monthlyCashFlow;
    const cf6 = analyzeProperty(inputsV6).monthlyCashFlow;
    const cf10 = analyzeProperty(inputsV10).monthlyCashFlow;

    updateElement('vacancy0', formatCashFlowDisplay(cf0));
    updateElement('vacancy6', formatCashFlowDisplay(cf6));
    updateElement('vacancy10', formatCashFlowDisplay(cf10));

    updateCashFlowClass('vacancy0', cf0);
    updateCashFlowClass('vacancy6', cf6);
    updateCashFlowClass('vacancy10', cf10);

    // Calculate max tolerable vacancy
    const breakEvenVacancy = currentAnalysisResults?.breakEvenVacancy || 0;
    updateElement('maxVacancy', Math.max(0, breakEvenVacancy * 100).toFixed(0) + '%');
}

/**
 * Update rent growth projections
 */
function updateRentGrowthProjections() {
    const inputs = getInputValues();
    const growthRate = parseFloat(document.getElementById('rentGrowthSlider')?.value || '3') / 100;
    const currentRent = inputs.monthlyRent;

    const year1Rent = currentRent;
    const year3Rent = currentRent * Math.pow(1 + growthRate, 2);
    const year5Rent = currentRent * Math.pow(1 + growthRate, 4);

    updateElement('year1Rent', formatCurrency(year1Rent));
    updateElement('year3Rent', formatCurrency(year3Rent));
    updateElement('year5Rent', formatCurrency(year5Rent));

    // Find year to positive cash flow
    const yearPositive = findYearToPositiveCashFlow(inputs, growthRate);
    updateElement('yearPositive', yearPositive);
}

/**
 * Find the year at which the property becomes cash flow positive
 * @param {PropertyInputs} inputs 
 * @param {number} growthRate 
 * @returns {string}
 */
function findYearToPositiveCashFlow(inputs, growthRate) {
    const baseResults = analyzeProperty(inputs);

    if (baseResults.monthlyCashFlow >= 0) {
        return 'Now';
    }

    for (let year = 1; year <= 10; year++) {
        const futureRent = inputs.monthlyRent * Math.pow(1 + growthRate, year);
        const futureInputs = { ...inputs, monthlyRent: futureRent };
        const futureResults = analyzeProperty(futureInputs);

        if (futureResults.monthlyCashFlow >= 0) {
            return 'Year ' + year;
        }
    }

    return '10+ Years';
}

/**
 * Update 5-year investment timeline chart
 */
function updateTimelineChart() {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);
    const appreciationRate = 0.03; // 3% annual
    const rentGrowthRate = 0.03;

    let cumulativeCashFlow = 0;
    const downPayment = results.downPaymentAmount;

    // Calculate 5-year projections
    const projections = [];
    for (let year = 1; year <= 5; year++) {
        const futureValue = inputs.purchasePrice * Math.pow(1 + appreciationRate, year);
        const equity = downPayment + (futureValue - inputs.purchasePrice); // Simplified equity

        const futureRent = inputs.monthlyRent * Math.pow(1 + rentGrowthRate, year - 1);
        const futureInputs = { ...inputs, monthlyRent: futureRent };
        const futureResults = analyzeProperty(futureInputs);
        cumulativeCashFlow += futureResults.annualCashFlow;

        projections.push({ year, equity, cumulativeCashFlow });
    }

    // Normalize for display
    const maxEquity = Math.max(...projections.map(p => p.equity));
    const maxValue = Math.max(maxEquity, Math.abs(projections[4].cumulativeCashFlow));

    projections.forEach((p, i) => {
        const equityBar = document.getElementById('equity' + (i + 1));
        const cfBar = document.getElementById('cf' + (i + 1));

        if (equityBar) {
            const height = (p.equity / maxEquity) * 100;
            equityBar.style.height = height + '%';
        }

        if (cfBar) {
            const height = Math.abs(p.cumulativeCashFlow) / maxValue * 50;
            cfBar.style.height = Math.max(5, height) + '%';
            cfBar.style.background = p.cumulativeCashFlow >= 0 ? 'var(--success-500)' : 'var(--danger-500)';
        }
    });

    // Update summary stats
    const finalProjection = projections[4];
    updateElement('totalEquity5Y', formatCurrency(finalProjection.equity));
    updateElement('totalCashFlow5Y', formatCurrency(finalProjection.cumulativeCashFlow));

    const totalReturn = ((finalProjection.equity + finalProjection.cumulativeCashFlow) / results.totalCashRequired - 1) * 100;
    updateElement('totalReturn5Y', totalReturn.toFixed(0) + '%');
}

/**
 * Format cash flow for display
 * @param {number} value 
 * @returns {string}
 */
function formatCashFlowDisplay(value) {
    const sign = value >= 0 ? '+' : '';
    return sign + formatCurrency(value) + '/mo';
}

/**
 * Update element class based on cash flow value
 * @param {string} id 
 * @param {number} value 
 */
function updateCashFlowClass(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('positive', 'negative');
        el.classList.add(value >= 0 ? 'positive' : 'negative');
    }
}

// ============================================
// BRRRR CALCULATOR
// ============================================

/**
 * Initialize BRRRR Calculator functionality
 */
function initBRRRRCalculator() {
    const analyzeBtn = document.getElementById('analyzeBRRRR');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeBRRRRDeal);
    }

    // Add input listeners for real-time updates
    const brrrrInputs = ['brrrrPurchase', 'brrrrClosing', 'rehabCost', 'holdingCosts',
        'rehabMonths', 'brrrrARV', 'brrrrRent', 'refiLTV', 'refiRate', 'refiCosts'];

    brrrrInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', analyzeBRRRRDeal);
        }
    });

    // Format currency inputs in BRRRR section
    document.querySelectorAll('#brrrr .currency-input').forEach(input => {
        input.addEventListener('blur', function () {
            const value = parseCurrency(this.value);
            this.value = formatNumber(value);
        });
    });

    // Initial calculation
    analyzeBRRRRDeal();
}

/**
 * Analyze BRRRR deal
 */
function analyzeBRRRRDeal() {
    // Get inputs
    const purchasePrice = parseCurrency(document.getElementById('brrrrPurchase')?.value || '0');
    const closingCosts = parseCurrency(document.getElementById('brrrrClosing')?.value || '0');
    const rehabCost = parseCurrency(document.getElementById('rehabCost')?.value || '0');
    const holdingCostsMonthly = parseCurrency(document.getElementById('holdingCosts')?.value || '0');
    const rehabMonths = parseInt(document.getElementById('rehabMonths')?.value || '3');
    const arv = parseCurrency(document.getElementById('brrrrARV')?.value || '0');
    const monthlyRent = parseCurrency(document.getElementById('brrrrRent')?.value || '0');
    const refiLTV = parseFloat(document.getElementById('refiLTV')?.value || '75') / 100;
    const refiRate = parseFloat(document.getElementById('refiRate')?.value || '5.5') / 100;
    const refiCosts = parseCurrency(document.getElementById('refiCosts')?.value || '0');

    // Calculate total investment
    const totalHoldingCosts = holdingCostsMonthly * rehabMonths;
    const totalInvestment = purchasePrice + closingCosts + rehabCost + totalHoldingCosts;

    // Calculate refinance
    const refinanceAmount = arv * refiLTV;
    const cashLeftInDeal = totalInvestment - refinanceAmount + refiCosts;

    // Calculate equity created
    const equityCreated = arv - refinanceAmount;

    // Calculate monthly cash flow after refinance
    const mortgagePayment = calculateMortgagePayment(refinanceAmount, refiRate, 25);
    const monthlyExpenses = mortgagePayment + (arv * CALGARY_DEFAULTS.propertyTaxRate / 12) +
        (CALGARY_DEFAULTS.avgInsuranceAnnual / 12) +
        (monthlyRent * 0.16); // 8% maintenance + 8% PM
    const monthlyCashFlow = monthlyRent * 0.94 - monthlyExpenses; // 6% vacancy

    // Calculate Cash-on-Cash (infinite if no cash left)
    let coCDisplay = '∞%';
    if (cashLeftInDeal > 0) {
        const annualCashFlow = monthlyCashFlow * 12;
        const coc = (annualCashFlow / cashLeftInDeal) * 100;
        coCDisplay = coc.toFixed(1) + '%';
    }

    // Calculate Rehab ROI
    const valueAdded = arv - purchasePrice;
    const rehabROI = rehabCost > 0 ? ((valueAdded - rehabCost) / rehabCost) * 100 : 0;

    // Update display
    const cashLeftEl = document.getElementById('cashLeftInDeal');
    if (cashLeftEl) {
        cashLeftEl.textContent = formatCurrency(cashLeftInDeal);
        cashLeftEl.classList.remove('positive', 'negative');
        cashLeftEl.classList.add(cashLeftInDeal <= 0 ? 'positive' : 'negative');
    }

    updateElement('brrrrTotalInvestment', formatCurrency(totalInvestment));
    updateElement('brrrrRefiAmount', formatCurrency(refinanceAmount));
    updateElement('brrrrEquityCreated', formatCurrency(equityCreated));
    updateElement('brrrrMonthlyCF', formatCurrency(monthlyCashFlow));
    updateElement('brrrrCoC', coCDisplay);
    updateElement('brrrrRehabROI', rehabROI.toFixed(0) + '%');

    // Update flowchart
    updateElement('flowPurchase', formatCurrency(purchasePrice));
    updateElement('flowRehab', formatCurrency(rehabCost + totalHoldingCosts));
    updateElement('flowARV', formatCurrency(arv));
    updateElement('flowRefi', formatCurrency(refinanceAmount));
}

// ============================================
// PROPERTY COMPARISON
// ============================================

/** @type {Object|null} */
let savedProperty1 = null;
/** @type {Object|null} */
let savedProperty2 = null;

/**
 * Initialize property comparison functionality
 */
function initPropertyComparison() {
    document.querySelectorAll('.compare-load-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const propertyNum = btn.dataset.property;
            loadCurrentPropertyToComparison(parseInt(propertyNum));
        });
    });
}

/**
 * Load current calculator values into comparison slot
 * @param {number} slot - 1 or 2
 */
function loadCurrentPropertyToComparison(slot) {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);

    const propertyData = {
        purchasePrice: inputs.purchasePrice,
        monthlyRent: inputs.monthlyRent,
        cashFlow: results.monthlyCashFlow,
        capRate: results.capRate,
        cashOnCash: results.cashOnCash,
        dealScore: results.dealScore
    };

    if (slot === 1) {
        savedProperty1 = propertyData;
    } else {
        savedProperty2 = propertyData;
    }

    // Update display
    updateElement(`compare${slot}Price`, formatCurrency(propertyData.purchasePrice));
    updateElement(`compare${slot}Rent`, formatCurrency(propertyData.monthlyRent));
    updateElement(`compare${slot}CF`, formatCurrency(propertyData.cashFlow));
    updateElement(`compare${slot}Cap`, formatPercent(propertyData.capRate));
    updateElement(`compare${slot}CoC`, formatPercent(propertyData.cashOnCash));
    updateElement(`compare${slot}Score`, propertyData.dealScore);

    // Style the cash flow
    const cfEl = document.getElementById(`compare${slot}CF`);
    if (cfEl) {
        cfEl.style.color = propertyData.cashFlow >= 0 ? 'var(--success-500)' : 'var(--danger-500)';
    }

    // Check if both properties are loaded
    if (savedProperty1 && savedProperty2) {
        showComparisonWinner();
    }
}

/**
 * Show comparison winner
 */
function showComparisonWinner() {
    const winner = document.getElementById('compareWinner');
    if (!winner || !savedProperty1 || !savedProperty2) return;

    // Score properties
    let p1Score = 0;
    let p2Score = 0;

    if (savedProperty1.cashFlow > savedProperty2.cashFlow) p1Score += 3;
    else if (savedProperty2.cashFlow > savedProperty1.cashFlow) p2Score += 3;

    if (savedProperty1.capRate > savedProperty2.capRate) p1Score += 2;
    else if (savedProperty2.capRate > savedProperty1.capRate) p2Score += 2;

    if (savedProperty1.cashOnCash > savedProperty2.cashOnCash) p1Score += 2;
    else if (savedProperty2.cashOnCash > savedProperty1.cashOnCash) p2Score += 2;

    if (savedProperty1.dealScore > savedProperty2.dealScore) p1Score += 1;
    else if (savedProperty2.dealScore > savedProperty1.dealScore) p2Score += 1;

    winner.style.display = 'block';

    const winnerName = document.getElementById('winnerName');
    const winnerReason = document.getElementById('winnerReason');

    if (p1Score > p2Score) {
        if (winnerName) winnerName.textContent = 'Property A';
        if (winnerReason) {
            winnerReason.textContent = generateWinnerReason(savedProperty1, savedProperty2, 'A');
        }
    } else if (p2Score > p1Score) {
        if (winnerName) winnerName.textContent = 'Property B';
        if (winnerReason) {
            winnerReason.textContent = generateWinnerReason(savedProperty2, savedProperty1, 'B');
        }
    } else {
        if (winnerName) winnerName.textContent = 'Tie';
        if (winnerReason) winnerReason.textContent = 'Both properties show similar investment potential.';
    }
}

/**
 * Generate reason text for winner
 * @param {Object} winner 
 * @param {Object} loser 
 * @param {string} name 
 * @returns {string}
 */
function generateWinnerReason(winner, loser, name) {
    const reasons = [];

    if (winner.cashFlow > loser.cashFlow) {
        reasons.push(`${formatCurrency(winner.cashFlow - loser.cashFlow)}/mo higher cash flow`);
    }
    if (winner.capRate > loser.capRate) {
        reasons.push(`${((winner.capRate - loser.capRate) * 100).toFixed(1)}% higher cap rate`);
    }
    if (winner.dealScore > loser.dealScore) {
        reasons.push(`${winner.dealScore - loser.dealScore} point higher deal score`);
    }

    if (reasons.length === 0) {
        return `Property ${name} shows stronger overall fundamentals.`;
    }

    return reasons.join(', ') + ' makes this the stronger investment.';
}

// ============================================
// AI SIGNUP
// ============================================

/**
 * Initialize AI signup functionality
 */
function initAISignup() {
    const form = document.getElementById('aiSignupForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('.signup-input')?.value;

            if (email) {
                // Show success (in production, this would make an API call)
                const btn = form.querySelector('.signup-btn');
                if (btn) {
                    btn.textContent = '✓ Joined!';
                    btn.style.background = 'var(--success-500)';
                }

                // Update counter
                const note = document.querySelector('.signup-note');
                if (note) {
                    const currentCount = 1247;
                    note.textContent = `Join ${(currentCount + 1).toLocaleString()} Calgary investors already on the waitlist`;
                }

                // Store in localStorage
                localStorage.setItem('aiWaitlist', email);
            }
        });
    }

    // Check if already signed up
    const existingEmail = localStorage.getItem('aiWaitlist');
    if (existingEmail) {
        const btn = document.querySelector('.signup-btn');
        if (btn) {
            btn.textContent = '✓ You\'re on the list!';
            btn.style.background = 'var(--success-500)';
        }
    }
}

// ============================================
// ENHANCED RUN ANALYSIS 
// ============================================

// Override runAnalysis to also update scenarios
const originalRunAnalysis = runAnalysis;
runAnalysis = function () {
    originalRunAnalysis();
    updateAllScenarios();
    updateAmortizationSchedule();
    updateTaxCalculator();
    updateWealthProjections();
};

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Check for saved preference
    const savedTheme = localStorage.getItem('calgaryAnalyzerTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('calgaryAnalyzerTheme', isLight ? 'light' : 'dark');
    });
}

// ============================================
// PORTFOLIO TRACKER
// ============================================

/** @type {Array<Object>} */
let savedProperties = [];

function initPortfolioTracker() {
    // Load saved properties from localStorage
    const saved = localStorage.getItem('calgaryAnalyzerPortfolio');
    if (saved) {
        try {
            savedProperties = JSON.parse(saved);
            renderSavedProperties();
            updatePortfolioSummary();
        } catch (e) {
            console.error('Error loading portfolio:', e);
        }
    }

    // Save property button
    const saveBtn = document.getElementById('savePropertyBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCurrentProperty);
    }

    // Wealth projection sliders
    const appreciationSlider = document.getElementById('appreciationRate');
    const rentGrowthSlider = document.getElementById('rentGrowthRate');

    if (appreciationSlider) {
        appreciationSlider.addEventListener('input', () => {
            document.getElementById('appreciationValue').textContent = appreciationSlider.value + '%';
            updateWealthProjections();
        });
    }

    if (rentGrowthSlider) {
        rentGrowthSlider.addEventListener('input', () => {
            document.getElementById('rentGrowthValue').textContent = rentGrowthSlider.value + '%';
            updateWealthProjections();
        });
    }
}

function saveCurrentProperty() {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);

    const property = {
        id: Date.now(),
        name: `Property ${savedProperties.length + 1}`,
        neighborhood: inputs.neighborhood,
        purchasePrice: inputs.purchasePrice,
        monthlyRent: inputs.monthlyRent,
        downPayment: results.downPaymentAmount,
        monthlyCashFlow: results.monthlyCashFlow,
        capRate: results.capRate,
        dealScore: results.dealScore,
        savedAt: new Date().toISOString()
    };

    savedProperties.push(property);
    localStorage.setItem('calgaryAnalyzerPortfolio', JSON.stringify(savedProperties));

    renderSavedProperties();
    updatePortfolioSummary();
    updateWealthProjections();

    // Show feedback
    const saveBtn = document.getElementById('savePropertyBtn');
    if (saveBtn) {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Saved!
        `;
        setTimeout(() => saveBtn.innerHTML = originalText, 1500);
    }
}

function renderSavedProperties() {
    const list = document.getElementById('savedPropertiesList');
    if (!list) return;

    if (savedProperties.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <p>No saved properties yet</p>
                <span>Click "Save Current" to add properties to your portfolio</span>
            </div>
        `;
        return;
    }

    list.innerHTML = savedProperties.map(prop => `
        <div class="saved-property-item" data-id="${prop.id}">
            <div class="saved-property-info">
                <h4>${prop.name}</h4>
                <span>${formatCurrency(prop.purchasePrice)} • ${formatCurrency(prop.monthlyCashFlow)}/mo</span>
            </div>
            <div class="saved-property-actions">
                <button onclick="loadProperty(${prop.id})">Load</button>
                <button class="delete" onclick="deleteProperty(${prop.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadProperty(id) {
    const prop = savedProperties.find(p => p.id === id);
    if (!prop) return;

    document.getElementById('purchasePrice').value = formatNumber(prop.purchasePrice);
    document.getElementById('monthlyRent').value = formatNumber(prop.monthlyRent);
    if (prop.neighborhood) {
        document.getElementById('neighborhood').value = prop.neighborhood;
    }

    runAnalysis();

    // Scroll to calculator
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}

function deleteProperty(id) {
    savedProperties = savedProperties.filter(p => p.id !== id);
    localStorage.setItem('calgaryAnalyzerPortfolio', JSON.stringify(savedProperties));
    renderSavedProperties();
    updatePortfolioSummary();
    updateWealthProjections();
}

// Make functions global
window.loadProperty = loadProperty;
window.deleteProperty = deleteProperty;

function updatePortfolioSummary() {
    const count = savedProperties.length;
    const totalValue = savedProperties.reduce((sum, p) => sum + p.purchasePrice, 0);
    const totalEquity = savedProperties.reduce((sum, p) => sum + p.downPayment, 0);
    const totalCashFlow = savedProperties.reduce((sum, p) => sum + p.monthlyCashFlow, 0);
    const avgCapRate = count > 0 ? savedProperties.reduce((sum, p) => sum + p.capRate, 0) / count : 0;
    const annualIncome = totalCashFlow * 12;

    const updateEl = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateEl('portfolioCount', count);
    updateEl('portfolioValue', formatCurrency(totalValue));
    updateEl('portfolioEquity', formatCurrency(totalEquity));
    updateEl('portfolioCashFlow', formatCurrency(totalCashFlow));
    updateEl('portfolioCapRate', formatPercent(avgCapRate));
    updateEl('portfolioAnnualIncome', formatCurrency(annualIncome));
}

function updateWealthProjections() {
    const appreciationRate = parseFloat(document.getElementById('appreciationRate')?.value || 3) / 100;
    const rentGrowth = parseFloat(document.getElementById('rentGrowthRate')?.value || 3) / 100;

    // Use current property if no portfolio
    let currentValue, currentEquity, currentCashFlow, loanAmount;

    if (savedProperties.length > 0) {
        currentValue = savedProperties.reduce((sum, p) => sum + p.purchasePrice, 0);
        currentEquity = savedProperties.reduce((sum, p) => sum + p.downPayment, 0);
        currentCashFlow = savedProperties.reduce((sum, p) => sum + p.monthlyCashFlow, 0);
        loanAmount = currentValue - currentEquity;
    } else {
        const inputs = getInputValues();
        const results = analyzeProperty(inputs);
        currentValue = inputs.purchasePrice;
        currentEquity = results.downPaymentAmount;
        currentCashFlow = results.monthlyCashFlow;
        loanAmount = results.loanAmount;
    }

    // Project for 10, 20, 30 years
    const projectYear = (years) => {
        const futureValue = currentValue * Math.pow(1 + appreciationRate, years);
        // Simplified mortgage paydown calc
        const principalPaid = loanAmount * (years / 25) * 0.6; // Rough approximation
        const remainingLoan = Math.max(0, loanAmount - principalPaid);
        const equity = futureValue - remainingLoan;
        const futureCashFlow = currentCashFlow * Math.pow(1 + rentGrowth, years);
        return { equity, cashFlow: futureCashFlow };
    };

    const year10 = projectYear(10);
    const year20 = projectYear(20);
    const year30 = projectYear(30);

    const updateEl = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateEl('equity10', formatCurrency(year10.equity));
    updateEl('cashFlow10', formatCurrency(year10.cashFlow) + '/mo');
    updateEl('equity20', formatCurrency(year20.equity));
    updateEl('cashFlow20', formatCurrency(year20.cashFlow) + '/mo');
    updateEl('equity30', formatCurrency(year30.equity));
    updateEl('cashFlow30', formatCurrency(year30.cashFlow) + '/mo');
}

// ============================================
// AMORTIZATION SCHEDULE
// ============================================

function updateAmortizationSchedule() {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);

    const principal = results.loanAmount;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.amortizationYears * 12;
    const monthlyPayment = results.mortgagePayment;

    // Calculate year-by-year amortization
    const schedule = [];
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let year = 1; year <= inputs.amortizationYears; year++) {
        let yearInterest = 0;
        let yearPrincipal = 0;
        const startBalance = balance;

        for (let month = 1; month <= 12; month++) {
            if (balance <= 0) break;

            const interestPayment = balance * monthlyRate;
            const principalPayment = Math.min(monthlyPayment - interestPayment, balance);

            yearInterest += interestPayment;
            yearPrincipal += principalPayment;
            balance -= principalPayment;
        }

        totalInterest += yearInterest;
        totalPrincipal += yearPrincipal;

        schedule.push({
            year,
            startBalance,
            annualPayment: monthlyPayment * 12,
            principalPaid: yearPrincipal,
            interestPaid: yearInterest,
            endBalance: Math.max(0, balance),
            equityBuilt: totalPrincipal
        });
    }

    // Update stats
    const updateEl = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateEl('totalInterest', formatCurrency(totalInterest));
    updateEl('totalPrincipal', formatCurrency(principal));
    updateEl('interestRatio', formatPercent(totalInterest / principal * 100));

    // Equity after 5 years
    const equity5 = schedule.length >= 5 ? schedule[4].equityBuilt : 0;
    updateEl('equity5Years', formatCurrency(equity5 + results.downPaymentAmount));

    // Render chart
    renderAmortizationChart(schedule);

    // Render table
    renderAmortizationTable(schedule);
}

function renderAmortizationChart(schedule) {
    const chart = document.getElementById('amortizationChart');
    if (!chart) return;

    const maxPayment = Math.max(...schedule.map(s => s.principalPaid + s.interestPaid));

    chart.innerHTML = schedule.map(s => {
        const totalHeight = ((s.principalPaid + s.interestPaid) / maxPayment) * 100;
        const principalRatio = s.principalPaid / (s.principalPaid + s.interestPaid);

        return `
            <div class="amort-bar" style="height: ${totalHeight}%;" title="Year ${s.year}: ${formatCurrency(s.principalPaid)} principal, ${formatCurrency(s.interestPaid)} interest">
                <div class="interest" style="height: ${(1 - principalRatio) * 100}%;"></div>
                <div class="principal" style="height: ${principalRatio * 100}%;"></div>
            </div>
        `;
    }).join('');
}

function renderAmortizationTable(schedule) {
    const tbody = document.getElementById('amortizationBody');
    if (!tbody) return;

    tbody.innerHTML = schedule.map(s => `
        <tr>
            <td>${s.year}</td>
            <td>${formatCurrency(s.startBalance)}</td>
            <td>${formatCurrency(s.annualPayment)}</td>
            <td>${formatCurrency(s.principalPaid)}</td>
            <td>${formatCurrency(s.interestPaid)}</td>
            <td>${formatCurrency(s.endBalance)}</td>
            <td>${formatCurrency(s.equityBuilt)}</td>
        </tr>
    `).join('');
}

// ============================================
// TAX CALCULATOR
// ============================================

function initTaxCalculator() {
    const inputs = ['employmentIncome', 'marginalRate', 'buildingValue', 'claimCCA'];

    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', updateTaxCalculator);
            el.addEventListener('input', updateTaxCalculator);
        }
    });

    // CCA toggle label update
    const ccaToggle = document.getElementById('claimCCA');
    if (ccaToggle) {
        ccaToggle.addEventListener('change', () => {
            const label = document.getElementById('ccaLabel');
            if (label) {
                label.textContent = ccaToggle.checked ? 'Yes (4% rate)' : 'No';
            }
            updateTaxCalculator();
        });
    }
}

function updateTaxCalculator() {
    const inputs = getInputValues();
    const results = analyzeProperty(inputs);

    // Get tax inputs
    const marginalRate = parseFloat(document.getElementById('marginalRate')?.value || 0.36);
    const buildingValue = parseNumber(document.getElementById('buildingValue')?.value || '280000');
    const claimCCA = document.getElementById('claimCCA')?.checked ?? true;

    // Calculate rental income/expenses
    const grossRentalIncome = inputs.monthlyRent * 12;

    // Interest portion of mortgage (simplified - year 1)
    const monthlyRate = inputs.interestRate / 100 / 12;
    const yearlyInterest = results.loanAmount * inputs.interestRate / 100 * 0.95; // Slightly less than full interest in year 1

    const propertyTax = inputs.purchasePrice * 0.00618;
    const insurance = inputs.annualInsurance || 1800;
    const maintenance = grossRentalIncome * 0.08;
    const propertyManagement = grossRentalIncome * 0.08;

    // CCA depreciation (4% of building value, half-year rule in year 1)
    const ccaAmount = claimCCA ? buildingValue * 0.04 : 0;

    // Net rental income
    const expenses = yearlyInterest + propertyTax + insurance + maintenance + propertyManagement;
    const netWithoutCCA = grossRentalIncome - expenses;
    const netWithCCA = netWithoutCCA - ccaAmount;

    // Tax impact
    const taxWithoutCCA = netWithoutCCA * marginalRate;
    const taxWithCCA = netWithCCA * marginalRate;
    const ccaBenefit = Math.abs(taxWithoutCCA - taxWithCCA);

    // Update UI
    const updateEl = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateEl('taxGrossIncome', formatCurrency(grossRentalIncome));
    updateEl('taxMortgageInterest', '-' + formatCurrency(yearlyInterest));
    updateEl('taxPropertyTax', '-' + formatCurrency(propertyTax));
    updateEl('taxInsurance', '-' + formatCurrency(insurance));
    updateEl('taxMaintenance', '-' + formatCurrency(maintenance));
    updateEl('taxPM', '-' + formatCurrency(propertyManagement));
    updateEl('taxCCA', '-' + formatCurrency(ccaAmount));
    updateEl('taxNetIncome', formatCurrency(netWithCCA));

    // Update CCA row visibility
    const ccaRow = document.getElementById('ccaRow');
    if (ccaRow) {
        ccaRow.style.display = claimCCA ? 'flex' : 'none';
    }

    // Tax impact display
    const impactDisplay = document.getElementById('taxImpactDisplay');
    if (impactDisplay) {
        const isRefund = netWithCCA < 0;
        const taxAmount = Math.abs(taxWithCCA);

        impactDisplay.innerHTML = `
            <span class="tax-impact-label">${isRefund ? 'Tax Savings' : 'Tax Owing'}</span>
            <span class="tax-impact-value ${isRefund ? 'positive' : 'negative'}">${formatCurrency(taxAmount)}</span>
            <span class="tax-impact-note">${isRefund ? 'Rental loss offsets employment income' : 'Net rental income is taxable'}</span>
        `;
    }

    // Comparison
    if (taxWithoutCCA > 0) {
        updateEl('taxWithoutCCA', 'Tax: ' + formatCurrency(taxWithoutCCA));
    } else {
        updateEl('taxWithoutCCA', 'Savings: ' + formatCurrency(Math.abs(taxWithoutCCA)));
    }

    if (taxWithCCA > 0) {
        updateEl('taxWithCCA', 'Tax: ' + formatCurrency(taxWithCCA));
    } else {
        updateEl('taxWithCCA', 'Savings: ' + formatCurrency(Math.abs(taxWithCCA)));
    }

    updateEl('ccaBenefit', formatCurrency(ccaBenefit) + '/year');
}

// ============================================
// INITIALIZE NEW FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize after a short delay to ensure main init runs first
    setTimeout(() => {
        initThemeToggle();
        initPortfolioTracker();
        initTaxCalculator();
        updateAmortizationSchedule();
        updateTaxCalculator();
        updateWealthProjections();
        console.log('Advanced features initialized');
    }, 100);
});
