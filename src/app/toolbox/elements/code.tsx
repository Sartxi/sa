import 'highlight.js/styles/night-owl.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { useEffect } from 'react';
import Image from 'next/image';

export enum CodeType {
  javascript = 'javascript',
  css = 'css'
};

interface CodeProps {
  type: CodeType;
  code: string | null;
  cleared: () => void;
}

function PrettyCode({ code, type }: { code: string | null, type: CodeType }) {
  if (!code) return <span />;
  const __html = hljs.highlight(code, { language: type }).value;
  return <pre><code dangerouslySetInnerHTML={{ __html }} /></pre>;
}

export default function Code({ type, code }: CodeProps) {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
  }, []);
  const copy = () => code && navigator.clipboard.writeText(code);
  return (
    <div className="code-panel">
      <div className="title">
        Output
      </div>
      <div className="code">
        <div className='codetype'>{type}</div>
        <Image alt='copy to clipboard' src="./copy.svg" className='copy' height={20} width={20} onClick={copy} />
        <PrettyCode code={code} type={type} />
      </div>
    </div>
  )
}
