/**
 * Copyright (c) 2015 Scott Bishop
 * BluJagu, LLC - www.blujagu.com
 * MIT License (MIT) - This header must remain intact.
 **/
var temple = (function() {

    var _re = /{{([^}]+)}}/mig;

    var _html2Dom = function(html) {
        var container = document.createElement('div');

        container.innerHTML = html;

        return container.firstChild;
    };

    var _build = function(html, dataMap, toDom) {
        if (dataMap) {
            html = html.replace(_re, function() {
                return dataMap[RegExp.$1];
            });
        }

        return toDom ? _html2Dom(html) : html;
    };

    var toDom = function(html, dataMap) {
        return _build(html, dataMap, true);
    };

    var toString = function(html, dataMap) {
        return _build(html, dataMap, false);
    };

    var getTemplate = function(uri) {
        uri = decodeURI(uri);

        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest(),
                separatorIndex = uri.indexOf('?'),
                sliceIndex = separatorIndex < 0 ? uri.length : separatorIndex,
                resource = uri.slice(0, sliceIndex);

            xhr.open('GET', resource);

            xhr.onload = function() {
                if (xhr.response) {
                    // promise completed successfully
                    resolve(xhr.response);
                } else {
                    // reject promise - request error
                    reject(Error(xhr.statusText));
                }
            };

            xhr.onerror = function() {
                // reject promise - xhr epic fail
                reject(Error("Network Error"));
            };

            xhr.send();
        });
    };

    return {
        getTemplate: getTemplate,
        toDom: toDom,
        toString: toString
    };

}());
