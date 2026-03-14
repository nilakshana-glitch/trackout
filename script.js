// Mock Data for Buses
const buses = [
    { id: 'C-102', route: 'Fort - Mt. Lavinia', status: 'On Time', delay: '0 min', position: 10, type: 'on-time' },
    { id: 'C-45', route: 'Pettah - Kandy', status: 'Delayed', delay: '12 min', position: 35, type: 'delayed' },
    { id: 'C-210', route: 'Borella - Bambalapitiya', status: 'On Time', delay: '2 min', position: 60, type: 'on-time' },
    { id: 'C-88', route: 'Galle Face - Slave Island', status: 'Congestion', delay: '25 min', position: 85, type: 'delayed' }
];

// Mock Data for Alerts
const alerts = [
    { title: 'Colombo St. Gridlock', type: 'high', message: 'Heavy traffic near Town Hall junction. Expect 20 min delays.' },
    { title: 'Road Maintenance', type: 'med', message: 'Lane closure on Galle Road. Drive with caution.' }
];

// DOM Elements
const busList = document.getElementById('bus-list');
const alertList = document.getElementById('traffic-alerts');
const mapBuses = document.getElementById('buses-on-map');
const timeDisplay = document.getElementById('current-time');
const weatherInfo = document.getElementById('weather-info');

// Update Current Time
function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Render Bus Feed
function renderBuses() {
    busList.innerHTML = '';
    buses.forEach(bus => {
        const card = document.createElement('div');
        card.className = `bus-card ${bus.type}`;
        card.innerHTML = `
            <h3>${bus.id} <span class="status-tag">${bus.status}</span></h3>
            <p>Route: ${bus.route}</p>
            <p>Delay: ${bus.delay}</p>
        `;
        busList.appendChild(card);
    });
}

// Render Alerts
function renderAlerts() {
    alertList.innerHTML = '';
    alerts.forEach(alert => {
        const card = document.createElement('div');
        card.className = `alert-card ${alert.type}`;
        card.innerHTML = `
            <h3>${alert.title}</h3>
            <p>${alert.message}</p>
        `;
        alertList.appendChild(card);
    });
}

// Render/Update Map Markers
function renderMap() {
    mapBuses.innerHTML = '';
    buses.forEach(bus => {
        const marker = document.createElement('div');
        marker.className = 'bus-marker';
        marker.id = `marker-${bus.id}`;
        marker.style.left = `${bus.position}%`;
        marker.style.top = '40%';
        marker.textContent = bus.id.split('-')[1];
        mapBuses.appendChild(marker);
    });
}

// Simulate Movement
function animateBuses() {
    buses.forEach(bus => {
        // Increment position
        bus.position += (Math.random() * 2);
        if (bus.position > 100) bus.position = -5; // Reset

        const marker = document.getElementById(`marker-${bus.id}`);
        if (marker) {
            marker.style.left = `${bus.position}%`;
        }
    });
}

// Initialize
function init() {
    updateTime();
    setInterval(updateTime, 1000);
    
    renderBuses();
    renderAlerts();
    renderMap();
    
    // Simulate live updates every 3 seconds
    setInterval(animateBuses, 3000);
    
    // Mock Weather
    weatherInfo.textContent = '31°C, Humidity: 78%, Mostly Cloudy';
}

document.addEventListener('DOMContentLoaded', init);
