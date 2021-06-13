import React, { useEffect, useState, useRef } from 'react';
import '../style/App.css';

function App() {
	const [Display, setDisplay] = useState<string>();
	const viewRef = useRef<HTMLVideoElement>(null);

	useEffect(StartRec, []);

	function StartRec() {
		let constraints = { audio: false, video: { width: {ideal: 9999}, height: {ideal: 9999}, facingMode: "environment"} };
		// alert()
		if (!navigator.mediaDevices) return;
		navigator.mediaDevices.getUserMedia(constraints).then(media => {
			if (viewRef.current) {
				viewRef.current.srcObject = media;
				viewRef.current.onloadedmetadata = (e) => {
					if (viewRef.current) viewRef.current.play();
				}
			}
		}).catch(e => {
			console.log(e)
		})
	}

	async function Capture() {
		// let q = document.querySelector('input');

		// if (q && q.files) {
		// 	let fd = new FormData();
		// 	fd.append("file", q.files[0]);

		// 	console.log(await q.files[0].arrayBuffer())


		// 	// let OCR_Response = await fetch('https://localhost:3001/ocr', {
		// 	// 	method: "POST",
		// 	// 	// headers: {'Content-Type': 'form-data'},
		// 	// 	headers: {},
		// 	// 	body: fd
		// 	// });
		// 	// console.log(OCR_Response);
		// }


		if (viewRef.current) {
			let cv = document.createElement('canvas');
			cv.width = viewRef.current.videoWidth;
			cv.height = viewRef.current.videoHeight;
			cv.getContext('2d')?.drawImage(viewRef.current, 0, 0);

			let data = atob(cv.toDataURL('image/png').split(',')[1]);
			// var array = [];
			// for (var i = 0; i < data.length; i++) {
			// 	array.push(data.charCodeAt(i));
			// }
			let file = new Blob([new Uint8Array(Buffer.from(data, 'binary'))], {type: 'image/png'})
			let fd = new FormData();
			fd.append("file", file, "image.png");
			console.log(Buffer.from(data, 'binary'), fd);

			let OCR_Response = await fetch('https://192.168.1.71:3001/ocr', {
				method: "POST",
				// headers: {'Content-Type': 'form-data'},
				headers: {},
				body: fd
			});
			// console.log(OCR_Response);
			let OCR_Result: {result?: string, detail?: string} = await OCR_Response.json();
			if (OCR_Result.result)
				setDisplay(OCR_Result.result);
			else
				setDisplay(OCR_Result.detail);
		}
	}

	return (
		<div className="Comp">
			<video ref={viewRef} playsInline></video>
			{/* <input type="file" />
			<button onClick={Capture}>123</button> */}

			<div className="Bottom">

				<div className="row">
					<span className="TextResult">{Display}</span>
				</div>

				<div className="row">
					<div className="Shutter" onClick={Capture}>
						<div className="ShutterBall"></div>
					</div>
				</div>


			</div>

		</div>
	);
}

export default App;
