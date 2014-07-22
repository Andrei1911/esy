// Generated by CoffeeScript 1.7.1#target "aftereffects-12.0";// Generated by CoffeeScript 1.7.1var Esy;Esy = (function() {  function Esy() {}  Esy.prototype.initialize = function() {    this.ui = new Esy.ui;    this.http = new Esy.http;    this.file = new EsyFile;    this.color = new Esy.color;    return this.selfBuild();  };  Esy.prototype.selfBuild = function() {    var destination, file;    destination = (new File($.fileName)).parent.parent.path;    file = this.file.exists("" + destination + "/esy.js");    return file = esy.file.buildExtendScript("~/Dropbox/_Personnal/code/scripts/toggler/components/esy/lib/esy.js", "" + destination + "/esy.js");  };  Esy.prototype.listProperties = function(obj) {    var property, _i, _ref, _results;    this.log("Esy.listProperties:");    _results = [];    for (property = _i = 1, _ref = obj.numProperties; 1 <= _ref ? _i <= _ref : _i >= _ref; property = 1 <= _ref ? ++_i : --_i) {      _results.push(this.log(property));    }    return _results;  };  Esy.prototype.log = function(str) {    try {      return $.write("" + (str != null ? str.toString() : void 0) + "\n");    } catch (_error) {}  };  Esy.prototype.dump = function(obj) {    var propertyName, propertyValue, _results;    if (obj) {      this.log("Esy.dump:");      _results = [];      for (propertyName in obj) {        propertyValue = obj[propertyName];        _results.push(this.log("" + propertyName + ": " + (propertyValue != null ? propertyValue.toString() : void 0) + " \n"));      }      return _results;    }  };  Esy.prototype.extend = function(sourceObject, defaultObject) {    var propertyName, propertyValue;    for (propertyName in defaultObject) {      propertyValue = defaultObject[propertyName];      if (!sourceObject[propertyName]) {        sourceObject[propertyName] = propertyValue;      }    }    return sourceObject;  };  return Esy;})();// Generated by CoffeeScript 1.7.1Esy.color = (function() {  function color() {}  color.prototype.hexToRgb = function(hex) {    var b, g, r;    hex = parseInt(hex, 16);    r = hex >> 16;    g = (hex & 0x00ff00) >> 8;    b = hex & 0xff;    return [r, g, b];  };  color.prototype.hexToHsl = function(hex) {    var b, g, r;    hex = parseInt(hex, 16);    r = hex >> 16;    g = (hex & 0x00ff00) >> 8;    return b = hex & 0xff;  };  return color;})();// Generated by CoffeeScript 1.7.1var EsyFile;EsyFile = (function() {  function EsyFile() {    return this;  }  EsyFile.prototype["delete"] = function(filepath) {    var file;    file = File(filepath);    return file.remove();  };  EsyFile.prototype.append = function(filepath, content) {    var file;    file = File(filepath);    file.open("a");    file.write(content);    file.close();    return file;  };  EsyFile.prototype.buildExtendScript = function(filepath, destination) {    var content, read;    content = this.read(filepath);    read = (function(_this) {      return function(str, p1) {        return _this.read("" + (_this.path(filepath)) + "/" + p1);      };    })(this);    content = content.replace(/#include \"(.*)\";/g, read);    return this.create("" + destination + "x", content);  };  EsyFile.prototype.create = function(filepath, content) {    var file;    if (content == null) {      content = "";    }    file = File(filepath);    file.open("w");    file.write(content);    file.close();    return file;  };  EsyFile.prototype.exists = function(filepath) {    var file;    file = File(filepath);    if (file.created) {      return file;    } else {      return false;    }  };  EsyFile.prototype.read = function(filepath) {    var content, file;    file = File(filepath);    file.open("r");    content = file.read();    file.close();    return content;  };  EsyFile.prototype.filename = function(filepath) {    var filename;    filename = filepath.substr(filepath.lastIndexOf('/') + 1);    return filename;  };  EsyFile.prototype.path = function(filepath) {    var filename;    filename = filepath.substr(0, filepath.lastIndexOf('/'));    return filename;  };  return EsyFile;})();// Generated by CoffeeScript 1.7.1Esy.http = (function() {  function http() {}  http.prototype.open = function(url) {    var command;    if ($.os.indexOf("Windows") !== -1) {      url = url.replace(/&/g, "^&");      command = "cmd /c 'explorer " + url + "'";    } else {      command = "open '" + url + "'";    }    return system.callSystem(command);  };  http.prototype.get = function(url) {    var call, conn, domain, httpPrefix, reply, typeMatch;    httpPrefix = url.match(/http:\/\//);    domain = (httpPrefix == null ? url.split("/")[0] + ":" + port : url.split("/")[2] + ":" + port);    call = "GET " + (httpPrefix == null ? "http://" + url : url) + " HTTP/1.0\r\nHost:" + (httpPrefix == null ? url.split("/")[0] : url.split("/")[2]) + "\r\nConnection: close\r\n\r\n";    reply = new String();    conn = new Socket();    typeMatch = url.match(/(\.)(\w{3,4}\b)/g);    if (conn.open(domain, "binary")) {      conn.write(call);      reply = conn.read(9999999999);      conn.close();    } else {      reply = "";    }    return reply.substr(reply.indexOf("\r\n\r\n") + 4);  };  return http;})();// Generated by CoffeeScript 1.7.1Esy.ui = (function() {  function ui() {    this.sizes = {};    this.window = null;    this.currentPanel = null;    this.panels = [];    this.rows = [];    this.buttons = [];    this.textbox = [];    this.xOffset = 0;    this.yOffset = 0;  }  ui.prototype.set = function(width, paddingLeft, paddingTop) {    if (width == null) {      width = 300;    }    if (paddingLeft == null) {      paddingLeft = 10;    }    if (paddingTop == null) {      paddingTop = 10;    }    this.sizes.paddingLeft = paddingLeft;    this.sizes.paddingTop = paddingTop;    this.sizes.width = width;    this.sizes.heightIncrement = 0;    if (esy.container instanceof Panel) {      this.window = esy.container;    } else {      this.window = new Window("window {orientation: 'column'}");    }    return this;  };  ui.prototype.show = function() {    if (!(esy.container instanceof Panel)) {      this.window.show();    }    return this;  };  ui.prototype.addRow = function(data) {    var element, elementType, elements, height, values, width, _i, _len;    height = 0;    width = 0;    for (_i = 0, _len = data.length; _i < _len; _i++) {      elements = data[_i];      for (elementType in elements) {        element = elements[elementType];        values = this.returnGoodUIValues(element.height != null ? element.height : element.height = 30, element.width != null ? element.width : element.width = 100);        if (height === 0) {          height += element.height;        }        switch (elementType) {          case "button":            this.addButton(element.label, values);        }      }    }    this.currentPanel.height += height;    return this;  };  ui.prototype.addPanel = function(label) {    var values;    values = this.returnGoodUIValues(60, this.sizes.width);    this.panels[label] = this.currentPanel = this.window.add('panel', values, label);    return this;  };  ui.prototype.getPanel = function(label) {    return this.panels[label];  };  ui.prototype.addButton = function(label, values) {    this.buttons[label] = this.window.add('button', values, label);    return this;  };  ui.prototype.getButton = function(label) {    return this.buttons[label];  };  ui.prototype.addTextbox = function(label, showLabel, height, offsets) {    if (showLabel == null) {      showLabel = false;    }    if (height == null) {      height = 30;    }    if (offsets == null) {      offsets = [10, 10, -10, 0];    }    this.textbox[label] = this.window.add('editText', this.returnGoodUIValues(height, false, offsets), "");    return this;  };  ui.prototype.getTextbox = function(label) {    return this.textbox[label];  };  ui.prototype.returnGoodUIValues = function(height, width, adaptSizes) {    var i, key, sizes, value, values, _ref;    if (adaptSizes == null) {      adaptSizes = [0, 0, 0, 0];    }    sizes = [];    i = 0;    _ref = this.sizes;    for (key in _ref) {      value = _ref[key];      sizes[key] = value + adaptSizes[i];      i++;    }    values = [sizes.paddingLeft, sizes.paddingTop + this.sizes.heightIncrement, sizes.width / (100 / width), sizes.paddingTop + this.sizes.heightIncrement + height];    return values;  };  return ui;})();var esy;esy = new Esy();esy.container = this;esy.initialize();