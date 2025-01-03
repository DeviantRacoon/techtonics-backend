import { BaseModel, AutoAccessor } from "@utils/classes.handler";
import User from "./user";

type SESSION_STATUS = "active" | "inactive" | "ban";
export default class UserSession extends BaseModel {
  @AutoAccessor()
  public sessionId?: number;

  @AutoAccessor()
  public userId?: number;

  @AutoAccessor()
  public token?: string;

  @AutoAccessor()
  public device?: string;

  @AutoAccessor()
  public ip?: string;

  @AutoAccessor()
  public status?: SESSION_STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public expiresAt?: string;

  @AutoAccessor()
  public user?: User;

  constructor(init?: Partial<UserSession>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}