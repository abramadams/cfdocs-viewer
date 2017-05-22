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

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>
<cfoutput><script src="#request.assetBaseURL#script.js"></script></cfoutput>
<cfparam name="request.gitFilePath" default="/">
<cfoutput><a href="https://github.com/foundeo/cfdocs#request.gitFilePath#" rel="nofollow" class="visible-lg visible-md"><img id="forkme" src="https://cdn.rawgit.com/foundeo/cfdocs/88847869f4bf61a96185fe01290165b00a2bf4e1/assets/img/fork.png" alt="Fork me on GitHub"></a></cfoutput>
<cfif request.hasExamples><script src="https://cdn.rawgit.com/foundeo/cfdocs/3da43f03663c57f499cf2de82ef82d4f74fe04cd/assets/vendor/google/code-prettify/prettify.js"></script></cfif>

<!-- Insert this line after script imports -->
<script>if (window.module) module = window.module;</script>
<!--- ============================================= --->		
`;

//document.getElementsByTagName("head")[0].innerHTML += electronHead;
var fs = require('fs')
const FILE_LOCATION = './server/cfdocs/views/layout.cfm';
// fs.readFile(FILE_LOCATION, function (err, data) {
// //    console.log(data)
//   if (err) throw err;
//   if(data.indexOf('=============================================') < 0){
//     fs.appendFile(FILE_LOCATION, electronHead, function (err) {
//     if (err) {
//         // append failed
//     } else {
//         // done
//     }
//     })
//   }
// });

fs.readFile(FILE_LOCATION, function read(err, data) {
    if (err) {
        throw err;
    }
    if (data.indexOf('=============================================') <0 ) {
        let file_content = data.toString();
        let position = data.indexOf('</head>');
        file_content = file_content.substring(position);
        var file = fs.openSync(FILE_LOCATION, 'r+');
        var bufferedText = new Buffer(electronHead + file_content);
        fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
        fs.close(file);
    }
});