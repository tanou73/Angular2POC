# Problem encountered and traps

 - often forgot to explicitly declare directive dependency.
 - the order of the component is sensitive. You should take care to declare a component before using it in the code.
 - Found a tutorial on event creation (a.k.a '&' binding) but did not manage to make it work.

# tutorial: 

 - https://angular.io/docs/js/latest/quickstart.html
 - http://www.htmlxprs.com/post/54/creating-a-super-simple-todo-app-using-angular-2-tutorial
 - http://victorsavkin.com/post/119943127151/angular-2-template-syntax

## REQUIRED

 - NodeJS
 - NPM

## Install:

Install [https://www.npmjs.com/package/tsd](TypeScript Definition Manager) for DefinitelyTyped (used to install typescrit definition files) and [https://www.npmjs.com/package/typescript](TypeScript compiler) as browser does not support es6 yet.
    $ npm install -g tsd
    $ npm install -g typescript@^1.5.0-beta

Get Typescript definition files for angular2, es6-promise and rx.
    $ tsd query angular2 es6-promise rx rx-lite --action install

Get [Traceur compiler](https://github.com/google/traceur-compiler) 
   > Traceur is a JavaScript.next-to-JavaScript-of-today compiler that allows you to use features from the future today. Traceur supports ES6 as well as some experimental ES.next features.

    $ bower install traceur-runtime

Create app.ts and index.html
    $ touch app.ts index.html

Watch file changes and compile
	$ tsc --watch -m commonjs -t es5 --emitDecoratorMetadata app.ts

## Bootstrap

in app.js, import typescript definition for angular
    /// <reference path="typings/angular2/angular2.d.ts" />
    
    import {Component, View, bootstrap} from 'angular2/angular2';

in index.html, import traceur, [system.js](https://github.com/systemjs/systemjs), angular2 dans le <head>
    <script src="/bower_components/traceur-runtime/traceur-runtime.js"></script>
    <!-- import libs file via cdn -->
    <script src="https://jspm.io/system@0.16.js"></script>
    <script src="https://code.angularjs.org/2.0.0-alpha.26/angular2.dev.js"></script>
    <!-- or download and use local files -->
    <!--<script src="libs/system.js"></script>
    <script src="libs/angular2.0.0-alpha.26.dev.js"></script>-->

## Create a component for the app

    /* Create the app component */
    @Component({
        selector: 'todo-app' 
    })
    /* Corresponding view with template */
    @View({
        templateUrl: 'todo-app.tpl.html'
    })
    /* And the class, which more or less replace controllers */
    class TodoAppComponent {  
        constructor() {
        };
    }

Now, we need to create a form. In Angular2, form are created in Javascript. So we need to inject FormBuilder and ControlGroup.
First import it :
    import { Component, View, bootstrap, FormBuilder, ControlGroup } from 'angular2/angular2';

Then inject it:
    
    @Component({
        selector: 'todo-app',
        /* explicitly declare dependency */
        appInjector: [FormBuilder] 
    })
    ....
    class TodoAppComponent {  
        form: ControlGroup;
        /* inject it in the constructor */
        constructor(formBuilder: FormBuilder) {

        };
    }

We also need to inject some directive to make the form work correctly:
  
    @View({
        templateUrl: 'todo-app.tpl.html',
        directives: [formDirectives]
    })

And construct the form in the constructor. It has two field: name and priority, and tell the form that name is required.
    form: ControlGroup;
    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: ["", Validators.required],
            priority: [0]
        }); 
    };

 > to use validators, we need to import it.

Next step is to instanciate the form in our template: 
 - [] is the equivalent of the binding '='.
 - () is the equivalent of the binding '&'.

    <!-- specifying the form -->
    <form [ng-form-model]="form">
        <!-- specifying the field -->
        <input type="text" ng-control="name" class="form-control">

        <select ng-control="priority" class="form-control">
            <option value="0">Normal</option>
            <option value="1">High</option>
            <option value="2">OMG</option>
        </select>
    </form>

The form should be okay. Let's submit it:

create the button and bind action add() to the click

    <button class="btn btn-info" type="button" (click)="add();"> OK </button>

We want the button to be disabled if the form is not valid

    <button class="btn btn-info" type="button" [disabled]="!form.valid" (click)="add();"> OK </button>

We now need to create our model :

    class Todo {
        checked: boolean;
        constructor(
            public name: String,
            public priority: number
        ) { 
            this.checked = false;
        }
    }

    class TodoList {
        items: Todo[];
        constructor() {
            this.items = [];
        };
        remove(item) {
            var idx = this.items.indexOf(item);
            this.items.splice(idx, 1);
        };
        add(item) {
            if (!this.containsByName(item)) {
                this.items.push(item);
            }
        };
        containsByName(item) {
            for (var i = 0; i < this.items.length; ++i) {
                if (this.items[i].name == item.name) {
                    return true;
                }
            }
            return false;
        }
    }

initiate the model in the constructor:

    class TodoAppComponent {  
        ...
        todoList: TodoList;

        constructor(formBuilder: FormBuilder) {
            ...

            this.todoList = new TodoList();
        };
    }

and construct the add method is our class:

    ...
    class TodoAppComponent {  
        ...

        add() {
            this.todoList.add(new Todo(this.form.value.name, this.form.value.priority));
        };
    }

Let's say we want to create another component and use it in our AppComponent

    /* ---- TodoListComponent ---- */
    @Component({
        selector: 'todo-list',
        /* our component take one properties -> the list */
        properties: ['list']
    })
    @View({
        templateUrl: 'todo-list.tpl.html'
    })
    class TodoListComponent {
        constructor() { };
    }

    @Component({
     ...
    })
    @View({
        ...
        /* List it in the directive */
        directives: [... , TodoListComponent]
    })
    class TodoAppComponent {  
       ...
    }

then use it in the template and bind the list

    ...
    <todo-list [list]="todoList"></todo-list>
    ...