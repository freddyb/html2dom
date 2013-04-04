# html2dom

JavaScript library to parse HTML mark-up and convert it into DOM calls.


## Example:

See this HTML?

``` html
<p>Hello <b>World</b></p>
```

What if we wanted add this to a document using JS?
Let's use html2dom for that!
``` js
// this returns a stupid javascript object:
h2d = html2dom('<p>Hello<b>World</b</p>');

// it's res attribute contains the generated JavaScript source code:
console.log(h2d.res);
```

This will give us:

``` js
docFragment = document.createDocumentFragment(); // contains all gathered nodes
p_0 = document.createElement('P');
text_0 = document.createTextNode((new String("Hello ")));
p_0.appendChild(text_0);
b_0 = document.createElement('B');
text_1 = document.createTextNode((new String("World")));
b_0.appendChild(text_1);
p_0.appendChild(b_0);
docFragment.appendChild(p_0);
```




## ...but why all this?
People like to use innerHTML and this sucks.

* innerHTML is bad for performance
* the browser will have to parse a static string on a per-runtime basis
* starting off with DOM code will make it easier to seperate text and mark-up
* mixing user input with text nodes is not as harmful as doing this with innerHTML (hint: DOM XSS)

## Demo?

[Demo.](http://freddyb.github.com/html2dom/)



## License
Mozilla Public License
# html2dom

JavaScript library to parse HTML mark-up and convert it into DOM calls.


## Example:

See this HTML?

``` html
<p>Hello <b>World</b></p>
```

What if we wanted add this to a document using JS?
Let's use html2dom for that!
``` js
// this returns a stupid javascript object:
h2d = html2dom('<p>Hello<b>World</b</p>');

// it's res attribute contains the generated JavaScript source code:
console.log(h2d.res);
```

This will give us:

``` js
docFragment = document.createDocumentFragment(); // contains all gathered nodes
p_0 = document.createElement('P');
text_0 = document.createTextNode((new String("Hello ")));
p_0.appendChild(text_0);
b_0 = document.createElement('B');
text_1 = document.createTextNode((new String("World")));
b_0.appendChild(text_1);
p_0.appendChild(b_0);
docFragment.appendChild(p_0);
```




## ...but why all this?
People like to use innerHTML and this sucks.

* innerHTML is bad for performance
* the browser will have to parse a static string on a per-runtime basis
* starting off with DOM code will make it easier to seperate text and mark-up
* mixing user input with text nodes is not as harmful as doing this with innerHTML (hint: DOM XSS)

## Demo?

[Demo.](http://freddyb.github.com/html2dom/)



## License
Mozilla Public License

