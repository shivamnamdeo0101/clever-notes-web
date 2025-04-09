import React from 'react';

const voidElements = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr',
  'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
]);

const ReactJsonRenderer = ({ structure }) => {
  if (!structure) return null;

  const renderElement = (node, index = 0) => {
    const {
      type = 'div',
      class: className,
      style,
      content,
      attributes = {},
      children = [],
    } = node;

    const Tag = type;
    const key = Math.random();
    // Prepare props
    const props = {
      key: index,
      className,
      style,
      ...attributes,
    };

    // Void elements: return self-closing
    if (voidElements.has(type)) {
      return <Tag {...props} />;
    }

    // Normal element
    return (
      <Tag key={key}  {...props}>
        {content}
        {children.map((child, i) => renderElement(child, i))}
      </Tag>
    );
  };

  return <>{renderElement(structure)}</>;
};

export default ReactJsonRenderer;
