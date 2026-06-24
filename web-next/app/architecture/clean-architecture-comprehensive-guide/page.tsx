import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import CleanArchitectureSidebar from "./CleanArchitectureSidebar";

const NAV_GROUPS = [
  {
    title: "導入",
    items: [
      { id: "intro", emoji: "💡", label: "クリーンアーキテクチャとは" },
      { id: "layers", emoji: "🔵", label: "4つの同心円レイヤー" },
    ],
  },
  {
    title: "依存性の原則",
    items: [
      { id: "dip", emoji: "🔄", label: "依存性の逆転原則（DIP）" },
      { id: "di", emoji: "💉", label: "依存性注入（DI）" },
    ],
  },
  {
    title: "各レイヤー詳解",
    items: [
      { id: "entities", emoji: "🏛️", label: "Entities 層" },
      { id: "usecases", emoji: "⚙️", label: "Use Cases 層" },
      { id: "adapters", emoji: "🔌", label: "Interface Adapters 層" },
      { id: "frameworks", emoji: "🔧", label: "Frameworks & Drivers 層" },
    ],
  },
  {
    title: "設計・テスト",
    items: [
      { id: "directory", emoji: "📁", label: "ディレクトリ構成" },
      { id: "testing", emoji: "🧪", label: "テスト戦略" },
      { id: "solid", emoji: "📐", label: "SOLID 原則" },
    ],
  },
  {
    title: "ベストプラクティス",
    items: [
      { id: "antipatterns", emoji: "⛔", label: "アンチパターン" },
      { id: "bestpractices", emoji: "✅", label: "ベストプラクティス" },
      { id: "references", emoji: "📚", label: "参考文献" },
    ],
  },
];

const CODE_BLOCKS = {
  code1: `<span class="cm"># ─── Use Cases 層（内側）：インターフェース定義 ───</span>
<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> typing <span class="kw">import</span> Optional

<span class="kw">class</span> <span class="fn">OrderRepository</span>(ABC):
    <span class="cm"># 抽象インターフェース。Use Cases 層に置く。フレームワークを知らない。</span>
    @abstractmethod
    <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw">self</span>, order_id: str) -&gt; Optional[<span class="st">"Order"</span>]: ...

    @abstractmethod
    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: <span class="st">"Order"</span>) -&gt; <span class="kw">None</span>: ...

<span class="kw">class</span> PlaceOrderUseCase:
    <span class="cm"># Use Case は抽象（インターフェース）にのみ依存する。</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, order_repository: OrderRepository):  <span class="cm"># ← 抽象に依存</span>
        <span class="kw">self</span>._repo = order_repository

    <span class="kw">def</span> <span class="fn">execute</span>(<span class="kw">self</span>, command: <span class="st">"PlaceOrderCommand"</span>) -&gt; <span class="st">"PlaceOrderResult"</span>:
        order = Order.<span class="fn">create</span>(customer_id=command.customer_id)
        <span class="kw">self</span>._repo.<span class="fn">save</span>(order)
        <span class="kw">return</span> <span class="fn">PlaceOrderResult</span>(order_id=order.id)

<span class="cm"># ─── Frameworks 層（外側）：具体的な実装 ───</span>
<span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> Session

<span class="kw">class</span> <span class="fn">SQLAlchemyOrderRepository</span>(OrderRepository):
    <span class="cm"># 外側レイヤーが内側のインターフェースを実装する</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, session: Session):
        <span class="kw">self</span>._session = session

    <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw">self</span>, order_id: str) -&gt; Optional[<span class="st">"Order"</span>]:
        record = <span class="kw">self</span>._session.<span class="fn">query</span>(OrderModel).<span class="fn">filter_by</span>(id=order_id).<span class="fn">first</span>()
        <span class="kw">return</span> <span class="kw text-info">self</span>.<span class="fn">_to_domain</span>(record) <span class="kw text-info">if</span> record <span class="kw text-info">else</span> <span class="kw">None</span>

    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: <span class="st">"Order"</span>) -&gt; <span class="kw">None</span>:
        <span class="kw">self</span>._session.<span class="fn">merge</span>(<span class="kw text-info">self</span>.<span class="fn">_to_model</span>(order))
        <span class="kw">self</span>._session.<span class="fn">commit</span>()

<span class="cm"># ─── テスト用インメモリ実装（DB なしで Use Case をテスト！）───</span>
<span class="kw">class</span> <span class="fn">InMemoryOrderRepository</span>(OrderRepository):
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw text-info">self</span>):
        <span class="kw">self</span>._store: dict[str, <span class="st">"Order"</span>] = {}

    <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw text-info">self</span>, order_id: str) -&gt; Optional[<span class="st">"Order"</span>]:
        <span class="kw">return</span> <span class="kw text-info">self</span>._store.<span class="fn">get</span>(order_id)

    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw text-info">self</span>, order: <span class="st">"Order"</span>) -&gt; <span class="kw">None</span>:
        <span class="kw">self</span>._store[order.id] = order`,
  code2: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> datetime <span class="kw">import</span> datetime
<span class="kw">from</span> enum <span class="kw">import</span> Enum
<span class="kw">from</span> typing <span class="kw">import</span> Optional
<span class="kw">from</span> uuid <span class="kw">import</span> uuid4


<span class="cm"># ──────────── Value Object ────────────</span>
@<span class="fn">dataclass</span>(frozen=<span class="kw text-info">True</span>)   <span class="cm"># frozen=True で不変性を保証</span>
<span class="kw text-info">class</span> Money:
    <span class="cm"># 金額の Value Object。ビジネスルールをここに閉じ込める。</span>
    <span class="cm"># 外部ライブラリ一切なし。標準ライブラリのみ使用。</span>
    amount: int
    currency: str = <span class="st">"JPY"</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(<span class="kw text-info">self</span>):
        <span class="kw">if</span> <span class="kw text-info">self</span>.amount &lt; <span class="nu">0</span>:
            <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"金額は 0 以上でなければなりません"</span>)

    <span class="kw">def</span> <span class="fn">add</span>(<span class="kw text-info">self</span>, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:
        <span class="kw text-info">if</span> <span class="kw text-info">self</span>.currency != other.currency:
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"通貨単位が一致しません"</span>)
        <span class="kw text-info">return</span> <span class="fn">Money</span>(<span class="kw text-info">self</span>.amount + other.amount, <span class="kw text-info">self</span>.currency)

    <span class="kw text-info">def</span> <span class="fn">multiply</span>(<span class="kw text-info">self</span>, factor: int) -&gt; <span class="st">"Money"</span>:
        <span class="kw text-info">return</span> <span class="fn">Money</span>(<span class="kw text-info">self</span>.amount * factor, <span class="kw text-info">self</span>.currency)

    <span class="kw text-info">def</span> <span class="fn">__add__</span>(<span class="kw text-info">self</span>, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:  <span class="kw text-info">return</span> <span class="kw text-info">self</span>.<span class="fn">add</span>(other)
    <span class="kw text-info">def</span> <span class="fn">__radd__</span>(<span class="kw text-info">self</span>, other: object) -&gt; <span class="st">"Money"</span>:
        <span class="kw text-info">if</span> other == <span class="nu">0</span>: <span class="kw text-info">return</span> <span class="kw text-info">self</span>
        <span class="kw text-info">return</span> NotImplemented
    <span class="kw text-info">def</span> <span class="fn">__mul__</span>(<span class="kw text-info">self</span>, factor: int) -&gt; <span class="st">"Money"</span>:  <span class="kw text-info">return</span> <span class="kw text-info">self</span>.<span class="fn">multiply</span>(factor)


<span class="cm"># ──────────── Domain Enum ────────────</span>
<span class="kw">class</span> <span class="fn">OrderStatus</span>(Enum):
    PENDING   = <span class="st">"pending"</span>
    CONFIRMED = <span class="st">"confirmed"</span>
    SHIPPED   = <span class="st">"shipped"</span>
    DELIVERED = <span class="st">"delivered"</span>
    CANCELLED = <span class="st">"cancelled"</span>


<span class="cm"># ──────────── Aggregate Root（Entity）────────────</span>
@dataclass
<span class="kw text-info">class</span> Order:
    <span class="cm"># 注文エンティティ（Aggregate Root）</span>
    <span class="cm"># このクラスにフレームワークの痕跡は一切ない。</span>
    <span class="cm"># ビジネスルールだけを持つ純粋なクラス。</span>
    id:         str
    customer_id: str
    _lines:     list        = <span class="fn">field</span>(default_factory=list)
    _status:    OrderStatus = OrderStatus.PENDING
    created_at: datetime    = <span class="fn">field</span>(default_factory=datetime.utcnow)

    @classmethod
    <span class="kw text-info">def</span> <span class="fn">create</span>(cls, customer_id: str) -&gt; <span class="st">"Order"</span>:
        <span class="kw text-info">return</span> <span class="fn">cls</span>(id=<span class="fn">str</span>(<span class="fn text-uuid4">uuid4</span>()), customer_id=customer_id)

    <span class="cm"># ── ビジネスルール：明細追加 ──</span>
    <span class="kw text-info">def</span> <span class="fn">add_line</span>(<span class="kw text-info">self</span>, product_id: str, product_name: str,
                 price: Money, qty: int) -&gt; <span class="kw text-info">None</span>:
        <span class="kw text-info">self</span>.<span class="fn">_assert_editable</span>()
        <span class="kw text-info">if</span> qty &lt;= <span class="nu">0</span>:
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"数量は 1 以上でなければなりません"</span>)
        <span class="kw text-info">self</span>._lines.append({"product_id": product_id, "name": product_name, "price": price, "qty": qty})

    <span class="cm"># ── ビジネスルール：注文確定 ──</span>
    <span class="kw text-info">def</span> <span class="fn">confirm</span>(<span class="kw text-info">self</span>) -&gt; <span class="kw text-info">None</span>:
        <span class="kw text-info">if</span> <span class="kw text-info">self</span>._status != OrderStatus.PENDING:
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"保留中の注文のみ確定できます"</span>)
        <span class="kw text-info">if</span> <span class="kw text-info">not</span> <span class="kw text-info">self</span>._lines:
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"商品が 1 件もありません"</span>)
        <span class="kw text-info">self</span>._status = OrderStatus.CONFIRMED

    <span class="cm"># ── ビジネスルール：キャンセル ──</span>
    <span class="kw text-info">def</span> <span class="fn">cancel</span>(<span class="kw text-info">self</span>) -&gt; <span class="kw text-info">None</span>:
        <span class="kw text-info">if</span> <span class="kw text-info">self</span>._status <span class="kw text-info">in</span> (OrderStatus.SHIPPED, OrderStatus.DELIVERED):
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"発送済み・配達済みの注文はキャンセルできません"</span>)
        <span class="kw text-info">self</span>._status = OrderStatus.CANCELLED

    @property
    <span class="kw text-info">def</span> <span class="fn">status</span>(<span class="kw text-info">self</span>) -&gt; OrderStatus: <span class="kw text-info">return</span> <span class="kw text-info">self</span>._status

    @property
    <span class="kw text-info">def</span> <span class="fn">total</span>(<span class="kw text-info">self</span>) -&gt; Money:
        <span class="kw text-info">return</span> <span class="kw text-info">sum</span>(
            (line[<span class="st">"price"</span>].<span class="fn">multiply</span>(line[<span class="st">"qty"</span>]) <span class="kw text-info">for</span> line <span class="kw text-info">in</span> <span class="kw text-info">self</span>._lines),
            <span class="fn">Money</span>(<span class="nu">0</span>)
        )

    <span class="kw text-info">def</span> <span class="fn">_assert_editable</span>(<span class="kw text-info">self</span>) -&gt; <span class="kw text-info">None</span>:
        <span class="kw text-info">if</span> <span class="kw text-info">self</span>._status != OrderStatus.PENDING:
            <span class="kw text-info">raise</span> <span class="fn">ValueError</span>(<span class="st">"確定済みの注文は変更できません"</span>)

    @classmethod
    <span class="kw text-info">def</span> <span class="fn">from_persistence</span>(cls, id: str, customer_id: str, status: OrderStatus, created_at: datetime) -&gt; <span class="st">"Order"</span>:
        order = <span class="fn">cls</span>(id=id, customer_id=customer_id, created_at=created_at)
        order._status = status
        <span class="kw text-info">return</span> order`,
  code3: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw text-info">from</span> abc <span class="kw text-info">import</span> ABC, abstractmethod
<span class="kw text-info">from</span> typing <span class="kw text-info">import</span> Optional


<span class="cm"># ──── Input / Output DTO ────</span>
@<span class="fn">dataclass</span>(frozen=<span class="kw text-info">True</span>)
<span class="kw text-info">class</span> PlaceOrderCommand:
    <span class="cm"># 注文作成コマンド（Use Case への入力）</span>
    customer_id: str
    items: list[dict]    <span class="cm"># [{"product_id": ..., "quantity": ...}]</span>

@<span class="fn">dataclass</span>(frozen=<span class="kw text-info">True</span>)
<span class="kw text-info">class</span> PlaceOrderResult:
    <span class="cm"># 注文作成結果（Use Case からの出力）</span>
    order_id:     str
    status:       str
    total_amount: int
    currency:     str


<span class="cm"># ──── Repository / 外部サービスの抽象インターフェース ────</span>
<span class="kw text-info">class</span> <span class="fn">OrderRepository</span>(ABC):
    @abstractmethod
    <span class="kw text-info">def</span> <span class="fn">save</span>(<span class="kw text-info">self</span>, order: Order) -&gt; <span class="kw text-info">None</span>: ...
    @abstractmethod
    <span class="kw text-info">def</span> <span class="fn">find_by_id</span>(<span class="kw text-info">self</span>, order_id: str) -&gt; Optional[Order]: ...

<span class="kw text-info">class</span> <span class="fn">ProductRepository</span>(ABC):
    @abstractmethod
    <span class="kw text-info">def</span> <span class="fn">find_by_id</span>(<span class="kw text-info">self</span>, product_id: str) -&gt; Optional[Product]: ...

<span class="kw text-info">class</span> <span class="fn">CustomerRepository</span>(ABC):
    @abstractmethod
    <span class="kw text-info">def</span> <span class="fn">find_by_id</span>(<span class="kw text-info">self</span>, customer_id: str) -&gt; Optional[Customer]: ...

<span class="kw text-info">class</span> <span class="fn">EventPublisher</span>(ABC):
    @abstractmethod
    <span class="kw text-info">def</span> <span class="fn">publish</span>(<span class="kw text-info">self</span>, event: object) -&gt; <span class="kw text-info">None</span>: ...


<span class="cm"># ──── Use Case 実装 ────</span>
<span class="kw text-info">class</span> PlaceOrderUseCase:
    <span class="cm"># 注文作成ユースケース</span>
    <span class="cm"># ビジネスフローをオーケストレートする。</span>
    <span class="cm"># 具体的な DB・メール送信方法は知らない。</span>
    <span class="kw text-info">def</span> <span class="fn">__init__</span>(
        <span class="kw text-info">self</span>,
        order_repository:    OrderRepository,
        product_repository:  ProductRepository,
        customer_repository: CustomerRepository,
        event_publisher:     EventPublisher,
    ):
        <span class="kw text-info">self</span>._order_repo    = order_repository
        <span class="kw text-info">self</span>._product_repo  = product_repository
        <span class="kw text-info">self</span>._customer_repo = customer_repository
        <span class="kw text-info">self</span>._event_pub     = event_publisher

    <span class="kw text-info">def</span> <span class="fn">execute</span>(<span class="kw text-info">self</span>, command: PlaceOrderCommand) -&gt; PlaceOrderResult:
        <span class="cm"># 1. 顧客の存在・有効性確認</span>
        customer = <span class="kw text-info">self</span>._customer_repo.<span class="fn">find_by_id</span>(command.customer_id)
        <span class="kw text-info">if</span> <span class="kw text-info">not</span> customer:
            <span class="kw text-info">raise</span> <span class="fn">EntityNotFoundError</span>(f<span class="st">"顧客が見つかりません: {command.customer_id}"</span>)
        <span class="kw text-info">if</span> <span class="kw text-info">not</span> customer.is_active:
            <span class="kw text-info">raise</span> <span class="fn">BusinessRuleError</span>(<span class="st">"このアカウントは現在ご利用できません"</span>)

        <span class="cm"># 2. 注文 Entity の生成</span>
        order = Order.<span class="fn">create</span>(customer_id=command.customer_id)

        <span class="cm"># 3. 各商品を注文明細に追加</span>
        <span class="kw text-info">for</span> item <span class="kw text-info">in</span> command.items:
            product = <span class="kw text-info">self</span>._product_repo.<span class="fn">find_by_id</span>(item[<span class="st">"product_id"</span>])
            <span class="kw text-info">if</span> <span class="kw text-info">not</span> product:
                <span class="kw text-info">raise</span> <span class="fn">EntityNotFoundError</span>(f<span class="st">"商品が見つかりません: {item['product_id']}"</span>)
            <span class="kw text-info">if</span> <span class="kw text-info">not</span> product.<span class="fn">has_stock</span>(item[<span class="st">"quantity"</span>]):
                <span class="kw text-info">raise</span> <span class="fn">BusinessRuleError</span>(f<span class="st">"在庫が不足しています: {product.name}"</span>)
            order.<span class="fn">add_line</span>(product.id, product.name, product.price, item[<span class="st">"quantity"</span>])

        <span class="cm"># 4. 注文確定（Entity のビジネスルールを実行）</span>
        order.<span class="fn">confirm</span>()

        <span class="cm"># 5. 永続化</span>
        <span class="kw text-info">self</span>._order_repo.<span class="fn">save</span>(order)

        <span class="cm"># 6. ドメインイベント発行</span>
        <span class="kw text-info">self</span>._event_pub.<span class="fn">publish</span>(
            <span class="fn">OrderPlacedEvent</span>(order_id=order.id, customer_id=order.customer_id)
        )

        <span class="kw text-info">return</span> <span class="fn">PlaceOrderResult</span>(
            order_id=order.id,
            status=order.status.value,
            total_amount=order.total.amount,
            currency=order.total.currency,
        )

<span class="kw text-info">class</span> <span class="fn">EntityNotFoundError</span>(Exception): <span class="kw text-info">pass</span>
<span class="kw text-info">class</span> <span class="fn">BusinessRuleError</span>(Exception):   <span class="kw text-info">pass</span>`,
  code4: `<span class="kw">from</span> fastapi <span class="kw">import</span> APIRouter, Depends, HTTPException, status
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel, Field
<span class="kw">from</span> typing <span class="kw">import</span> List
<span class="kw">import</span> logging

logger = logging.<span class="fn">getLogger</span>(__name__)
router = <span class="fn">APIRouter</span>(prefix=<span class="st">"/v1/orders"</span>, tags=[<span class="st">"orders"</span>])

<span class="cm"># ──── HTTP 層の DTO（外側の詳細）────</span>
<span class="kw">class</span> <span class="fn">OrderItemInput</span>(BaseModel):
    product_id: str = <span class="fn">Field</span>(..., min_length=<span class="nu">1</span>)
    quantity:   int = <span class="fn text-info">Field</span>(..., ge=<span class="nu">1</span>)

<span class="kw">class</span> <span class="fn">CreateOrderRequest</span>(BaseModel):
    customer_id: str                  = <span class="fn">Field</span>(..., min_length=<span class="nu">1</span>)
    items:       List[OrderItemInput] = <span class="fn">Field</span>(..., min_items=<span class="nu">1</span>)

<span class="kw">class</span> <span class="fn">OrderResponse</span>(BaseModel):
    order_id: str; status: str; total_amount: int; currency: str; message: str

<span class="cm"># ──── Controller ────</span>
@router.<span class="fn">post</span>(<span class="st">""</span>, status_code=status.HTTP_201_CREATED, response_model=OrderResponse)
<span class="kw text-info">async</span> <span class="kw text-info">def</span> <span class="fn">create_order</span>(
    request: CreateOrderRequest,
    use_case: PlaceOrderUseCase = <span class="fn">Depends</span>(get_place_order_use_case),
):
    <span class="cm"># Controller の責務：変換のみ。ビジネスロジックは何も書かない！</span>
    <span class="kw text-info">try</span>:
        <span class="cm"># 1. HTTP リクエスト → Command（Use Case の入力）</span>
        command = <span class="fn">PlaceOrderCommand</span>(
            customer_id=request.customer_id,
            items=[{"product_id": i.product_id, "quantity": i.quantity}
                   <span class="kw text-info">for</span> i <span class="kw text-info">in</span> request.items],
        )
        <span class="cm"># 2. Use Case の実行（ビジネスロジックは全て Use Case が担う）</span>
        result = use_case.<span class="fn">execute</span>(command)
        <span class="cm"># 3. Output DTO → HTTP レスポンス</span>
        <span class="kw text-info">return</span> <span class="fn">OrderResponse</span>(
            order_id=result.order_id, status=result.status,
            total_amount=result.total_amount, currency=result.currency,
            message=<span class="st">"注文が確定されました"</span>,
        )
    <span class="kw text-info">except</span> EntityNotFoundError <span class="kw text-info">as</span> e:
        <span class="kw text-info">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">404</span>, detail=<span class="fn">str</span>(e))
    <span class="kw text-info">except</span> BusinessRuleError <span class="kw text-info">as</span> e:
        <span class="kw text-info">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">422</span>, detail=<span class="fn">str</span>(e))
    <span class="kw text-info">except</span> Exception <span class="kw text-info">as</span> e:
        logger.<span class="fn">error</span>(f<span class="st">"予期しないエラー: {e}"</span>, exc_info=<span class="kw text-info">True</span>)
        <span class="kw text-info">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">500</span>, detail=<span class="st">"内部エラーが発生しました"</span>)`,
  code5: `<span class="kw">from</span> datetime <span class="kw">import</span> datetime
<span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> Session, DeclarativeBase, Mapped, mapped_column
<span class="kw">from</span> sqlalchemy <span class="kw">import</span> String, Integer, DateTime

<span class="cm"># ──── DB モデル（外側の詳細・ドメインとは別物）────</span>
<span class="kw">class</span> <span class="fn">Base</span>(DeclarativeBase): <span class="kw text-info">pass</span>

<span class="kw">class</span> <span class="fn">OrderModel</span>(Base):
    __tablename__ = <span class="st">"orders"</span>
    id:           Mapped[str]      = <span class="fn">mapped_column</span>(<span class="fn">String</span>(<span class="nu">36</span>), primary_key=<span class="kw text-info">True</span>)
    customer_id:  Mapped[str]      = <span class="fn">mapped_column</span>(<span class="fn">String</span>(<span class="nu">36</span>), nullable=<span class="kw text-info">False</span>)
    status:       Mapped[str]      = <span class="fn">mapped_column</span>(<span class="fn">String</span>(<span class="nu">20</span>), nullable=<span class="kw text-info">False</span>)
    total_amount: Mapped[int]      = <span class="fn">mapped_column</span>(Integer,    nullable=<span class="kw text-info">False</span>)
    created_at:   Mapped[datetime] = <span class="fn">mapped_column</span>(DateTime,   nullable=<span class="kw text-info">False</span>)

<span class="cm"># ──── Repository Adapter ────</span>
<span class="kw">class</span> <span class="fn">SQLAlchemyOrderRepository</span>(OrderRepository):
    <span class="cm"># DBモデル ↔ ドメインエンティティの変換を担当</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw text-info">self</span>, session: Session):
        <span class="kw text-info">self</span>._session = session

    <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw text-info">self</span>, order_id: str) -&gt; Optional[Order]:
        record = (<span class="kw text-info">self</span>._session.<span class="fn">query</span>(OrderModel)
                               .<span class="fn">filter</span>(OrderModel.id == order_id).<span class="fn">first</span>())
        <span class="kw text-info">return</span> <span class="kw text-info">self</span>.<span class="fn">_to_domain</span>(record) <span class="kw text-info">if</span> record <span class="kw text-info">else</span> <span class="kw text-info">None</span>

    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw text-info">self</span>, order: Order) -&gt; <span class="kw text-info">None</span>:
        <span class="kw text-info">self</span>._session.<span class="fn">merge</span>(<span class="kw text-info">self</span>.<span class="fn">_to_model</span>(order))
        <span class="kw text-info">self</span>._session.<span class="fn">flush</span>()

    <span class="kw">def</span> <span class="fn">_to_domain</span>(<span class="kw text-info">self</span>, record: OrderModel) -&gt; Order:
        <span class="cm"># DB レコード → ドメインエンティティ変換</span>
        <span class="kw text-info">return</span> Order.<span class="fn">from_persistence</span>(
            id=record.id, customer_id=record.customer_id,
            status=<span class="fn">OrderStatus</span>(record.status), created_at=record.created_at
        )

    <span class="kw">def</span> <span class="fn">_to_model</span>(<span class="kw text-info">self</span>, order: Order) -&gt; OrderModel:
        <span class="cm"># ドメインエンティティ → DB レコード変換</span>
        <span class="kw text-info">return</span> <span class="fn">OrderModel</span>(
            id=order.id, customer_id=order.customer_id,
            status=order.status.value, total_amount=order.total.amount,
            created_at=order.created_at,
        )`,
  code6: `<span class="kw">import</span> os
<span class="kw text-info">from</span> fastapi <span class="kw text-info">import</span> FastAPI, Depends
<span class="kw text-info">from</span> sqlalchemy <span class="kw text-info">import</span> create_engine
<span class="kw text-info">from</span> sqlalchemy.orm <span class="kw text-info">import</span> sessionmaker, Session

<span class="cm"># ──── DB 設定（環境変数は外側レイヤーのみ読む）────</span>
DATABASE_URL = os.environ.<span class="fn">get</span>("DATABASE_URL")
<span class="kw text-info">if</span> <span class="kw text-info">not</span> DATABASE_URL:
    <span class="kw text-info">raise</span> <span class="fn">RuntimeError</span>("DATABASE_URL が環境変数に設定されていません")

engine       = <span class="fn">create_engine</span>(DATABASE_URL, pool_pre_ping=<span class="kw text-info">True</span>)
SessionLocal = <span class="fn">sessionmaker</span>(bind=engine, autocommit=<span class="kw text-info">False</span>, autoflush=<span class="kw text-info">False</span>)

<span class="kw text-info">def</span> <span class="fn">get_db</span>() -&gt; Session:
    <span class="cm"># DB セッションの依存性プロバイダー</span>
    db = <span class="fn">SessionLocal</span>()
    <span class="kw text-info">try</span>:
        <span class="kw text-info">yield</span> db
    <span class="kw text-info">finally</span>:
        db.<span class="fn">close</span>()

<span class="cm"># ──── 依存性の組み立て（Composition Root）────</span>
<span class="kw text-info">def</span> <span class="fn">get_order_repository</span>(db: Session = <span class="fn text-info">Depends</span>(get_db)) -&gt; OrderRepository:
    <span class="kw text-info">return</span> <span class="fn">SQLAlchemyOrderRepository</span>(session=db)

<span class="kw text-info">def</span> <span class="fn text-info">get_product_repository</span>(db: Session = <span class="fn text-info">Depends</span>(get_db)) -&gt; ProductRepository:
    <span class="kw text-info">return</span> <span class="fn">SQLAlchemyProductRepository</span>(session=db)

<span class="kw text-info">def</span> <span class="fn text-info">get_customer_repository</span>(db: Session = <span class="fn text-info">Depends</span>(get_db)) -&gt; CustomerRepository:
    <span class="kw text-info">return</span> <span class="fn">SQLAlchemyCustomerRepository</span>(session=db)

<span class="kw text-info">def</span> <span class="fn">get_event_publisher</span>() -&gt; EventPublisher:
    <span class="kw text-info">return</span> <span class="fn">KafkaEventPublisher</span>(bootstrap_servers="localhost:9092")

<span class="kw text-info">def</span> <span class="fn">get_place_order_use_case</span>(
    order_repo:    OrderRepository    = <span class="fn text-info">Depends</span>(get_order_repository),
    product_repo:  ProductRepository  = <span class="fn text-info">Depends</span>(get_product_repository),
    customer_repo: CustomerRepository = <span class="fn text-info">Depends</span>(get_customer_repository),
    event_pub:     EventPublisher     = <span class="fn text-info">Depends</span>(get_event_publisher),
) -&gt; PlaceOrderUseCase:
    <span class="cm"># Use Case への全依存を注入して生成する</span>
    <span class="kw text-info">return</span> <span class="fn">PlaceOrderUseCase</span>(
        order_repository=order_repo,
        product_repository=product_repo,
        customer_repository=customer_repo,
        event_publisher=event_pub,
    )

<span class="cm"># ──── FastAPI アプリケーション ────</span>
<span class="kw text-info">def</span> <span class="fn">create_app</span>() -&gt; FastAPI:
    app = <span class="fn">FastAPI</span>(title="ECサイト注文 API", version="1.0.0")
    app.<span class="fn">include_router</span>(router)
    <span class="kw text-info">return</span> app

app = <span class="fn text-info">create_app</span>()`,
  code7: `<span class="kw">import</span> pytest


<span class="cm"># ────── Domain 層テスト（モック不要・DB 不要）──────</span>
<span class="kw">class</span> TestOrder:

    <span class="kw text-info">def</span> test_新規作成したら保留中になること(<span class="kw">self</span>):
        order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
        <span class="kw">assert</span> order.status == OrderStatus.PENDING

    <span class="kw text-info">def</span> test_明細追加後に確定できること(<span class="kw">self</span>):
        order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
        order.<span class="fn">add_line</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, <span class="fn">Money</span>(<span class="nu">1000</span>), <span class="nu">2</span>)
        order.<span class="fn">confirm</span>()
        <span class="kw">assert</span> order.status == OrderStatus.CONFIRMED

    <span class="kw text-info">def</span> test_明細なしで確定するとエラーになること(<span class="kw">self</span>):
        order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
        <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"商品が 1 件もありません"</span>):
            order.<span class="fn">confirm</span>()

    <span class="kw text-info">def</span> test_発送済み注文のキャンセルはエラーになること(<span class="kw">self</span>):
        order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
        order.<span class="fn">add_line</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, <span class="fn">Money</span>(<span class="nu">1000</span>), <span class="nu">1</span>)
        order.<span class="fn">confirm</span>()
        order._status = OrderStatus.SHIPPED  <span class="cm"># テスト用に強制変更</span>
        <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"発送済み"</span>):
            order.<span class="fn">cancel</span>()

    <span class="kw text-info">def</span> test_合計金額が正しく計算されること(<span class="kw text-info">self</span>):
        order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
        order.<span class="fn">add_line</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>,  <span class="fn">Money</span>(<span class="nu">1000</span>), <span class="nu">2</span>)
        order.<span class="fn">add_line</span>(<span class="st">"prod_002"</span>, <span class="st">"ジーンズ"</span>, <span class="fn">Money</span>(<span class="nu">5000</span>), <span class="nu">1</span>)
        <span class="kw">assert</span> order.total == <span class="fn">Money</span>(<span class="nu">7000</span>)


<span class="cm"># ────── Use Case 層テスト（InMemoryRepo 使用・DB 不要）──────</span>
<span class="kw">class</span> TestPlaceOrderUseCase:

    @pytest.fixture
    <span class="kw text-info">def</span> <span class="fn">setup</span>(<span class="kw text-info">self</span>):
        order_repo    = <span class="fn">InMemoryOrderRepository</span>()
        product_repo  = <span class="fn">InMemoryProductRepository</span>(products=[
            <span class="fn">Product</span>(id=<span class="st">"prod_001"</span>, name=<span class="st">"Tシャツ"</span>, price=<span class="fn">Money</span>(<span class="nu">1000</span>), stock=<span class="nu">10</span>),
        ])
        customer_repo = <span class="fn">InMemoryCustomerRepository</span>(customers=[
            <span class="fn">Customer</span>(id=<span class="st">"active_cust"</span>,   is_active=<span class="kw text-info">True</span>),
            <span class="fn">Customer</span>(id=<span class="st">"inactive_cust"</span>, is_active=<span class="kw text-info">False</span>),
        ])
        event_pub = <span class="fn">InMemoryEventPublisher</span>()
        use_case = <span class="fn">PlaceOrderUseCase</span>(
            order_repository=order_repo, product_repository=product_repo,
            customer_repository=customer_repo, event_publisher=event_pub,
        )
        <span class="kw text-info">return</span> use_case, order_repo, event_pub

    <span class="kw text-info">def</span> test_有効なコマンドで注文が作成されること(<span class="kw text-info">self</span>, setup):
        use_case, order_repo, _ = setup
        result = use_case.<span class="fn">execute</span>(<span class="fn">PlaceOrderCommand</span>(
            customer_id=<span class="st">"active_cust"</span>,
            items=[{"product_id": "prod_001", "quantity": 2}],
        ))
        <span class="kw text-info">assert</span> result.status == <span class="st">"confirmed"</span>
        <span class="kw text-info">assert</span> result.total_amount == <span class="nu">2000</span>

    <span class="kw text-info">def</span> test_注文確定後にイベントが発行されること(<span class="kw text-info">self</span>, setup):
        use_case, _, event_pub = setup
        use_case.<span class="fn">execute</span>(<span class="fn">PlaceOrderCommand</span>(
            customer_id=<span class="st">"active_cust"</span>,
            items=[{"product_id": "prod_001", "quantity": 1}],
        ))
        <span class="kw text-info">assert</span> <span class="fn">len</span>(event_pub.published_events) == <span class="nu">1</span>
        <span class="kw text-info">assert</span> <span class="fn">isinstance</span>(event_pub.published_events[0], OrderPlacedEvent)

    <span class="kw text-info">def</span> test_存在しない顧客で注文するとエラーになること(<span class="kw text-info">self</span>, setup):
        use_case, _, _ = setup
        <span class="kw">with</span> pytest.<span class="fn">raises</span>(EntityNotFoundError, match=<span class="st">"顧客が見つかりません"</span>):
            use_case.<span class="fn">execute</span>(<span class="fn">PlaceOrderCommand</span>(
                customer_id="ghost_cust",
                items=[{"product_id": "prod_001", "quantity": 1}],
            ))

    <span class="kw text-info">def</span> test_無効な顧客で注文するとビジネスエラーになること(<span class="kw text-info">self</span>, setup):
        use_case, _, _ = setup
        <span class="kw">with</span> pytest.<span class="fn">raises</span>(BusinessRuleError, match=<span class="st">"ご利用できません"</span>):
            use_case.<span class="fn">execute</span>(<span class="fn">PlaceOrderCommand</span>(
                customer_id="inactive_cust",
                items=[{"product_id": "prod_001", "quantity": 1}],
            ))`,
};

export default function CleanArchitectureComprehensiveGuide() {
  return (
    <div className="clean-architecture-comprehensive-guide">
      <CleanArchitectureSidebar groups={NAV_GROUPS} />

      <main className="main">
        {/* HERO */}
        <div className="hero">
          <div className="hero-text">
            <div className="hero-badge">🏛️ Robert C. Martin / 2012</div>
            <h1 className="hero-title">
              クリーンアーキテクチャ
              <br />
              <em>Complete Guide</em>
            </h1>
            <p className="hero-desc">
              ビジネスロジックを技術的詳細から切り離し、フレームワーク・DB・UI
              に支配されない堅牢なシステム設計を、具体的な Python コードとフロー図で徹底解説します。
            </p>
            <div className="hero-tags">
              <span className="hero-tag ht-i">フレームワーク非依存</span>
              <span className="hero-tag ht-c">高テスト容易性</span>
              <span className="hero-tag ht-a">DB 非依存</span>
              <span className="hero-tag ht-g">UI 非依存</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-svg-wrap">
              <svg viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
                <title>Clean Architecture Layers</title>
                <defs>
                  <filter id="eg" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="8" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="gfill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#f87171" stopOpacity={0.06} />
                  </radialGradient>
                  <marker
                    id="arr"
                    markerWidth="7"
                    markerHeight="7"
                    refX="3.5"
                    refY="3.5"
                    orient="auto"
                  >
                    <path d="M0,0 L7,3.5 L0,7 Z" fill="#475569" />
                  </marker>
                </defs>
                <circle
                  className="r-fw"
                  cx={190}
                  cy={190}
                  r={172}
                  fill="rgba(148,163,184,.04)"
                  stroke="#475569"
                  strokeWidth="1.2"
                  strokeDasharray="7 4"
                />
                <circle
                  className="r-ad"
                  cx={190}
                  cy={190}
                  r={132}
                  fill="rgba(251,191,36,.05)"
                  stroke="#ca8a04"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                />
                <circle
                  className="r-uc"
                  cx={190}
                  cy={190}
                  r={88}
                  fill="rgba(251,146,60,.07)"
                  stroke="#c2410c"
                  strokeWidth={2}
                />
                <circle
                  cx={190}
                  cy={190}
                  r={46}
                  fill="url(#gfill)"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  className="r-en"
                  filter="url(#eg)"
                />
                <text
                  x={190}
                  y={32}
                  textAnchor="middle"
                  fontFamily="Space Grotesk,sans-serif"
                  fontSize="1rem"
                  fontWeight={600}
                  fill="#64748b"
                >
                  🔧 Frameworks &amp; Drivers
                </text>
                <text
                  x={190}
                  y={74}
                  textAnchor="middle"
                  fontFamily="Space Grotesk,sans-serif"
                  fontSize="1rem"
                  fontWeight={600}
                  fill="#ca8a04"
                >
                  🔌 Interface Adapters
                </text>
                <text
                  x={190}
                  y={122}
                  textAnchor="middle"
                  fontFamily="Space Grotesk,sans-serif"
                  fontSize="1rem"
                  fontWeight={600}
                  fill="#c2410c"
                >
                  ⚙️ Use Cases
                </text>
                <text
                  x={190}
                  y={183}
                  textAnchor="middle"
                  fontFamily="Space Grotesk,sans-serif"
                  fontSize="1.2rem"
                  fontWeight={700}
                  fill="#f87171"
                >
                  🏛️ Entities
                </text>
                <text
                  x={190}
                  y={197}
                  textAnchor="middle"
                  fontFamily="Space Grotesk,sans-serif"
                  fontSize="1rem"
                  fill="rgba(248,113,113,.7)"
                >
                  ビジネスルール
                </text>
                <line
                  x1={358}
                  y1={52}
                  x2={358}
                  y2={328}
                  stroke="#2d3a4a"
                  strokeWidth="1.5"
                  markerEnd="url(#arr)"
                />
                <g transform="translate(374,190) rotate(-90)">
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    fontFamily="Inter,sans-serif"
                    fontSize="1rem"
                    fill="#475569"
                  >
                    依存の方向（外→内）
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {/* S1: INTRO */}
          <section id="intro" className="section">
            <div className="section-hdr">
              <div className="sec-num n-i">01</div>
              <h2>クリーンアーキテクチャとは何か？</h2>
            </div>
            <div className="callout co-i">
              <div className="callout-title">💡 核心思想</div>
              <p>
                <strong>ビジネスロジック（ドメイン）</strong>を、フレームワーク・DB・UI などの
                <strong>技術的詳細</strong>
                から完全に分離する。ビジネスルールはシステムの最も価値ある資産であり、技術スタックの変化に左右されてはならない。
              </p>
            </div>
            <p>
              Robert C. Martin（Uncle Bob）が 2012 年のブログ記事と 2017 年の著書{" "}
              <em>Clean Architecture: A Craftsman's Guide</em>{" "}
              で提唱したアーキテクチャ原則です。ヘキサゴナルアーキテクチャ・オニオンアーキテクチャ・BCE
              パターンなどの先行思想を統合・体系化したものです。
            </p>
            <h3 className="sub">クリーンアーキテクチャが解決する問題</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-1"
                chart={`graph LR
    subgraph BAD["導入前: 技術への強い依存"]
        P1["DB の構造が<br/>ドメインモデルを決める"]
        P2["FW 変更でコアロジックも修正"]
        P3["テストに DB が必要"]
        P4["ビジネスロジックが FW に混在"]
    end
    subgraph GOOD["導入後: ビジネスロジックが独立"]
        S1["DB はプラグイン<br/>交換可能な詳細"]
        S2["FW 変更でもコアは無傷"]
        S3["DB なしでユニットテスト可能"]
        S4["ビジネスルールは純粋クラス"]
    end
    P1-->S1
    P2-->S2
    P3-->S3
    P4-->S4
    style P1 fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style P2 fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style P3 fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style P4 fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style S1 fill:#14532d,stroke:#22c55e,color:#86efac
    style S2 fill:#14532d,stroke:#22c55e,color:#86efac
    style S3 fill:#14532d,stroke:#22c55e,color:#86efac
    style S4 fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">図1-1　導入前後の比較</div>
            </div>
            <h3 className="sub">4 つの特性</h3>
            <div className="feat-grid">
              <div className="feat-card">
                <div className="feat-icon">🔧</div>
                <div className="feat-title">フレームワーク非依存</div>
                <p className="feat-desc">
                  Spring・Django・FastAPI
                  などはツールに過ぎない。フレームワークに支配されず、ビジネスロジックが中心となる。フレームワークは交換可能なプラグイン。
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🧪</div>
                <div className="feat-title">テスト容易性</div>
                <p className="feat-desc">
                  ビジネスルールを
                  DB・UI・外部サービス一切なしでユニットテストできる。依存性注入でモックを自然に差し替えられる。
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🖥️</div>
                <div className="feat-title">UI 非依存</div>
                <p className="feat-desc">
                  UI はビジネスロジックを知らない。Web を CLI や API
                  に差し替えても、コアロジックは一切変わらない。
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🗄️</div>
                <div className="feat-title">データベース非依存</div>
                <p className="feat-desc">
                  DB はストレージの一手段。Oracle → PostgreSQL への移行も、Repository
                  の実装を差し替えるだけで済む。
                </p>
              </div>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                「技術スタックを変えてもビジネスロジックが動き続けるか？」という問いを常に念頭に置く。フレームワークや
                DB の名前がコアコードに登場したら、設計を見直すサインです。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                The Clean Architecture — Robert C. Martin (2012)
              </Ext>
            </p>
          </section>

          {/* S2: LAYERS */}
          <section id="layers" className="section">
            <div className="section-hdr">
              <div className="sec-num n-c">02</div>
              <h2>4 つの同心円（レイヤー）</h2>
            </div>
            <p>
              クリーンアーキテクチャは <strong>4 つの同心円</strong>
              で構成されます。最も内側の円が最も安定したビジネスルール、最も外側が変化しやすい技術的詳細です。
              <strong>依存は常に内側だけを向きます。</strong>
            </p>
            <div className="layer-grid">
              <div className="lc lc-en">
                <div className="lc-title">🏛️ Entities（最内側）</div>
                <ul>
                  <li>エンタープライズ全体のビジネスルール</li>
                  <li>最も変化しないドメインの概念</li>
                  <li>フレームワーク依存ゼロの純粋クラス</li>
                  <li>Entity / Value Object / Domain Exception</li>
                </ul>
              </div>
              <div className="lc lc-uc">
                <div className="lc-title">⚙️ Use Cases（アプリケーション層）</div>
                <ul>
                  <li>アプリケーション固有 of ビジネスフロー</li>
                  <li>Entities を調整するオーケストレーター</li>
                  <li>Repository・外部サービスの抽象インターフェース</li>
                  <li>Input/Output DTO（Command/Result）</li>
                </ul>
              </div>
              <div className="lc lc-ad">
                <div className="lc-title">🔌 Interface Adapters</div>
                <ul>
                  <li>Controller / Presenter / Gateway</li>
                  <li>外部形式（HTTP/JSON）↔ ドメイン形式の変換</li>
                  <li>DB・外部 API のアダプター実装</li>
                  <li>Repository インターフェースの具体実装</li>
                </ul>
              </div>
              <div className="lc lc-fw">
                <div className="lc-title">🔧 Frameworks &amp; Drivers（最外側）</div>
                <ul>
                  <li>Web フレームワーク / DB / UI / デバイス</li>
                  <li>最も変化しやすい技術的詳細</li>
                  <li>Composition Root（全依存の組み立て）</li>
                  <li>設定・初期化・マイグレーション</li>
                </ul>
              </div>
            </div>
            <h3 className="sub">依存の方向：必ず内側のみ</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-2"
                chart={`flowchart LR
    FW["Frameworks and Drivers"]
    AD["Interface Adapters"]
    UC["Use Cases"]
    EN["Entities"]
    FW --> AD
    AD --> UC
    UC --> EN
    EN -. "知らない" .-> FW
    UC -. "知らない" .-> FW
    style FW fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style AD fill:#292219,stroke:#ca8a04,color:#fbbf24
    style UC fill:#2a1810,stroke:#c2410c,color:#fb923c
    style EN fill:#2c1111,stroke:#dc2626,color:#f87171`}
              />
              <div className="diagram-label">図2-1　依存の方向は常に内側のみ</div>
            </div>
            <h3 className="sub">境界を越えるデータの流れ</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-3"
                chart={`sequenceDiagram
    participant HTTP as HTTP Request
    participant CTRL as Controller
    participant UC as Use Case
    participant REPO as Repository Interface
    participant IMPL as Repository Impl
    participant DB as Database
    HTTP->>CTRL: JSON リクエスト
    CTRL->>CTRL: JSON → Input DTO 変換
    CTRL->>UC: execute(InputDTO)
    UC->>REPO: find_by_id(id)
    REPO->>IMPL: (IF 経由)
    IMPL->>DB: SELECT ...
    DB-->>IMPL: DBレコード
    IMPL-->>UC: Domain Entity
    UC->>UC: ビジネスロジック実行
    UC-->>CTRL: OutputDTO
    CTRL-->>HTTP: JSON レスポンス`}
              />
              <div className="diagram-label">
                図2-2　HTTP リクエストからレスポンスまでのデータフロー
              </div>
            </div>
            <div className="callout co-w">
              <div className="callout-title">⚠️ The Dependency Rule（絶対ルール）</div>
              <p>
                ソースコードの依存は、内側の円のみを指すことができる。外側の円の名前（クラス名・関数名）は、内側のコードに現れてはならない。これが
                Clean Architecture の唯一 of 絶対ルールです。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                The Clean Architecture — blog.cleancoder.com
              </Ext>
            </p>
          </section>

          {/* S3: DIP */}
          <section id="dip" className="section">
            <div className="section-hdr">
              <div className="sec-num n-a">03</div>
              <h2>依存性の逆転原則（DIP）</h2>
            </div>
            <p>
              <strong>Dependency Inversion Principle（DIP）</strong>
              は、クリーンアーキテクチャの核心技術です。外側レイヤー（詳細）が内側の
              <strong>抽象インターフェース</strong>
              を実装することで、Use Case が DB の具体実装を知らずに済みます。
            </p>
            <div className="compare-grid">
              <div className="cmp-bad cmp">
                <div className="cmp-title">❌ DIP なし（Bad）</div>
                <p>
                  Use Case が SQLAlchemy の Session を直接受け取る。DB を変えると Use Case
                  のコードも修正が必要。テスト時に実際の DB が必要になる。
                </p>
              </div>
              <div className="cmp-good cmp">
                <div className="cmp-title">✅ DIP あり（Good）</div>
                <p>
                  Use Case は抽象インターフェース（OrderRepository）のみを知る。具体的な DB
                  実装は外側レイヤーが担い、Use Case のコードは一切変更不要。
                </p>
              </div>
            </div>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-4"
                chart={`graph TD
    subgraph BAD["依存性の逆転なし"]
        UC_BAD["Use Case (上位レベル)"]
        REPO_BAD["SQLAlchemy Repository (下位・具体)"]
        UC_BAD -->|"直接依存 NG"| REPO_BAD
    end
    subgraph GOOD["依存性の逆転あり"]
        UC_G["Use Case (上位レベル)"]
        IF_G["OrderRepository Interface (抽象)<br/>Use Cases 層に属する"]
        REPO_G["SQLAlchemy Repository (具体実装)<br/>Frameworks 層に属する"]
        UC_G -->|"依存 (抽象のみ)"| IF_G
        REPO_G -->|"implements"| IF_G
    end
    style UC_BAD fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style REPO_BAD fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style UC_G fill:#14532d,stroke:#22c55e,color:#86efac
    style IF_G fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style REPO_G fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">図3-1　DIP 適用前後の比較</div>
            </div>
            <h3 className="sub">Python 実装例：インターフェースと具体実装</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">
                  application/interfaces/order_repository.py + adapters/repositories/
                </span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code1 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                Repository インターフェースは{" "}
                <strong>Use Cases 層（application/interfaces/）</strong> に配置する。「DB
                を知るのは外側レイヤーだけ」が鉄則。テスト用に <code>InMemoryRepository</code>{" "}
                を必ず用意し、Use Case のユニットテストを DB なしで書けることを確認する。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://martinfowler.com/articles/dipInTheWild.html">
                Dependency Inversion Principle — Martin Fowler
              </Ext>
            </p>
          </section>

          {/* S4: ENTITIES */}
          <section id="entities" className="section">
            <div className="section-hdr">
              <div className="sec-num n-r">04</div>
              <h2>Entities（エンティティ）層</h2>
            </div>
            <span className="lb lb-en">🏛️ Entities 層 — 最内側・最安定</span>
            <p>
              エンティティ層はシステムの
              <strong>最も内側かつ最も安定した</strong>
              層です。エンタープライズ全体のビジネスルールを純粋な Python
              クラスとして表現します。外部ライブラリの import は原則禁止です。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-5"
                chart={`graph TD
    EL["Entities 層の設計ルール"]
    EL --> WHAT["何を置くか"]
    EL --> NOPE["何を置かないか"]
    WHAT --> W1["エンタープライズ全体のビジネスルール"]
    WHAT --> W2["Entity (識別子を持つオブジェクト)"]
    WHAT --> W3["Value Object (不変・値で同一性を判断)"]
    WHAT --> W4["Domain Exception (ビジネス上の例外)"]
    NOPE --> F1["SQLAlchemy, Django 等の import"]
    NOPE --> F2["HTTP リクエスト・レスポンス"]
    NOPE --> F3["DB カラム定義・FW デコレーター"]
    NOPE --> F4["外部ライブラリへの依存"]
    style EL fill:#2c1111,stroke:#f87171,color:#f87171
    style WHAT fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style NOPE fill:#3b1f1f,stroke:#ef4444,color:#fca5a5
    style W1 fill:#141d2b,stroke:#334155,color:#94a3b8
    style W2 fill:#141d2b,stroke:#334155,color:#94a3b8
    style W3 fill:#141d2b,stroke:#334155,color:#94a3b8
    style W4 fill:#141d2b,stroke:#334155,color:#94a3b8
    style F1 fill:#1f1010,stroke:#7f1d1d,color:#fca5a5
    style F2 fill:#1f1010,stroke:#7f1d1d,color:#fca5a5
    style F3 fill:#1f1010,stroke:#7f1d1d,color:#fca5a5
    style F4 fill:#1f1010,stroke:#7f1d1d,color:#fca5a5`}
              />
              <div className="diagram-label">図4-1　Entities 層に置くもの・置かないもの</div>
            </div>
            <h3 className="sub">Python 実装例：Value Object と Entity（Aggregate Root）</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">
                  domain/value_objects/money.py &amp; domain/entities/order.py
                </span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code2 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス — Rich Domain Model</div>
              <p>
                <code>order.confirm()</code> のようにビジネス操作を Entity
                のメソッドとして定义し、getter/setter だけの「貧血モデル（Anemic Domain
                Model）」を避ける。Entity が自身の不変条件（明細なし・発送後キャンセル不可
                etc.）を守る責務を持つ。Value Object は <code>frozen=True</code> で不変を保証する。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                Anemic Domain Model（アンチパターン）— Martin Fowler
              </Ext>
            </p>
          </section>

          {/* S5: USE CASES */}
          <section id="usecases" className="section">
            <div className="section-hdr">
              <div className="sec-num n-a">05</div>
              <h2>Use Cases（ユースケース）層</h2>
            </div>
            <span className="lb lb-uc">⚙️ Use Cases 層 — アプリケーション層</span>
            <p>
              ユースケース層は
              <strong>アプリケーション固有のビジネスフロー</strong>
              をオーケストレートします。Entity
              を操作し、Repository・外部サービスのインターフェースを呼び出します。HTTP の詳細も DB
              の実装も知りません。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-6"
                chart={`graph LR
    subgraph "入力 (Input DTO)"
        CMD["PlaceOrderCommand<br/>{customer_id, items}"]
    end
    subgraph "Use Case (境界)"
        IN["Input Port (インターフェース)"]
        IMPL["PlaceOrderUseCase (実装)"]
        OUT["Output Port"]
    end
    subgraph "出力 (Output DTO)"
        RES["PlaceOrderResult<br/>{order_id, status, total}"]
    end
    CMD --> IN --> IMPL --> OUT --> RES
    style CMD fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style IN  fill:#2a1810,stroke:#fb923c,color:#fb923c
    style IMPL fill:#2a1810,stroke:#fb923c,color:#fb923c
    style OUT fill:#2a1810,stroke:#fb923c,color:#fb923c
    style RES fill:#1e293b,stroke:#94a3b8,color:#94a3b8`}
              />
              <div className="diagram-label">図5-1　Use Case の Input / Output 設計</div>
            </div>
            <h3 className="sub">Python 実装例：PlaceOrderUseCase</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">application/use_cases/place_order.py</span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code3 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                <strong>1 Use Case = 1 ビジネスアクション</strong>。<code>PlaceOrderUseCase</code>・
                <code>CancelOrderUseCase</code>・<code>GetOrderUseCase</code>{" "}
                のように明確に分割する。Use Case に HTTP リクエストオブジェクトを渡さない。必ず{" "}
                <code>Command</code> / <code>Query</code> DTO に変換してから渡す。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://herbertograca.com/2017/09/14/ports-adapters-architecture/">
                Ports &amp; Adapters Architecture — herbertograca.com
              </Ext>
            </p>
          </section>

          {/* S6: ADAPTERS */}
          <section id="adapters" className="section">
            <div className="section-hdr">
              <div className="sec-num n-p">06</div>
              <h2>Interface Adapters（インターフェースアダプター）層</h2>
            </div>
            <span className="lb lb-ad">🔌 Interface Adapters 層</span>
            <p>
              アダプター層は
              <strong>外部の世界（HTTP・DB・CLI）</strong>と
              <strong>内側の世界（Use Case・Entity）</strong>
              を変換する橋渡し役です。<strong>ビジネスロジックは一切置きません。</strong>
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-7"
                chart={`graph TD
    AD["Interface Adapters 層の構成要素"]
    AD --> CTRL["Controllers<br/>外部入力 - Use Case Input DTO"]
    AD --> PRES["Presenters<br/>Use Case Output - UI 形式"]
    AD --> GATE["Repository 実装 / Gateways<br/>外部 DB・サービスへのアダプター"]
    CTRL --> C1["HTTP リクエスト - Command"]
    CTRL --> C2["CLI 引数 - Command"]
    PRES --> P1["Result - JSON"]
    PRES --> P2["Result - HTML テンプレート変数"]
    GATE --> G1["SQLAlchemy 実装"]
    GATE --> G2["Stripe API 呼び出し実装"]
    style AD   fill:#292219,stroke:#fbbf24,color:#fbbf24
    style CTRL fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style PRES fill:#1a1a3a,stroke:#818cf8,color:#a5b4fc
    style GATE fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">図6-1　Interface Adapters 層の 3 つの役割</div>
            </div>
            <h3 className="sub">Controller の実装例（FastAPI）</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">adapters/controllers/order_controller.py</span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code4 }}
                />
              </pre>
            </div>
            <h3 className="sub">Repository Adapter（SQLAlchemy）</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">adapters/repositories/sqlalchemy_order_repo.py</span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code5 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                Controller には<strong>変換ロジックのみ</strong>。ビジネスロジックを 1
                行も書かない。<code>if status == "vip":</code> のような判定が Controller
                に現れたら、Use Case か Entity に移動する。DB モデルとドメインエンティティは
                <strong>必ず別クラスで定義</strong>し、Mapper メソッドで橋渡しする。
              </p>
            </div>
          </section>

          {/* S7: FRAMEWORKS */}
          <section id="frameworks" className="section">
            <div className="section-hdr">
              <div className="sec-num n-g">07</div>
              <h2>Frameworks &amp; Drivers（フレームワーク）層</h2>
            </div>
            <span className="lb lb-fw">🔧 Frameworks &amp; Drivers 層 — 最外側</span>
            <p>
              最外層はフレームワーク・DB・UIなどの<strong>技術的詳細</strong>
              を扱います。この層が変わっても、内側のビジネスロジックは一切影響を受けません。最も重要な役割が{" "}
              <strong>Composition Root（依存性の組み立て）</strong>です。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-8"
                chart={`graph TD
    CR["Composition Root<br/>アプリケーション起動時に全依存を組み立てる"]
    CR --> S1["1 DB セッションの生成<br/>session = SessionLocal()"]
    CR --> S2["2 Repository の生成<br/>repo = SQLAlchemyOrderRepository(session)"]
    CR --> S3["3 Use Case の生成<br/>uc = PlaceOrderUseCase(repo, ...)"]
    CR --> S4["4 Controller の生成<br/>router に UseCase を注入"]
    CR --> S5["5 FastAPI アプリへの登録<br/>app.include_router(router)"]
    style CR fill:#2c1111,stroke:#f87171,color:#f87171
    style S1 fill:#1e293b,stroke:#475569,color:#94a3b8
    style S2 fill:#1e293b,stroke:#60a5fa,color:#93c5fd
    style S3 fill:#2a1810,stroke:#fb923c,color:#fb923c
    style S4 fill:#292219,stroke:#fbbf24,color:#fbbf24
    style S5 fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">図7-1　Composition Root での依存性組み立て順序</div>
            </div>
            <h3 className="sub">Composition Root 実装例（FastAPI + Depends）</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">main.py（Composition Root）</span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code6 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                全ての依存性の組み立ては <strong>Composition Root（main.py）の 1 箇所だけ</strong>
                で行う。Use Case が <code>SessionLocal()</code> を自分で生成してはいけない。
                <code>os.environ</code>{" "}
                の読み込みも外側レイヤーのみ。内側レイヤーは設定値を知らない。
              </p>
            </div>
          </section>

          {/* S8: DI */}
          <section id="di" className="section">
            <div className="section-hdr">
              <div className="sec-num n-i">08</div>
              <h2>依存性注入（Dependency Injection）</h2>
            </div>
            <p>
              <strong>依存性注入（DI）</strong>
              は、オブジェクトが自分の依存を自分で生成せず、外部から受け取るパターンです。クリーンアーキテクチャにおける
              DI は、テスト可能性と交換可能性の鍵です。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-9"
                chart={`graph TD
    DI["依存性注入の 3 パターン"]
    DI --> C["コンストラクタインジェクション<br/>def __init__(self, repo: OrderRepository)<br/>推奨"]
    DI --> P["プロパティインジェクション<br/>use_case.repository = repo<br/>オプション依存に使用"]
    DI --> M["メソッドインジェクション<br/>def execute(cmd, repo: OrderRepository)<br/>特定メソッドのみ依存が異なる場合"]
    C --> BEST["コンストラクタ DI のメリット<br/>・依存が必須であることが明確<br/>・テスト時にモック注入が容易<br/>・不完全なオブジェクトが生まれない"]
    style DI   fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style C    fill:#14532d,stroke:#22c55e,color:#86efac
    style P    fill:#292219,stroke:#fbbf24,color:#fbbf24
    style M    fill:#1e293b,stroke:#60a5fa,color:#93c5fd
    style BEST fill:#0d2414,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">
                図8-1　DI の 3 パターンとコンストラクタ DI の優位性
              </div>
            </div>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-10"
                chart={`graph LR
    subgraph "本番環境"
        PUC["PlaceOrderUseCase<br/>(同一コード)"]
        PR["SQLAlchemyOrderRepository<br/>(本番 DB)"]
        PUC --> PR
    end
    subgraph "テスト環境"
        TUC["PlaceOrderUseCase<br/>(同一コード)"]
        TR["InMemoryOrderRepository<br/>(DB 不要)"]
        TE["MockEventPublisher<br/>(Kafka 不要)"]
        TUC --> TR
        TUC --> TE
    end
    style PUC fill:#2a1810,stroke:#fb923c,color:#fb923c
    style TUC fill:#2a1810,stroke:#fb923c,color:#fb923c
    style PR  fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style TR  fill:#14532d,stroke:#22c55e,color:#86efac
    style TE  fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">
                図8-2　同一 Use Case コードを本番・テストで差し替えられる
              </div>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                <strong>コンストラクタ DI を第一選択</strong>
                とする。依存がコンストラクタに明記されることで、クラスの責務が可視化される。FastAPI
                の <code>Depends()</code>・Spring の <code>@Autowired</code>
                など、フレームワークの DI 機能を Composition Root の実装に活用する。
              </p>
            </div>
          </section>

          {/* S9: DIRECTORY */}
          <section id="directory" className="section">
            <div className="section-hdr">
              <div className="sec-num n-c">09</div>
              <h2>ディレクトリ構成とパッケージ設計</h2>
            </div>
            <p>
              クリーンアーキテクチャの
              <strong>レイヤー構造がそのままディレクトリ構造</strong>
              になります。フォルダを開けばどのレイヤーのコードかが一目でわかる構成が理想です。
            </p>
            <div className="dir-tree">
              {`my_app/
│
├── domain/                           # 🏛️ Entities 層（最内側）
│   ├── entities/
│   │   ├── order.py                  # Order, OrderLine, OrderStatus
│   │   ├── product.py                # Product
│   │   └── customer.py               # Customer
│   ├── value_objects/
│   │   ├── money.py                  # Money（不変・値比較）
│   │   └── address.py                # Address
│   └── exceptions.py                 # BusinessRuleError 等
│
├── application/                      # ⚙️ Use Cases 層
│   ├── use_cases/
│   │   ├── place_order.py            # PlaceOrderUseCase
│   │   ├── cancel_order.py           # CancelOrderUseCase
│   │   └── get_order.py              # GetOrderUseCase
│   ├── interfaces/                   # リポジトリ・サービスの抽象 ← ここが鍵！
│   │   ├── order_repository.py       # OrderRepository (ABC)
│   │   ├── product_repository.py
│   │   └── event_publisher.py
│   └── dtos/
│       ├── commands.py               # PlaceOrderCommand 等
│       └── results.py                # PlaceOrderResult 等
│
├── adapters/                         # 🔌 Interface Adapters 層
│   ├── controllers/
│   │   └── order_controller.py       # FastAPI Router
│   ├── presenters/
│   │   └── order_presenter.py        # Result → JSON 変換
│   └── repositories/
│       ├── sqlalchemy_order_repo.py  # 本番 DB 実装
│       └── in_memory_order_repo.py   # テスト用実装
│
├── infrastructure/                   # 🔧 Frameworks &amp; Drivers 層
│   ├── database/
│   │   ├── models.py                 # SQLAlchemy モデル定義
│   │   ├── session.py                # DB セッション設定
│   │   └── migrations/               # Alembic マイグレーション
│   └── messaging/
│       └── kafka_publisher.py
│
├── main.py                           # Composition Root（全依存の組み立て）
└── tests/
    ├── unit/
    │   ├── domain/                   # Entity ユニットテスト（最速・最重要）
    │   └── application/              # Use Case ユニットテスト（DB 不要）
    ├── integration/
    │   └── adapters/                 # Repository 統合テスト
    └── e2e/
        └── api/                      # API E2E テスト`}
            </div>
            <h3 className="sub">パッケージ間の依存関係</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-11"
                chart={`graph TD
    DOM["domain/<br/>(Entities 層)"]
    APP["application/<br/>(Use Cases 層)"]
    ADP["adapters/<br/>(Interface Adapters 層)"]
    INF["infrastructure/<br/>(Frameworks 層)"]
    MAIN["main.py<br/>(Composition Root)"]
    APP --> DOM
    ADP --> APP
    ADP --> DOM
    INF --> ADP
    MAIN --> INF
    DOM -. "禁止" .-> APP
    DOM -. "禁止" .-> INF
    APP -. "禁止" .-> ADP
    APP -. "禁止" .-> INF
    style DOM fill:#2c1111,stroke:#f87171,color:#f87171
    style APP fill:#2a1810,stroke:#fb923c,color:#fb923c
    style ADP fill:#292219,stroke:#fbbf24,color:#fbbf24
    style INF fill:#1e293b,stroke:#94a3b8,color:#94a3b8
    style MAIN fill:#0d1117,stroke:#6366f1,color:#818cf8`}
              />
              <div className="diagram-label">図9-1　パッケージ間の依存関係（赤破線は禁止方向）</div>
            </div>
            <div className="callout co-i">
              <div className="callout-title">💡 命名の慣習</div>
              <p>
                プロジェクトによって <code>domain/</code> を <code>core/</code>、
                <code>application/</code> を <code>usecases/</code>、<code>infrastructure/</code> を{" "}
                <code>frameworks/</code> と命名することもあります。名前より
                <strong>レイヤーの責務と依存方向</strong>
                が正しく守られているかが重要です。
              </p>
            </div>
          </section>

          {/* S10: TESTING */}
          <section id="testing" className="section">
            <div className="section-hdr">
              <div className="sec-num n-g">10</div>
              <h2>クリーンアーキテクチャのテスト戦略</h2>
            </div>
            <p>
              クリーンアーキテクチャの最大の恩恵の一つが
              <strong>テスト容易性</strong>
              です。ビジネスロジックを
              DB・フレームワークから分離したことで、大多数のテストを高速なユニットテストとして書けます。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-12"
                chart={`flowchart TD
    E2E["E2E テスト (少数)<br/>HTTP 経由で実際のシナリオを検証<br/>ツール: pytest + httpx / Playwright<br/>最も遅い・最も壊れやすい"]
    INT["統合テスト (中程度)<br/>DB・外部サービスを含めたテスト<br/>ツール: pytest + TestContainers<br/>Repository 実装の検証"]
    UNIT["ユニットテスト (多数)<br/>Domain + Use Case を DB なしでテスト<br/>ツール: pytest のみ<br/>最も重要・最速 (ミリ秒単位)"]
    UNIT --> INT --> E2E
    style E2E  fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style INT  fill:#3b2800,stroke:#fbbf24,color:#fde68a
    style UNIT fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">
                図10-1　テストピラミッド（ユニットテストが最多・最重要）
              </div>
            </div>
            <h3 className="sub">テスト種別・実行時間比較</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>テスト種別</th>
                    <th>対象レイヤー</th>
                    <th>DB 必要</th>
                    <th>100件の実行時間</th>
                    <th>信頼性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Entity ユニット</strong>
                    </td>
                    <td>
                      <code>domain/</code>
                    </td>
                    <td className="good-c">不要</td>
                    <td className="good-c">約 0.5 秒</td>
                    <td className="good-c">非常に高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Use Case ユニット</strong>
                    </td>
                    <td>
                      <code>application/</code>
                    </td>
                    <td className="good-c">不要</td>
                    <td className="good-c">約 1.2 秒</td>
                    <td className="good-c">非常に高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Repository 統合</strong>
                    </td>
                    <td>
                      <code>adapters/</code>
                    </td>
                    <td className="bad-c">必要</td>
                    <td>約 15 秒</td>
                    <td>中程度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>API E2E</strong>
                    </td>
                    <td>全層</td>
                    <td className="bad-c">必要</td>
                    <td className="bad-c">約 55 秒</td>
                    <td>低め</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="sub">ユニットテスト実装例（pytest）</h3>
            <div className="code-block">
              <div className="code-hdr">
                <span className="code-lang">Python</span>
                <span className="code-file">
                  tests/unit/domain/test_order.py &amp; tests/unit/application/test_place_order.py
                </span>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code7 }}
                />
              </pre>
            </div>
            <div className="callout co-s">
              <div className="callout-title">📌 ベストプラクティス</div>
              <p>
                テストで DB を必要としないことを最初の目標にする。<code>InMemoryRepository</code>{" "}
                を必ず実装し、全 Use Case のテストを DB なしで書ける状態にする。統合テストは{" "}
                <strong>TestContainers</strong> を使って本物の DB
                コンテナを使用し、環境依存を排除する。
              </p>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://martinfowler.com/articles/practical-test-pyramid.html">
                The Practical Test Pyramid — Martin Fowler
              </Ext>{" "}
              ／ <Ext href="https://testcontainers.com/">TestContainers</Ext>
            </p>
          </section>

          {/* S11: SOLID */}
          <section id="solid" className="section">
            <div className="section-hdr">
              <div className="sec-num n-i">11</div>
              <h2>SOLID 原則とクリーンアーキテクチャ</h2>
            </div>
            <p>
              クリーンアーキテクチャは <strong>SOLID 原則</strong>
              を実践的に体現したアーキテクチャです。各原則がどのレイヤーでどう活かされるか理解することが、設計力向上の近道です。
            </p>
            <div className="solid-grid">
              <div className="solid-card">
                <div className="solid-letter" style={{ color: "#f87171" }}>
                  S
                </div>
                <div className="solid-name">単一責任原則</div>
                <div className="solid-desc">1 クラス＝1 変更理由</div>
              </div>
              <div className="solid-card">
                <div className="solid-letter" style={{ color: "#fb923c" }}>
                  O
                </div>
                <div className="solid-name">開放閉鎖原則</div>
                <div className="solid-desc">拡張に開き・修正に閉じる</div>
              </div>
              <div className="solid-card">
                <div className="solid-letter" style={{ color: "#fbbf24" }}>
                  L
                </div>
                <div className="solid-name">リスコフ置換原則</div>
                <div className="solid-desc">サブクラスは代替可能</div>
              </div>
              <div className="solid-card">
                <div className="solid-letter" style={{ color: "#4ade80" }}>
                  I
                </div>
                <div className="solid-name">インターフェース分離</div>
                <div className="solid-desc">小さなインターフェース</div>
              </div>
              <div className="solid-card">
                <div className="solid-letter" style={{ color: "#818cf8" }}>
                  D
                </div>
                <div className="solid-name">依存性逆転原則</div>
                <div className="solid-desc">抽象に依存する</div>
              </div>
            </div>
            <h3 className="sub">SOLID とクリーンアーキテクチャの対応</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>原則</th>
                    <th>クリーンアーキテクチャでの実現</th>
                    <th>悪い例</th>
                    <th>良い例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>S — 単一責任</strong>
                    </td>
                    <td>
                      Controller は変換のみ、UseCase はフロー管理のみ、Entity はビジネスルールのみ
                    </td>
                    <td className="bad-c">Controller にビジネスロジックが混在</td>
                    <td className="good-c">責務ごとにクラス分離</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>O — 開放閉鎖</strong>
                    </td>
                    <td>新決済手段の追加 → 新クラスを追加するだけ、既存 UseCase は修正不要</td>
                    <td className="bad-c">
                      <code>if payment == "credit": stripe_charge()</code> を毎回追加
                    </td>
                    <td className="good-c">PaymentGateway Interface を実装</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>L — リスコフ置換</strong>
                    </td>
                    <td>InMemoryRepo と SQLAlchemyRepo が完全に交換可能</td>
                    <td className="bad-c">テスト用クラスが一部メソッドを未実装</td>
                    <td className="good-c">全メソッドを正しく実装</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>I — インターフェース分離</strong>
                    </td>
                    <td>OrderReadRepository と OrderWriteRepository に分割</td>
                    <td className="bad-c">読み取り専用クラスに save() が必要になる</td>
                    <td className="good-c">用途別に小さいインターフェース</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D — 依存性逆転</strong>
                    </td>
                    <td>UseCase が OrderRepository 抽象に依存、SQLAlchemy は外側で実装</td>
                    <td className="bad-c">UseCase が Session を直接生成</td>
                    <td className="good-c">コンストラクタで抽象を受け取る</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="sub">開放閉鎖原則（OCP）の具体例</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-13"
                chart={`flowchart TD
    subgraph BAD_OCP["OCP 違反 (修正に開いている)"]
        UC2["PlaceOrderUseCase\nif payment == 'credit': stripe_charge()\nelif payment == 'paypal': paypal_charge()\nelif payment == 'new': ..."]
    end
    subgraph GOOD_OCP["OCP 準拠 (拡張に開いている)"]
        IF2["PaymentGateway\n(インターフェース)"]
        ST2["StripeGateway\n(実装 A)"]
        PP2["PayPalGateway\n(実装 B)"]
        NM2["NewMethodGateway\n(実装 C: 追加するだけ)"]
        UC3["PlaceOrderUseCase\ngateway.charge(order)"]
        ST2 --> IF2
        PP2 --> IF2
        NM2 --> IF2
        UC3 --> IF2
    end
    style UC2 fill:#7f1d1d,stroke:#ef4444,color:#fca5a5
    style IF2 fill:#2a1810,stroke:#fb923c,color:#fb923c
    style UC3 fill:#14532d,stroke:#22c55e,color:#86efac
    style NM2 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style ST2 fill:#14532d,stroke:#22c55e,color:#86efac
    style PP2 fill:#14532d,stroke:#22c55e,color:#86efac`}
              />
              <div className="diagram-label">
                図11-1　OCP 違反 vs 準拠（新機能追加時の影響範囲の違い）
              </div>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html">
                SOLID Relevance — Uncle Bob (2020)
              </Ext>
            </p>
          </section>

          {/* S12: ANTI-PATTERNS */}
          <section id="antipatterns" className="section">
            <div className="section-hdr">
              <div className="sec-num n-r">12</div>
              <h2>アンチパターン</h2>
            </div>
            <p>
              クリーンアーキテクチャを導入する際によく犯す失敗パターンを紹介します。アンチパターンを知ることで、設計の健全性を保てます。
            </p>

            <div className="ap-card">
              <div className="ap-hdr">
                <span className="ap-icon">💧</span>
                <div className="ap-title">Anti-Pattern 1：Leaky Abstraction（漏れた抽象）</div>
              </div>
              <div className="ap-body">
                <div className="ap-problem">
                  Use Case が SQLAlchemy の <code>Session</code>{" "}
                  を直接コンストラクタで受け取っている。フレームワークの詳細が Use Case
                  層に漏れている状態。テスト時に必ず本物の DB が必要になる。
                </div>
                <div className="ap-fix">
                  Repository インターフェースを経由する。
                  <code>def __init__(self, repo: OrderRepository)</code> — Use Case
                  は抽象のみを知る。具体的な DB 実装は外側レイヤーに閉じる。
                </div>
              </div>
            </div>

            <div className="ap-card">
              <div className="ap-hdr">
                <span className="ap-icon">🩸</span>
                <div className="ap-title">Anti-Pattern 2：Anemic Domain Model（貧血モデル）</div>
              </div>
              <div className="ap-body">
                <div className="ap-problem">
                  Entity が getter / setter しか持たず、ビジネスロジックが全て Service
                  層に書かれている。「クリーンアーキテクチャを導入した」と言いながら、ドメイン層に何もない状態。
                </div>
                <div className="ap-fix">
                  <code>order.confirm()</code> のようにビジネス操作を Entity
                  のメソッドとして定義する。Entity
                  が自身の不変条件（空注文は確定不可・発送後はキャンセル不可 etc.）を守る Rich
                  Domain Model を目指す。
                </div>
              </div>
            </div>

            <div className="ap-card">
              <div className="ap-hdr">
                <span className="ap-icon">🏋️</span>
                <div className="ap-title">Anti-Pattern 3：Fat Entity（太りすぎた Entity）</div>
              </div>
              <div className="ap-body">
                <div className="ap-problem">
                  Entity
                  にHTTPレスポンス生成・メール送信・ログ出力・外部API呼び出しを何でも詰め込んでいる。単一責任原則（SRP）の違反。Entity
                  が外部ライブラリを import し始めたら危険信号。
                </div>
                <div className="ap-fix">
                  Entity はビジネスルールのみを持つ。副作用（メール送信・通知等）は Domain Event
                  として Use Case 層が処理する。Entity のテストは new Order() だけで完結すべき。
                </div>
              </div>
            </div>

            <div className="ap-card">
              <div className="ap-hdr">
                <span className="ap-icon">🌩️</span>
                <div className="ap-title">Anti-Pattern 4：God Use Case（神ユースケース）</div>
              </div>
              <div className="ap-body">
                <div className="ap-problem">
                  1 つの UseCase
                  が注文・在庫・決済・通知・配送をすべて処理する巨大クラスになっている。変更の影響範囲が爆発的に広がり、テストも書きにくくなる。
                </div>
                <div className="ap-fix">
                  1 UseCase = 1 ビジネスアクション。<code>PlaceOrderUseCase</code> /{" "}
                  <code>ProcessPaymentUseCase</code> / <code>NotifyCustomerUseCase</code>{" "}
                  のように分割し、Domain Event で疎結合に連携させる。
                </div>
              </div>
            </div>

            <div className="ap-card">
              <div className="ap-hdr">
                <span className="ap-icon">⏭️</span>
                <div className="ap-title">Anti-Pattern 5：Layer Skipping（レイヤースキップ）</div>
              </div>
              <div className="ap-body">
                <div className="ap-problem">
                  Controller が Use Case を飛ばして Repository
                  を直接呼び出している。「この処理は単純だから」という理由でショートカットを取りがち。ビジネスロジックが
                  Controller に漏れる温床になる。
                </div>
                <div className="ap-fix">
                  必ず <code>Controller → UseCase → Repository</code> の順を守る。Use Case{" "}
                  が「簡単すぎる」と感じても、将来の変更に備えて経由する設計を維持する。
                </div>
              </div>
            </div>

            <h3 className="sub">設計の健全性チェックフロー</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-14"
                chart={`flowchart TD
    START["健全性チェック開始"]
    Q1{"domain/ に SQLAlchemy, FastAPI 等の<br/>import があるか？"}
    Q2{"Use Case が HTTP リクエストオブジェクトを<br/>直接受け取っているか？"}
    Q3{"DB なしで Use Case の<br/>ユニットテストが書けるか？"}
    Q4{"Entity にビジネスメソッドがあるか？<br/>(getter/setter のみでない？)"}
    Q5{"Controller にビジネスロジックが<br/>含まれていないか？"}
    HEALTHY["健全なクリーンアーキテクチャ！"]
    FIX1["外部 import を取り除く<br/>標準ライブラリのみに限定"]
    FIX2["Input DTO を定義する<br/>Command / Query で境界を設ける"]
    FIX3["InMemory Repository を導入<br/>Interface から設計し直す"]
    FIX4["ロジックを Entity へ移動<br/>Rich Domain Model に移行"]
    FIX5["ロジックを UseCase へ移動<br/>Controller は変換のみにする"]
    START --> Q1
    Q1 -->|"Yes (ある)"| FIX1
    Q1 -->|"No"| Q2
    Q2 -->|"Yes"| FIX2
    Q2 -->|"No"| Q3
    Q3 -->|"No (書けない)"| FIX3
    Q3 -->|"Yes"| Q4
    Q4 -->|"No (setter のみ)"| FIX4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No (含んでいる)"| FIX5
    Q5 -->|"Yes"| HEALTHY
    style HEALTHY fill:#14532d,stroke:#22c55e,color:#86efac
    style FIX1 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style FIX2 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style FIX3 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style FIX4 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style FIX5 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style START fill:#1a2538,stroke:#818cf8,color:#c7d2fe`}
              />
              <div className="diagram-label">
                図12-1　設計の健全性チェックフロー（全て Yes → 合格）
              </div>
            </div>
          </section>

          {/* S13: BEST PRACTICES */}
          <section id="bestpractices" className="section">
            <div className="section-hdr">
              <div className="sec-num n-g">13</div>
              <h2>ベストプラクティス総まとめ</h2>
            </div>
            <h3 className="sub">レイヤー別ベストプラクティス</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>レイヤー</th>
                    <th>やるべきこと ✅</th>
                    <th>やってはいけないこと ❌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="lb lb-en">Entities</span>
                    </td>
                    <td>
                      ビジネスルールを Entity に集約
                      <br />
                      Value Object は <code>frozen=True</code>
                      <br />
                      ファクトリメソッドで生成
                    </td>
                    <td className="bad-c">
                      フレームワークの import
                      <br />
                      DB カラム定義の記述
                      <br />
                      副作用を持つ処理
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="lb lb-uc">Use Cases</span>
                    </td>
                    <td>
                      インターフェースのみに依存
                      <br />
                      Input/Output DTO で境界を明確化
                      <br />1 UseCase = 1 アクション
                    </td>
                    <td className="bad-c">
                      HTTP リクエストを直接受け取る
                      <br />
                      具体的な DB 操作を書く
                      <br />
                      FW 固有の機能を使う
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="lb lb-ad">Adapters</span>
                    </td>
                    <td>
                      ドメインモデルと DB モデルを分離
                      <br />
                      Mapper メソッドで変換を明確に
                      <br />
                      エラーを HTTP ステータスに変換
                    </td>
                    <td className="bad-c">
                      ビジネスロジックを置く
                      <br />
                      Entity を直接 DB に保存
                      <br />
                      UseCase を飛ばして DB アクセス
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="lb lb-fw">Frameworks</span>
                    </td>
                    <td>
                      設定・初期化・ルーティングのみ
                      <br />
                      Composition Root で全依存を組み立て
                      <br />
                      環境変数の読み込み
                    </td>
                    <td className="bad-c">
                      ビジネスロジックを混入
                      <br />
                      UseCase から DB セッションを生成
                      <br />
                      外側の詳細を内側で参照
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="sub">クリーンアーキテクチャの成熟度モデル</h3>
            <div className="maturity">
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#ef4444" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#ef4444" }}>
                    Level 0
                  </div>
                  <div className="mat-title">スパゲッティ</div>
                  <div className="mat-desc">
                    ビジネスロジックが Controller に、DB アクセスが View に散乱。全てが密結合。
                  </div>
                </div>
              </div>
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#f97316" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#f97316" }}>
                    Level 1
                  </div>
                  <div className="mat-title">レイヤードアーキテクチャ</div>
                  <div className="mat-desc">
                    Controller / Service / Repository の分離はできているが、DB
                    構造がドメインを支配している。テストに DB が必要。
                  </div>
                </div>
              </div>
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#fbbf24" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#fbbf24" }}>
                    Level 2
                  </div>
                  <div className="mat-title">ドメイン分離</div>
                  <div className="mat-desc">
                    Entity と Value Object を導入。ビジネスルールをドメイン層に集約。DB
                    依存は残るが、少し改善。
                  </div>
                </div>
              </div>
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#4ade80" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#4ade80" }}>
                    Level 3
                  </div>
                  <div className="mat-title">インターフェース導入</div>
                  <div className="mat-desc">
                    Repository Interface と Use Case を分離。DB
                    なしでユニットテストが可能に。クリーンアーキテクチャの真価が発揮され始める。
                  </div>
                </div>
              </div>
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#818cf8" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#818cf8" }}>
                    Level 4
                  </div>
                  <div className="mat-title">完全なクリーンアーキテクチャ</div>
                  <div className="mat-desc">
                    全層の依存が内側のみ。フレームワーク交換可能。Composition Root
                    で全依存を組み立て。テストピラミッドが健全。
                  </div>
                </div>
              </div>
              <div className="mat-row">
                <div className="mat-ind">
                  <div className="mat-dot" style={{ background: "#22d3ee" }} />
                  <div className="mat-line" />
                </div>
                <div className="mat-body">
                  <div className="mat-lv" style={{ color: "#22d3ee" }}>
                    Level 5
                  </div>
                  <div className="mat-title">CA + DDD + EDA</div>
                  <div className="mat-desc">
                    Bounded Context + Domain Events + Event-Driven
                    Architecture。マイクロサービスへの展開も容易。
                  </div>
                </div>
              </div>
            </div>

            <h3 className="sub">クリーンアーキテクチャをいつ適用するか？</h3>
            <div className="diagram-wrap">
              <MermaidDiagram
                id="diag-15"
                chart={`flowchart TD
    START["クリーンアーキテクチャを適用するか判断"]
    Q1{"ビジネスロジックが<br/>complex か？"}
    Q2{"プロジェクトが<br/>1 年以上続く予定か？"}
    Q3{"チームが 5 人以上か<br/>または今後拡大予定か？"}
    Q4{"複数の FE / 複数チャンネル<br/>(Web/モバイル/API) があるか？"}
    FULL["フルCA 推奨<br/>全レイヤーを導入する"]
    PART["部分適用<br/>Domain + UseCase 層のみ<br/>Adapter/FW は軽量に"]
    SIMPLE["シンプルアーキテクチャ<br/>MVC または軽量レイヤード<br/>過剰設計を避ける"]
    START --> Q1
    Q1 -->|"No"| SIMPLE
    Q1 -->|"Yes"| Q2
    Q2 -->|"No"| PART
    Q2 -->|"Yes"| Q3
    Q3 -->|"No"| PART
    Q3 -->|"Yes"| Q4
    Q4 -->|"Yes"| FULL
    Q4 -->|"No"| PART
    style FULL   fill:#14532d,stroke:#22c55e,color:#86efac
    style PART   fill:#292219,stroke:#fbbf24,color:#fbbf24
    style SIMPLE fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style START  fill:#1a2538,stroke:#818cf8,color:#c7d2fe`}
              />
              <div className="diagram-label">図13-1　適用判断のデシジョンツリー</div>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--t4)" }}>
              📖 出典：
              <Ext href="https://github.com/cosmicpython/book">
                Architecture Patterns with Python (Cosmic Python)
              </Ext>
            </p>
          </section>

          {/* S14: REFERENCES */}
          <section id="references" className="section">
            <div className="section-hdr">
              <div className="sec-num n-i">14</div>
              <h2>参考文献・ソース一覧</h2>
            </div>
            <h3 className="sub">📚 必読書籍</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>難易度</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Clean Architecture: A Craftsman's Guide</strong>
                    </td>
                    <td>Robert C. Martin</td>
                    <td>★★★★☆</td>
                    <td>CA 原典。Uncle Bob による決定版。</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Domain-Driven Design</strong>
                    </td>
                    <td>Eric Evans</td>
                    <td>★★★★★</td>
                    <td>DDD と CA の組み合わせに必須。</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Architecture Patterns with Python</strong>
                    </td>
                    <td>Harry Percival / Bob Gregory</td>
                    <td>★★★☆☆</td>
                    <td>Python での CA・DDD 実践書。</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Implementing Domain-Driven Design</strong>
                    </td>
                    <td>Vaughn Vernon</td>
                    <td>★★★★☆</td>
                    <td>DDD の実践的実装（CA 適用例多数）。</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Clean Code</strong>
                    </td>
                    <td>Robert C. Martin</td>
                    <td>★★★☆☆</td>
                    <td>コード品質とアーキテクチャ of 基礎。</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="sub">🌐 公式ドキュメント・重要 URL</h3>
            <div className="ref-grid">
              <Ext
                href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
                className="ref-card"
              >
                <div className="ref-title">The Clean Architecture（原典）</div>
                <div className="ref-url">blog.cleancoder.com — Uncle Bob 原文ブログ (2012)</div>
              </Ext>
              <Ext href="https://martinfowler.com/eaaCatalog/repository.html" className="ref-card">
                <div className="ref-title">Repository Pattern — Martin Fowler</div>
                <div className="ref-url">martinfowler.com/eaaCatalog/repository.html</div>
              </Ext>
              <Ext
                href="https://martinfowler.com/bliki/AnemicDomainModel.html"
                className="ref-card"
              >
                <div className="ref-title">Anemic Domain Model（アンチパターン）</div>
                <div className="ref-url">martinfowler.com — Martin Fowler</div>
              </Ext>
              <Ext
                href="https://herbertograca.com/2017/09/14/ports-adapters-architecture/"
                className="ref-card"
              >
                <div className="ref-title">Ports &amp; Adapters Architecture</div>
                <div className="ref-url">herbertograca.com — 詳細解説</div>
              </Ext>
              <Ext
                href="https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/"
                className="ref-card"
              >
                <div className="ref-title">The Onion Architecture</div>
                <div className="ref-url">jeffreypalermo.com — Jeffrey Palermo (2008)</div>
              </Ext>
              <Ext
                href="https://martinfowler.com/articles/practical-test-pyramid.html"
                className="ref-card"
              >
                <div className="ref-title">The Practical Test Pyramid</div>
                <div className="ref-url">martinfowler.com — テスト戦略の詳細</div>
              </Ext>
              <Ext href="https://github.com/cosmicpython/book" className="ref-card">
                <div className="ref-title">Cosmic Python（Architecture Patterns with Python）</div>
                <div className="ref-url">github.com/cosmicpython/book — サンプルコード</div>
              </Ext>
              <Ext href="https://testcontainers.com/" className="ref-card">
                <div className="ref-title">TestContainers — 統合テスト用</div>
                <div className="ref-url">testcontainers.com — Docker ベースのテスト環境</div>
              </Ext>
              <Ext
                href="https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html"
                className="ref-card"
              >
                <div className="ref-title">SOLID Relevance — Uncle Bob (2020)</div>
                <div className="ref-url">blog.cleancoder.com — SOLID 原則の現代的解説</div>
              </Ext>
              <Ext href="https://docs.pytest.org/" className="ref-card">
                <div className="ref-title">Pytest 公式ドキュメント</div>
                <div className="ref-url">docs.pytest.org — Python テストフレームワーク</div>
              </Ext>
            </div>
          </section>
        </div>
        {/* .content */}
        <footer>
          <p>
            🏛️ <strong>クリーンアーキテクチャ 完全ガイド</strong> — Python 実装例付き
          </p>
          <p style={{ marginTop: 6 }}>
            原典：
            <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
              The Clean Architecture by Robert C. Martin (2012)
            </Ext>{" "}
            ／{" "}
            <Ext href="https://www.goodreads.com/book/show/18043011-clean-architecture">
              Clean Architecture: A Craftsman's Guide (2017)
            </Ext>
          </p>
        </footer>
      </main>
    </div>
  );
}
