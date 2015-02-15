function Filter() {
    var self = this;
    self.filterParams = {
        name: ko.observable(),
        type: ko.observable(),
        nutrients: {
            kcalories: ko.observable().extend({ numeric: null }),
            protein: ko.observable().extend({ numeric: null }),
            carbs: ko.observable().extend({ numeric: null }),
            fat: ko.observable().extend({ numeric: null })
        }
    };
    self.ingredientToExclude = ko.observable();
    self.ingredientToExclude.subscribe(function (ingredient) {
        if (ingredient) {
            self.excludedIngredients.push(ingredient);
        }
    });
    self.excludedIngredients = ko.observableArray();
    self.cancelExcluding = function (ingredient) {
        self.excludedIngredients.remove(ingredient);
    };
    self.isSuitable = function (dish) {
        var
            name = self.filterParams.name(),
            type = self.filterParams.type(),
            nutrientsMax = self.filterParams.nutrients,
            excludedIngredients = self.excludedIngredients(),
            nutrType, i, j;

        if ((name && dish.name.toLowerCase().indexOf(name) === -1) || (type && dish.type != type)) {
            return false;
        }
        for (nutrType in nutrientsMax) {
            if (nutrientsMax[nutrType]() &&
                +dish.nutrients[nutrType] > nutrientsMax[nutrType]()) {
                return false;
            }
        }
        if (excludedIngredients.length) {
            for (i = 0; i < excludedIngredients.length; i++) {
                for (j = 0; j < dish.ingredients.length; j++) {
                    if (dish.ingredients[j] == excludedIngredients[i]) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
}