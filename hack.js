// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// 
const electronHead = `
<!--- ============================================= --->
<!--- REQUIRED TO RUN WITHIN ELECTRON --->		
<base href="./">
<!-- Insert this line above script imports  -->
<script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
<!--- ============================================= --->
`
const electronBody = `
<!--- ============================================= --->
<!--- REQUIRED TO RUN WITHIN ELECTRON --->		
<!-- Insert this line after script imports -->
<script>if (window.module) module = window.module;</script>
<!--- ============================================= --->
`

var fs = require( 'fs' )
const FILE_LOCATION = './server/cfdocs/views/layout.cfm'

appendHacks( electronHead, '</head>' )
appendHacks( electronBody, '</body>' )

function appendHacks( content, token ) {
	let data = fs.readFileSync( FILE_LOCATION ).toString()
	if( data.indexOf( '<script>if (window.module) module = window.module;</script>' ) < 0 ) {
		let position = data.indexOf( token )
		let file_content = data.substring( position )
		let file = fs.openSync( FILE_LOCATION, 'r+' )
		let bufferedText = new Buffer( content + file_content )
		fs.writeSync( file, bufferedText, 0, bufferedText.length, position )
		fs.close( file )
	}
}