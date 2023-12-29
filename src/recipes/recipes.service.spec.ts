import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Recipe, RecipeDifficultyEnum, RecipeDocument } from './schemas/recipes.schemas';
import { CreateRecipeDto } from './dto/recipes.dto'
import { Model } from 'mongoose';

describe('RecipesService', () => {
  let recipeService: RecipesService;
  let model: Model<Recipe>;

  const mockRecipe = {
    _id: '658e7a1a1cbfbb7e4c29de46',
    name: 'New Recipe',
    ingredients: ["2 eggs,olive oil"],
    description: 'Recipe Description',
    cookingTime: 30,
    difficulty: RecipeDifficultyEnum.hard,
  };

  const mockRecipeService = {
    create: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService,

        {
          provide: getModelToken(Recipe.name),
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    recipeService = module.get<RecipesService>(RecipesService);
    model = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  //unit test for creating a new recipe
  describe('create', () => {
    it('should create and return a recipe', async () => {

      const newRecipe: CreateRecipeDto = {
        name: 'New Recipe',
        ingredients: ["2 eggs,olive oil"],
        description: 'Recipe Description',
        cookingTime: 30,
        difficulty: RecipeDifficultyEnum.hard,
      };


      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockRecipe));

      const result = await recipeService.create(newRecipe);

      expect(result).toEqual(mockRecipe);
    })
  })

  it('should be defined', () => {
    expect(recipeService).toBeDefined();
  });
});
