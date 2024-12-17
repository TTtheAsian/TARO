@echo off
echo 啟動塔羅牌占卜程式
echo ==================

:: 檢查 Python 是否安裝
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo 錯誤: 未安裝 Python，請先安裝 Python
    echo 您可以從 https://www.python.org/downloads/ 下載安裝
    pause
    exit /b 1
)

:: 啟動本地伺服器
echo.
echo 啟動本地伺服器...
start http://localhost:8000
python -m http.server 8000 