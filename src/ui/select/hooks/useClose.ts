import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
	onChange: (newValue: boolean) => void;
};

export function useClose({ isOpen, onClose, rootRef, onChange }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return;
		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				// onClose();
				isOpen && onClose?.();
				onChange?.(false);
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]);
}
