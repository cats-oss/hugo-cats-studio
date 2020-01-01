import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-elm';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-lisp';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-nasm';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-ocaml';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-wasm';
import 'prismjs/components/prism-yaml';
import { listen } from 'quicklink';

// quicklink
listen();

// prism
document.removeEventListener('DOMContentLoaded', Prism.highlightAll, false);

// code block
const codeBlocks = document.querySelectorAll('pre code');

const initializeCodeBlock = (el, index) => {
  const id = `highlight-${index}`;
  const pre = el.parentNode;
  const filename = el.className.match(/language-.+:(.+)/);

  pre.id = id;

  // filename
  if (filename) {
    el.className = el.className.replace(/(language-.+)(:.+)/, '$1'); // eslint-disable-line no-param-reassign
    pre.insertAdjacentHTML(
      'afterbegin',
      `<span class="highlight-filename">${filename[1]}</span>`,
    );
  }

  Prism.highlightElement(el);
};

if (codeBlocks) {
  Array.from(codeBlocks).forEach(initializeCodeBlock);
}
