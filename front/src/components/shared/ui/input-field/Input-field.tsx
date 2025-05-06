import styles from './input-field.module.scss';

interface IProps {
	id: string;
	type?: 'text' | 'password';
	value: string;
	onChange: (value: string) => void;
	label: string;
	required: boolean;
	placeholder?: string;
}

export default function InputField({ value, onChange, placeholder, id, label, required, type = 'text' }: IProps) {
	return (
		<div className={styles.field}>
			<label htmlFor={id} data-required={required}>
				{label}
			</label>
			<input type={type} id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
		</div>
	);
}
