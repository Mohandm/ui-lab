(function(){
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };

  $(document).ready(function() {
    $(".dropdown-toggle").dropdown();
  });
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });
})();

