/// <reference path="typings/angular2/angular2.d.ts" />

import {
	Component, 
	View, 
	bootstrap,
    FormBuilder,
    ControlGroup,
    formDirectives,
    Validators,
    NgFor,
    CSSClass
} from 'angular2/angular2';

/* ---- TodoRowComponent ---- */
@Component({
	selector: 'todo-row',
	properties: ['todo', 'parent']
})
@View({
	templateUrl: 'todo-row.tpl.html',
	directives: [CSSClass]
})
class TodoRowComponent {
	constructor() { };

	toggleChecked() {
		this.todo.checked = !this.todo.checked;
	};

	remove() {
		this.parent.remove(this.todo);
	};
}

/* ---- TodoListComponent ---- */
@Component({
	selector: 'todo-list',
	properties: ['list']
})
@View({
	templateUrl: 'todo-list.tpl.html',
	directives: [NgFor, TodoRowComponent]	
})
class TodoListComponent {
	constructor() { };
}

/* ---- TodoAppComponent ---- */
@Component({
	selector: 'todo-app',
	appInjector: [FormBuilder] 
})
@View({
	templateUrl: 'todo-app.tpl.html',
	directives: [formDirectives, TodoListComponent]
})
class TodoAppComponent {  
	form: ControlGroup;
	todoList: TodoList;
	constructor(formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			name: ["", Validators.required],
			priority: [0]
		});	

		this.todoList = new TodoList();
	};

	add() {
		this.todoList.add(new Todo(this.form.value.name, this.form.value.priority));
	};
}

/* ---- Model ---- */
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


bootstrap(TodoAppComponent);		