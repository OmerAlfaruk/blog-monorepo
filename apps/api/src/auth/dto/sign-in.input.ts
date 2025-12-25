import { Field } from "@nestjs/graphql";
import { InputType } from "@nestjs/graphql";

@InputType()
export class SignInInput {
    @Field()
    email: string;
    @Field()
    password: string;
}
  