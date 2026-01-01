import { execSync, spawnSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = resolve(__dirname, '..');
const readmePath = resolve(repoRoot, 'README.md');

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { dates: [], start: null, end: null };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--dates' || arg === '-d') {
      result.dates = args[++i]?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
    } else if (arg === '--start') {
      result.start = args[++i];
    } else if (arg === '--end') {
      result.end = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      printUsageAndExit(0);
    } else {
      console.error(`Unknown argument: ${arg}`);
      printUsageAndExit(1);
    }
  }

  if (!result.dates.length && (!result.start || !result.end)) {
    console.error('You must provide either --dates or both --start and --end.');
    printUsageAndExit(1);
  }

  return result;
}

function printUsageAndExit(code) {
  console.log(`
Usage:
  node scripts/create-commit-history.js --dates 2026-04-01,2026-04-02
  node scripts/create-commit-history.js --start 2026-04-01 --end 2026-04-07

Options:
  --dates, -d   Comma-separated list of ISO dates to commit for
  --start       Start date for a range of commits
  --end         End date for a range of commits
  --help, -h    Show this help message
`);
  process.exit(code);
}

function parseISODate(value) {
  const match = /^\d{4}-\d{2}-\d{2}$/.exec(value);
  if (!match) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return isNaN(date.getTime()) ? null : value;
}

function createDateRange(start, end) {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  if (!startDate || !endDate) {
    throw new Error('Start and end dates must be valid ISO dates (YYYY-MM-DD).');
  }
  if (startDate > endDate) {
    throw new Error('Start date must be before or equal to end date.');
  }

  const dates = [];
  for (let current = new Date(startDate); current <= endDate; current.setUTCDate(current.getUTCDate() + 1)) {
    dates.push(formatDate(current));
  }
  return dates;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return isNaN(date.getTime()) ? null : date;
}

function getGitConfigValue(key) {
  try {
    return execSync(`git config --get ${key}`, {
      cwd: repoRoot,
      encoding: 'utf8',
    }).trim();
  } catch {
    return '';
  }
}

function runGitCommand(command, env = {}) {
  try {
    return execSync(command, {
      stdio: 'inherit',
      cwd: repoRoot,
      env: { ...process.env, ...env },
      shell: true,
    });
  } catch (err) {
    console.error(`Git command failed: ${command}`);
    throw err;
  }
}

function runGitCommandArgs(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: { ...process.env, ...env },
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    console.error(`Git command failed: ${command} ${args.join(' ')}`);
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Git command exited with code ${result.status}: ${command} ${args.join(' ')}`);
  }
}

function appendReadmeLine(date) {
  const current = readFileSync(readmePath, 'utf8');
  const marker = '\n\n<!-- Generated commit history -->\n';
  const entry = `- ${date}: Generated contribution commit based on README update.`;
  const newEntry = `${entry}\n`;

  if (current.includes(marker)) {
    writeFileSync(readmePath, current.replace(marker, `${marker}${newEntry}`));
  } else {
    writeFileSync(readmePath, `${current}${marker}${newEntry}`);
  }
}

function main() {
  const { dates, start, end } = parseArgs();
  const targetDates = dates.length ? dates : createDateRange(start, end);
  const normalizedDates = [...new Set(targetDates.map((value) => parseISODate(value)))].filter(Boolean).sort();

  if (!normalizedDates.length) {
    throw new Error('No valid dates were specified. Use YYYY-MM-DD format.');
  }

  console.log(`Creating commits for ${normalizedDates.length} dates: ${normalizedDates.join(', ')}`);

  const gitName = getGitConfigValue('user.name');
  const gitEmail = getGitConfigValue('user.email');
  if (!gitName || !gitEmail) {
    console.warn('Warning: git user.name or user.email is not configured. Commits may not be associated with your GitHub account.');
  }

  const authorInfo = gitName && gitEmail ? `${gitName} <${gitEmail}>` : undefined;

  for (const date of normalizedDates) {
    console.log(`\nCreating commit for ${date}...`);
    appendReadmeLine(date);
    runGitCommandArgs('git', ['add', 'README.md']);

    const commitEnv = {
      GIT_AUTHOR_DATE: `${date}T12:00:00Z`,
      GIT_COMMITTER_DATE: `${date}T12:00:00Z`,
    };

    const commitArgs = [
      'commit',
      '--allow-empty',
      '--date',
      `${date}T12:00:00Z`,
      '-m',
      `Update README for contribution on ${date}`,
    ];

    if (authorInfo) {
      commitArgs.push('--author', authorInfo);
    }

    runGitCommandArgs('git', commitArgs, commitEnv);
  }

  console.log('\nDone. README.md was updated and dated commits were created.');
  console.log('Push with: git push');
}

main();
