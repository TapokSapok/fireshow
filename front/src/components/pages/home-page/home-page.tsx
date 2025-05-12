import { PropsWithChildren } from 'react';
import Header from '../../shared/header/header';
import FirstSection from '../../shared/sections/first-section/first-section';
import SecondSection from '../../shared/sections/second-section/second-section';

export default function HomePage({ children }: PropsWithChildren) {
	return (
		<main>
			<Header />
			<FirstSection />
			<SecondSection />
			{children}
		</main>
	);
}
