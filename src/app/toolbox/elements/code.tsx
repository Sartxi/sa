import 'highlight.js/styles/night-owl.css';
import hl from 'highlight.js';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/vbscript-html';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export enum CodeType {
  javascript = 'javascript',
  css = 'css',
  html = 'html'
};

interface CodeProps {
  code: CodeProp[] | null;
  cleared: () => void;
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
    hl.registerLanguage('javascript', js);
    hl.registerLanguage('css', css);
    hl.registerLanguage('html', html);
  }, []);

  useEffect(() => {
    if (code?.length) setActive(code[0]);
  }, [code]);

  return (
    <div className="code-panel">
      <div className="title">Output</div>
      <div className="code">
        {code ? code.filter(c => c.type === active?.type).map(({ type, code }) => <PrettyCode key={type} code={code} type={type} />) : ''}
      </div>
    </div>
  )
}
