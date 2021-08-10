export class AudioAnalyzer {
    audioCtx: AudioContext;
    analyser: AnalyserNode;
    dest: MediaStreamAudioDestinationNode;
    gainNode: GainNode;
    audio?: HTMLAudioElement;
    dataArray: Uint8Array;
    dataMean = 128;
    get bufferLength() {
        return this.analyser.fftSize;
    }
    activeSource?: MediaStreamAudioSourceNode

    constructor() {
        this.audioCtx = new AudioContext();

        this.analyser = this.audioCtx.createAnalyser();
        this.setffTSise()

        this.dest = this.audioCtx.createMediaStreamDestination();

        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.dest);
        // this.gainNode.connect(this.analyser);

        this.dataArray = new Uint8Array(this.bufferLength);
    }

    analyzeStream(mediaStream: MediaStream) {
        if (this.activeSource) {
            this.activeSource.disconnect(this.gainNode)
            this.activeSource.disconnect(this.analyser)
        }
        this.activeSource = this.audioCtx.createMediaStreamSource(mediaStream);
        this.activeSource.connect(this.gainNode);
        this.activeSource.connect(this.analyser);
    }

    getAudioPlayback() {
        this.audio = new Audio()
        this.audio.srcObject = this.dest.stream
        return this.audio
    }

    setffTSise(fftSize = 16384) {
        this.analyser.fftSize = fftSize;
    }

    applySettings(settings: MediaTrackConstraints) {
        this.dest.stream.getAudioTracks()[0].applyConstraints(settings)
    }
}
