nodes = []
function html2dom(htmlsource) {
  /*
  * There is no guarantee as to what might happen if the things supplied to html2dom are not valid html.
  * It's also fairly certain that your html will be mutated. Attributes might shift positions and attribute
    values without quotation mark will probably get quotes. Single quotes might be turned into double quotes.
  */
  function mkId(node) {
    var name = node.nodeName.replace(/[^a-zA-Z]/,"")
    name = name.toLowerCase(); //XXX use appropriate CamelCase or whatever coding guidelines say      cnt++;
    Object.defineProperty(node, "h2d_nodeID", {configurable:true, writable:true}) // this looks like an awful hack. in fact...it is! :/
    if (name in ids) {
      i = ids[name].length;
      node.h2d_nodeID = ids[name] = [name+'_0'];
      //return ids[name].push(name +'_'+i);
    }
    else {
      node.h2d_nodeID = [name+'_0'];
      //return ids[name] = [name+'_0'];
    }
  }
  function escSingleQuote(t) {
    return t.replace("'", "\'");
  }
  function newElement(node_var,node_name) {
    if (node_name == "script") { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline JavaScript.\n";
    }
    src += ("\n"+node_var+ " = document.createElement('" + node_name +"');\n");
  }
  function newAttribute(node_var, attr,val) {
    if (attr.indexOf("on") == 0) { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline JavaScript and event handlers. Use addEventHandler instead!\n";
    }
    if (attr == "style") { //XXX use a more generic way than this hard coded blacklist
      src += "//XXX CSP will forbid inline styles. Use ``"+node_var + ".style'' instead of setAttribute.\n";
    }
      src += ( node_var+ ".setAttribute(" + attr.toSource() + ","+ val.toSource() +");\n");
  }
  function newText(node_var, text) {
    src += (node_var+" = document.createTextNode(" +  text.toSource() +");\n");
  }
  function newComment(node_var, cmt) {
   src += (node_var+" = document.createComment('" +  cmt +"');\n");
  }
  function appendToParent(par, node) {
    src += (par+".appendChild("+ node +");\n");
  }


  function walkNodes(root) {
    var iter = document.createNodeIterator(root);
    var node;
    while (node = iter.nextNode()) {
        if (node.nodeName == "BODY") { continue; }
        var nodeDescr = node +', name: '+ node.nodeName + ', type:' + node.nodeType;
        if (node.nodeValue != null) {
          nodeDescr += ', value:' + node.nodeValue.toSource();
        }
        if (node.parentNode == root.parentNode || node.parentNode.nodeName == "BODY") {
          if (src.indexOf("docFragment") != 0) {
            src += "docFragment = document.createDocumentFragment(); // contains all gathered nodes\n";
            var parentName = "docFragment";
          }
        }
        else {
          parentName = node.parentNode.h2d_nodeID;
        }
        if (node.nodeType == Node.ELEMENT_NODE) { // ELEMENT_NODE == 1
          mkId(node);
          newElement(node.h2d_nodeID, node.nodeName);
          // let's replace attributes
          for (var j=0;j<node.attributes.length;j++) {
              var a = node.attributes[j].name;
              var v = node.attributes[j].value;
              newAttribute(node.h2d_nodeID, a, v)
          }
          if (parentName != undefined) { appendToParent(parentName, node.h2d_nodeID); }
        }
        else if (node.nodeType == Node.TEXT_NODE) {
          if (/\S/.test(node.textContent)) {
            // skips whitespace-only
            mkId(node);
            newText(node.h2d_nodeID, node.textContent);
            if (parentName != undefined) { appendToParent(parentName, node.h2d_nodeID); }
          }
        }
        else if (node.nodeType == Node.COMMENT_NODE){ // 3
          mkId(node);
          newComment(node.h2d_nodeID, node.nodeValue);
          if (parentName != undefined) { appendToParent(parentName, node.h2d_nodeID); }
        }
        else {
         console.log("Unknown Node Type: " + nodeDescr );
        }
      }
    }
  function init(s) {
      cnt = 0;
      ids = {};
      src = ""
      var parentName;
      if (typeof DOMParser == "function") {
          // a bit more heavy-weight and Firefox only (this is OK for b2g things ;))
          var parser = new DOMParser();
          doc = parser.parseFromString(s, "text/html");
      }
      else {
          throw Error("Your JS environment doesn't come with either of the supported parsers (document.createDocumentFragment or DOMParser)");
      }
      walkNodes(doc.body); // using body because domparser always creates html, head, body
      //XXX work around the body thing...
  }
  init(htmlsource);

  returnObj = { res: src };
  return returnObj;
}
