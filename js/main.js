//nodes = []; // debug
function parseHTML() {
  x = html2dom(document.querySelector("#html").value);
  document.querySelector("#domjs").value = x.res;
}
function evalParsedHTML() {
  parseHTML();
  eval(x.res);// magic :D
  while (iframe.contentWindow.document.body.hasChildNodes()) {
      iframe.contentWindow.document.body.removeChild(
        iframe.contentWindow.document.body.firstChild
        );
  }
  iframe.contentWindow.document.body.appendChild(docFragment);
  document.querySelector("#resulthtml").value = iframe.contentWindow.document.body.innerHTML;
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

function compareNodes() {
  if (/^\S*$/.test(resulthtml.value) || /^\S*$/.test(html.value)) {
    alert("One of the HTML textareas is empty..");
    return;
  }
  var r_parser = new DOMParser()
  var r_doc = r_parser.parseFromString(resulthtml.value, "text/html");

  var i_parser = new DOMParser()
  var i_doc = i_parser.parseFromString(html.value, "text/html");

  if (i_doc.body.outerHTML == r_doc.body.outerHTML) {
    alert("All nodes equal, yay :)");
  }
  else {
    alert("Result is not equal to the input HTML :/\nPlease file a bug!");
  }
}
