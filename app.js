/// <reference path="typings/angular2/angular2.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
    /* ---- TodoRowComponent ---- */
    var TodoRowComponent = (function () {
        function TodoRowComponent() {
        }
        ;
        TodoRowComponent.prototype.toggleChecked = function () {
            this.todo.checked = !this.todo.checked;
        };
        ;
        TodoRowComponent.prototype.remove = function () {
            this.parent.remove(this.todo);
        };
        ;
        TodoRowComponent = __decorate([
            angular2_1.Component({
                selector: 'todo-row',
                properties: ['todo', 'parent']
            }),
            angular2_1.View({
                templateUrl: 'todo-row.tpl.html',
                directives: [angular2_1.CSSClass]
            }), 
            __metadata('design:paramtypes', [])
        ], TodoRowComponent);
        return TodoRowComponent;
    })();
    /* ---- TodoListComponent ---- */
    var TodoListComponent = (function () {
        function TodoListComponent() {
        }
        ;
        TodoListComponent = __decorate([
            angular2_1.Component({
                selector: 'todo-list',
                properties: ['list']
            }),
            angular2_1.View({
                templateUrl: 'todo-list.tpl.html',
                directives: [angular2_1.NgFor, TodoRowComponent]
            }), 
            __metadata('design:paramtypes', [])
        ], TodoListComponent);
        return TodoListComponent;
    })();
    /* ---- TodoAppComponent ---- */
    var TodoAppComponent = (function () {
        function TodoAppComponent(formBuilder) {
            this.form = formBuilder.group({
                name: ["", angular2_1.Validators.required],
                priority: [0]
            });
            this.todoList = new TodoList();
        }
        ;
        TodoAppComponent.prototype.add = function () {
            this.todoList.add(new Todo(this.form.value.name, this.form.value.priority));
        };
        ;
        TodoAppComponent = __decorate([
            angular2_1.Component({
                selector: 'todo-app',
                appInjector: [angular2_1.FormBuilder]
            }),
            angular2_1.View({
                templateUrl: 'todo-app.tpl.html',
                directives: [angular2_1.formDirectives, TodoListComponent]
            }), 
            __metadata('design:paramtypes', [angular2_1.FormBuilder])
        ], TodoAppComponent);
        return TodoAppComponent;
    })();
    /* ---- Model ---- */
    var Todo = (function () {
        function Todo(name, priority) {
            this.name = name;
            this.priority = priority;
            this.checked = false;
        }
        return Todo;
    })();
    var TodoList = (function () {
        function TodoList() {
            this.items = [];
        }
        ;
        TodoList.prototype.remove = function (item) {
            var idx = this.items.indexOf(item);
            this.items.splice(idx, 1);
        };
        ;
        TodoList.prototype.add = function (item) {
            if (!this.containsByName(item)) {
                this.items.push(item);
            }
        };
        ;
        TodoList.prototype.containsByName = function (item) {
            for (var i = 0; i < this.items.length; ++i) {
                if (this.items[i].name == item.name) {
                    return true;
                }
            }
            return false;
        };
        return TodoList;
    })();
    angular2_1.bootstrap(TodoAppComponent);
});
