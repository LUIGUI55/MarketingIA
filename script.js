// Initialize Charts with dark theme styling
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Line Chart: Ventas Históricas ---
    const ctxSales = document.getElementById('salesChart').getContext('2d');
    const gradientSales = ctxSales.createLinearGradient(0, 0, 0, 400);
    gradientSales.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradientSales.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctxSales, {
        type: 'line',
        data: {
            labels: ['Ene 03', 'Abr 03', 'Jul 03', 'Oct 03', 'Ene 04', 'Abr 04', 'Jul 04', 'Oct 04', 'Ene 05', 'Abr 05'],
            datasets: [{
                label: 'Ventas ($)',
                data: [12916.3, 20182.1, 28019.2, 54702.0, 31102.3, 42103.4, 55201.2, 78103.5, 41203.1, 48201.0],
                borderColor: '#3b82f6',
                backgroundColor: gradientSales,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleColor: '#fff', bodyColor: '#cbd5e1', padding: 12, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, displayColors: false } },
            interaction: { intersect: false, mode: 'index' },
            scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v / 1000 + 'k' } }, x: { grid: { display: false } } }
        }
    });

    // --- 2. Doughnut Chart: Top Países ---
    const ctxCountry = document.getElementById('countryChart').getContext('2d');
    new Chart(ctxCountry, {
        type: 'doughnut',
        data: {
            labels: ['USA', 'Spain', 'France', 'Australia', 'Otros'],
            datasets: [{
                data: [1004, 342, 314, 185, 978],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#14b8a6', '#ec4899', 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0, hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } } } }
    });

    // --- 3. Bar Chart: Línea de Productos ---
    const ctxProduct = document.getElementById('productChart').getContext('2d');
    new Chart(ctxProduct, {
        type: 'bar',
        data: {
            labels: ['Classic Cars', 'Vintage Cars', 'Motorcycles', 'Planes', 'Trucks', 'Ships', 'Trains'],
            datasets: [{
                label: 'Cantidad',
                data: [967, 607, 331, 306, 301, 234, 77],
                backgroundColor: '#8b5cf6',
                borderRadius: 6
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
    });

    // --- 4. Pie Chart: Estado del Pedido ---
    const ctxStatus = document.getElementById('statusChart').getContext('2d');
    new Chart(ctxStatus, {
        type: 'pie',
        data: {
            labels: ['Enviado', 'Cancelado', 'Resuelto', 'En Espera', 'En Proceso', 'Disputado'],
            datasets: [{
                data: [2617, 60, 47, 44, 41, 14],
                backgroundColor: ['#14b8a6', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
                borderWidth: 0, hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } } } }
    });

    // --- 5. Polar Area Chart: Tamaño del Trato ---
    const ctxDeal = document.getElementById('dealChart').getContext('2d');
    new Chart(ctxDeal, {
        type: 'polarArea',
        data: {
            labels: ['Pequeño', 'Mediano', 'Grande'],
            datasets: [{
                data: [1282, 1384, 157],
                backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(139, 92, 246, 0.7)', 'rgba(20, 184, 166, 0.7)'],
                borderWidth: 0
            }]
        },
        options: { 
            responsive: true, maintainAspectRatio: false, 
            scales: { r: { ticks: { display: false }, grid: { color: 'rgba(255, 255, 255, 0.1)' } } },
            plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } } } 
        }
    });

    // --- 6. Plotly 3D Chart (Dynamic) ---
    const plotContainer = document.getElementById('plotly3d-container');
    const clusterInput = document.getElementById('cluster-input');
    
    if (plotContainer && typeof Plotly !== 'undefined') {
        const layout3D = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#94a3b8', family: "'Inter', sans-serif" },
            scene: {
                xaxis: { title: 'Ventas ($)', gridcolor: 'rgba(255,255,255,0.1)', backgroundcolor: 'rgba(0,0,0,0)' },
                yaxis: { title: 'Precio ($)', gridcolor: 'rgba(255,255,255,0.1)', backgroundcolor: 'rgba(0,0,0,0)' },
                zaxis: { title: 'Cantidad', gridcolor: 'rgba(255,255,255,0.1)', backgroundcolor: 'rgba(0,0,0,0)' }
            },
            legend: { x: 0, y: 1 }
        };

        const renderClusters = (numClusters) => {
            const data3D = [];
            const colors = ['#3b82f6', '#8b5cf6', '#14b8a6', '#ec4899', '#f59e0b', '#ef4444', '#10b981', '#6366f1', '#eab308', '#d946ef'];
            
            for(let i=0; i<numClusters; i++) {
                const cx = 1000 + Math.random() * 8000;
                const cy = 20 + Math.random() * 80;
                const cz = 10 + Math.random() * 40;
                const spread = 500 + Math.random() * 1500;
                
                let x=[], y=[], z=[];
                for(let j=0; j<60; j++){ // points per cluster
                    x.push(cx + (Math.random()-0.5)*spread);
                    y.push(cy + (Math.random()-0.5)*(spread/20));
                    z.push(cz + (Math.random()-0.5)*(spread/30));
                }
                
                data3D.push({
                    x: x, y: y, z: z, mode: 'markers', 
                    marker: { size: 5, color: colors[i % colors.length], opacity: 0.8 }, 
                    type: 'scatter3d', name: `Cluster ${i+1}`
                });
            }
            Plotly.newPlot(plotContainer, data3D, layout3D, {responsive: true});
        };

        // Render inicial (K=3)
        let k = parseInt(clusterInput ? clusterInput.value : 3) || 3;
        renderClusters(k);

        // Actualizar al teclear o usar las flechas del teclado
        if (clusterInput) {
            clusterInput.addEventListener('input', (e) => {
                let val = parseInt(e.target.value);
                if(val > 0 && val <= 10) {
                    renderClusters(val);
                }
            });
        }
    }

    // --- 7. Plotly Correlation Heatmap ---
    const heatmapContainer = document.getElementById('plotly-heatmap-container');
    if (heatmapContainer && typeof Plotly !== 'undefined') {
        const heatmapData = [{
            z: [
                [1.00, 0.01, 0.55, 0.02], 
                [0.01, 1.00, 0.66, 0.95], 
                [0.55, 0.66, 1.00, 0.64], 
                [0.02, 0.95, 0.64, 1.00]
            ],
            x: ['Cantidad', 'Precio Unitario', 'Ventas', 'MSRP'],
            y: ['Cantidad', 'Precio Unitario', 'Ventas', 'MSRP'],
            type: 'heatmap',
            colorscale: [
                [0, 'rgba(15, 23, 42, 0.8)'],     // Dark slate base
                [0.3, 'rgba(59, 130, 246, 0.7)'], // Blue accent
                [0.7, 'rgba(139, 92, 246, 0.8)'], // Purple accent
                [1, 'rgba(236, 72, 153, 0.9)']    // Pink hot
            ],
            text: [
                [1.00, 0.01, 0.55, 0.02], 
                [0.01, 1.00, 0.66, 0.95], 
                [0.55, 0.66, 1.00, 0.64], 
                [0.02, 0.95, 0.64, 1.00]
            ],
            texttemplate: "%{text}",
            textfont: { color: "#ffffff", family: "'Inter', sans-serif" },
            hoverongaps: false,
            showscale: true,
            colorbar: {
                tickfont: { color: '#94a3b8', family: "'Inter', sans-serif" },
                outlinecolor: 'rgba(255,255,255,0.1)'
            }
        }];

        const heatmapLayout = {
            margin: { l: 80, r: 0, b: 60, t: 20 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#94a3b8', family: "'Inter', sans-serif" },
            xaxis: { tickangle: -45 },
            yaxis: { autorange: 'reversed' } // Standard correlation matrix visually
        };

        Plotly.newPlot(heatmapContainer, heatmapData, heatmapLayout, {responsive: true});
    }

    // --- Toggle Logic ---
    const toggleMap = {
        'toggle-sales': 'card-sales',
        'toggle-country': 'card-country',
        'toggle-product': 'card-product',
        'toggle-status': 'card-status',
        'toggle-deal': 'card-deal',
        'toggle-3d': 'card-3d',
        'toggle-heatmap': 'card-heatmap',
        'toggle-table': 'card-table'
    };

    Object.keys(toggleMap).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        const cardContainer = document.getElementById(toggleMap[toggleId]);

        if (checkbox && cardContainer) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    cardContainer.style.display = 'flex';
                    setTimeout(() => cardContainer.classList.remove('hidden'), 10);
                } else {
                    cardContainer.classList.add('hidden');
                    setTimeout(() => cardContainer.style.display = 'none', 300); // Wait for transition
                }
            });
        }
    });

});
