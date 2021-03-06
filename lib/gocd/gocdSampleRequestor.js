
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var xml2json = require('xml2json');

function gocdSampleRequestorModule() {

  var SAMPLES_PATH = path.resolve(__dirname, 'sample') + '/';

  function resolveAndPromiseSampleFile(path) {
    var defer = Q.defer();

    try {
      var fileContents = fs.readFileSync(path);

      defer.resolve(xml2json.toJson(fileContents, {
        object: true, sanitize: false
      }));

    } catch (err) {
      console.log('ERROR reading file', path, err);
      defer.reject();
    }

    return defer.promise;
  }

  var getPipelineDetails = function(pipelineId, pipelineName) {
    var fileName = 'details-' + pipelineName.toLowerCase() + '.xml';
    return resolveAndPromiseSampleFile(SAMPLES_PATH + fileName);
  };

  var getHistory = function(offset, pipelineName) {
    var fileName = 'history-' + pipelineName.toLowerCase();
    var path = SAMPLES_PATH + fileName + (offset ? '_' + offset : '') + '.json';

    var defer = Q.defer();

    try {
      var fileContents = fs.readFileSync(path);

      defer.resolve(JSON.parse(fileContents));
    } catch (err) {

      var emptyResult = {
        pipelines: [],
        pagination: {
          offset: 10,
          total: 5,
          page_size: 10
        }
      };

      defer.resolve(emptyResult);
    }

    return defer.promise;
  };

  return {
    getHistory: getHistory,
    getPipelineDetails: getPipelineDetails,
    getPipelineNames: function() {
      var defer = Q.defer();
      defer.resolve(['A-PIPELINE', 'DOWNSTREAM-PIPELINE']);
      return defer.promise;
    }
  };
}

var gocdRequestor = gocdSampleRequestorModule();
exports.getHistory = gocdRequestor.getHistory;
exports.getPipelineDetails = gocdRequestor.getPipelineDetails;
exports.getPipelineNames = gocdRequestor.getPipelineNames;
