var html2dom = (function() {
  /*
  * There is no guarantee as to what might happen if the things supplied to html2dom are not valid html.
  * It's also fairly certain that your html will be mutated. Attributes might shift positions and attribute
    values without quotation mark will probably get quotes. Single quotes might be turned into double quotes.
  */

  var cnt = 0;
  var ids = {};
  var src = ""
  var parentName;
  return { parse: parse };

  function parse(htmlsource) {
    if (typeof DOMParser == "function") {
      // a bit more heavy-weight and Firefox only (this is OK for b2g things ;))
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlsource, "text/html");
    }
    else {
      throw Error("Your JS environment doesn't come with either of the supported parsers (document.createDocumentFragment or DOMParser)");
    }
    //TODO work around the body thing...
    walkNodes(doc.body); // using body because domparser always creates html, head, body
    return src;
  }

function mkId(node) {
  var name = node.nodeName.replace(/[^a-zA-Z]/,"")
  name = name.toLowerCase(); //XXX use appropriate CamelCase or whatever coding guidelines say      cnt++;
  //TODO: replace with WeakMap, once browser support it.
    Object.defineProperty(node, "h2d_nodeID", {configurable:true, writable:true}) // this looks like an awful hack. in fact...it is! :/
    if (name in ids) {
      var i = ids[name].length;
      ids[name].push(name +'_'+i);
      node.h2d_nodeID = name +'_'+i;
    }
    else {
      ids[name] = [name+'_0'];
      node.h2d_nodeID = name+'_0';
    }
  }
  function strToSrc(s) {
    // String.toSource() gives us (new String("foobar")), this is a bit ugly.
    // the upside is, that it does string escaping for us.
    // so we use String.toSource() and regex-search for the inner part.
    return ( s.toSource() ).match(/\(new String\((.+)\)\)/)[1];
  }
  function newElement(node , el_name) {
    if (!("h2d_nodeID" in node)) { mkId(node); }
    if (el_name == "script") { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline JavaScript.\n";
    }
    src += ("\n" + node.h2d_nodeID + " = document.createElement('" + el_name +"');\n");
  }
  function newAttribute(node, attr,val) {
    if (attr.indexOf("on") == 0) { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline JavaScript and event handlers. Use addEventHandler instead!\n";
    }
    if (attr == "style") { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline styles. Use ``"+ node.h2d_nodeID + ".style'' instead of setAttribute.\n";
    }
      src += ( node.h2d_nodeID + ".setAttribute(" + strToSrc(attr) + ","+ strToSrc(val) +");\n");
  }
  function newText(node, text) {
    if (!("h2d_nodeID" in node)) { mkId(node); }
    src += (node.h2d_nodeID + " = document.createTextNode(" +  strToSrc(text) +");\n");
  }
  function newComment(node, cmt) {
    if (!("h2d_nodeID" in node)) { mkId(node); }
   src += (node.h2d_nodeID +" = document.createComment(" +  strToSrc(cmt) +");\n");
  }
  function appendToParent(par, node) {
    src += (par+".appendChild("+ node.h2d_nodeID +");\n");
  }

  function walkNodes(root) {
    var iter = document.createNodeIterator(root);
    var node;
    while (node = iter.nextNode()) {
        var nodeDescr = node +', name: '+ node.nodeName + ', type: ' + node.nodeType;
        if (node.nodeValue != null) {
          nodeDescr += ', value:' + node.nodeValue.toSource();
        }
        if (node == root) {
          if (src.indexOf("docFragment") != 0) {
            src += "docFragment = document.createDocumentFragment(); // contains all gathered nodes\n";
            var parentName = "docFragment";
            // set fixed id (hackish..)...
            Object.defineProperty(node, "h2d_nodeID", {configurable:true, writable:true})
            node.h2d_nodeID = "docFragment";
            continue; // don't add root element (body)
          }
        }
        else {
          var parentName = node.parentNode.h2d_nodeID;
        }
        if (node.nodeType == Node.ELEMENT_NODE) { // ELEMENT_NODE == 1
          newElement(node, node.nodeName);
          // let's replace attributes
          for (var j=0;j<node.attributes.length;j++) {
              var a = node.attributes[j].name;
              var v = node.attributes[j].value;
              newAttribute(node, a, v)
          }
          if (parentName != undefined) { appendToParent(parentName, node); }
        }
        else if (node.nodeType == Node.TEXT_NODE) {
          if (/\S/.test(node.textContent)) {
            // skips whitespace-only
            newText(node, node.textContent);
            if (parentName != undefined) { appendToParent(parentName, node); }
          }
        }
        else if (node.nodeType == Node.COMMENT_NODE){ // 3
          newComment(node, node.nodeValue);
          if (parentName != undefined) { appendToParent(parentName, node); }
        }
        else {
         console.log("Unknown Node Type: " + nodeDescr );
        }
      }
    }
})();