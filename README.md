# Give.Name - 智能中文姓名推荐系统

基于 Next.js 和 Tailwind CSS 构建的智能化英文转中文姓名推荐系统，为外国友人提供富有文化内涵和个性化的中文名字选择。每个推荐名字都附带详细的文化解读，帮助用户理解中国传统文化中的名字寓意。

## 产品愿景

打造一个智能化的英文转中文姓名推荐系统，为外国友人提供富有文化内涵和个性化的中文名字选择。每个推荐名字都附带详细的文化解读，帮助用户理解中国传统文化中的名字寓意。整个网页由英文构建，并且比较简洁

## 核心功能需求

1. 智能名字生成
   - 输入：用户的英文名（支持名/姓+名格式）
   - 输出：3个独特的中文名字方案
   - 每个名字方案需确保：
     * 音韵和谐，尽可能与英文发音相近
     * 符合中国传统起名规范
     * 字义优美，组合得当
     * 避免文化禁忌，确保恰当性

2. 文化解读
   每个推荐名字需包含：
   - 单字解释：逐字释义
   - 整体含义：名字的整体寓意
   - 文化内涵：体现的中国传统文化元素
   - 个性特征：该名字所暗含的性格特质
   - 英文说明：针对名字寓意的英文解释

3. 用户体验要求
   - 界面简洁直观
   - 操作流程不超过3步
   - 结果展示清晰易懂
   - 支持名字方案收藏与导出

## 技术栈

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - Node.js & npm for package management

## 开发环境设置

1. 克隆仓库:
```bash
git clone https://github.com/lixianmin/give.name.git
cd give.name
```

2. 安装依赖:
```bash
npm install
```

3. 启动开发服务器:
```bash
npm run dev
```

4. 在浏览器中访问 `http://localhost:3000`

## 技术要求

1. 需要建立完善的中文字库，包含字义、发音、使用频率等信息
2. 构建智能算法，确保名字组合的合理性和文化适配性
3. 加入音译规则库，优化英文到中文的音译效果
4. 使用 Next.js API Routes 实现后端服务
5. 采用 Tailwind CSS 构建响应式、美观的用户界面

## 开发规范

1. 代码风格
   - 使用 TypeScript 强类型
   - 遵循 ESLint 规则
   - 组件采用函数式编程

2. 目录结构
   ```
   /app                 # Next.js App Router
     /api              # API 路由
     /components       # React 组件
     /lib             # 工具函数
     /styles          # 样式文件
   /public            # 静态资源
   ```

## 示例效果

输入：Michael
输出示例：
1. 米凯乐 (Mi Kai Le)
   - 寓意：凯旋欢乐
   - 英文解释：One who brings joy and triumph
   - 文化内涵：象征积极向上，充满活力

2. 明凯洛 (Ming Kai Luo)
   - 寓意：聪明开朗
   - 英文解释：Bright and cheerful spirit
   - 文化内涵：展现智慧与开放的胸怀

3. 麦克龙 (Mai Ke Long)
   - 寓意：卓越非凡
   - 英文解释：Distinguished and extraordinary
   - 文化内涵：体现独特个性与远大志向

## 预期价值

1. 帮助外国友人更好地融入中国文化
2. 提供个性化、有文化内涵的中文名字选择
3. 增进中外文化交流与理解