declare module "react-syntax-highlighter" {
  import * as React from "react";

  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children: string;
    showLineNumbers?: boolean;
    customStyle?: React.CSSProperties;
    codeTagProps?: any;
    [key: string]: any;
  }

  const SyntaxHighlighter: React.ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/esm/styles/hljs" {
  export const atomOneDark: any;
  export const atomOneLight: any;
  export const github: any;
  export const vs2015: any;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const atomDark: any;
  export const oneLight: any;
  export const prism: any;
  export const tomorrow: any;
}
