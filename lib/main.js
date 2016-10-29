'use strict';
const fs = require('fs');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog=electron.dialog;


var mainWindow = null;

app.on('ready',function(){
	mainWindow= new BrowserWindow();

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.webContents.openDevTools();

	openFile();

	mainWindow.on('closed',function(){
		mainWindow = null;
	})
});

function openFile() {
	var files = dialog.showOpenDialog(mainWindow, {
		properties:['openFile'],
		filters:[
		{name: 'Markdown Files', extensions:['md']}]
	});
	if (!files) {
		return;
	} 
	var file = files[0];
	var content = fs.readFileSync(file).toString();
	console.log(content);
	mainWindow.webContents.send('file-opened', file, content);
}

exports.openFile = openFile;