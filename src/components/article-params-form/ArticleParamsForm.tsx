import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { useClose } from 'src/ui/select/hooks/useClose';

type ArticleParamsFormProps = {
	setArticleState: (param: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLElement>(null);
	const [menuState, setMenuState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChangeParam = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setMenuState({ ...articleState, [key]: value });
	};

	const handleToggleMenu = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const handleApply = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(menuState);
	};

	const handleReset = () => {
		setMenuState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggleMenu} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={menuState.fontFamilyOption}
						title='Шрифт'
						onChange={(option) => handleChangeParam('fontFamilyOption', option)}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={menuState.fontFamilyOption}
						title='Размер шрифта'
						name='fontSize'
						onChange={(option) => handleChangeParam('fontFamilyOption', option)}
					/>
					<Select
						options={fontColors}
						selected={menuState.fontColor}
						title='Цвет шрифта'
						onChange={(option) => handleChangeParam('fontColor', option)}
					/>
					<Select
						options={backgroundColors}
						selected={menuState.backgroundColor}
						title='Цвет фона'
						onChange={(option) => handleChangeParam('backgroundColor', option)}
					/>
					<Select
						options={contentWidthArr}
						selected={menuState.contentWidth}
						title='Ширина контена'
						onChange={(option) => handleChangeParam('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
