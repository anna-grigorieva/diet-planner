function NutritionPlanner(dishes) {
    var self = this;
    self.selectedDay = ko.observable();
    self.days = ko.observableArray();
    self.dailyRation = ko.computed(function () {
        var today = self.selectedDay(),
            newOne,
            i;
        if (!today) {
            return new DailyRation('');
        }
        for (i = 0; i < self.days().length; i++) {
            if (self.days()[i].date == today) {
                return self.days()[i];
            }
        }
        newOne = new DailyRation(today);
        self.days.push(newOne);
        return newOne;
    });
    self.filter = new Filter();
    self.filteredDishes = ko.computed(function () {
        var result = [];
        dishes.forEach(function (dish) {
            if (self.filter.isSuitable(dish)) {
                result.push(dish);
            }
        });
        return result;
    });
    self.ingredients = ko.computed(function () {
        var ingredients = [],
            i;
        self.filteredDishes().forEach(function (dish) {
            for (i = 0; i < dish.ingredients.length; i++) {
                if (ingredients.indexOf(dish.ingredients[i]) == -1) {
                    ingredients.push(dish.ingredients[i]);
                }
            }
        });
        return ingredients.sort();
    });
    self.getDishTypes = function () {
        var dishTypes = [],
            i;
        for (i = 0; i < dishes.length; i++) {
            if (dishTypes.indexOf(dishes[i].type) == -1) {
                dishTypes.push(dishes[i].type);
            }
        }
        return dishTypes.sort();
    }
}