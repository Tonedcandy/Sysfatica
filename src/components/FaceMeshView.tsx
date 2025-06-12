import { useEffect, useRef, useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
    DrawingUtils,
} from "@mediapipe/tasks-vision";

/* ─── CONFIG ────────────────────────────────────────────── */
const MODEL_URL =
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const WASM_PATH = "/wasm";
const YT_VIDEO_ID = "h3pJZSTQqIg";   // replace with your own video id

interface Props { width?: number }
interface Metrics {
    blinkCount: number; blinkFreq: number; avgBlinkDur: number;
    yawnCount: number; yawnFreq: number;
    start?: string; end?: string; duration?: string;
}

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function FaceMeshView({ }: Props) {
    /* DOM refs */
    const rawVidRef = useRef<HTMLVideoElement>(null);
    const meshVidRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    /* state */
    const [lm, setLm] = useState<FaceLandmarker | null>(null);
    const [ready, setReady] = useState(false);
    const [test, setTest] = useState(false);
    const [ytKey, setKey] = useState(0);
    const [live, setLive] = useState<Metrics>({
        blinkCount: 0, blinkFreq: 0, avgBlinkDur: 0, yawnCount: 0, yawnFreq: 0
    });
    const [rec, setRec] = useState<Metrics | null>(null);

    /* counters / FSM */
    const tLive = useRef<number>(0); const tTest = useRef<number>(0);
    const blDurL = useRef<number[]>([]); const blCntL = useRef(0); const ywCntL = useRef(0);
    const blDurT = useRef<number[]>([]); const blCntT = useRef(0); const ywCntT = useRef(0);
    const blinkOn = useRef(false); const blinkT0 = useRef(0);
    const yawnOn = useRef(false); const yawnT0 = useRef(0);

    /* EAR helper */
    const dist = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);
    const EAR = (lm: any, i: number[]) => {
        const [p1, p2, p3, p4, p5, p6] = i.map(idx => lm[idx]);
        return (dist(p2, p6) + dist(p3, p5)) / (2 * dist(p1, p4));
    };
    const LID = [33, 160, 158, 133, 153, 144];
    const RID = [362, 385, 387, 263, 373, 380];

    /* ── bootstrap camera & model ── */
    useEffect(() => {
        (async () => {
            const resolver = await FilesetResolver.forVisionTasks(WASM_PATH);
            setLm(await FaceLandmarker.createFromOptions(resolver, {
                baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
                runningMode: "VIDEO", numFaces: 1, outputFaceBlendshapes: true,
            }));

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            [rawVidRef.current, meshVidRef.current].forEach(v => v && (v.srcObject = stream));

            rawVidRef.current!.onloadedmetadata = async () => {
                await rawVidRef.current!.play();
                await meshVidRef.current!.play();
                tLive.current = performance.now();
                setReady(true);
            };
        })();
    }, []);

    /* ── detection loop ── */
    useEffect(() => {
        if (!ready || !lm) return;

        const video = meshVidRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const du = new DrawingUtils(ctx);

        let raf = 0;
        const loop = () => {
            if (!video.videoWidth) { raf = requestAnimationFrame(loop); return; }

            /* sensor resolution */
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            /* compute browser scale & mirror */
            const wrap = wrapRef.current!;
            const scale = Math.min(
                wrap.clientWidth / video.videoWidth,
                wrap.clientHeight / video.videoHeight
            );
            const dx = (wrap.clientWidth - video.videoWidth * scale) / 2;
            const dy = (wrap.clientHeight - video.videoHeight * scale) / 2;

            ctx.setTransform(-scale, 0, 0, scale, wrap.clientWidth - dx, dy); // mirror once

            ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
            const now = performance.now();
            const res = lm.detectForVideo(video, now);

            res.faceLandmarks.forEach(lmks =>
                du.drawConnectors(
                    lmks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: "#00e676", lineWidth: 1 }
                )
            );

            /* flags */
            let eyes = false, jaw = false;
            if (res.faceBlendshapes.length) {
                const cat = res.faceBlendshapes[0].categories;
                eyes = ((cat.find(x => x.categoryName === "eyeBlinkLeft")?.score ?? 0) +
                    (cat.find(x => x.categoryName === "eyeBlinkRight")?.score ?? 0)) / 2 > 0.4;
                jaw = (cat.find(x => x.categoryName === "jawOpen")?.score ?? 0) > 0.6;
            } else if (res.faceLandmarks.length) {
                const l = res.faceLandmarks[0];
                eyes = (EAR(l, LID) + EAR(l, RID)) / 2 < 0.28;
            }

            /* blink FSM */
            if (eyes && !blinkOn.current) { blinkOn.current = true; blinkT0.current = now; }
            if (!eyes && blinkOn.current) {
                blinkOn.current = false;
                const dur = now - blinkT0.current;
                blDurL.current.push(dur); blCntL.current++;
                if (test) { blDurT.current.push(dur); blCntT.current++; }
            }

            /* yawn FSM */
            if (jaw && !yawnOn.current) { yawnOn.current = true; yawnT0.current = now; }
            if (!jaw && yawnOn.current) {
                yawnOn.current = false;
                if (now - yawnT0.current >= 400) {
                    ywCntL.current++; if (test) ywCntT.current++;
                }
            }

            /* live metrics */
            const min = (now - tLive.current) / 60000;
            setLive({
                blinkCount: blCntL.current,
                blinkFreq: blCntL.current / min,
                avgBlinkDur: blDurL.current.reduce((a, b) => a + b, 0) / (blDurL.current.length || 1),
                yawnCount: ywCntL.current,
                yawnFreq: ywCntL.current / min,
            });

            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [ready, lm, test]);

    /* ── start/stop test ── */
    const toggleTest = () => {
        if (!ready) return;
        if (!test) {
            tTest.current = performance.now();
            blDurT.current = []; blCntT.current = 0; ywCntT.current = 0;
            setRec(null); setTest(true); setKey(k => k + 1);
        } else {
            const now = performance.now();
            const min = (now - tTest.current) / 60000;
            const avg = blDurT.current.reduce((a, b) => a + b, 0) / (blDurT.current.length || 1);
            const fmt = (t: number) => new Date(t).toLocaleTimeString([],
                { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
            setRec({
                blinkCount: blCntT.current,
                blinkFreq: blCntT.current / min,
                avgBlinkDur: avg,
                yawnCount: ywCntT.current,
                yawnFreq: ywCntT.current / min,
                start: fmt(tTest.current),
                end: fmt(now),
                duration: new Date(now - tTest.current).toISOString().substring(14, 19),
            });
            setTest(false); setKey(k => k + 1);
        }
    };

    const ytSrc =
        `https://www.youtube.com/embed/${YT_VIDEO_ID}` +
        `?autoplay=${test ? 1 : 0}${test ? "" : "&mute=1"}&playsinline=1`;

    /* ── JSX ── */
    return (
        <div className="min-h-screen p-6 space-y-6 bg-black">
            <div className="grid gap-6 md:grid-cols-[3fr_1fr]">

                {/* left column */}
                <div className="space-y-6">
                    <iframe
                        key={ytKey}
                        src={ytSrc}
                        title="Test Video"
                        className="w-full aspect-video rounded-lg shadow-md"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                    <button
                        onClick={toggleTest}
                        disabled={!ready}
                        className="w-full md:w-auto mx-auto px-6 py-3 rounded bg-white text-black font-medium shadow-md"
                    >
                        {test ? "Stop Test" : "Start Test"}
                    </button>
                </div>

                {/* right column */}
                <div className="space-y-6">
                    {/* RAW FEED */}
                    <div className="relative aspect-video rounded-lg shadow-md overflow-hidden">
                        <video
                            ref={rawVidRef}
                            className="absolute inset-0 w-full h-full object-contain transform scale-x-[-1]"
                            muted
                            playsInline
                        />
                        <span className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                            RAW FEED
                        </span>
                    </div>

                    {/* FACEMESH FEED */}
                    <div
                        ref={wrapRef}
                        className="relative aspect-video rounded-lg shadow-md overflow-hidden"
                    >
                        <video
                            ref={meshVidRef}
                            className="absolute inset-0 w-full h-full object-contain transform scale-x-[-1]"
                            muted
                            playsInline
                        />
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0"
                        />
                        <span className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                            FACEMESH
                        </span>
                    </div>

                    {/* live metrics */}
                    <div className="rounded-lg bg-white p-4 text-sm leading-6">
                        <h4 className="font-semibold mb-1">Live Metrics</h4>
                        Blinks: {live.blinkCount} · Blink Freq: {live.blinkFreq.toFixed(2)}/min ·
                        BLink Avg: {live.avgBlinkDur.toFixed(0)} ms<br />
                        Yawns: {live.yawnCount} · Yawn Freq: {live.yawnFreq.toFixed(2)}/min
                    </div>

                    {/* recorded metrics */}
                    {rec && (
                        <div className="rounded-lg bg-white p-4 text-sm leading-6">
                            <h4 className="font-semibold mb-1">
                                Recorded Metrics ({rec.start} – {rec.end}, {rec.duration})
                                <br />
                            </h4>
                            Blinks: {rec.blinkCount} · Blink Freq: {rec.blinkFreq.toFixed(2)}/min ·
                            BLink Avg: {rec.avgBlinkDur.toFixed(0)} ms<br />
                            Yawns: {rec.yawnCount} · Yawn Freq: {rec.yawnFreq.toFixed(2)}/min
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}