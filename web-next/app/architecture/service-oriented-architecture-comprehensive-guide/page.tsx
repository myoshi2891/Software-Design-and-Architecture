// biome-ignore-all lint/security/noDangerouslySetInnerHtml: Static code blocks with hand-written syntax highlighting

import {
  IconAlertCircle,
  IconAlertOctagon,
  IconAlertTriangle,
  IconArrowsDiff,
  IconArrowsDown,
  IconArrowsExchange,
  IconArrowsMaximize,
  IconBinaryTree,
  IconBook,
  IconBooks,
  IconBrandCashapp,
  IconBriefcase,
  IconBuilding,
  IconBuildingBank,
  IconBulb,
  IconBus,
  IconCalendar,
  IconCategory,
  IconChartBar,
  IconChartLine,
  IconCheck,
  IconCloud,
  IconCode,
  IconColumns,
  IconCpu,
  IconCrown,
  IconDatabase,
  IconFileCode,
  IconFileDescription,
  IconGitBranch,
  IconGitMerge,
  IconGridDots,
  IconHierarchy2,
  IconHistory,
  IconInfoCircle,
  IconKey,
  IconLayersIntersect,
  IconLayoutDistributeVertical,
  IconLink,
  IconList,
  IconListCheck,
  IconLock,
  IconPackage,
  IconPuzzle,
  IconRadar,
  IconRefresh,
  IconRocket,
  IconRoute,
  IconScale,
  IconSearch,
  IconShieldLock,
  IconStack,
  IconStairs,
  IconStar,
  IconStethoscope,
  IconTag,
  IconTarget,
  IconTemplate,
  IconTools,
  IconUpload,
  IconUserShield,
  IconWaveSine,
  IconWorld,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import SoaSidebar, { type NavGroup } from "./SoaSidebar";

export const metadata: Metadata = {
  title: "🏛️ SOA 完全ガイド | サービス指向アーキテクチャ",
  description:
    "Service-Oriented Architecture（SOA）の設計原則、ESB、SOAP/REST、サービスレジストリ、セキュリティ設計、データ管理からガバナンス、銀行基幹システム移行事例まで網羅した完全解説ガイド。",
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "基礎知識",
    items: [
      { id: "s1", emoji: "🏛️", label: "SOAとは何か" },
      { id: "s2", emoji: "📜", label: "SOAの基本原則" },
      { id: "s3", emoji: "🧩", label: "主要コンポーネント" },
      { id: "s4", emoji: "🚌", label: "ESB" },
    ],
  },
  {
    title: "設計と技術",
    items: [
      { id: "s5", emoji: "🎨", label: "サービス設計パターン" },
      { id: "s6", emoji: "⚖️", label: "SOA vs マイクロサービス" },
      { id: "s7", emoji: "💻", label: "Webサービス技術スタック" },
      { id: "s8", emoji: "📖", label: "サービスレジストリ" },
    ],
  },
  {
    title: "統合とセキュリティ",
    items: [
      { id: "s9", emoji: "🔒", label: "セキュリティ設計" },
      { id: "s10", emoji: "🗄️", label: "データ管理" },
      { id: "s11", emoji: "👑", label: "SOAガバナンス" },
      { id: "s12", emoji: "🚀", label: "実装ステップ" },
    ],
  },
  {
    title: "実践と運用",
    items: [
      { id: "s13", emoji: "🏦", label: "銀行基幹システム事例" },
      { id: "s14", emoji: "📊", label: "監視・運用管理" },
      { id: "s15", emoji: "✅", label: "ベストプラクティス" },
      { id: "s16", emoji: "⚠️", label: "アンチパターン" },
      { id: "s17", emoji: "📚", label: "参考文献" },
    ],
  },
];

const CODE_BLOCKS = {
  wsdl: `<span class="xc-comment">&lt;!-- 注文サービスのWSDL定義例（コントラクトファースト） --&gt;</span>
<span class="xc-tag">&lt;definitions</span> <span class="xc-attr">name</span>=<span class="xc-val">"OrderService"</span>
    <span class="xc-attr">targetNamespace</span>=<span class="xc-val">"urn:example:orderservice:v1"</span>
    <span class="xc-attr">xmlns</span>=<span class="xc-val">"http://schemas.xmlsoap.org/wsdl/"</span><span class="xc-tag">&gt;</span>

  <span class="xc-comment">&lt;!-- 1. Types：XMLスキーマでデータ型を定義 --&gt;</span>
  <span class="xc-tag">&lt;types&gt;</span>
    <span class="xc-tag">&lt;xsd:schema</span> <span class="xc-attr">targetNamespace</span>=<span class="xc-val">"urn:example:orderservice:v1"</span><span class="xc-tag">&gt;</span>
      <span class="xc-tag">&lt;xsd:element</span> <span class="xc-attr">name</span>=<span class="xc-val">"CreateOrderRequest"</span><span class="xc-tag">&gt;</span>
        <span class="xc-tag">&lt;xsd:complexType&gt;</span>
          <span class="xc-tag">&lt;xsd:sequence&gt;</span>
            <span class="xc-tag">&lt;xsd:element</span> <span class="xc-attr">name</span>=<span class="xc-val">"customerId"</span>  <span class="xc-attr">type</span>=<span class="xc-val">"xsd:string"</span><span class="xc-tag">/&gt;</span>
            <span class="xc-tag">&lt;xsd:element</span> <span class="xc-attr">name</span>=<span class="xc-val">"productId"</span>   <span class="xc-attr">type</span>=<span class="xc-val">"xsd:string"</span><span class="xc-tag">/&gt;</span>
            <span class="xc-tag">&lt;xsd:element</span> <span class="xc-attr">name</span>=<span class="xc-val">"quantity"</span>    <span class="xc-attr">type</span>=<span class="xc-val">"xsd:int"</span><span class="xc-tag">/&gt;</span>
            <span class="xc-tag">&lt;xsd:element</span> <span class="xc-attr">name</span>=<span class="xc-val">"totalAmount"</span> <span class="xc-attr">type</span>=<span class="xc-val">"xsd:decimal"</span><span class="xc-tag">/&gt;</span>
          <span class="xc-tag">&lt;/xsd:sequence&gt;</span>
        <span class="xc-tag">&lt;/xsd:complexType&gt;</span>
      <span class="xc-tag">&lt;/xsd:element&gt;</span>
    <span class="xc-tag">&lt;/xsd:schema&gt;</span>
  <span class="xc-tag">&lt;/types&gt;</span>

  <span class="xc-comment">&lt;!-- 2. Message：メッセージ定義 --&gt;</span>
  <span class="xc-tag">&lt;message</span> <span class="xc-attr">name</span>=<span class="xc-val">"CreateOrderInput"</span><span class="xc-tag">&gt;</span>
    <span class="xc-tag">&lt;part</span> <span class="xc-attr">name</span>=<span class="xc-val">"parameters"</span> <span class="xc-attr">element</span>=<span class="xc-val">"tns:CreateOrderRequest"</span><span class="xc-tag">/&gt;</span>
  <span class="xc-tag">&lt;/message&gt;</span>

  <span class="xc-comment">&lt;!-- 3. PortType：抽象インターフェース（操作定義） --&gt;</span>
  <span class="xc-tag">&lt;portType</span> <span class="xc-attr">name</span>=<span class="xc-val">"OrderServicePortType"</span><span class="xc-tag">&gt;</span>
    <span class="xc-tag">&lt;operation</span> <span class="xc-attr">name</span>=<span class="xc-val">"createOrder"</span><span class="xc-tag">&gt;</span>
      <span class="xc-tag">&lt;input</span>  <span class="xc-attr">message</span>=<span class="xc-val">"tns:CreateOrderInput"</span><span class="xc-tag">/&gt;</span>
      <span class="xc-tag">&lt;output</span> <span class="xc-attr">message</span>=<span class="xc-val">"tns:CreateOrderOutput"</span><span class="xc-tag">/&gt;</span>
    <span class="xc-tag">&lt;/operation&gt;</span>
  <span class="xc-tag">&lt;/portType&gt;</span>

  <span class="xc-comment">&lt;!-- 4. Binding：プロトコルバインディング（SOAP/HTTP） --&gt;</span>
  <span class="xc-tag">&lt;binding</span> <span class="xc-attr">name</span>=<span class="xc-val">"OrderServiceSOAPBinding"</span>
           <span class="xc-attr">type</span>=<span class="xc-val">"tns:OrderServicePortType"</span><span class="xc-tag">&gt;</span>
    <span class="xc-tag">&lt;soap:binding</span> <span class="xc-attr">style</span>=<span class="xc-val">"document"</span>
                  <span class="xc-attr">transport</span>=<span class="xc-val">"http://schemas.xmlsoap.org/soap/http"</span><span class="xc-tag">/&gt;</span>
    <span class="xc-tag">&lt;operation</span> <span class="xc-attr">name</span>=<span class="xc-val">"createOrder"</span><span class="xc-tag">&gt;</span>
      <span class="xc-tag">&lt;soap:operation</span> <span class="xc-attr">soapAction</span>=<span class="xc-val">"urn:createOrder"</span><span class="xc-tag">/&gt;</span>
    <span class="xc-tag">&lt;/operation&gt;</span>
  <span class="xc-tag">&lt;/binding&gt;</span>

  <span class="xc-comment">&lt;!-- 5. Service：エンドポイントURL定義 --&gt;</span>
  <span class="xc-tag">&lt;service</span> <span class="xc-attr">name</span>=<span class="xc-val">"OrderService"</span><span class="xc-tag">&gt;</span>
    <span class="xc-tag">&lt;port</span> <span class="xc-attr">name</span>=<span class="xc-val">"OrderServicePort"</span>
          <span class="xc-attr">binding</span>=<span class="xc-val">"tns:OrderServiceSOAPBinding"</span><span class="xc-tag">&gt;</span>
      <span class="xc-tag">&lt;soap:address</span>
          <span class="xc-attr">location</span>=<span class="xc-val">"https://api.example.com/ws/order-service/v1"</span><span class="xc-tag">/&gt;</span>
    <span class="xc-tag">&lt;/port&gt;</span>
  <span class="xc-tag">&lt;/service&gt;</span>

<span class="xc-tag">&lt;/definitions&gt;</span>`,

  soap: `<span class="xc-comment">&lt;!-- SOAPリクエストメッセージの構造 --&gt;</span>
<span class="xc-tag">&lt;soapenv:Envelope</span>
    <span class="xc-attr">xmlns:soapenv</span>=<span class="xc-val">"http://schemas.xmlsoap.org/soap/envelope/"</span>
    <span class="xc-attr">xmlns:ord</span>=<span class="xc-val">"urn:example:orderservice:v1"</span><span class="xc-tag">&gt;</span>

  <span class="xc-comment">&lt;!-- ヘッダー：WS-Securityトークン・相関ID --&gt;</span>
  <span class="xc-tag">&lt;soapenv:Header&gt;</span>
    <span class="xc-tag">&lt;wsse:Security</span> <span class="xc-attr">xmlns:wsse</span>=<span class="xc-val">"http://docs.oasis-open.org/wss/..."</span><span class="xc-tag">&gt;</span>
      <span class="xc-tag">&lt;wsse:UsernameToken&gt;</span>
        <span class="xc-tag">&lt;wsse:Username&gt;</span>service_account<span class="xc-tag">&lt;/wsse:Username&gt;</span>
        <span class="xc-tag">&lt;wsse:Password&gt;</span>{{encrypted}}<span class="xc-tag">&lt;/wsse:Password&gt;</span>
      <span class="xc-tag">&lt;/wsse:UsernameToken&gt;</span>
    <span class="xc-tag">&lt;/wsse:Security&gt;</span>
    <span class="xc-comment">&lt;!-- トレーサビリティ用の相関ID --&gt;</span>
    <span class="xc-tag">&lt;ord:CorrelationId&gt;</span>550e8400-e29b-41d4-a716<span class="xc-tag">&lt;/ord:CorrelationId&gt;</span>
  <span class="xc-tag">&lt;/soapenv:Header&gt;</span>

  <span class="xc-comment">&lt;!-- ボディ：実際のビジネスデータ --&gt;</span>
  <span class="xc-tag">&lt;soapenv:Body&gt;</span>
    <span class="xc-tag">&lt;ord:CreateOrderRequest&gt;</span>
      <span class="xc-tag">&lt;ord:customerId&gt;</span>CUST-001<span class="xc-tag">&lt;/ord:customerId&gt;</span>
      <span class="xc-tag">&lt;ord:productId&gt;</span>PROD-ABC<span class="xc-tag">&lt;/ord:productId&gt;</span>
      <span class="xc-tag">&lt;ord:quantity&gt;</span>3<span class="xc-tag">&lt;/ord:quantity&gt;</span>
      <span class="xc-tag">&lt;ord:totalAmount&gt;</span>15000.00<span class="xc-tag">&lt;/ord:totalAmount&gt;</span>
    <span class="xc-tag">&lt;/ord:CreateOrderRequest&gt;</span>
  <span class="xc-tag">&lt;/soapenv:Body&gt;</span>

<span class="xc-tag">&lt;/soapenv:Envelope&gt;</span>`,

  fastapi: `<span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI, HTTPException, Depends, Header
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel, Field
<span class="kw">from</span> typing <span class="kw">import</span> Optional
<span class="kw">from</span> datetime <span class="kw">import</span> datetime, timezone
<span class="kw">import</span> uuid, jwt, os, logging

logger = logging.<span class="fn">getLogger</span>(__name__)

app = <span class="fn">FastAPI</span>(
    title=<span class="st">"Order Service"</span>,
    version=<span class="st">"2.1.0"</span>,
    description=<span class="st">"SOAにおける注文管理サービス（ESB経由で呼び出される）"</span>
)

<span class="kw">class</span> <span class="fn">CreateOrderRequest</span>(BaseModel):
    customer_id:  str   = <span class="fn">Field</span>(..., description=<span class="st">"顧客ID"</span>)
    product_id:   str   = <span class="fn">Field</span>(..., description=<span class="st">"商品ID"</span>)
    quantity:     int   = <span class="fn">Field</span>(..., ge=<span class="nu">1</span>, description=<span class="st">"数量（1以上）"</span>)
    total_amount: float = <span class="fn">Field</span>(..., gt=<span class="nu">0</span>, description=<span class="st">"合計金額（0より大）"</span>)

<span class="kw">class</span> <span class="fn">CreateOrderResponse</span>(BaseModel):
    order_id:   str
    status:     str
    created_at: str
    message:    str

<span class="kw">async def</span> <span class="fn">verify_esb_token</span>(
    x_service_token: Optional[str] = <span class="fn">Header</span>(<span class="kw">None</span>),
    x_correlation_id: Optional[str] = <span class="fn">Header</span>(<span class="kw">None</span>),
):
    <span class="cm">"""</span>
<span class="cm">    ESBからの呼び出しであることを検証するミドルウェア。</span>
<span class="cm">    直接クライアントからの呼び出しを防ぐために使用する。</span>
<span class="cm">    """</span>
    <span class="kw">if not</span> x_service_token:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">401</span>, detail=<span class="st">"サービストークンが必要です"</span>)
    <span class="kw">try</span>:
        JWT_SECRET = os.<span class="fn">getenv</span>(<span class="st">"JWT_SECRET"</span>)
        <span class="kw">if not</span> JWT_SECRET:
            <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">500</span>, detail=<span class="st">"Server configuration error"</span>)
        jwt.<span class="fn">decode</span>(
            x_service_token,
            JWT_SECRET,
            algorithms=[<span class="st">"HS256"</span>],
            audience=<span class="st">"order-service"</span>
        )
    <span class="kw">except</span> jwt.ExpiredSignatureError:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">401</span>, detail=<span class="st">"トークンの有効期限が切れています"</span>)
    <span class="kw">except</span> jwt.InvalidTokenError:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">401</span>, detail=<span class="st">"無効なトークンです"</span>)
    <span class="kw">return</span> {<span class="st">"correlation_id"</span>: x_correlation_id <span class="kw">or</span> <span class="fn">str</span>(uuid.<span class="fn">uuid4</span>())}

@app.<span class="fn">post</span>(<span class="st">"/v2/orders"</span>, response_model=CreateOrderResponse, status_code=<span class="nu">201</span>)
<span class="kw">async def</span> <span class="fn">create_order</span>(
    request: CreateOrderRequest,
    auth: dict = <span class="fn">Depends</span>(verify_esb_token),
):
    <span class="cm">"""</span>
<span class="cm">    注文を作成するエンドポイント。</span>
<span class="cm">    ESBを経由して呼び出される（直接クライアントからは呼べない）。</span>
<span class="cm">    """</span>
    correlation_id = auth[<span class="st">"correlation_id"</span>]
    logger.<span class="fn">info</span>(f<span class="st">"[{correlation_id}] 注文作成リクエストを受信しました"</span>)

    order_id = f<span class="st">"ORD-{uuid.uuid4().hex[:8].upper()}"</span>

    <span class="kw">return</span> <span class="fn">CreateOrderResponse</span>(
        order_id=order_id,
        status=<span class="st">"CREATED"</span>,
        created_at=datetime.<span class="fn">now</span>(timezone.utc).<span class="fn">isoformat</span>(),
        message=<span class="st">"注文が正常に作成されました"</span>,
    )`,

  camel: `<span class="kw">import</span> org.apache.camel.builder.RouteBuilder;

<span class="cm">// Apache Camelを使ったESBルーティング設定例</span>
<span class="kw">public class</span> <span class="fn">OrderServiceRoute</span> <span class="kw">extends</span> RouteBuilder {
    @Override
    <span class="kw">public void</span> <span class="fn">configure</span>() <span class="kw">throws</span> Exception {

        <span class="cm">// エラーハンドリング：最大3回リトライ、指数バックオフ</span>
        <span class="fn">errorHandler</span>(
            <span class="fn">deadLetterChannel</span>(<span class="st">"jms:queue:error.orders"</span>)
                .<span class="fn">maximumRedeliveries</span>(<span class="nu">3</span>)
                .<span class="fn">redeliveryDelay</span>(<span class="nu">1000</span>)
                .<span class="fn">backOffMultiplier</span>(<span class="nu">2</span>)
                .<span class="fn">useExponentialBackOff</span>()
        );

        <span class="cm">// 注文処理ルート：JMSキューからメッセージを受信</span>
        <span class="fn">from</span>(<span class="st">"jms:queue:orders.incoming"</span>)
            .<span class="fn">setHeader</span>(<span class="st">"X-Correlation-Id"</span>, <span class="fn">simple</span>(<span class="st">"\${exchangeId}"</span>))
            .<span class="fn">log</span>(<span class="st">"注文受信: correlationId=\${header.X-Correlation-Id}"</span>)
            .<span class="fn">to</span>(<span class="st">"validator:schema/order-request.xsd"</span>) <span class="cm">// XSDバリデーション</span>

            <span class="cm">// コンテンツベースルーティング</span>
            .<span class="fn">choice</span>()
                .<span class="fn">when</span>(<span class="fn">xpath</span>(<span class="st">"//order/amount &gt; 1000000"</span>))
                    .<span class="fn">to</span>(<span class="st">"jms:queue:orders.review"</span>)  <span class="cm">// 高額注文は審査へ</span>
                .<span class="fn">when</span>(<span class="fn">xpath</span>(<span class="st">"//order/type = 'EXPRESS'"</span>))
                    .<span class="fn">to</span>(<span class="st">"direct:processExpressOrder"</span>)  <span class="cm">// 特急注文は優先処理</span>
                .<span class="fn">otherwise</span>()
                    .<span class="fn">to</span>(<span class="st">"direct:processStandardOrder"</span>)  <span class="cm">// 通常注文処理</span>
            .<span class="fn">end</span>();

        <span class="cm">// 標準注文処理：SOAP→REST変換してサービス呼び出し</span>
        <span class="fn">from</span>(<span class="st">"direct:processStandardOrder"</span>)
            .<span class="fn">marshal</span>().<span class="fn">jacksonXml</span>()
            .<span class="fn">convertBodyTo</span>(String.class)
            .<span class="fn">to</span>(<span class="st">"http://inventory-service/v1/check?httpMethod=POST"</span>)
            .<span class="fn">unmarshal</span>().<span class="fn">json</span>()
            .<span class="fn">to</span>(<span class="st">"cxf:https://payment-service/ws/v1?wsdlURL=payment.wsdl"</span>)
            .<span class="fn">to</span>(<span class="st">"jms:queue:orders.responses"</span>);
    }
}`,

  sla: `<span class="cm"># SLA定義例（サービスカタログに登録するYAML形式）</span>
<span class="kw">sla_definitions:</span>
  <span class="kw">order-service:</span>
    <span class="kw">availability:</span>
      <span class="kw">target:</span> <span class="nu">99.9</span>           <span class="cm"># 月次99.9%の可用性（月8.7時間の許容停止時間）</span>
      <span class="kw">measurement:</span> <span class="st">"月次計算（予定メンテナンスを除く）"</span>

    <span class="kw">response_time:</span>
      <span class="kw">p50_ms:</span> <span class="nu">100</span>            <span class="cm"># 中央値: 100ms以内</span>
      <span class="kw">p95_ms:</span> <span class="nu">300</span>            <span class="cm"># 95パーセンタイル: 300ms以内</span>
      <span class="kw">p99_ms:</span> <span class="nu">500</span>            <span class="cm"># 99パーセンタイル: 500ms以内（SLA閾値）</span>
      <span class="kw">max_ms:</span> <span class="nu">2000</span>           <span class="cm"># タイムアウト閾値</span>

    <span class="kw">throughput:</span>
      <span class="kw">normal_tps:</span> <span class="nu">100</span>        <span class="cm"># 通常時: 100 TPS</span>
      <span class="kw">peak_tps:</span>   <span class="nu">500</span>        <span class="cm"># ピーク時: 500 TPS</span>

    <span class="kw">error_rate:</span>
      <span class="kw">warning:</span>  <span class="nu">0.1</span>          <span class="cm"># 警告アラート: 0.1%</span>
      <span class="kw">critical:</span> <span class="nu">1.0</span>          <span class="cm"># 重大アラート: 1.0%</span>

    <span class="kw">recovery_time:</span>
      <span class="kw">rto_minutes:</span> <span class="nu">15</span>        <span class="cm"># Recovery Time Objective: 障害から15分で復旧</span>
      <span class="kw">rpo_minutes:</span> <span class="nu">5</span>         <span class="cm"># Recovery Point Objective: 5分前の状態に復旧</span>

    <span class="kw">alerting:</span>
      <span class="kw">channels:</span>
        - <span class="st">slack: "#ops-alerts"</span>
        - <span class="st">pagerduty: "order-service-oncall"</span>`,
};

export default function ServiceOrientedArchitectureComprehensiveGuide() {
  return (
    <div className="service-oriented-architecture-comprehensive-guide">
      <SoaSidebar groups={NAV_GROUPS} />

      <main className="main">
        {/* HERO */}
        <header className="site-header">
          <div className="badge">
            <IconBuilding size={16} /> アーキテクチャ完全ガイド
          </div>
          <h1>SOA（サービス指向アーキテクチャ）完全ガイド</h1>
          <p className="subtitle">
            初学者から実践者まで：設計原則・ESB・SOAP/REST・ガバナンス・事例を網羅
          </p>
        </header>

        {/* 目次 */}
        <nav className="toc-box" aria-label="目次">
          <h3>
            <IconList size={18} /> 目次
          </h3>
          <div className="toc-grid">
            {NAV_GROUPS.flatMap((g) => g.items).map((item, index) => (
              <div className="toc-item" key={item.id}>
                <span className="toc-num">{(index + 1).toString().padStart(2, "0")}</span>
                <a href={`#${item.id}`} className="toc-link">
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </nav>

        {/* ─── Section 1 ─── */}
        <section className="section" id="s1">
          <div className="section-header">
            <span className="section-num">01</span>
            <div className="section-icon icon-purple">
              <IconBuilding size={16} />
            </div>
            <h2>SOAとは何か</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconInfoCircle size={18} /> 定義と核心思想
            </h3>
            <p>
              SOA（Service-Oriented
              Architecture：サービス指向アーキテクチャ）は、アプリケーションの機能を
              <strong>再利用可能・独立したサービス</strong>
              として設計し、標準プロトコルで疎結合に連携させることで、システム全体の再利用性・柔軟性・相互運用性を高めるアーキテクチャスタイルです。
            </p>

            <div className="callout callout-info" style={{ marginTop: 16 }}>
              <IconBulb size={18} />
              <div className="callout-body">
                <strong>核心思想：</strong>
                「ビジネス機能をネットワーク越しに呼び出せる独立したサービスとして公開し、標準プロトコルで疎結合に連携させることで、システム全体の再利用性・柔軟性・相互運用性を高める」
              </div>
            </div>

            <p style={{ marginTop: 12 }}>
              2000年代初頭にエンタープライズシステムの統合課題を解決するために普及し、現在もレガシーシステム統合・大規模エンタープライズ・金融・官公庁系システムで広く採用されています。
            </p>
          </div>

          <div className="subsection">
            <h3>
              <IconHistory size={18} /> SOAが生まれた背景
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-1"
                style={{ minWidth: "850px" }}
                chart={`timeline
    title SOAの歴史的背景
    1990年代後半 : エンタープライズシステムの複雑化
                 : スパゲッティ統合（Point-to-Point）が限界に
    1996年       : Gartner が SOA という概念を初めて定義
    2000年代初頭 : XML・SOAP・WSDLなどWebサービス技術が標準化
                 : W3C・OASIS による仕様策定が進む
    2003〜2006年 : ESB（Enterprise Service Bus）製品が台頭
                 : IBM WebSphere・Oracle SOA Suite・TIBCO普及
    2006〜2010年 : SOAが大企業の標準アーキテクチャとして確立
                 : TOGAF・SOA参照モデルの整備
    2011〜現在   : マイクロサービスへの移行が始まる
                 : SOAはエンタープライズ統合基盤として継続活用`}
              />
              <div className="mermaid-label">diagram / timeline</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconAlertOctagon size={18} /> SOAが解決する問題：スパゲッティ統合からの脱却
            </h3>
            <p>
              SOA導入前のPoint-to-Point統合（スパゲッティ統合）では、システム間の直接依存が爆発的に増加し、変更・保守が困難になります。SOAはESBという共通通信基盤を置くことでこれを解決します。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-2"
                chart={`graph LR
    subgraph "SOA導入前：スパゲッティ統合"
        S1["受発注システム"]
        S2["会計システム"]
        S3["人事システム"]
        S4["在庫システム"]
        S5["物流システム"]
        S1 <-->|独自連携| S2
        S1 <-->|独自連携| S3
        S2 <-->|独自連携| S4
        S3 <-->|独自連携| S5
        S4 <-->|独自連携| S1
        S5 <-->|独自連携| S2
        S3 <-->|独自連携| S4
    end`}
              />
              <div className="mermaid-label">
                diagram / structural — 問題：変更に弱い・再利用できない・管理困難
              </div>
            </div>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-3"
                chart={`graph TD
    subgraph "SOA導入後：ESBによる統合"
        ESB["ESB（Enterprise Service Bus）<br>共通通信基盤"]
        SVC1["受発注サービス"]
        SVC2["会計サービス"]
        SVC3["人事サービス"]
        SVC4["在庫サービス"]
        SVC5["物流サービス"]
        SVC6["分析サービス"]
        SVC1 & SVC2 & SVC3 & SVC4 & SVC5 & SVC6 <--> ESB
    end`}
              />
              <div className="mermaid-label">
                diagram / structural — 解決：標準インターフェース・サービス再利用・集中管理
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconTarget size={18} /> SOAの適用領域
            </h3>
            <p>
              SOAは組織規模が大きく、複数システム間の統合が複雑なほど効果を発揮します。小規模・単純なシステムではオーバーエンジニアリングになる場合があります。
            </p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>適用領域</th>
                  <th>システム統合の複雑さ</th>
                  <th>組織規模</th>
                  <th>SOA効果</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>大手銀行・基幹統合</strong>
                  </td>
                  <td>非常に高い</td>
                  <td>大規模</td>
                  <td>
                    <span className="tag tag-teal">非常に高い</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>政府系・官公庁</strong>
                  </td>
                  <td>高い</td>
                  <td>大規模</td>
                  <td>
                    <span className="tag tag-teal">非常に高い</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>製造業ERP統合</strong>
                  </td>
                  <td>高い</td>
                  <td>中〜大</td>
                  <td>
                    <span className="tag tag-teal">高い</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>中堅企業SaaS統合</strong>
                  </td>
                  <td>中程度</td>
                  <td>中規模</td>
                  <td>
                    <span className="tag tag-purple">中程度</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>スタートアップMVP</strong>
                  </td>
                  <td>低い</td>
                  <td>小規模</td>
                  <td>
                    <span className="tag tag-coral">推奨しない</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                既存の異種システム（ERP・基幹・外部API）が多数存在し、統合コストが高い中〜大規模組織でSOAが最も価値を発揮します。
              </div>
            </div>
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.gartner.com/en/information-technology/insights/service-oriented-architecture">
                Gartner SOA Research
              </Ext>
              、
              <Ext href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/">
                TOGAF SOA Reference Architecture
              </Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 2 ─── */}
        <section className="section" id="s2">
          <div className="section-header">
            <span className="section-num">02</span>
            <div className="section-icon icon-teal">
              <IconColumns size={16} />
            </div>
            <h2>SOAの基本原則</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconStar size={18} /> SOA設計の8大原則（Thomas Erl の定義）
            </h3>
            <p>
              Thomas
              Erlが体系化したSOA設計の8大原則は、再利用性・疎結合・相互運用性を実現するための基盤です。
            </p>
            <div className="principle-grid">
              <div className="principle-card">
                <div className="p-num">01</div>
                <div className="p-title">標準化されたサービス契約</div>
                <div className="p-en">Standardized Service Contract</div>
                <div className="p-desc">
                  WSDL・OpenAPIで明示的なインターフェースを定義。内部実装ではなく「契約」に依存することで疎結合を実現する。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">02</div>
                <div className="p-title">サービスの疎結合</div>
                <div className="p-en">Service Loose Coupling</div>
                <div className="p-desc">
                  サービス間の依存を最小化し、一方が変更されても他方に影響しない設計にする。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">03</div>
                <div className="p-title">サービスの抽象化</div>
                <div className="p-en">Service Abstraction</div>
                <div className="p-desc">
                  内部実装を隠蔽し、コントラクト（契約）のみを外部に公開する。実装変更が消費者に影響しない。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">04</div>
                <div className="p-title">サービスの再利用性</div>
                <div className="p-en">Service Reusability</div>
                <div className="p-desc">
                  複数のコンテキストで再利用可能なよう、特定のビジネスプロセスに依存しない汎用的な設計にする。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">05</div>
                <div className="p-title">サービスの自律性</div>
                <div className="p-en">Service Autonomy</div>
                <div className="p-desc">
                  自身のロジックと実行環境を制御できる独立性を持つ。他サービスの状態に依存しない。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">06</div>
                <div className="p-title">ステートレス性</div>
                <div className="p-en">Service Statelessness</div>
                <div className="p-desc">
                  セッション状態を持たず、スケーラビリティを確保する。状態管理は呼び出し元の責務。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">07</div>
                <div className="p-title">サービスの発見可能性</div>
                <div className="p-en">Service Discoverability</div>
                <div className="p-desc">
                  レジストリで発見・管理可能なようメタデータを充実させる。ドキュメント化と検索性が重要。
                </div>
              </div>
              <div className="principle-card">
                <div className="p-num">08</div>
                <div className="p-title">組み合わせ可能性</div>
                <div className="p-en">Service Composability</div>
                <div className="p-desc">
                  複数のサービスを組み合わせて上位の複合サービスを構成できる。再利用の最終形態。
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.serviceorientation.com/">
                Thomas Erl — SOA Manifesto &amp; Design Principles
              </Ext>
            </p>
          </div>

          <div className="subsection">
            <h3>
              <IconLink size={18} /> 疎結合の実現方法
            </h3>
            <p>密結合と疎結合の違いを理解することが、SOA設計の出発点です。</p>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-4"
                chart={`flowchart LR
    subgraph BAD["密結合（アンチパターン）"]
        A_SVC["サービスA\\n（呼び出し側）"]
        B_SVC["サービスB\\n（提供側）"]
        A_SVC -->|"Bの内部クラスを直接インポート"| B_SVC
    end
    subgraph GOOD["疎結合（SOAパターン）"]
        C_SVC["サービスC\\n（呼び出し側）"]
        CONTRACT["サービス契約\\nWSDL / OpenAPI"]
        D_SVC["サービスD\\n（提供側）"]
        C_SVC -->|"契約に従い呼び出し"| CONTRACT
        CONTRACT -->|"実装を隠蔽"| D_SVC
    end`}
              />
              <div className="mermaid-label">diagram / structural</div>
            </div>

            <div className="compare-grid">
              <div className="compare-card">
                <div className="cc-head">
                  <span className="tag tag-coral">密結合</span>
                </div>
                <ul>
                  <li>Bの変更がAに即影響する</li>
                  <li>単独テストが困難</li>
                  <li>バージョン管理が複雑</li>
                  <li>デプロイが連動してしまう</li>
                </ul>
              </div>
              <div className="compare-card">
                <div className="cc-head">
                  <span className="tag tag-teal">疎結合（SOA）</span>
                </div>
                <ul>
                  <li>契約が変わらなければ独立して変更可能</li>
                  <li>単独テストが容易</li>
                  <li>バージョン管理が明確</li>
                  <li>独立デプロイが可能</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconArrowsMaximize size={18} /> サービスの粒度（Granularity）の考え方
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-5"
                chart={`graph TD
    GRANULARITY["サービス粒度の設計"]
    COARSE["粗粒度サービス（Coarse-Grained）\\n例：注文管理サービス\\n注文の作成・更新・照会・キャンセルを含む"]
    FINE["細粒度サービス（Fine-Grained）\\n例：注文作成サービス・注文照会サービス（個別）"]
    BALANCE["SOAのベストプラクティス\\nビジネスエンティティ単位で粗粒度に設計し\\n内部でアーキテクチャ上の細粒度を持つ"]
    GRANULARITY --> COARSE & FINE
    COARSE & FINE --> BALANCE`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>粒度</th>
                  <th>メリット</th>
                  <th>デメリット</th>
                  <th>推奨用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>粗粒度</strong>
                  </td>
                  <td>通信オーバーヘッド少・トランザクション管理容易</td>
                  <td>再利用性低い・変更影響大</td>
                  <td>ビジネスエンティティ単位の外部API</td>
                </tr>
                <tr>
                  <td>
                    <strong>細粒度</strong>
                  </td>
                  <td>再利用性高・独立変更容易</td>
                  <td>通信コスト大・Orchestrationが複雑</td>
                  <td>内部実装・ユーティリティ機能</td>
                </tr>
              </tbody>
            </table>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                外部向けAPIは「注文サービス（粗粒度）」として設計し、内部では「注文作成ロジック」「在庫チェック」などを細粒度で実装するハイブリッドアプローチが最適です。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3 ─── */}
        <section className="section" id="s3">
          <div className="section-header">
            <span className="section-num">03</span>
            <div className="section-icon icon-purple">
              <IconHierarchy2 size={16} />
            </div>
            <h2>SOAの主要コンポーネント</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconLayoutDistributeVertical size={18} /> SOAリファレンスアーキテクチャ
            </h3>
            <p>
              SOAは複数の層（レイヤー）から構成されます。各層の役割を理解することが設計の基本です。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-6"
                chart={`graph TD
    subgraph CON["サービスコンシューマー層"]
        WEB["Webアプリ"]
        MOB["モバイルアプリ"]
        PAR["パートナーシステム"]
        LEG_C["レガシークライアント"]
    end
    subgraph GW["サービスゲートウェイ層"]
        API_GW["API Gateway\\n認証・認可・スロットリング・プロトコル変換"]
    end
    subgraph ESB_L["ESBレイヤー（中核）"]
        ESB_C["ESB（Enterprise Service Bus）\\nルーティング・変換・オーケストレーション・監視"]
    end
    subgraph SVC_L["サービス層"]
        BS["ビジネスサービス\\n注文・顧客・請求"]
        ES["エンティティサービス\\n商品・口座"]
        US["ユーティリティサービス\\n認証・通知・監査"]
    end
    subgraph REG["サービスレジストリ"]
        UDDI_R["UDDI / サービスカタログ\\nサービスの登録・検索・管理"]
    end
    subgraph BK["バックエンド層"]
        DB1["基幹DB"]
        LEG_S["レガシーシステム"]
        EXT["外部API"]
    end
    CON --> GW --> ESB_L
    ESB_L --> SVC_L
    ESB_L <--> REG
    SVC_L --> BK`}
              />
              <div className="mermaid-label">diagram / structural</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconCategory size={18} /> サービスの3分類
            </h3>
            <p>
              SOAのサービスは役割によって3種類に分類されます。分類を意識することで再利用性と保守性が向上します。
            </p>

            <div className="service-tier">
              <div className="st-header purple">
                <IconBriefcase size={16} /> Business Services（ビジネスサービス）
              </div>
              <div className="st-body">
                <p>
                  ビジネスプロセスを直接反映したサービス。ドメインエキスパートが定義に関与する。再利用頻度は中程度。
                </p>
                <ul>
                  <li>注文処理サービス（Order Processing）</li>
                  <li>与信審査サービス（Credit Check）</li>
                  <li>保険引受サービス（Underwriting）</li>
                </ul>
              </div>
            </div>

            <div className="service-tier">
              <div className="st-header teal">
                <IconDatabase size={16} /> Entity Services（エンティティサービス）
              </div>
              <div className="st-body">
                <p>
                  特定のビジネスエンティティを管理するサービス。CRUD操作を提供し、高い再利用性を持つ。
                </p>
                <ul>
                  <li>顧客マスタサービス（Customer）</li>
                  <li>商品マスタサービス（Product）</li>
                  <li>口座サービス（Account）</li>
                </ul>
              </div>
            </div>

            <div className="service-tier">
              <div className="st-header coral">
                <IconTools size={16} /> Utility Services（ユーティリティサービス）
              </div>
              <div className="st-body">
                <p>
                  業務ドメインに依存しない汎用的な機能を提供。最高の再利用性を持ち、複数サービスから呼び出される。
                </p>
                <ul>
                  <li>通知サービス（Notification）</li>
                  <li>監査ログサービス（Audit）</li>
                  <li>暗号化サービス（Encryption）</li>
                </ul>
              </div>
            </div>

            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                新規サービスを設計する際は必ずこの3分類のどれに属するかを定義してください。分類することで所有者・再利用範囲・変更ポリシーが自動的に決まります。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4 ─── */}
        <section className="section" id="s4">
          <div className="section-header">
            <span className="section-num">04</span>
            <div className="section-icon icon-teal">
              <IconBus size={16} />
            </div>
            <h2>ESB（エンタープライズ・サービス・バス）</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconInfoCircle size={18} /> ESBとは
            </h3>
            <div className="inline-def">
              <div className="id-term">Enterprise Service Bus（ESB）</div>
              <div className="id-def">
                SOAの中核インフラ。複数サービス間のメッセージルーティング・プロトコル変換・データ変換・オーケストレーションを一元管理するミドルウェア基盤。「バス」のようにすべてのサービスをつなぐ通信基盤。
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconGridDots size={18} /> ESBの6大機能
            </h3>
            <div className="esb-feature-grid">
              <div className="esb-card">
                <div className="ec-head">
                  <IconRoute size={16} /> メッセージルーティング
                </div>
                <div className="ec-desc">
                  コンテンツ・ヘッダー・優先度に基づいて適切なサービスへメッセージを転送する。ロードバランシングも担う。
                </div>
              </div>
              <div className="esb-card">
                <div className="ec-head">
                  <IconArrowsExchange size={16} /> プロトコル変換
                </div>
                <div className="ec-desc">
                  SOAP ⇔ REST、HTTP ⇔ JMS、FTP ⇔ HTTP など異なるプロトコル間の変換を透過的に行う。
                </div>
              </div>
              <div className="esb-card">
                <div className="ec-head">
                  <IconRefresh size={16} /> データ変換
                </div>
                <div className="ec-desc">
                  XML ⇔ JSON、CSV ⇔ XML
                  など形式変換とスキーマバリデーションを実行する（XSLT・DataWeave等）。
                </div>
              </div>
              <div className="esb-card">
                <div className="ec-head">
                  <IconHierarchy2 size={16} /> オーケストレーション
                </div>
                <div className="ec-desc">
                  BPEL実行エンジンで複数サービスの協調動作・ワークフロー管理・補償トランザクションを制御する。
                </div>
              </div>
              <div className="esb-card">
                <div className="ec-head">
                  <IconShieldLock size={16} /> セキュリティ適用
                </div>
                <div className="ec-desc">
                  WS-Securityによるメッセージ暗号化・認証認可・監査ログを一元的に適用する。
                </div>
              </div>
              <div className="esb-card">
                <div className="ec-head">
                  <IconChartBar size={16} /> 監視・管理
                </div>
                <div className="ec-desc">
                  メッセージトレース・SLA監視・エラー管理・パフォーマンス計測をリアルタイムで提供する。
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconGitBranch size={18} /> ESBのメッセージフロー
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-7"
                chart={`sequenceDiagram
    participant CLI as クライアント
    participant ESB as ESB
    participant AUTH as 認証サービス
    participant ORDER as 注文サービス
    participant NOTIFY as 通知サービス
    CLI->>ESB: SOAPリクエスト（注文作成）
    ESB->>AUTH: 認証トークン検証
    AUTH-->>ESB: 認証OK
    ESB->>ESB: ルーティング判定
    ESB->>ESB: SOAP→REST、XML→JSON変換
    ESB->>ORDER: POST /orders（REST）
    ORDER-->>ESB: 注文作成結果（JSON）
    ESB->>ESB: JSON→XML変換
    ESB--)NOTIFY: OrderCreatedEvent（非同期・JMS）
    ESB-->>CLI: SOAPレスポンス`}
              />
              <div className="mermaid-label">diagram / sequence</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconPackage size={18} /> ESB主要製品・OSSの比較
            </h3>
            <div className="product-grid">
              <div className="product-card">
                <div className="pc-cat">OSS</div>
                <div className="pc-name">Apache Camel</div>
                <div className="pc-pros">
                  + 軽量・高性能
                  <br />+ 300以上のコンポーネント
                  <br />+ Javaと親和性高い
                </div>
                <div className="pc-cons">- GUIツールが限定的</div>
              </div>
              <div className="product-card">
                <div className="pc-cat">OSS</div>
                <div className="pc-name">WSO2 EI</div>
                <div className="pc-pros">
                  + フルOSS
                  <br />+ API管理も統合
                  <br />+ Ballerina言語
                </div>
                <div className="pc-cons">- 学習コストやや高め</div>
              </div>
              <div className="product-card">
                <div className="pc-cat">OSS</div>
                <div className="pc-name">MuleSoft（無償版）</div>
                <div className="pc-pros">
                  + 豊富なコネクタ
                  <br />+ DataWeaveで変換
                </div>
                <div className="pc-cons">- 学習コスト高め</div>
              </div>
              <div className="product-card">
                <div className="pc-cat">商用</div>
                <div className="pc-name">IBM App Connect</div>
                <div className="pc-pros">
                  + 豊富なエンタープライズ実績
                  <br />+ 強力なサポート
                </div>
                <div className="pc-cons">- ライセンスコスト高</div>
              </div>
              <div className="product-card">
                <div className="pc-cat">商用</div>
                <div className="pc-name">Oracle SOA Suite</div>
                <div className="pc-pros">
                  + BPEL/BPMN対応
                  <br />+ Oracle製品と統合
                </div>
                <div className="pc-cons">- 構築コスト高</div>
              </div>
              <div className="product-card">
                <div className="pc-cat">クラウド</div>
                <div className="pc-name">AWS EventBridge</div>
                <div className="pc-pros">
                  + サーバーレス
                  <br />+ スケーラビリティ
                  <br />+ マネージド
                </div>
                <div className="pc-cons">- ベンダーロックイン</div>
              </div>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                新規案件では Apache Camel（Java環境）または WSO2
                EI（フルスタック統合が必要な場合）から検討してください。既存IBM/Oracle環境がある場合はその製品エコシステムに沿うのが現実的です。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              参考：
              <Ext href="https://camel.apache.org/manual/latest/index.html">Apache Camel 公式</Ext>
              、<Ext href="https://wso2.com/integration/">WSO2 Enterprise Integrator</Ext>、
              <Ext href="https://www.ibm.com/products/app-connect">IBM App Connect</Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 5 ─── */}
        <section className="section" id="s5">
          <div className="section-header">
            <span className="section-num">05</span>
            <div className="section-icon icon-purple">
              <IconPuzzle size={16} />
            </div>
            <h2>サービスの設計パターン</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconTemplate size={18} /> SOA主要デザインパターン
            </h3>

            <div className="pattern-card">
              <div className="pat-icon icon-purple">
                <IconHierarchy2 size={16} />
              </div>
              <div>
                <div className="pat-title">オーケストレーション（Orchestration）</div>
                <div className="pat-en">
                  中央のESBコントローラーが複数サービスを制御・順序付けする
                </div>
                <div className="pat-desc">
                  ESBが「指揮者」として各サービスを呼び出す順序・条件を一元管理する。全体フローの可視性が高いが、ESBが単一障害点になるリスクがある。
                </div>
              </div>
            </div>

            <div className="pattern-card">
              <div className="pat-icon icon-teal">
                <IconWaveSine size={16} />
              </div>
              <div>
                <div className="pat-title">コレオグラフィー（Choreography）</div>
                <div className="pat-en">イベント駆動で各サービスが自律的に協調動作する</div>
                <div className="pat-desc">
                  中央の指揮者がなく、各サービスがイベントを受け取り自律的に次のアクションを実行する。高い疎結合を実現するが、全体フローの把握が難しい。
                </div>
              </div>
            </div>

            <div className="pattern-card">
              <div className="pat-icon icon-coral">
                <IconRoute size={16} />
              </div>
              <div>
                <div className="pat-title">サービスファサード（Service Facade）</div>
                <div className="pat-en">複雑な内部サービスをシンプルなインターフェースで包む</div>
                <div className="pat-desc">
                  複数の内部サービスを束ね、外部には単一のシンプルなAPIとして公開する。クライアントの複雑さを軽減し、内部変更の影響を遮断する。
                </div>
              </div>
            </div>

            <div className="pattern-card">
              <div className="pat-icon icon-amber">
                <IconGitMerge size={16} />
              </div>
              <div>
                <div className="pat-title">サービスアグリゲーター（Service Aggregator）</div>
                <div className="pat-en">複数サービスの結果を集約して返す</div>
                <div className="pat-desc">
                  複数のサービスを並列または順次呼び出し、その結果をひとつのレスポンスにまとめる。BFF（Backend
                  for Frontend）パターンの基礎でもある。
                </div>
              </div>
            </div>

            <div className="pattern-card">
              <div className="pat-icon icon-blue">
                <IconGitBranch size={16} />
              </div>
              <div>
                <div className="pat-title">サービスバージョニング（Service Versioning）</div>
                <div className="pat-en">後方互換性を保ちながらサービスを進化させる</div>
                <div className="pat-desc">
                  既存コンシューマーを壊さずにサービスのインターフェースを変更するための戦略。URLパス・HTTPヘッダー・クエリパラメータの3方式がある。
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconArrowsDiff size={18} /> オーケストレーション vs コレオグラフィー
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-8"
                chart={`graph TD
    subgraph ORCH["オーケストレーション（ESB中央制御）"]
        direction TB
        ESB_O["ESBオーケストレーションエンジン（中央司令官）"]
        O_A["サービスA: 注文作成"]
        O_B["サービスB: 在庫確認"]
        O_C["サービスC: 決済処理"]
        O_D["サービスD: 通知送信"]
        ESB_O -->|"1 呼び出し"| O_A
        ESB_O -->|"2 在庫確認"| O_B
        ESB_O -->|"3 決済実行"| O_C
        ESB_O -->|"4 通知"| O_D
    end
    subgraph CHOREO["コレオグラフィー（イベント駆動）"]
        direction TB
        CH_BUS["イベントバス"]
        C_A["注文サービス"]
        C_B["在庫サービス"]
        C_C["決済サービス"]
        C_D["通知サービス"]
        C_A -->|"OrderCreated"| CH_BUS
        CH_BUS -->|"購読"| C_B
        C_B -->|"StockReserved"| CH_BUS
        CH_BUS -->|"購読"| C_C
        C_C -->|"PaymentCompleted"| CH_BUS
        CH_BUS -->|"購読"| C_D
    end`}
              />
              <div className="mermaid-label">diagram / structural</div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>観点</th>
                  <th>オーケストレーション</th>
                  <th>コレオグラフィー</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>制御方式</strong>
                  </td>
                  <td>中央集中（ESBが制御）</td>
                  <td>分散自律（イベント駆動）</td>
                </tr>
                <tr>
                  <td>
                    <strong>可視性</strong>
                  </td>
                  <td>フローが一元管理・見やすい</td>
                  <td>全体フローの把握が難しい</td>
                </tr>
                <tr>
                  <td>
                    <strong>疎結合度</strong>
                  </td>
                  <td>中程度（ESBへの依存あり）</td>
                  <td>高い（直接依存がない）</td>
                </tr>
                <tr>
                  <td>
                    <strong>障害点</strong>
                  </td>
                  <td>ESBが単一障害点になりやすい</td>
                  <td>分散型で単一障害点なし</td>
                </tr>
                <tr>
                  <td>
                    <strong>適用場面</strong>
                  </td>
                  <td>複雑な承認フロー・順序が重要な処理</td>
                  <td>高トラフィック・疎結合重視の設計</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="subsection">
            <h3>
              <IconTag size={18} /> サービスバージョニング戦略
            </h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>方式</th>
                  <th>例</th>
                  <th>メリット</th>
                  <th>デメリット</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>URLパスバージョニング</strong>
                  </td>
                  <td>
                    <code>/v1/orders</code>
                    <br />
                    <code>/v2/orders</code>
                  </td>
                  <td>最もわかりやすい・一般的</td>
                  <td>URLが変わる</td>
                </tr>
                <tr>
                  <td>
                    <strong>HTTPヘッダー</strong>
                  </td>
                  <td>
                    <code>Accept: application/vnd.api+json;version=2</code>
                  </td>
                  <td>URLをクリーンに保てる</td>
                  <td>実装が複雑</td>
                </tr>
                <tr>
                  <td>
                    <strong>クエリパラメータ</strong>
                  </td>
                  <td>
                    <code>/orders?version=2</code>
                  </td>
                  <td>シンプルな実装</td>
                  <td>キャッシュが複雑</td>
                </tr>
                <tr>
                  <td>
                    <strong>WSDLバージョニング（SOAP）</strong>
                  </td>
                  <td>
                    <code>urn:example:orders:v2</code>
                  </td>
                  <td>SOAP標準に準拠</td>
                  <td>クライアント再生成が必要</td>
                </tr>
              </tbody>
            </table>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                新バージョンは別URLで公開し、旧バージョンは少なくとも6〜12ヶ月は維持してください。廃止予告は
                <code>Deprecation</code>
                ヘッダーで通知し、コンシューマーへの移行サポート期間を必ず設けましょう。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 6 ─── */}
        <section className="section" id="s6">
          <div className="section-header">
            <span className="section-num">06</span>
            <div className="section-icon icon-teal">
              <IconScale size={16} />
            </div>
            <h2>SOA vs マイクロサービス</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconColumns size={18} /> 詳細比較
            </h3>
            <div className="compare-grid">
              <div className="compare-card">
                <div className="cc-head" style={{ color: "var(--c-purple-200)" }}>
                  <IconBuilding size={16} style={{ color: "var(--c-purple-400)" }} /> SOAの特徴
                </div>
                <ul>
                  <li>ESBを中心とした集中型統合</li>
                  <li>WS-* / SOAP / XMLが基本</li>
                  <li>共有データモデル・共有DBが多い</li>
                  <li>サービスサイズは中〜大</li>
                  <li>エンタープライズ向け</li>
                  <li>既存システム統合に強い</li>
                  <li>分散トランザクション管理が充実</li>
                  <li>BPEL/BPMNでプロセス管理</li>
                </ul>
              </div>
              <div className="compare-card">
                <div className="cc-head" style={{ color: "var(--c-teal-200)" }}>
                  <IconCpu size={16} style={{ color: "var(--c-teal-400)" }} />{" "}
                  マイクロサービスの特徴
                </div>
                <ul>
                  <li>APIゲートウェイ + 直接通信</li>
                  <li>REST / gRPC / Kafkaが基本</li>
                  <li>DB per Serviceが原則</li>
                  <li>サービスサイズは小</li>
                  <li>クラウドネイティブ向け</li>
                  <li>独立デプロイが容易</li>
                  <li>結果整合性が基本</li>
                  <li>CI/CDによる自動化が前提</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconRoute size={18} /> SOAからマイクロサービスへの移行判断
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-9"
                chart={`flowchart TD
    START["SOAからの移行を検討する"]
    Q1{"ESBがボトルネックに\\nなっているか？"}
    Q2{"各チームが独立して\\nデプロイしたいか？"}
    Q3{"クラウドネイティブな\\nスケーリングが必要か？"}
    Q4{"既存の大規模エンタープライズ\\n統合が多くあるか？"}
    Q5{"組織がDevOpsに\\n成熟しているか？"}
    STAY["SOAを継続・最適化\\nESBチューニング + API管理レイヤー追加"]
    HYBRID["ハイブリッドアプローチ\\n新機能はマイクロサービス\\n既存統合はSOAを維持"]
    GO_MS["マイクロサービスへ移行\\nStrangler Figパターンで段階的に"]
    START --> Q1
    Q1 -->|No| STAY
    Q1 -->|Yes| Q2
    Q2 -->|No| STAY
    Q2 -->|Yes| Q3
    Q3 -->|No| Q4
    Q3 -->|Yes| Q5
    Q4 -->|Yes 多い| HYBRID
    Q4 -->|No| Q5
    Q5 -->|No 未成熟| HYBRID
    Q5 -->|Yes| GO_MS`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
            <div className="callout callout-info">
              <IconInfoCircle size={18} />
              <div className="callout-body">
                <strong>Strangler Figパターン：</strong>
                既存SOAを一括置換するのではなく、新機能から順次マイクロサービスとして実装し、段階的に移行する手法。リスクを最小化しながら現代化できる。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              参考：
              <Ext href="https://martinfowler.com/articles/microservices.html">
                Martin Fowler — Microservices
              </Ext>
              、
              <Ext href="https://aws.amazon.com/compare/the-difference-between-soa-microservices/">
                AWS: SOA vs Microservices
              </Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 7 ─── */}
        <section className="section" id="s7">
          <div className="section-header">
            <span className="section-num">07</span>
            <div className="section-icon icon-blue">
              <IconCode size={16} />
            </div>
            <h2>Webサービス技術スタック（SOAP / REST / WSDL）</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconStack size={18} /> WS-* 技術スタック全体像
            </h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>層</th>
                  <th>技術・仕様</th>
                  <th>役割</th>
                  <th>標準化団体</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>トランスポート</strong>
                  </td>
                  <td>HTTP/HTTPS、JMS、FTP</td>
                  <td>メッセージの物理的な転送</td>
                  <td>IETF・W3C</td>
                </tr>
                <tr>
                  <td>
                    <strong>メッセージング</strong>
                  </td>
                  <td>SOAP 1.1 / 1.2</td>
                  <td>XMLベースのメッセージ形式定義</td>
                  <td>W3C</td>
                </tr>
                <tr>
                  <td>
                    <strong>サービス記述</strong>
                  </td>
                  <td>WSDL 2.0</td>
                  <td>インターフェース・操作・バインディングの定義</td>
                  <td>W3C</td>
                </tr>
                <tr>
                  <td>
                    <strong>サービス発見</strong>
                  </td>
                  <td>UDDI</td>
                  <td>サービスレジストリ・検索</td>
                  <td>OASIS</td>
                </tr>
                <tr>
                  <td>
                    <strong>セキュリティ</strong>
                  </td>
                  <td>WS-Security、WS-Trust、SAML 2.0</td>
                  <td>メッセージ暗号化・認証・SSO</td>
                  <td>OASIS</td>
                </tr>
                <tr>
                  <td>
                    <strong>信頼性</strong>
                  </td>
                  <td>WS-ReliableMessaging</td>
                  <td>確実なメッセージ配信保証</td>
                  <td>OASIS</td>
                </tr>
                <tr>
                  <td>
                    <strong>トランザクション</strong>
                  </td>
                  <td>WS-AtomicTransaction</td>
                  <td>分散トランザクションのACID保証</td>
                  <td>OASIS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="subsection">
            <h3>
              <IconFileCode size={18} /> WSDLの構造（コントラクトファースト設計の要）
            </h3>
            <p>
              WSDLは「サービスの設計図」です。実装より先にWSDLを定義することをコントラクトファースト開発といい、SOAの基本的なベストプラクティスです。
            </p>
            <div className="xml-block">
              {/* biome-ignore format: HTML pre tags are sensitive to whitespace */}
              <pre><code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.wsdl }} /></pre>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconFileCode size={18} /> SOAPメッセージの構造
            </h3>
            <div className="xml-block">
              {/* biome-ignore format: HTML pre tags are sensitive to whitespace */}
              <pre><code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.soap }} /></pre>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconArrowsExchange size={18} /> SOAP vs REST の使い分け判断
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-10"
                chart={`flowchart TD
    DECIDE["SOAのプロトコルを選択する"]
    Q1{"エンタープライズ統合か？\\n金融・官公庁・SAP連携"}
    Q2{"WS-AtomicTransactionによる\\n厳密なトランザクション管理が必要か？"}
    Q3{"WS-SecurityやSAMLによる\\nメッセージレベル暗号化が必要か？"}
    Q4{"モバイル・Webアプリ・パブリックAPI向けか？"}
    USE_SOAP["SOAP / WS-* を使用\\n厳密なエラー処理・ACID TX・WS-Security"]
    USE_REST["REST を使用\\nシンプル・軽量JSON・OpenAPI"]
    BOTH["ESBでプロトコル変換して共存\\n内部はSOAP、外部はRESTなど"]
    DECIDE --> Q1
    Q1 -->|Yes| Q2
    Q1 -->|No| Q4
    Q2 -->|Yes| USE_SOAP
    Q2 -->|No| Q3
    Q3 -->|Yes| USE_SOAP
    Q3 -->|No| BOTH
    Q4 -->|Yes| USE_REST`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                内部システム間はWS-SOAP（厳密な型定義・セキュリティ）、外部パートナー・フロントエンド向けにはREST/JSONをESBで変換して公開するハイブリッド構成が現実的かつ一般的です。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.w3.org/TR/wsdl20/">WSDL 2.0 仕様（W3C）</Ext>、
              <Ext href="https://www.w3.org/TR/soap12/">SOAP 1.2 仕様（W3C）</Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 8 ─── */}
        <section className="section" id="s8">
          <div className="section-header">
            <span className="section-num">08</span>
            <div className="section-icon icon-teal">
              <IconBook size={16} />
            </div>
            <h2>サービスレジストリとサービスディスカバリ</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconDatabase size={18} /> サービスレジストリの役割
            </h3>
            <p>
              サービスレジストリは「SOAの電話帳」です。提供者がサービスを登録し、消費者が検索・発見するための中央カタログです。
            </p>

            <div className="registry-info">
              <div className="ri-card">
                <IconUpload size={22} />
                <div className="rc-title">サービス提供者</div>
                <div className="rc-desc">
                  サービスを実装後、レジストリにエンドポイント・WSDL・SLAを登録する
                </div>
              </div>
              <div className="ri-card">
                <IconBook size={22} />
                <div className="rc-title">レジストリ本体</div>
                <div className="rc-desc">
                  名前・バージョン・URL・SLA・所有者・依存サービス等のメタデータを管理
                </div>
              </div>
              <div className="ri-card">
                <IconSearch size={22} />
                <div className="rc-title">サービス消費者</div>
                <div className="rc-desc">
                  レジストリで目的 of サービスを検索しエンドポイントを取得して呼び出す
                </div>
              </div>
            </div>

            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-11"
                chart={`graph TD
    PROVIDER["サービス提供者"]
    REGISTRY["サービスレジストリ\\nUDDI / カスタムカタログ"]
    CONSUMER["サービス消費者"]
    PROVIDER -->|"1 サービスを登録"| REGISTRY
    CONSUMER -->|"2 サービスを検索"| REGISTRY
    REGISTRY -->|"3 エンドポイントを返す"| CONSUMER
    CONSUMER -->|"4 サービスを呼び出す"| PROVIDER`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconFileDescription size={18} /> サービスカタログに登録すべき情報
            </h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>登録項目</th>
                  <th>重要度</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>識別情報</strong>
                  </td>
                  <td>サービス名・バージョン・説明</td>
                  <td>
                    <span className="tag tag-coral">必須</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>エンドポイント</strong>
                  </td>
                  <td>本番・ステージングURL（SOAP/REST）</td>
                  <td>
                    <span className="tag tag-coral">必須</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>SLA</strong>
                  </td>
                  <td>SLA（可用性・応答時間P99・メンテナンス時間）</td>
                  <td>
                    <span className="tag tag-coral">必須</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>プロトコル</strong>
                  </td>
                  <td>SOAP/REST・認証方式（OAuth2/WS-Security）</td>
                  <td>
                    <span className="tag tag-coral">必須</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>依存関係</strong>
                  </td>
                  <td>依存するサービス一覧（名前・バージョン）</td>
                  <td>
                    <span className="tag tag-amber">推奨</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ドキュメント</strong>
                  </td>
                  <td>WSDL・OpenAPI・Wikiリンク</td>
                  <td>
                    <span className="tag tag-amber">推奨</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>オーナー情報</strong>
                  </td>
                  <td>チーム名・連絡先メール</td>
                  <td>
                    <span className="tag tag-amber">推奨</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>タグ</strong>
                  </td>
                  <td>core・business-critical等の分類タグ</td>
                  <td>
                    <span className="tag tag-purple">任意</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                サービスカタログの更新をデプロイプロセスに組み込み（CI/CD）、手動更新を不要にしてください。古いカタログは「存在しないのと同じ」です。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.oasis-open.org/committees/uddi-spec/">UDDI 仕様（OASIS）</Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 9 ─── */}
        <section className="section" id="s9">
          <div className="section-header">
            <span className="section-num">09</span>
            <div className="section-icon icon-red">
              <IconShieldLock size={16} />
            </div>
            <h2>セキュリティ設計</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconLayersIntersect size={18} /> SOAセキュリティの多層防御
            </h3>
            <p>
              SOAセキュリティは単一の対策ではなく、トランスポートからビジネス層まで複数のレイヤーで保護する多層防御（Defense
              in Depth）アプローチが基本です。
            </p>

            <div className="security-layer">
              <div className="sec-row">
                <div className="sr-icon icon-red">
                  <IconLock size={16} />
                </div>
                <div>
                  <div className="sr-label">Layer 1 — 境界セキュリティ</div>
                  <div className="sr-title">
                    ファイアウォール / WAF（Webアプリケーションファイアウォール）
                  </div>
                  <div className="sr-desc">
                    ネットワーク境界でSQLインジェクション・XSSなど既知の攻撃パターンをブロックする。DMZにAPIゲートウェイを配置する。
                  </div>
                </div>
              </div>
              <div className="sec-row">
                <div className="sr-icon icon-blue">
                  <IconKey size={16} />
                </div>
                <div>
                  <div className="sr-label">Layer 2 — トランスポートセキュリティ</div>
                  <div className="sr-title">TLS 1.3 / HTTPS + mTLS（相互TLS）</div>
                  <div className="sr-desc">
                    通信経路を暗号化する。サービス間通信では双方向TLS（mTLS）で相互認証を実施し、なりすましを防止する。
                  </div>
                </div>
              </div>
              <div className="sec-row">
                <div className="sr-icon icon-purple">
                  <IconShieldLock size={16} />
                </div>
                <div>
                  <div className="sr-label">Layer 3 — メッセージセキュリティ（WS-Security）</div>
                  <div className="sr-title">XML Encryption + XML Signature</div>
                  <div className="sr-desc">
                    トランスポートに依存せずメッセージ本体を暗号化・署名する。中間ノードを経由しても機密性・完全性を保証できる点がSOAの強み。
                  </div>
                </div>
              </div>
              <div className="sec-row">
                <div className="sr-icon icon-green">
                  <IconUserShield size={16} />
                </div>
                <div>
                  <div className="sr-label">Layer 4 — ID管理・認証認可</div>
                  <div className="sr-title">SAML 2.0 SSO / OAuth 2.0 / RBAC</div>
                  <div className="sr-desc">
                    シングルサインオンによる統合認証と、サービス操作レベルのRBAC（役割ベースアクセス制御）を組み合わせる。
                  </div>
                </div>
              </div>
              <div className="sec-row">
                <div className="sr-icon icon-amber">
                  <IconListCheck size={16} />
                </div>
                <div>
                  <div className="sr-label">Layer 5 — 監査・コンプライアンス</div>
                  <div className="sr-title">全メッセージの監査ログ</div>
                  <div className="sr-desc">
                    誰が・何を・いつ呼び出したかを記録する。PCI-DSS・SOX・GDPRなどの規制対応に必須。改ざん防止のための不変ストレージに保管する。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconGitBranch size={18} /> WS-Security 認証フロー
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-12"
                chart={`sequenceDiagram
    participant CLI as サービスコンシューマー
    participant STS as Security Token Service
    participant ESB as ESB
    participant SVC as ビジネスサービス
    CLI->>STS: セキュリティトークン要求（RST）
    STS->>STS: 認証・認可チェック
    STS-->>CLI: SAMLトークン発行（RSTR）
    CLI->>ESB: SOAPリクエスト（WS-Securityヘッダー + SAMLトークン）
    ESB->>STS: トークン検証
    STS-->>ESB: 検証OK
    ESB->>ESB: ルーティング・変換
    ESB->>SVC: サービス呼び出し（サービス間認証: mTLS）
    SVC-->>ESB: レスポンス
    ESB->>ESB: XML Signatureでレスポンスに署名
    ESB-->>CLI: 署名済みSOAPレスポンス`}
              />
              <div className="mermaid-label">diagram / sequence</div>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                すべてのサービス呼び出しに相関ID（UUID）を付与し、認証ログと突合できるようにしてください。不正アクセスの追跡と監査対応の両方に有効です。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.oasis-open.org/standards#wssv1.1">WS-Security（OASIS）</Ext>、
              <Ext href="https://www.oasis-open.org/standards#samlv2.0">SAML 2.0（OASIS）</Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 10 ─── */}
        <section className="section" id="s10">
          <div className="section-header">
            <span className="section-num">10</span>
            <div className="section-icon icon-teal">
              <IconDatabase size={16} />
            </div>
            <h2>データ管理とサービス間連携</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconBinaryTree size={18} /> SOAのデータ共有パターン3種
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-13"
                chart={`graph TD
    P1["パターン1：共有データモデル\\n共通スキーマをすべてのサービスが参照\\nEnterprise Data Model（EDM）"]
    P2["パターン2：カノニカルデータモデル\\nサービスは独自モデルを持ち\\nESBが標準形式に変換する"]
    P3["パターン3：イベント駆動データ共有\\nデータ変更をイベントとして発行\\n他サービスが購読・反映する"]`}
              />
              <div className="mermaid-label">diagram / structural</div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>パターン</th>
                  <th>メリット</th>
                  <th>デメリット</th>
                  <th>適用場面</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>共有データモデル</strong>
                  </td>
                  <td>データ一貫性高・重複少</td>
                  <td>サービス間の結合度が上がる</td>
                  <td>厳密なデータ整合性が必要な金融系</td>
                </tr>
                <tr>
                  <td>
                    <strong>カノニカルデータモデル</strong>
                  </td>
                  <td>サービスが独立できる・レガシー統合に強い</td>
                  <td>ESBの変換ロジックが複雑化</td>
                  <td>データモデル間の変換が必要なレガシーシステム統合</td>
                </tr>
                <tr>
                  <td>
                    <strong>イベント駆動</strong>
                  </td>
                  <td>最大の疎結合・高スケーラビリティ</td>
                  <td>結果整合性の管理が必要</td>
                  <td>高トラフィック・可用性重視</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="subsection">
            <h3>
              <IconBrandCashapp size={18} /> 分散トランザクション管理
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-14"
                chart={`flowchart TD
    TX["SOA分散トランザクション管理"]
    ACID["WS-AtomicTransaction\\n2フェーズコミット\\n厳密なACIDトランザクション\\n同期・高コスト"]
    SAGA["Sagaパターン\\n補償トランザクション\\n各サービスがロールバック操作を持つ\\nSOAでもESBが調整可能"]
    COMP["補償トランザクション設計例\\nOrderCreated → 失敗 → CancelOrder\\nPaymentCharged → 失敗 → RefundPayment\\nStockReserved → 失敗 → ReleaseStock"]
    TX --> ACID & SAGA
    COMP --> SAGA
    ACID -->|"厳密な整合性が必要な場合"| FIN["金融取引・会計処理"]
    SAGA -->|"可用性重視の場合"| ORD["注文・在庫管理"]`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
            <div className="callout callout-warn">
              <IconAlertTriangle size={18} />
              <div className="callout-body">
                <strong>注意：</strong>
                WS-AtomicTransactionは参加サービスがすべて応答するまでロックを保持するため、可用性・パフォーマンスに影響します。金融・会計のような厳密な整合性が必要な場合のみ使用し、それ以外はSagaパターンを検討してください。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 11 ─── */}
        <section className="section" id="s11">
          <div className="section-header">
            <span className="section-num">11</span>
            <div className="section-icon icon-purple">
              <IconCrown size={16} />
            </div>
            <h2>SOAガバナンス</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconGridDots size={18} /> ガバナンスの4領域
            </h3>
            <div className="governance-grid">
              <div className="gov-card">
                <div className="gc-head">
                  <IconTools size={16} /> 設計ガバナンス
                </div>
                <ul>
                  <li>サービス設計レビュープロセス</li>
                  <li>命名規約の統一（サービス名・操作名）</li>
                  <li>インターフェース標準化（WSDL/OpenAPI）</li>
                  <li>バージョン管理ポリシー</li>
                </ul>
              </div>
              <div className="gov-card">
                <div className="gc-head">
                  <IconRoute size={16} /> ライフサイクル管理
                </div>
                <ul>
                  <li>サービスカタログ管理</li>
                  <li>廃止・移行プロセス（廃止予告→移行→削除）</li>
                  <li>依存関係の追跡・可視化</li>
                  <li>変更管理プロセス</li>
                </ul>
              </div>
              <div className="gov-card">
                <div className="gc-head">
                  <IconCheck size={16} /> 品質ガバナンス
                </div>
                <ul>
                  <li>SLAの定義と監視</li>
                  <li>パフォーマンスベンチマーク</li>
                  <li>セキュリティ監査</li>
                  <li>テスト標準化</li>
                </ul>
              </div>
              <div className="gov-card">
                <div className="gc-head">
                  <IconUserShield size={16} /> 組織ガバナンス
                </div>
                <ul>
                  <li>CoE（センター・オブ・エクセレンス）設立</li>
                  <li>サービス所有者の明確化</li>
                  <li>開発標準・ガイドライン整備</li>
                  <li>教育・トレーニング</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconCheck size={18} /> サービスライフサイクル
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-15"
                chart={`stateDiagram-v2
    [*] --> DESIGN : サービス設計開始
    DESIGN : 設計フェーズ
    DEVELOPMENT : 開発フェーズ
    TESTING : テストフェーズ
    DEPLOYED : 本番稼働
    DEPRECATED : 廃止予告
    RETIRED : 廃止完了
    DESIGN --> DEVELOPMENT : 設計承認
    DEVELOPMENT --> TESTING : 開発完了
    TESTING --> DEPLOYED : テスト合格
    DEPLOYED --> DEPRECATED : 廃止決定
    DEPRECATED --> RETIRED : 移行完了
    TESTING --> DESIGN : テスト不合格
    DEPLOYED --> DEVELOPMENT : 障害・改修`}
              />
              <div className="mermaid-label">diagram / statechart</div>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                ガバナンスの自動化が鍵です。設計レビューをプルリクエストプロセスに組み込み、命名規約チェックをCIで自動化することで、形骸化を防げます。「ルールがあっても守られない」は最も多いガバナンスの失敗パターンです。
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              出典：
              <Ext href="https://www.opengroup.org/subjectareas/soa">
                The Open Group SOA Governance
              </Ext>
            </p>
          </div>
        </section>

        {/* ─── Section 12 ─── */}
        <section className="section" id="s12">
          <div className="section-header">
            <span className="section-num">12</span>
            <div className="section-icon icon-green">
              <IconRocket size={16} />
            </div>
            <h2>実装ステップバイステップ</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconStairs size={18} /> SOA導入の6段階
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-16"
                chart={`flowchart TD
    S1["Step 1：現状分析・As-Is設計\\n既存システムのインベントリ作成\\nPoint-to-Point統合の可視化\\nビジネスプロセスのマッピング\\n期間：4〜8週間"]
    S2["Step 2：SOAロードマップ策定\\nビジネス優先度に基づくサービス候補選定\\nTo-Beアーキテクチャ設計\\nESB製品選定・PoC\\nガバナンス体制の整備\\n期間：4〜8週間"]
    S3["Step 3：基盤整備\\nESBのインストール・設定\\nサービスレジストリのセットアップ\\n開発・テスト環境の構築\\nセキュリティ基盤の整備\\n期間：4〜6週間"]
    S4["Step 4：パイロットサービスの実装\\n最も価値の高い1〜3サービスを実装\\nWSDLの設計・レビュー\\nESBへのデプロイ\\nモニタリングの検証\\n期間：6〜12週間"]
    S5["Step 5：段階的サービス拡大\\nパイロットの知見を横展開\\nサービスカタログの充実\\nチーム教育・ナレッジ共有\\nガバナンスの運用開始\\n期間：継続的"]
    S6["Step 6：継続的改善\\nSLA達成状況の評価\\nサービスの最適化\\n新技術（APIマネジメント等）の導入\\nマイクロサービスへの段階的移行検討\\n期間：継続的"]
    S1 --> S2 --> S3 --> S4 --> S5 --> S6`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconCode size={18} /> サービス実装例（Python + FastAPI）
            </h3>
            <p>
              ESBから呼び出されるRESTサービスの実装例です。サービス間認証にJWTトークンを使用します。
            </p>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">app/services/order_service.py</span>
              </div>
              {/* biome-ignore format: HTML pre tags are sensitive to whitespace */}
              <pre><code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.fastapi }} /></pre>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconCpu size={18} /> Apache Camel ESBルーティング例（Java）
            </h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Java</span>
                <span className="code-file">src/main/java/com/example/routes/OrderRoute.java</span>
              </div>
              {/* biome-ignore format: HTML pre tags are sensitive to whitespace */}
              <pre><code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.camel }} /></pre>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                ESBルーティングに複雑なビジネスロジックを入れないでください。ルーティング・変換・バリデーションのみに徹し、ビジネスロジックはサービス側に置く「ダムESB・スマートサービス」原則を守りましょう。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 13 ─── */}
        <section className="section" id="s13">
          <div className="section-header">
            <span className="section-num">13</span>
            <div className="section-icon icon-amber">
              <IconBuildingBank size={16} />
            </div>
            <h2>実践：銀行基幹システム移行事例</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconHierarchy2 size={18} /> 銀行システムのSOAアーキテクチャ
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-17"
                chart={`graph TD
    subgraph CH["チャネル層"]
        ATM["ATM"]
        IB["インターネットバンキング"]
        MB["モバイルバンキング"]
        TL["窓口システム"]
    end
    subgraph CI["チャネル統合層"]
        APIM["API管理基盤\\nKong / Apigee"]
    end
    subgraph CORE["SOAコア層（ESB）"]
        ESB_B["銀行ESB\\nIBM MQ / MuleSoft"]
        IAM["IAM\\nSAML / OAuth2"]
    end
    subgraph SVC_B["銀行業務サービス層"]
        ACCS["口座サービス\\n残高照会・入出金"]
        TRFS["振込サービス\\n国内・海外送金"]
        LOAS["ローンサービス\\n申込・審査・返済"]
        FXS["為替サービス\\n外貨換算・レート"]
    end
    subgraph UTIL_B["ユーティリティサービス"]
        AUDS["監査ログサービス"]
        NOTS["通知サービス"]
        CRYS["暗号化サービス"]
    end
    subgraph BK_B["基幹バックエンド"]
        CORE_B["勘定系システム\\nIBMメインフレーム"]
        SAP_F["財務会計\\nSAP FICO"]
        INTER["全銀システム\\nSWIFT接続"]
    end
    CH --> CI --> CORE
    CORE --> SVC_B & UTIL_B
    SVC_B --> BK_B`}
              />
              <div className="mermaid-label">diagram / structural</div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconArrowsDown size={18} /> 振込処理の完全フロー
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-18"
                style={{ minWidth: "900px" }}
                chart={`sequenceDiagram
    participant USER as 顧客（モバイル）
    participant APIM as API管理基盤
    participant ESB_K as ESB
    participant AUTH_K as 認証サービス
    participant TRANS as 振込サービス
    participant ACC as 口座サービス
    participant AUDIT as 監査ログサービス
    participant ZENGIN as 全銀システム
    participant NOTIFY as 通知サービス
    USER->>APIM: 振込リクエスト（HTTPS + OAuth2トークン）
    APIM->>AUTH_K: トークン検証・認証
    AUTH_K-->>APIM: 認証OK（顧客情報）
    APIM->>ESB_K: 振込オーケストレーション開始
    ESB_K->>ACC: 出金元口座の残高確認
    ACC-->>ESB_K: 残高: 500,000円
    ESB_K->>TRANS: 振込トランザクション開始（WS-AtomicTransaction）
    TRANS->>ACC: 出金処理（-100,000円）
    ACC-->>TRANS: 出金完了
    TRANS->>ZENGIN: 全銀電文送信
    ZENGIN-->>TRANS: 受付完了
    TRANS-->>ESB_K: 振込成功
    ESB_K->>AUDIT: 取引ログ記録（非同期・必須）
    ESB_K--)NOTIFY: 振込完了通知（プッシュ・メール）
    ESB_K-->>APIM: 振込完了レスポンス
    APIM-->>USER: 200 OK + 振込完了明細`}
              />
              <div className="mermaid-label">diagram / sequence</div>
            </div>
            <div className="callout callout-info">
              <IconInfoCircle size={18} />
              <div className="callout-body">
                <strong>設計ポイント：</strong>
                振込のような金融取引では、WS-AtomicTransactionで出金・全銀電文送信の整合性を保証しつつ、通知は非同期で送ることでユーザーへのレスポンスを速くする設計が重要です。
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 14 ─── */}
        <section className="section" id="s14">
          <div className="section-header">
            <span className="section-num">14</span>
            <div className="section-icon icon-teal">
              <IconChartLine size={16} />
            </div>
            <h2>監視・運用管理</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconRadar size={18} /> SOA監視の4層体系
            </h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>監視層</th>
                  <th>監視項目</th>
                  <th>SLA定義</th>
                  <th>ツール例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>インフラ監視</strong>
                  </td>
                  <td>CPU・メモリ・ネットワーク・死活</td>
                  <td>CPU 80%・レスポンス 2s超</td>
                  <td>Prometheus・Zabbix</td>
                </tr>
                <tr>
                  <td>
                    <strong>サービス監視</strong>
                  </td>
                  <td>応答時間・エラー率・スループット（TPS）</td>
                  <td>P99 500ms・エラー率 1%</td>
                  <td>Grafana・Datadog</td>
                </tr>
                <tr>
                  <td>
                    <strong>メッセージ監視</strong>
                  </td>
                  <td>キュー深度・デッドレター・トレース</td>
                  <td>キュー深度 1000件超</td>
                  <td>Jaeger・Zipkin・Kibana</td>
                </tr>
                <tr>
                  <td>
                    <strong>ビジネス監視</strong>
                  </td>
                  <td>BAM・プロセス完了率・KPI</td>
                  <td>注文完了率 99%以上</td>
                  <td>BAMコンソール・Grafana</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="subsection">
            <h3>
              <IconShieldLock size={18} /> 分散トレーシング：相関IDによる追跡
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-19"
                chart={`sequenceDiagram
    participant CLI as クライアント
    participant ESB as ESB
    participant SVC_A as サービスA
    participant SVC_B as サービスB
    participant TRACE as Jaeger / Zipkin
    CLI->>ESB: リクエスト
    ESB->>ESB: 相関ID生成 CID:abc-123
    ESB->>TRACE: スパン記録（ESB開始 t=0ms）
    ESB->>SVC_A: 呼び出し（X-Correlation-Id: abc-123）
    SVC_A->>TRACE: スパン記録（SvcA開始 t=5ms）
    SVC_A->>SVC_B: 呼び出し（X-Correlation-Id: abc-123）
    SVC_B->>TRACE: スパン記録（SvcB開始 t=10ms）
    SVC_B-->>SVC_A: レスポンス
    SVC_B->>TRACE: スパン記録（SvcB終了 t=25ms）
    SVC_A-->>ESB: レスポンス
    SVC_A->>TRACE: スパン記録（SvcA終了 t=30ms）
    ESB-->>CLI: レスポンス
    ESB->>TRACE: スパン記録（ESB終了 t=35ms）
    Note over TRACE: abc-123: ESB(35ms) → SvcA(25ms) → SvcB(15ms)<br/>ボトルネック特定・SLA違反検知`}
              />
              <div className="mermaid-label">diagram / sequence</div>
            </div>
            <div className="callout callout-tip">
              <IconCheck size={18} />
              <div className="callout-body">
                <strong>ベストプラクティス：</strong>
                すべてのメッセージに UUID v4
                の相関IDを付与し、ESBから末端サービスまで伝播させてください。障害発生時の原因特定時間を劇的に短縮できます。OpenTelemetry標準に準拠することで、Jaeger・Zipkin・Datadogなど複数ツールへの対応が容易になります。
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconTarget size={18} /> SLA定義の実例
            </h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">YAML</span>
                <span className="code-file">config/sla-definitions.yaml</span>
              </div>
              {/* biome-ignore format: HTML pre tags are sensitive to whitespace */}
              <pre><code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.sla }} /></pre>
            </div>
          </div>
        </section>

        {/* ─── Section 15 ─── */}
        <section className="section" id="s15">
          <div className="section-header">
            <span className="section-num">15</span>
            <div className="section-icon icon-green">
              <IconCheck size={16} />
            </div>
            <h2>SOAのベストプラクティス総まとめ</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconListCheck size={18} /> 設計フェーズのベストプラクティス
            </h3>
            <div className="bp-item">
              <IconTools size={18} />
              <div>
                <div className="bp-title">コントラクトファースト設計</div>
                <div className="bp-desc">
                  実装より先にWSDL・OpenAPIを定義してから実装する。コントラクトが変わらなければ実装は自由に変更でき、疎結合が保たれる。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconArrowsMaximize size={18} />
              <div>
                <div className="bp-title">ビジネス機能単位の粗粒度設計</div>
                <div className="bp-desc">
                  過度な細分化（ナノサービス化）は通信コストと設定の爆発を招く。「注文管理サービス」のようにビジネスエンティティ単位でまとめる。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconShieldLock size={18} />
              <div>
                <div className="bp-title">すべてのメッセージに相関IDを付与</div>
                <div className="bp-desc">
                  UUID v4
                  の相関IDをすべてのメッセージに必ず付与し、ESBから末端サービスまで伝播させる。分散トレーシングと障害調査に必須。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconRefresh size={18} />
              <div>
                <div className="bp-title">重要な操作に冪等性を持たせる</div>
                <div className="bp-desc">
                  リトライ・再送による二重処理を防ぐため、注文作成・決済などの操作は同じリクエストを複数回受けても結果が変わらないよう設計する。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconTag size={18} />
              <div>
                <div className="bp-title">後方互換性を保つバージョニング</div>
                <div className="bp-desc">
                  URLパスかnamespaceにバージョンを含め、既存コンシューマーを壊さずにサービスを進化させる。旧バージョンは6〜12ヶ月維持する。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconShieldLock size={18} />
              <div>
                <div className="bp-title">メッセージレベルの暗号化を優先</div>
                <div className="bp-desc">
                  TLS（トランスポート暗号化）だけでは中間ノード（ESB）で平文になる。WS-Securityによるメッセージレベル暗号化で端末間の機密性を保証する。
                </div>
              </div>
            </div>
            <div className="bp-item">
              <IconBus size={18} />
              <div>
                <div className="bp-title">「ダムESB・スマートサービス」原則</div>
                <div className="bp-desc">
                  ESBにビジネスロジックを詰め込まない。ルーティング・変換・監視はESBの責務だが、ビジネスルールはサービス側に置くことでESBの変更リスクを最小化する。
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconChartBar size={18} /> SOA成熟度モデル（6レベル）
            </h3>
            <div className="maturity-bar">
              <div className="mat-row">
                <div className="mr-lv">Level 0</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-red-800)", color: "var(--c-red-200)" }}
                >
                  アドホック統合（スパゲッティ）
                </div>
                <div className="mr-desc">Point-to-Point・管理不能</div>
              </div>
              <div className="mat-row">
                <div className="mr-lv">Level 1</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-amber-800)", color: "var(--c-amber-200)" }}
                >
                  サービス化の開始
                </div>
                <div className="mr-desc">個別サービス定義・統一規格なし</div>
              </div>
              <div className="mat-row">
                <div className="mr-lv">Level 2</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-amber-800)", color: "var(--c-amber-400)" }}
                >
                  SOA基盤の確立
                </div>
                <div className="mr-desc">ESB導入・WSDL標準化・レジストリ運用</div>
              </div>
              <div className="mat-row">
                <div className="mr-lv">Level 3</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-teal-800)", color: "var(--c-teal-200)" }}
                >
                  SOAの定着
                </div>
                <div className="mr-desc">ガバナンス機能・再利用率向上</div>
              </div>
              <div className="mat-row">
                <div className="mr-lv">Level 4</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-teal-800)", color: "var(--c-teal-100)" }}
                >
                  ビジネス俊敏性
                </div>
                <div className="mr-desc">サービス組み合わせで新プロセス迅速構築</div>
              </div>
              <div className="mat-row">
                <div className="mr-lv">Level 5</div>
                <div
                  className="mr-bar"
                  style={{ background: "var(--c-purple-800)", color: "var(--c-purple-200)" }}
                >
                  最適化・進化
                </div>
                <div className="mr-desc">マイクロサービスとの共存・継続改善</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 16 ─── */}
        <section className="section" id="s16">
          <div className="section-header">
            <span className="section-num">16</span>
            <div className="section-icon icon-coral">
              <IconAlertOctagon size={16} />
            </div>
            <h2>SOAのアンチパターン</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconAlertTriangle size={18} /> 主要な5つのアンチパターン
            </h3>

            <div className="antipattern-card">
              <div className="ap-title">
                <IconAlertCircle size={16} /> ESBのモノリス化（スマートESB・ダムサービス）
              </div>
              <div className="ap-prob">
                ESBにすべてのビジネスロジックを集中させた結果、ESBが「神様コンポーネント」になる。ESBの変更が全サービスに影響し、デプロイが止まる。
              </div>
              <div className="ap-fix">
                <IconCheck size={16} /> <strong>解決策：</strong>
                「ダムESB・スマートサービス」原則を徹底。ESBはルーティング・変換・監視に徹し、ビジネスロジックは各サービス側に置く。
              </div>
            </div>

            <div className="antipattern-card">
              <div className="ap-title">
                <IconAlertCircle size={16} /> サービスの過細分化（ナノサービス化）
              </div>
              <div className="ap-prob">
                1機能ずつ別サービスにした結果、100個以上のサービスが乱立し、ESB設定が爆発的に増加。運用コストと障害の複雑さが急増する。
              </div>
              <div className="ap-fix">
                <IconCheck size={16} /> <strong>解決策：</strong>
                ビジネスエンティティ単位の粗粒度設計。「注文サービス」にCRUD操作をまとめ、サービス数を適切な規模（数十以内）に保つ。
              </div>
            </div>

            <div className="antipattern-card">
              <div className="ap-title">
                <IconAlertCircle size={16} /> 共有DBへの直接アクセス
              </div>
              <div className="ap-prob">
                複数サービスが同じDBテーブルに直接アクセスする。スキーマ変更が全サービスに波及し、データ整合性の管理が不能になる。
              </div>
              <div className="ap-fix">
                <IconCheck size={16} /> <strong>解決策：</strong>
                データオーナーシップの明確化。データを持つサービスのAPIを経由してアクセスするか、カノニカルデータモデルで統一する。
              </div>
            </div>

            <div className="antipattern-card">
              <div className="ap-title">
                <IconAlertCircle size={16} /> バージョニング無視（インターフェースの直接変更）
              </div>
              <div className="ap-prob">
                サービスのインターフェースをバージョン管理せずに直接変更する。既存コンシューマーが突然壊れ、テスト・デプロイの全体調整が必要になる。
              </div>
              <div className="ap-fix">
                <IconCheck size={16} /> <strong>解決策：</strong>
                新バージョンは別URLで公開し、旧バージョンを一定期間維持。Deprecationヘッダーで廃止予告し、移行サポート期間を必ず設ける。
              </div>
            </div>

            <div className="antipattern-card">
              <div className="ap-title">
                <IconAlertCircle size={16} /> SOAガバナンスの形骸化
              </div>
              <div className="ap-prob">
                ルールは定義されているが誰も守らない。命名規約が不統一になり、重複サービスが乱立し、「どのサービスを使えばいいかわからない」状態になる。
              </div>
              <div className="ap-fix">
                <IconCheck size={16} /> <strong>解決策：</strong>
                設計レビューをデプロイプロセスに義務付け、命名規約チェックをCIで自動化。SOA
                CoEが実質的な活動を行う体制を作る。
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconStethoscope size={18} /> SOA健全性チェックフロー
            </h3>
            <div className="mermaid-wrap">
              <MermaidDiagram
                id="diag-20"
                chart={`flowchart TD
    CHECK["SOAアーキテクチャの健全性チェック"]
    Q1{"すべてのサービスが\\n標準インターフェースを持つか？"}
    Q2{"ESBがルーティング・変換に\\n徹しているか？"}
    Q3{"サービス間で他サービスの\\nDBに直接アクセスしていないか？"}
    Q4{"バージョン管理が\\n適切に行われているか？"}
    Q5{"サービスカタログが\\n最新の状態か？"}
    Q6{"SLAが定義・監視\\nされているか？"}
    FIX1["WSDL・OpenAPIの設計を先行させる\\nコントラクトファースト開発を導入"]
    FIX2["ESBからビジネスロジックを\\nサービス側に移動させる"]
    FIX3["データオーナーシップポリシーを策定\\nサービスAPI経由のアクセスに統一"]
    FIX4["バージョニング戦略を定義\\n廃止予告プロセスを整備"]
    FIX5["カタログ更新をデプロイに組み込む"]
    FIX6["SLAを定義してアラートを設定"]
    HEALTHY["健全なSOAアーキテクチャ\\n再利用性・保守性・可視性が高い状態"]
    CHECK --> Q1
    Q1 -->|No| FIX1
    Q1 -->|Yes| Q2
    Q2 -->|No| FIX2
    Q2 -->|Yes| Q3
    Q3 -->|No| FIX3
    Q3 -->|Yes| Q4
    Q4 -->|No| FIX4
    Q4 -->|Yes| Q5
    Q5 -->|No| FIX5
    Q5 -->|Yes| Q6
    Q6 -->|No| FIX6
    Q6 -->|Yes| HEALTHY`}
              />
              <div className="mermaid-label">diagram / flowchart</div>
            </div>
          </div>
        </section>

        {/* ─── Section 17 ─── */}
        <section className="section" id="s17">
          <div className="section-header">
            <span className="section-num">17</span>
            <div className="section-icon icon-purple">
              <IconBooks size={16} />
            </div>
            <h2>参考文献・ソース一覧</h2>
          </div>

          <div className="subsection">
            <h3>
              <IconBook size={18} /> 必読書籍
            </h3>
            <div className="book-grid">
              <div className="book-card">
                <div className="bc-icon">
                  <IconBook size={18} />
                </div>
                <div>
                  <div className="bc-title">SOA Design Patterns</div>
                  <div className="bc-author">Thomas Erl</div>
                  <div className="stars">★★★★☆</div>
                  <div className="bc-desc">
                    SOAパターンの決定版百科事典。8大原則とパターンカタログの原典。
                  </div>
                </div>
              </div>
              <div className="book-card">
                <div className="bc-icon">
                  <IconBook size={18} />
                </div>
                <div>
                  <div className="bc-title">Enterprise Integration Patterns</div>
                  <div className="bc-author">Gregor Hohpe, Bobby Woolf</div>
                  <div className="stars">★★★★☆</div>
                  <div className="bc-desc">
                    ESBと統合パターンの名著。メッセージングシステム設計の必読書。
                  </div>
                </div>
              </div>
              <div className="book-card">
                <div className="bc-icon">
                  <IconBook size={18} />
                </div>
                <div>
                  <div className="bc-title">
                    Service-Oriented Architecture: Analysis and Design for Services and
                    Microservices
                  </div>
                  <div className="bc-author">Thomas Erl</div>
                  <div className="stars">★★★★☆</div>
                  <div className="bc-desc">
                    SOA・マイクロサービスの統合解説。移行判断の理論的基盤。
                  </div>
                </div>
              </div>
              <div className="book-card">
                <div className="bc-icon">
                  <IconBook size={18} />
                </div>
                <div>
                  <div className="bc-title">SOA Governance</div>
                  <div className="bc-author">Thomas Erl</div>
                  <div className="stars">★★★★☆</div>
                  <div className="bc-desc">
                    SOAガバナンスの体系書。組織・プロセス・技術の3軸で解説。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>
              <IconWorld size={18} /> 公式ドキュメント・URL
            </h3>

            <div className="ref-section">
              <h4>
                <IconBuilding size={14} /> SOAコア概念・標準
              </h4>
              <ul className="ref-list">
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">OASIS SOA Reference Model</div>
                    <Ext
                      href="https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=soa-rm"
                      className="ref-url"
                    >
                      https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=soa-rm
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">W3C Web Services Architecture</div>
                    <Ext href="https://www.w3.org/TR/ws-arch/" className="ref-url">
                      https://www.w3.org/TR/ws-arch/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Thomas Erl SOA公式（serviceorientation.com）</div>
                    <Ext href="https://www.serviceorientation.com/" className="ref-url">
                      https://www.serviceorientation.com/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">TOGAF SOA Reference Architecture</div>
                    <Ext
                      href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/"
                      className="ref-url"
                    >
                      https://pubs.opengroup.org/architecture/togaf9-doc/arch/
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>

            <div className="ref-section">
              <h4>
                <IconCode size={14} /> Webサービス技術標準
              </h4>
              <ul className="ref-list">
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">WSDL 2.0 仕様（W3C）</div>
                    <Ext href="https://www.w3.org/TR/wsdl20/" className="ref-url">
                      https://www.w3.org/TR/wsdl20/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">SOAP 1.2 仕様（W3C）</div>
                    <Ext href="https://www.w3.org/TR/soap12/" className="ref-url">
                      https://www.w3.org/TR/soap12/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">WS-Security（OASIS）</div>
                    <Ext href="https://www.oasis-open.org/standards#wssv1.1" className="ref-url">
                      https://www.oasis-open.org/standards#wssv1.1
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">WS-AtomicTransaction（OASIS）</div>
                    <Ext href="https://www.oasis-open.org/committees/ws-tx/" className="ref-url">
                      https://www.oasis-open.org/committees/ws-tx/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">SAML 2.0（OASIS）</div>
                    <Ext href="https://www.oasis-open.org/standards#samlv2.0" className="ref-url">
                      https://www.oasis-open.org/standards#samlv2.0
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Enterprise Integration Patterns（Webサイト版）</div>
                    <Ext href="https://www.enterpriseintegrationpatterns.com/" className="ref-url">
                      https://www.enterpriseintegrationpatterns.com/
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>

            <div className="ref-section">
              <h4>
                <IconTools size={14} /> ESBフレームワーク・ツール
              </h4>
              <ul className="ref-list">
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Apache Camel 公式ドキュメント</div>
                    <Ext
                      href="https://camel.apache.org/manual/latest/index.html"
                      className="ref-url"
                    >
                      https://camel.apache.org/manual/latest/index.html
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">MuleSoft ドキュメント</div>
                    <Ext href="https://docs.mulesoft.com/" className="ref-url">
                      https://docs.mulesoft.com/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">WSO2 Enterprise Integrator</div>
                    <Ext href="https://wso2.com/integration/" className="ref-url">
                      https://wso2.com/integration/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">IBM App Connect 公式</div>
                    <Ext href="https://www.ibm.com/products/app-connect" className="ref-url">
                      https://www.ibm.com/products/app-connect
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Spring Integration（Java）</div>
                    <Ext href="https://spring.io/projects/spring-integration" className="ref-url">
                      https://spring.io/projects/spring-integration
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>

            <div className="ref-section">
              <h4>
                <IconCloud size={14} /> クラウドSOA・統合サービス
              </h4>
              <ul className="ref-list">
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">AWS Application Integration</div>
                    <Ext
                      href="https://aws.amazon.com/products/application-integration/"
                      className="ref-url"
                    >
                      https://aws.amazon.com/products/application-integration/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Azure Integration Services</div>
                    <Ext
                      href="https://azure.microsoft.com/en-us/products/category/integration"
                      className="ref-url"
                    >
                      https://azure.microsoft.com/en-us/products/category/integration
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Google Cloud Integration Connectors</div>
                    <Ext
                      href="https://cloud.google.com/integration-connectors/docs/overview"
                      className="ref-url"
                    >
                      https://cloud.google.com/integration-connectors/docs/overview
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>

            <div className="ref-section">
              <h4>
                <IconArrowsExchange size={14} /> SOA vs マイクロサービス
              </h4>
              <ul className="ref-list">
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Martin Fowler — Microservices（SOA比較含む）</div>
                    <Ext
                      href="https://martinfowler.com/articles/microservices.html"
                      className="ref-url"
                    >
                      https://martinfowler.com/articles/microservices.html
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">AWS: SOA vs Microservices 違い</div>
                    <Ext
                      href="https://aws.amazon.com/compare/the-difference-between-soa-microservices/"
                      className="ref-url"
                    >
                      https://aws.amazon.com/compare/the-difference-between-soa-microservices/
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">IBM SOA ベストプラクティス</div>
                    <Ext href="https://www.ibm.com/think/topics/soa" className="ref-url">
                      https://www.ibm.com/think/topics/soa
                    </Ext>
                  </div>
                </li>
                <li>
                  <IconLink size={15} />
                  <div>
                    <div className="ref-title">Gartner SOA Research</div>
                    <Ext
                      href="https://www.gartner.com/en/information-technology/insights/service-oriented-architecture"
                      className="ref-url"
                    >
                      https://www.gartner.com/en/information-technology/insights/service-oriented-architecture
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="update-footer">
            <div className="uf-left">
              <IconCalendar size={16} />
              最終更新日: 2026-04-17 |
              各仕様・ツールのバージョンは変更される場合があります。実装前に必ず公式ドキュメントをご確認ください。
            </div>
            <div className="uf-right">
              <span className="pill pill-purple">
                <IconBuilding size={12} /> SOA Guide v1.0
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
