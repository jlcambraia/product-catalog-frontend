import styles from './LinksPopup.module.css';
import { PopupLinksProps } from '@/types/types';
import { useCallback, useEffect, MouseEvent, useState } from 'react';

const LinksPopup = ({ setPopupLinks }: PopupLinksProps) => {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const handleClosePopup = useCallback((): void => {
		setPopupLinks(false);
	}, [setPopupLinks]);

	useEffect(() => {
		const handleEscClose = (evt: KeyboardEvent): void => {
			const target = document.activeElement as HTMLElement;

			if (evt.key === 'Escape') {
				target.blur();
				handleClosePopup();
			}
		};

		document.addEventListener('keydown', handleEscClose);
		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [handleClosePopup]);

	const handleOverlayClick = (evt: MouseEvent<HTMLElement>): void => {
		const target = evt.target as HTMLElement;

		if ((target as HTMLElement).dataset.popup !== undefined) {
			handleClosePopup();
		}
	};

	const links = ['https://seusite.com/abc123', 'https://seusite.com/outro'];

	const copyText = async (text: string, index: number) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000); // Volta para 📋 após 2s
		} catch (err) {
			console.error('Erro ao copiar:', err);
		}
	};

	return (
		<div className={styles.popup} onClick={handleOverlayClick} data-popup>
			<div className={styles.container}>
				<button className={styles.button} onClick={handleClosePopup} />
				<h2 className={styles.title}>Copie um link para criar seu produto!</h2>

				{links.map((link, index) => (
					<div key={index} className={styles.linkWrapper}>
						<p className={styles.linkText}>{link}</p>
						<button
							className={styles.copyButton}
							onClick={() => copyText(link, index)}
						>
							{copiedIndex === index ? '✅' : '📋'}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default LinksPopup;
