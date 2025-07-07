import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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

type ArticleParamsFormProps = {
	setArticleState: (param: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [menuState, setMenuState] = useState<ArticleStateType>(defaultArticleState);

	const handleChangeParam = (key: keyof ArticleStateType, value: OptionType) => {
		setMenuState({ ...articleState, [key]: value });
	};

	const handleToggleMenu = () => {
		setIsOpen((IsOpen) => !IsOpen);
	};

	const handleApply = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(menuState);
	};

	const handleReset = () => {
		setMenuState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={handleToggleMenu}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}
				style={{ display: isOpen ? 'block' : 'none' }}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}
					>
					<Text size={31} uppercase weight={800}>Задайте параметры</Text>
					<Select
						options={fontFamilyOptions}
						selected={menuState.fontFamilyOption}
						title='Шрифт'
						onChange={(option)=>handleChangeParam('fontFamilyOption', option)}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={menuState.fontFamilyOption}
						title='Размер шрифта'
						name='fontSize'
						onChange={(option)=>handleChangeParam('fontFamilyOption', option)}
					/>
					<Select
						options={fontColors}
						selected={menuState.fontColor}
						title='Цвет шрифта'
						onChange={(option)=>handleChangeParam('fontColor', option)}
					/>
					<Select
						options={backgroundColors}
						selected={menuState.backgroundColor}
						title='Цвет фона'
						onChange={(option)=>handleChangeParam('backgroundColor', option)}
					/>
					<Select
						options={contentWidthArr}
						selected={menuState.contentWidth}
						title='Ширина контена'
						onChange={(option)=>handleChangeParam('contentWidth', option)}
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
