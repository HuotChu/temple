# temple
Temple is super lightweight (~14 lines of code!) and easy to learn API for creating DOM templates in JavaScript

## Setting up Temple
You must, of course, include the temple.js file ahead of any scripts which use it. This can be accomplished in a variety of ways: by simply using a script tag with the src attribute set to 'temple.js' or by including the RequireJS module 'temple-common.js'.

### Using a script tag
```HTML
    <script src='temple.js'></script>
```

### Using RequireJS
```JavaScript
    define(['temple-common'], function(temple) {
        // do stuff with temple like...
        // var DOM = temple('<div>{{userName}}</div>', {userName: 'Scott'}, true);
        // ...importing the html string would make more sense. That's covered later in this documentation.
    });
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

## Map the template's variable names to actual data
Keep application logic where it belongs by mapping variable names in a template with values in JavaScript
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
```

