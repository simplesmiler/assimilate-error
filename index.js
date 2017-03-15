module.exports = function(err, force) {
  // @NOTE: if it is a regular error, then pass, except for when the assimilation is forced
  if (!force && err instanceof Error) {
    return err;
  }

  var Constructor = err && err.__proto__ && err.__proto__.constructor;

  // @NOTE: if it does not have a constructor, then pass
  if (!Constructor) {
    return err;
  }

  // @NOTE: if constructor does not look like an error constructor, then pass
  if (!Constructor.name.endsWith('Error')) {
    return err;
  }

  // @NOTE: resistance is futile

  var AssimilatedConstructor = global[Constructor.name];
  var error = new AssimilatedConstructor(err.message);

  var keys = Object.keys(err);
  var fields = ['stack', 'code', 'errno', 'syscall'].concat(keys);

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    if (err[field]) {
      error[field] = err[field];
    }
  }

  return error;
};
