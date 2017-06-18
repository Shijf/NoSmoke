'use strict';

function WDClient(options) {
  this.server = options.server;
  this.init();
};

var sessionId = "";

WDClient.prototype.init = function() {
  var that = this;
  console.log(this.server);
  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      // app: '~/.macaca-temp/ios-app-bootstrap.app'
      app: '/Users/Gangdooz/private/macaca/NoSmoke/.macaca-temp/ios-app-bootstrap.app'
    }
  }, function(data) {
    sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      var base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });

    // Start crawling
    var crawler = new NSCrawler(crawlerConfig, sessionId).initialize();
    setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000)
  });
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json()
  }
  if (method.toLowerCase() === 'post') {
    return fetch(`${this.server}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data)
        }
        return data;
      });
  } else {
    return fetch(`${this.server}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
        return data;
      });
  }
};

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

/** ----------------------------------------  AppCrawler Implementation: 1. Modeling  ----------------------------------------- **/

/** Crawling Action Target  */
var NSTargetActionType = {
  CLICK: 1,
  INPUT: 2,
  SWIPE: 3,
  NAVIGATE: 4
};

var NSTargetSearchType = {
  XPath: 1,
  Value: 2,
  Identifier: 3
};

function NSTargetElement() {
  this.searchMethod = NSTargetSearchType.Value;   // Searchable via XPath, Value, Identifier
  this.searchValue = null;                        // Search value, value of XPath, Value & Identifier
  this.actionType  = NSTargetActionType.CLICK;
  this.actionPerformTimes = 1;
  this.actionValue = null;
}

/** Crawling Config  */
function NSCrawlerConfig() {
  this.testingPeriod = 2 * 60 * 60;
  this.testingDepth = 16;
  this.takeScreenShot = true;
  this.autoCancelAlert = true;
  this.newCommandTimeout = 3;
  this.launchTimeout = 6;
  this.maxActionPerPage = 20;
  this.navigationBackKeyword =[];
  this.targetElements = {};
  this.exclusiveList = [];
}

NSCrawlerConfig.prototype.debugDesriptoin =  function () {
  return "newCommandTimeout: " + this.newCommandTimeout + "\n" +
    "testingDepth: " + this.testingDepth + "\n" +
    "takeScreenShot: " + this.takeScreenShot+ "\n" +
    "autoCancelAlert: " + this.autoCancelAlert+ "\n" +
    "launchTimeout: " + this.launchTimeout+ "\n" +
    "targetElements: " + this.targetElements+ "\n";
}

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = "";       // Unique path which leads to current page
  this.parent = null;   // Parent ui element
  this.actions = {};    // Units in {value : NSAppCrawlingTreeNodeAction}
  this.digest = null;
}

NSAppCrawlingTreeNode.prototype.isFinishedBrowseing = function () {
  return false;
}

NSAppCrawlingTreeNode.prototype.checkDigest = function () {
  if (this.digest == null) {
    return window.wdclient.send(`/wd/hub/session/${sessionId}/title`,`get`,null,null)
      .then((title)  => {
        this.digest = title
      });
  } else {
    return new Promise((resolve) => {
      resolve(this.digest);
    });
  }
}

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.action = null;
  this.input = null;
}

NSAppCrawlingTreeNodeAction.prototype.desription = function() {

}

/** ----------------------------------------  AppCrawler Implementation: 2. Crawler Logic ----------------------------------------- **/

function NSCrawler(config, sessionId) {
  this.config         = config;                     // Config in format of NSCrawlerConfig
  this.sessionId      = sessionId;                  // Session Id
  this.crawlingBuffer = [];                         // The set of notes
  this.currentNode    = null;                       // Current node which is in crawling
}

NSCrawler.prototype.initialize = function () {
  return this;
}

NSCrawler.prototype.explore = function (source) {
  console.log("-------> Checkout Console <--------");
  console.log(source);
  let node = new NSAppCrawlingTreeNode();
  node.checkDigest().then(() => {
    // 1. Check if there is an existing node
    for (let index in this.crawlingBuffer) {
      if(this.crawlingBuffer[index] && this.crawlingBuffer[index].digest == node.digest) {
        this.currentNode = this.crawlingBuffer[index];
        setTimeout(this.prepareForNextScanning.bind(this), this.config.newCommandTimeout * 1000);
        return;
      }
    }

    // 2. Initialize an new node
    node.parent = this.currentNode;
    this.currentNode = node;

    let match = recursiveFilter(JSON.parse(source.value), this.config.targetElements);
    if (match.length) {
       // Produce actions
    } else {
      //TODO: think about elements which no need to be triggered

    }

    setTimeout(this.prepareForNextScanning.bind(this), this.config.newCommandTimeout * 1000);
  });
}

NSCrawler.prototype.prepareForNextScanning = function () {
  if (this.currentNode.isFinishedBrowseing()) {
    window.wdclient
      .send(`/wd/hub/back`,`post`,null,null)
      .then(this.crawl())
  } else {
    this.crawl()
  }
}

NSCrawler.prototype.crawl = function () {
  console.log("----> SessionId: <----");
  console.log(this.sessionId);
  console.log("----> Config Info: <----");
  console.log(this.config.debugDesriptoin());
  console.log("----> Crawling <----");

  window.wdclient
    .send(`/wd/hub/session/${sessionId}/source`,`get`,null,null)
    .then((data)  => {
       this.explore(data)
    })
}

/** ----------------------------------------  AppCrawler Implementation: 3. Configuration & Run ----------------------------------------- **/

// Login configuration
var loginAccount  = new NSTargetElement();
var loginPassword = new NSTargetElement();
var loginButton   = new NSTargetElement();

loginAccount.actionType     = NSTargetActionType.INPUT;
loginAccount.searchValue    = "please input username";
loginAccount.actionValue    = "中文+Test+12345678";

loginPassword.actionType    = NSTargetActionType.INPUT;
loginPassword.searchValue   = "please input password";
loginPassword.actionValue   = "111111";

loginButton.actionType      = NSTargetActionType.CLICK;
loginButton.searchValue     = "Login";

var crawlerConfig = new NSCrawlerConfig();
crawlerConfig.targetElements[loginAccount.searchValue] = loginAccount;
crawlerConfig.targetElements[loginPassword.searchValue] = loginPassword;
crawlerConfig.targetElements[loginButton.searchValue] = loginButton;

crawlerConfig.navigationBackKeyword.push("返回")
crawlerConfig.navigationBackKeyword.push("取消")

/** -------------------------------------------           Utils                  ------------------------------------------------------- **/

// If match is null or empty, put all elements which belongs to button, label,
function recursiveFilter(source, matches) {
  var sourceArray = [];

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof  source[key] == "object" && source[key] !== null) {
        let result = recursiveFilter(source[key], matches);
        sourceArray = sourceArray.concat(result);
      } else if (source[key] != null) {
        if (matches && matches.length) {
          // Explicit mode
          for (let match in matches) {
            if ((source.value && source.value == match) ||
              (source.name && source.name == match)     ||
              (source.label && source.label == match)) {
              return [source]
            }
          }
        } else {
          if (source.type) {
            switch (source.type) {
              case 'StaticText':
              case 'Button':
              case 'Cell':
                break;
              case 'PageIndicator':
                break;
              case 'TextField':
              case 'SecureTextField':
                break;
              case 'Other':
                break;
              case 'Alert':
                break;
              default:
            }
          }
        }
      }
    }
  }
  return sourceArray;
}

function produceNodeActions(rawElements) {

}