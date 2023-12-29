import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

export enum RecipeDifficultyEnum {
  easy = 'Easy',
  medium = 'Medium',
  hard = 'Master Chef',
}

@Schema({ collection: 'recipes', timestamps: true })
export class Recipe {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: Array })
  ingredients: string[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  cookingTime: number; 

  @Prop({ type: String })
  difficulty: RecipeDifficultyEnum;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
