/* Bio career diagram, rendered with D3 into #bio-diagram.
 * Circle + thin-line aesthetic (matches the old timeline). Features:
 *  - convergence (B.A. + M.M. -> Ph.D.), an offshoot (Ph.D. -> internship),
 *    and a fork (Postdoc -> three present roles)
 *  - labels placed by row: top row above the circle, bottom row below,
 *    middle rows to the side (away from the connector lines)
 *  - hover/focus highlights a node's lineage back to the roots
 *  - draws in when scrolled into view; re-lays-out on resize
 * Edit node labels/links (and the middle-row `side`) in NODES below.
 */
(function () {
  // --- data ------------------------------------------------------------------
  var NODES = [
    { id: 'ba',      role: 'Undergrad in Computer Science',           place: 'Harvard University' },
    { id: 'mm',      role: "Master's in Music",                       place: 'New England Conservatory',       url: 'https://necmusic.edu/dual-degree-programs' },
    { id: 'phd',     role: 'Ph.D. in Machine Learning',              side: 'left', wide: true, placeMax: 32, place: [
        { text: 'Harvard University, advised by' },
        { text: 'Finale Doshi-Velez', url: 'https://finale.seas.harvard.edu/' }
      ] },
    { id: 'msr',     role: 'Research Intern',                         place: 'Microsoft Research New England',          url: 'https://www.microsoft.com/en-us/research/theme/biomedical-ml/', side: 'right' },
    { id: 'postdoc', role: 'Postdoctoral Fellow',                     side: 'left', wide: true, place: [
        { text: 'Nock Lab', url: 'https://nocklab.fas.harvard.edu/' },
        { text: 'Harvard University' },
        { text: '& Mass General Hospital' }
      ] },
    { id: 'prof',    role: 'Assistant Professor of Computer Science', place: 'Wellesley College',              url: 'https://wellesley.edu/', current: true, side: 'right' },
    { id: 'dir',     role: 'Principal Investigator',                  place: 'MOGU Lab',                       url: 'https://mogu-lab.github.io/', current: true, side: 'right' },
    { id: 'aff',     role: 'Research Affiliations',                   roleMax: 24, current: true, place: [
        { text: 'Harvard University' },
        { text: '& Mass General Brigham' }
      ] }
  ];
  var LINKS = [
    ['ba', 'phd'], ['mm', 'phd'],
    ['phd', 'msr'], ['phd', 'postdoc'],
    ['postdoc', 'prof'], ['postdoc', 'dir'], ['postdoc', 'aff']
  ];

  var parents = {};
  LINKS.forEach(function (e) { (parents[e[1]] = parents[e[1]] || []).push(e[0]); });
  function lineage(id) {
    var seen = {}, stack = [id]; seen[id] = true;
    while (stack.length) {
      var n = stack.pop();
      (parents[n] || []).forEach(function (p) { if (!seen[p]) { seen[p] = true; stack.push(p); } });
    }
    return seen;
  }

  function wrap(text, max) {
    var words = String(text).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (t.length > max && cur) { lines.push(cur); cur = w; } else { cur = t; }
    });
    if (cur) lines.push(cur);
    return lines;
  }

  // --- layout ----------------------------------------------------------------
  function layout(w) {
    var N = {}, H;
    // Below this width the three-across top row can't fit its labels, so we
    // fall back to the stacked layout (one role per row) instead of cramming.
    if (w >= 720) {
      var rh = 132, y0 = 72, Y = [y0, y0 + rh, y0 + 2 * rh, y0 + 3 * rh];
      N.ba = { x: 0.26 * w, y: Y[0] };  N.mm = { x: 0.54 * w, y: Y[0] };
      N.phd = { x: 0.40 * w, y: Y[1] }; N.msr = { x: 0.64 * w, y: Y[1] }; // under Research Affiliations
      N.postdoc = { x: 0.40 * w, y: Y[2] };
      N.prof = { x: 0.16 * w, y: Y[3] }; N.dir = { x: 0.40 * w, y: Y[3] }; N.aff = { x: 0.64 * w, y: Y[3] };
      H = Y[3] + 96;
    } else {
      var r = 116, t = 72, Yn = function (k) { return t + k * r; };
      N.ba = { x: 0.30 * w, y: Yn(0) };  N.mm = { x: 0.70 * w, y: Yn(0) };
      N.phd = { x: 0.50 * w, y: Yn(1) };
      // Clamp so the left/right side labels stay on-screen at any narrow width.
      N.postdoc = { x: Math.max(0.38 * w, 150), y: Yn(2) };
      N.msr = { x: Math.min(0.74 * w, w - 150), y: Yn(2) };
      // Roles reversed vs. their row index so that, after the vertical flip, the
      // stacked order reads Assistant Professor -> PI -> Affiliations (matching wide).
      N.aff = { x: 0.50 * w, y: Yn(3) }; N.dir = { x: 0.50 * w, y: Yn(4) }; N.prof = { x: 0.50 * w, y: Yn(5) };
      H = Yn(5) + 96;
    }
    // Flip vertically so the most recent roles sit at the top (arrows point upward).
    var ys = Object.keys(N).map(function (k) { return N[k].y; });
    var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys);
    Object.keys(N).forEach(function (k) { N[k].y = lo + hi - N[k].y; });
    return { N: N, H: H };
  }

  var ARROW_GAP = 14; // stop the edge short of the target circle so the arrowhead shows

  function edgePath(p, c) {
    if (Math.abs(c.y - p.y) < 28) {            // near-horizontal (the offshoot)
      var dir = c.x >= p.x ? 1 : -1;
      var ex = c.x - dir * ARROW_GAP;
      var mx = (p.x + ex) / 2;
      return 'M' + p.x + ',' + p.y + 'C' + mx + ',' + p.y + ' ' + mx + ',' + c.y + ' ' + ex + ',' + c.y;
    }
    var diry = c.y >= p.y ? 1 : -1;            // vertical S-curve (merge/fork)
    var ey = c.y - diry * ARROW_GAP;
    var my = (p.y + ey) / 2;
    return 'M' + p.x + ',' + p.y + 'C' + p.x + ',' + my + ' ' + c.x + ',' + my + ' ' + c.x + ',' + ey;
  }

  var LH = 16, R = 9, GAP = 12;
  var narrowMode = false; // set per render; disables the `wide` label widening when stacked
  var labelInfo = {};     // per-render: id -> { tspans, maxW } for post-layout alignment

  // Draw a node's label at the given placement ('above' | 'below' | 'left' | 'right').
  function addLabel(g, d, place) {
    var side = (place === 'left' || place === 'right');
    // `wide` nodes wrap their side labels less tightly, so the (left-aligned)
    // text spreads further out and stacks into fewer lines.
    var wide = d.wide && !narrowMode; // only widen in the uncompressed layout
    var roleMax = d.roleMax || (side ? (wide ? 26 : 16) : 20);
    var placeMax = (!narrowMode && d.placeMax) || (side ? (wide ? 28 : 20) : 26);

    // Segments: the role (no link), then one or more place blocks (each optionally a link).
    // `place` may be a plain string (one block) or an array of { text, url }.
    var segs = [{ cls: 'role', lines: wrap(d.role, roleMax) }];
    var blocks = Array.isArray(d.place) ? d.place : [{ text: d.place, url: d.url }];
    blocks.forEach(function (b) {
      segs.push({ cls: 'place', url: b.url, lines: wrap(b.text, placeMax) });
    });

    var n = segs.reduce(function (a, s) { return a + s.lines.length; }, 0);

    var firstCenter;
    if (place === 'below') firstCenter = R + GAP + 8; // a little extra clearance under the circle
    else if (place === 'above') firstCenter = -(R + GAP) - (n - 1) * LH;
    else firstCenter = -((n - 1) * LH) / 2;

    // Everything is left-aligned (text-anchor start); lines share one left edge.
    var text = g.append('text')
      .attr('text-anchor', 'start').attr('dominant-baseline', 'central');

    var tspans = [];
    var i = 0;
    segs.forEach(function (s) {
      var host = text;
      if (s.url) {
        host = text.append('a').attr('href', s.url).attr('xlink:href', s.url)
          .attr('target', '_blank').attr('rel', 'noopener noreferrer');
      }
      s.lines.forEach(function (ln) {
        var ts = host.append('tspan').attr('class', 'bio-dg2__' + s.cls)
          .attr('x', 0).attr('y', firstCenter + i * LH).text(ln);
        tspans.push(ts.node());
        i++;
      });
    });

    // Measure the widest line, then place the left-aligned block for this side:
    //  right -> right of the circle; left -> left of the circle; above/below -> centered.
    var maxW = 0;
    tspans.forEach(function (t) {
      var lw = t.getComputedTextLength ? t.getComputedTextLength() : 0;
      if (lw > maxW) maxW = lw;
    });
    var xLeft = place === 'right' ? (R + GAP)
              : place === 'left'  ? -(R + GAP) - maxW
              : -maxW / 2;
    tspans.forEach(function (t) { t.setAttribute('x', xLeft); });
    labelInfo[d.id] = { tspans: tspans, maxW: maxW };
  }

  // --- render ----------------------------------------------------------------
  function render(container) {
    var w = container.clientWidth || 600;
    narrowMode = w < 720;
    labelInfo = {};
    var lay = layout(w), N = lay.N;
    container.innerHTML = '';

    // top row -> above, bottom row -> below, middle rows -> side
    var ys = NODES.map(function (d) { return N[d.id].y; });
    var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    function placementFor(d) {
      var y = N[d.id].y;
      if (y === minY) return 'above';
      if (y === maxY) return 'below';
      return d.side || 'right';
    }

    var svg = d3.select(container).append('svg')
      .attr('class', 'bio-dg2__svg')
      .attr('viewBox', '0 0 ' + w + ' ' + lay.H)
      .attr('width', '100%').attr('height', lay.H)
      .attr('role', 'img').attr('aria-label', 'Diagram of career and education path');

    // Arrowhead marker (shared by all edges).
    svg.append('defs').append('marker')
      .attr('id', 'bio-arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 8).attr('refY', 5)
      .attr('markerWidth', 7).attr('markerHeight', 7)
      .attr('orient', 'auto')
      .append('path')
      .attr('class', 'bio-dg2__arrowhead')
      .attr('d', 'M0,0 L10,5 L0,10 Z');

    var edges = svg.append('g').selectAll('path').data(LINKS).join('path')
      .attr('class', 'bio-dg2__edge')
      .attr('marker-end', 'url(#bio-arrow)')
      .attr('d', function (d) { return edgePath(N[d[0]], N[d[1]]); });

    var nodes = svg.append('g').selectAll('g').data(NODES).join('g')
      .attr('class', function (d) { return 'bio-dg2__node' + (d.current ? ' is-current' : ''); })
      .attr('transform', function (d) { return 'translate(' + N[d.id].x + ',' + N[d.id].y + ')'; })
      .attr('tabindex', 0);

    nodes.each(function (d) {
      var g = d3.select(this);
      if (d.current) g.append('circle').attr('class', 'bio-dg2__ring').attr('r', 11);
      g.append('circle').attr('class', 'bio-dg2__dot').attr('r', 9);
      addLabel(g, d, placementFor(d));
    });

    // Uncompressed: Ph.D. and Postdoc sit at the same x with left-side labels,
    // so align their text on a common left edge (based on the wider of the two).
    if (!narrowMode) {
      var grp = ['phd', 'postdoc'].map(function (id) { return labelInfo[id]; }).filter(Boolean);
      if (grp.length === 2) {
        var mW = Math.max(grp[0].maxW, grp[1].maxW);
        var xL = -(R + GAP) - mW;
        grp.forEach(function (li) { li.tspans.forEach(function (t) { t.setAttribute('x', xL); }); });
      }
    }

    function focusOn(id) {
      var keep = lineage(id);
      nodes.classed('is-dim', function (n) { return !keep[n.id]; });
      edges.classed('is-dim', function (e) { return !(keep[e[0]] && keep[e[1]]); })
           .classed('is-hot', function (e) { return keep[e[0]] && keep[e[1]]; });
    }
    function clearFocus() {
      nodes.classed('is-dim', false);
      edges.classed('is-dim', false).classed('is-hot', false);
    }
    nodes.on('mouseenter', function (_, d) { focusOn(d.id); })
         .on('mouseleave', clearFocus)
         .on('focusin', function (_, d) { focusOn(d.id); })
         .on('focusout', clearFocus);

    return { edges: edges, nodes: nodes };
  }

  function playIntro(sel) {
    if (!sel) return;
    sel.edges.each(function () {
      var L = this.getTotalLength();
      d3.select(this).attr('stroke-dasharray', L).attr('stroke-dashoffset', L);
    }).transition().delay(function (d, i) { return i * 70; }).duration(500)
      .attr('stroke-dashoffset', 0);
    sel.nodes.style('opacity', 0).transition()
      .delay(function (d, i) { return 180 + i * 60; }).duration(380)
      .style('opacity', 1);
  }

  function init() {
    var container = document.getElementById('bio-diagram');
    if (!container || typeof d3 === 'undefined') return;
    var sel = render(container);

    var played = false;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !played) { played = true; playIntro(sel); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(container);
    } else { played = true; }

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () { render(container); }, 200);
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
