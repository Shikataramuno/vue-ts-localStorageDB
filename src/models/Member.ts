export default class Member {
  id: number = -1;
  name: string = '';
  address: string = '';
  admin: boolean = false;
  progress: number = 0;

  constructor(
    id: number,
    name: string,
    admin: boolean,
    progress: number,
    address: string) {
      this.id = id;
      this.name = name;
      this.admin = admin;
      this.address = address;
      this.progress = progress;
  }

  isIncluded(str: string): boolean {
    return String(this.id).toLowerCase().indexOf(str) > -1 ||
     this.name.toLowerCase().indexOf(str) > -1 ||
     this.address.toLowerCase().indexOf(str) > -1;
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
