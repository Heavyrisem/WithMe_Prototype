import React from 'react';
import '../style/App.css';

function App() {
	function StartRec() {
		var constraints = { audio: false, video: { facingMode: "environment"} };
		console.log(navigator.mediaDevices)
		if (!navigator.mediaDevices) return;
		navigator.mediaDevices.getUserMedia(constraints).then(media => {
			let vid = document.querySelector('video');
			if (vid) {
				vid.srcObject = media;
				vid.onloadedmetadata = (e) => {
					if (vid) vid.play();
				}
			}
		}).catch(e => {
			console.log(e)
		})
	}

	return (
		<div>
			<video playsInline></video>
			<button onClick={StartRec}>Start</button>
		</div>
	);
}

export default App;
