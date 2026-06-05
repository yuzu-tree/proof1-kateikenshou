let myChart = null;

/**
 * シミュレーションを実行し、結果をグラフに反映する
 */
function runSimulation() {
    const n = parseInt(document.getElementById('trials').value);
    const simCount = parseInt(document.getElementById('simulations').value);
    const pNum = parseInt(document.getElementById('probNum').value);
    const pDen = parseInt(document.getElementById('probDen').value);
    const p = pNum / pDen;

    const fullResults = new Array(n + 1).fill(0);

    for (let i = 0; i < simCount; i++) {
        let successes = 0;
        for (let j = 0; j < n; j++) {
            if (Math.random() < p) {
                successes++;
            }
        }
        fullResults[successes]++;
    }

    const minIdx = fullResults.findIndex(count => count > 0);
    const maxIdx = fullResults.findLastIndex(count => count > 0);

    const labels = [];
    const data = [];
    for (let i = minIdx; i <= maxIdx; i++) {
        labels.push(i);
        data.push(fullResults[i]);
    }

    renderChart(labels, data);
}

/**
 * Chart.jsを使用してグラフを描画する
 */
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
            // --- 修正ポイント：軸の数字など、範囲内ならどこでも反応するように設定 ---
            interaction: {
                mode: 'index',      // 同じX軸インデックスにある項目を対象にする
                intersect: false    // アイテムに直接重なっていなくても反応させる
            },
            // ---------------------------------------------------------
            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: () => '', 
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

document.getElementById('runBtn').addEventListener('click', runSimulation);
window.onload = runSimulation;
