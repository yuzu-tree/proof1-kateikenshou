let myChart = null;

function runSimulation() {
    const n = parseInt(document.getElementById('trials').value);
    const simCount = parseInt(document.getElementById('simulations').value);
    const pNum = parseInt(document.getElementById('probNum').value);
    const pDen = parseInt(document.getElementById('probDen').value);
    const p = pNum / pDen;

    // 成功回数ごとの頻度を格納する配列
    const results = new Array(n + 1).fill(0);

    // シミュレーション実行
    for (let i = 0; i < simCount; i++) {
        let successes = 0;
        for (let j = 0; j < n; j++) {
            if (Math.random() < p) {
                successes++;
            }
        }
        results[successes]++;
    }

    const labels = Array.from({length: n + 1}, (_, i) => i);
    renderChart(labels, results);
}

function renderChart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '頻度',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barPercentage: 0.9,
                categoryPercentage: 1.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: () => '', // タイトルを非表示
                        label: function(context) {
                            return [
                                `成功回数：${context.label}`,
                                `頻度：${context.raw}`
                            ];
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: '頻度 (回)' }
                },
                x: {
                    title: { display: true, text: '成功回数' }
                }
            }
        }
    });
}

// ボタンイベント登録
document.getElementById('runBtn').addEventListener('click', runSimulation);

// 初期実行
window.onload = runSimulation;