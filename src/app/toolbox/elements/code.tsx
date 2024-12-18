import 'highlight.js/styles/night-owl.css';
import hl from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/vbscript-html';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export enum CodeType {
  css = 'css',
  html = 'html',
  javascript = 'javascript',
  typescript = 'typescript',
};

interface CodeProps {
  code: CodeProp[] | null;
}

export interface CodeProp {
  code: string | null | undefined;
  type: CodeType | undefined;
}

function PrettyCode({ code, type }: CodeProp) {
  if (!code || !type) return <span />;
  const __html = hl.highlight(code, { language: type }).value;
  const copy = () => code && navigator.clipboard.writeText(code);
  return (
    <>
      <div className='codetype'>{type}</div>
      <Image alt='copy to clipboard' src="./copy.svg" className='copy' height={20} width={20} onClick={copy} />
      <div className='codedisplay'>
        <pre><code dangerouslySetInnerHTML={{ __html }} /></pre>
      </div>
    </>
  );
}

export default function Code({ code }: CodeProps) {
  const [active, setActive] = useState<CodeProp | null>(null);

  useEffect(() => {
    hl.registerLanguage('css', css);
    hl.registerLanguage('html', html);
    hl.registerLanguage('javascript', javascript);
    hl.registerLanguage('typescript', typescript);
  }, []);

  useEffect(() => {
    if (code?.length) setActive(code[0]);
    else setActive(null);
  }, [code]);

  return (
    <div className="code-panel">
      <div className="title">Output</div>
      <div className="code">
        {code ? code.map((c) => {
          return (
            <div
              key={c.type}
              onClick={() => setActive(c)}
              className={`panel ${code?.length > 1 ? 'multi' : ''} ${active?.type === c.type ? 'active' : ''}`}>
              <PrettyCode code={c.code} type={c.type} />
            </div>
          )
        }) : ''}
      </div>
    </div>
  )
}
