/* ==========================================================================
   Oʻahu Trip Planner — Interactive Map, Itinerary, Food, Checklist & Car Tool
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'oahu_trip_2026_state_v1';

  const state = {
    activeTab: 'planner',
    activeDay: 'all', // 'all' or 1..7
    activeCategory: 'all',
    selectedStopId: null,
    activeFoodFilter: 'all',
    carStrategy: 'split', // 'split' (3-day Thu-Sat) | 'full' (6-day HNL)
    parkingChoice: 'banyan', // 'banyan' ($30) | 'hotel' ($63)
    checkedItems: {}
  };

  let map = null;
  let markersLayer = null;
  let routesLayer = null;
  let foodHighlightLayer = null;
  const markerByStopId = new Map();

  /* ------------------------------------------------------------------------
     Persistence
     ------------------------------------------------------------------------ */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.carStrategy === 'split' || saved.carStrategy === 'full') {
        state.carStrategy = saved.carStrategy;
      }
      if (saved.parkingChoice === 'banyan' || saved.parkingChoice === 'hotel') {
        state.parkingChoice = saved.parkingChoice;
      }
      if (saved.checkedItems && typeof saved.checkedItems === 'object') {
        state.checkedItems = saved.checkedItems;
      }
    } catch (_) {
      // Ignore storage errors
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          carStrategy: state.carStrategy,
          parkingChoice: state.parkingChoice,
          checkedItems: state.checkedItems
        })
      );
    } catch (_) {
      // Ignore storage errors
    }
  }

  /* ------------------------------------------------------------------------
     Map Initialization & Rendering
     ------------------------------------------------------------------------ */
  function initMap() {
    if (typeof L === 'undefined') {
      const mapEl = document.getElementById('oahu-map');
      if (mapEl) {
        mapEl.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:28px;text-align:center;color:#4a555e;font-size:14px;">' +
          '<div><strong style="display:block;margin-bottom:6px;color:#1a2126;">Interactive map tiles require network access</strong>' +
          'Open the live GitHub Pages site to explore the interactive Oʻahu map. All itinerary filters, food guide, checklist, and car calculator controls work right here.</div></div>';
      }
      return;
    }

    try {
      map = L.map('oahu-map', {
        center: [21.46, -157.93],
        zoom: 10,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      routesLayer = L.layerGroup().addTo(map);
      markersLayer = L.layerGroup().addTo(map);
      foodHighlightLayer = L.layerGroup().addTo(map);
    } catch (_) {
      map = null;
    }
  }

  function renderMap() {
    if (!map) return;
    routesLayer.clearLayers();
    markersLayer.clearLayers();
    foodHighlightLayer.clearLayers();
    markerByStopId.clear();

    const bounds = [];

    // Always add Hotel Renew home base pin
    const hb = TRIP_DATA.homeBase;
    const hotelIcon = L.divIcon({
      className: '',
      html: '<div class="hotel-pin" title="Hotel Renew (Home Base)">★</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });

    L.marker([hb.lat, hb.lng], { icon: hotelIcon, zIndexOffset: 500 })
      .bindPopup(
        `<div class="popup-kicker">Home Base · Waikiki</div>
         <h4 class="popup-title">${hb.name}</h4>
         <p class="popup-desc">${hb.address}<br>${hb.note}</p>`
      )
      .addTo(markersLayer);

    const visibleDays = getFilteredDays();

    visibleDays.forEach((dayObj) => {
      const routeCoords = [];
      // Start route from Hotel Renew for days 2–7
      if (dayObj.day >= 2 && dayObj.stops.length > 0) {
        routeCoords.push([hb.lat, hb.lng]);
      }

      dayObj.stops.forEach((stop, idx) => {
        routeCoords.push([stop.lat, stop.lng]);
        bounds.push([stop.lat, stop.lng]);

        const isSelected = state.selectedStopId === stop.id;
        const icon = L.divIcon({
          className: '',
          html: `<div class="custom-pin ${isSelected ? 'is-highlighted' : ''}" style="background:${dayObj.color}">${idx + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -16]
        });

        const marker = L.marker([stop.lat, stop.lng], {
          icon,
          zIndexOffset: isSelected ? 600 : 100
        }).bindPopup(
          `<div class="popup-kicker">${dayObj.shortLabel} · ${stop.time}</div>
           <h4 class="popup-title">${stop.name}</h4>
           <p class="popup-desc">${stop.description}</p>
           <div class="popup-meta">${stop.driveFromPrev}${stop.reservationRequired ? ' · ' + stop.reservationRequired : ''}</div>`
        );

        marker.on('click', () => {
          selectStop(stop.id, false);
        });

        marker.addTo(markersLayer);
        markerByStopId.set(stop.id, marker);
      });

      if (routeCoords.length >= 2) {
        L.polyline(routeCoords, {
          color: dayObj.color,
          weight: state.activeDay === 'all' ? 2.5 : 3.5,
          opacity: state.activeDay === 'all' ? 0.5 : 0.82,
          dashArray: dayObj.carInSplitMode ? null : '6 6'
        }).addTo(routesLayer);
      }
    });

    if (bounds.length > 0) {
      bounds.push([hb.lat, hb.lng]);
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
    } else {
      map.setView([21.46, -157.93], 10);
    }
  }

  function focusStopOnMap(stopId) {
    const marker = markerByStopId.get(stopId);
    if (!marker || !map) return;
    const latlng = marker.getLatLng();
    map.flyTo(latlng, Math.max(map.getZoom(), 13), { duration: 0.65 });
    marker.openPopup();
  }

  function showFoodSpotOnMap(foodId) {
    const spot = TRIP_DATA.foodSpots.find((f) => f.id === foodId);
    if (!spot) return;

    switchTab('planner');
    setTimeout(() => {
      if (!map) return;
      map.invalidateSize();
      foodHighlightLayer.clearLayers();

      const foodIcon = L.divIcon({
        className: '',
        html: '<div class="food-pin" title="' + spot.name + '">🍽</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -15]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: foodIcon, zIndexOffset: 800 })
        .bindPopup(
          `<div class="popup-kicker">${spot.area} · ${spot.price}</div>
           <h4 class="popup-title">${spot.name}</h4>
           <p class="popup-desc"><strong>Order:</strong> ${spot.dish}<br>${spot.notes}</p>
           <div class="popup-meta">${spot.access}</div>`
        )
        .addTo(foodHighlightLayer);

      map.flyTo([spot.lat, spot.lng], 14, { duration: 0.7 });
      marker.openPopup();
    }, 80);
  }

  /* ------------------------------------------------------------------------
     Filtering & Itinerary Rendering
     ------------------------------------------------------------------------ */
  function getFilteredDays() {
    return TRIP_DATA.days
      .filter((d) => state.activeDay === 'all' || d.day === state.activeDay)
      .map((d) => {
        if (state.activeCategory === 'all') return d;
        return {
          ...d,
          stops: d.stops.filter((s) => s.category === state.activeCategory)
        };
      })
      .filter((d) => d.stops.length > 0);
  }

  function renderDayPills() {
    const container = document.getElementById('day-pills');
    const allActive = state.activeDay === 'all' ? 'is-active' : '';
    let html = `<button class="day-pill ${allActive}" data-day="all">All 7 Days</button>`;

    TRIP_DATA.days.forEach((d) => {
      const active = state.activeDay === d.day ? 'is-active' : '';
      html += `
        <button class="day-pill ${active}" data-day="${d.day}">
          <span class="day-swatch" style="background:${d.color}"></span>
          ${d.shortLabel}
        </button>`;
    });

    container.innerHTML = html;
    container.querySelectorAll('.day-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.day;
        state.activeDay = val === 'all' ? 'all' : Number(val);
        state.selectedStopId = null;
        renderDayPills();
        renderItinerary();
        renderMap();
      });
    });
  }

  function renderCategoryPills() {
    const categories = [
      { id: 'all', label: 'All Stops' },
      { id: 'beach', label: 'Beaches' },
      { id: 'hike', label: 'Hikes & Views' },
      { id: 'food', label: 'Food' },
      { id: 'culture', label: 'Culture & History' },
      { id: 'adventure', label: 'Adventure' }
    ];

    const container = document.getElementById('category-pills');
    container.innerHTML = categories
      .map(
        (c) =>
          `<button class="cat-pill ${state.activeCategory === c.id ? 'is-active' : ''}" data-cat="${c.id}">${c.label}</button>`
      )
      .join('');

    container.querySelectorAll('.cat-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.dataset.cat;
        state.selectedStopId = null;
        renderCategoryPills();
        renderItinerary();
        renderMap();
      });
    });
  }

  function renderItinerary() {
    const container = document.getElementById('itinerary-list');
    const visibleDays = getFilteredDays();

    if (visibleDays.length === 0) {
      container.innerHTML = `
        <div class="day-section" style="padding:28px;text-align:center;color:var(--ink-muted);">
          No stops match this filter combination. Try switching to <strong>All 7 Days</strong> or <strong>All Stops</strong>.
        </div>`;
      return;
    }

    container.innerHTML = visibleDays
      .map((dayObj) => {
        const hasCarToday = state.carStrategy === 'full' ? true : dayObj.carInSplitMode;
        const carBadge = hasCarToday
          ? `<span class="day-badge-car needs-car">🚗 ${state.carStrategy === 'full' ? 'Rental Car (Full Trip)' : 'Car Day'}</span>`
          : `<span class="day-badge-car no-car">🚶 No Car Needed</span>`;

        const stopsHtml = dayObj.stops
          .map((stop, idx) => {
            const selected = state.selectedStopId === stop.id ? 'is-selected' : '';
            const reserveChip = stop.reservationRequired
              ? `<span class="meta-chip is-reserve">★ ${stop.reservationRequired}</span>`
              : '';
            return `
              <div class="stop-item ${selected}" data-stop-id="${stop.id}" id="stop-card-${stop.id}">
                <div class="stop-num" style="background:${dayObj.color}">${idx + 1}</div>
                <div>
                  <div class="stop-top-row">
                    <h4 class="stop-name">${stop.name}</h4>
                    <span class="stop-time">${stop.time}</span>
                  </div>
                  <p class="stop-desc">${stop.description}</p>
                  <div class="stop-meta-row">
                    <span class="meta-chip">${stop.driveFromPrev}</span>
                    <span class="meta-chip">${stop.duration}</span>
                    ${reserveChip}
                  </div>
                  ${stop.tip ? `<p class="stop-tip">${stop.tip}</p>` : ''}
                </div>
              </div>`;
          })
          .join('');

        return `
          <article class="day-section">
            <header class="day-header">
              <div class="day-header-top">
                <span class="day-date-tag">
                  <span class="day-swatch" style="background:${dayObj.color}"></span>
                  DAY ${dayObj.day} · ${dayObj.date.toUpperCase()}
                </span>
                ${carBadge}
              </div>
              <h3 class="day-title">${dayObj.theme}</h3>
              <p class="day-summary">${dayObj.summary}</p>
              ${dayObj.holidayNote ? `<div class="day-holiday-note">${dayObj.holidayNote}</div>` : ''}
            </header>
            <div class="day-stops">${stopsHtml}</div>
          </article>`;
      })
      .join('');

    container.querySelectorAll('.stop-item').forEach((el) => {
      el.addEventListener('click', () => {
        selectStop(el.dataset.stopId, true);
      });
    });
  }

  function selectStop(stopId, flyToMap) {
    state.selectedStopId = stopId;
    document.querySelectorAll('.stop-item').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.stopId === stopId);
    });

    if (flyToMap) {
      focusStopOnMap(stopId);
    } else {
      const card = document.getElementById('stop-card-' + stopId);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /* ------------------------------------------------------------------------
     Food Guide Rendering
     ------------------------------------------------------------------------ */
  function renderFoodGuide() {
    const filters = [
      { id: 'all', label: 'All Local Eats' },
      { id: 'poke', label: 'Poke' },
      { id: 'malasadas', label: 'Malasadas' },
      { id: 'shrimp', label: 'Garlic Shrimp' },
      { id: 'shave-ice', label: 'Shave Ice' },
      { id: 'plate-lunch', label: 'Plate Lunch' },
      { id: 'dinner', label: 'Sit-Down & Udon' },
      { id: 'coffee', label: 'Coffee & Brunch' }
    ];

    const filterEl = document.getElementById('food-filters');
    filterEl.innerHTML = filters
      .map(
        (f) =>
          `<button class="cat-pill ${state.activeFoodFilter === f.id ? 'is-active' : ''}" data-food-filter="${f.id}">${f.label}</button>`
      )
      .join('');

    filterEl.querySelectorAll('.cat-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeFoodFilter = btn.dataset.foodFilter;
        renderFoodGuide();
      });
    });

    const items = TRIP_DATA.foodSpots.filter(
      (f) => state.activeFoodFilter === 'all' || f.tag === state.activeFoodFilter
    );

    const grid = document.getElementById('food-grid');
    grid.innerHTML = items
      .map(
        (spot) => `
        <article class="food-card">
          <div>
            <div class="food-card-top">
              <span class="food-area">${spot.area}</span>
              <span class="food-price">${spot.price}</span>
            </div>
            <h3>${spot.name}</h3>
            <p class="food-dish">Must-order: ${spot.dish}</p>
            <p class="food-notes">${spot.notes}</p>
          </div>
          <div class="food-card-footer">
            <span>${spot.access}</span>
            <button class="btn-link-map" data-food-map="${spot.id}">Show on map</button>
          </div>
        </article>`
      )
      .join('');

    grid.querySelectorAll('.btn-link-map').forEach((btn) => {
      btn.addEventListener('click', () => showFoodSpotOnMap(btn.dataset.foodMap));
    });
  }

  /* ------------------------------------------------------------------------
     Bookings & Checklist Rendering
     ------------------------------------------------------------------------ */
  function renderChecklist() {
    const allItems = TRIP_DATA.checklistGroups.flatMap((g) => g.items);
    const doneCount = allItems.filter((i) => state.checkedItems[i.id]).length;
    const totalCount = allItems.length;
    const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

    document.getElementById('checklist-progress-text').textContent = `${doneCount} of ${totalCount} completed`;
    document.getElementById('checklist-progress-pct').textContent = `${pct}%`;
    document.getElementById('checklist-progress-fill').style.width = `${pct}%`;
    document.getElementById('nav-checklist-count').textContent = `${doneCount}/${totalCount}`;

    const container = document.getElementById('checklist-groups');
    container.innerHTML = TRIP_DATA.checklistGroups
      .map(
        (group) => `
        <section class="checklist-group">
          <h3>
            <span>${group.title}</span>
            <span class="urgency-tag ${group.urgent ? 'is-urgent' : ''}">${group.urgent ? 'Action Needed' : 'Prep'}</span>
          </h3>
          <ul class="check-list">
            ${group.items
              .map((item) => {
                const checked = !!state.checkedItems[item.id];
                return `
                  <li class="check-item ${checked ? 'is-done' : ''}">
                    <input type="checkbox" id="${item.id}" ${checked ? 'checked' : ''} data-check-id="${item.id}" />
                    <label for="${item.id}">
                      <span class="check-title">${item.title}</span>
                      <span class="check-detail">${item.detail}</span>
                      <span class="check-when">⏱ ${item.when}</span>
                    </label>
                  </li>`;
              })
              .join('')}
          </ul>
        </section>`
      )
      .join('');

    container.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', () => {
        state.checkedItems[cb.dataset.checkId] = cb.checked;
        saveState();
        renderChecklist();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Car & Parking Cost Calculator
     ------------------------------------------------------------------------ */
  function renderCarStrategy() {
    const isSplit = state.carStrategy === 'split';
    const isBanyan = state.parkingChoice === 'banyan';

    document.getElementById('strat-split').classList.toggle('is-selected', isSplit);
    document.getElementById('strat-full').classList.toggle('is-selected', !isSplit);
    document.getElementById('park-banyan').classList.toggle('is-selected', isBanyan);
    document.getElementById('park-hotel').classList.toggle('is-selected', !isBanyan);

    const carDays = isSplit ? 3 : 6;
    const parkingNights = isSplit ? 2 : 6; // Thu & Fri nights if returning Sat evening
    const dailyCarRate = 31.5;
    const carSubtotal = carDays * dailyCarRate;
    const estCarTaxes = Math.round(carSubtotal * 0.24); // Hawaii rental taxes & fees estimate
    const nightlyParking = isBanyan ? 30 : 63; // Banyan ~$30 vs Hotel Renew $60 + tax (~$63)
    const parkingTotal = parkingNights * nightlyParking;
    const airportUbers = isSplit ? 80 : 0; // ~$40 each way
    const localUbers = isSplit ? 45 : 0; // Diamond Head / Pearl Harbor / Kaka'ako short rides
    const gasEst = isSplit ? 30 : 40;

    const grandTotal = Math.round(carSubtotal + estCarTaxes + parkingTotal + airportUbers + localUbers + gasEst);

    // Baseline comparison: Full 6 days + Hotel Renew Valet
    const fullHotelTotal = Math.round(6 * 31.5 * 1.24 + 6 * 63 + 40);
    const savings = fullHotelTotal - grandTotal;

    document.getElementById('cost-mode-subtitle').textContent = `${
      isSplit ? '3-Day Mid-Trip Rental (Thu–Sat)' : '6-Day Full-Trip Rental (HNL)'
    } · ${isBanyan ? 'Waikiki Banyan Parking' : 'Hotel Renew Valet'}`;

    document.getElementById('cost-rows').innerHTML = `
      <div class="cost-row">
        <span class="cost-row-label">Car rental (${carDays} days × $31.50 employer rate)</span>
        <span class="cost-row-val">$${carSubtotal.toFixed(2)}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row-label">Est. Hawaiʻi rental taxes & fees (~24%)</span>
        <span class="cost-row-val">~$${estCarTaxes}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row-label">Overnight parking (${parkingNights} nights × $${nightlyParking})</span>
        <span class="cost-row-val">$${parkingTotal}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row-label">Airport Ubers (HNL ↔ Hotel Renew)</span>
        <span class="cost-row-val">${airportUbers ? '~$' + airportUbers : '$0'}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row-label">Local Waikiki / Pearl Harbor Ubers</span>
        <span class="cost-row-val">${localUbers ? '~$' + localUbers : '$0'}</span>
      </div>
      <div class="cost-row">
        <span class="cost-row-label">Estimated gas</span>
        <span class="cost-row-val">~$${gasEst}</span>
      </div>
    `;

    document.getElementById('cost-total-val').textContent = `~$${grandTotal}`;

    const savingsBox = document.getElementById('savings-callout');
    if (savings > 0) {
      savingsBox.textContent = `Saves ~$${savings} compared to keeping a car all 6 nights at Hotel Renew valet (~$${fullHotelTotal}), while still covering East Shore, PCC, and North Shore comfortably.`;
    } else {
      savingsBox.textContent = `Maximum door-to-door convenience with valet at Hotel Renew. Switching parking to Waikiki Banyan (3-min walk) saves ~$198 on a 6-night stay.`;
    }

    // Update top nav pill
    document.getElementById('car-mode-pill-label').textContent = isSplit
      ? 'Car: 3-Day Split (Thu–Sat)'
      : 'Car: Full 6 Days (HNL)';
  }

  /* ------------------------------------------------------------------------
     Tab Navigation & Wiring
     ------------------------------------------------------------------------ */
  function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll('.nav-tab').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.view-panel').forEach((panel) => {
      panel.classList.toggle('is-active', panel.id === 'panel-' + tabId);
    });

    if (tabId === 'planner' && map) {
      setTimeout(() => map.invalidateSize(), 60);
    }
  }

  function wireEvents() {
    document.querySelectorAll('.nav-tab').forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('car-mode-pill').addEventListener('click', () => {
      switchTab('car');
    });

    document.getElementById('map-reset-btn').addEventListener('click', () => {
      state.activeDay = 'all';
      state.activeCategory = 'all';
      state.selectedStopId = null;
      renderDayPills();
      renderCategoryPills();
      renderItinerary();
      renderMap();
    });

    document.getElementById('strat-split').addEventListener('click', () => {
      state.carStrategy = 'split';
      saveState();
      renderCarStrategy();
      renderItinerary();
    });

    document.getElementById('strat-full').addEventListener('click', () => {
      state.carStrategy = 'full';
      saveState();
      renderCarStrategy();
      renderItinerary();
    });

    document.getElementById('park-banyan').addEventListener('click', () => {
      state.parkingChoice = 'banyan';
      saveState();
      renderCarStrategy();
    });

    document.getElementById('park-hotel').addEventListener('click', () => {
      state.parkingChoice = 'hotel';
      saveState();
      renderCarStrategy();
    });

    document.getElementById('checklist-reset-btn').addEventListener('click', () => {
      state.checkedItems = {};
      saveState();
      renderChecklist();
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    loadState();
    wireEvents();
    renderDayPills();
    renderCategoryPills();
    renderItinerary();
    renderFoodGuide();
    renderChecklist();
    renderCarStrategy();
    initMap();
    renderMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
