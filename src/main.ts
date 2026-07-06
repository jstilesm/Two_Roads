import data from '../public/dungeon.json';
import type { TreeNode, DungeonData, InternalNode, LeafNode } from './types';
import './style.css';

const typedData = data as DungeonData;
let currentNode: TreeNode = typedData.tree;

const app = document.querySelector<HTMLDivElement>('#app')!;


// old functions for rendering header, description, and inspiration
// function renderHeader() {
//   const header = document.createElement('h1');
//   header.textContent = typedData.meta.title;
//   app.appendChild(header);
// }

// function renderDescription() {
//   const description = document.createElement('p');
//   description.textContent = typedData.meta.theme;
//   app.appendChild(description);
// }
// function renderInspiration() {
//   const poem = document.createElement('a');
//   poem.href = typedData.meta.link;
//   poem.textContent = typedData.meta.inspiration;
//   app.appendChild(poem);
// }

function renderElement(tag: string, text: string, href?: string) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (href) {
    (element as HTMLAnchorElement).href = href;
  }
  app.appendChild(element);
  return element;
}

function renderOutcome(node: LeafNode) {
  const outcome = document.createElement('div');
  outcome.className = 'outcome';
  outcome.textContent = `${node.description}`;
  outcome.textContent += `\n${typedData.meta.outcomeLegend[node.outcome]}`;
  app.appendChild(outcome);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Restart';
  resetButton.className = 'button';
  resetButton.addEventListener('click', () => {
    currentNode = typedData.tree;
    render();
  });
  app.appendChild(resetButton);
}

function renderChoices(node: InternalNode) {
  const choicesContainer = document.createElement('div');
  
  const levelIndicator = document.createElement('p');
  levelIndicator.textContent = `Level: ${node.depth + 1}`;

  choicesContainer.appendChild(levelIndicator);
  choicesContainer.className = 'choices';

  node.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = choice.observation;
    button.addEventListener('click', () => {
      currentNode = traverse(node, choice.id) || currentNode;
      render();
    });
    choicesContainer.appendChild(button);
  });

  app.appendChild(choicesContainer);
}



function traverse(node: InternalNode, choiceId: string): TreeNode | undefined {
  return node.children.find(child => child.id === choiceId);
}

function render() {
  app.innerHTML = '';

  renderElement('h1', typedData.meta.title);
  renderElement('p', typedData.meta.theme);
  renderElement('a', typedData.meta.inspiration, typedData.meta.link);
  const node = currentNode

  if (node.leaf) {
    renderOutcome(node);  
  } else {
    renderChoices(node);
  }
}
render();