mkdir -p ./build

cd ./build

# Download packages

if [ ! -f ./electron-v0.34.3-win32-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-win32-x64.zip
fi

if [ ! -f ./electron-v0.34.3-win32-ia32.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-win32-ia32.zip
fi

if [ ! -f ./electron-v0.34.3-linux-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-linux-x64.zip
fi

if [ ! -f ./electron-v0.34.3-linux-ia32.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-linux-ia32.zip
fi

if [ ! -f ./electron-v0.34.3-darwin-x64.zip ]; then
    wget https://github.com/atom/electron/releases/download/v0.34.3/electron-v0.34.3-darwin-x64.zip
fi

asar p ../public/ ./app.asar

mkdir -p ./lw/resources
cp ./app.asar ./lw/resources/app.asar

# Windows

if [ ! -f ./musictime-windows-ia32.zip ]; then
	cp ./electron-v0.34.3-win32-ia32.zip ./musictime-windows-ia32.zip
fi

cd ./lw

zip -r ../musictime-windows-ia32.zip ./

cd ..

if [ ! -f ./musictime-windows-x64.zip ]; then
	cp ./electron-v0.34.3-win32-x64.zip ./musictime-windows-x64.zip
fi

cd ./lw

zip -r ../musictime-windows-x64.zip ./

cd ..

# Linux

if [ ! -f ./musictime-linux-ia32.zip ]; then
	cp ./electron-v0.34.3-linux-ia32.zip ./musictime-linux-ia32.zip
fi

cd ./lw

zip -r ../musictime-linux-ia32.zip ./

cd ..

if [ ! -f ./musictime-linux-x64.zip ]; then
	cp ./electron-v0.34.3-linux-x64.zip ./musictime-linux-x64.zip
fi

cd ./lw

zip -r ../musictime-linux-x64.zip ./

cd ..

rm -rf ./lw

# OSX

if [ ! -f ./musictime-darwin.zip ]; then
	cp ./electron-v0.34.3-darwin-x64.zip ./musictime-darwin.zip
fi

mkdir -p ./darwin/Electron.app/Contents/Resources/

cp ./app.asar ./darwin/Electron.app/Contents/Resources/

cd ./darwin/

zip -r ../musictime-darwin.zip ./

cd ..

rm -rf ./darwin
