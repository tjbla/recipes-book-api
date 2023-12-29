import { Recipe, RecipeDifficultyEnum, RecipeDocument } from './schemas/recipes.schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/recipes.dto';


@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipesModule: Model<RecipeDocument>,
  ) { }

  //get the list of all the recipes
  async getAll(): Promise<RecipeDocument[]> {
    return this.recipesModule.find();
  }

  //create a new recipe and save it in the db
  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeDocument> {
    const createdRecipe = this.recipesModule.create(createRecipeDto);
    return createdRecipe;
  }

  //update the recipes adding a cooking time depending on the difficulty

  async updateCookingTimes(): Promise<{ totalUpdated: number }> {
    const easyUpdateResult = await this.recipesModule.updateMany(
      { difficulty: 'Easy', cookingTime: { $exists: false } },
      { $set: { cookingTime: 15 } }
    );
    const mediumUpdateResult = await this.recipesModule.updateMany(
      { difficulty: 'medium', cookingTime: { $exists: false } },
      { $set: { cookingTime: 30 } }
    );
    const hardUpdateResult = await this.recipesModule.updateMany(
      { difficulty: 'hard', cookingTime: { $exists: false } },
      { $set: { cookingTime: 60 } }
    );

    const totalUpdated =
      (easyUpdateResult.modifiedCount) +
      (mediumUpdateResult.modifiedCount) +
      (hardUpdateResult.modifiedCount);

    return { totalUpdated };
  }
  
  async findRecipes(
    ingredients?: string[],
    difficulty?: RecipeDifficultyEnum,
    maxCookingTime?: number
  ): Promise<RecipeDocument[]> {
    const query = {};

    if (ingredients) {
      query['ingredients'] = { $all: ingredients };
    }
    if (difficulty) {
      query['difficulty'] = difficulty;
    }
    if (maxCookingTime) {
      query['cookingTime'] = { $lte: maxCookingTime };
    }

    return this.recipesModule.find(query);
  }  
}
