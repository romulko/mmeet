@echo off
:: Скрипт самостійно додається в автозапуск і видаляє файли через 20 хвилин

:: Перевірка прав адміністратора
net session >nul 2>&1
if %errorLevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: Шлях до папки, файли з якої потрібно видалити
set "FOLDER_PATH=C:\Temp\FilesToDelete"

:: Перевірка, чи скрипт вже доданий в автозапуск
schtasks /query /tn "CleanupOnStartup" >nul 2>&1
if %errorLevel% neq 0 (
    echo Додавання скрипта в автозапуск...
    schtasks /create /tn "CleanupOnStartup" /tr "\"%~f0\"" /sc onstart /ru "SYSTEM" /rl highest /f
    echo Скрипт успішно доданий в автозапуск!
    echo Він запуститься при наступному перезавантаженні Windows.
    pause
    exit /b
)

:: Якщо скрипт запущений з автозапуску - виконуємо очищення
echo Очікування 20 хвилин перед видаленням файлів...
echo Час початку: %date% %time%

:: Очікування 20 хвилин (1200 секунд)
timeout /t 1200 /nobreak

:: Перевірка існування папки
if not exist "%FOLDER_PATH%" (
    echo [%date% %time%] Папка не знайдена: %FOLDER_PATH% >> "%~dp0cleanup_log.txt"
    exit /b
)

:: Видалення файлів з пропуском тих, що використовуються
echo Видалення файлів з папки %FOLDER_PATH%...
set "deleted=0"
set "skipped=0"

for %%F in ("%FOLDER_PATH%\*.*") do (
    del "%%F" 2>nul
    if exist "%%F" (
        echo Пропущено (використовується): %%~nxF
        echo [%date% %time%] Пропущено: %%~nxF >> "%~dp0cleanup_log.txt"
        set /a skipped+=1
    ) else (
        set /a deleted+=1
    )
)

exit /b
