mkdir -p ./build
cd ./build

rm -rf windows
mkdir windows

if [ ! -f ./electron-v0.34.3-win32-ia32.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-win32-ia32.zip
fi
unzip ./electron-v0.34.3-win32-ia32.zip -d ./windows

# cp -r ~/electron/public ./electronb/resources/app
asar p ../public/ ./windows/resources/app.asar

cd windows
rm ../musictime-windows.zip
zip ../musictime-windows.zip -r ./
cd ..

rm -rf ./windows/

