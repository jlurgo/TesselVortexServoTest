var vx = require("vortexjs");
var tessel = require('tessel');
var servolib = require('servo-pca9685');

var NodoClienteHTTPNode = vx.NodoClienteHTTPNode;
var NodoRouter = vx.NodoRouter;
var NodoPortalBidi = vx.NodoPortalBidi;

var portal = new NodoPortalBidi();

var cli = new NodoClienteHTTPNode({
	//url: '192.168.1.3',
	//port: 3000,
	url: "router-vortex.herokuapp.com",
	verbose: true,
	intervalo_polling: 0
});

portal.conectarCon(cli);
cli.conectarCon(portal);

servo = servolib.use(tessel.port['A']);

servo1 = 1;

servo.on('ready', function () {
  	servo.configure(servo1, 0.05, 0.12, function () {
		servo.move(servo1, 1);
	});
});

portal.pedirMensajes({
	tipoDeMensaje:"control_servo",
	id_servo: 1
},function(msg){
	servo.move(servo1, msg.angulo/180);
});
