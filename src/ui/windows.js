"use strict";

const UIwindows = new gsuiWindows();

function UIwindowsInit() {
	UIwindows.setRootElement( DOM.body );
	UIwindows.lowGraphics( true );
	UIwindowsAppendContent( UIwindows );
	UIwindows.onopen = win => UIwindowsBtn( win.id, true );
	UIwindows.onclose = win => UIwindowsBtn( win.id, false );
	DOM.winBtnsMap.forEach( btn => {
		UIwindows.window( btn.dataset.win ).setTitle( btn.dataset.text );
	} );
	DOM.winBtns.onclick = e => {
		const btn = e.target,
			winId = btn.dataset.win;

		if ( winId ) {
			UIwindows.window( winId ).openToggle(
				!btn.classList.contains( "winBtn-open" ) );
		}
	};
	UIwindowsSetPos( "blocks",  20,  20, 320, 780 );
	UIwindowsSetPos( "mixer",  360,  20, 400, 360 );
	UIwindowsSetPos( "main",   780,  20, 600, 360 );
	UIwindowsSetPos( "synth",  360, 400, 400, 400 );
	UIwindowsSetPos( "piano",  780, 400, 600, 400 );
}

function UIwindowsSetPos( winId, x, y, w, h ) {
	const win = UIwindows.window( winId );

	win.setSize( w, h );
	win.setPosition( x, y );
}

function UIwindowsBtn( winId, b ) {
	DOM.winBtnsMap.get( winId ).classList.toggle( "winBtn-open", b );
}

function UIwindowsAppendContent( UIwindows ) {
	document.querySelectorAll( "div[data-window]" ).forEach( winCnt => {
		const win = UIwindows.createWindow( winCnt.dataset.window ),
			elWinCnt = win.rootElement.querySelector( ".gsuiWindow-content" ),
			child = Array.from( winCnt.children );

		winCnt.remove();
		winCnt.classList.forEach( c => elWinCnt.classList.add( c ) );
		if ( child.length ) {
			const child0 = child[ 0 ];

			if ( child0.classList.contains( "windowMenu" ) ) {
				child.shift();
				win.headAppend.apply( win, child0.children );
			}
			win.append.apply( win, child );
		}
	} );
}
