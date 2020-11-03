// родитель
function Food(type) {
    this.name = type.name;
    this.price = type.price;
    this.calories = type.calories;
}
Food.prototype.getName = function () {
    return this.name;
};

Food.prototype.calculatePrice = function () {
    return this.price;
};

Food.prototype.calculateCalories = function () {
    return this.calories;
};

//гамбургер 
function Hamburger(type, stuffing) {
    Food.call(this, type);
    this.name = this.name + ' with ' + stuffing.name;
    this.price = this.price + stuffing.price;
    this.calories = this.calories + stuffing.calories;
}

Hamburger.prototype = Object.create(Food.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getStuffing = function () {
    return stuffing.name;
};


Hamburger.SIZE_SMALL = {
    name: 'Small hamburger',
    price: 50,
    calories: 20
};
Hamburger.SIZE_LARGE = {
    name: 'Large hamburger',
    price: 100,
    calories: 40
};
Hamburger.STUFFING_CHEESE = {
    name: 'cheese',
    price: 10,
    calories: 20
};
Hamburger.STUFFING_SALAD = {
    name: 'salad',
    price: 20,
    calories: 5
};
Hamburger.STUFFING_POTATO = {
    name: 'potato',
    price: 15,
    calories: 10
};

//салат
function Salad(type, gram) {
    Food.call(this, type);
    this.gram = gram;
    this.price = this.getPercent(this.price, this.gram);
    this.calories = this.getPercent(this.calories, this.gram);
}

Salad.prototype = Object.create(Food.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.getPercent = function (num, gram) {
    return num / 100 * gram;
}

Salad.CAESAR = {
    name: 'Caesar',
    price: 100,
    calories: 20
};
Salad.OLIVIE = {
    name: 'Olivie',
    price: 50,
    calories: 80
};
Salad.SIZE_LARGE = 150;
Salad.SIZE_SMALL = 100;

//напиток
function Drink(type) {
    Food.call(this, type);
}

Drink.prototype = Object.create(Food.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = {
    name: 'Cola',
    price: 50,
    calories: 40
};
Drink.COFFEE = {
    name: 'Coffee',
    price: 80,
    calories: 20
};

//заказ
function Order() {
    this.items = [];
    this.paid = false;
}

Order.prototype.Pay = function () {
    this.paid = true;
}
Order.prototype.isPaid = function () {
    return this.paid;
}
Order.prototype.addItem = function (item) {
    if (this.isPaid()) {
        console.log('Sorry, the order is already paid');
        return;
    }
    this.items.push(item);
    console.log('You have successfully added ' + item.name + ' to your order');
}
Order.prototype.deleteItem = function (index) {
    if (this.isPaid()) {
        console.log('Sorry, the order is already paid');
        return;
    }
    var item = this.items.splice(index, 1)[0];
    console.log('You have successfully delete ' + item.name + ' to your order');
}
Order.prototype.getCalories = function () {
    var totalCalories = 0;
    for (var i = 0; i < this.items; i++) {
        totalCalories += this.items[i].calculateCalories();
    }
    return totalCalories;
}
Order.prototype.getPrice = function () {
    var totalPrice = 0;
    for (var i = 0; i < this.items; i++) {
        totalPrice += this.items[i].calculatePrice();
    }
    return totalPrice;
}
Order.prototype.getList = function () {
    console.log('-----');
    console.log('Your order is:');
    for (var i = 0; i < this.items.length; i++) {
        console.log(this.items[i].getName());
    }
    console.log('-----');
}

//тест
var order = new Order();
order.addItem(new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE));
order.addItem(new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD));
order.addItem(new Salad(Salad.OLIVIE, Salad.SIZE_LARGE));
order.addItem(new Drink(Drink.COFFEE));
order.getList();
order.getCalories();
order.getPrice();
order.deleteItem(2);
order.addItem(new Salad(Salad.CAESAR, Salad.SIZE_SMALL));
order.getList();
order.getCalories();
order.getPrice();
order.Pay();
order.deleteItem(3);
order.addItem(new Salad(Salad.OLIVIE, Salad.SIZE_SMALL));
order.getList();
order.getCalories();
order.getPrice();