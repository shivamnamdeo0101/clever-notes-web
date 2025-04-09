export function generateCodeFromJson(json) {
    let cssClasses = {};
    const voidElements = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr',
      'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
    ]);
  
    const camelToKebab = (str) => str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
  
    const styleObjToString = (style) => {
      return Object.entries(style)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join(' ');
    };
  
    const extractStylesToCSS = (className, style) => {
      if (!style || !className) return;
      if (!cssClasses[className]) {
        cssClasses[className] = styleObjToString(style);
      }
    };
  
    const buildJSX = (node, level = 2) => {
      const indent = '  '.repeat(level);
      const tag = node.type || 'div';
  
      const classAttr = node.class ? ` className="${node.class}"` : '';
      const styleAttr = node.class ? '' : node.style
        ? ` style={{ ${Object.entries(node.style)
            .map(([k, v]) => `${k}: "${v}"`)
            .join(', ')} }}`
        : '';
  
      const attrStr = node.attributes
        ? Object.entries(node.attributes)
            .map(([key, val]) => ` ${key}="${val}"`)
            .join('')
        : '';
  
      extractStylesToCSS(node.class, node.style);
  
      if (voidElements.has(tag)) {
        return `${indent}<${tag}${classAttr}${styleAttr}${attrStr} />`;
      }
  
      if (node.children?.length) {
        const children = node.children.map((child) => buildJSX(child, level + 1)).join('\n');
        return `${indent}<${tag}${classAttr}${styleAttr}${attrStr}>\n${children}\n${indent}</${tag}>`;
      } else if (node.content) {
        return `${indent}<${tag}${classAttr}${styleAttr}${attrStr}>${node.content}</${tag}>`;
      } else {
        return `${indent}<${tag}${classAttr}${styleAttr}${attrStr}></${tag}>`;
      }
    };
  
    const jsxCodeString = `
  const App = () => {
    return (
  ${buildJSX(json)}
    );
  };`;
  
    const cssCodeString = Object.entries(cssClasses)
      .map(([className, styles]) => {
        return `.${className} {\n  ${styles.split(';').filter(Boolean).join(';\n  ')};\n}`;
      })
      .join('\n\n');
  
    return { jsxCodeString, cssCodeString };
  }
  