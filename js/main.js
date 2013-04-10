nodes = []; // debug
function parseHTML() {
  if (/^\S*$/.test(document.querySelector("#html").value)) {
    alert("You did not supply any HTML code...")
    return
  }
  var x = html2dom(document.querySelector("#html").value);
  document.querySelector("#domjs").value = x.res;
}
function evalParsedHTML() {
  parseHTML();
  eval(document.querySelector("#domjs").value);// magic :D
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
  var tutsrc = '<table border=4 cellspacing=4 cellpadding=4><tr><td bgcolor="#ffff00">yellow stars<td bgcolor="#00ff00">green clovers</tr><tr><td bgcolor="#ff00ff">purple moons<td bgcolor="00ffff">blue something or other...</td></tr></table>';
  document.querySelector("#html").value = tutsrc;
  alert("Now play with the three buttons below 'your' HTML markup.");
}

function compareNodes() {
  if (/^\S*$/.test(resulthtml.value) || /^\S*$/.test(html.value)) {
    alert("One of the HTML textareas is empty..");
    return;
  }
  var r_parser = new DOMParser()
  r_doc = r_parser.parseFromString(resulthtml.value, "text/html");

  var i_parser = new DOMParser()
  i_doc = i_parser.parseFromString(html.value, "text/html");

  if (r_doc.body.outerHTML.replace(/\s/g,"") == i_doc.body.outerHTML.replace(/\s/g,"")) {
    // disregard *all* whitespaces. pretty daring, eh? :/
    alert("All nodes equal, yay :)");
  }
  else {
    //XXX do something clever, compare node-wise :p
    //    hint: nodes are not equal by node.isEqualNode(othernode) if children differ,
    //    hence just walking until a non-equal case was found doesnt work.
    alert("Result is not equal to the input HTML :(\nPlease file a bug!");
  }
}
