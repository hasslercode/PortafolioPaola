/**
 * Lightweight markdown → HTML for MDX body sections (SSG-safe).
 * Supports headings (with ids), paragraphs, lists, bold/italic, links.
 */

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function stripInline(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1');
}

export function extractToc(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Set<string>();

  for (const line of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = line.trim();
    let level: 2 | 3 | null = null;
    let raw = '';

    if (trimmed.startsWith('### ')) {
      level = 3;
      raw = trimmed.slice(4);
    } else if (trimmed.startsWith('## ')) {
      level = 2;
      raw = trimmed.slice(3);
    } else if (trimmed.startsWith('# ')) {
      level = 2;
      raw = trimmed.slice(2);
    }

    if (!level || !raw) continue;

    const text = stripInline(raw);
    let id = slugify(text) || 'section';
    let n = 2;
    while (seen.has(id)) {
      id = `${slugify(text)}-${n}`;
      n += 1;
    }
    seen.add(id);
    headings.push({ id, text, level });
  }

  return headings;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inList: false | 'ul' | 'ol' = false;
  const seen = new Set<string>();

  const closeList = () => {
    if (inList) {
      html.push(inList === 'ol' ? '</ol>' : '</ul>');
      inList = false;
    }
  };

  const headingId = (raw: string) => {
    const text = stripInline(raw);
    let id = slugify(text) || 'section';
    let n = 2;
    while (seen.has(id)) {
      id = `${slugify(text)}-${n}`;
      n += 1;
    }
    seen.add(id);
    return id;
  };

  const inline = (text: string) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      closeList();
      const raw = trimmed.slice(4);
      html.push(`<h3 id="${headingId(raw)}">${inline(raw)}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      closeList();
      const raw = trimmed.slice(3);
      html.push(`<h2 id="${headingId(raw)}">${inline(raw)}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      closeList();
      const raw = trimmed.slice(2);
      html.push(`<h2 id="${headingId(raw)}">${inline(raw)}</h2>`);
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      if (inList !== 'ol') {
        closeList();
        html.push('<ol>');
        inList = 'ol';
      }
      html.push(`<li>${inline(trimmed.replace(/^\d+\.\s/, ''))}</li>`);
      continue;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (inList !== 'ul') {
        closeList();
        html.push('<ul>');
        inList = 'ul';
      }
      html.push(`<li>${inline(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inline(trimmed)}</p>`);
  }

  closeList();
  return html.join('\n');
}

export function MarkdownBody({ content }: { content: string }) {
  if (!content) return null;
  return (
    <div
      className="prose-seo"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
}
