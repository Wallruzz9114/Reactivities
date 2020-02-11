import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface IProps {
	inverted?: boolean;
	content?: string;
}

const LoadingIndicator: React.FC<IProps> = ({
	inverted = true,
	content
}: IProps) => {
	return (
		<Dimmer active={true} inverted={inverted}>
			<Loader content={content} />
		</Dimmer>
	);
};

export default LoadingIndicator;
