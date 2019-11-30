# Services

[![Build Status](https://travis-ci.com/railroadmedia/js-services.png?branch=master)](https://travis-ci.com/railroadmedia/js-services)
[![Coverage Status](https://coveralls.io/repos/github/railroadmedia/js-services/badge.svg?branch=master)](https://coveralls.io/github/railroadmedia/js-services?branch=master)

The services module is a simple abstraction of the popular http request library [Axios](https://github.com/axios/axios).
Axios itself is just a wrapper around the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch),
what this means is this module can be consumed in the Web, NodeJS, and React Native directly out of the box -  with
minimal configuration.

## Installation

`yarn add @musora/services`

## Basic Usage

### Importing the entire Module
```javascript
import Services from '@musora/services';

(async function(){
    const { response, error } = await Services.Railcontent.getContent(params);
})();
```

### Importing a single Sub-Module
```javascript
import { Railcontent } from '@musora/services';

(async function(){
    const { response, error } = await Railcontent.getContent(params);
})();
```

### Importing an individual function from any Sub-Module
```javascript
import { getContent } from '@musora/services';

(async function(){
    const { response, error } = await getContent(params);
})();
```

### Which one do I want to use?

Depending on your environment, it's almost always suggested to import only the individual functions you need. This is
a powerful pattern, because most bundlers will now be able to utilise [Tree Shaking](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking).
Tree Shaking does exactly what it sounds like, in the sense that it's shaking the tree to remove all of the loose leaves
and branches the tree _(our code in this case)_ no longer needs.

## Handling Responses

### Configuring the Instance

On your app's startup, it is recommended to configure the instance with some defaults, in order to prevent passing
them through with every API call.

```javascript
import { configure as configureServices } from '@musora/services';

configureServices({
    baseUrl: 'https://drumeo.com/laravel/public',
    contentType: 'application/json',
    accept: 'application/json',
    authToken: '...' 
});
```

Every function in the services module returns a promise that resolves to an object with 2 properties `response` and
`error`. Utilising object destructuring and async/await, we can create very simple, and readable asynchronous patterns.

```javascript
import { getContent } from '@musora/services';

function handleResponse(response){/*...*/}

function handleError(error){/*...*/}

async function requestContent(){
    const { response, error } = await getContent(params);

    if(error){
        return handleError(error);
    } 
        
    return handleResponse(response);
}
```

### Handling the Response Object

The response for a request contains the following information.

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  request: {}
}
```

The `response.data.data` object will contain the content returned by our server. At this point, it's recommended to 
utilise one of the [Models](/models) available to handle that response. For instance, hitting the `getContent` 
endpoint will result in an array of large content objects containing all the related data for that specific item.

We also return a `response.data.meta` object, with various metadata pertaining to the request. Such as current page, 
total pages, and total results.

```javascript
import { getContent } from '@musora/services';
import { ContentModel } from '@musora/models';

function handleResponse(response){
    const content = response.data.data.map(item => new ContentModel(item));
    const meta = response.data.meta;

    return { content, meta };
}

function handleError(error){/*...*/}

async function requestContent(){
    const { response, error } = await getContent(params);

    if(error){
        return handleError(error);
    }
        
    return handleResponse(response);
}
```

### Handling the Error Object

A properly handled error will return an `error.response` object that will contain data returned from the server.
It's here we can hook into the data with the `error.response.data.data` object. Below you can view how to interface
with the entire object.

```javascript
import { getContent } from '@musora/services';

function handleResponse(response){/*...*/}

function handleError(error){
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
}

async function requestContent(){
    const { response, error } = await getContent(params);

    if(error){
        return handleError(error);
    }

    return handleResponse(response);
}
```

### What if I can't use Async/Await?

Since async/await is just [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for 
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and
the services module just uses basic Promises behind the scenes. You can interface with the module without 
reaching for async/await.

```javascript
import { getContent } from '@musora/services';

function handleResponse(response){/*...*/}

function handleError(error){/*...*/}

function requestContent(){
    getContent(params)
        .then(({response, error}) => {
            if(error){
                return handleError(error);
            } 
                
            return handleResponse(response);
        });
}
```

## API Reference

[API Reference](https://github.com/railroadmedia/js-services/tree/master/docs)
