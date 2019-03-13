export default class SortOrders {
  id: number = 1;
  name: number = 1;
  address: number = 1;
  progress: number = 1;
  admin: number = 1;

  selectKey(key: string) {
    switch (key) {
      case 'id':
        this.id *= -1;
        break;
      case 'name':
        this.name *= -1;
        break;
      case 'address':
        this.address *= -1;
        break;
      case 'progress':
        this.progress *= -1;
        break;
      case 'admin':
        this.admin *= -1;
        break;
    }
  }
  getOrder(key: string): number {
    /*
    let order: number = 1;
    if (key === 'id') {
      order = this.id;
    } else if (key === 'name') {
      order = this.name;
    } else {
      order = this.address;
    }
    return order;
    */
    return (this as any)[key];
  }
}
