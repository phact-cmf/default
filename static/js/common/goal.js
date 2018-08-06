window.goal = function (goal) {
  if (window.Ya && window.Ya._metrika) {
    window.Ya._metrika.counter.reachGoal(goal);
  }
};