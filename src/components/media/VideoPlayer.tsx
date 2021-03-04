import React, { Component } from 'react';
import Hls from 'hls.js';

interface Props {
    source: string;
}

export default class VideoPlayer extends Component<Props>{
    constructor(props: Props) {
        super(props)
    }

    private player = React.createRef<HTMLVideoElement>();
    
    initPlayer() {
        const video = this.player.current;
        if (video) {
            const hls = new Hls();
            const url = this.props.source;
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });
        }
        
    }

    componentDidMount() {
        if (this.props.source){
            this.initPlayer();
        }
    }

    render() {
        return (
            <video style={{ maxWidth: '100%' }}
              className="videoCanvas"
              ref={this.player}
              autoPlay={true}
              muted={true}
            />
      );
    }
}