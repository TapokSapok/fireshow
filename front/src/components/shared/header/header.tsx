import styles from './header.module.scss';
// import logoImg from '@/assets/logo/logo-wout-text.png';

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				{/* <img src={logoImg} className={styles.logo_image} /> */}
				<span className={styles.title}>RESONANCE SHOW</span>
			</div>
		</header>
	);
}
