"use strict";

gs.Sample = function( uifile ) {
	var canvas, ctx, img;

	this.uifile = uifile;
	this.wbuff = uifile.wbuff;
	this.wsample = this.wbuff.createSample();

	this.jqSample = $( "<div class='sample'>" );
	this.jqWaveformWrapper = $( "<div class='waveformWrapper'>" )
		.appendTo( this.jqSample );
	this.jqWaveform = $( "<canvas class='waveform'>" ).appendTo( this.jqWaveformWrapper );
	canvas = this.jqWaveform[ 0 ];
	ctx = canvas.getContext( "2d" );
	canvas.width = ~~( this.wbuff.buffer.duration * 300 );
	canvas.height = 50;
	img = ctx.createImageData( canvas.width, canvas.height );
	this.wbuff.drawWaveform( img, [ 0xDD, 0xDD, 0xFF, 0xFF ] );
	ctx.putImageData( img, 0, 0 );
	this.jqName = $( "<span class='text-overflow'>" )
		.text( uifile.name ).appendTo( this.jqSample );

	this.jqName[ 0 ].gsSample =
	this.jqWaveformWrapper[ 0 ].gsSample =
	this.jqWaveform[ 0 ].gsSample = this;

	this.select( false );
	ui.CSS_sampleWidth( this );
};