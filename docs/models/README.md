# Models

[![Build Status](https://travis-ci.com/railroadmedia/js-models.png?branch=master)](https://travis-ci.com/railroadmedia/js-models)
[![Coverage Status](https://coveralls.io/repos/github/railroadmedia/js-models/badge.svg?branch=master)](https://coveralls.io/github/railroadmedia/js-models?branch=master)

The models module is a simple approach to handling the response objects returned from various Musora Back-End services.
The only module currently available is the Content Model. 

## Installation

`yarn add @musora/services`

## Basic Usage

The content model takes a singular content object and decorates it with getters and useful methods for traversing the
object and plucking data from it. If you've read the previous section about the Services module, you'll remember this
part of the [Handling the Response Object](/services/#handling-the-response-object) section. When you get an array of 
content back from a `getContent` request for example, you can map every item of the array to the ContentModel.

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

### In a React Native Component

Assuming you're not using any advanced state management patterns, and you just want to utilise local state,
the below component will request content as it mounts, set the state as it gets a response, but only if the component
is mounted.

```jsx harmony
import React from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import {ContentModel} from '@musora/models';
import {getContent} from '@musora/services';

export default class ContentIndex extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        
        this.state = {
            content: [],
            meta: {
                page: 1,
                total_pages: 0,
                total_results: 0,
            }
        };
    }
    componentDidMount() {
        this._isMounted = true;

        this.requestContent(this.state.brand, this.state.contentType);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleResponse(response){
        const content = response.data.data.map(item => new ContentModel(item));
        const meta = response.data.meta;
    
        if(this._isMounted){
            this.setState({
                content,
                meta,
            });
        }
    }
    handleError(error){
        console.log(error.response);
    }
    async requestContent(brand, contentType) {
        const {response, error} = await getContent({
            brand: brand,
            included_types: [contentType],
        });
    
        if(error){
            return handleError(error);
        }
            
        return handleResponse(response);
    }
    Item({ title, description }) {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>{title}</Text>
                <Text style={{fontSize: 12}}>{description}</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <FlatList
                    data={this.state.content}
                    renderItem={({ item }) => 
                        <Item 
                            title={item.getField('title')} 
                            description={item.getData('description')} 
                        />
                    }
                    keyExtractor={item => String(item.id)}
                />
            </View>
        );
    }
}
```

### In a Vue Component

Assuming you're not using any advanced state management patterns, and you just want to utilise local state,
the below component will request content as it is mounted and populate the local state as the request finishes.

```vue
<template>
    <ul>
        <li 
            v-for="item in content"
            :key="item.id"
        >
            <h2>{{ item.getField('title') }}</h2>
            <p>{{ item.getData('description') }}</p>
        </li>    
    </ul>
</template>
<script>
import {ContentModel} from '@musora/models';
import {getContent} from '@musora/services';

export default {
    name: 'ContentIndex',
    data() {
        return {
            isMounted: false,
            content: [],
            meta: {
                page: 1,
                total_pages: 0,
                total_results: 0,
            },
        }
    },
    mounted(){
        this.isMounted = true;

        this.requestContent();
    },
    beforeDestroy(){
        this.isMounted = false;
    },
    methods: {
        handleResponse(response){
            const content = response.data.data.map(item => new ContentModel(item));
            const meta = response.data.meta;
        
            if(this.isMounted){
                this.content = content;
                this.meta = meta;
            }
        },
        handleError(error){
            console.log(error.response);
        },
        async requestContent(brand, contentType) {
            const {response, error} = await getContent({
                brand: brand,
                included_types: [contentType],
            });
        
            if(error){
                return this.handleError(error);
            }
                
            return this.handleResponse(response);
        }
    }   
}
</script>
```

As you can see the above two components are almost identical. As Vue moves towards a composition API, in combination
with the existing React composition API - **we can theoritically share all of the code that composes both of 
these components.**

_More on that coming soon._


## Advanced Usage

_Coming Soon_

## API Reference

[API Reference](https://github.com/railroadmedia/js-models/tree/master/docs)
