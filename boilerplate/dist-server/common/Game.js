"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lanceGg = require("lance-gg");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// /////////////////////////////////////////////////////////
//
// GAME OBJECTS
//
// /////////////////////////////////////////////////////////
<<<<<<< HEAD
var BASEX = 150;
var BASEY = 150;

var Player =
/*#__PURE__*/
function (_DynamicObject) {
=======
var Player = /*#__PURE__*/function (_DynamicObject) {
>>>>>>> ce529a502807984d5f61afb903f00086dab26ad9
  _inherits(Player, _DynamicObject);

  var _super = _createSuper(Player);

  function Player(gameEngine, options, props) {
    _classCallCheck(this, Player);

    return _super.call(this, gameEngine, options, props);
  }

  _createClass(Player, [{
    key: "syncTo",
    value: function syncTo(other) {
      _get(_getPrototypeOf(Player.prototype), "syncTo", this).call(this, other);

      this.health = other.health;
    }
  }], [{
    key: "netScheme",
    get: function get() {
      return Object.assign({
        health: {
          type: _lanceGg.BaseTypes.TYPES.INT16
        }
      }, _get(_getPrototypeOf(Player), "netScheme", this));
    }
  }]);

  return Player;
}(_lanceGg.DynamicObject);

var Thing =
/*#__PURE__*/
function (_DynamicObject2) {
  _inherits(Thing, _DynamicObject2);

  function Thing(gameEngine, options, props) {
    _classCallCheck(this, Thing);

    return _possibleConstructorReturn(this, _getPrototypeOf(Thing).call(this, gameEngine, options, props));
  }

  _createClass(Thing, [{
    key: "syncTo",
    value: function syncTo(other) {
      _get(_getPrototypeOf(Thing.prototype), "syncTo", this).call(this, other);
    }
  }]);

  return Thing;
}(_lanceGg.DynamicObject); // /////////////////////////////////////////////////////////
//
// GAME ENGINE
//
// /////////////////////////////////////////////////////////


var Game = /*#__PURE__*/function (_GameEngine) {
  _inherits(Game, _GameEngine);

  var _super2 = _createSuper(Game);

  function Game(options) {
    var _this;

    _classCallCheck(this, Game);

    _this = _super2.call(this, options);
    _this.physicsEngine = new _lanceGg.SimplePhysicsEngine({
      gameEngine: _assertThisInitialized(_this)
    }); // common code

    _this.on('postStep', _this.gameLogic.bind(_assertThisInitialized(_this))); // server-only code


    _this.on('server__init', _this.serverSideInit.bind(_assertThisInitialized(_this)));

    _this.on('server__playerJoined', _this.serverSidePlayerJoined.bind(_assertThisInitialized(_this)));

    _this.on('server__playerDisconnected', _this.serverSidePlayerDisconnected.bind(_assertThisInitialized(_this))); // client-only code


    _this.on('client__rendererReady', _this.clientSideInit.bind(_assertThisInitialized(_this)));

    _this.on('client__draw', _this.clientSideDraw.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Game, [{
    key: "registerClasses",
    value: function registerClasses(serializer) {
      serializer.registerClass(Player);
      serializer.registerClass(Thing);
    }
  }, {
    key: "gameLogic",
    value: function gameLogic() {}
  }, {
    key: "processInput",
    value: function processInput(inputData, playerId) {
      _get(_getPrototypeOf(Game.prototype), "processInput", this).call(this, inputData, playerId); // get the player paddle tied to the player socket


      var player = this.world.queryObject({
        playerId: playerId
      });

      if (player) {
        if (inputData.input === 'up') {
          player.position.y -= 5;
        } else if (inputData.input === 'down') {
          player.position.y += 5;
        } else if (inputData.input === 'left') {
          player.position.x -= 5;
        } else if (inputData.input === 'right') {
          player.position.x += 5;
        }
      }
    } // /////////////////////////////////////////////////////////
    //
    // SERVER ONLY CODE
    //
    // /////////////////////////////////////////////////////////

  }, {
    key: "serverSideInit",
    value: function serverSideInit() {
      this.addObjectToWorld(new Thing(this, null, {
        position: new _lanceGg.TwoVector(10, 100)
      }));
      this.addObjectToWorld(new Thing(this, null, {
        position: new _lanceGg.TwoVector(30, 100)
      }));
      this.addObjectToWorld(new Thing(this, null, {
        position: new _lanceGg.TwoVector(100, 10)
      }));
      this.addObjectToWorld(new Thing(this, null, {
        position: new _lanceGg.TwoVector(100, 30)
      })); // create the paddle objects
      //this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(PADDING, 0) }));
    } // attach newly connected player to next available paddle

  }, {
    key: "serverSidePlayerJoined",
    value: function serverSidePlayerJoined(ev) {
      var player = this.addObjectToWorld(new Player(this, null, {
        position: new _lanceGg.TwoVector(100, 100)
      }));
      player.playerId = ev.playerId;
    }
  }, {
    key: "serverSidePlayerDisconnected",
    value: function serverSidePlayerDisconnected(ev) {
      var player = this.world.queryObjects({
        instanceType: Player
      });

      for (var i = 0; i < player.length; i++) {
        if (player[i].playerId == ev.playerId) this.removeObjectFromWorld(player[i].id);
      }
    } // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////

  }, {
    key: "clientSideInit",
    value: function clientSideInit() {
      this.controls = new _lanceGg.KeyboardControls(this.renderer.clientEngine);
      this.controls.bindKey('up', 'up', {
        repeat: true
      });
      this.controls.bindKey('down', 'down', {
        repeat: true
      });
      this.controls.bindKey('left', 'left', {
        repeat: true
      });
      this.controls.bindKey('right', 'right', {
        repeat: true
      });
    }
  }, {
    key: "clientSideDraw",
    value: function clientSideDraw() {
      var gamePanel = document.querySelector('.GamePanel');
      gamePanel.innerHTML = "";
      var things = this.world.queryObjects({
        instanceType: Thing
      });
      var players = this.world.queryObjects({
        instanceType: Player
      });
      var client = this.world.queryObjects({
        playerId: this.playerId
      })[0];
      if (!things && !players) return;

      if (things || players) {
        for (var i = 0; i < players.length; i++) {
          console.log('this1');

          if (players[i].playerId == client.playerId) {
            var div = document.createElement('div');
            div.classList.add(".player".concat(players[i].playerId));
            div.style.width = '10px';
            div.style.height = '10px';
            div.style.position = "absolute";
            div.style.top = BASEY;
            div.style.left = BASEX;
            div.style.border = "solid 1px red";
            gamePanel.appendChild(div);
          } else {
            console.log('this2');
            var div = document.createElement('div');
            div.classList.add(".player".concat(players[i].playerId));
            div.style.width = '10px';
            div.style.height = '10px';
            div.style.position = "absolute";
            div.style.top = players[i].position.y + client.position.y + 10 + BASEY;
            div.style.left = players[i].position.x + client.position.x + BASEX;
            div.style.border = "solid 1px red";
            gamePanel.appendChild(div);
          }
        }

        for (var i = 0; i < things.length; i++) {
          console.log('this3');
          var div = document.createElement('div');
          div.classList.add(".things".concat(things[i].playerId));
          div.style.width = '10px';
          div.style.height = '10px';
          div.style.position = "absolute";
          div.style.top = things[i].position.y + client.position.y + 10 + BASEY;
          div.style.left = things[i].position.x + client.position.x + BASEX;
          div.style.border = "solid 1px blue";
          gamePanel.appendChild(div);
        }
      }
    }
  }]);

  return Game;
}(_lanceGg.GameEngine);

exports["default"] = Game;
//# sourceMappingURL=Game.js.map