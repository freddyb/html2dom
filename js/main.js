nodes = []
	function html2dom(htmlsource) {
	/* 
	*
	*
	*
	* There is no guarantee as to what might happen if the things supplied to html2dom are not valid html.
	*/

	function nextId(name) {
		name = name.replace(/[^a-zA-Z]/,"")
		name = name.toLowerCase(); // use appropriate CamelCase or whatever coding guidelines say
		cnt++;
		if (name in ids) {
			i = ids[name].length;
			ids[name].push(name +'_'+i);
			return name +'_'+i
		}
		else {
			ids[name] = [name+'_0'];
			return name+'_0'
		
		}
	}
	function escSingleQuote(t) {
		return t.replace("'", "\'"); 
	}

	function newElement(node_var,node_name) {
		src += ("\n"+node_var+ " = document.createElement('" + node_name +"');\n");
	}
	function newAttribute(node_var, attr,val) {
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


	function walkNodes(parent, nodelist) {
		console.log('--- '+nodelist.length +" nodes")
		if (parent == undefined) {
			src += "docFragment = document.createDocumentFragment(); // contains all gathered nodes\n";
			parent = "docFragment";
		}
		for (var i=0;i<nodelist.length;i++) {
			var node = nodelist[i];
			nodes.push(node);
			var nodeDescr = nodelist[i] +', name: '+ node.nodeName + ', type:' + node.nodeType;
			if (node.nodeValue != null) {
				nodeDescr += ', value:' + node.nodeValue.toSource();	
			}
			console.log("Trying to insert: "+ nodeDescr);
			if (node.nodeType == Node.ELEMENT_NODE) { // ELEMENT_NODE == 1
				var node_var = nextId(node.nodeName);
				newElement(node_var, node.nodeName);
				// replace attributes

				for (var j=0;j<node.attributes.length;j++) {
					var a = node.attributes[j].name;
					var v = node.attributes[j].value;
					newAttribute(node_var, a, v)
				}
				// recurse into subtrees: attributes and
				if (node.childNodes.length > 0)  {
					walkNodes(node_var, node.childNodes);
				}
				else {
					console.log("no children for: " + nodeDescr );
				}
				if (parent != undefined) { appendToParent(parent,node_var); }
			}
		   else if (node.nodeType == Node.TEXT_NODE) {
		   	 	if (!(/^\s+$/.test(node.textContent))) {
		   	 		// skip empty text
		   	 		var node_var = nextId(node.nodeName);
		   			newText(node_var, node.textContent); 
		   			if (parent != undefined) { appendToParent(parent,node_var); }		   
		   		}
		   }
		   else if (node.nodeType == Node.COMMENT_NODE){ // 3
		   		var node_var = nextId(node.nodeName);
		   		newComment(node_var, node.nodeValue); 
		   		if (parent != undefined) { appendToParent(parent,node_var); }		   
		   }	   
		   else {
			   console.log("Unknown Node Type: " + nodeDescr );
		   }
		
		}
		if (typeof nodeDescr != "undefined") { // else we iterated over an empty list
			console.log("done wakling in node:" + nodeDescr);	
		}
	}

	


	function init(s) {// init
		cnt = 0;
		ids = {};
		src = ""		
		//if ((typeof document != "undefined") && (document instanceof HTMLDocument)) {
		//	doc = document.createDocumentFragment(s);
		//}
		//else
		if (typeof DOMParser == "function") {
			// a bit more heavy-weight and Firefox only (this is OK for b2g things ;))
			var parser = new DOMParser();
			doc = parser.parseFromString(s, "text/html");
		}
		else {
			throw Error("Your JS environment doesn't come with either of the supported parsers (document.createDocumentFragment or DOMParser)");
		}
		console.log("starting to walk the document");
		walkNodes(undefined, doc.body.childNodes); // using body because domparser always creates html,head,body
	}
	init(htmlsource);

	return { res:src, ni : nextId,

	};


}


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