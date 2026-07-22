'use client';

import FadeUp from '@/features/home/components/FadeUp';
import { useI18n } from '@/features/home/HomeContentProvider';

const STEP_ICONS = [
  'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm0 14H4V8h16v10z',
  'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
];

export default function WorkProcess() {
  const { content, locale } = useI18n();
  const process = content.workProcess;
  const isEn = locale === 'en';

  if (!process?.steps?.length) return null;

  return (
    <section className="work-process" id="proceso" aria-labelledby="work-process-title">
      <div className="container">
        <div className="work-process__header">
          <h2 id="work-process-title" className="wow-main-title">
            <span>{process.titleBefore}</span>{' '}
            <span className="wow-title-script">{process.titleScript}</span>
          </h2>
        </div>

        <ol className="work-process__rail">
          {process.steps.map((step, index) => (
            <FadeUp
              key={step.title}
              as="li"
              className="work-process__step"
              index={index}
            >
              <span className="work-process__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="work-process__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={STEP_ICONS[index] || STEP_ICONS[0]} />
                </svg>
              </div>
              <h3 className="work-process__title">{step.title}</h3>
              <p className="work-process__body">{step.description}</p>
              {index < process.steps.length - 1 ? (
                <span className="work-process__connector" aria-hidden="true" />
              ) : null}
            </FadeUp>
          ))}
        </ol>
        <p className="sr-only">
          {isEn ? 'Four-step collaboration process.' : 'Proceso de trabajo en cuatro pasos.'}
        </p>
      </div>
    </section>
  );
}
