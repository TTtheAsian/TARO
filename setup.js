const fs = require('fs');
const path = require('path');

// 定義項目結構
const projectStructure = {
    'CARD': {},  // 空對象代表空文件夾
    'js': {
        'main.js': `const tarotCards = {
    majorArcana: [
        {
            id: 0,
            name: "愚人",
            number: 0,
            img: "CARD/225_00.jpg",
            meaning: "新的開始，冒險，自由，擁抱未知，但也需要注意風險。",
            interpretation: "當前形勢充滿可能性，建議保持開放心態，勇於嘗試新事物。"
        }
    ]
};

class TarotReading {
    constructor() {
        this.deck = this.initializeDeck();
        this.selectedCards = [];
    }

    initializeDeck() {
        let deck = [
            ...tarotCards.majorArcana,
            ...tarotCards.wands,
            ...tarotCards.cups,
            ...tarotCards.swords,
            ...tarotCards.pentacles
        ];
        return this.shuffleDeck(deck);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    drawCard() {
        if (this.selectedCards.length >= 3) {
            alert('已經抽取了三張牌');
            return;
        }
        const card = this.deck.pop();
        this.selectedCards.push(card);
        this.displayCard(card);
    }

    displayCard(card) {
        const resultDiv = document.getElementById('result');
        const cardElement = document.createElement('div');
        cardElement.className = 'card-result';
        cardElement.innerHTML = \`
            <h3>\${card.name}</h3>
            <img src="\${card.img}" alt="\${card.name}">
            <p class="meaning">\${card.meaning}</p>
            <p class="interpretation">\${card.interpretation}</p>
        \`;
        resultDiv.appendChild(cardElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const reading = new TarotReading();
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => reading.drawCard());
    });
});`
    },
    'styles.css': `body {
    font-family: sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    color: #333;
}

.card {
    display: inline-block;
    margin: 10px;
    width: 120px;
    height: 180px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.result {
    margin: 20px auto;
    max-width: 800px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
    'index.html': `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>線上塔羅牌占卜</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>線上塔羅牌占卜</h1>
    <div class="question-section">
        <textarea placeholder="請在此輸入你想問的問題..."></textarea>
        <button id="start-reading">開始占卜</button>
    </div>
    <div id="card-deck"></div>
    <div id="result" class="result"></div>
    
    <script src="js/main.js"></script>
</body>
</html>`
};

// 創建文件夾和文件的函數
function createStructure(basePath, structure) {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = path.join(basePath, name);
        
        if (typeof content === 'object' && Object.keys(content).length === 0) {
            // 創建空文件夾
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath);
                console.log(`創建文件夾: ${fullPath}`);
            }
        } else if (typeof content === 'object') {
            // 遞歸創建子文件夾和文件
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath);
                console.log(`創建文件夾: ${fullPath}`);
            }
            createStructure(fullPath, content);
        } else {
            // 創建文件
            fs.writeFileSync(fullPath, content);
            console.log(`創建文件: ${fullPath}`);
        }
    }
}

// 創建項目根目錄
const projectName = 'tarot-reading';
const projectPath = path.join(process.cwd(), projectName);

if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(`創建項目文件夾: ${projectPath}`);
}

// 創建項目結構
createStructure(projectPath, projectStructure);

console.log('項目創建完成！'); 