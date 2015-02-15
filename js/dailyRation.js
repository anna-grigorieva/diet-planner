function DailyRation(date) {
    var self = this;

    self.date = date;
    self.meals = [new Meal('Breakfast'), new Meal('Lunch'), new Meal('Dinner')];
    self.nutrients = {
        kcalories: {
            total: ko.computed(function () { return getTotalSum('kcalories'); }),
            max: ko.computed(function () { return getMaxSum('kcalories'); })
        },
        protein: {
            total: ko.computed(function () { return getTotalSum('protein'); }),
            max: ko.computed(function () { return getMaxSum('protein'); })
        },
        carbs: {
            total: ko.computed(function () { return getTotalSum('carbs'); }),
            max: ko.computed(function () { return getMaxSum('carbs'); })
        },
        fat: {
            total: ko.computed(function () { return getTotalSum('fat'); }),
            max: ko.computed(function () { return getMaxSum('fat'); })
        }
    };
    self.isEmpty = ko.computed(function () {
        for (var i = 0; i < self.meals.length; i++) {
            if (self.meals[i].dishes().length) {
                return false;
            }
        }
        return true;
    });
    function getMaxSum(nutrType) {
        var
            sum = 0,
            meals = self.meals,
            mealNumber,
            nutrient,
            i;

        mealNumber = meals.length;
        for (i = 0; i < mealNumber; i++) {
            nutrient = meals[i].nutrients[nutrType].max();
            if (!(+nutrient) && (nutrient !== '0')) {
                return '~';
            }
            sum += +nutrient;
        }
        return sum;
    }
    function getTotalSum(nutrType) {
        var
            sum = 0,
            meals = self.meals,
            mealNumber,
            nutrient,
            i;

        mealNumber = meals.length;
        for (i = 0; i < mealNumber; i++) {
            nutrient = meals[i].nutrients[nutrType].total();
            sum += +nutrient;
        }
        return sum;
    }
}