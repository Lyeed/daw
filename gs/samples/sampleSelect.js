"use strict";

gs.sampleSelect = function( sample, b ) {
	if ( sample && sample.selected !== b ) {
		sample.select( b );
		if ( b ) {
			gs.selectedSamples.push( sample );
		} else {
			gs.selectedSamples.splice( gs.selectedSamples.indexOf( sample ), 1 );
		}
	}
};
