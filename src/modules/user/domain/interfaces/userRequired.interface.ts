import { EmailVO } from "../value-objects/email.vo";

export interface UserRequired {
  name: string;
  lastName: string;
  email: EmailVO;
  password: string;
  phone: number;
  isAdmin: boolean;
  state: string;
}
