import styles from './WarningPopup.module.css';
import { useCallback, useEffect, MouseEvent } from 'react';
import { PopupWarningProps } from '@/types/types';

const WarningPopup = ({ setPopupWarning }: PopupWarningProps) => {
	const handleClosePopup = useCallback((): void => {
		setPopupWarning(false);
	}, [setPopupWarning]);

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
	return (
		<>
			<div className={styles.popup} onClick={handleOverlayClick} data-popup>
				<div className={styles.container}>
					<button className={styles.button} onClick={handleClosePopup} />
					<p className={styles.text}>
						A API responsável por Registro, Login e Salvamento de Artigos está
						hospedada em um servidor gratuito que{' '}
						<span className={styles.textBold}>
							pode entrar em hibernação após um período de inatividade.
						</span>
						<span className={styles.textParagraph}>
							Por isso, o tempo de resposta na{' '}
							<span className='warning-popup__font-weight_bold'>
								primeira utilização
							</span>{' '}
							(como durante o registro) pode ser mais lento. Após esse primeiro
							acesso, a API volta a responder normalmente.
						</span>
						<span className={styles.textParagraph}>
							Já a API utilizada para{' '}
							<span className={styles.textBold}>busca de artigos</span> é
							fornecida por terceiros e permanece ativa continuamente,
							garantindo respostas rápidas desde o início.
						</span>{' '}
						<span className={styles.textParagraph}>
							Agradeço a todos pela compreensão.
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default WarningPopup;
