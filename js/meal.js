function Meal(mealtime) {
    var self = this;
    self.mealtime = mealtime;
    self.dishes = ko.observableArray();
    self.nutrients = {
        kcalories: {
            total: ko.computed(function () { return getTotal('kcalories'); }),
            max: ko.observable('').extend({ numeric: null })
        },
        protein: {
            total: ko.computed(function () { return getTotal('protein'); }),
            max: ko.observable('').extend({ numeric: null })
        },
        carbs: {
            total: ko.computed(function () { return getTotal('carbs'); }),
            max: ko.observable('').extend({ numeric: null })
        },
        fat: {
            total: ko.computed(function () { return getTotal('fat'); }),
            max: ko.observable('').extend({ numeric: null })
        }
    };
    self.nutrientsLeft = {
        kcalories: ko.computed(function () { return getAvailable('kcalories'); }),
        protein: ko.computed(function () { return getAvailable('protein'); }),
        carbs: ko.computed(function () { return getAvailable('carbs'); }),
        fat: ko.computed(function () { return getAvailable('fat'); }),
    };
    self.addDish = function (selectedDish) {
        var
            availableForMeal = self.nutrientsLeft,
            dish = selectedDish.nutrients,
            nutrient;

        for (nutrient in dish) {
            if ((availableForMeal[nutrient]() !== '~') &&
                +dish[nutrient] > availableForMeal[nutrient]()) {
                alert('You can not add this dish!\nNumber of ' + nutrient + ' left for ' + self.mealtime.toLowerCase() + ': \n' + availableForMeal[nutrient]());
                return;
            }
        }
        self.dishes.push(selectedDish);
    };
    self.removeDish = function (dishIndex) {
        self.dishes.splice(dishIndex, 1);
    };
    function getTotal(nutrType) {
        var sum = 0,
            dishes = self.dishes(),
            dishNumber,
            i;
        dishNumber = dishes.length;
        for (i = 0; i < dishNumber; i++) {
            sum += +dishes[i].nutrients[nutrType];
        }
        return sum;
    }
    function getAvailable(nutrType) {
        var max = self.nutrients[nutrType].max(),
            total = self.nutrients[nutrType].total();
        if (max) {
            return +max - total;
        }
        return '~';
    }
}