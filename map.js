// ============================================
// CALGARY INTERACTIVE NEIGHBORHOOD MAP
// ============================================
// 30 Major Calgary Communities with Investment Data

const CALGARY_NEIGHBORHOODS = {
    // NORTHWEST QUADRANT
    'bowness': {
        name: 'Bowness',
        quadrant: 'NW',
        avgPrice: 485000,
        avgRent: 2100,
        capRate: 5.2,
        vacancyRate: 4.5,
        priceGrowth: 3.2,
        investmentScore: 72,
        description: 'Affordable river community with strong rental demand'
    },
    'brentwood': {
        name: 'Brentwood',
        quadrant: 'NW',
        avgPrice: 520000,
        avgRent: 2200,
        capRate: 5.1,
        vacancyRate: 3.8,
        priceGrowth: 4.1,
        investmentScore: 75,
        description: 'Near university, excellent transit access'
    },
    'kensington': {
        name: 'Kensington',
        quadrant: 'NW',
        avgPrice: 625000,
        avgRent: 2600,
        capRate: 5.0,
        vacancyRate: 2.9,
        priceGrowth: 4.8,
        investmentScore: 78,
        description: 'Trendy urban village with walkable amenities'
    },
    'dalhousie': {
        name: 'Dalhousie',
        quadrant: 'NW',
        avgPrice: 495000,
        avgRent: 2150,
        capRate: 5.2,
        vacancyRate: 4.2,
        priceGrowth: 3.5,
        investmentScore: 74,
        description: 'Family-friendly with C-Train access'
    },
    'varsity': {
        name: 'Varsity',
        quadrant: 'NW',
        avgPrice: 540000,
        avgRent: 2300,
        capRate: 5.1,
        vacancyRate: 3.5,
        priceGrowth: 3.8,
        investmentScore: 76,
        description: 'Close to U of C, steady rental market'
    },
    'ranchlands': {
        name: 'Ranchlands',
        quadrant: 'NW',
        avgPrice: 420000,
        avgRent: 1950,
        capRate: 5.6,
        vacancyRate: 4.8,
        priceGrowth: 2.9,
        investmentScore: 70,
        description: 'Affordable starter homes, good yields'
    },

    // NORTHEAST QUADRANT
    'bridgeland': {
        name: 'Bridgeland',
        quadrant: 'NE',
        avgPrice: 595000,
        avgRent: 2450,
        capRate: 4.9,
        vacancyRate: 3.2,
        priceGrowth: 5.2,
        investmentScore: 80,
        description: 'Gentrifying inner-city gem near downtown'
    },
    'renfrew': {
        name: 'Renfrew',
        quadrant: 'NE',
        avgPrice: 560000,
        avgRent: 2350,
        capRate: 5.0,
        vacancyRate: 3.5,
        priceGrowth: 4.5,
        investmentScore: 77,
        description: 'Character homes, strong appreciation'
    },
    'marlborough': {
        name: 'Marlborough',
        quadrant: 'NE',
        avgPrice: 385000,
        avgRent: 1800,
        capRate: 5.6,
        vacancyRate: 5.5,
        priceGrowth: 2.5,
        investmentScore: 68,
        description: 'Budget-friendly with solid cash flow'
    },
    'pineridge': {
        name: 'Pineridge',
        quadrant: 'NE',
        avgPrice: 395000,
        avgRent: 1850,
        capRate: 5.6,
        vacancyRate: 5.2,
        priceGrowth: 2.8,
        investmentScore: 69,
        description: 'Established community, transit accessible'
    },
    'whitehorn': {
        name: 'Whitehorn',
        quadrant: 'NE',
        avgPrice: 410000,
        avgRent: 1900,
        capRate: 5.6,
        vacancyRate: 5.0,
        priceGrowth: 2.7,
        investmentScore: 69,
        description: 'C-Train access, diverse community'
    },
    'saddleridge': {
        name: 'Saddleridge',
        quadrant: 'NE',
        avgPrice: 445000,
        avgRent: 2050,
        capRate: 5.5,
        vacancyRate: 4.5,
        priceGrowth: 3.2,
        investmentScore: 71,
        description: 'Newer development, growing amenities'
    },

    // SOUTHWEST QUADRANT
    'marda-loop': {
        name: 'Marda Loop',
        quadrant: 'SW',
        avgPrice: 695000,
        avgRent: 2800,
        capRate: 4.8,
        vacancyRate: 2.5,
        priceGrowth: 5.5,
        investmentScore: 82,
        description: 'Premium urban lifestyle destination'
    },
    'altadore': {
        name: 'Altadore',
        quadrant: 'SW',
        avgPrice: 750000,
        avgRent: 2900,
        capRate: 4.6,
        vacancyRate: 2.2,
        priceGrowth: 5.8,
        investmentScore: 83,
        description: 'High-end family area, strong appreciation'
    },
    'killarney': {
        name: 'Killarney',
        quadrant: 'SW',
        avgPrice: 580000,
        avgRent: 2400,
        capRate: 5.0,
        vacancyRate: 3.0,
        priceGrowth: 4.5,
        investmentScore: 78,
        description: 'Inner-city character with redevelopment'
    },
    'bankview': {
        name: 'Bankview',
        quadrant: 'SW',
        avgPrice: 545000,
        avgRent: 2250,
        capRate: 4.9,
        vacancyRate: 3.5,
        priceGrowth: 4.2,
        investmentScore: 76,
        description: 'Downtown views, walkable to 17th Ave'
    },
    'mission': {
        name: 'Mission',
        quadrant: 'SW',
        avgPrice: 620000,
        avgRent: 2550,
        capRate: 4.9,
        vacancyRate: 2.8,
        priceGrowth: 4.8,
        investmentScore: 79,
        description: 'Urban hotspot on 4th Street'
    },
    'shawnessy': {
        name: 'Shawnessy',
        quadrant: 'SW',
        avgPrice: 465000,
        avgRent: 2050,
        capRate: 5.3,
        vacancyRate: 4.0,
        priceGrowth: 3.2,
        investmentScore: 73,
        description: 'Suburban hub with great amenities'
    },
    'woodbine': {
        name: 'Woodbine',
        quadrant: 'SW',
        avgPrice: 510000,
        avgRent: 2200,
        capRate: 5.2,
        vacancyRate: 3.8,
        priceGrowth: 3.5,
        investmentScore: 74,
        description: 'Family-friendly with Fish Creek access'
    },
    'evergreen': {
        name: 'Evergreen',
        quadrant: 'SW',
        avgPrice: 530000,
        avgRent: 2250,
        capRate: 5.1,
        vacancyRate: 3.5,
        priceGrowth: 3.8,
        investmentScore: 75,
        description: 'Modern amenities, Shawnessy C-Train'
    },

    // SOUTHEAST QUADRANT
    'inglewood': {
        name: 'Inglewood',
        quadrant: 'SE',
        avgPrice: 585000,
        avgRent: 2400,
        capRate: 4.9,
        vacancyRate: 3.0,
        priceGrowth: 5.5,
        investmentScore: 81,
        description: 'Artsy, historic, rapidly appreciating'
    },
    'ramsay': {
        name: 'Ramsay',
        quadrant: 'SE',
        avgPrice: 560000,
        avgRent: 2350,
        capRate: 5.0,
        vacancyRate: 3.2,
        priceGrowth: 5.0,
        investmentScore: 79,
        description: 'Adjacent to Inglewood, great views'
    },
    'forest-lawn': {
        name: 'Forest Lawn',
        quadrant: 'SE',
        avgPrice: 350000,
        avgRent: 1650,
        capRate: 5.7,
        vacancyRate: 6.0,
        priceGrowth: 2.2,
        investmentScore: 65,
        description: 'Most affordable, highest yields'
    },
    'dover': {
        name: 'Dover',
        quadrant: 'SE',
        avgPrice: 370000,
        avgRent: 1700,
        capRate: 5.5,
        vacancyRate: 5.8,
        priceGrowth: 2.5,
        investmentScore: 66,
        description: 'Value play with upside potential'
    },
    'mckenzie-towne': {
        name: 'McKenzie Towne',
        quadrant: 'SE',
        avgPrice: 495000,
        avgRent: 2150,
        capRate: 5.2,
        vacancyRate: 3.8,
        priceGrowth: 3.8,
        investmentScore: 75,
        description: 'New urbanist community, family-friendly'
    },
    'auburn-bay': {
        name: 'Auburn Bay',
        quadrant: 'SE',
        avgPrice: 520000,
        avgRent: 2250,
        capRate: 5.2,
        vacancyRate: 3.5,
        priceGrowth: 4.0,
        investmentScore: 76,
        description: 'Lake community with premium amenities'
    },
    'mahogany': {
        name: 'Mahogany',
        quadrant: 'SE',
        avgPrice: 545000,
        avgRent: 2300,
        capRate: 5.1,
        vacancyRate: 3.2,
        priceGrowth: 4.2,
        investmentScore: 77,
        description: 'Newest lake community, strong demand'
    },

    // DOWNTOWN / BELTLINE
    'downtown': {
        name: 'Downtown',
        quadrant: 'Central',
        avgPrice: 425000,
        avgRent: 1950,
        capRate: 5.5,
        vacancyRate: 8.0,
        priceGrowth: 2.0,
        investmentScore: 62,
        description: 'High vacancy but redevelopment potential'
    },
    'beltline': {
        name: 'Beltline',
        quadrant: 'Central',
        avgPrice: 385000,
        avgRent: 1850,
        capRate: 5.8,
        vacancyRate: 6.5,
        priceGrowth: 2.5,
        investmentScore: 68,
        description: 'Urban living hub, young professionals'
    },
    'victoria-park': {
        name: 'Victoria Park',
        quadrant: 'Central',
        avgPrice: 410000,
        avgRent: 1900,
        capRate: 5.6,
        vacancyRate: 5.5,
        priceGrowth: 3.0,
        investmentScore: 70,
        description: 'Events district, Stampede grounds'
    }
};

// Get investment score color
function getScoreColor(score) {
    if (score >= 80) return '#10b981'; // Excellent - Green
    if (score >= 75) return '#22c55e'; // Good - Light green
    if (score >= 70) return '#84cc16'; // Above average - Lime
    if (score >= 65) return '#eab308'; // Average - Yellow
    if (score >= 60) return '#f97316'; // Below average - Orange
    return '#ef4444'; // Poor - Red
}

// Get quadrant color
function getQuadrantColor(quadrant) {
    const colors = {
        'NW': '#8b5cf6', // Purple
        'NE': '#3b82f6', // Blue
        'SW': '#10b981', // Green
        'SE': '#f59e0b', // Amber
        'Central': '#ec4899' // Pink
    };
    return colors[quadrant] || '#6b7280';
}

// Format currency
function formatMapCurrency(value) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0
    }).format(value);
}

// Create the neighborhood map SVG - PROPER CALGARY LAYOUT
// Neighborhoods form a cohesive city shape with connected boundaries
function createNeighborhoodMapSVG() {
    // Grid-based layout where neighborhoods connect to form Calgary's shape
    // Calgary is roughly circular with downtown in the center
    // Bow River runs through the middle from NW to SE

    const neighborhoodPaths = {
        // ========== NORTHWEST QUADRANT (top-left) ==========
        'ranchlands': 'M 40,60 L 95,60 L 95,95 L 40,95 Z',
        'dalhousie': 'M 95,60 L 150,60 L 150,95 L 95,95 Z',
        'varsity': 'M 150,60 L 205,60 L 205,95 L 150,95 Z',
        'brentwood': 'M 95,95 L 150,95 L 150,130 L 95,130 Z',
        'bowness': 'M 40,95 L 95,95 L 95,130 L 40,130 Z',
        'kensington': 'M 150,95 L 205,95 L 205,130 L 150,130 Z',

        // ========== NORTHEAST QUADRANT (top-right) ==========
        'saddleridge': 'M 305,60 L 360,60 L 360,95 L 305,95 Z',
        'whitehorn': 'M 360,60 L 415,60 L 415,95 L 360,95 Z',
        'pineridge': 'M 305,95 L 360,95 L 360,130 L 305,130 Z',
        'marlborough': 'M 360,95 L 415,95 L 415,130 L 360,130 Z',
        'bridgeland': 'M 250,95 L 305,95 L 305,130 L 250,130 Z',
        'renfrew': 'M 250,130 L 305,130 L 305,165 L 250,165 Z',

        // ========== CENTRAL / DOWNTOWN (middle) ==========
        'downtown': 'M 205,130 L 250,130 L 250,165 L 205,165 Z',
        'beltline': 'M 205,165 L 250,165 L 250,200 L 205,200 Z',
        'victoria-park': 'M 250,165 L 305,165 L 305,200 L 250,200 Z',

        // ========== SOUTHWEST QUADRANT (bottom-left) ==========
        'bankview': 'M 150,130 L 205,130 L 205,165 L 150,165 Z',
        'killarney': 'M 95,130 L 150,130 L 150,165 L 95,165 Z',
        'marda-loop': 'M 150,165 L 205,165 L 205,200 L 150,200 Z',
        'mission': 'M 150,200 L 205,200 L 205,235 L 150,235 Z',
        'altadore': 'M 95,200 L 150,200 L 150,235 L 95,235 Z',
        'woodbine': 'M 95,235 L 150,235 L 150,270 L 95,270 Z',
        'shawnessy': 'M 95,270 L 150,270 L 150,305 L 95,305 Z',
        'evergreen': 'M 150,270 L 205,270 L 205,305 L 150,305 Z',

        // ========== SOUTHEAST QUADRANT (bottom-right) ==========
        'inglewood': 'M 250,200 L 305,200 L 305,235 L 250,235 Z',
        'ramsay': 'M 205,200 L 250,200 L 250,235 L 205,235 Z',
        'forest-lawn': 'M 305,165 L 360,165 L 360,200 L 305,200 Z',
        'dover': 'M 305,200 L 360,200 L 360,235 L 305,235 Z',
        'mckenzie-towne': 'M 250,270 L 305,270 L 305,305 L 250,305 Z',
        'auburn-bay': 'M 305,270 L 360,270 L 360,305 L 305,305 Z',
        'mahogany': 'M 360,270 L 415,270 L 415,305 L 360,305 Z'
    };

    return neighborhoodPaths;
}

// Generate the map HTML with city outline and proper styling
function generateNeighborhoodMap() {
    const paths = createNeighborhoodMapSVG();

    let svgContent = `
        <svg viewBox="0 0 455 365" class="calgary-map-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Glow filter for hover effect -->
                <filter id="map-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                
                <!-- Background gradient -->
                <linearGradient id="map-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0f172a"/>
                    <stop offset="50%" style="stop-color:#1e293b"/>
                    <stop offset="100%" style="stop-color:#0f172a"/>
                </linearGradient>
                
                <!-- River gradient -->
                <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.3"/>
                    <stop offset="50%" style="stop-color:#38bdf8;stop-opacity:0.5"/>
                    <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:0.3"/>
                </linearGradient>
            </defs>
            
            <!-- Background -->
            <rect x="0" y="0" width="455" height="365" fill="url(#map-bg-gradient)" rx="16"/>
            
            <!-- City outline shape -->
            <path d="M 30,50 
                     L 180,45 L 270,45 L 425,50
                     L 430,100 L 425,180 L 420,260 L 415,315
                     L 360,320 L 250,320 L 140,315
                     L 85,310 L 35,300
                     L 30,220 L 35,140 Z" 
                  fill="#1e3a5f" 
                  fill-opacity="0.3"
                  stroke="#334155"
                  stroke-width="2"
                  stroke-dasharray="4,2"/>
            
            <!-- Bow River (stylized) -->
            <path d="M 30,120 
                     Q 100,115 150,130 
                     Q 200,145 250,140 
                     Q 300,135 350,150
                     Q 400,165 430,180"
                  fill="none"
                  stroke="url(#river-gradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  opacity="0.6"/>
            
            <!-- Section divider line (shows quadrant split) -->
            <line x1="227" y1="45" x2="227" y2="320" stroke="#475569" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
            <line x1="30" y1="165" x2="425" y2="165" stroke="#475569" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
            
            <!-- Quadrant labels -->
            <text x="70" y="50" class="quadrant-label" fill="#8b5cf6">NW</text>
            <text x="380" y="50" class="quadrant-label" fill="#3b82f6">NE</text>
            <text x="70" y="330" class="quadrant-label" fill="#10b981">SW</text>
            <text x="380" y="330" class="quadrant-label" fill="#f59e0b">SE</text>
            
            <!-- Neighborhood cells -->
    `;

    // Add neighborhood rectangles
    for (const [id, path] of Object.entries(paths)) {
        const hood = CALGARY_NEIGHBORHOODS[id];
        const fillColor = getScoreColor(hood.investmentScore);
        svgContent += `
            <path 
                id="hood-${id}" 
                d="${path}" 
                class="neighborhood-path"
                fill="${fillColor}"
                fill-opacity="0.7"
                stroke="#0f172a"
                stroke-width="1.5"
                data-neighborhood="${id}"
                data-name="${hood.name}"
            />
        `;
    }

    // Add neighborhood name labels - centered in each cell
    const labelPositions = {
        // NW
        'ranchlands': [67, 82], 'dalhousie': [122, 82], 'varsity': [177, 82],
        'bowness': [67, 117], 'brentwood': [122, 117], 'kensington': [177, 117],
        // NE
        'saddleridge': [332, 82], 'whitehorn': [387, 82],
        'pineridge': [332, 117], 'marlborough': [387, 117],
        'bridgeland': [277, 117], 'renfrew': [277, 152],
        // Central
        'downtown': [227, 152], 'beltline': [227, 187], 'victoria-park': [277, 187],
        // SW
        'bankview': [177, 152], 'killarney': [122, 152],
        'marda-loop': [177, 187], 'mission': [177, 222],
        'altadore': [122, 222], 'woodbine': [122, 257],
        'shawnessy': [122, 292], 'evergreen': [177, 292],
        // SE
        'inglewood': [277, 222], 'ramsay': [227, 222],
        'forest-lawn': [332, 187], 'dover': [332, 222],
        'mckenzie-towne': [277, 292], 'auburn-bay': [332, 292], 'mahogany': [387, 292]
    };

    for (const [id, [x, y]] of Object.entries(labelPositions)) {
        if (CALGARY_NEIGHBORHOODS[id]) {
            svgContent += `
                <text 
                    x="${x}" 
                    y="${y}" 
                    class="neighborhood-label"
                    data-neighborhood="${id}"
                >${CALGARY_NEIGHBORHOODS[id].name}</text>
            `;
        }
    }

    // Add Downtown marker
    svgContent += `
        <circle cx="227" cy="147" r="4" fill="#ec4899" opacity="0.8"/>
        <text x="227" y="143" class="downtown-marker" text-anchor="middle" fill="#ec4899" font-size="8" font-weight="600">★</text>
    `;

    svgContent += '</svg>';
    return svgContent;
}


// Create the hover info card HTML - PREMIUM DESIGN
function createHoverCard() {
    return `
        <div id="neighborhoodHoverCard" class="neighborhood-hover-card">
            <!-- Gradient accent bar at top -->
            <div class="hover-card-accent"></div>
            
            <!-- Header with name and quadrant -->
            <div class="hover-card-header">
                <div class="hover-header-left">
                    <h4 id="hoverNeighborhoodName">Neighborhood</h4>
                    <span class="hover-quadrant-text" id="hoverQuadrantText">Northwest Calgary</span>
                </div>
                <span id="hoverQuadrant" class="quadrant-badge">NW</span>
            </div>
            
            <!-- Investment Score with animated SVG ring -->
            <div class="hover-card-score-section">
                <div class="score-ring-container">
                    <svg class="score-ring-svg" viewBox="0 0 80 80">
                        <circle class="score-ring-bg" cx="40" cy="40" r="34" />
                        <circle class="score-ring-progress" id="hoverScoreRing" cx="40" cy="40" r="34" 
                            stroke-dasharray="213.6" stroke-dashoffset="53.4" />
                    </svg>
                    <div class="score-ring-value">
                        <span class="score-number" id="hoverScore">75</span>
                        <span class="score-max">/100</span>
                    </div>
                </div>
                <div class="score-info">
                    <span class="score-label-text">Investment Score</span>
                    <span class="score-rating" id="hoverScoreRating">Good Investment</span>
                </div>
            </div>
            
            <!-- Key Stats Grid -->
            <div class="hover-card-stats">
                <div class="hover-stat-item">
                    <div class="stat-icon-wrapper price-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <div class="stat-text">
                        <span class="stat-label">Avg Price</span>
                        <span class="stat-value" id="hoverPrice">$485,000</span>
                    </div>
                </div>
                <div class="hover-stat-item">
                    <div class="stat-icon-wrapper rent-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <div class="stat-text">
                        <span class="stat-label">Avg Rent</span>
                        <span class="stat-value" id="hoverRent">$2,100/mo</span>
                    </div>
                </div>
                <div class="hover-stat-item highlight">
                    <div class="stat-icon-wrapper cap-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                            <polyline points="17 6 23 6 23 12"/>
                        </svg>
                    </div>
                    <div class="stat-text">
                        <span class="stat-label">Cap Rate</span>
                        <span class="stat-value success" id="hoverCapRate">5.2%</span>
                    </div>
                </div>
                <div class="hover-stat-item">
                    <div class="stat-icon-wrapper vacancy-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                    </div>
                    <div class="stat-text">
                        <span class="stat-label">Vacancy</span>
                        <span class="stat-value" id="hoverVacancy">4.5%</span>
                    </div>
                </div>
            </div>
            
            <!-- Description -->
            <p class="hover-card-description" id="hoverDescription">
                Affordable river community with strong rental demand
            </p>
            
            <!-- Call to Action -->
            <button class="hover-card-cta">
                <span>Analyze This Neighborhood</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
            </button>
        </div>
    `;
}


// Initialize the interactive map
function initializeNeighborhoodMap() {
    const mapContainer = document.getElementById('calgaryMapContainer');
    if (!mapContainer) return;

    // Generate and insert the map
    mapContainer.innerHTML = generateNeighborhoodMap() + createHoverCard();

    const hoverCard = document.getElementById('neighborhoodHoverCard');
    const paths = document.querySelectorAll('.neighborhood-path');
    const labels = document.querySelectorAll('.neighborhood-label');

    // Add hover event listeners to paths
    paths.forEach(path => {
        path.addEventListener('mouseenter', (e) => {
            const neighborhoodId = e.target.dataset.neighborhood;
            showNeighborhoodHover(neighborhoodId, e);
        });

        path.addEventListener('mousemove', (e) => {
            moveHoverCard(e);
        });

        path.addEventListener('mouseleave', () => {
            hideNeighborhoodHover();
        });

        path.addEventListener('click', (e) => {
            const neighborhoodId = e.target.dataset.neighborhood;
            selectNeighborhood(neighborhoodId);
        });
    });

    // Add hover events to labels too
    labels.forEach(label => {
        label.addEventListener('mouseenter', (e) => {
            const neighborhoodId = e.target.dataset.neighborhood;
            const path = document.getElementById(`hood-${neighborhoodId}`);
            if (path) {
                path.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            }
        });

        label.addEventListener('click', (e) => {
            const neighborhoodId = e.target.dataset.neighborhood;
            selectNeighborhood(neighborhoodId);
        });
    });
}

// Show hover card with neighborhood data
function showNeighborhoodHover(neighborhoodId, event) {
    const hood = CALGARY_NEIGHBORHOODS[neighborhoodId];
    if (!hood) return;

    const card = document.getElementById('neighborhoodHoverCard');
    const path = document.getElementById(`hood-${neighborhoodId}`);

    // Highlight the path
    document.querySelectorAll('.neighborhood-path').forEach(p => p.classList.remove('active'));
    if (path) path.classList.add('active');

    // Get quadrant full name
    const quadrantNames = {
        'NW': 'Northwest Calgary',
        'NE': 'Northeast Calgary',
        'SW': 'Southwest Calgary',
        'SE': 'Southeast Calgary'
    };

    // Get score rating text and class
    let scoreRating, scoreClass;
    if (hood.investmentScore >= 80) {
        scoreRating = 'Excellent Investment';
        scoreClass = 'excellent';
    } else if (hood.investmentScore >= 75) {
        scoreRating = 'Good Investment';
        scoreClass = 'good';
    } else if (hood.investmentScore >= 70) {
        scoreRating = 'Average';
        scoreClass = 'average';
    } else if (hood.investmentScore >= 65) {
        scoreRating = 'Below Average';
        scoreClass = 'below';
    } else {
        scoreRating = 'Poor Investment';
        scoreClass = 'poor';
    }

    // Update card content
    document.getElementById('hoverNeighborhoodName').textContent = hood.name;
    document.getElementById('hoverQuadrant').textContent = hood.quadrant;
    document.getElementById('hoverQuadrant').style.background = getQuadrantColor(hood.quadrant);

    // New elements
    const quadrantTextEl = document.getElementById('hoverQuadrantText');
    if (quadrantTextEl) quadrantTextEl.textContent = quadrantNames[hood.quadrant] || hood.quadrant;

    const scoreRatingEl = document.getElementById('hoverScoreRating');
    if (scoreRatingEl) {
        scoreRatingEl.textContent = scoreRating;
        scoreRatingEl.className = 'score-rating ' + scoreClass;
    }

    // Update score and SVG ring
    document.getElementById('hoverScore').textContent = hood.investmentScore;

    // Calculate stroke-dashoffset for the SVG ring (circumference = 2 * PI * 34 ≈ 213.6)
    const circumference = 213.6;
    const progress = hood.investmentScore / 100;
    const offset = circumference * (1 - progress);
    const scoreRing = document.getElementById('hoverScoreRing');
    if (scoreRing) {
        scoreRing.style.strokeDashoffset = offset;
        scoreRing.style.stroke = getScoreColor(hood.investmentScore);
    }

    // Stats
    document.getElementById('hoverPrice').textContent = formatMapCurrency(hood.avgPrice);
    document.getElementById('hoverRent').textContent = formatMapCurrency(hood.avgRent) + '/mo';
    document.getElementById('hoverCapRate').textContent = hood.capRate.toFixed(1) + '%';
    document.getElementById('hoverVacancy').textContent = hood.vacancyRate.toFixed(1) + '%';
    document.getElementById('hoverDescription').textContent = hood.description;

    // Position and show card
    moveHoverCard(event);
    card.classList.add('visible');
}


// Move hover card with cursor
function moveHoverCard(event) {
    const card = document.getElementById('neighborhoodHoverCard');
    const mapContainer = document.getElementById('calgaryMapContainer');
    const containerRect = mapContainer.getBoundingClientRect();

    let x = event.clientX - containerRect.left + 20;
    let y = event.clientY - containerRect.top - 10;

    // Keep card within container bounds
    const cardWidth = 320; // Match the CSS width
    const cardHeight = 400; // Account for full card height with all elements

    // If card would overflow right, show on left of cursor
    if (x + cardWidth > containerRect.width) {
        x = event.clientX - containerRect.left - cardWidth - 20;
    }

    // Ensure card doesn't clip off left edge
    if (x < 10) x = 10;

    // Ensure card doesn't clip off bottom
    if (y + cardHeight > containerRect.height) {
        y = containerRect.height - cardHeight - 10;
    }

    // Ensure card doesn't clip off top
    if (y < 10) y = 10;

    card.style.left = x + 'px';
    card.style.top = y + 'px';
}

// Hide hover card
function hideNeighborhoodHover() {
    document.getElementById('neighborhoodHoverCard').classList.remove('visible');
    document.querySelectorAll('.neighborhood-path').forEach(p => p.classList.remove('active'));
}

// Select a neighborhood and populate calculator
function selectNeighborhood(neighborhoodId) {
    const hood = CALGARY_NEIGHBORHOODS[neighborhoodId];
    if (!hood) return;

    // Populate calculator inputs
    const priceInput = document.getElementById('purchasePrice');
    const rentInput = document.getElementById('monthlyRent');
    const vacancyInput = document.getElementById('vacancyRate');
    const neighborhoodSelect = document.getElementById('neighborhood');

    if (priceInput) priceInput.value = hood.avgPrice;
    if (rentInput) rentInput.value = hood.avgRent;
    if (vacancyInput) vacancyInput.value = hood.vacancyRate;

    // Try to match neighborhood in select
    if (neighborhoodSelect) {
        const matchingOption = Array.from(neighborhoodSelect.options).find(
            opt => opt.text.toLowerCase().includes(hood.name.toLowerCase()) ||
                hood.name.toLowerCase().includes(opt.text.toLowerCase())
        );
        if (matchingOption) {
            neighborhoodSelect.value = matchingOption.value;
        }
    }

    // Scroll to calculator
    const calculator = document.getElementById('calculator');
    if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Trigger analysis
    setTimeout(() => {
        const analyzeBtn = document.querySelector('.btn-analyze');
        if (analyzeBtn) analyzeBtn.click();
    }, 500);

    // Show toast notification
    showMapToast(`${hood.name} selected! Analyzing...`);
}

// Show toast notification
function showMapToast(message) {
    let toast = document.getElementById('mapToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mapToast';
        toast.className = 'map-toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

// Get sorted neighborhoods by score
function getTopNeighborhoods(limit = 5) {
    return Object.entries(CALGARY_NEIGHBORHOODS)
        .sort((a, b) => b[1].investmentScore - a[1].investmentScore)
        .slice(0, limit)
        .map(([id, data]) => ({ id, ...data }));
}

// Get neighborhoods by quadrant
function getNeighborhoodsByQuadrant(quadrant) {
    return Object.entries(CALGARY_NEIGHBORHOODS)
        .filter(([id, data]) => data.quadrant === quadrant)
        .map(([id, data]) => ({ id, ...data }));
}

// ============================================
// FLEXIBLE DATA UPDATE SYSTEM
// ============================================

// Track when data was last updated
let lastDataUpdate = new Date().toISOString();

/**
 * Update neighborhood data programmatically
 * @param {string} neighborhoodId - ID of the neighborhood to update
 * @param {Object} data - New data to merge
 */
function updateNeighborhoodData(neighborhoodId, data) {
    if (CALGARY_NEIGHBORHOODS[neighborhoodId]) {
        Object.assign(CALGARY_NEIGHBORHOODS[neighborhoodId], data);
        lastDataUpdate = new Date().toISOString();
        refreshMapVisuals();
        console.log(`✅ Updated ${neighborhoodId} data:`, data);
    }
}

/**
 * Bulk update multiple neighborhoods
 * @param {Object} updates - Object with neighborhoodId: data pairs
 */
function bulkUpdateNeighborhoods(updates) {
    for (const [id, data] of Object.entries(updates)) {
        if (CALGARY_NEIGHBORHOODS[id]) {
            Object.assign(CALGARY_NEIGHBORHOODS[id], data);
        }
    }
    lastDataUpdate = new Date().toISOString();
    refreshMapVisuals();
    console.log(`✅ Bulk updated ${Object.keys(updates).length} neighborhoods`);
}

/**
 * Fetch fresh data from Calgary Open Data API
 * Falls back to cached data if API unavailable
 */
async function fetchFreshNeighborhoodData() {
    console.log('🔄 Fetching fresh neighborhood data...');

    try {
        // Try Calgary Open Data API for assessment data
        if (window.CalgaryAPI && typeof window.CalgaryAPI.getCommunityAssessmentStats === 'function') {
            const communities = Object.keys(CALGARY_NEIGHBORHOODS);
            let updated = 0;

            for (const id of communities.slice(0, 5)) { // Limit to avoid rate limits
                const hood = CALGARY_NEIGHBORHOODS[id];
                const stats = await window.CalgaryAPI.getCommunityAssessmentStats(hood.name);

                if (stats && stats.avgValue) {
                    hood.avgPrice = Math.round(stats.avgValue);
                    hood.capRate = calculateCapRate(hood.avgPrice, hood.avgRent);
                    updated++;
                }
            }

            if (updated > 0) {
                lastDataUpdate = new Date().toISOString();
                refreshMapVisuals();
                console.log(`✅ Updated ${updated} neighborhoods with live data`);
                showMapToast(`Updated ${updated} neighborhoods with live data`);
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not fetch fresh data, using cached values');
    }

    return lastDataUpdate;
}

/**
 * Calculate cap rate from price and rent
 */
function calculateCapRate(price, monthlyRent) {
    const annualRent = monthlyRent * 12;
    const operatingExpenses = annualRent * 0.35; // Estimate 35% expenses
    const noi = annualRent - operatingExpenses;
    return parseFloat(((noi / price) * 100).toFixed(1));
}

/**
 * Refresh map visuals after data update
 */
function refreshMapVisuals() {
    const paths = document.querySelectorAll('.neighborhood-path');

    paths.forEach(path => {
        const id = path.dataset.neighborhood;
        const hood = CALGARY_NEIGHBORHOODS[id];
        if (hood) {
            const color = getScoreColor(hood.investmentScore);
            path.setAttribute('fill', color);
            path.setAttribute('stroke', color);
        }
    });

    // Update the "last updated" display if it exists
    const lastUpdatedEl = document.getElementById('mapLastUpdated');
    if (lastUpdatedEl) {
        const date = new Date(lastDataUpdate);
        lastUpdatedEl.textContent = `Data updated: ${date.toLocaleDateString()}`;
    }
}

/**
 * Load custom data from JSON URL or localStorage
 */
async function loadCustomData(source) {
    if (typeof source === 'string' && source.startsWith('http')) {
        // Load from URL
        try {
            const response = await fetch(source);
            const data = await response.json();
            bulkUpdateNeighborhoods(data);
            return true;
        } catch (error) {
            console.error('Failed to load data from URL:', error);
            return false;
        }
    } else if (source === 'localStorage') {
        // Load from localStorage
        const saved = localStorage.getItem('calgaryNeighborhoodData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                bulkUpdateNeighborhoods(data);
                return true;
            } catch (error) {
                console.error('Failed to parse localStorage data');
                return false;
            }
        }
    }
    return false;
}

/**
 * Save current data to localStorage for persistence
 */
function saveDataToLocalStorage() {
    const dataToSave = {};
    for (const [id, hood] of Object.entries(CALGARY_NEIGHBORHOODS)) {
        dataToSave[id] = {
            avgPrice: hood.avgPrice,
            avgRent: hood.avgRent,
            capRate: hood.capRate,
            vacancyRate: hood.vacancyRate,
            priceGrowth: hood.priceGrowth,
            investmentScore: hood.investmentScore
        };
    }
    localStorage.setItem('calgaryNeighborhoodData', JSON.stringify(dataToSave));
    localStorage.setItem('calgaryDataUpdated', lastDataUpdate);
    console.log('💾 Saved neighborhood data to localStorage');
}

/**
 * Get the last update timestamp
 */
function getLastUpdateTime() {
    return lastDataUpdate;
}

// Export for use
window.CalgaryMap = {
    neighborhoods: CALGARY_NEIGHBORHOODS,
    initialize: initializeNeighborhoodMap,
    select: selectNeighborhood,
    getTopNeighborhoods,
    getNeighborhoodsByQuadrant,
    getScoreColor,
    formatCurrency: formatMapCurrency,

    // Data update functions
    updateNeighborhood: updateNeighborhoodData,
    bulkUpdate: bulkUpdateNeighborhoods,
    fetchFreshData: fetchFreshNeighborhoodData,
    loadCustomData,
    saveData: saveDataToLocalStorage,
    getLastUpdate: getLastUpdateTime,
    refresh: refreshMapVisuals
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNeighborhoodMap);
} else {
    setTimeout(initializeNeighborhoodMap, 200);
}
