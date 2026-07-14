import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';

export default function Testimonials() {
  const { content } = useI18n();
  const { testimonials } = content;

  return (
    <section className="testimonials" id="testimonios" aria-labelledby="testimonials-title">
      <div className="container">
        <FadeUp as="header" className="testimonials__header" index={0}>
          <span className="testimonials__badge" aria-hidden="true">{testimonials.badge}</span>
          <h2 id="testimonials-title" className="testimonials__title">
            <span>{testimonials.titleBefore}</span>{' '}
            <span className="testimonials__script">{testimonials.titleScript}</span>
          </h2>
        </FadeUp>

        <div className="testimonials__grid">
          {testimonials.items.map((item, index) => (
            <FadeUp key={item.name} as="blockquote" className="testimonials__card" index={index + 1}>
              <span className="testimonials__quote-mark" aria-hidden="true">"</span>
              <p className="testimonials__text">{item.quote}</p>
              <footer className="testimonials__footer">
                <cite className="testimonials__author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </cite>
                <p className="testimonials__result">
                  <span className="testimonials__result-label">{testimonials.resultLabel}</span>
                  <span className="testimonials__result-value">{item.result}</span>
                </p>
              </footer>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
