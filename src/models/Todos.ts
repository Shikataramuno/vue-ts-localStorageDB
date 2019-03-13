import Todo from './Todo';

export default class Todos {

  static getInstance(): Todos {
    console.log('MemberList.getInstance');
    if (!this.instance) {
      console.log('call constructor');
      this.instance = new Todos();
    }
    return this.instance;
  }

  private static instance: Todos;
  private todos: Todo[] = [];

  constructor() {
    console.log('Todos class constructor');
    /*
     * ここに　LocalStorageからの読み込みを実装する。
     */
    // localStorage.setItem('user', JSON.stringify(user))
    // localStorage.setItem('userInfo', JSON.stringify(res.data))
    if ('Todos' in localStorage) {
      const objs: Todo[] = JSON.parse(localStorage.getItem('Todos') as string) as Todo[];
      objs.forEach((obj: Todo) => {
        const todo: Todo = new Todo(obj.id, obj.tag, obj.todo, obj.complete, obj.progress);
        this.todos.push(todo);
      });
    } else {
      this.todos = [
        new Todo(1, '仕事', 'レポートを書く', false, 10),
        new Todo(2, 'トレーニング', 'スクワット：30回、腹筋：20回、腕立て：10回を 3セット', false, 10),
        new Todo(3, 'ブログ', 'local storageの記事を書く', false, 10),
      ];
      localStorage.setItem('Todos', JSON.stringify(this.todos));
    }
    console.log(this.todos);
  }

  getTodos(): Todo[] {
    return this.todos.slice();
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    /*
     * ここに LocalStorage への追加を実装する
     */
  }
}
