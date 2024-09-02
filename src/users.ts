export interface UserInfo {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const users: UserInfo[] = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', password: 'password123' },
  { id: '2', name: '李四', email: 'lisi@example.com', password: 'password456' }
];