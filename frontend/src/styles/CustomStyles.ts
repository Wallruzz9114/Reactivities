import { CSSProperties } from 'react';

export abstract class CustomStyles {
	static readonly MAIN_CONTAINER_STYLE: CSSProperties = {
		marginTop: '7em'
	};

	static readonly MARGIN_BOTTOM: CSSProperties = {
		marginBottom: 12
	};

	static readonly NO_PADDING: CSSProperties = {
		padding: '0'
	};

	static readonly COLOR_WHITE: CSSProperties = {
		color: 'white'
	};

	static readonly COLOR_ORANGE: CSSProperties = {
		color: 'white'
	};

	static readonly ACTIVITY_ITEM_IMAGE_STYLE: CSSProperties = {
		filter: 'brightness(30%)'
	};

	static readonly ACTIVITY_ITEM_IMAGE_TEXT_STYLE: CSSProperties = {
		position: 'absolute',
		bottom: '5%',
		left: '5%',
		width: '100%',
		height: 'auto',
		color: 'white'
	};

	static readonly POSITION_RELATIVE: CSSProperties = {
		position: 'relative'
	};

	static readonly BORDER_NONE: CSSProperties = {
		border: 'none'
	};

	static readonly POSITION_ABSOLUTE: CSSProperties = {
		position: 'absolute'
	};
}
