# temple
Temple is a lightweight and easy to learn API for creating DOM templates in JavaScript

## Setting up temple
Include the temple.js file ahead of any scripts which use it. This can be accomplished by simply using a script tag with the src attribute set to 'temple.js'. Check out index.html for the 'Hello Temple!' example.

### Using a script tag
```HTML
    <script src='temple.js'></script>
```

## Templates are HTML
Write templates in HTML and use variables wrapped in {{double braces}} for dynamic attributes, names, and content.
The only caveat is that the HTML must be wrapped in a single DOM element (such as the article tag in the example below). If you have a lot of HTML in a single template, simply wrap it all in a div or span to overcome this limitation.
Here we see the contents of a template file called 'topic.html':
```HTML
<article class="topic">
    <div class="dateBlock">
        <div>{{month}} {{day}}</div>
        <div>{{year}}</div>
        <p>Started by<br />{{author}}</p>
    </div>
    <h1><a href="#discussions?topic={{topicName}}" id="{{linkId}}">{{title}}</a></h1>
    <{{introTag}}>{{introText}}</{{introTag}}>
</article>
```

## Retrieve templates using Promises
temple provides a method called 'getTemplate' to import external html templates into the current context. It does this by making an XMLHttpRequest to a provided URI. temple.getTemplate() returns a promise to enable chaining requests. Alternatively, developers may choose to import the HTML string using any AJAX API.
```JavaScript
temple.getTemplate('template.html').then(function(html) {
    // Fulfill Promise to Get the template file, THEN pass HTML string to the callback
        // ... do stuff with html string such as passing to temple to convert to DOM
        // var newDom = temple.toDom(html);
});
```

## Map the template's variable names to actual data
Keep application logic where it belongs by mapping variable names in a template to values in JavaScript
```JavaScript
    // Create an object which maps a template's variable names to values
    var date = new Date(),
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dataMap = {
            // map the variables from our 'topic.html' template to values
            month: months[date.getMonth()],
            day: date.getDate(),
            year: date.getFullYear(),
            author: 'Scott Bishop',
            topicName: 'Topic1',
            linkId: 'Temple1-1',
            introTag: 'h2',
            title: 'Temple Example',
            introText: 'This is really easy to use!'
        };
        
        temple.getTemplate('topic.html').then(function(html) {
            // temple mixes the HTML string with the dataMap object and returns a DOM node/tree
            var newDom = temple.toDom(html, dataMap);
            
            // document.getElementById('someDomNode').appendChild(newDom);
        });
```

## Embed templates inside of templates
It is often convenient to include a template within another template (and so on). This can be accomplished by importing all of the required templates and transforming them using temple.toString(html, dataMap/*optional*/), as in the following example:
```JavaScript
temple.getTemplate('innerModule').then(function(html) {
    var innerModuleData = {prop: value},
        innerModuleHtml = temple.toString(html, innerModuleData);
        
        temple.getTemplate('outerView').then(function(html) {
            // outerView's template can include the innerModule template by using {{someModule}} in it's HTML
            // and mapping the someModule variable name to the template returned by our innerModuleHtml variable
            var outerViewData = {
                    prop: value,
                    someModule: innerModuleHtml
                },
                // Once all templates are combined, the last call uses toDom to return DOM rather than String
                view = temple.toDom(html, outerViewData);
                
                document.getElementById('myDiv').appendChild(view);
        });
});
```

## The future of temple
temple is brand new, so there are still enhancements and features to come. Current work on the project involves:
 - Request multiple templates at once
 - Data binding
 - [Possible] removal of HTML single-outer-node limitation

 Please report issues and leave feedback to help make temple even better!
 If you would like to contribute to this project, simply make a pull request, then submit your changes when complete.


