/* ==========================================================================
   Oʻahu Trip Planner — Interactive Map, Itinerary, Food Guide & Checklist
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'oahu_trip_2026_state_v2';

  const state = {
    activeTab: 'planner',
    activeDay: 'all', // 'all' or 1..7
    activeCategory: 'all',
    selectedStopId: null,
    activeFoodFilter: 'all',
    checkedItems: {}
  };

  let map = null;
  let markersLayer = null;
  let routesLayer = null;
  let foodHighlightLayer = null;
  const markerByStopId = new Map();

  /* ------------------------------------------------------------------------
     Google Maps Universal Direction URLs (Free · Opens Native Maps on Phone)
     ------------------------------------------------------------------------ */
  function getDirectionsUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  function getDayRouteUrl(dayObj) {
    const hb = TRIP_DATA.homeBase;
    const stops = dayObj.stops;
    if (!stops || stops.length === 0) return getDirectionsUrl(hb.lat, hb.lng);

    const origin = dayObj.day === 1 ? `${stops[0].lat},${stops[0].lng}` : `${hb.lat},${hb.lng}`;
    const last = stops[stops.length - 1];
    const destination = `${last.lat},${last.lng}`;

    const midStops = dayObj.day === 1 ? stops.slice(1, -1) : stops.slice(0, -1);
    const waypoints = midStops.map((s) => `${s.lat},${s.lng}`).join('|');

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if (waypoints) {
      url += `&waypoints=${encodeURIComponent(waypoints)}`;
    }
    return url;
  }

  /* ------------------------------------------------------------------------
     Persistence
     ------------------------------------------------------------------------ */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
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
          'Open the live GitHub Pages site to explore the interactive Oʻahu map. All itinerary filters, Google Maps direction links, food guide, and checklist controls work right here.</div></div>';
      }
      return;
    }

    try {
      map = L.map('oahu-map', {
        center: [21.46, -157.93],
        zoom: 10,
        scrollWheelZoom: true
      });

      const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      });

      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri',
          maxZoom: 19
        }
      );

      osmLayer.addTo(map);
      L.control
        .layers({ 'Street Map': osmLayer, Satellite: satelliteLayer }, null, {
          position: 'topright'
        })
        .addTo(map);

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
         <p class="popup-desc">${hb.address}</p>
         <a class="popup-directions" href="${getDirectionsUrl(hb.lat, hb.lng)}" target="_blank" rel="noopener noreferrer">Directions in Google Maps ↗</a>`
      )
      .addTo(markersLayer);

    const visibleDays = getFilteredDays();

    visibleDays.forEach((dayObj) => {
      const routeCoords = [];
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
           <div class="popup-meta">${stop.driveFromPrev}${stop.reservationRequired ? ' · ' + stop.reservationRequired : ''}</div>
           <a class="popup-directions" href="${getDirectionsUrl(stop.lat, stop.lng)}" target="_blank" rel="noopener noreferrer">Directions in Google Maps ↗</a>`
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
          opacity: state.activeDay === 'all' ? 0.5 : 0.82
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
           <div class="popup-meta">${spot.access}</div>
           <a class="popup-directions" href="${getDirectionsUrl(spot.lat, spot.lng)}" target="_blank" rel="noopener noreferrer">Directions in Google Maps ↗</a>`
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
                    <a
                      class="btn-directions"
                      href="${getDirectionsUrl(stop.lat, stop.lng)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      onclick="event.stopPropagation();"
                    >Directions ↗</a>
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
                <a
                  class="day-route-btn"
                  href="${getDayRouteUrl(dayObj)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >Day Route in Google Maps ↗</a>
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
      { id: 'fruit', label: 'Tropical Fruit' },
      { id: 'bakery', label: 'Bakeries & Pastries' },
      { id: 'coffee', label: 'Coffee' },
      { id: 'seafood', label: 'Poke & Seafood' },
      { id: 'chicken', label: 'Chicken & Udon' },
      { id: 'shave-ice', label: 'Shave Ice' }
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
            <div class="food-actions">
              <button class="btn-link-map" data-food-map="${spot.id}">Map</button>
              <a
                class="btn-directions"
                href="${getDirectionsUrl(spot.lat, spot.lng)}"
                target="_blank"
                rel="noopener noreferrer"
              >Directions ↗</a>
            </div>
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

    document.getElementById('map-reset-btn').addEventListener('click', () => {
      state.activeDay = 'all';
      state.activeCategory = 'all';
      state.selectedStopId = null;
      renderDayPills();
      renderCategoryPills();
      renderItinerary();
      renderMap();
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
    initMap();
    renderMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
