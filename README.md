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
It is often convenient to include a template within another template (and so on). This can be accomplished by importing all of the required templates and transforming them using temple.toString(). The following 2 examples illustrate how to embed templates within each other. The first example uses a chained promise, while the second example requests all the templates at once!
### Chained Request Example
```JavaScript
temple.getTemplate('module').then(function(html) {
    var moduleData = {
            prop1: value1,
            prop2: value2
        },
        // merge template with data using toString to leave as a string for further construction...
        moduleHtml = temple.toString(html, moduleData);

        // return passes the html into chained 'then' argument
        return moduleHtml;

}).then(function(module) { // module here is moduleHtml from above
        temple.getTemplate('view').then(function(viewHTML) {
            // view's template can include the module template by using {{someModuleName}}
            // and mapping someModuleName to the 'module' argument
            var viewData = {
                    prop1: value1,
                    someModuleName: module // here we inject the 'module' template into the 'view' template
                },
                // Once all templates are combined, the last call uses toDom to return DOM rather than String
                view = temple.toDom(html, viewData);
                // attach the completed template to the page...
                document.getElementById('myDiv').appendChild(view);
        });
});
```
### Request Multiple Simultaneously
That's pretty cool, but what if you want to import 4, 5, 6... maybe even 10 or more templates? Each getTemplate call returns a Promise. The Promise API also provides Promise.all, which allows the developer to pass an array of Promises to be requested AT THE SAME TIME! When I say at the same time, I mean that quite literally. Usually, if you watch the Network request times for your web assets, you will see a staggered, stair-like pattern. However, when you request resources using Promise.all, the browser will actually request as many of those resources as it can simultaneously. Try this and watch the Network tab in Chrome Dev Tools. The requests form a straight line - not steps. The other great thing about requesting multiple templates using this technique is that you also get back all your templates in an array. Look at the following example:
```JavaScript
    // Create an array of requests
var templateRequests = [
    temple.getTemplate('main'),
    temple.getTemplate('module1'),
    temple.getTemplate('module2'),
    temple.getTemplate('module3')
];

Promise.all(templateRequests).then(function (resultsArray) {
        // Using variables to make the array identifiers more semantic
    var containerPage = resultsArray[0],
        module1_template = resultsArray[1],
        module2_template = resultsArray[2],
        module3_template = resultsArray[3];

    // Now each template can be merged with data maps as well as being inserted into each other
    // A good example of this in the 'app.showDiscussion' method of my forum example at line 99: https://github.com/blujagu/startupGrind/blob/master/js/app.js
}
```

## The future of temple
temple is brand new, so there are still enhancements and features to come. Current work on the project involves:
 - Data binding
 - [Possible] removal of HTML single-outer-node limitation

 Please report issues and leave feedback to help make temple even better!
 If you would like to contribute to this project, simply make a pull request, then submit your changes when complete.

If you are using temple in a project, please let me know about it! I'll feature your site/app/framework on the upcoming temple home page.
