declare class User {
  login(emailOrUsername: string, password: string, sendEmail?: boolean): Promise<any>;
  revokeSecret(emailOrUsername: string, password: string, secret: string): Promise<any>;
}

export default User;
