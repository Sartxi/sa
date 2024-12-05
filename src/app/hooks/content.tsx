import DataContext from "../content/data";
import { useContext, useEffect, useState } from "react";
import { getAboutData, getLandingData } from "../content";
import { PageSections } from "../elements/header";

function useSearch(param: string) {
  const [search, setSearch] = useState<any>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      setSearch(params.get(param));
    }
  }, []);
  return search;
}

function setLinks(str: string) {
  const regex = new RegExp(`{+(.*?)+}`);
  const match = str.match(regex);
  if (match) {
    const srt = match[0].indexOf('{+');
    const end = match[0].indexOf('+}', srt + 2);
    const [text, link] = match[0].substring(srt + 2, end).split('#');
    const anchor = `<a href="${link}" class="inline" target="_blank">${text}</a>`;
    return str.replace(regex, anchor);;
  } else return str;
}

export function RenderText({ text }: { text: string }) {
  let __html = text;
  __html = __html.replaceAll('{*', '<strong>').replaceAll('*}', '</strong>');
  __html = __html.replaceAll('{_', '<i>').replaceAll('_}', '</i>');
  __html = setLinks(__html);
  return <span dangerouslySetInnerHTML={{ __html }} />;
}

export function useContent(page?: PageSections): any {
  const src = useSearch('at');
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    const Landing = getLandingData(src);
    const About = getAboutData(src);
    setData({ Landing, About });
  }, [src]);

  if (data && page) return { data: data[page] };
  return { data };
}
