var PanelDeMandosServo = function(opt){
    $.extend(true, this, opt);
    this.start();
};

PanelDeMandosServo.prototype.start = function(){
    var _this = this;
    this.ui = $("#panel_control_bt");
    this.txt_status = this.ui.find("#status"); 
    
    vx.start({verbose:true});
    
    vx.conectarPorHTTP({
        url:'http://router-vortex.herokuapp.com',
        intervalo_polling: 200
    });    
    
//    vx.conectarPorWebSockets({
//        url:'https://router-vortex.herokuapp.com'
//        //url:'http://localhost:3000'
//    });
    
    this.panelKnobs = this.ui.find("#knobs");
    
    var knob1 = new VortexKnob({id:1});
    knob1.dibujarEn(this.panelKnobs);    
};