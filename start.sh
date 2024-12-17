#!/bin/bash

echo "啟動塔羅牌占卜程式"
echo "=================="

# 檢查 Python 是否安裝
if ! command -v python &> /dev/null; then
    echo "錯誤: 未安裝 Python，請先安裝 Python"
    echo "您可以從 https://www.python.org/downloads/ 下載安裝"
    exit 1
fi

# 啟動本地伺服器
echo
echo "啟動本地伺服器..."
python -m http.server 8000 &
open http://localhost:8000 || xdg-open http://localhost:8000 