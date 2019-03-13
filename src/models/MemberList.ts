import Member from './Member';

export default class MemberList {

  static getInstance(): MemberList {
    console.log('MemberList.getInstance');
    if (!this.instance) {
      console.log('call constructor');
      this.instance = new MemberList();
    }
    return this.instance;
  }

  private static instance: MemberList;
  private members: Member[] = [];

  constructor() {
    console.log('MemberList class constructor');
    this.members = [
      new Member(1, 'aaaa', true, 10, 'aaaa@shikataramuno.com'),
      new Member(2, 'bbbb', true, 20, 'bbbb@shikataramuno.com'),
      new Member(3, 'cccc', false, 30, 'cccc@shikataramuno.com'),
      new Member(4, 'dddd', false, 40, 'dddd@shikataramuno.com'),
      new Member(5, 'eeee', false, 50, 'eeee@shikataramuno.com'),
      new Member(6, 'ffff', false, 60, 'ffff@shikataramuno.com'),
      new Member(7, 'gggg', false, 70, 'gggg@shikataramuno.com'),
      new Member(8, 'hhhh', false, 80, 'hhhh@shikataramuno.com'),
      new Member(9, 'iiii', false, 90, 'iiii@shikataramuno.com'),
      new Member(10, 'jjjj', false, 11, 'jjjj@shikataramuno.com'),
      new Member(11, 'kkkk', false, 22, 'kkkk@shikataramuno.com'),
      new Member(12, 'llll', false, 33, 'llll@shikataramuno.com'),
      new Member(13, 'mmmm', false, 44, 'mmmm@shikataramuno.com'),
      new Member(14, 'nnnn', false, 55, 'nnnn@shikataramuno.com'),
      new Member(15, 'oooo', false, 66, 'oooo@shikataramuno.com'),
      new Member(16, 'pppp', false, 77, 'pppp@shikataramuno.com'),
      new Member(17, 'qqqq', false, 88, 'qqqq@shikataramuno.com'),
      new Member(18, 'rrrr', false, 99, 'rrrr@shikataramuno.com'),
      new Member(19, 'ssss', false, 10, 'ssss@shikataramuno.com'),
      new Member(20, 'tttt', false, 20, 'tttt@shikataramuno.com'),
      new Member(21, 'uuuu', false, 30, 'uuuu@shikataramuno.com'),
      new Member(22, 'vvvv', false, 40, 'vvvv@shikataramuno.com'),
      new Member(23, 'wwww', false, 50, 'wwww@shikataramuno.com'),
      new Member(24, 'xxxx', false, 60, 'xxxx@shikataramuno.com'),
      new Member(25, 'yyyy', false, 70, 'yyyy@shikataramuno.com'),
      new Member(26, 'zzzz', true, 80, 'zzzz@shikataramuno.com'),
    ];
  }

  getMembers(): Member[] {
    return this.members.slice();
  }

  addMemners(member: Member): void {
    this.members.push(member);
  }
}
