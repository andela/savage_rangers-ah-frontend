import { renderHook, act } from '@testing-library/react-hooks';
import useReply from '../Components/Comment/useReply';

test('should toggle the reply to view or hide', () => {
  const { result } = renderHook(() => useReply());

  act(() => {
    result.current.toggle();
  });

  expect(result.current.isHidden).toBe(true);
});
