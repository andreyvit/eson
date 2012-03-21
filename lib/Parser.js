
/**
 * Expose `Parser`.
 */

module.exports = Parser;

/**
 * Initialize a new `Parser`.
 *
 * @api public
 */

function Parser() {
  this.plugins = [];
}

/**
 * Use the given plugin `fn()`.
 *
 * @param {Function} fn
 * @return {Parser}
 * @api public
 */

Parser.prototype.use = function(fn){
  this.plugins.push(fn);
  return this;
};

/**
 * Parse the given `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

Parser.prototype.parse = function(str){
  var plugins = this.plugins;
  return JSON.parse(str, function(key, val){
    var plugin, ret;
    if ('' === key) return val;
    for (var i = 0, len = plugins.length; i < len; ++i) {
      plugin = plugins[i];
      ret = plugin(key, val);
      if (undefined != ret) val = ret;
    }
    return val;
  });
};