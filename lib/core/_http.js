// Generated by CoffeeScript 1.7.1
var EsyHttp;

EsyHttp = (function() {
  function EsyHttp() {}

  EsyHttp.prototype.open = function(url) {
    var command;
    if ($.os.indexOf("Windows") !== -1) {
      url = url.replace(/&/g, "^&");
      command = "cmd /c 'explorer " + url + "'";
    } else {
      command = "open '" + url + "'";
    }
    return system.callSystem(command);
  };

  EsyHttp.prototype.get = function(url) {
    var call, conn, domain, httpPrefix, reply, typeMatch;
    httpPrefix = url.match(/http:\/\//);
    domain = (httpPrefix == null ? url.split("/")[0] + ":" + port : url.split("/")[2] + ":" + port);
    call = "GET " + (httpPrefix == null ? "http://" + url : url) + " HTTP/1.0\r\nHost:" + (httpPrefix == null ? url.split("/")[0] : url.split("/")[2]) + "\r\nConnection: close\r\n\r\n";
    reply = new String();
    conn = new Socket();
    typeMatch = url.match(/(\.)(\w{3,4}\b)/g);
    if (conn.open(domain, "binary")) {
      conn.write(call);
      reply = conn.read(9999999999);
      conn.close();
    } else {
      reply = "";
    }
    return reply.substr(reply.indexOf("\r\n\r\n") + 4);
  };

  return EsyHttp;

})();