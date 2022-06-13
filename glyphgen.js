// This is a program that generates glyphs in the Frisu script.

const GRID = 20;

var ctx = new C2S(GRID * 10, GRID * 10);
var svg = document.getElementById('svg');

const GLYPHS = {
  'tho': [frown, slash, smile],
  'lhii': [frown, leftBar, smile],
  'lhi': [frown, rightBar, smile]
};

//////////////////////////////////////////////////////////////
/// Atom functions below
//////////////////////////////////////////////////////////////

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
  draw_glyph(ctx, pieces[0], pieces[1], pieces[2]);
}

///////////////////////////////////////////////////////////////////
/// Glyph functions below
///////////////////////////////////////////////////////////////////

// function glyph_tho(ctx) {
//   draw_glyph(ctx, frown, slash, smile);
// }

// function glyph_lhii(ctx) {
//   draw_glyph(ctx, frown, leftBar, smile);
// }

// function glyph_lhi(ctx) {
//   draw_glyph(ctx, frown, rightBar, smile);
// }

///////////////////////////////////////////////////////////////////
// Main code below
///////////////////////////////////////////////////////////////////

// Draw the grid so we can see it.
ctx.strokeStyle = "#c0c0c0";
ctx.strokeRect(0, 0, (GRID * 5), (GRID * 5));
for (var x = 0; x < 5; x++) {
  ctx.moveTo(x * GRID, 0);
  ctx.lineTo(x * GRID, GRID * 5);
  ctx.stroke();
}
for (var y = 0; y < 5; y++) {
  ctx.moveTo(0, y * GRID);
  ctx.lineTo(GRID * 5, y * GRID);
  ctx.stroke();
}

// Draw a single glyph.
ctx.strokeStyle = "#0000ff";
ctx.lineWidth = 3;
glyph(ctx, 'lhi');





// Finally, draw the SVG into the HTML document.
svg.appendChild(ctx.getSvg());
