export enum Role {
  USER = "USER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
}

interface UserProps {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  role?: Role;
  plan?: PlanType;
  isPro?: boolean;
  isActive?: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {
    if (!props.email.includes("@")) throw new Error("Invalid e-mail");
  }

  static create(props: UserProps): User {
    return new User({
      role: Role.USER,
      plan: PlanType.FREE,
      isPro: false,
      isActive: true,
      ...props,
    });
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get role() {
    return this.props.role ?? Role.USER;
  }
  get plan() {
    return this.props.plan ?? PlanType.FREE;
  }
  get isPro() {
    return this.props.isPro ?? false;
  }
  get isActive() {
    return this.props.isActive ?? true;
  }
  get lastLoginAt() {
    return this.props.lastLoginAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}
