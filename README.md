# html2dom

JavaScript library to parse HTML mark-up and convert it into DOM calls.


More and more people use JavaScript to manipulate the DOM. Naturally
this can pose a security risk as soon as user input is involved:
Embedding user input can easily lead to Cross Site Scripting (XSS).
Having a clean JavaScript codebase that seperates HTML elements and text
can mitigating that risk by treating user data as non-HTML content.
html2dom helps you to to enforce a stricter seperation betwwen HTML and
text. Using the library will enable you to transform your big fat
assignment to innerHTML into multiple simple DOM calls.
A useful side-effect is, that browsers won't have to run a HTML parser
on your long HTML strings which might even improve your website
performance.


## Example 1: Turn HTML into JavaScript that calls DOM Methods

See this HTML?

``` html
<p id="greeting">Hello <b>World</b></p>
```

What if we wanted add this to a document using JavaScript?
Let's use html2dom for that!
``` js
var h2d = html2dom.parse('<p id="greeting">Hello <b>World</b></p>');
console.log(h2d);
```

This will give us:

``` js
var docFragment = document.createDocumentFragment(); // contains all gathered nodes
var greeting = document.createElement('P');
greeting.setAttribute("id", "greeting");
docFragment.appendChild(greeting);
var text = document.createTextNode("Hello ");
greeting.appendChild(text);
var b = document.createElement('B');
greeting.appendChild(b);
var text_0 = document.createTextNode("World");
b.appendChild(text_0);
```

## Example 2: Let's make our JavaScript code generate us some HTML!

Sometimes, you might want to check for yourself what happens when you throw
the supplied JavaScript code into a script tag and preview the HTML that
is being generated (the [demo](http://freddyb.github.com/html2dom/) does that).

And, do you know what? We also use that for our [tests](http://freddyb.github.com/html2dom/tests/tests.html), to see if the JavaScript we get out of
html2dom renders the HTML we have supplied in the first place. Nifty, eh?

``` js
var inp = '<p id="greeting">Hello <b>World</b></p>';
var js = html2dom.parse(inp);
html2dom.dom2html(js, function callback(res) {
	console.log("Input:", inp);
	console.log("Result:", res);
});
```

And hooray, this results is:

``` html
Input: <p id="greeting">Hello <b>World</b></p>
Result: <p id="greeting">Hello <b>World</b></p>
```
## Demo?

[Demo.](http://freddyb.github.com/html2dom/)

## Unit Tests?

[Tests.](http://freddyb.github.com/html2dom/tests/tests.html)

## License
Mozilla Public License
