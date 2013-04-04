html2dom

JavaScript library to parse HTML mark-up and convert it into DOM calls.


Example:

See this HTML?

<p>Hello <b>World</b</p>


What if we wanted add this to a document using JS?
Let's use html2dom for that!

        // this returns a stupid javascript object:
        h2d = html2dom('<p>Hello<b>World</b</p>'); 

        // it's res attribute contains the generated JavaScript source code:
        console.log(h2d.res);


This will give us:


        docFragment = document.createDocumentFragment(); // contains all gathered nodes
        p_0 = document.createElement('P');
        text_0 = document.createTextNode((new String("Hello ")));
        p_0.appendChild(text_0);
        b_0 = document.createElement('B');
        text_1 = document.createTextNode((new String("World")));
        b_0.appendChild(text_1);
        p_0.appendChild(b_0);
        docFragment.appendChild(p_0);






Demo:

Try index.html for a nice and easy demo.



License: Mozilla Public License
