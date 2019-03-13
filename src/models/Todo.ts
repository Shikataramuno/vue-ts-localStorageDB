export default class Todo {
  id: number = -1;
  tag: string = '';
  todo: string = '';
  complete: boolean = false;
  progress: number = 0;

  constructor(
    id: number,
    tag: string,
    todo: string,
    complete: boolean,
    progress: number) {
      this.id = id;
      this.tag = tag;
      this.todo = todo;
      this.complete = complete;
      this.progress = progress;
  }

  isIncluded(str: string): boolean {
    return this.todo.indexOf(str) > -1 ||
     this.tag.indexOf(str) > -1;
  }

  getValue(key: string): string {
    /*
    let str: string = '';
    if (key === 'id') {
      str = String(this.id);
    } else if (key === 'name') {
      str = this.name;
    } else if (key === 'address') {
      str = this.address;
    } else {
      str = 'Unknown key';
    }
    // return str;
    */
    return (this as any)[key];
  }
}
