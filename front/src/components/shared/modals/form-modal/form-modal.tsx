import { FormEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IShowCard } from '../../../../data/show-cards';
import styles from './form-modal.module.scss';
import InputField from '../../ui/input-field/Input-field';
import closeSvg from '@/assets/svg/close.svg';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	showCard: IShowCard;
}

export default function FormModal({ isOpen, onClose, showCard }: IProps) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [patronymic, setPatronymic] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [choise, setChoise] = useState('phone');

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleKeyup(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}

		function handleMousedown(e: MouseEvent) {
			if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
				onClose();
			}
		}

		document.addEventListener('keyup', handleKeyup);
		document.addEventListener('mousedown', handleMousedown);

		return () => {
			document.removeEventListener('keyup', handleKeyup);
			document.removeEventListener('mousedown', handleMousedown);
		};
	}, [onClose]);

	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
	}, [isOpen]);

	function handleSubmit(e: FormEvent) {
		if (e) e.preventDefault();
	}

	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className={styles.modal}>
			<div className={styles.modal_block} ref={modalRef}>
				<div className={styles.header}>
					<h1 className={styles.title}>{showCard.title}</h1>
					<button className={styles.close_button} onClick={() => onClose()}>
						<img src={closeSvg} className={styles.close_image} />
					</button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.inputs}>
						<InputField id='имя' label='Имя' required={true} value={name} onChange={setName} />
						<InputField id='фамилия' label='Фамилия' required={false} value={surname} onChange={setSurname} />
						<InputField id='отчество' label='Отчество' required={false} value={patronymic} onChange={setPatronymic} />
						{choise === 'phone' ? (
							<InputField id='телефон' label='Номер телефона' required={true} value={phoneNumber} onChange={setPhoneNumber} />
						) : (
							<InputField id='почта' label='Почта' required={true} value={email} onChange={setEmail} />
						)}
						<div className={styles.choise} onClick={() => setChoise(choise === 'phone' ? 'email' : 'phone')}>
							Сменить на {choise === 'phone' ? 'почту' : 'номер телефона'}
						</div>
					</div>
					<button className={styles.send_button} type='submit'>
						Отправить
					</button>
				</form>
			</div>
		</div>,
		document.body
	);
}
