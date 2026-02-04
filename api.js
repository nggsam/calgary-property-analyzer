// ============================================
// CALGARY PROPERTY ANALYZER - REAL DATA APIs
// ============================================
// Integrations:
// 1. Calgary Open Data (Socrata) - Property Assessments
// 2. Bank of Canada Valet API - Mortgage Rates
// 3. RapidAPI Canadian Realtor - Active Listings

const API_CONFIG = {
    // Calgary Open Data (Socrata) - FREE, no auth required
    calgaryOpenData: {
        baseUrl: 'https://data.calgary.ca/resource',
        // Property Assessments dataset
        propertyAssessments: 'pthr-yphr', // Calgary Property Assessments 2024
        communityProfiles: 'j9ps-fyst', // Community Profiles
        // No API key needed for public datasets (limited to 1000 rows without token)
    },

    // Bank of Canada Valet API - FREE, no auth required
    bankOfCanada: {
        baseUrl: 'https://www.bankofcanada.ca/valet',
        // Series codes for mortgage rates
        series: {
            primeRate: 'V122530',           // Prime rate
            mortgage1Year: 'V122521',        // 1-year conventional mortgage
            mortgage3Year: 'V122524',        // 3-year conventional mortgage  
            mortgage5Year: 'V122525',        // 5-year conventional mortgage
        }
    },

    // RapidAPI Canadian Realtor - Free tier: 500 req/month
    rapidApi: {
        baseUrl: 'https://realtor-canadian-real-estate.p.rapidapi.com',
        // User needs to add their own API key
        apiKey: null, // Set via setRapidApiKey()
        host: 'realtor-canadian-real-estate.p.rapidapi.com'
    }
};

// ============================================
// CALGARY OPEN DATA - PROPERTY ASSESSMENTS
// ============================================

/**
 * Fetch property assessments from Calgary Open Data
 * @param {Object} filters - Query filters (community, property_type, etc.)
 * @param {number} limit - Max results (default 100)
 * @returns {Promise<Array>} Property assessment records
 */
async function fetchCalgaryPropertyAssessments(filters = {}, limit = 100) {
    const baseUrl = `${API_CONFIG.calgaryOpenData.baseUrl}/${API_CONFIG.calgaryOpenData.propertyAssessments}.json`;

    const params = new URLSearchParams();
    params.append('$limit', limit);

    // Apply filters using SoQL (Socrata Query Language)
    if (filters.community) {
        params.append('$where', `comm_name='${filters.community.toUpperCase()}'`);
    }
    if (filters.minValue) {
        params.append('$where', `assessed_value >= ${filters.minValue}`);
    }
    if (filters.maxValue) {
        params.append('$where', `assessed_value <= ${filters.maxValue}`);
    }
    if (filters.propertyType) {
        params.append('$where', `property_type='${filters.propertyType}'`);
    }

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Calgary Open Data API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Calgary property assessments:', error);
        return [];
    }
}

/**
 * Get average assessed value for a Calgary community
 * @param {string} community - Community name
 * @returns {Promise<Object>} Stats object with avg, min, max, count
 */
async function getCommunityAssessmentStats(community) {
    const baseUrl = `${API_CONFIG.calgaryOpenData.baseUrl}/${API_CONFIG.calgaryOpenData.propertyAssessments}.json`;

    // Use SoQL aggregate functions
    const query = `
        SELECT 
            comm_name,
            AVG(assessed_value) as avg_value,
            MIN(assessed_value) as min_value,
            MAX(assessed_value) as max_value,
            COUNT(*) as property_count
        WHERE comm_name='${community.toUpperCase()}'
        GROUP BY comm_name
    `.replace(/\s+/g, ' ').trim();

    const params = new URLSearchParams();
    params.append('$query', query);

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Calgary Open Data API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
            return {
                community: data[0].comm_name,
                avgValue: parseFloat(data[0].avg_value) || 0,
                minValue: parseFloat(data[0].min_value) || 0,
                maxValue: parseFloat(data[0].max_value) || 0,
                propertyCount: parseInt(data[0].property_count) || 0
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching community stats:', error);
        return null;
    }
}

/**
 * Get list of all Calgary communities with property counts
 * @returns {Promise<Array>} Communities with property counts
 */
async function getCalgaryCommunitiesList() {
    const baseUrl = `${API_CONFIG.calgaryOpenData.baseUrl}/${API_CONFIG.calgaryOpenData.propertyAssessments}.json`;

    const query = `
        SELECT comm_name, COUNT(*) as count
        GROUP BY comm_name
        ORDER BY count DESC
        LIMIT 200
    `.replace(/\s+/g, ' ').trim();

    const params = new URLSearchParams();
    params.append('$query', query);

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Calgary Open Data API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching communities list:', error);
        return [];
    }
}

// ============================================
// BANK OF CANADA - MORTGAGE RATES
// ============================================

/**
 * Fetch current mortgage rates from Bank of Canada
 * @returns {Promise<Object>} Current rates object
 */
async function fetchBankOfCanadaRates() {
    const series = Object.values(API_CONFIG.bankOfCanada.series).join(',');
    const url = `${API_CONFIG.bankOfCanada.baseUrl}/observations/${series}/json?recent=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Bank of Canada API error: ${response.status}`);
        }
        const data = await response.json();

        // Parse the response
        const rates = {
            date: null,
            primeRate: null,
            mortgage1Year: null,
            mortgage3Year: null,
            mortgage5Year: null
        };

        if (data.observations && data.observations.length > 0) {
            const latest = data.observations[0];
            rates.date = latest.d;
            rates.primeRate = parseFloat(latest[API_CONFIG.bankOfCanada.series.primeRate]?.v) || null;
            rates.mortgage1Year = parseFloat(latest[API_CONFIG.bankOfCanada.series.mortgage1Year]?.v) || null;
            rates.mortgage3Year = parseFloat(latest[API_CONFIG.bankOfCanada.series.mortgage3Year]?.v) || null;
            rates.mortgage5Year = parseFloat(latest[API_CONFIG.bankOfCanada.series.mortgage5Year]?.v) || null;
        }

        return rates;
    } catch (error) {
        console.error('Error fetching Bank of Canada rates:', error);
        return null;
    }
}

/**
 * Fetch historical mortgage rates for trend analysis
 * @param {number} months - Number of months of history (default 12)
 * @returns {Promise<Array>} Historical rate data
 */
async function fetchHistoricalMortgageRates(months = 12) {
    const series = API_CONFIG.bankOfCanada.series.mortgage5Year;
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const url = `${API_CONFIG.bankOfCanada.baseUrl}/observations/${series}/json?start_date=${startDate}&end_date=${endDate}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Bank of Canada API error: ${response.status}`);
        }
        const data = await response.json();

        if (data.observations) {
            return data.observations.map(obs => ({
                date: obs.d,
                rate: parseFloat(obs[series]?.v) || null
            })).filter(item => item.rate !== null);
        }
        return [];
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        return [];
    }
}

// ============================================
// RAPIDAPI CANADIAN REALTOR (Optional)
// ============================================

/**
 * Set RapidAPI key for Canadian Realtor API
 * @param {string} apiKey - Your RapidAPI key
 */
function setRapidApiKey(apiKey) {
    API_CONFIG.rapidApi.apiKey = apiKey;
    localStorage.setItem('rapidApiKey', apiKey);
}

/**
 * Get stored RapidAPI key
 * @returns {string|null} Stored API key
 */
function getRapidApiKey() {
    if (!API_CONFIG.rapidApi.apiKey) {
        API_CONFIG.rapidApi.apiKey = localStorage.getItem('rapidApiKey');
    }
    return API_CONFIG.rapidApi.apiKey;
}

/**
 * Search Calgary listings on Realtor.ca via RapidAPI
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Property listings
 */
async function searchCalgaryListings(params = {}) {
    const apiKey = getRapidApiKey();
    if (!apiKey) {
        console.warn('RapidAPI key not set. Call setRapidApiKey() first.');
        return { error: 'API key required', listings: [] };
    }

    const defaults = {
        city: 'Calgary',
        province: 'Alberta',
        priceMin: 200000,
        priceMax: 1000000,
        bedsMin: 1,
        propertyType: 'House',
        page: 1
    };

    const searchParams = { ...defaults, ...params };

    try {
        const response = await fetch(`${API_CONFIG.rapidApi.baseUrl}/properties/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': API_CONFIG.rapidApi.host
            },
            body: JSON.stringify({
                CityName: searchParams.city,
                ProvinceAbbreviation: 'AB',
                MinPrice: searchParams.priceMin,
                MaxPrice: searchParams.priceMax,
                MinBedrooms: searchParams.bedsMin,
                PropertySearchTypeId: searchParams.propertyType === 'Condo' ? 2 : 1,
                CurrentPage: searchParams.page
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                return { error: 'Invalid API key', listings: [] };
            }
            if (response.status === 429) {
                return { error: 'Rate limit exceeded', listings: [] };
            }
            throw new Error(`RapidAPI error: ${response.status}`);
        }

        const data = await response.json();
        return {
            listings: data.Results || [],
            totalCount: data.Paging?.TotalRecords || 0,
            page: data.Paging?.CurrentPage || 1
        };
    } catch (error) {
        console.error('Error fetching Realtor.ca listings:', error);
        return { error: error.message, listings: [] };
    }
}

// ============================================
// API STATUS & HEALTH CHECK
// ============================================

/**
 * Check status of all APIs
 * @returns {Promise<Object>} Status object for each API
 */
async function checkApiStatus() {
    const status = {
        calgaryOpenData: { available: false, latency: null },
        bankOfCanada: { available: false, latency: null },
        rapidApi: { available: false, configured: false }
    };

    // Check Calgary Open Data
    try {
        const start = Date.now();
        const response = await fetch(`${API_CONFIG.calgaryOpenData.baseUrl}/${API_CONFIG.calgaryOpenData.propertyAssessments}.json?$limit=1`);
        status.calgaryOpenData.latency = Date.now() - start;
        status.calgaryOpenData.available = response.ok;
    } catch (e) {
        status.calgaryOpenData.available = false;
    }

    // Check Bank of Canada
    try {
        const start = Date.now();
        const response = await fetch(`${API_CONFIG.bankOfCanada.baseUrl}/observations/${API_CONFIG.bankOfCanada.series.primeRate}/json?recent=1`);
        status.bankOfCanada.latency = Date.now() - start;
        status.bankOfCanada.available = response.ok;
    } catch (e) {
        status.bankOfCanada.available = false;
    }

    // Check RapidAPI configuration
    status.rapidApi.configured = !!getRapidApiKey();
    if (status.rapidApi.configured) {
        // Don't make test call to save quota
        status.rapidApi.available = true;
    }

    return status;
}

// ============================================
// UI INTEGRATION HELPERS
// ============================================

/**
 * Update interest rate input with current Bank of Canada rate
 */
async function updateRateFromBankOfCanada() {
    const rates = await fetchBankOfCanadaRates();
    if (rates && rates.mortgage5Year) {
        const rateInput = document.getElementById('interestRate');
        if (rateInput) {
            rateInput.value = rates.mortgage5Year.toFixed(2);
            // Trigger input event to update calculations
            rateInput.dispatchEvent(new Event('input'));
        }

        // Update the rate info display
        const rateInfo = document.getElementById('bocRateInfo');
        if (rateInfo) {
            rateInfo.innerHTML = `
                <span class="rate-live">Live from Bank of Canada</span>
                <span class="rate-date">(${rates.date})</span>
            `;
        }

        return rates;
    }
    return null;
}

/**
 * Fetch and display neighborhood stats from Calgary Open Data
 * @param {string} neighborhood - Neighborhood name
 */
async function loadNeighborhoodStats(neighborhood) {
    const stats = await getCommunityAssessmentStats(neighborhood);
    if (stats) {
        // Update neighborhood card if exists
        const statsDisplay = document.getElementById('neighborhoodApiStats');
        if (statsDisplay) {
            statsDisplay.innerHTML = `
                <div class="api-stat">
                    <span class="stat-label">Avg Assessment</span>
                    <span class="stat-value">${formatCurrency(stats.avgValue)}</span>
                </div>
                <div class="api-stat">
                    <span class="stat-label">Properties</span>
                    <span class="stat-value">${stats.propertyCount.toLocaleString()}</span>
                </div>
                <div class="api-stat">
                    <span class="stat-label">Range</span>
                    <span class="stat-value">${formatCurrency(stats.minValue)} - ${formatCurrency(stats.maxValue)}</span>
                </div>
            `;
        }
        return stats;
    }
    return null;
}

/**
 * Initialize API integrations on page load
 */
async function initializeApiIntegrations() {
    console.log('🔌 Initializing Calgary Property Analyzer API integrations...');

    // Check API status
    const status = await checkApiStatus();
    console.log('📡 API Status:', status);

    // Update UI with API status
    updateApiStatusIndicator(status);

    // Fetch current mortgage rates
    if (status.bankOfCanada.available) {
        const rates = await updateRateFromBankOfCanada();
        if (rates) {
            console.log('✅ Bank of Canada rates loaded:', rates);
        }
    }

    // Load RapidAPI key from storage
    getRapidApiKey();

    return status;
}

/**
 * Update API status indicator in header
 */
function updateApiStatusIndicator(status) {
    let indicator = document.getElementById('apiStatusIndicator');
    if (!indicator) {
        // Create indicator if it doesn't exist
        const header = document.querySelector('.header-actions');
        if (header) {
            indicator = document.createElement('div');
            indicator.id = 'apiStatusIndicator';
            indicator.className = 'api-status-indicator';
            header.insertBefore(indicator, header.firstChild);
        }
    }

    if (indicator) {
        // Show "Live Data" if Bank of Canada is available (primary data source)
        const bankAvailable = status.bankOfCanada.available;
        const bothAvailable = status.calgaryOpenData.available && status.bankOfCanada.available;

        let statusClass = 'status-disconnected';
        let statusText = 'Offline';

        if (bothAvailable) {
            statusClass = 'status-connected';
            statusText = 'Live Data';
        } else if (bankAvailable) {
            statusClass = 'status-connected';
            statusText = 'Live Rates';
        }

        indicator.className = `api-status-indicator ${statusClass}`;
        indicator.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">${statusText}</span>
        `;
        indicator.title = `Calgary Open Data: ${status.calgaryOpenData.available ? '✓' : '✗'}\nBank of Canada: ${status.bankOfCanada.available ? '✓' : '✗'}`;
    }
}

// Export for use in other modules
window.CalgaryAPI = {
    // Calgary Open Data
    fetchCalgaryPropertyAssessments,
    getCommunityAssessmentStats,
    getCalgaryCommunitiesList,

    // Bank of Canada
    fetchBankOfCanadaRates,
    fetchHistoricalMortgageRates,
    updateRateFromBankOfCanada,

    // RapidAPI
    setRapidApiKey,
    getRapidApiKey,
    searchCalgaryListings,

    // Utilities
    checkApiStatus,
    initializeApiIntegrations,
    loadNeighborhoodStats
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApiIntegrations);
} else {
    // DOM already loaded
    setTimeout(initializeApiIntegrations, 100);
}
