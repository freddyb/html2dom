nodes = []

function parseHTML() {
  x = html2dom(document.querySelector("#html").value);
  document.querySelector("#domjs").value = x.res;
}
function evalParsedHTML() {
  parseHTML();
  eval(x.res);// magic :D
  while (x=iframe.contentWindow.document.body.firstChild) {
      iframe.contentWindow.document.body.removeChild(x);
  }
  iframe.contentWindow.document.body.appendChild(docFragment);
  document.querySelector("#resulthtml").value = iframe.contentWindow.document.body.outerHTML;
}

function viewHTML() {
  evalParsedHTML();
  iframe.style.display = "block";
}

function tutorial() {
  var tutsrc = '<table border=4 cellspacing=4 cellpadding=4>\n<tr><td bgcolor="#ffff00">yellow stars<td bgcolor="#00ff00">green clovers</tr>\n<tr><td bgcolor="#ff00ff">purple moons<td bgcolor="00ffff">blue something or other...</td></tr>\n</table>';
  document.querySelector("#html").value = tutsrc;
  alert("Now play with the three buttons below 'your' HTML markup.");
}
