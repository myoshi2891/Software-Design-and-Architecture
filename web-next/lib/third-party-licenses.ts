/**
 * /licenses ページに掲載するサードパーティライセンス一覧。
 *
 * package.json の dependencies と next/font/google のフォントは
 * lib/third-party-licenses.test.ts が記載漏れを検出する。
 * mermaid が同梱する主要な依存も、ライセンス種別が異なるものを中心に併記する。
 */

export type LicenseEntry = {
  readonly name: string;
  readonly license: string;
  readonly copyright: string;
  readonly url: string;
};

export const packageLicenses: readonly LicenseEntry[] = [
  {
    name: "next",
    license: "MIT",
    copyright: "Copyright (c) 2025 Vercel, Inc.",
    url: "https://github.com/vercel/next.js",
  },
  {
    name: "react",
    license: "MIT",
    copyright: "Copyright (c) Meta Platforms, Inc. and affiliates.",
    url: "https://github.com/facebook/react",
  },
  {
    name: "react-dom",
    license: "MIT",
    copyright: "Copyright (c) Meta Platforms, Inc. and affiliates.",
    url: "https://github.com/facebook/react",
  },
  {
    name: "mermaid",
    license: "MIT",
    copyright: "Copyright (c) 2014 - 2022 Knut Sveidqvist",
    url: "https://github.com/mermaid-js/mermaid",
  },
  {
    name: "@tabler/icons-react",
    license: "MIT",
    copyright: "Copyright (c) 2020-2026 Paweł Kuna",
    url: "https://github.com/tabler/tabler-icons",
  },
  {
    name: "d3",
    license: "ISC",
    copyright: "Copyright 2010-2023 Mike Bostock",
    url: "https://github.com/d3/d3",
  },
  {
    name: "d3-sankey",
    license: "BSD-3-Clause",
    copyright: "Copyright 2015, Mike Bostock",
    url: "https://github.com/d3/d3-sankey",
  },
  {
    name: "dompurify",
    license: "MPL-2.0 OR Apache-2.0",
    copyright: "Copyright Dr.-Ing. Mario Heiderich, Cure53",
    url: "https://github.com/cure53/DOMPurify",
  },
  {
    name: "katex",
    license: "MIT",
    copyright: "Copyright (c) 2013-2020 Khan Academy and other contributors",
    url: "https://github.com/KaTeX/KaTeX",
  },
  {
    name: "cytoscape",
    license: "MIT",
    copyright: "Copyright (c) 2016-2026, The Cytoscape Consortium.",
    url: "https://github.com/cytoscape/cytoscape.js",
  },
  {
    name: "dagre-d3-es",
    license: "MIT",
    copyright: "Copyright (c) 2012-2014 Chris Pettitt",
    url: "https://github.com/tbo47/dagre-es",
  },
  {
    name: "elkjs",
    license: "EPL-2.0",
    copyright: "Copyright (c) Kiel University and others",
    url: "https://github.com/kieler/elkjs",
  },
  {
    name: "khroma",
    license: "MIT",
    copyright: "Copyright (c) 2019-present Fabio Spampinato, Andrew Maney",
    url: "https://github.com/fabiospampinato/khroma",
  },
  {
    name: "lodash-es",
    license: "MIT",
    copyright: "Copyright OpenJS Foundation and other contributors",
    url: "https://github.com/lodash/lodash",
  },
  {
    name: "dayjs",
    license: "MIT",
    copyright: "Copyright (c) 2018-present, iamkun",
    url: "https://github.com/iamkun/dayjs",
  },
  {
    name: "web-worker",
    license: "Apache-2.0",
    copyright: "Copyright Jason Miller and contributors",
    url: "https://github.com/developit/web-worker",
  },
];

const OFL = "SIL Open Font License 1.1";

export const fontLicenses: readonly LicenseEntry[] = [
  {
    name: "Noto Sans JP",
    license: OFL,
    copyright: "Copyright 2014-2021 Adobe (http://www.adobe.com/)",
    url: "https://fonts.google.com/specimen/Noto+Sans+JP",
  },
  {
    name: "JetBrains Mono",
    license: OFL,
    copyright: "Copyright 2020 The JetBrains Mono Project Authors",
    url: "https://fonts.google.com/specimen/JetBrains+Mono",
  },
  {
    name: "Shippori Mincho",
    license: OFL,
    copyright: "Copyright 2020 The Shippori Mincho Project Authors",
    url: "https://fonts.google.com/specimen/Shippori+Mincho",
  },
  {
    name: "Source Serif 4",
    license: OFL,
    copyright: "Copyright 2014-2021 Adobe (http://www.adobe.com/)",
    url: "https://fonts.google.com/specimen/Source+Serif+4",
  },
  {
    name: "Inter",
    license: OFL,
    copyright: "Copyright 2020 The Inter Project Authors",
    url: "https://fonts.google.com/specimen/Inter",
  },
  {
    name: "Space Grotesk",
    license: OFL,
    copyright: "Copyright 2020 The Space Grotesk Project Authors",
    url: "https://fonts.google.com/specimen/Space+Grotesk",
  },
];
