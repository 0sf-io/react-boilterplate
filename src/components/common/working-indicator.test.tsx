import {render} from '@testing-library/react';
import {WorkingIndicator} from 'components/common/working-indicator';

describe('<WorkingIndicator />', () => {
    it('should render a spinning wheel', () => {
        const {container} = render(<WorkingIndicator />);
        expect(container.querySelector('svg')).not.toBeNull();
        expect(container.querySelector('svg')).toHaveClass('animate-spin');
    });
});
