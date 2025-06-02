import ReactPlayer from 'react-player';

interface IProps {
	videoUrl: string;
	preloadUrl: string;
}

export default function VideoPlayer({ preloadUrl, videoUrl }: IProps) {
	return (
		<ReactPlayer
			url={videoUrl}
			controls //
			width='100%'
			height='100%'
			config={{ file: { attributes: { preload: 'metadata' } } }}
			light={preloadUrl}
			playing={true}
		/>
	);
}
