# temple
Temple is a lightweight and easy to learn API for creating DOM templates in JavaScript

## Setting up Temple
Include the temple.js file ahead of any scripts which use it. This can be accomplished by simply using a script tag with the src attribute set to 'temple.js'.

### Using a script tag
```HTML
    <script src='temple.js'></script>
```

## Templates are HTML
Write templates in HTML and use variables wrapped in {{double braces}} for dynamic attributes, names, and content.
Here we see the contents of a file called 'topic.html':
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
Temple provides a method called 'getTemplate' to import external html templates into the current context. It does this by making an XMLHttpRequest to a provided URI. temple.getTemplate() returns a promise to enable chaining requests and also to allow for synchronous behavior (the html is a prerequisite before working with it's DOM), even in a strictly asynchronous environment (modern browsers). Alternatively, developers may choose to import the HTML string using any AJAX API.
```JavaScript
temple.getTemplate('template.html').then(function(html) {
    // Fullfill Promise to Get the template file, THEN pass HTML string to the callback
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
            var newDom = temple.toDom(html, dataMap);
            
            //domNode.appendChild(newDom);
        });
```

