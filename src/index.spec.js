import * as monaco from "monaco-editor-node";

const jsText = `// jqeuery excerpt:
//       1         2         3         4
//34567890123456789012345678901234567890
/*!
 * Sizzle CSS Selector Engine v2.3.0
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-04
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in select
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true;
		},
		{ dir: "parentNode", next: "legend" }
  );})
`;

const tsText = `/* Game of Life
* Implemented in TypeScript
* To learn more about TypeScript, please visit http://www.typescriptlang.org/
*/

namespace Conway {

 export class Cell {
   public row: number;
   public col: number;
   public live: boolean;

   constructor(row: number, col: number, live: boolean) {
     this.row = row;
     this.col = col;
     this.live = live;
   }
 }

 export class GameOfLife {
   private gridSize: number;
   private canvasSize: number;
   private lineColor: string;
   private liveColor: string;
   private deadColor: string;
   private initialLifeProbability: number;
   private animationRate: number;
   private cellSize: number;
   private context: CanvasRenderingContext2D;
   private world;


   constructor() {
     this.gridSize = 50;
     this.canvasSize = 600;
     this.lineColor = '#cdcdcd';
     this.liveColor = '#666';
     this.deadColor = '#eee';
     this.initialLifeProbability = 0.5;
     this.animationRate = 60;
     this.cellSize = 0;
     this.world = this.createWorld();
     this.circleOfLife();
   }

   public createWorld() {
     return this.travelWorld( (cell : Cell) =>  {
       cell.live = Math.random() < this.initialLifeProbability;
       return cell;
     });
   }

   public circleOfLife() : void {
     this.world = this.travelWorld( (cell: Cell) => {
       cell = this.world[cell.row][cell.col];
       this.draw(cell);
       return this.resolveNextGeneration(cell);
     });
     setTimeout( () => {this.circleOfLife()}, this.animationRate);
   }

   public resolveNextGeneration(cell : Cell) {
     var count = this.countNeighbors(cell);
     var newCell = new Cell(cell.row, cell.col, cell.live);
     if(count < 2 || count > 3) newCell.live = false;
     else if(count == 3) newCell.live = true;
     return newCell;
   }

   public countNeighbors(cell : Cell) {
     var neighbors = 0;
     for(var row = -1; row <=1; row++) {
       for(var col = -1; col <= 1; col++) {
         if(row == 0 && col == 0) continue;
         if(this.isAlive(cell.row + row, cell.col + col)) {
           neighbors++;
         }
       }
     }
     return neighbors;
   }

   public isAlive(row : number, col : number) {
     if(row < 0 || col < 0 || row >= this.gridSize || col >= this.gridSize) return false;
     return this.world[row][col].live;
   }

   public travelWorld(callback) {
     var result = [];
     for(var row = 0; row < this.gridSize; row++) {
       var rowData = [];
       for(var col = 0; col < this.gridSize; col++) {
         rowData.push(callback(new Cell(row, col, false)));
       }
       result.push(rowData);
     }
     return result;
   }

   public draw(cell : Cell) {
     if(this.context == null) this.context = this.createDrawingContext();
     if(this.cellSize == 0) this.cellSize = this.canvasSize/this.gridSize;

     this.context.strokeStyle = this.lineColor;
     this.context.strokeRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);
     this.context.fillStyle = cell.live ? this.liveColor : this.deadColor;
     this.context.fillRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);
   }

   public createDrawingContext() {
     var canvas = <HTMLCanvasElement> document.getElementById('conway-canvas');
     if(canvas == null) {
         canvas = document.createElement('canvas');
         canvas.id = 'conway-canvas';
         canvas.width = this.canvasSize;
         canvas.height = this.canvasSize;
         document.body.appendChild(canvas);
     }
     return canvas.getContext('2d');
   }
 }
}

var game = new Conway.GameOfLife();
`;

const cssText = `@import url("something.css");

body {
  margin: 0;
  padding: 3em 6em;
  font-family: tahoma, arial, sans-serif;
  color: #000;
}

#navigation a {
  font-weight: bold;
  text-decoration: none !important;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1.7em;
}

h1:before, h2:before {
  content: "some contents";
}

code {
  font-family: courier, monospace;
  font-size: 80%;
  color: #418A8A;
}
`;

const htmlText = `<!DOCTYPE HTML>
<!--Example of comments in HTML-->
<html>
<head>
	<!--This is the head section-->
	<title>HTML Sample</title>
	<meta charset="utf-8">

	<!--This is the style tag to set style on elements-->
	<style type="text/css">
		h1
		{
			font-family: Tahoma;
			font-size: 40px;
			font-weight: normal;
			margin: 50px;
			color: #a0a0a0;
		}

		h2
		{
			font-family: Tahoma;
			font-size: 30px;
			font-weight: normal;
			margin: 50px;
			color: #fff;
		}

		p
		{
			font-family: Tahoma;
			font-size: 17px;
			font-weight: normal;
			margin: 0px 200px;
			color: #fff;
		}

		div.Center
		{
			text-align: center;
		}

		div.Blue
		{
			padding: 50px;
			background-color: #7bd2ff;
		}

		button.Gray
		{
			font-family: Tahoma;
			font-size: 17px;
			font-weight: normal;
			margin-top: 100px;
			padding: 10px 50px;
			background-color: #727272;
			color: #fff;
			outline: 0;
    			border: none;
    			cursor: pointer;
		}

		button.Gray:hover
		{
			background-color: #898888;
		}

		button.Gray:active
		{
			background-color: #636161;
		}

	</style>

	<!--This is the script tag-->
	<script type="text/javascript">
		function ButtonClick(){
			// Example of comments in JavaScript
			window.alert("I'm an alert sample!");
		}
	</script>
</head>
<body>
	<!--This is the body section-->
	<div class="Center">
		<h1>NAME OF SITE</h1>
	</div>
	<div class="Center Blue">
			<h2>I'm h2 Header! Edit me in &lt;h2&gt;</h2>
			<p>
				I'm a paragraph! Edit me in &lt;p&gt;
				to add your own content and make changes to the style and font.
				It's easy! Just change the text between &lt;p&gt; ... &lt;/p&gt; and change the style in &lt;style&gt;.
				You can make it as long as you wish. The browser will automatically wrap the lines to accommodate the
				size of the browser window.
			</p>
			<button class="Gray" onclick="ButtonClick()">Click Me!</button>
	</div>
</body>
</html>
`;

describe("colorize", () => {
  it("js", () => {
    return monaco.colorize(jsText, "javascript", {}).then((res) => {
      expect(res).toMatchSnapshot();
    });
  });
  it("ts", () => {
    return monaco.colorize(tsText, "typescript", {}).then((res) => {
      expect(res).toMatchSnapshot();
    });
  });
  it("css", () => {
    return monaco.colorize(cssText, "text/css", {}).then((res) => {
      expect(res).toMatchSnapshot();
    });
  });
  it("html", () => {
    return monaco.colorize(htmlText, "text/html", {}).then((res) => {
      expect(res).toMatchSnapshot();
    });
  });
});

describe("getColorizeCss", () => {
  it("vs", () => {
    expect(monaco.getColorizeCss("vs")).toMatchSnapshot();
  });
  it("vs-dark", () => {
    expect(monaco.getColorizeCss("vs-dark")).toMatchSnapshot();
  });
  it("hc-black", () => {
    expect(monaco.getColorizeCss("hc-black")).toMatchSnapshot();
  });
  it("unknown", () => {
    expect(monaco.getColorizeCss("unknown")).toMatchSnapshot();
  });
});

describe("tokenize", () => {
  it("js", () => {
    expect(monaco.tokenize(jsText, "javascript")).toMatchSnapshot();
  });
  it("ts", () => {
    expect(monaco.tokenize(tsText, "typescript")).toMatchSnapshot();
  });
  it("css", () => {
    expect(monaco.tokenize(cssText, "text/css")).toMatchSnapshot();
  });
  it("html", () => {
    expect(monaco.tokenize(htmlText, "text/html")).toMatchSnapshot();
  });
});
