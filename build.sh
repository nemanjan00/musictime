mkdir -p ./build

cd ./build

# Build windows

rm -rf windows-x64
mkdir windows-x64

if [ ! -f ./electron-v0.34.3-win32-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-win32-x64.zip
fi
unzip ./electron-v0.34.3-win32-x64.zip -d ./windows-x64

asar p ../public/ ./windows-x64/resources/app.asar

cd windows-x64
rm ../musictime-windows-x64.zip
zip ../musictime-windows-x64.zip -r ./
cd ..

rm -rf ./windows-x64/

# Build windows

rm -rf windows-ia32
mkdir windows-ia32

if [ ! -f ./electron-v0.34.3-win32-ia32.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-win32-ia32.zip
fi
unzip ./electron-v0.34.3-win32-ia32.zip -d ./windows-ia32

asar p ../public/ ./windows-ia32/resources/app.asar

cd windows-ia32
rm ../musictime-windows-ia32.zip
zip ../musictime-windows-ia32.zip -r ./
cd ..

rm -rf ./windows-ia32/

# Build linux

rm -rf linux-x64
mkdir linux-x64

if [ ! -f ./electron-v0.34.3-linux-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-linux-x64.zip
fi

unzip ./electron-v0.34.3-linux-x64.zip -d ./linux-x64

asar p ../public/ ./linux-x64/resources/app.asar

cd linux-x64
rm ../musictime-linux-x64.zip
zip ../musictime-linux-x64.zip -r ./
cd ..

rm -rf ./linux-x64/

# Build linux

rm -rf linux-i32
mkdir linux-i32

if [ ! -f ./electron-v0.34.3-linux-ia32.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-linux-ia32.zip
fi

unzip ./electron-v0.34.3-linux-ia32.zip -d ./linux-i32

asar p ../public/ ./linux-i32/resources/app.asar

cd linux-i32
rm ../musictime-linux-i32.zip
zip ../musictime-linux-i32.zip -r ./
cd ..

rm -rf ./linux-i32/

# Build OS X

rm -rf darwin
mkdir darwin

if [ ! -f ./electron-v0.34.3-darwin-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-darwin-x64.zip
fi

unzip ./electron-v0.34.3-darwin-x64.zip -d ./darwin

asar p ../public/ ./darwin/Electron.app/Contents/Resources/app.asar

cd darwin
rm ../musictime-darwin.zip
zip ../musictime-darwin.zip -r ./
cd ..

rm -rf ./darwin/

