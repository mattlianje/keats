function loadData() {
    const input = document.getElementById('fileInput');
    if (!input.files.length) {
        alert('Please select a file.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        const data = lines.map(line => {
            const [date, valeur] = line.split(',');
            return {
                date,
                valeur: parseFloat(valeur) || null
            };
        });

        displayTable(data);
        plotData(data);
    };

    reader.readAsText(file);
}

function displayTable(data) {
    let html = '<table><tr><th>Date</th><th>Valeur</th></tr>';
    data.forEach(row => {
        html += `<tr><td>${row.date}</td><td>${row.valeur}</td></tr>`;
    });
    html += '</table>';
    document.getElementById('dataTable').innerHTML = html;
}

function plotData(data) {
    const filteredData = data.filter(row => row.valeur !== null);
    const dates = filteredData.map(row => row.date);
    const valeurs = filteredData.map(row => row.valeur);

    const trace = {
        type: 'scatter',
        mode: 'lines+markers',
        x: dates,
        y: valeurs,
        marker: { color: 'blue' },
    };

    const layout = {
        title: 'Data Plot',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Valeur' }
    };

    Plotly.newPlot('dataPlot', [trace], layout);
}

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
