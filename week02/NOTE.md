# 每周总结可以写在这里


## 按语法分类
- 非形式语言
	- 中文、英文
- 形式语言（群姆斯基谱系-50年代黄金期）
	- 0型 无限制文法（依然有严格定义）```?::=?```  可以有多个分隔符
	- 1型 上下文相关文法（语境不同，语义不同）```?<A>?::=?<B>?```
	- 2型 上下文无关文法（不分语境，语义都一样）```<A>::=?```
	- 3型 正则文法```<A>::=<A>?```
###产生式（BNF）
——《ECMA-262》702页《A.1 Lexical Grammar》

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的符合结构
	- 复合结构称终结符
	- 复合语境称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- *表示重复多次
- |表示或
- +表示至少一次

```
<Number> ::= "0"|"1"|……|"9"
 ```

```
<DecimalNumber>::="0"|(("0"|"1"|……|"9")|<Number>)
 ```

```
<PrimaryExpression>::=<DecimalNumber>|"("<LogicalExpression>")"
 ```

```
<MultiplicativeExpression>::=<DecimalNumber>|<MultiplicativeExpression>"*"<PrimaryExpression>|<MultiplicativeExpression>"/"<PrimaryExpression>
 ```

```
<AddtiveExpression>::=<MultiplicativeExpression>|<AddtiveExpression>"+"<MultiplicativeExpression>|<AddtiveExpression>"-"<MultiplicativeExpression>
 ```

```
<LogicalExpression>::=<AddtiveExpression>|<LogicalExpression>"||"<AddtiveExpression>|<LogicalExpression>"&&"<AddtiveExpression>
 ```
## 图灵完备性
- 命令式——图灵机
	- goto
	- if和while
- 声明式——lambda
	- 递归
###动态与静态
- 动态
	- 在用户的设备/在线服务器上
	- 产品实际运行时
	- Runtime
- 静态
	- 在程序员的设备上
	- 产品开发时
	- Compiletime

### 类型系统
- 动态类型系统与静态类型系统
- 强类型与弱类型
	- String+Number
	- String==Boolean
- 复合类型
	- 结构体
	- 函数签名
- 子类型
	- 逆变/协变
