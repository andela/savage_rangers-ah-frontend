import { renderHook, act } from '@testing-library/react-hooks';
import useEdit from '../Components/Comment/useEdit';

test('should toggle the edit button and render a textarea or a paragraph', () => {
    const { result } = renderHook(() => useEdit());

    act(() => {
        result.current.edit();
    });

    expect(result.current.isEditable).toBe(true);
});
