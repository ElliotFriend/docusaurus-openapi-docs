/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { ReactNode } from "react";

import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { createDescription } from "../../markdown/createDescription";
import { guard } from "../../markdown/utils";

export interface Props {
  children: ReactNode;
  collapsible: boolean;
  name: string;
  qualifierMessage: string | undefined;
  required: boolean;
  schemaName: string;
  // TODO should probably be typed
  schema: any;
  discriminator: boolean;
}

export default function SchemaItem({
  children: collapsibleSchemaContent,
  collapsible,
  name,
  qualifierMessage,
  required,
  schemaName,
  schema,
}: Props) {
  let deprecated;
  let schemaDescription;
  let defaultValue;
  let nullable;
  if (schema) {
    deprecated = schema.deprecated;
    schemaDescription = schema.description;
    defaultValue = schema.default;
    nullable = schema.nullable;
  }

  const renderRequired = guard(
    Array.isArray(required) ? required.includes(name) : required,
    () => <span className="openapi-schema__required">required</span>
  );

  const renderDeprecated = guard(deprecated, () => (
    <span className="openapi-schema__deprecated">deprecated</span>
  ));

  const renderNullable = guard(nullable, () => (
    <span className="openapi-schema__nullable">nullable</span>
  ));

  const renderSchemaDescription = guard(schemaDescription, (description) => (
    <div>
      <ReactMarkdown
        children={createDescription(description)}
        components={{
          pre: "div",
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) return <code>{children}</code>;
            return !inline && match ? (
              <CodeBlock className={className}>{children}</CodeBlock>
            ) : (
              <CodeBlock>{children}</CodeBlock>
            );
          },
        }}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  ));

  const renderQualifierMessage = guard(qualifierMessage, (message) => (
    <div>
      <ReactMarkdown
        children={createDescription(message)}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  ));

  const renderDefaultValue = guard(defaultValue, (value) => (
    <div className="">
      <ReactMarkdown children={`**Default value:** \`${value}\``} />
    </div>
  ));

  const schemaContent = (
    <div>
      <span className="openapi-schema__container">
        <strong
          className={clsx("openapi-schema__property", {
            "openapi-schema__strikethrough": deprecated,
          })}
        >
          {name}
        </strong>
        <span className="openapi-schema__name"> {schemaName}</span>
        {(nullable || required || deprecated) && (
          <span className="openapi-schema__divider"></span>
        )}
        {renderNullable}
        {renderRequired}
        {renderDeprecated}
      </span>
      {renderQualifierMessage}
      {renderDefaultValue}
      {renderSchemaDescription}
      {collapsibleSchemaContent ?? collapsibleSchemaContent}
    </div>
  );

  return (
    <div className="openapi-schema__list-item">
      {collapsible ? collapsibleSchemaContent : schemaContent}
    </div>
  );
}
