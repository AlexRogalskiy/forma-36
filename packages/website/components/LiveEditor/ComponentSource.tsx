import React, { useState } from 'react';
import { css } from 'emotion';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import tokens from '@contentful/f36-tokens';
import * as f36Components from '@contentful/f36-components';
import * as f36utils from '@contentful/f36-utils';
import { Card, Button } from '@contentful/f36-components';
import * as f36icons from '@contentful/f36-icons';
import { Flex } from '@contentful/f36-core';
import theme from 'prism-react-renderer/themes/github';

const styles = {
  error: css`
    font-family: ${tokens.fontStackMonospace};
    font-size: ${tokens.fontSizeS};
    background: ${tokens.colorNegative};
    color: ${tokens.colorWhite};
    padding: ${tokens.spacingXs};
  `,

  editor: css`
    font-family: ${tokens.fontStackMonospace};
    background-color: #222031;
    color: #ffffff;
  `,

  // !important was necessary because these styles are being applied after the Card component styles
  card: css`
    font-family: ${tokens.fontStackPrimary};
    border-radius: ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0 !important;
  `,

  toggle: css`
    font-family: ${tokens.fontStackPrimary};
    border-radius: 0 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium};
  `,
};

export function ComponentSource({ children }: { children: string }) {
  const [showSource, setShowSource] = useState(true);

  const handleToggle = () => {
    setShowSource((prevState) => !prevState);
  };

  return (
    <Flex flexDirection="column" marginBottom="spacingM">
      <LiveProvider
        code={children.trim()}
        theme={theme}
        // The order is important here
        scope={{
          ...f36icons,
          ...f36Components,
          ...f36utils,
          f36icons,
          tokens,
        }}
      >
        <Card className={styles.card}>
          <LivePreview />
        </Card>
        {showSource && (
          <>
            <LiveError className={styles.error} />
            <LiveEditor className={styles.editor} />
          </>
        )}
        <Button
          className={styles.toggle}
          variant="secondary"
          onClick={handleToggle}
          isFullWidth
        >
          {showSource ? 'Hide source' : 'Show source'}
        </Button>
      </LiveProvider>
    </Flex>
  );
}
