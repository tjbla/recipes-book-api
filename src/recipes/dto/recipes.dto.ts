import { RecipeDifficultyEnum } from "../schemas/recipes.schemas";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';


export class CreateRecipeDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly ingredients: string[];

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cookingTime: number;

  @IsNotEmpty() 
  readonly difficulty: RecipeDifficultyEnum;
}