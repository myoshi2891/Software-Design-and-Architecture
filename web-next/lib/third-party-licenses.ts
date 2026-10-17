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

/** MIT License の許諾文。MIT 対象パッケージの著作権表示と併せて掲載する。 */
export const MIT_PERMISSION_NOTICE = `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

/** SIL Open Font License 1.1 の全文。next/font が out/ へ自己ホストするフォントに適用される。 */
export const OFL_1_1_TEXT = `SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.`;
