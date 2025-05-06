import { motion } from 'framer-motion';
import styles from './first-section.module.scss';
import { useEffect, useState } from 'react';
import firstBanner from '@/assets/banners/first-banner.png';
import secondBanner from '@/assets/banners/second-banner.png';
import logo from '@/assets/logo/logo-wout-text.png';

const banners = [firstBanner, secondBanner];

export default function FirstSection() {
	const [bannerIndex, setBannerIndex] = useState(0);

	useEffect(() => {
		console.log(bannerIndex, bannerIndex >= banners.length - 1);
		setTimeout(() => {
			if (bannerIndex >= banners.length - 1) setBannerIndex(0);
			else setBannerIndex(p => p + 1);
		}, 4000);
	}, [bannerIndex]);

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Ваш праздник достоин лучшего, и мы воплотим это в реальность.</h1>
			<div className={styles.logo}>
				<img src={logo} alt='' className={styles.logo_image} />
			</div>

			<div className={styles.banner}>
				{banners.map((banner, i) => (
					<motion.img
						key={i}
						src={banner}
						className={styles.banner_image}
						initial={{ opacity: 0 }} // , transform: 'translate(100px)'
						animate={{ opacity: bannerIndex === i ? 1 : 0 }} // bannerIndex === i ? 'translate(0)' : 'translate(-100px)' // , transform: 'translate(0)'
						exit={{ opacity: 0 }} // , transform: `translate(-100px)`
						transition={{ duration: '0.4' }}
					/>
				))}
			</div>
		</section>
	);
}
