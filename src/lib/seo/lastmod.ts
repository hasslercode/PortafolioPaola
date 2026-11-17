import { execFileSync } from 'node:child_process';

/** Fallback only when git history is unavailable. */
const CONTENT_EPOCH = new Date('2026-03-01T00:00:00.000Z');

/**
 * Last commit that touched any of these paths.
 * Uncommitted edits use the audit date so a dirty tree does not fall back to the epoch.
 */
export function lastModifiedFor(paths: string[]): Date {
  if (!paths.length) return CONTENT_EPOCH;

  try {
    const status = execFileSync(
      'git',
      ['status', '--porcelain', '--', ...paths],
      { encoding: 'utf8', cwd: process.cwd() },
    ).trim();
    if (status) return new Date('2026-11-17T00:00:00.000Z');

    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...paths],
      { encoding: 'utf8', cwd: process.cwd() },
    ).trim();
    if (!iso) return CONTENT_EPOCH;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? CONTENT_EPOCH : date;
  } catch {
    return CONTENT_EPOCH;
  }
}
