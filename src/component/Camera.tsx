import React, { useRef, useEffect } from "react";

function Camera() {
	const viewRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);


	useEffect(StartRec, []);

	function StartRec() {
		let constraints = { audio: false, video: { width: {ideal: window.screen.height}, height: {ideal: window.screen.width*1.2}, facingMode: "environment"} };
		// let constraints = { audio: false, video: { width: 768, height: 1028, facingMode: "environment"} };
		if (!navigator.mediaDevices) return;
		navigator.mediaDevices.getUserMedia(constraints).then(media => {
			if (viewRef.current) {
				viewRef.current.srcObject = media;
				// viewRef.current.srcObject.addTrack(audioStream)
				// media.addTrack(new MediaStreamTrack())
				viewRef.current.onloadedmetadata = (e) => {
					if (viewRef.current) viewRef.current.play();
				}
			}
		}).catch(e => {
			console.log(e);
			alert("Err" + e);
		})
	}


	function Capture() {
		if (viewRef.current && audioRef.current && canvasRef.current) {
			// canvasRef.current. = (e) => {
			// 	console.log("loaded");
			// }
			viewRef.current.pause();
			setDisplay("Loading ...");
			canvasRef.current.width = viewRef.current.videoWidth;
			canvasRef.current.height = viewRef.current.videoHeight;
			canvasRef.current.getContext('2d')?.drawImage(viewRef.current, 0, 0, viewRef.current.videoWidth, viewRef.current.videoHeight);
			// console.log(ctx, canvasRef.current.toDataURL());
			canvasRef.current.toBlob(async file => {
				if (!file || !(viewRef.current && audioRef.current && canvasRef.current)) return setDisplay("Image Read Error");
				let fd = new FormData();
				fd.append("file", file, "image.png");
				
				try {
					let OCR_Response = await fetch(`https://${ENDPOINT}/ocr`, {
						method: "POST",
						headers: {},
						body: fd
					});
		
					let OCR_Result: {result?: string, detail?: string} = await OCR_Response.json();
					if (OCR_Result.result) {
						setDisplay(OCR_Result.result);
						console.log(OCR_Result.result)
						let TTS_Response = await fetch(`https://${ENDPOINT}/tts`, {
							method: "POST",
							body: JSON.stringify({text: OCR_Result.result.replaceAll("\n", ",")})
						});
		
						let TTS_Result: {result?: string, detail?: string} = await TTS_Response.json();
						if (TTS_Result.result && viewRef.current.srcObject) {
							audioRef.current.src = "data:audio/mp3;base64,"+TTS_Result.result;
							// let audio = new Audio("data:audio/mp3;base64,"+TTS_Result.result)
							// let track = new AudioContext();
							// track.createMediaStreamSource()
							
							// (viewRef.current.srcObject as MediaStream).addTrack(audio.capture)


							// audioRef.current.play();
						} else {
							setDisplay(TTS_Result.detail);
						}
					}
					else
						setDisplay(OCR_Result.detail);
	
					viewRef.current.play();
				} catch (e) {
					setDisplay(e);
				}
			})
			
			// canvasRef.current.getContext('2d')?.
			// if (cv.getContext('2d')) {
			// 	cv.getContext('2d')?.drawImage(viewRef.current, 0, 0);
			// console.log(canvasRef.current.toDataURL());
			// }

		// 	let data = atob(cv.toDataURL('image/png').split(',')[1]);
		// 	let file = new Blob([new Uint8Array(Buffer.from(data, 'binary'))], {type: 'image/png'})
		}
	}
    
    return (
        <>
			<video ref={viewRef} playsInline></video>
			<canvas ref={canvasRef} style={{display:"none"}}></canvas>
        </>
    )
}

export default Camera;