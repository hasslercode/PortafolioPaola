import { useFadeUp } from '../hooks/useFadeUp.js';

export default function FadeUp({ children, className = '', index = 0, as: Tag = 'div', ...rest }) {
  const ref = useFadeUp(index);

  return (
    <Tag ref={ref} className={`fade-up ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
