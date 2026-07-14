import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';

const STEP_ICONS = [
  'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-3.3l-.85-.6C7.8 11.02 7 9.89 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .89-.8 2.02-2.15 3.10z',
  'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
];

export default function Process() {
  const { content } = useI18n();
  const { process } = content;

  return (
    <section className="process" id="portafolio">
      <div className="container process-layout">
        <div className="process-left">
          <div className="process-title-block">
            <span className="badge-pill" aria-hidden="true">{process.badge}</span>
            <div className="process-orbit-wrap">
              <div className="process-ellipse process-ellipse--1" aria-hidden="true" />
              <div className="process-ellipse process-ellipse--2" aria-hidden="true" />
              <h2>
                <span>{process.titleBefore}</span>{' '}
                <span className="wow-title-script">{process.titleScript}</span>
              </h2>
            </div>
          </div>
          <div className="steps-container">
            {process.steps.map((step, index) => (
              <FadeUp key={step.title} className={`step-card step-card--${index + 1}`} index={index}>
                <div className="step-meta">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d={STEP_ICONS[index]} /></svg>
                  </span>
                </div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <span className="step-title-bar" aria-hidden="true" />
                  <p>
                    <span>{step.descriptionBefore}</span>{' '}
                    <span className="step-highlight">{step.descriptionAccent}</span>
                    {step.descriptionAfter ? (
                      <>
                        {' '}
                        <span>{step.descriptionAfter}</span>
                      </>
                    ) : null}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        <div className="process-right">
          <blockquote className="process-quote">
            <span className="process-quote-scrap process-quote-scrap--tape" aria-hidden="true" />
            <p>
              &ldquo;
              <span>{process.quoteBefore}</span>{' '}
              <span className="process-quote-circle">{process.quoteAccent}</span>{' '}
              <span>{process.quoteAfter}</span>
              &rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
