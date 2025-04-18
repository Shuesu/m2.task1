import React, { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение:');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setError('');
			setValue(promptValue);
		}
	};

	const formatDateTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString('ru-RU');
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			const newItem = {
				id: Date.now(),
				value: value,
				timestamp: Date.now(),
			};
			setList((prev) => [...prev, newItem]);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? (
					<ul>
						{list.map((item) => (
							<li key={item.id}>
								{item.value} — <span>{formatDateTime(item.timestamp)}</span>
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
