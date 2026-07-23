/**
 * Lightweight markdown → HTML for MDX body sections (SSG-safe).
 * Supports headings (with ids), paragraphs, lists, bold/italic, links, GFM tables.
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

function isTableSeparator(line: string) {
  const trimmed = line.trim();
  if (!trimmed.includes('-')) return false;
  // |---|:---|---:| or ---|--- without outer pipes
  return /^\|?[\s:|-]+\|[\s:|-]*\|?$/.test(trimmed) && /-+/.test(trimmed);
}

function isTableRow(line: string) {
  const trimmed = line.trim();
  if (!trimmed.includes('|')) return false;
  if (isTableSeparator(trimmed)) return false;
  const cells = splitTableCells(trimmed);
  return cells.length >= 2;
}

function splitTableCells(line: string) {
  let trimmed = line.trim();
  if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
  if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
  return trimmed.split('|').map((cell) => cell.trim());
}

function renderTable(header: string[], rows: string[][], inline: (text: string) => string) {
  const thead = `<thead><tr>${header.map((cell) => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((row) => {
      const cells = header.map((_, i) => row[i] ?? '');
      return `<tr>${cells.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`;
    })
    .join('')}</tbody>`;
  return `<div class="prose-seo__table-wrap"><table class="prose-seo__table">${thead}${tbody}</table></div>`;
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

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    // GFM table: header + separator + body rows
    if (
      isTableRow(trimmed) &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1].trim())
    ) {
      closeList();
      const header = splitTableCells(trimmed);
      i += 2; // skip separator
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(splitTableCells(lines[i].trim()));
        i += 1;
      }
      i -= 1; // outer loop will advance
      html.push(renderTable(header, rows, inline));
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
