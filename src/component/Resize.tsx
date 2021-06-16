import react, {useRef} from 'react';

function ResizeTest() {
    const viewRef = useRef<HTMLCanvasElement>(null)

    function origin() {
        const i = document.querySelector('input');
        if (i && viewRef) {
            
        }
    }

    function resize() {

    }
    

    return (
        <div>

            <canvas ref={viewRef}></canvas>

            <input type="file" />
            <button>Origin</button>
            <button>ResizeTest</button>

        </div>
    )
}


export default ResizeTest;