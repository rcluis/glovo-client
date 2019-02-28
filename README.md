# glovo-client

> Glovo client assignment

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# Run tests
$ yarn run test

# generate static project
$ yarn run generate
```

### Description of the tools used
    I've tried to use the same technology you use in glovo. In the first interview I had some information like, Vue, Element io...
    - nuxt: As the app has to be seo friendly I need server side rendered templates for having a different friendly url. I use nuxt with pre rendering to generate one html file per page.
    - element io: I tried to use the same base library that you use.
    
### What I would have implemented:

    - bem generator: I used the bem naming for class styles but for bigger projects it would be necessary an auto generator
    - vue cache: Cache the actions of the store for 30-60 min the time a customer can stay using the app.
    Taking in account all the actions that need to not be cache.
    - i18n: To add more language and no "hardcode" string in the code
    - more testing: I've tested the js code stores and utils, but not the Vue components
    - mock the store in a __mocks__ folder: I used constant for the value of the state and getters but as and improvement this would be go to a separated file.