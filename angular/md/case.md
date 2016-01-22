<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="./../../stylesheets/styles.css">
<link rel="stylesheet" href="./../../stylesheets/github-light.css">

 ### Angular List *switch if*
___________________________


基于DOM的部分显示和隐藏,在某些条件下是非常有用的需求.在这种场合,AngularJS装备了四种不同的指令集合(`ng-show/ng-hide,ng-switch-*,ng-if`和`ng-include`).

`ng-show/ng-hide`指令家族能用在隐藏(通过应用CSS显示规则)DOM树的部分,基于表达式演算的结果

	<div ng-show="showSecret">Secret</div>

前面的代码用ng-hide重新是这样的:

	<div ng-hide="!showSecret">Secret</div>

---

	ng-show/ng-hide指令是个简化style="display: none;"隐藏DOM元素的技巧.
	这些元素没有被DOM树移除.

---

如果我们想要有条件地物理移除和增加DOM节点使用`ng-switch`指令家族(`ng-switch,ng-switch-when,ng-switch-default`)很方便:

```html

	<div ng-switch on="showSecret">
		<div ng-switch-when="true">Secret</div>
		<div ng-switch-default>Won't show you my secrets!</div>
	</div>

```


`ng-switch`指令与JavaScript的switch 声明表达非常相似,当我们有多个`ng-switch-when`出现在一个`ng-switch`内部.


	ng-show/ng-hide和ng-switch指令的主要区别就是对待DOM元素的方式.
	ng-switch指令会增加或者移除DOM树中的DOM元素,然而ng-show/ng-hide只会简单应用
	sytle="display: none;" 去隐藏元素.ng-switch指令将会创建一个新的作用域(scope).


`ng-show/ng-hide`指令是非常容易使用,但是可能在大量的DOM节点上,有不愉快的性能影响.
假如你是关注性能方面相关的DOM树的大小,你应当倾向于使用冗长的`ng-switch`指令家族.

`ng-switch`指令家族的问题就是在简单的使用场景下它的语法是相当啰嗦的.幸运的是AngularJS的兵工厂提供了多个指令:`ng-if` . 它的行为和ng-switch类似(也是在DOM树上增加和删除元素),但是语法要非常简单:

```html

	<div ng-if="showSecret">Secret</div>
```




	ng-if指令存在于最新版本的AngularJS:1.1或者1.2.x



有条件包含内容块
===

ng-include指令和if/else声明扮演的决策不一样,它用在有条件显示动态块,AngularJS
强大的标记.这个指令有一个非常好的特性. 它能加载和有条件显示基于表达式演算结果的部分.
这允许我们简单地创建高度动态的页面.比如,我们能包含不同用户的编辑表单依赖于用户的角色.
下面的代码片段我们加载不同的部分用户有管理员角色:

```html

	<div ng-include="user.admin && 'edit.admin.html' || 'edit.user.html'">

	</div>
```


		ng-include指令将会创建一个新作用域(scope)给每个包含的部分.


附加地,ng-include是个强大的工具,它能用于组合各个小的标记片段为最终的页面.

		ng-include指令接受表达式作为参数,这样你能传递一个引用字符串,
		假如你计划使用一个固定值指向一个局部,比如,<div ng-include="'header.
		tpl.html'"></div>


ngRepeat指令渲染collections(合集)
===
ng-repeat指令可能是最有常用和最有强大的指令之一.它会遍历一个合集,给合集内的每个实体,冲压出一个新的DOM元素.但是ng-repeat指令不止擅长于简单确认初始化渲染一个合集.它能持续监视来自渲染模板的数据源,在响应发生变化的时候.

		Repeater的实现是高度优化过,将尝试最小化DOM变化,需要的DOM树的数据结构.


内部地,ng-repeat指令可以选择移动DOM节点(设想你在数组中移动一个元素),删除一个DOM节点(设想你从数组中删除一个元素),插入新的节点(设想你在数组的尾部加入一个元素).不管一个repeater在背后采用哪种策略,关键是要意识到,这不是一个简单的运行一次for循环。`ng-repeat`指令的行为,更像是一个数据的观察者,它能尝试映射实体到DOM节点的一个合集.数据观察的过程是连续的。

熟悉ngRepeat指令
===
基本用法和语法非常简单:


```html

	<table class="table table-bordered">
		<tr ng-repeat="user in users">
	       <td>{{user.name}}</td>
	       <td>{{user.email}}</td>
	    </tr>
	</table>

```

这里`users`数组定义在一个作用域和包含常规的用户对象比如属性：`name`，`email`等等。
`ng-repeat`指令会遍历`users`合集和给每个在合集内的实体创建一个`<tr>`DOM元素.

		ng-repeat指令给遍历到的合集内地每一个元素,创建一个新的作用域(scope).


特殊变量
===


AngularJS 重复器(repeater)将声明一套特殊变量的集合,在作用域给每个个体实体.
这些变量能用在检查一个元素在合集中位置:

*	$index: 一个数字指向合集内一个元素的索引(从0开始).
*	$first, $middle, $last: 这些变量从元素的位置得到布尔值.

提到的变量来在许多现实生活中非常方便。例如,SCRUM样例应用程序我们可以依靠$last变量来正确地呈现链接导航元素。过去(选择)的一部分路径不需要呈现链接,在<a>元素所需的路径的其他部分。


我们可以对这个UI建模,使用如下的代码:

```html


	<li ng-repeat="breadcrumb in breadcrumbs.getAll()">
		<span class="divider">/</span>
		<ng-switch on="$last">
	       <span ng-switch-when="true">{{breadcrumb.name}}</span>
	       <span ng-switch-default>
	         <a href="{{breadcrumb.path}}">{{breadcrumb.name}}</a>
	       </span>
	    </ng-switch>
	</li>

```
对象属性的迭代遍历
===



通常ng-repeat指令用于显示的实体,来自一个JavaScript数组。可选地，它能用在遍历一个对象
的属性。这种案例下语法有轻微的不同。


```html

	<li ng-repeat="(name, value) in user">
		Property {{$index}} with {{name}} has value {{value}}
	</li>

```


在之前的例子 ,我们显示所有的user对象的属性为无序列表.请注意我们必须指定变量名给使用括号标注(name,value)一个名字和它的值.

	ng-repeat指令将会,输出结果,按字母顺序排序属性名.
	这种行为不能被改变了,所以没有办法在使用ng-repeat控制
	对象的迭代顺序.

$index变量仍然能可以用于得到一个给定属性在所有属性的排序列表的数值位置.
遍历对象的属性,被支持,但是有限制.主要的限制就是我们不能控制迭代次序.

	假如你很关注属性在迭代遍历对象属性的次序,你应当在一个控制器里面排序属性,把
	排序好的放入一个数值.

ngRepeat 模式
===

本节将指导我们完成一些常用的表下层模式与在AngularJS中实现它们的方法。特别是我们要考虑列表的细节和列表部分的元素上改变类(classes)。

列表和细节
===

这是一种常见的用例当他们点击时,来显示一个列表,它的子项扩大显示额外的细节。这种模式有两种变体:要么只有一个元素可以扩展或者几个扩展的元素是允许的。这是截图说明这个特定的UI设计:




显示只有一行的细节
===

只有一个元素扩展能被容易覆盖的代码:

```html

	<table class="table table-bordered"
		ng-controller="ListAndOneDetailCtrl">

		<tbody ng-repeat="user in users" ng-click="selectUser(user)"
			ng-switch on="isSelected(user)">
	        <tr>
	         	<td>{{user.name}}</td>
	         	<td>{{user.email}}</td>
	￼￼￼￼￼￼￼￼</tr>

			<tr ng-switch-when="true">
				<td colspan="2">{{user.desc}}</td>
	        </tr>
	    </tbody>
	</table>

```

在前面的例子,一个附加的行,包含user细节,当一个user 被选中了,才被渲染.选中的过程非常简单,覆盖在`selectUser`和`isSelected`函数	:

```JavaScript

	.controller('ListAndOneDetailCtrl', function ($scope, users) {
		$scope.users = users;

		$scope.selectUser = function (user) {
			$scope.selectedUser = user;
		};

		$scope.isSelected = function (user) {
			return $scope.selectedUser === user;
		};
	})
```

这两个函数,利用的事实是,有个作用域(定义在表格DOM元素的顶部),能存储一个指针(`selectedUser`)给一个活动的列表的项.

显示多行细节
===

假设我们希望允许多个行的附加细节,我们需要改变策略。这次,选中细节需要存储在每个元素级.你还记得ng-repeat指令将创建一个新的作用域给每一个集合遍历迭代的 元素项.我们这个作用域去存储"选中"状态给每个项:

```html

	<table class="table table-bordered">
		<tbody ng-repeat="user in users" ng-controller="UserCtrl"
			ng-click="toggleSelected()" ng-switch on="isSelected()">
			<tr>
		        <td>{{user.name}}</td>
		        <td>{{user.email}}</td>
	        </tr>
			<tr ng-switch-when="true">
				<td colspan="2">{{user.desc}}</td>
		￼    </tr>
		 </tbody>
	</table>

```

这个例子有趣的是因为我们使用了ng-controller指令给每个项.一个提供的控制器能增大函数和变量的作用域给控制的选中状态:

```javascript

	.controller('UserCtrl', function ($scope) {

		$scope.toggleSelected = function () {
			$scope.selected = !$scope.selected;
		};

		$scope.isSelected = function () {
			return $scope.selected;
		};
	});

```

重要的是理解给定一个控制器在ng-repeat指令的相同DOM元素,控制器将被一个复制器创建的一个新作用域管理.实践中,我们有一个控制器专门管理一个合集项.它是一种强大模式,允许我们封装项(item)相关的变量和行为(函数).

修改表格,行,CSS类
===
Zebra-striping 经常加入到列表中,去提高他们的可读性.AngularJS有一对指令(ngClassEven和ngClassOdd),使这个任务简化:

```html

	<tr ng-repeat="user in users"
	ng-class-even="'light-gray'" ng-class-odd="'dark-gray'">
	.. .

	</tr>


```

ngClassEven和ngClassOdd指令对应这ngClass指令的特殊化.ngClass是非常多能的,能用在很多场合.为了展示它的强大,我们可以重新编写前面的例子:

```html


	<tr ng-repeat="user in users"

	ng-class="{'dark-gray' : !$index%2, 'light-gray' : $index%2}">




```

这里ngClass指令用在一个对象的参数.这个对象的关键是类名和值;条件表达式.一个CSS类作为一个关键字,被加入或者删除到一个基于表达式演算后的元素.

	ng-class指令能接收字符串或者数组为参数.所有的参数包含CSS类的一个列表(冒号分割的字符串)被加入到一个给定的元素.

DOM事件处理
===

我们的UI如果没有用户的交互(使用鼠标,键盘或者触摸事件),是没有多大作用.好消息是注册事件处理器,对于AngularJS来讲就是小孩的玩具一样.这里有个点击事件的反应的一个例子:

```html

	<button ng-click="clicked()">Click me!<button>

```

clicked()表达式,来自一个现有的$scope,使得非常容易调用任何定义在作用域的方法;这就有可能使用任意复杂的表达式,包括接收参数的方式:

```html

	<input ng-model="name">
	<button ng-click="hello(name)">Say hello!<button>

```


	开发者刚接触AngularJS经常去注册事件处理器如下:
	ng-click="{{clicked()}}" 或者 ng-click="sayHello({{name}})"
	使用插入表达式到一个属性的值.这不是必须的,它也不会正常工作.这怎么发生呢,
	在处理DOM的时候,AngularJS将会解析和演算一个插入表达式.处理过程的第一步会演算一个插入表达式,使用演算的结果作为一个事件的处理器.


AngularJS 内置支持了不同的事件的下列的指令:

*	点击事件: ngClick 和ngDblClick
*	鼠标事件:ngMousedown, ngMouseup, ngMouseenter, ngMouseleave,
		ngMousemove 和 ngMouseover
*	键盘事件:ngKeydown, ngKeyup 和 ngKeypress

*	输入变化事件(ngChange): ngChange指令与ngModel合作,使得我们能对用户输入的变化反应到模型的变化.


注意到DOM事件处理器能接受特定的参数`$event`在表达式中,这代表了原始DOM事件.允许我们访问底层的事件属性,阻止默认动作,停止它的传播,等等.用一个例子看如何读到一个点击元素的位置:


```html

	<li ng-repeat="item in items" ng-click="logPosition(item, $event)"> 		{{item}}
	</li>


```


这里`logPosition`函数定义在一个作用域:


```javascript

	$scope.readPosition = function (item, $event) {

		console.log(item + ' was clicked at: ' + $event.clientX + ',' +

	$event.clientY);

	};

```


	当$event特殊变量公开在事件处理器,它不应该滥用在大量的DOM操作.
	如果你还记得第一章: Angular禅道 ,所有的UI和DOM操作应当严格限制在指令中.
	这就是为什么$event参数大多时候用在指令代码内部.

高效率工作在基于DOM的模板
===

不常见到一个模板系统使用在live DOM和HTML语法,但是这种方法在实践中证明是有效.人们用其他,基于字符串的模板引擎可能需要时间去调整,但是经过几次编写基于DOM模板之后,会成为第二天性.这里有几个警告.


生活在冗长的语法
===

首先,构件的有些语法可能比较冗长.最好的例子是ng-switch家族的指令的有点恼人的语法,可能只是一些常见用例,需要大量的文字输入。让我们考虑显示一个不同消息的例子,基于一个列表项:

```html


  <div ng-switch on="items.length>0">
    <span ng-switch-when="true">
        There are {{items.length}} items in the list.
    </span>
    <span ng-switch-when="false">
    	There are no items in the list.
    </span>
   </div>


```


当然也有可能移动准备消息的逻辑到一个控制器,避免在一个模板上切换声明,但是这感觉简单条件逻辑的类型在视图层占有位置.

幸运的是,最新版本的AngularJS: `ng-if `指令内置,是非常上手的工具,在某些场合你不需要全功能的`if/else`表达式.

ngRepeat和多个DOM元素
===

更严重的问题是与这一事实有关,在这个最简单的表单,ng-repeat重复者只知道,如何重复一个元素(和它的子元素).这意味着ng-repeat不能管理旁边元素的组.

为了展示这个,我们想象一下,我们得到一个带有名字和描述的列表的项.现在我们想要一个表格,它的名字和描述都渲染为独立一行(`<tr>`).问题是我们需要加入<tbody>标记,放置`ng-repeat`指令:

```html

<table>
  <tbody ng-repeat="item in items">
    <tr>
      <td>{{item.name}}</td>
    </tr>
    <tr>
      <td>{{item.description}}</td>
    </tr>
  </tbody>
</table>

```
看起来,ng-repeat指令需要一个容器元素,强迫我们创建一个HTML结构.这可能或可能不会成为一个问题取决于你如何严格遵循标记结构,它由你的网页设计师概述。

前面的例子,我们幸运的是因为一个合适的HTML容器存在(`<tbody`>),但是有些情况,没有有效的HTML元素,ng-repeat指令能取代.我们举另外一个例子,我们希望的HTML输出是这样的:

````html



	<ul>
     	<!-- we would like to put a repeater here -->
     	<li><strong>{{item.name}}</strong></li>

     	<li>{{item.description}}</li>
  		<!-- and end it here -->
	</ul>



```


新版本的AngularJS(1.2.x)将会扩展ngRepeat指令的基本语法,允许更多灵活的DOM元素,被遍历迭代.未来我们将会这样写:

```html

	<ul>
		<li ng-repeat-start="item in items">
       		<strong>{{item.name}}</strong>
     	</li>
		<li ng-repeat-end>{{item.description}}</li>

	</ul>


```

通过使用ng-repeat-start和ng-repeat-end属性,将会指示DOM元素的周边的组,都会被迭代遍历.

运行时不能被修改的元素和属性
===

自从AngularJS操作于浏览器的实时DOM树,会受到浏览器的限制.在某些场景中有些浏览器不允许堆元素和他们的属性进行任何改变,那些元素被推进到DOM树.

在实践中那些限制的后果,让我们考虑一个相当普通的案例去动态指定一个输入元素的`type`属性.很多用户尝试(失败)去写在一行的代码:

```html

	<input type="{{myinput.type}}" ng-model="myobject[myinput.model]">

```

困难是那些浏览器(是的!你猜它是:Internet Explorer)不会改变一个已经创建的输入的类型.那些浏览器看到`{{myinput.type}}`(未演算)作为一个输入类型,因为它是未知,所以解析为`type="text"`.

这些是处理早前描述的问题的几个方法,但是在我们讨论那些解决方案之前,我们需要学习更多关于AngularJS自定义指令.*第九章:构建高级指令*,提供了更多可能的解决方案.其他简单的方式是去使用内置的`ng-include`指令去封装静态模板给不同的输入类型:

```html

<ng-include src="'input'+myinput.type+'.html'"></ng-include>

```

这里引入的特定输入类型的片段作为一个静态的字符串.

		注意作用域方面,当我们使用这个ng-include技术去创建一个新的作用域.


自定义HTML元素和老版本的IE
===
