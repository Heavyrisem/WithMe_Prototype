import React, { useEffect, useState, useRef } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import '../style/Main.css';
import Camera from './Camera';

const ENDPOINT = 'withme.heavyrisem.xyz';

function Main() {
	const [Display, setDisplay] = useState<string>();
	const audioRef = useRef<HTMLAudioElement>(null);

	// const [audioStream, setaudioStream] = useState<MediaStreamTrack>(new MediaStreamTrack());
	const [isRecodingAudio, setisRecodingAudio] = useState<boolean>(false);
	// const {
	//   status,
	//   startRecording,
	//   stopRecording,
	//   mediaBlobUrl,
	// } = useReactMediaRecorder({ audio: {sampleRate: 1} });



	// useEffect(() => {
	// 	(async() => {
	// 		if (mediaBlobUrl) {
	// 			console.log(mediaBlobUrl);
	// 			let blob = await fetch(mediaBlobUrl).then(r => r.blob());
	// 			console.log(blob)
	// 			let reader = new FileReader();
	// 			reader.readAsDataURL(blob);
	// 			reader.onload = () => {
	// 				let base64data = reader.result;
	// 				console.log(base64data);
	// 			}
	// 		}
	// 	})();
	// }, [mediaBlobUrl])


	// async function MicRec() {
	// 	if (isRecodingAudio) {
	// 		stopRecording();
	// 		setisRecodingAudio(false);
	// 		console.log(status, "Rec stop");
	// 		// if (audioRef.current && mediaBlobUrl) audioRef.current.src=mediaBlobUrl;
	// 	} else {
	// 		startRecording();
	// 		setisRecodingAudio(true);
	// 		console.log(status, "Rec start");
	// 	}
	// 	// let constraints = { audio: true, video: false };
		
	// 	// if (!navigator.mediaDevices) return;
	// 	// navigator.mediaDevices.getUserMedia(constraints).then(media => {
	// 	// 	let chunks = [];

	// 	// 	const recoder = new window.MediaRecorder(media);
	// 	// 	recoder.
	// 	// }).catch(e => {
	// 	// 	console.log(e);
	// 	// 	alert("Err" + e);
	// 	// })
	// }

	return (
		<div className="Comp">
			<Camera  />

			<div className="Bottom">

				<div className="row">
					<span className="TextResult">
						{Display}
						{/* {status} */}
						<br />
						<audio playsInline controls autoPlay ref={audioRef} />
					</span>
				</div>

				<div className="row">
					<div className="Shutter" onClick={Capture}>
						<div className="ShutterBall"></div>
					</div>
      				{/* <button onClick={MicRec}>Recording</button> */}
				</div>


			</div>

		</div>
	);
}


export default Main;