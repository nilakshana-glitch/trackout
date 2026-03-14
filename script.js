// Mock Data for Buses
const buses = [
    { id: 'BUS-102', route: 'Fort - Mt. Lavinia', status: 'On Time', delay: '0 min', position: 15, type: 'on-time' },
    { id: 'BUS-45', route: 'Pettah - Kandy', status: 'Delayed', delay: '12 min', position: 40, type: 'delayed' },
    { id: 'BUS-210', route: 'Borella - Bamba', status: 'On Time', delay: '2 min', position: 65, type: 'on-time' },
    { id: 'BUS-88', route: 'Galle Face - Slave Island', status: 'Delayed', delay: '25 min', position: 85, type: 'delayed' }
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
    timeDisplay.textContent = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
            <p>Est. Delay: ${bus.delay}</p>
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
        marker.style.top = '50%'; // Centered on road
        marker.style.transform = 'translateY(-50%)';
        marker.textContent = bus.id.split('-')[1];
        mapBuses.appendChild(marker);
    });
}

// Simulate Movement
function animateBuses() {
    buses.forEach(bus => {
        // Increment position
        const speed = (Math.random() * 0.5) + 0.2;
        bus.position += speed;
        
        if (bus.position > 100) {
            bus.position = -5; // Reset
        }

        const marker = document.getElementById(`marker-${bus.id}`);
        if (marker) {
            marker.style.left = `${bus.position}%`;
        }
    });
    
    // Request next frame
    requestAnimationFrame(animateBuses);
}

// Initialize
function init() {
    updateTime();
    setInterval(updateTime, 1000);
    
    renderBuses();
    renderAlerts();
    renderMap();
    
    // Smooth movement with requestAnimationFrame
    requestAnimationFrame(animateBuses);
    
    // Mock Weather
    setTimeout(() => {
        weatherInfo.textContent = '31°C | HUMIDITY: 78% | OVERCAST';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', init);
