import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import { fontLicenses, type LicenseEntry, packageLicenses } from "@/lib/third-party-licenses";

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

/** 本サイトが利用するサードパーティのライセンス一覧ページ。 */
export default function LicensesPage() {
  return (
    <main className="licenses-page">
      <h1>サードパーティライセンス</h1>
      <p>
        本サイトは以下のオープンソースソフトウェアおよびフォントを利用しています。各ライセンスの全文は、それぞれの配布元を参照してください。
      </p>
      <h2>ソフトウェア</h2>
      <LicenseTable caption="ソフトウェアのライセンス一覧" entries={packageLicenses} />
      <h2>フォント</h2>
      <LicenseTable caption="フォントのライセンス一覧" entries={fontLicenses} />
    </main>
  );
}
