---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: MonoRepo Guide - Tool Selection & OXC
vitePlugin:
  icons:
    compiler: vue3
---
<!--
Today I'm excited to share with you an important topic in modern frontend development
-->

---
layout: intro
class: pl-40
glowSeed: 14
---
# Michael <sup opacity-80 font-hand text-4xl>ming</sup>

<div class="[&>*]:important-leading-10 opacity-90">

- Software Engineer
- Passionate about new technologies

</div>

<div my-10 w-min flex="~ gap-1" items-center justify-center op85>
  <div i-ri-global-line op80 ma text-xl />
  <div><a href="https://www.michaello.me/" target="_blank" border-none="!">mingtech.tw</a></div>

  <div i-ri-instagram-line op80 ma text-xl ml4 text="#E1306C" />
  <div><a href="https://www.instagram.com/michaello.dev/" border-none="!" target="_blank">mingtech.tw</a></div>

  <div i-ri-github-fill op80 ma text-xl ml4 />
  <div w-40><a href="https://github.com/Michael0520" target="_blank" border-none="!">michael860520</a></div>
</div>

<img src="/avatar.jpg" rounded-full w-40 abs-tr mt-32 mr-30 />

<!--
Hi, I'm Michael, focused on frontend architecture

另外也是饅頭計劃的 FE mentor
-->

---
layout: cover
title: MonoRepo Performance Revolution
---
<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 1 ? 'scale-150' : 'op50'">
  <span>MonoRepo - </span>
  <span>Tool Selection</span>
  <span v-click>& OXC</span>
</div>
<div mt1 forward:delay-300 v-click>From Pain Points to Solutions</div>
</h1>

<div abs-br mx-10 my-11 flex="~ col gap-4 items-end" text-left v-click="1">
  <span>JSDC 2025 Meetup</span>
  <div text-xs opacity-75 mt--4>2025.06.29</div>
</div>

<!--
今天我要分享的是 MonoRepo 實戰指南，特別是工具選型與 OXC 這個工具是如何帶來性能上的突破

針對痛點到有哪一些的解決方案


## 這邊想要了解下大家是不是有聽過或是已經正在使用 monoRepo 在現有專案或是公司專案呢？
-->

---
layout: center
class: text-center
glowX: 50
glowY: 100
---
<h1 important-text-5xl>What's the Pain Point?</h1>

<div text-white:50 text-2xl leading-10>
When you want to create a PR, but have to wait <span text-yellow2 italic v-mark.yellow.underline>10 minutes</span> for linting, even when you only changed <span text-lime2 v-mark.lime.underline>one line</span>
</div>

<!--
我相信很多人都有過這樣的經驗：

1. 在 TypeScript MonoRepo 專案中，修改一個共享組件
2. 結果 ESLint + TypeScript 檢查要跑 1 分鐘

3. 好不容易本地 pre-commit hook 通過了，推到 GitHub 後 CI 又要重新跑一遍相同的檢查

4. 最痛苦的是，你以為檢查通過了，結果 CI 失敗，又要重新修改、重新等待

讓原本應該 1 分鐘完成的提交變成了 10 分鐘的折磨。
-->

---
glow: right
class: text-center
clicks: 6
title: Complexity Explosion
---
<div transition duration-800 :class="$clicks < 2 ? 'translate-y-45' : ''" relative>

# Complexity <span v-mark.linethrough.red.delay200="{at:1,roughness:6,seed:146}" transition inline-block :class="$clicks >= 1 ? 'op50' : ''">Growth</span>

<div font-hand bold absolute rotate--4 left-106 top-10 text-3xl text-lime1 delay-300 v-click>Explosion!</div>

</div>

<div v-click="2" mt-20>

<div flex="~ col gap-8">

<div class="flex justify-start items-center gap-8">

<div v-click="3">
<h3 flex="~ items-center gap-3" text-xl font-bold mb-6 justify-start>
  <div i-carbon-layers text-red-400 text-2xl />
  <span>Multi-Platform Requirements</span>
</h3>
<div flex="~ col gap-3" text-lg text-white:80>
  <div flex="~ items-center gap-3" v-click="4">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Web (React, Vue, Angular)</span>
  </div>
  <div flex="~ items-center gap-3" v-click="4">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Mobile (React Native)</span>
  </div>
  <div flex="~ items-center gap-3" v-click="4">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Desktop (Electron)</span>
  </div>
  <div flex="~ items-center gap-3" v-click="4">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Cross-platform business logic</span>
  </div>
</div>
</div>

<div v-click="5">
<h3 flex="~ items-center gap-3" text-xl font-bold mb-6 justify-start>
  <div i-carbon-version text-yellow-400 text-2xl />
  <span>Version Management Chaos</span>
</h3>
<div flex="~ col gap-3" text-lg text-white:80>
  <div flex="~ items-center gap-3" v-click="6">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Shared component version sync</span>
  </div>
  <div flex="~ items-center gap-3" v-click="6">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Design system propagation</span>
  </div>
  <div flex="~ items-center gap-3" v-click="6">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Utility library dependencies</span>
  </div>
  <div flex="~ items-center gap-3" v-click="6">
    <div i-carbon-circle-filled text-xs op30 />
    <span>Frequent package updates</span>
  </div>
</div>
</div>

</div>
</div>

</div>

<!--
現代前端開發面臨的不是簡單的複雜度增長，而是複雜度爆炸！

包括：
1. 多平台支援：多框架 Web、移動端、桌面應用需要共享業務邏輯
2. 版本管理：內部開發工具、UI system、sdk 的版本同步是噩夢
3. 依賴複雜度：假如今天都是個別獨立倉庫，那每次的更新都會影響其他專案，因為必須手動同步版本，導致錯誤或是效率降低

## 案例
例如一個簡單的 icon 內部庫需要更新，結果需要同步十幾個專案的版本，這種重複手工的行為就會嚴重影響開發效率。
-->

---
class: text-2xl
glow: right
title: Make Development Easier
---
# Make Development <span font-hand text-green scale-110 ml1 inline-block>Easier!</span>

<div flex="~ gap-2 items-center" mt-15>
  <div i-carbon-hammer text-2xl />
  <span>Modern Development Tool Costs</span>
</div>

<div grid="~ cols-[max-content_min-content_auto] items-center gap-6" py8 px3>
  <div flex="~ gap-2 items-center" text-blue relative>
    <div w-35px h-45px border="l b gray/30" left-0 bottom-15px absolute />
    <div i-carbon-search text-2xl ml-12/>
    <span>Discovery Cost</span>
  </div>
  <div i-carbon-arrow-right op50 />
  <div v-after>Change one line, check entire project</div>

  <div flex="~ gap-2 items-center" text-lime relative>
    <div w-35px h-56px border="l b gray/30" left-0 bottom-15px absolute />
    <div i-carbon-time text-2xl ml-12/>
    <span>Waiting Cost</span>
  </div>
  <div i-carbon-arrow-right op50 />
  <div v-after>CI pipeline stuck 10 minutes on linting</div>

  <div flex="~ gap-2 items-center" text-amber relative>
    <div w-35px h-56px border="l b gray/30" left-0 bottom-15px absolute />
    <div i-carbon-repeat text-2xl ml-12/>
    <span>Duplication Cost</span>
  </div>
  <div i-carbon-arrow-right op50 />
  <div v-after>Every tool re-parses the same code</div>

  <div flex="~ gap-2 items-center" text-orange relative>
    <div w-35px h-56px border="l b gray/30" left-0 bottom-15px absolute />
    <div i-carbon-settings text-2xl ml-12 />
    <span>Configuration Cost</span>
  </div>
  <div i-carbon-arrow-right op50 />
  <div v-after>Multiple projects need consistent configs</div>
</div>

<!--
所以我們需要讓開發變得更容易！

現代開發工具的成本包括：

1. 發現問題的成本
2. 檔案一大後，等待時間成本
3. 重複造輪子成本
4. 配置複雜度成本

這些成本如果不加以控制，就會嚴重影響開發效率
-->

---
class: text-2xl
glow: right
title: MonoRepo Advantages
---
# MonoRepo Advantages{.text-green}

<div pt3 />

- **Shared Components** - Reusable UI elements
- **Business Logic Sharing** - Unified validation rules
- **Unified Toolchain** - Consistent development experience
- **Cross-platform Support** - Web/Mobile/Desktop
- **Enterprise Standards** - Unified quality standards

<!--
針對 MonoRepo 的整合能力做總結

他是在改善：
1. 共用元件、共用業務邏輯
2. 統一工具鏈
3. 跨平台支援
4. 統一程式碼的品質
-->

---
layout: center
class: text-center
title: Integration Levels
---
<h1 important-text-5xl>Integration Levels</h1>

<h3 v-click text-white:50>Cover different scenarios, coexist with other technologies, <span text-1.4em font-hand text-blue v-mark.highlight.delay400="{at:1,color:'#60a5fa20'}">easy to adopt</span></h3>

<!--
MonoRepo 的漸進式整合提供不同的層級

涵蓋不同場景，可以與其他技術共存，最重要的是易於採用
-->

---
glow: bottom
---
# MonoRepo Tool Selection

<div v-click text-white:50 mt5>
Choose the <b text-white:75>right tool</b> based on team size:
</div>

<div flex="~ col gap-6" mt8>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-user text-2xl />
    <span font-bold>Small Team (3-5 people)?</span>
  </div>
  <span v-click op75 ml4>pnpm Workspaces is sufficient</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-user-multiple text-2xl />
    <span font-bold>Medium Team (5-10 people)?</span>
  </div>
  <span v-click op75 ml4>Turborepo for better caching & parallelization</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-enterprise text-2xl />
    <span font-bold>Large Team (10+ people)?</span>
  </div>
  <span v-click op75 ml4 flex="~ items-center gap1">Nx for enterprise features & dependency graph</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-warning-filled text-2xl />
    <span font-bold>Performance Bottleneck?</span>
  </div>
  <span v-click op75 ml4>This is why we need OXC</span>
</div>

</div>

<!--
接著我們來看看現有的工具選項。

pnpm Workspaces 適用於輕量級專案（3-5 人），提供原生 MonoRepo 支援、安裝快速和零額外依賴，學習曲線相對的簡單，適合漸進式迭代到 MonoRepo，或是沒有太多特殊規則的專案，例如：我自己個人大量的 side project 就是使用它，因為速度快且容易安裝，只需一個 pnpm-workspace.yaml 檔案即可完成 MonoRepo 配置。

接著是 Turborepo 適用於中小型團隊（5-10 人），具有獨特的快取機制、vercel 所提供的雲端快取和簡單配置，如果專案大多是 NextJS 起手，那我很推薦。

最後是 Nx 適用於中大型團隊（10+ 人），核心優勢是依賴圖分析、智慧增量建構和豐富的插件生態，但學習曲線陡峭，適合解決大體積的程式碼，官方還提供了 nx-cloud 等等的大量解決方案來解決大專案的效能、共享、權限劃分、git 管理的設計方式。

但是，無論選擇哪個工具，它們都有一個共同的死穴：性能瓶頸。
-->

---
glowX: 50
glowY: 130
class: flex flex-col items-center justify-center
title: void-zero
---
<div v-click="1" text-center absolute left-1 right-1 transition-all duration-400 op75 ease-in-out :class="$clicks === 1 ? 'scale-250 bottom-50%' : 'bottom-10'">
Void Zero Ecosystem
</div>

<div v-click="2" w-full flex justify-center>
<img src="https://www.codefarmer.tw/blog/fe-tools/08/roadmap.png" rounded-lg shadow-lg/>
</div>

<div v-click="3" text-center text-sm op60 mt-10>
ref: <a href="https://www.codefarmer.tw/blog/jsdc-2024-notes" target="_blank" class=" hover:underline">VoidZero - JS Ecosystem Swiss Army Knife</a>
</div>

<!--
討論 OXC 之前，先快速討論下什麼他的背景公司，
由 Evan You 領導的 Void Zero 團隊，連同 Oxlint、Roll Down 和 TS down，正在打造 Rust 驅動的 JavaScript 工具鏈。

Oxlint 只是 Oxidation Compiler 計劃中八個 JavaScript 工具之一，該計劃還包括壓縮器、格式化工具和全新的 JavaScript 引擎。
這預示著前端開發的基礎設施正在迎來一場由性能驅動的底層革命。
-->

---
glowX: 50
glowY: 130
class: flex flex-col items-center justify-center
title: OXC
---
<div text-center absolute left-1 right-1 transition-all duration-400 op75 ease-in-out :class="$clicks === 0 ? 'scale-250 bottom-50%' : 'bottom-5'">
Oxidation Compiler
</div>

<img src="https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets/round-bubbles.png" w-40 h-40 mt--20 />
<h1 v-click forward:delay-400 text-center important-text-5xl font-800 important-leading-1.1em>Revolutionary<br><span text-hex-ce422b>Performance</span></h1>
<div v-click text-xl op75>
"50-100x speed boost, end the waiting"
</div>

<!--
1. XC：革命性解決方案
這個解決方案就是 OXC - Oxidation Compiler Collection。Oxlint 1.0 就是這個計劃的一部分，一個用 Rust 開發的 JavaScript 程式碼檢查工具。
OXC 的核心優勢是：
- 50-100倍 速度提升
- 80% 記憶體減少
- 一次 AST 解析
- 原生 並行處理
-->

---
glow: bottom
---
# Performance Optimization

<div v-click text-white:50 mt3 mb6>
From problem identification to <b text-white:75 font-bold>solutions</b>:
</div>

<div flex="~ col gap-6">

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-warning text-2xl />
    <span font-bold>Traditional Tool Problems</span>
  </div>
  <span v-click op75 ml4>ESLint, Prettier, TypeScript parse AST separately</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-analytics text-2xl />
    <span font-bold>Root Cause Analysis</span>
  </div>
  <span v-click op75 ml4>Same file parsed 4 times!</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-idea text-2xl />
    <span font-bold>OXC Innovation</span>
  </div>
  <span v-click op75 ml4>Unified AST, parse once, reuse everywhere</span>
</div>

<div flex="~ gap-2 items-center">
  <div flex="~ gap-2 items-center" v-click>
    <div i-carbon-rocket text-2xl />
    <span font-bold>Real Results</span>
  </div>
  <span v-click op75 ml4>Shopify: 75min → 10s, Airbnb: 126k+ files in 7s</span>
</div>

</div>

<!--
關鍵在於「統一 AST 的革命」。傳統工具鏈的問題是：ESLint 解析一次、Prettier 解析一次、Babel 解析一次、TypeScript 又解析一次。同一個檔案要解析 4 次！
而 OXC 只解析一次，然後讓所有工具復用同一個 AST。這就是為什麼能有數十倍的性能提升。
Oxlint 1.0 宣稱比 ESLint 快 50-100 倍，比 Biome 快 2 倍。實際效能測試顯示，在零配置情況下，Oxlint 表現最佳。
Oxlint 的其他優勢包括：
功能特色：擁有自己的規則集，支援超過 500 個 ESLint 規則，並提供 VS Code、WebStorm 和 Zed 的擴充功能。
採用情況：已被近 6,000 個不同的程式庫使用，包括 Shopify、Airbnb 和 Mercedes-Benz 等知名公司的專案。
讓我們看看真實的企業案例：
Shopify：500 萬行程式碼，從 75 分鐘降到 10 秒。 Airbnb：126,000+ 檔案，7 秒完成檢查。 Mercedes-Benz：71% 時間節省。
這些都是真實的、可驗證的性能提升。
-->

---
class: grid grid-cols-[auto_640px] gap-4 items-center justify-center
glow: left
---
<div flex="~ col gap-4">
<div text-4xl>Start Immediately</div>
<div op50 v-click>Zero risk, high reward<br>performance boost</div>
</div>

```bash
# Step 1: Install OXC
pnpm add eslint-plugin-oxlint -D

# Step 2: Update scripts
{
  "scripts": {
    "lint": "oxlint && eslint ."
  }
}

# Step 3: Configure ESLint
// .eslintrc.js
module.exports = {
  // ... other config
  extends: [
    // ... other presets
    "plugin:oxlint/recommended",
  ],
}
```

<div text-left text-sm op60 mt-10 w-full>
ref: <a href="https://github.com/oxc-project/eslint-plugin-oxlint" target="_blank" class=" hover:underline">eslint-plugin-oxlint</a>
</div>

<!--
因為官方的 oxlint 雖然已經支援了 500 個規格，但我還是不建議全部換掉成 eslint，避免真的有一兩個規則漏掉支援，

這個套件的解決方式，可以讓你安全的迭代過去，同時支援 oxlint 的效能和 ESLint 的生態，而不會有重複檢查的浪費，它自動關閉 ESLint 中已被 oxlint 支援的規則，實現：

讓團隊能平滑地從純 ESLint 過渡到 oxlint + ESLint 的混合方案
-->

---
class: flex flex-col gap-6 items-center justify-center
glow: right
---
<div flex="~ col gap-4" text-right>
<div text-4xl text-center>With Nx CLI Affected</div>
<div op50 v-click="1">Smart dependency analysis for maximum optimization</div>
</div>

<div v-click="1">

```json
// Current best integration: Unified AST + Smart filtering
{
  "lint": "oxlint && nx affected:lint --uncommitted --fix --parallel",
  "lint:all": "oxlint && nx run-many -t lint --fix --parallel"
}
```

</div>

<!--
Nx Affected 的智慧優化：
- 透過 Git 歷史和專案圖分析受影響的專案
- 只對變更的程式碼執行 linting
- 搭配遠端快取，避免重複運算
- 優化後：統一解析 + 智慧篩選 = 指數級提升
-->

---
layout: center
class: text-center
---
<h1 important-text-5xl>Grow With Your Project</h1>

<h3 v-click><span op50>Providing</span><span text-lime font-hand text-4xl v-mark.underline.lime.delay400="1"> progressive paths </span><span op50> for concepts and features</span></h3>

<!--
總結來說，MonoRepo 和 OXC 都提供了與你的專案共同成長的能力

提供概念與功能的漸進式路徑
-->

---
glow: right
---
# Progressive Migration Strategy

<div flex="~ col gap-1" pt6>

<div text-xl text-white:50 v-click>
Progressive <span flex="inline gap-1 items-center" text-lime translate-y-0.6><div i-carbon-book-bookmark />Learning</span>
</div>
<div flex="~ gap-2 items-center" mb3 ml37 v-click>
  <div i-carbon-arrow-bend-down-right op50 />
  <div>Start with single project, gradually understand MonoRepo concepts</div>
</div>

<div text-xl text-white:50 v-click>
Progressive <span flex="inline gap-1 items-center" text-purple translate-y-0.6><div i-carbon-puzzle-piece />Integration</span>
</div>
<div flex="~ gap-2 items-center" mb3 ml37 v-click>
  <div i-carbon-arrow-bend-down-right op50 />
  <div>Share components first, then business logic, finally unified toolchain</div>
</div>

<div text-xl text-white:50 v-click>
Progressive <span flex="inline gap-1 items-center" text-yellow translate-y-0.6><div i-carbon-lightbulb-filament />Tool Selection</span>
</div>
<div flex="~ gap-2 items-center" mb3 ml37 v-click>
  <div i-carbon-arrow-bend-down-right op50 />
  <div>pnpm → Turborepo → Nx, choose based on team needs</div>
</div>

<div text-xl text-white:50 v-click>
Progressive <span flex="inline gap-1 items-center" text-rose translate-y-0.6><div i-carbon-rocket />Performance</span>
</div>
<div flex="~ gap-2 items-center" mb3 ml37 v-click>
  <div i-carbon-arrow-bend-down-right op50 />
  <div>Try OXC immediately, zero risk for massive performance gains</div>
</div>

</div>

<!--
我的建議是採用漸進式遷移策略

從學習開始，到整合，到工具選型，最後到性能優化

每一步都是漸進式的，降低風險，提高成功率
-->

---
glow: right
class: text-center
clicks: 3
title: Rational Thinking in Frontend Infra
---
<div text-3xl font-bold mb-4 v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">Rational Thinking in Frontend Infra</div>

<div left-70 top-15 relative transition duration-400 forward:delay-600 v-click="1">
  <img src="/balance-body.png" w-80 absolute left-0 top-0 />
  <img
    src="/balance-arm.png"
    w-80 absolute left-0 top-0 transition duration-1000
    class="origin-[50%_27%]"
    :class="$clicks >= 3 ? 'animate-balance-shake' : ''"
  />
  <div transition duration-1000 :class="$clicks >= 3 ? 'animate-balance-move-left' : ''" >
    <img src="/cost-of-learn.png" w-30 absolute left--35 top-20 duration-800 v-click="2" />
  </div>
  <div transition duration-1000 :class="$clicks >= 3 ? 'animate-balance-move-right' : ''" >
    <img src="/cost-of-doing.png" w-28 absolute left-85 top-34 duration-800 v-click="2" />
  </div>
</div>

<!--
現代前端開發面臨的不是簡單的複雜度增長，而是複雜度爆炸！

但在追求技術先進性的同時，我們必須避免一個常見陷阱：
**過度工程化**[3]

這裡我們有一個關鍵平衡：
- 左邊是學習成本：工具複雜度、團隊培訓、維護負擔
- 右邊是實際效益：開發效率、產品品質、業務價值

Frontend Infra 的本質是軟體架構設計[1]，
因此在導入任何工具前，我們必須先思考：
1. 目前的專案是否真的有這個需求？
2. 導入後能多大程度解決我們的問題？
3. 團隊文化是否適合？
4. 成本是否可以承受？[1]

記住：**不是看到什麼東西很潮很酷就可以一律導入到專案中**[1]
-->

---
layout: intro
class: text-center pb-5
glowX: 50
glowY: 120
---
# Thank You! {.font-hand.italic}

Slides available at [michael.dev](https://www.michaello.me/)
