
function isInteger(value) {
  return /^\d+$/.test(value);
}

function Todo(message, level, parent, number) {
  this.message = message, 
  this.number = number;  
  this.parent = parent; // Parent object if nested
  this.level = level; // String to show what number and level the todo is at
  this.complete = false; // If todo is done or not done

  this.add = function (message) {
    var i = 1;
    while (i in this) i++
    this[i] = new Todo(message, this.level + '[' + i + ']', this, i);
    list.display();
  },

  this.edit = function (message) {
    this.message = message;
    list.display();
  },

  this.toggleComplete = function () {
    this.complete = !this.complete;
    list.display();
  },

  this.toggleAll = function(complete, display=true) {
    for (key in this) {
      if (isInteger(key)) {
        this[key]['complete'] = complete;
      }
      for (nestedKey in this[key]) {
        if (isInteger(key) && isInteger(nestedKey)) {
          this[key].toggleAll(complete, false);
        }
      }
    }
    if (display) {
      list.display();
    }
  },

  this.destroy = function (display = true) {
    delete this.parent[this.number];
    // Set display to false so it only displays once when called in a loop or recursion
    if (display) { 
      list.display();
    }
  },

  this.destroyCompleted = function (display = true) {
    for (key in this) {
      // Destroy if item is completed
      if (isInteger(key) && this[key]['complete'] === true) {
        this[key].destroy(false);
      }
      // If item is not completed, check the nested children
      else if (isInteger(key) && this[key]['complete'] === false) {
        this[key].destroyCompleted(false);
      }
    }
    // Set display to false so it only displays once when called in a loop or recursion
    if (display) { 
      list.display();
    }
  },

  this.display = function (show = true) {
    for (key in this) {
      if (isInteger(key)) {

        // Example: list[1][1] My Message [ ]
          // list[1][1]: First item in the list with a nested first item
          // 'My Message': Item content
          // [ ]: Incomplete, [X]: Complete

        console.log(this[key]['level'], this[key]['message'], (this[key]['complete'])? '[X]' : '[ ]');

        // If it has nested todo, perform recursion
        for (nestedKey in this[key]) {
          if (isInteger(nestedKey) && isInteger(key)) {
            this[key].display();
          }
        }
      }
    }
  },

  this.nuke = function() {
    location.reload();
  }
  
}
window.list = new Todo('Console Todo List', 'list'); // 'list' is just an arbitrary name, it can be anything
