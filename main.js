const electron = require( 'electron' )
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require( 'path' )
const url = require( 'url' )

const file = path.join( __dirname, '/bin/box.exe' );
const execFile = require( 'child_process' ).execFile;
const execFileSync = require( 'child_process' ).execFileSync;
const boxInstance = "box";
// Used to insert js hack to allow jquery to load in rendered process
require( './hack.js' );
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Start the cfml engine
boxStart();

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow( {
		width: 1024,
		height: 768
	} )

	// and load the index.html of the app.
	mainWindow.loadURL( url.format( {
		pathname: path.join( __dirname, 'index.html' ),
		protocol: 'file:',
		slashes: true
	} ) );


	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on( 'closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		boxStop();
		mainWindow = null
	} )

	// OTHER ELECTRON EVENTS

	mainWindow.webContents.on( 'did-get-redirect-request', ( event, url ) => {
		// console.log( 'did-get-redirect-request', url );
	} );

	mainWindow.webContents.on( 'did-start-loading', () => {
		// console.log( 'did-start-loading' );
	} );

	mainWindow.webContents.on( 'did-get-response-details', ( event, status, newUrl, originalUrl ) => {
		// console.log( 'did-get-response-details', event, status, newUrl, originalUrl );
	} );

	mainWindow.webContents.on( 'did-navigate-in-page', ( event, url ) => {
		// console.log( 'did-navigate-in-page', url );
	} );

	mainWindow.webContents.on( 'new-window', ( event, url ) => {
		// console.log( 'new-window', url );
	} );

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', createWindow )

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	boxStop();
	if( process.platform !== 'darwin' ) {
		app.quit()
	}
} )

app.on( 'activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if( mainWindow === null ) {
		createWindow()
	}
} )

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function boxStart() {

	let args = [
		"start",
		'cfengine="lucee@4.5.5+006"',
		'port=8080',
		"name=" + boxInstance,
		"openbrowser=false",
		"directory=" + path.join( __dirname, 'server/cfdocs' ),
		"host=127.0.0.1",
		"--force",
		"rewritesEnable=true",
		"rewritesConfig=server/cfdocs/rewrites.xml"
	];
	let options;

	execFile( file, args, options, ( error, stdout, stderr ) => {
		// command output is in stdout
		// console.log( 'started', error, stdout, stderr );
		// Load the Lucee site
		mainWindow.loadURL( 'http://localhost:8080/' );
	} );
}

function boxStop() {
	let args = [ "stop", "name=" + boxInstance, "--all" ];
	let options;

	execFileSync( file, args, options, function( error, stdout, stderr ) {
		// command output is in stdout
		// console.log( 'stopped', error, stdout, stderr );
	} );

}