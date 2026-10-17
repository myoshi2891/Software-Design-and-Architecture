import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import {
  APACHE_2_0_TEXT,
  BSD_3_CLAUSE_TEXT,
  EPL_2_0_TEXT,
  fontLicenses,
  type LicenseEntry,
  MIT_PERMISSION_NOTICE,
  OFL_1_1_TEXT,
  packageLicenses,
} from "@/lib/third-party-licenses";

export const metadata: Metadata = {
  title: "サードパーティライセンス | IT業界 主流設計手法・駆動開発 完全ガイド",
  description: "本サイトが利用するオープンソースソフトウェアとフォントのライセンス一覧。",
};

function LicenseTable({ caption, entries }: { caption: string; entries: readonly LicenseEntry[] }) {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>ライセンス</th>
          <th>著作権表示</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.name}>
            <td>
              <Ext href={entry.url}>{entry.name}</Ext>
            </td>
            <td>{entry.license}</td>
            <td>{entry.copyright}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** ライセンス本文を、対象の著作権表示と併せて掲載する節。 */
function LicenseText({
  id,
  title,
  notices,
  text,
}: {
  id: string;
  title: string;
  notices: readonly string[];
  text: string;
}) {
  return (
    <section aria-labelledby={id}>
      <h3 id={id}>{title}</h3>
      <ul>
        {notices.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
      <pre>{text}</pre>
    </section>
  );
}

// 同一の著作権表示（react / react-dom など）は 1 行にまとめる。
const uniqueCopyrights = (entries: readonly LicenseEntry[]) => [
  ...new Set(entries.map((e) => e.copyright)),
];

// "MPL-2.0 OR Apache-2.0" のような選択ライセンスも対象に含める。
const copyrightsUnder = (license: string) =>
  uniqueCopyrights(packageLicenses.filter((e) => e.license.includes(license)));

/** 本サイトが利用するサードパーティのライセンス一覧ページ。 */
export default function LicensesPage() {
  return (
    <main className="licenses-page">
      <h1>サードパーティライセンス</h1>
      <p>
        本サイトは以下のオープンソースソフトウェアおよびフォントを利用しています。MIT
        License、Apache License 2.0、Eclipse Public License 2.0、BSD 3-Clause License、SIL Open Font
        License 1.1
        の本文は下記「ライセンス本文」に掲載しています。その他のライセンスの全文は、それぞれの配布元を参照してください。
      </p>
      <h2>ソフトウェア</h2>
      <LicenseTable caption="ソフトウェアのライセンス一覧" entries={packageLicenses} />
      <h2>フォント</h2>
      <LicenseTable caption="フォントのライセンス一覧" entries={fontLicenses} />
      <h2>ライセンス本文</h2>
      <LicenseText
        id="license-mit"
        title="MIT License"
        notices={uniqueCopyrights(packageLicenses.filter((e) => e.license === "MIT"))}
        text={MIT_PERMISSION_NOTICE}
      />
      <LicenseText
        id="license-apache"
        title="Apache License 2.0"
        notices={copyrightsUnder("Apache-2.0")}
        text={APACHE_2_0_TEXT}
      />
      <LicenseText
        id="license-epl"
        title="Eclipse Public License 2.0"
        notices={[
          ...copyrightsUnder("EPL-2.0"),
          // EPL-2.0 第 3 条: Object Code で配布する場合はソースコードの入手方法を示す。
          "elkjs のソースコードは https://github.com/kieler/elkjs から入手できます。",
        ]}
        text={EPL_2_0_TEXT}
      />
      <LicenseText
        id="license-bsd"
        title="BSD 3-Clause License"
        notices={copyrightsUnder("BSD-3-Clause")}
        text={BSD_3_CLAUSE_TEXT}
      />
      <LicenseText
        id="license-ofl"
        title="SIL Open Font License 1.1"
        notices={uniqueCopyrights(fontLicenses)}
        text={OFL_1_1_TEXT}
      />
    </main>
  );
}
