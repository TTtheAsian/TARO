const fs = require('fs');
const path = require('path');

// 檢查必要的檔案和資料夾
function checkStructure() {
    const requiredFiles = [
        'index.html',
        'styles.css',
        'js/main.js',
        'CARD/225_78.jpg'  // 牌背圖片
    ];

    console.log('檢查檔案結構...');
    let hasError = false;

    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            console.error(`錯誤: 找不到 ${file}`);
            hasError = true;
        }
    });

    // 檢查大阿爾卡納牌圖片
    for (let i = 0; i <= 21; i++) {
        const filename = path.join('CARD', `225_${i.toString().padStart(2, '0')}.jpg`);
        if (!fs.existsSync(filename)) {
            console.error(`錯誤: 找不到大阿爾卡納牌圖片 ${filename}`);
            hasError = true;
        }
    }

    // 檢查小阿爾卡納牌圖片
    for (let i = 22; i <= 77; i++) {
        const filename = path.join('CARD', `225_${i.toString().padStart(2, '0')}.jpg`);
        if (!fs.existsSync(filename)) {
            console.error(`錯誤: 找不到小阿爾卡納牌圖片 ${filename}`);
            hasError = true;
        }
    }

    return !hasError;
}

// 檢查 HTML 文件
function checkHTML() {
    console.log('檢查 HTML 文件...');
    const html = fs.readFileSync('index.html', 'utf8');
    
    const requiredElements = [
        '<link rel="stylesheet" href="styles.css">',
        '<script src="js/main.js">',
        '<div id="card-deck">',
        '<div id="result"',
        '<button id="start-reading">'
    ];

    let hasError = false;
    requiredElements.forEach(element => {
        if (!html.includes(element)) {
            console.error(`錯誤: HTML 缺少必要元素 ${element}`);
            hasError = true;
        }
    });

    return !hasError;
}

// 主要檢查函數
function runChecks() {
    console.log('開始檢查專案...\n');
    
    const structureOk = checkStructure();
    const htmlOk = checkHTML();

    if (structureOk && htmlOk) {
        console.log('\n✅ 所有檢查通過！');
        process.exit(0);
    } else {
        console.log('\n❌ 檢查失敗，請修正上述錯誤。');
        process.exit(1);
    }
}

runChecks(); 