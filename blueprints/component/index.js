var Blueprint   = require('../../lib/models/blueprint');
var SilentError = require('../../lib/errors/silent');
var stringUtil  = require('../../lib/utilities/string');
var path        = require('path');

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, 'components', options.dasherizedModuleName);
        }
        return 'components';
      },
      __templatepath__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, 'components', options.dasherizedModuleName);
        }
        return 'templates/components';
      },
      __templatename__: function(options) {
        if (options.pod) {
          return 'template';
        }
        return options.dasherizedModuleName;
      }
    };
  },

  normalizeEntityName: function(entityName) {
    entityName = Blueprint.prototype.normalizeEntityName.apply(this, arguments);

    if(! /\-/.test(entityName)) {
      throw new SilentError('You specified "' + entityName + '", but in order to prevent ' +
                            'clashes with current or future HTML element names, you must include ' +
                            'a hyphen in the component name.');
    }

    return entityName;
  },

  locals: function(options) {
    var fileName        = stringUtil.dasherize(options.entity.name);
    var pathName        = '../templates/components';
    var templatePath    = path.join(pathName, fileName);
    if (options.pod) {
      templatePath = './template';
    }
    return {
      templatePath: templatePath
    };
  }
};
