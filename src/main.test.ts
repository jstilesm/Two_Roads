import { describe, it, expect } from 'vitest';
import data from '../public/dungeon.json';
import type { TreeNode, DungeonData } from './types';

const typedData = data as DungeonData;

// basic recursive function to collect all outcomes from the tree
function collectOutcomes(node: TreeNode): string[] {
  if (node.leaf) {
    return [node.outcome];
  }
  return node.children.flatMap(child => collectOutcomes(child));
}

// check to make sure we have a solution
describe('dungeon tree', () => {
  it('has at least one reachable treasure outcome', () => {
    const outcomes = collectOutcomes(typedData.tree);
    expect(outcomes).toContain('treasure');
  });
});