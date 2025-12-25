import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { AuthPayload } from './entities/auth-payload.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthPayload)
  async SignIn(@Args("SignInInput") SignInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(SignInInput);
    //generate token 
return this.authService.login(user);

  }

}
