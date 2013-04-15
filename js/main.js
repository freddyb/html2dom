// nodes = []; // debug
function parseHTML() {
  document.querySelector("#domjs").style.border = "";
  var x = html2dom.parse(document.querySelector("#html").value);
  document.querySelector("#domjs").value = x;
}
function evalParsedHTML() {
  //parseHTML();
  document.querySelector("#resulthtml").style.border = "";

  html2dom.dom2html(document.querySelector("#domjs").value,  function callback(html) {
    document.querySelector("#resulthtml").value = html;
    });

}

function viewHTML() {
  var iframe = document.querySelector("#iframe");
  iframe.style.display = "block";
}

function tutorial() {
  tutspanList = document.querySelectorAll('.tutorial');
  for (var i=0; i< tutspanList.length; i++) {
    tutspanList[i].style.display = "inline";
  }
  var tutsrc = '<table border=4 cellspacing=4 cellpadding=4><tr><td bgcolor="#ffff00">yellow stars<td bgcolor="#00ff00">green clovers</tr><tr><td bgcolor="#ff00ff">purple moons<td bgcolor="00ffff">blue something or other...</td></tr></table>';
  document.querySelector("#html").value = tutsrc;
}

function compareNodes() {
  // parse both strings into a DOM, this helps us with element attribute re-ordering
  var r_parser = new DOMParser()
  var r_doc = r_parser.parseFromString(resulthtml.value, "text/html");

  var i_parser = new DOMParser()
  var i_doc = i_parser.parseFromString(html.value, "text/html");

  if (r_doc.body.outerHTML.replace(/\s/g,"") == i_doc.body.outerHTML.replace(/\s/g,"")) {
    // disregard *all* whitespaces. pretty daring, eh? :/
    document.querySelector("#domjs").style.border = "1px solid lightgreen";
    document.querySelector("#resulthtml").style.border = "1px solid lightgreen";
  }
  else {
    //XXX do something clever, compare node-wise :p
    //    hint: nodes are not equal by node.isEqualNode(othernode) if children differ,
    //    hence just walking until a non-equal case was found doesnt work.

    /*var r_iter = document.createNodeIterator(r_doc.body);
    var i_iter = document.createNodeIterator(i_doc.body);
    var r_node, i_node;
    console.group("diffnodes");
    var k = 0;
    while (r_node = r_iter.nextNode()) {
      i_node = i_iter.nextNode();

      if ( (r_node.hasChildNodes()) && (! (r_node.isEqualNode(i_node)) )) {
        k++;
        if (k < 10) { console.log("nodes", r_node, i_node); }
      }
    }
    console.groupEnd(); */
    alert("Result is not equal to the input HTML :(\nPlease file a bug!");
  }
}
