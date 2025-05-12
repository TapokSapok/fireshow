import { Toaster } from 'react-hot-toast';
import HomePage from '../components/pages/home-page/home-page';

export default function App() {
	return (
		<HomePage>
			<Toaster
				position='bottom-right'
				toastOptions={{
					style: { borderRadius: '4px', fontSize: '1.2rem' },
				}}
			/>
		</HomePage>
	);
}
