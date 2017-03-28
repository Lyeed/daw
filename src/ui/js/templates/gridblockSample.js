"use strict";

ui.gridblockSample = function( smpobj ) {
	var tpl = document.querySelector( "#gridblockSample" ).content,
		elRoot = document.importNode( tpl, true );

	ui.dom.templateCloned.appendChild( elRoot );
	elRoot = ui.dom.templateCloned.querySelector( ".gridblock" );
	elRoot.remove();

	this.smpobj = smpobj;
	this.elRoot = elRoot;
	this.elWave = elRoot.querySelector( ".gsuiWaveform" );
	this.elName = elRoot.querySelector( ".name" );
	this.elCropStart = elRoot.querySelector( ".crop.start" );
	this.elCropEnd = elRoot.querySelector( ".crop.end" );
	this.uiWaveform = new gsuiWaveform( this.elWave );
	Array.from( elRoot.querySelectorAll( "*" ) ).forEach( function( el ) {
		el.smpobj = smpobj;
	} );
	this.name( smpobj.srcobj.metadata.name );
};

ui.gridblockSample.prototype = {
	show: function() {
		this.elRoot.style.display = "block";
	},
	hide: function() {
		this.elRoot.style.display = "none";
	},
	remove: function() {
		this.elRoot.remove();
	},
	select: function( b ) {
		this.elRoot.classList.toggle( "selected", b );
	},
	name: function( name ) {
		this.elName.textContent = name;
	},
	inTrack: function( trkobj ) {
		trkobj.userData.elColLinesTrack.appendChild( this.elRoot );
	},
	when: function( sec ) {
		this.elRoot.style.left = sec * ui.BPMem + "em";
	},
	duration: function( sec ) {
		this.elRoot.style.width = sec * ui.BPMem + "em";
		this._waveform( this.smpobj.offset, sec );
	},
	slip: function( sec ) {
		this._waveform( sec, this.smpobj.duration );
	},
	_waveform: function( off, dur ) {
		var b0, b1,
			smp = this.smpobj,
			buf = smp.srcobj.bufferSample.buffer;

		if ( buf ) {
			b0 = buf.getChannelData( 0 );
			b1 = buf.numberOfChannels < 2 ? b0 : buf.getChannelData( 1 );
			this.uiWaveform.setResolution( ~~( dur * 1024 ), 128 );
			this.uiWaveform.draw( b0, b1, buf.duration, off, dur );
		}
	}
};
