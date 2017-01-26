import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';

import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  animations: [
	trigger('recipeItem', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-1000px)'
        }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({
          transform: 'translateX(-1000px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RecipeItemComponent {
	@Input() recipe: Recipe;
	@Input() recipeId: number;
}
