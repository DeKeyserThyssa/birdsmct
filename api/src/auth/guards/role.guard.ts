import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from 'src/users/users.service'

export const RolesGuard = (roles: string[]) => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    constructor(readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context)
      const user = ctx.getContext().req.user

      const customUser = await this.usersService.findOneBy(user.uid)

      console.log(customUser)
      console.log({ user })

      console.log(roles);
      
      return roles.includes(customUser.role.name)
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
