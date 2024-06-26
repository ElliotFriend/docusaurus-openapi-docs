---
id: sidebars
hide_title: true
sidebar_label: Sidebars
title: Sidebars
---

## Overview

The Docusaurus OpenAPI docs plugin offers a number of options and helpers for managing sidebars, some of which may already be familiar to you.

The options range from completely manual to fully-automated (based on some inputs). Although it's completely up to you to decide how to best implement sidebars for your project, there are a few guidelines to keep in mind.

Guidelines:

- Try to leverage sidebar categories to group similar paths/endpoints together.
- Use path tags as the pattern to group paths/endpoints by (Note, the OpenAPI docs plugin currently groups by the first tag).
- Use short, obvious, descriptive tag names.
- Use tag descriptions to get more helpful category link pages (supports Docusaurus MDX features).
- Try to front or back-load supporting documentation (i.e. docs that aren't generated from the OpenAPI spec) in the same sidebar as the generate API docs.

## Built-in Docusaurus Sidebars

:::info TIP
Visit docusaurus.io for the [official documentation](https://docusaurus.io/docs/sidebar) on sidebars.
:::

Docusaurus comes equipped with some helpful utilities, patterns and methods for managing sidebars. The following is a high-level summary of options that may be of use for constructing them for your OpenAPI docs.

### Autogenerated

:::info TIP
Visit https://docusaurus.io/docs/sidebar/autogenerated for the official documentation on `autogenerated` sidebars.
:::

Autogenerated sidebars are capable of generating sidebar objects based on the directory tree structure of the path you point them to. Basically, each folder becomes a category and each `*.mdx` file becomes a `doc` link.

Here are some things to keep in mind if you decide to use this method with the OpenAPI docs plugin:

- Whether pointing your `specPath` to a file or URL or to a folder containing multiple specification files (1-level deep), the OpenAPI plugin will always write the generated `*.mdx` files to the same location - the `outputDir` path.
- As of `2.0.0-beta.21`, Docusaurus `autogenerated` sidebars only respects `__category__.json` files if you configure `autogenerated` for the root path of your docs plugin, i.e. to the docs `path` directory.
- Plan for how you will handle and incorporate non-API docs, since Docusaurus will attempt to sort either alphabetically or using the `sidebar_position` [value](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#sidebar_position).

### Manual

For greater control, you also have the option of constructing the sidebar object manually. This could make sense for smaller APIs or in situations where you need more granual control of how sidebar items are ordered or customized.

## Sidebar Helpers

### Grouping by Tag

The OpenAPI docs plugin provides out-of-the-box support for grouping paths by "tag". What this means is that the plugin will automatically generate a sidebar slice using the first path tag as the "group by" value and the path itself as one of the `items` under that category.

### Grouping by TagGroup

The OpenAPI docs plugin provides out-of-the-box support for grouping paths by "tagGroup".
What this means is that the plugin will automatically generate a sidebar slice using the first path group as the "group by" value and the path itself as one of the `tags` under that category.
Use `x-tagGroups` to group tags in the [Reference](https://redocly.com/docs/api-reference-docs/specification-extensions/x-tag-groups/) docs navigation sidebar. Add it to the root OpenAPI object.

### Category Links

Docusaurus now supports the ability to designate or customize what page gets displayed when a category is clicked.

The OpenAPI Docs plugin can leverage this feature in a number of ways, including:

- Using the `generated-index` feature to create an index of all paths/endpoints available under a tag.
- Setting the `tag` description of an OpenAPI specification as the content that displays when a category is clicked.
- Setting the `info` section of an OpenAPI specification as the page that displays when a category is clicked (reserved primarily for micro-specs).

### Grouping Schemas by `x-tags`

The OpenAPI plugin provides out-of-the-box support for grouping schema objects into tags alongside path objects grouped by that same tag.

What this means is that when the `groupPathsBy` sidebar option is set to `tag`, any `x-tag`ged schema objects will be gathered together with the tagged paths in that sidebar category. In the event that `showSchemas` is not configured, and `x-tags` is found on a schema object, the schema **will be included** in the relevant tag's category sidebar.