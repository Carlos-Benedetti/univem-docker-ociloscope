export class UserMedia {
    onAudio: (stream: MediaStream) => void
    stream: MediaStream
    audioDeviceOptions: MediaDeviceInfo[] = [];
    audioDevice: MediaDeviceInfo

    constructor() {
        this.getDevices().then(dvcs=>this.gotDevices(dvcs))
    }

    private gotDevices(deviceInfos: MediaDeviceInfo[]) {
        this.audioDeviceOptions = deviceInfos.filter(i => i.kind === 'audioinput')
    }

    private async gotStream(stream: MediaStream) {
        this.stream = stream;
        return this.stream
    }

    public getDevices() {
        const x = navigator.mediaDevices.getSupportedConstraints()
        return navigator.mediaDevices.enumerateDevices();
    }

    public getStream() {
        if(!this.audioDevice) throw new Error("AudioDevice not selected");

        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const constraints: MediaStreamConstraints = {
            audio: { deviceId: this.audioDevice.deviceId ? { exact: this.audioDevice.deviceId } : undefined },
        };
        return navigator.mediaDevices.getUserMedia(constraints).then((stream) => this.gotStream(stream))
    }

    private handleError(error) {
        console.error('Error: ', error);
    }
}
