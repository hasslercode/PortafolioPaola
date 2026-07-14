'use client';

import type { ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useContentActions } from '@/features/home/PageChrome';

type Fact = { label: string; value: string };

type CaseStudyBoardProps = {
  badge: string;
  brand: string;
  summaryTitle: string;
  shortAnswer: string;
  shortAnswerLabel: string;
  metricsTitle: string;
  metrics: Fact[];
  story: Array<{ title: string; body: string }>;
  processTitle: string;
  process: string[];
  resultsTitle: string;
  results: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
  visuals: StaticImageData[];
  author: ReactNode;
};

export function CaseStudyBoard({
  badge,
  brand,
  summaryTitle,
  shortAnswer,
  shortAnswerLabel,
  metricsTitle,
  metrics,
  story,
  processTitle,
  process,
  resultsTitle,
  results,
  faqTitle,
  faqs,
  ctaLabel,
  visuals,
  author,
}: CaseStudyBoardProps) {
  const { content } = useI18n();
  const { openContact } = useContentActions();

  return (
    <article className="case-board">
      <div className="container case-board__inner">
        <span className="case-board__scrap case-board__scrap--heart scrap-heart-shape" aria-hidden="true" />
        <span className="case-board__scrap case-board__scrap--sparkle" aria-hidden="true">
          ✦
        </span>
        <span className="case-board__scrap case-board__scrap--tape" aria-hidden="true" />

        <header className="case-board__hero">
          <div className="case-board__intro">
            <span className="case-board__badge">{badge}</span>
            <h1 className="case-board__title">{brand}</h1>
            <p className="case-board__kicker">{summaryTitle}</p>
            <p className="case-board__lede">
              <span className="case-board__lede-label">{shortAnswerLabel}</span>
              {shortAnswer}
            </p>
          </div>

          <div className="case-board__visual" aria-hidden="true">
            {visuals.map((src, index) => (
              <div
                key={src.src}
                className={`case-board__visual-card case-board__visual-card--${index + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  width={220}
                  height={280}
                  className="case-board__visual-img"
                />
              </div>
            ))}
          </div>
        </header>

        <section className="case-board__metrics" aria-label={metricsTitle}>
          {metrics.map((fact) => (
            <div key={fact.label} className="case-board__metric">
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </section>

        <section className="case-board__story">
          {story.map((block) => (
            <div key={block.title} className="case-board__card">
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </div>
          ))}
        </section>

        <section className="case-board__mid">
          <div className="case-board__card case-board__card--process">
            <h2>{processTitle}</h2>
            <ol className="case-board__chips">
              {process.map((step, index) => (
                <li key={step}>
                  <span className="case-board__chip-num">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="case-board__card case-board__card--results">
            <h2>{resultsTitle}</h2>
            <ul className="case-board__result-list">
              {results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </div>
        </section>

        {faqs.length > 0 ? (
          <section className="case-board__faq" aria-labelledby="case-faq-heading">
            <h2 id="case-faq-heading">{faqTitle}</h2>
            <div className="case-board__faq-list">
              {faqs.map((item) => (
                <details key={item.question} className="case-board__faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="case-board__footer">
          <div className="case-board__author">{author}</div>
          <button
            type="button"
            className="btn-pill btn-wow-action"
            onClick={() => openContact('case_cta')}
          >
            <span>{ctaLabel || content.header.cta}</span>
            <span className="btn-wow-action__sparkle" aria-hidden="true">
              ✦
            </span>
          </button>
        </footer>
      </div>
    </article>
  );
}
