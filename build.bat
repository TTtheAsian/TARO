@echo off
echo 塔羅牌占卜程式建構腳本
echo ========================

:: 檢查 Node.js 是否安裝
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 錯誤: 未安裝 Node.js，請先安裝 Node.js
    exit /b 1
)

:: 檢查 Python 是否安裝 (用於運行本地伺服器)
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo 警告: 未安裝 Python，將無法自動啟動本地伺服器
)

:: 檢查必要檔案
echo.
echo 檢查專案檔案...
node check.js
if %errorlevel% neq 0 (
    echo 錯誤: 專案檢查失敗
    exit /b 1
)

:: 建立必要的資料夾
if not exist "js" mkdir js
if not exist "CARD" mkdir CARD

:: 複製檔案（如果存在的話）
if exist "main.js" move main.js js\main.js

:: 詢問是否啟動本地伺服器
echo.
set /p start_server="是否要啟動本地伺服器？(Y/N) "
if /i "%start_server%"=="Y" (
    echo 啟動本地伺服器...
    start http://localhost:8000
    python -m http.server 8000
)

echo.
echo 建構完成！ 