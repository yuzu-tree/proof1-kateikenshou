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

    // 全範囲（0〜n回）の頻度を格納する配列を作成
    const fullResults = new Array(n + 1).fill(0);

    // シミュレーションの実行
    for (let i = 0; i < simCount; i++) {
        let successes = 0;
        for (let j = 0; j < n; j++) {
            if (Math.random() < p) {
                successes++;
            }
        }
        fullResults[successes]++;
    }

    // --- 表示範囲の計算（頻度が1以上の最小値と最大値を探す） ---
    const minIdx = fullResults.findIndex(count => count > 0);
    const maxIdx = fullResults.findLastIndex(count => count > 0);

    // 最小から最大までのデータだけを抽出
    const labels = [];
    const data = [];
    for (let i = minIdx; i <= maxIdx; i++) {
        labels.push(i); // 成功回数
        data.push(fullResults[i]); // 頻度
    }

    renderChart(labels, data);
}

/**
 * Chart.jsを使用してグラフを描画する
 */
function renderChart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // 既存のチャートがあれば破棄
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
                // ホバー時のツールチップ設定
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: () => '', // タイトル（一番上の行）を消す
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

// ボタンへのイベント登録
document.getElementById('runBtn').addEventListener('click', runSimulation);

// ページ読み込み時に初回実行
window.onload = runSimulation;
