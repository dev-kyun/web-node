import fs from 'fs';
import path from 'path';

export function findRootWorkspace(): string {
  let current = process.cwd();
  for (let i = 0; i < 10; i++) {
    const workspace = path.resolve(current, '.web-node');
    if (fs.existsSync(workspace)) {
      return current;
    }
    const parent = path.resolve(current, '..');
    if (parent === current) {
      break;
    }
    current = parent;
  }

  throw new Error('Cannot find .web-node');
}
