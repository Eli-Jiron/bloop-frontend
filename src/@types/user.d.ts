declare global {
  interface User {
    id: string;
    is_active: boolean;
    date_joined: string;
    displayname: string;
    username: string;
    email: string;
  }
}

export {};
