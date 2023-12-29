import { RecipesService } from './recipes.service';
import { Recipe, RecipeDifficultyEnum, RecipeDocument } from './schemas/recipes.schemas';
import { CreateRecipeDto } from './dto/recipes.dto';
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  //get a list of all recipes
  @Get()
  async getAllRecipes(): Promise<RecipeDocument[]> {
    return this.recipesService.getAll();
  }

  //filter by three parameters
  //search?ingredients=string&maxCookingTime=number&difficulty=string
  @Get('search')
  async findRecipes(
    @Query('ingredients') ingredients?: string,
    @Query('difficulty') difficulty?: RecipeDifficultyEnum,
    @Query('maxCookingTime') maxCookingTime?: number
  ) {
    //understanding user will separate the ingredients by using a comma
    const ingredientsArray = ingredients ? ingredients.split(',') : undefined;

    return this.recipesService.findRecipes(ingredientsArray, difficulty, maxCookingTime);
  }

  
  //update all the recipes adding the cooking time depending on the difficulty
  @Put('/update-cooking-time')
  async updateCookingTimes(): Promise<{ message: string }> {
    const updateResult = await this.recipesService.updateCookingTimes();
    return {
      message: `Documents updated: ${updateResult.totalUpdated}`
    };
  }
  
  //create a new recipe and save it in the db
  @Post('/create')
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<RecipeDocument> {
    return this.recipesService.create(createRecipeDto);
  }

}
