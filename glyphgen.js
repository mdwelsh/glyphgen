// This is a program that generates glyphs in the Frísú script.

const GRID = 20;
const SHOWGRID = false;

var ctx = new C2S(GRID * 30, GRID * 10);
var svg = document.getElementById('svg');

const GLYPHS = {
  // Format is: Top, middle, bottom, is-ascender
  'fa': [frown, rightBar, lowerDash, false],
  'fu': [frown, rightBar, frownR, false],
  'tho': [frown, slash, smile, true],
  'lhii': [frown, leftBar, smile, true],
  'lhi': [frown, rightBar, smile, true],
  'sa': [frown, backslash, circleTR, true],
  'so': [frown, slash, circleTL, true],
  'si': [smileL, backslash, circleTR, true],
  'sii': [smileR, slash, circleTL, true],
};

//////////////////////////////////////////////////////////////
/// Atom functions below
//////////////////////////////////////////////////////////////

function dot(ctx) {
  ctx.save();
  ctx.lineWidth = GRID/7;
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/15, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.restore();
}

function smile(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, false);
  ctx.stroke();
  ctx.moveTo(0, GRID/2);
  ctx.lineTo(0, 0);
  ctx.moveTo(GRID, GRID/2);
  ctx.lineTo(GRID, 0);
  ctx.stroke();
}

function smileL(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, false);
  ctx.stroke();
  ctx.moveTo(0, GRID);
  ctx.lineTo(0, 0);
  ctx.moveTo(GRID, GRID/2);
  ctx.lineTo(GRID, 0);
  ctx.stroke();
}

function smileR(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, false);
  ctx.stroke();
  ctx.moveTo(0, GRID/2);
  ctx.lineTo(0, 0);
  ctx.moveTo(GRID, GRID);
  ctx.lineTo(GRID, 0);
  ctx.stroke();
}

function frown(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, true);
  ctx.stroke();
  ctx.moveTo(0, GRID/2);
  ctx.lineTo(0, GRID);
  ctx.moveTo(GRID, GRID/2);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function frownL(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, true);
  ctx.stroke();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, GRID);
  ctx.moveTo(GRID, GRID/2);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function frownR(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, Math.PI, true);
  ctx.stroke();
  ctx.moveTo(0, GRID/2);
  ctx.lineTo(0, GRID);
  ctx.moveTo(GRID, 0);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function upperDash(ctx) {
  ctx.moveTo(0, 0);
  ctx.lineTo(GRID, 0);
  ctx.stroke();
}

function lowerDash(ctx) {
  ctx.moveTo(0, GRID);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function circleBR(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, 2*Math.PI, true);
  ctx.moveTo(GRID, GRID/2);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function circleBL(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, 2*Math.PI, true);
  ctx.moveTo(0, GRID/2);
  ctx.lineTo(0, GRID);
  ctx.stroke();
}

function circleTR(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, 2*Math.PI, true);
  ctx.moveTo(GRID, 0);
  ctx.lineTo(GRID, GRID/2);
  ctx.stroke();
}

function circleTL(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, 2*Math.PI, true);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, GRID/2);
  ctx.stroke();
}

function circle(ctx) {
  ctx.beginPath();
  ctx.arc(GRID/2, GRID/2, GRID/2, 0, 2*Math.PI, true);
  ctx.stroke();
}

function leftBar(ctx) {
  ctx.moveTo(0, 0);
  ctx.lineTo(0, GRID);
  ctx.stroke();
}

function rightBar(ctx) {
  ctx.moveTo(GRID, 0);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function slash(ctx) {
  ctx.moveTo(GRID, 0);
  ctx.lineTo(0, GRID);
  ctx.stroke();
}

function backslash(ctx) {
  ctx.moveTo(0, 0);
  ctx.lineTo(GRID, GRID);
  ctx.stroke();
}

function draw_glyph(ctx, upper, middle, lower) {
  ctx.save();
  ctx.translate(GRID, GRID);
  upper(ctx);
  ctx.restore();
  
  ctx.save();
  ctx.translate(GRID, GRID*2);
  middle(ctx);
  ctx.restore();
  
  ctx.save();
  ctx.translate(GRID, GRID*3);
  lower(ctx);
  ctx.restore();
}

function glyph(ctx, key) {
  pieces = GLYPHS[key];
  ctx.save();
  if (!pieces[3]) {
    ctx.translate(0, GRID * 2);
  }
  draw_glyph(ctx, pieces[0], pieces[1], pieces[2]);
  ctx.restore();
}

function glyphs(ctx, keys) {
  ctx.save();
  ctx.translate(0, GRID * 3);
  dot(ctx);
  ctx.restore();

  for (let index in keys) {
    if (keys[index] == "EOW") {
      ctx.save();
      //ctx.translate(-GRID, 0);
      let prev_glyph = GLYPHS[keys[index-1]];
      if (prev_glyph[3]) {
        // Previous glyph is an ascender.
        ctx.translate(0, GRID * 4);
      } else {
        // Previous glyph is a descender.
        ctx.translate(0, GRID * 2);
      }
      dot(ctx);
      ctx.restore();
    } else {    
      glyph(ctx, keys[index]);
      ctx.translate(GRID, 0);
    }
  }

  ctx.save();
  ctx.translate(GRID, GRID * 3);
  dot(ctx);
  ctx.translate(GRID, 0);
  ctx.restore();
}

function downloadSVG() {
  let svgdata = ctx.getSerializedSvg();

   var link = document.createElement('a');
   link.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(svgdata));
   link.setAttribute('download', "glyphs.svg");
   link.style.display = 'none';
   document.body.appendChild(link);
   link.click();
}

///////////////////////////////////////////////////////////////////
// Main code below
///////////////////////////////////////////////////////////////////

// Draw the grid so we can see it.
if (SHOWGRID) {
  ctx.save();
  ctx.strokeStyle = "#c0c0c0";
  ctx.strokeRect(0, 0, (GRID * 30), (GRID * 7));
  for (var x = 0; x < 30; x++) {
    ctx.moveTo(x * GRID, 0);
    ctx.lineTo(x * GRID, GRID * 7);
    ctx.stroke();
  }
  for (var y = 0; y < 7; y++) {
    ctx.moveTo(0, y * GRID);
    ctx.lineTo(GRID * 30, y * GRID);
    ctx.stroke();
  }
  ctx.restore();
}


// Set the main context.
ctx.strokeStyle = "#000000";
ctx.fillStyle = 'black';
ctx.lineCap = 'round';
ctx.lineWidth = 3;

// Draw some glyphs.
glyphs(ctx, ['fu', 'lhii', 'EOW', 'fa', 'fu', 'EOW', 'so', 'lhii', 'lhii', 'fa']);

// Finally, draw the SVG into the HTML document.
svg.appendChild(ctx.getSvg());
