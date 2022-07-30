import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWorldADto {
  @IsNotEmpty()
  @IsNumber()
  a: number;
}