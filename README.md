# Calgary Property Analyzer

🏠 **Investment analysis tool for Calgary real estate** — built with live market data and modern UI.

**🔗 Live Demo: [nggsam.github.io/calgary-property-analyzer](https://nggsam.github.io/calgary-property-analyzer/)**

---

## ✅ Completed

- [x] **Interactive Neighborhood Map** — SVG map with 30+ Calgary neighborhoods, color-coded by investment score
- [x] **Premium Hover Cards** — Glassmorphism design, animated score rings, stats grid with icons
- [x] **Investment Score Panel** — Matching premium styling with score legend and top picks
- [x] **Property Calculator** — Full investment analysis with cap rate, cash-on-cash, IRR, DSCR
- [x] **Scenario Analysis** — Interest rate sensitivity, vacancy stress tests
- [x] **BRRRR Calculator** — Buy, Rehab, Rent, Refinance, Repeat workflow
- [x] **Portfolio Tracker** — Track multiple properties
- [x] **Mobile Responsive** — Touch-friendly, stacked layouts, scrollable nav
- [x] **GitHub Pages Deployment** — Auto-deploy on push

---

## 🚧 In Progress

### Live Data Integration (Free Tier)
Building a data pipeline using free sources:

| Source | Data | Frequency |
|--------|------|-----------|
| Calgary Open Data | Property assessments | Annual |
| CMHC | Vacancy rates, rents | Annual |
| Rentals.ca | Market rent reports | Monthly |

**Architecture:**
```
GitHub Actions (monthly cron)
    ↓
scripts/data-fetcher.js
    ↓
data/calgary-neighborhoods.json
    ↓
Frontend loads fresh data
```

---

## 📋 Roadmap

### Phase 1: Data Pipeline
- [ ] Create `DataProvider` abstraction layer
- [ ] Integrate Calgary Open Data SODA API
- [ ] Parse CMHC Excel data
- [ ] Add GitHub Actions workflow for monthly updates

### Phase 2: AI Features
- [ ] Natural language search ("neighborhoods under $500K with 5%+ cap rate")
- [ ] AI deal analysis (paste listing URL → full analysis)
- [ ] Investment report generator (PDF export)

### Phase 3: Premium Data (Optional)
- [ ] Houski API integration (~$99/mo) for daily updates
- [ ] Real-time rental listing data

---

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (no framework)
- **Styling**: Custom CSS with glassmorphism, CSS variables
- **Hosting**: GitHub Pages (free)
- **Data**: Static JSON (updates via GitHub Actions)

---

## 🚀 Local Development

```bash
# Clone and run
git clone https://github.com/nggsam/calgary-property-analyzer.git
cd calgary-property-analyzer
python3 -m http.server 8080

# Open http://localhost:8080
```

---

## 📄 License

MIT
