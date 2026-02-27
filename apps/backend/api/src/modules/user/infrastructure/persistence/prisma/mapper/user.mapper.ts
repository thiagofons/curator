import { User as PrismaUser } from "@/data/client";
import { PlanType, Role, User } from "@/modules/user/domain";

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create({
      id: raw.id,
      name: raw.name ?? undefined,
      email: raw.email,
      password: raw.password ?? undefined,
      role: raw.role as Role,
      plan: raw.plan as PlanType,
      isPro: raw.isPro,
      isActive: raw.isActive,
      lastLoginAt: raw.lastLoginAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name ?? null,
      email: user.email,
      password: user.password ?? null,
      role: user.role,
      plan: user.plan,
      isPro: user.isPro,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt ?? null,
    };
  }
}
