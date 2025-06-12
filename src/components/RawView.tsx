import Webcam from "react-webcam";
export default function RawView() {
    return (
        <div>
            <h2>Raw feed (no ML)</h2>
            <Webcam
                mirrored
                className="rounded-lg shadow-md"
                videoConstraints={{ width: 640, height: 480 }}
            />
        </div>
    );
}