import { useState } from 'react';
import styles from './second-section.module.scss';
import ShowCard from './show-card/show-card';
import { showCards } from '../../../../data/show-cards';
import FormModal from '../../modals/form-modal/form-modal';

export default function SecondSection() {
	const [showIndex, setShowIndex] = useState<number>(1);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<section className={styles.section}>
			<ShowCard card={showCards[showIndex]} setShowIndex={setShowIndex} showIndex={showIndex} openFormModal={() => setModalIsOpen(true)} />
			<FormModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} showCard={showCards[showIndex]} />
		</section>
	);
}
