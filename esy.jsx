// Generated by CoffeeScript 1.7.1#target "aftereffects-12.0";// Generated by CoffeeScript 1.7.1var Esy;Esy = (function() {  function Esy() {}  Esy.prototype.initialize = function() {    this.ui = new EsyUi;    this.http = new EsyHttp;    this.file = new EsyFile;    this.color = new EsyColor;    if (esy.debug) {      return this.selfBuild((new File($.fileName)).parent.parent.path);    }  };  Esy.prototype.selfBuild = function(path) {    return esy.file.buildExtendScript("" + path + "/lib/esy.js", ["" + path + "/esy.jsx", "" + Folder.appPackage.path + "/Scripts/Startup/esy.jsx"]);  };  Esy.prototype.listProperties = function(obj) {    var property, _i, _ref, _results;    this.log("Esy.listProperties:");    _results = [];    for (property = _i = 1, _ref = obj.numProperties; 1 <= _ref ? _i <= _ref : _i >= _ref; property = 1 <= _ref ? ++_i : --_i) {      _results.push(this.log(property));    }    return _results;  };  Esy.prototype.log = function(str) {    try {      return $.write("" + (str != null ? str.toString() : void 0) + "\n");    } catch (_error) {}  };  Esy.prototype.dump = function(obj) {    var propertyName, propertyValue, _results;    if (obj) {      this.log("Esy.dump:");      _results = [];      for (propertyName in obj) {        propertyValue = obj[propertyName];        _results.push(this.log("" + propertyName + ": " + (propertyValue != null ? propertyValue.toString() : void 0) + " \n"));      }      return _results;    }  };  Esy.prototype.extend = function(sourceObject, defaultObject) {    var propertyName, propertyValue;    for (propertyName in defaultObject) {      propertyValue = defaultObject[propertyName];      if (!sourceObject[propertyName]) {        sourceObject[propertyName] = propertyValue;      }    }    return sourceObject;  };  return Esy;})();// Generated by CoffeeScript 1.7.1var EsyColor;EsyColor = (function() {  function EsyColor() {}  EsyColor.prototype.hexToRgb = function(hex) {    var b, g, r;    hex = parseInt(hex, 16);    r = hex >> 16;    g = (hex & 0x00ff00) >> 8;    b = hex & 0xff;    return [r, g, b];  };  EsyColor.prototype.hexToHsl = function(hex) {    var b, g, r;    hex = parseInt(hex, 16);    r = hex >> 16;    g = (hex & 0x00ff00) >> 8;    return b = hex & 0xff;  };  return EsyColor;})();// Generated by CoffeeScript 1.7.1var EsyFile;EsyFile = (function() {  function EsyFile() {}  EsyFile.prototype["delete"] = function(filepath) {    var file;    if (File(filepath)) {      file = File(filepath);    }    return file.remove();  };  EsyFile.prototype.append = function(filepath, content) {    var file;    file = File(filepath);    file.open("a");    file.write(content);    file.close();    return file;  };  EsyFile.prototype.buildExtendScript = function(filepath, destinations) {    var content, destination, read, _i, _len, _results;    content = this.read(filepath);    content = content.replace("esy.debug = true", "esy.debug = false");    read = (function(_this) {      return function(str, p1) {        return _this.read("" + (_this.path(filepath)) + "/" + p1);      };    })(this);    content = content.replace(/#include \"(.*)\";/g, read);    if (typeof destinations === "string") {      destinations = [destinations];    }    _results = [];    for (_i = 0, _len = destinations.length; _i < _len; _i++) {      destination = destinations[_i];      _results.push(this.create("" + (destination.toString()), content));    }    return _results;  };  EsyFile.prototype.create = function(filepath, content, overwrite) {    var file;    if (content == null) {      content = "";    }    if (overwrite == null) {      overwrite = true;    }    if (overwrite) {      this["delete"](filepath);    }    file = File(filepath);    file.open("w");    file.write(content);    file.close();    return file;  };  EsyFile.prototype.exists = function(filepath) {    var file;    file = File(filepath);    if (file.created) {      return file;    } else {      return false;    }  };  EsyFile.prototype.read = function(filepath) {    var content, file;    file = File(filepath);    file.open("r");    content = file.read();    file.close();    return content;  };  EsyFile.prototype.folderName = function(filepath) {    var folderName;    folderName = this.filename(filepath);    return folderName;  };  EsyFile.prototype.fileName = function(filepath) {    var filename;    filename = filepath.substr(filepath.lastIndexOf('/') + 1);    return filename;  };  EsyFile.prototype.path = function(filepath) {    var filename;    filename = filepath.substr(0, filepath.lastIndexOf('/'));    return filename;  };  return EsyFile;})();// Generated by CoffeeScript 1.7.1var EsyHttp;EsyHttp = (function() {  function EsyHttp() {}  EsyHttp.prototype.open = function(url) {    var command;    if ($.os.indexOf("Windows") !== -1) {      url = url.replace(/&/g, "^&");      command = "cmd /c 'explorer " + url + "'";    } else {      command = "open '" + url + "'";    }    return system.callSystem(command);  };  EsyHttp.prototype.get = function(url) {    var call, conn, domain, httpPrefix, reply, typeMatch;    httpPrefix = url.match(/http:\/\//);    domain = (httpPrefix == null ? url.split("/")[0] + ":" + port : url.split("/")[2] + ":" + port);    call = "GET " + (httpPrefix == null ? "http://" + url : url) + " HTTP/1.0\r\nHost:" + (httpPrefix == null ? url.split("/")[0] : url.split("/")[2]) + "\r\nConnection: close\r\n\r\n";    reply = new String();    conn = new Socket();    typeMatch = url.match(/(\.)(\w{3,4}\b)/g);    if (conn.open(domain, "binary")) {      conn.write(call);      reply = conn.read(9999999999);      conn.close();    } else {      reply = "";    }    return reply.substr(reply.indexOf("\r\n\r\n") + 4);  };  return EsyHttp;})();// Generated by CoffeeScript 1.7.1var EsyUi, EsyUiButton, EsyUiPanel, EsyUiRow, EsyUiTextbox, EsyUiWindow;EsyUi = (function() {  function EsyUi() {}  EsyUi.prototype.set = function() {    var window;    window = new EsyUiWindow;    return window;  };  EsyUi.prototype.show = function() {    return this;  };  return EsyUi;})();EsyUiWindow = (function() {  function EsyUiWindow() {    this.element = null;    this.render();    return this;  }  EsyUiWindow.prototype.render = function() {    if (esy.container instanceof Panel) {      return this.element = esy.container;    } else {      return this.element = new Window("window {orientation: 'row'}");    }  };  EsyUiWindow.prototype.addPanel = function(data) {    return new EsyUiPanel(this, data);  };  return EsyUiWindow;})();EsyUiPanel = (function() {  function EsyUiPanel(window, data) {    this.window = window;    this.data = data;    this.paddingLeft = 10;    this.paddingTop = 10;    this.width = 300;    this.element = null;    this.yOffset = 0;    this.render();    return this;  }  EsyUiPanel.prototype.render = function() {    var values;    values = [this.paddingLeft, this.paddingTop, this.width, 60];    this.element = this.window.element.add('panel', values, this.data.label);    return this;  };  EsyUiPanel.prototype.addRow = function(data) {    return new EsyUiRow(this, data);  };  return EsyUiPanel;})();EsyUiRow = (function() {  function EsyUiRow(panel, data) {    this.panel = panel;    this.data = data;    this.height = 30;    this.width = 100;    this.paddingLeft = 10;    this.paddingTop = this.panel.paddingTop + 10;    this.xOffset = this.panel.element.margins[0];    this.yOffset = this.panel.element.margins[1] + this.panel.yOffset;    this.render();    return this.panel;  }  EsyUiRow.prototype.render = function() {    var element, elementType, elements, _i, _len, _ref;    _ref = this.data;    for (_i = 0, _len = _ref.length; _i < _len; _i++) {      elements = _ref[_i];      for (elementType in elements) {        element = elements[elementType];        switch (elementType) {          case "button":            this.addButton(element);            break;          case "textbox":            this.addTextbox(element);        }      }    }    this.panel.element.size[1] += this.height;    return this;  };  EsyUiRow.prototype.addButton = function(element) {    return new EsyUiButton(this, element);  };  EsyUiRow.prototype.addTextbox = function(element) {    return new EsyUiTextbox(this, element);  };  return EsyUiRow;})();EsyUiButton = (function() {  function EsyUiButton(row, data) {    this.data = data;    this.row = row;    this.panel = this.row.panel;    this.render();    return this;  }  EsyUiButton.prototype.render = function() {    var values, _base, _base1, _base2, _base3;    if ((_base = this.data).height == null) {      _base.height = this.row.height;    }    if ((_base1 = this.data).width == null) {      _base1.width = this.row.width;    }    if ((_base2 = this.data).paddingLeft == null) {      _base2.paddingLeft = 10;    }    if ((_base3 = this.data).paddingTop == null) {      _base3.paddingTop = 0;    }    values = [this.data.paddingLeft + this.row.xOffset, this.data.paddingTop + this.row.yOffset, this.panel.element.size[0] * this.data.width / 100 + this.row.xOffset - this.panel.element.margins[0], this.data.paddingTop + this.data.height + this.row.yOffset];    this.row.xOffset = this.panel.element.size[0] * (this.data.width / 100) + this.row.xOffset;    this.panel.yOffset += this.data.paddingTop + this.data.height;    this.panel.window.element.add('button', values, this.data.label);    return this;  };  return EsyUiButton;})();EsyUiTextbox = (function() {  function EsyUiTextbox(row, data) {    this.data = data;    this.row = row;    this.panel = this.row.panel;    this.render();    return this;  }  EsyUiTextbox.prototype.render = function() {    var values, _base, _base1, _base2, _base3;    if ((_base = this.data).height == null) {      _base.height = this.row.height;    }    if ((_base1 = this.data).width == null) {      _base1.width = this.row.width;    }    if ((_base2 = this.data).paddingLeft == null) {      _base2.paddingLeft = this.row.paddingLeft;    }    if ((_base3 = this.data).paddingTop == null) {      _base3.paddingTop = this.row.paddingTop;    }    values = [this.data.paddingLeft + this.row.xOffset, this.data.paddingTop + this.row.yOffset, this.panel.element.size[0] * this.data.width / 100 + this.row.xOffset - this.panel.element.margins[0], this.data.paddingTop + this.data.height + this.row.yOffset];    this.row.xOffset = this.panel.element.size[0] * (this.data.width / 100) + this.row.xOffset;    this.panel.yOffset += this.data.paddingTop + this.panel.element.margins[1] + this.data.height;    this.panel.window.element.add('editText', values, this.data.label);    return this;  };  return EsyUiTextbox;})();var esy;esy = new Esy();esy.container = this;esy.debug = false;esy.initialize();